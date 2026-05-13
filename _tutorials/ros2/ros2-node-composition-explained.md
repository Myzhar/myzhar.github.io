---
title: "ROS 2 Node Composition Explained"
excerpt: "Learn how to use ROS 2 node composition to run multiple nodes in a single process, reducing overhead and enabling zero-copy intra-process communication."
author: "Walter Lucetti"
index: 1000
date: 2026-05-12 22:30:00 +01:00
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/ros2/ros2-node-composition-explained.jpg
  teaser: /assets/images/ros2/ros2-node-composition-explained.jpg
  actions:
    - label: "Official ROS 2 Website"
      url: "https://www.ros.org/"
      target: _blank
layout: single
classes: single
---

## Introduction

In the previous tutorials we have seen how to start ROS 2 nodes as standalone processes using `ros2 run` and how to manage them with launch files. By default, each node lives in its own operating system process. This is simple and safe — a crash in one node does not affect the others — but it comes with a cost: every message exchanged between nodes must be serialized, copied through the DDS middleware, and deserialized on the other side, even when both nodes run on the same machine.

**Node Composition** is a ROS 2 mechanism that lets you load multiple nodes into a single process — called a *component container* — while keeping each node's code fully independent. When two composed nodes exchange messages within the same container, ROS 2 can use **intra-process communication**, which skips serialization entirely and passes a raw pointer. The result is lower latency, less CPU usage, and reduced memory bandwidth, which is especially valuable in perception pipelines where large sensor data (images, point clouds) flows between nodes at high frequency.

By the end of this tutorial you will be able to:

- Understand what a composable node is and how it differs from a regular node.
- Create a composable node plugin in C++ using `rclcpp_components`.
- Load nodes into a component container from the command line.
- Configure composition in a Python launch file.
- Enable zero-copy intra-process communication between composed nodes.

## Prerequisites

1. **ROS 2 installed** — follow my [Installing ROS 2](/tutorials/ros2/installing-ros2/) tutorial if needed.
2. **Familiarity with ROS 2 nodes** — review [Starting ROS 2 Nodes](/tutorials/ros2/starting-ros2-nodes/) and [ROS 2 Python launch file explained](/tutorials/ros2/python-launch-explained/).
3. **Basic C++ knowledge** — composable nodes are written in C++.

## What is a Composable Node?

A regular ROS 2 node compiled as an executable has a `main()` function that creates the node, spins it, and exits. The node is tightly coupled to its process.

A **composable node** (also called a *component*) is a node packaged as a **shared library plugin** instead of a standalone executable. It exposes a registration macro that the ROS 2 component system uses to load it at runtime into any compatible container process.

The key difference is:

| | Regular node | Composable node |
| --- | --- | --- |
| Packaging | Executable (binary) | Shared library (`.so`) |
| Loading | One process per node | Many nodes per process |
| Communication | DDS middleware (IPC or network) | Can use intra-process (zero-copy) |
| Isolation | Full process isolation | Shared process space |
| Startup | `ros2 run` | `ros2 component load` or launch file |

> :pushpin: **Note**: composable nodes are a C++ feature provided by the `rclcpp_components` package. Python nodes cannot currently be loaded as composable components.

## Creating a Composable Node

### Package setup

A composable node lives in a normal ROS 2 C++ package. The only additions are:

1. A dependency on `rclcpp_components` in `package.xml` and `CMakeLists.txt`.
2. The `RCLCPP_COMPONENTS_REGISTER_NODE` macro in the source file.
3. A CMake call to `rclcpp_components_register_node` (or `rclcpp_components_register_nodes` for older setups) to generate the plugin metadata.

Create a package named `composition_demo`:

```bash
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_cmake composition_demo \
    --dependencies rclcpp rclcpp_components std_msgs
```

### Writing the composable node

Create `src/talker_component.cpp`:

```cpp
#include <chrono>
#include <memory>

#include "rclcpp/rclcpp.hpp"
#include "rclcpp_components/register_node_macro.hpp"
#include "std_msgs/msg/string.hpp"

using namespace std::chrono_literals;

namespace composition_demo
{

class TalkerComponent : public rclcpp::Node
{
public:
  explicit TalkerComponent(const rclcpp::NodeOptions & options)
  : Node("talker", options), count_(0)
  {
    pub_ = create_publisher<std_msgs::msg::String>("chatter", 10);
    timer_ = create_wall_timer(
      500ms, [this]() {
        auto msg = std_msgs::msg::String();
        msg.data = "Hello World: " + std::to_string(count_++);
        RCLCPP_INFO(get_logger(), "Publishing: '%s'", msg.data.c_str());
        pub_->publish(std::move(msg));
      });
  }

private:
  rclcpp::Publisher<std_msgs::msg::String>::SharedPtr pub_;
  rclcpp::TimerBase::SharedPtr timer_;
  size_t count_;
};

}  // namespace composition_demo

RCLCPP_COMPONENTS_REGISTER_NODE(composition_demo::TalkerComponent)
```

Then create `src/listener_component.cpp`:

```cpp
#include <memory>

#include "rclcpp/rclcpp.hpp"
#include "rclcpp_components/register_node_macro.hpp"
#include "std_msgs/msg/string.hpp"

namespace composition_demo
{

class ListenerComponent : public rclcpp::Node
{
public:
  explicit ListenerComponent(const rclcpp::NodeOptions & options)
  : Node("listener", options)
  {
    sub_ = create_subscription<std_msgs::msg::String>(
      "chatter", 10,
      [this](const std_msgs::msg::String::SharedPtr msg) {
        RCLCPP_INFO(get_logger(), "I heard: '%s'", msg->data.c_str());
      });
  }

private:
  rclcpp::Subscription<std_msgs::msg::String>::SharedPtr sub_;
};

}  // namespace composition_demo

RCLCPP_COMPONENTS_REGISTER_NODE(composition_demo::ListenerComponent)
```

A few things to note:

- The constructor takes a `const rclcpp::NodeOptions &` argument — this is **mandatory** for composable nodes.
- There is **no** `main()` function.
- `RCLCPP_COMPONENTS_REGISTER_NODE` registers the class with the ROS 2 plugin system using the fully qualified class name as the component type name.

### CMakeLists.txt

Update `CMakeLists.txt` to build shared libraries and register the components:

```cmake
cmake_minimum_required(VERSION 3.8)
project(composition_demo)

find_package(ament_cmake REQUIRED)
find_package(rclcpp REQUIRED)
find_package(rclcpp_components REQUIRED)
find_package(std_msgs REQUIRED)

# Build each component as a shared library
add_library(talker_component SHARED src/talker_component.cpp)
add_library(listener_component SHARED src/listener_component.cpp)

ament_target_dependencies(talker_component rclcpp rclcpp_components std_msgs)
ament_target_dependencies(listener_component rclcpp rclcpp_components std_msgs)

# Register components — generates the plugin XML and installs it
rclcpp_components_register_node(
  talker_component
  PLUGIN "composition_demo::TalkerComponent"
  EXECUTABLE talker_node
)
rclcpp_components_register_node(
  listener_component
  PLUGIN "composition_demo::ListenerComponent"
  EXECUTABLE listener_node
)

install(TARGETS talker_component listener_component
  ARCHIVE DESTINATION lib
  LIBRARY DESTINATION lib
  RUNTIME DESTINATION bin
)

ament_package()
```

`rclcpp_components_register_node` does two things: it generates a standalone executable (named by the `EXECUTABLE` argument) so the component can still be used with `ros2 run` without a container, and it produces the plugin XML that tells the component container how to load the shared library.

Build the package:

```bash
cd ~/ros2_ws
colcon build --packages-select composition_demo
source install/setup.bash
```

## Component Containers

A **component container** is a process whose sole purpose is to host composable nodes. ROS 2 ships with two built-in containers:

| Container executable | Package | Description |
| --- | --- | --- |
| `component_container` | `rclcpp_components` | Single-threaded executor |
| `component_container_mt` | `rclcpp_components` | Multi-threaded executor |
| `component_container_isolated` | `rclcpp_components` | Each component gets its own executor thread |

## Running with the CLI

### Starting a container

Open a terminal and start a container:

```bash
ros2 run rclcpp_components component_container --ros-args -r __node:=my_container
```

The container starts and waits for components to be loaded. You should see:

```text
[INFO] [component_manager]: Load Library: ...
```

### Loading components

In a second terminal, load the talker:

```bash
ros2 component load /my_container composition_demo composition_demo::TalkerComponent
```

And in a third terminal, load the listener:

```bash
ros2 component load /my_container composition_demo composition_demo::ListenerComponent
```

You will see both nodes publishing and subscribing in the container's output:

```text
[INFO] [talker]: Publishing: 'Hello World: 1'
[INFO] [listener]: I heard: 'Hello World: 1'
[INFO] [talker]: Publishing: 'Hello World: 2'
[INFO] [listener]: I heard: 'Hello World: 2'
```

### Inspecting loaded components

```bash
ros2 component list
```

Output:

```text
/my_container
  1  /talker
  2  /listener
```

### Unloading a component

```bash
ros2 component unload /my_container 2
```

This removes the listener from the container without stopping the container or the talker.

> :bulb: **Tip**: you can pass node parameters and remappings when loading a component:

```bash
ros2 component load /my_container composition_demo composition_demo::TalkerComponent \
  --node-name my_talker \
  --node-namespace /demo \
  -p publish_rate:=1.0
```

## Running with a Launch File

Using `ros2 component` commands is convenient for interactive debugging, but in production you will want a launch file. The `launch_ros` module provides two actions for this:

| Action | Description |
| --- | --- |
| `ComposableNodeContainer` | Starts a new container and optionally loads components into it |
| `LoadComposableNodes` | Loads components into an existing container |

### All-in-one: container + nodes

The simplest pattern is to declare the container and its initial set of components together:

```python
from launch import LaunchDescription
from launch_ros.actions import ComposableNodeContainer
from launch_ros.descriptions import ComposableNode


def generate_launch_description():
    container = ComposableNodeContainer(
        name='demo_container',
        namespace='',
        package='rclcpp_components',
        executable='component_container',
        composable_node_descriptions=[
            ComposableNode(
                package='composition_demo',
                plugin='composition_demo::TalkerComponent',
                name='talker',
            ),
            ComposableNode(
                package='composition_demo',
                plugin='composition_demo::ListenerComponent',
                name='listener',
            ),
        ],
        output='screen',
    )

    return LaunchDescription([container])
```

### Splitting container and nodes

When you want to load components into an already-running container — for example, a container started by another launch file — use `LoadComposableNodes`:

```python
from launch import LaunchDescription
from launch_ros.actions import ComposableNodeContainer, LoadComposableNodes
from launch_ros.descriptions import ComposableNode


def generate_launch_description():
    # Start an empty container
    container = ComposableNodeContainer(
        name='demo_container',
        namespace='',
        package='rclcpp_components',
        executable='component_container',
        composable_node_descriptions=[],
        output='screen',
    )

    # Load nodes into the container defined above
    load_nodes = LoadComposableNodes(
        target_container='demo_container',
        composable_node_descriptions=[
            ComposableNode(
                package='composition_demo',
                plugin='composition_demo::TalkerComponent',
                name='talker',
            ),
            ComposableNode(
                package='composition_demo',
                plugin='composition_demo::ListenerComponent',
                name='listener',
            ),
        ],
    )

    return LaunchDescription([container, load_nodes])
```

### Passing parameters and remappings

`ComposableNode` accepts the same `parameters` and `remappings` arguments as a regular `Node`:

```python
ComposableNode(
    package='composition_demo',
    plugin='composition_demo::TalkerComponent',
    name='talker',
    namespace='demo',
    parameters=[{'publish_rate': 2.0}],
    remappings=[('chatter', 'demo/chatter')],
),
```

## Intra-Process Communication

The main performance benefit of composition is **intra-process communication (IPC)**. When two nodes in the same process exchange messages, ROS 2 can pass ownership of the message directly via a shared pointer, bypassing the DDS middleware entirely. This eliminates serialization, deserialization, and memory copies.

To enable IPC, pass `use_intra_process_comms=True` in the `NodeOptions` when creating the container or node:

### In the launch file

```python
ComposableNode(
    package='composition_demo',
    plugin='composition_demo::TalkerComponent',
    name='talker',
    extra_arguments=[{'use_intra_process_comms': True}],
),
ComposableNode(
    package='composition_demo',
    plugin='composition_demo::ListenerComponent',
    name='listener',
    extra_arguments=[{'use_intra_process_comms': True}],
),
```

### In the node source code

IPC can also be enabled programmatically from within the component:

```cpp
explicit TalkerComponent(const rclcpp::NodeOptions & options)
: Node("talker", rclcpp::NodeOptions(options).use_intra_process_comms(true)),
  count_(0)
{
  // ...
}
```

### Zero-copy publishing

For IPC to be zero-copy, the publisher must use `std::unique_ptr` or `std::shared_ptr` message ownership and the subscription must accept the same:

```cpp
// Publisher: allocate and move ownership
auto msg = std::make_unique<std_msgs::msg::String>();
msg->data = "Hello World: " + std::to_string(count_++);
pub_->publish(std::move(msg));  // ownership transferred, no copy
```

```cpp
// Subscription: receive as shared_ptr
sub_ = create_subscription<std_msgs::msg::String>(
  "chatter", 10,
  [this](std_msgs::msg::String::UniquePtr msg) {
    RCLCPP_INFO(get_logger(), "I heard: '%s'", msg->data.c_str());
  });
```

> :pushpin: **Note**: IPC is only active when **both** the publisher and the subscriber are in the same process **and** both have `use_intra_process_comms` enabled. If one node is in a different process, ROS 2 automatically falls back to the normal DDS path without any code change needed.

## Conclusions

Node composition is a powerful ROS 2 feature that lets you reduce system overhead by co-locating nodes in a single process while keeping their code fully decoupled:

- **Composable nodes** are shared library plugins built with `rclcpp_components`. They expose a standard constructor `(const rclcpp::NodeOptions &)` and are registered with `RCLCPP_COMPONENTS_REGISTER_NODE`.
- **Component containers** host one or more composable nodes. ROS 2 provides `component_container` (single-threaded), `component_container_mt` (multi-threaded), and `component_container_isolated` (per-node thread).
- **CLI management**: `ros2 component load / unload / list` lets you dynamically add or remove nodes at runtime.
- **Launch file integration**: `ComposableNodeContainer` and `LoadComposableNodes` are the standard launch actions for defining and populating containers declaratively.
- **Intra-process communication**: enable it with `use_intra_process_comms: true` and use `std::unique_ptr` ownership in publishers and subscribers to achieve zero-copy message passing.

### What's next

- **Lifecycle Nodes** — nodes that follow the ROS 2 managed-node lifecycle, giving you fine-grained control over startup, shutdown, and error recovery.
- **Advanced launch patterns** — conditional includes, event-driven actions, and multi-robot setups.
