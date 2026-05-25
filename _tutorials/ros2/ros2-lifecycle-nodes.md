---
title: "Lifecycle (managed) nodes: why, what, and how. With practical examples"
excerpt: "Understand the ROS 2 lifecycle state machine from first principles: all states, all transitions, the callbacks you must implement, and how Nav2's Lifecycle Manager and real hardware drivers use it."
author: "Walter Lucetti"
index: 1110
date: 2026-05-25 12:00:00 +01:00
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/ros2/ros2-lifecycle-nodes.jpg
  teaser: /assets/images/ros2/ros2-lifecycle-nodes.jpg
  actions:
    - label: "<i class='fas fa-globe'></i> Official ROS 2 Website"
      url: "https://www.ros.org/"
      target: _blank
    - label: "<i class='fas fa-book'></i> ROS 2 Node Lifecycle Design"
      url: "https://design.ros2.org/articles/node_lifecycle.html"
      target: _blank
layout: single
classes: single
---

## Introduction

If you have been writing ROS 2 nodes for a while, you have probably run into this scenario: you start a sensor driver node, but the hardware is not ready yet. The node crashes, or worse, it silently starts publishing garbage. You add a `sleep` at the beginning of `main()`, cross your fingers, and ship. Sound familiar?

Or maybe you have a system with ten nodes that all need to be configured *before* any of them starts processing data. Without coordination, the first node to spin up starts publishing to topics that nobody is listening to yet, actions fail because servers are not ready, and the whole thing collapses in a confusing heap of error messages.

The ROS 2 **lifecycle node** (also called a *managed node*) was designed precisely for these situations. Instead of a node being either "running" or "dead", a lifecycle node exposes a well-defined **state machine**. An external supervisor, a launch file, or another node can drive it through that state machine in a controlled, deterministic order. The node only starts publishing when told to activate. It can be safely deactivated, reconfigured, and re-activated without being destroyed. Errors in individual transition callbacks are isolated and handled without taking down the whole process.

This is not just a nice-to-have. In production robotics, where you have hardware that must be initialized in a specific order, where a robot must start up safely even when some sensors are not yet available, lifecycle nodes are the right tool. They are also the foundation of the entire [Nav2](https://docs.nav2.org/){:target="_blank"} stack, as we will see later.

By the end of this tutorial you will be able to:

- Understand *why* lifecycle nodes exist and what problem they solve.
- Read and explain the lifecycle state machine diagram: primary states, transition states, all transitions.
- Implement the required callbacks in a C++ lifecycle node.
- Use the `ros2 lifecycle` CLI to manage a running lifecycle node.
- Understand how [Nav2's Lifecycle Manager](https://docs.nav2.org/configuration/packages/configuring-lifecycle.html){:target="_blank"} orchestrates multiple lifecycle nodes and why the `bond` mechanism was added.
- Recognize lifecycle nodes in a real project ([ldrobot-lidar-ros2](https://myzhar.tech/projects/ros2/ldrobot-lidar-ros2/){:target="_blank"}).

## Prerequisites

1. **ROS 2 installed**, follow my [Installing ROS 2](/tutorials/ros2/installing-ros2/) tutorial if needed.
2. **Familiarity with ROS 2 nodes**, review [Starting ROS 2 Nodes](/tutorials/ros2/starting-ros2-nodes/).
3. **Familiarity with ROS 2 Node Composition**, review [ROS 2 Node Composition Explained](/tutorials/ros2/ros2-node-composition-explained/).
4. **Basic C++ knowledge**, lifecycle nodes are written in C++ (`rclcpp_lifecycle`).

## The Problem With Unmanaged Nodes

A regular ROS 2 node (`rclcpp::Node`) has no notion of "not ready". The moment `rclcpp::spin()` is called, the node is live: timers fire, subscribers receive messages, publishers push data. This is fine for simple tools, but breaks down quickly in complex systems:

- **Hardware drivers** may need to open a serial port, negotiate a baud rate, and receive a firmware handshake before publishing anything meaningful. With a plain node you either block in the constructor (bad) or publish garbage until the hardware responds (worse).
- **Multi-node systems** often need nodes to be configured in a specific order. Node A must finish reading calibration data before Node B starts consuming it. There is no clean mechanism for this with plain nodes without writing custom synchronization logic.
- **Error recovery** is ad-hoc. If initialization fails, you either throw an exception (killing the process) or set a flag and skip everything (publishing nothing, confusing the rest of the system).
- **Dynamic reconfiguration** is fragile. Stopping a plain node to change a parameter means destroying it and recreating it, losing all subscriptions and state.

Lifecycle nodes solve all of this by giving every node a **formal state machine** that any external entity can inspect and drive.

## The Lifecycle State Machine

The lifecycle state machine has two categories of states: **primary states** and **transition states**.

**Primary states** are stable. A node sits in a primary state until an external trigger requests a transition. Nothing happens automatically.

**Transition states** are transient. When a transition is triggered, the node enters a transition state, executes the corresponding callback, and then moves to the next primary state depending on whether the callback succeeded or failed.

Click on the diagram below to expand it for a closer look:

{% include figure popup=true image_path="/assets/images/tutorials/ros2_lifecycle_nodes/lifecycle-state-machine.svg" alt="ROS 2 Lifecycle Node State Machine diagram showing all states and transitions" caption="The complete ROS 2 lifecycle node state machine. Blue = primary states, amber = transition states, red = error handling state. Green arrows = success, red arrows = failure, dashed orange = error/shutdown paths." %}

### Primary States

There are four primary states:

| State | Description |
|-------|-------------|
| **Unconfigured** | Initial state after the node is created. No resources are allocated, no publishers or subscribers are active. This is also where the node returns after a successful `cleanup` or a successful `onError`. |
| **Inactive** | The node exists and its interface is configured (parameters read, publishers/subscribers created), but it is not processing data. Timers are not running. This state allows reconfiguration without behavioral changes. |
| **Active** | The node is fully operational. Timers fire, callbacks execute, data flows. This is where the node spends most of its life. |
| **Finalized** | Terminal state. The node is about to be destroyed. Useful for post-mortem inspection and debugging. |

### Transition States

There are six transition states. They are intermediate: the node enters them, runs a callback, and exits to a primary state based on the result.

| State | Triggered by | Callback | Success → | Failure → |
|-------|-------------|----------|-----------|-----------|
| **Configuring** | `configure` | `onConfigure` | Inactive | Unconfigured |
| **CleaningUp** | `cleanup` | `onCleanup` | Unconfigured | Inactive |
| **Activating** | `activate` | `onActivate` | Active | Inactive |
| **Deactivating** | `deactivate` | `onDeactivate` | Inactive | Active |
| **ShuttingDown** | `shutdown` | `onShutdown` | Finalized | Finalized* |
| **ErrorProcessing** | error in any transition | `onError` | Unconfigured | Finalized |

> :pushpin: **Note**: `ShuttingDown` always leads to `Finalized` regardless of callback result; the distinction is whether cleanup was clean or not. `ErrorProcessing` is the only state where the node can recover (back to `Unconfigured`) or give up (to `Finalized`).

### Transitions Summary

Here is the complete list of **externally triggerable** transitions:

| Transition | From state | Target transition state |
|------------|------------|------------------------|
| `configure` | Unconfigured | Configuring |
| `cleanup` | Inactive | CleaningUp |
| `activate` | Inactive | Activating |
| `deactivate` | Active | Deactivating |
| `shutdown` | Unconfigured / Inactive / Active | ShuttingDown |

> :pushpin: **Note**: There is also a `create` transition (instantiates the node into `Unconfigured`) and a `destroy` transition (from `Finalized`), but these are handled by the process lifecycle, not by service calls.

### Error Handling

Only the `Active` state triggers **automatic** `ErrorProcessing` when an unhandled error occurs during processing. For all other transition states, if the callback returns a failure result (not an exception), the node moves to the appropriate failure destination listed in the table above. If an exception is thrown during a transition, it is treated as a failure.

The `onError` callback is special: it may be called from any transition state. This means it must be written defensively — it cannot assume what resources were allocated, because the error may have happened at any point during `Configuring`, `Activating`, or any other transition.

## Services Exposed by a Lifecycle Node

Every lifecycle node automatically exposes a set of ROS 2 services that can be called to trigger transitions. Given a node named `/my_node`, the services are:

| Service | Type | Purpose |
|---------|------|---------|
| `/my_node/change_state` | `lifecycle_msgs/srv/ChangeState` | Trigger a transition |
| `/my_node/get_state` | `lifecycle_msgs/srv/GetState` | Query current state |
| `/my_node/get_available_states` | `lifecycle_msgs/srv/GetAvailableStates` | List all states |
| `/my_node/get_available_transitions` | `lifecycle_msgs/srv/GetAvailableTransitions` | List valid transitions from current state |

There is also a **latched topic** `/my_node/transition_event` of type `lifecycle_msgs/msg/TransitionEvent` that publishes every state change. This is how a supervisor monitors the node without polling.

## Implementing a Lifecycle Node in C++

The implementation uses the `rclcpp_lifecycle` package. Add it to your `package.xml`:

```xml
<depend>rclcpp_lifecycle</depend>
<depend>rclcpp_components</depend>
```

And to your `CMakeLists.txt`:

```cmake
find_package(rclcpp_lifecycle REQUIRED)
find_package(rclcpp_components REQUIRED)
ament_target_dependencies(my_node rclcpp rclcpp_lifecycle rclcpp_components ...)
rclcpp_components_register_node(my_node PLUGIN "MyLifecycleNode" EXECUTABLE my_lifecycle_node)
```

### Minimal skeleton

```cpp
#include "rclcpp/rclcpp.hpp"
#include "rclcpp_lifecycle/lifecycle_node.hpp"
#include "rclcpp_components/register_node_macro.hpp"

using CallbackReturn = rclcpp_lifecycle::node_interfaces::LifecycleNodeInterface::CallbackReturn;

class MyLifecycleNode : public rclcpp_lifecycle::LifecycleNode
{
public:
  explicit MyLifecycleNode(const rclcpp::NodeOptions & options)
  : rclcpp_lifecycle::LifecycleNode("my_node", options)
  {}

  // Called on configure transition
  CallbackReturn on_configure(const rclcpp_lifecycle::State &) override
  {
    RCLCPP_INFO(get_logger(), "Configuring...");
    // allocate resources: create publishers, subscribers, read parameters
    return CallbackReturn::SUCCESS;
  }

  // Called on activate transition
  CallbackReturn on_activate(const rclcpp_lifecycle::State &) override
  {
    RCLCPP_INFO(get_logger(), "Activating...");
    // start timers, activate publishers
    return CallbackReturn::SUCCESS;
  }

  // Called on deactivate transition
  CallbackReturn on_deactivate(const rclcpp_lifecycle::State &) override
  {
    RCLCPP_INFO(get_logger(), "Deactivating...");
    // stop timers, deactivate publishers
    return CallbackReturn::SUCCESS;
  }

  // Called on cleanup transition
  CallbackReturn on_cleanup(const rclcpp_lifecycle::State &) override
  {
    RCLCPP_INFO(get_logger(), "Cleaning up...");
    // release all resources allocated in on_configure
    return CallbackReturn::SUCCESS;
  }

  // Called on shutdown transition
  CallbackReturn on_shutdown(const rclcpp_lifecycle::State &) override
  {
    RCLCPP_INFO(get_logger(), "Shutting down...");
    return CallbackReturn::SUCCESS;
  }

  // Called when any transition callback returns FAILURE or throws
  CallbackReturn on_error(const rclcpp_lifecycle::State &) override
  {
    RCLCPP_ERROR(get_logger(), "Error! Attempting recovery...");
    // clean up whatever was partially done
    return CallbackReturn::SUCCESS;  // SUCCESS → Unconfigured; FAILURE → Finalized
  }
};

RCLCPP_COMPONENTS_REGISTER_NODE(MyLifecycleNode)
```

> :pushpin: **Note**: `CallbackReturn` has three values: `SUCCESS`, `FAILURE`, and `ERROR`. `FAILURE` is a "soft" failure that keeps the node alive (going back to the previous primary state); `ERROR` immediately triggers `ErrorProcessing`.

### Lifecycle publishers

When a node is `Inactive`, publishers should not send data. `rclcpp_lifecycle` provides a `LifecyclePublisher` that automatically respects this: calling `publish()` on an inactive lifecycle publisher is a no-op.

```cpp
// In on_configure:
pub_ = this->create_lifecycle_publisher<std_msgs::msg::String>("chatter", 10);

// In on_activate:
pub_->on_activate();

// In on_deactivate:
pub_->on_deactivate();
```

> :bulb: **Tip**: Always call `on_activate()` / `on_deactivate()` on lifecycle publishers from `on_activate()` / `on_deactivate()` respectively. The base class does **not** do this automatically.

> :exploding_head: **True story**: I have genuinely lost hours debugging a lifecycle node that refused to publish anything — checking QoS profiles, subscriber graphs, DDS configuration, you name it. The culprit every single time? I forgot to call `pub_->on_activate()` in `on_activate()`. The node was `Active`, the publisher existed, and `publish()` was being called — it just silently dropped every message. **Learn from my pain.**

## Managing Lifecycle Nodes with the CLI

The `ros2 lifecycle` command is the quickest way to interact with lifecycle nodes manually.

### Get the current state

```bash
ros2 lifecycle get /my_node
```

Output example:

```text
unconfigured [1]
```

### List available transitions

```bash
ros2 lifecycle list /my_node
```

Output:

```text
- configure [1]
  Start: unconfigured [1]
  Goal: configuring [10]
```

### Trigger a transition

```bash
# Configure the node
ros2 lifecycle set /my_node configure

# Activate it
ros2 lifecycle set /my_node activate

# Deactivate
ros2 lifecycle set /my_node deactivate

# Cleanup (back to Unconfigured)
ros2 lifecycle set /my_node cleanup

# Shutdown
ros2 lifecycle set /my_node shutdown
```

### Watch state transitions in real time

```bash
ros2 topic echo /my_node/transition_event
```

This echoes every `TransitionEvent` message, so you can see exactly when the node changes state and whether transitions succeed or fail. Very handy for debugging.

## A Real-World Example: [LD Lidar ROS 2 Driver](/projects/ros2/ldrobot-lidar-ros2/){:target="_blank"}

I maintain the [ldrobot-lidar-ros2](https://myzhar.tech/projects/ros2/ldrobot-lidar-ros2/){:target="_blank"} GitHub repository, which provides ROS 2 support for the LDRobot LD-series LiDAR sensors. Hardware drivers are one of the canonical use cases for lifecycle nodes, and this project is a good example of why.

> You can find all the details about the [LD Lidar ROS 2 Driver](/projects/ros2/ldrobot-lidar-ros2/){:target="_blank"} in the [ROS 2 Project section](/projects/ros2/){:target="_blank"} of the website.

The LiDAR driver must:

1. **Configure**: open the serial port, read device parameters, create the `/scan` publisher.
2. **Activate**: begin streaming laser data, start publishing `/scan` messages.
3. **Deactivate**: stop publishing — but keep the serial port open.
4. **Cleanup**: close the serial port, release all OS resources.

With a plain node, you have no clean way to reconfigure the sensor without destroying the node. With a lifecycle node, a supervisor can call `deactivate` to clean up the configuration safely and `activate` again to restart it — without reinitializing the serial connection. This is exactly the pattern used in the driver.

The driver exposes the standard lifecycle services, so [Nav2](https://docs.nav2.org/){:target="_blank"} or any other lifecycle manager can control it in the same way it controls any other lifecycle node in the stack. No custom integration code needed.

See the [project page](https://myzhar.tech/projects/ros2/ldrobot-lidar-ros2/){:target="_blank"} for the full source, launch files, and usage instructions.

## Orchestrating Multiple Lifecycle Nodes: Nav2 Lifecycle Manager

In a complex system like a mobile robot navigation stack, you typically have *many* lifecycle nodes that must be brought up and down in a specific order. Doing this by hand with `ros2 lifecycle set` is impractical and error-prone.

[Nav2](https://docs.nav2.org/){:target="_blank"} solves this with its [**Lifecycle Manager**](https://docs.nav2.org/configuration/packages/configuring-lifecycle.html){:target="_blank"} (`nav2_lifecycle_manager`). It takes a list of node names and brings them up through `configure` → `activate` **in order**, and brings them down in the **reverse order** on shutdown.

```yaml
lifecycle_manager:
  ros__parameters:
    autostart: true
    node_names:
      - map_server
      - amcl
      - controller_server
      - planner_server
      - bt_navigator
```

With `autostart: true`, the Lifecycle Manager automatically calls `configure` and `activate` on each node when the system starts. On shutdown it calls `deactivate` → `cleanup` → `shutdown` in reverse order, ensuring a clean teardown.

### Why a custom `Lifecycle` base class was added to Nav2

The standard `rclcpp_lifecycle::LifecycleNode` is correct but minimal. [Nav2 added an additional feature that the base ROS 2 lifecycle implementation](https://docs.nav2.org/concepts/index.html#lifecycle-nodes-and-bond){:target="_blank"} does not provide: **bonds**. 

A *bond* is a bidirectional heartbeat connection between the Lifecycle Manager and each Nav2 managed node. The Lifecycle Manager monitors the bond; if a managed node crashes or becomes unresponsive, the bond breaks. When a bond breaks, the Lifecycle Manager automatically transitions **all** managed nodes down to a safe state.

This matters enormously in a navigation stack. Imagine `amcl` (localization) crashes silently. Without bonds, `bt_navigator` keeps running, sending velocity commands to a robot that no longer knows where it is. With bonds, the broken `amcl` bond immediately triggers a coordinated shutdown of the whole stack.

The key configuration parameters for the bond mechanism are:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `bond_timeout` | `4.0` s | Time after last heartbeat before the bond is considered broken |
| `bond_heartbeat_period` | `0.25` s | How often the manager publishes heartbeats |
| `attempt_respawn_reconnection` | `true` | Try to reconnect if a node was respawned (e.g., by a process manager) |
| `bond_respawn_max_duration` | `10.0` s | How long to wait for a respawned node before giving up |

> :bulb: **Tip**: When writing your own lifecycle nodes for use with Nav2, you can extend [`nav2_util::LifecycleNode`](https://docs.nav2.org/concepts/index.html#lifecycle-nodes-and-bond){:target="_blank"}  instead of `rclcpp_lifecycle::LifecycleNode`. The Nav2 variant adds the bond mechanism automatically and integrates with the Lifecycle Manager out of the box.
>
> ```cpp
> #include "nav2_util/lifecycle_node.hpp"
>
> class MyNav2Node : public nav2_util::LifecycleNode
> {
> public:
>   MyNav2Node()
>   : nav2_util::LifecycleNode("my_nav2_node")
>   {}
>   // ... same callbacks as before ...
> };
> ```
>
> The Nav2 `LifecycleNode` handles all the bond setup and teardown internally. From your callback perspective it is identical to the standard lifecycle > node — you just get crash detection for free.

## Lifecycle Nodes in Launch Files

You can trigger lifecycle transitions from a ROS 2 Python launch file using `EmitEvent` and `ChangeNodeLifecycleState`:

```python
from launch import LaunchDescription
from launch_ros.actions import LifecycleNode
from launch_ros.event_handlers import OnStateTransition
from launch_ros.events.lifecycle import ChangeState
from lifecycle_msgs.msg import Transition
from launch.actions import EmitEvent, RegisterEventHandler

def generate_launch_description():
    my_node = LifecycleNode(
        package='my_package',
        executable='my_lifecycle_node',
        name='my_node',
        namespace='',
        output='screen',
    )

    # After the node becomes 'inactive', activate it
    activate_handler = RegisterEventHandler(
        OnStateTransition(
            target_lifecycle_node=my_node,
            goal_state='inactive',
            entities=[
                EmitEvent(event=ChangeState(
                    lifecycle_node_matcher=launch_ros.events.lifecycle.matches_node_name(
                        node_name='my_node'
                    ),
                    transition_id=Transition.TRANSITION_ACTIVATE,
                )),
            ],
        )
    )

    # Configure immediately at startup
    configure_event = EmitEvent(
        event=ChangeState(
            lifecycle_node_matcher=launch_ros.events.lifecycle.matches_node_name(
                node_name='my_node'
            ),
            transition_id=Transition.TRANSITION_CONFIGURE,
        )
    )

    return LaunchDescription([
        my_node,
        configure_event,
        activate_handler,
    ])
```

This pattern — configure at startup, then activate once inactive — is the standard way to bring up a lifecycle node from a launch file without an external manager.

> :pushpin: **Note**: For production systems with many lifecycle nodes, prefer the Nav2 Lifecycle Manager over manual `EmitEvent` chains. The event-chain approach is useful for small setups or when you need fine-grained control over the startup sequence.

## Lifecycle Nodes vs. Plain Nodes: When to Use Each

| Scenario | Use lifecycle node? |
|----------|--------------------|
| Hardware driver (camera, LiDAR, IMU) | **Yes** — clean init/deinit |
| Sensor fusion or processing pipeline | **Yes** — start only when all inputs are ready |
| Simple CLI tool or one-shot script | No — overkill |
| Navigation stack node | **Yes** — mandatory for Nav2 integration |
| Debugging helper, data logger | No — usually simpler without lifecycle |
| Any node controlled by Nav2 | **Yes** — required |

A useful heuristic: if a node controls hardware, must start in a specific order relative to other nodes, or must be gracefully stopped and restarted at runtime — make it a lifecycle node.

## Conclusions

Lifecycle nodes are one of those features that feel like unnecessary complexity until the day you really need them. After that day, you cannot imagine going back to unmanaged nodes for any serious hardware or multi-node system.

The key takeaways:

- **4 primary states**: `Unconfigured`, `Inactive`, `Active`, `Finalized`.
- **6 transition states**: `Configuring`, `CleaningUp`, `Activating`, `Deactivating`, `ShuttingDown`, `ErrorProcessing`.
- Transitions are triggered externally (via service call or CLI); the node's callbacks determine success or failure.
- `rclcpp_lifecycle` gives you lifecycle publishers that automatically go silent when the node is `Inactive`.
- Nav2's Lifecycle Manager orchestrates an entire stack and adds the `bond` mechanism to detect silent crashes.
- Real-world hardware drivers like [ldrobot-lidar-ros2](https://myzhar.tech/projects/ros2/ldrobot-lidar-ros2/){:target="_blank"} use lifecycle nodes to ensure clean hardware initialization and safe teardown.

## Test your knowledge

**1. Which of the following are primary states in the ROS 2 lifecycle state machine? (select all that apply)**

- a) Configuring
- b) Unconfigured
- c) Active
- d) ErrorProcessing
- e) Finalized
- f) Activating

<details>
<summary>Show correct answers</summary>
<br>
<strong>b) Unconfigured, c) Active, e) Finalized</strong><br>
Primary states are stable: the node stays there until externally triggered. There are four in total — <code>Unconfigured</code>, <code>Inactive</code>, <code>Active</code>, and <code>Finalized</code>. <code>Configuring</code>, <code>Activating</code>, and <code>ErrorProcessing</code> are transition states: the node passes through them while executing a callback and cannot remain there.
</details>

---

**2. A lifecycle node has just been instantiated. Which transitions are valid from its initial state? (select all that apply)**

- a) `activate`
- b) `configure`
- c) `cleanup`
- d) `shutdown`
- e) `deactivate`

<details>
<summary>Show correct answers</summary>
<br>
<strong>b) configure, d) shutdown</strong><br>
The node starts in <code>Unconfigured</code>. From there the only valid external triggers are <code>configure</code> (→ Configuring → Inactive on success) and <code>shutdown</code> (→ ShuttingDown → Finalized). All other transitions require the node to first reach a different primary state.
</details>

---

**3. Your `on_configure` callback opens a serial port successfully but then fails to negotiate the baud rate. What should it return?**

- a) `CallbackReturn::SUCCESS`
- b) `CallbackReturn::FAILURE`
- c) `CallbackReturn::ERROR`
- d) Throw a `std::runtime_error`

<details>
<summary>Show correct answer</summary>
<br>
<strong>b) CallbackReturn::FAILURE</strong><br>
<code>FAILURE</code> is the correct soft failure: the node transitions back to <code>Unconfigured</code> and can be re-configured later. You must close the serial port yourself before returning — there is no automatic rollback. <code>FAILURE</code> does not trigger <code>ErrorProcessing</code>; that only happens with <code>CallbackReturn::ERROR</code> or an unhandled exception (c or d), which are semantically reserved for unexpected faults, not anticipated failures.
</details>

---

**4. Which statements about `rclcpp_lifecycle::LifecyclePublisher` are correct? (select all that apply)**

- a) Calling `publish()` while the node is `Inactive` silently discards the message
- b) It must be explicitly activated in `on_activate()` via `pub_->on_activate()`
- c) The base `LifecycleNode` class automatically activates all lifecycle publishers
- d) It behaves identically to a regular `rclcpp::Publisher` once activated
- e) The recommended place to create it is in `on_configure()`

<details>
<summary>Show correct answers</summary>
<br>
<strong>a) Calling publish() while the node is Inactive silently discards the message, b) It must be explicitly activated in on_activate() via pub_->on_activate(), d) It behaves identically to a regular rclcpp::Publisher once activated, e) The recommended place to create it is in on_configure()</strong><br>
A lifecycle publisher is state-aware: <code>publish()</code> is a no-op until you call <code>pub_->on_activate()</code> in your <code>on_activate</code> callback — the base class does not do it automatically (c is wrong). Once activated it behaves like any normal publisher. Creating it in <code>on_configure</code> is the standard pattern since that is where all resources are allocated.
</details>

---

**5. What happens when a bond breaks in the Nav2 Lifecycle Manager? (select all that apply)**

- a) Only the crashed node is restarted
- b) The Lifecycle Manager transitions all managed nodes down to a safe state
- c) The robot continues navigating using the last known state
- d) The Lifecycle Manager may attempt to reconnect if `attempt_respawn_reconnection` is `true`

<details>
<summary>Show correct answers</summary>
<br>
<strong>b) The Lifecycle Manager transitions all managed nodes down to a safe state, d) The Lifecycle Manager may attempt to reconnect if attempt_respawn_reconnection is true</strong><br>
When a bond breaks, the Lifecycle Manager begins a coordinated shutdown of all managed nodes — not just the crashed one — to bring the entire stack to a safe state. If <code>attempt_respawn_reconnection</code> is <code>true</code> and the node was respawned by an external process manager, it will try to reconnect within <code>bond_respawn_max_duration</code>. Leaving the stack running without the failed node (c, a) is precisely the unsafe behavior bonds are designed to prevent.
</details>

---

**6. You are writing a LiDAR driver as a lifecycle node. Which operations belong in `on_configure` and which in `on_activate`? (select all that apply)**

- a) Open the serial port
- b) begin laser scanning
- c) Create the `/scan` lifecycle publisher
- d) Start the publishing timer
- e) Call `scan_pub_->on_activate()`
- f) Read device parameters from the parameter server

<details>
<summary>Show correct answers</summary>
<br>
<strong>In on_configure: a) Open the serial port, c) Create the /scan lifecycle publisher, f) Read device parameters</strong><br>
<strong>In on_activate: d) Start the publishing timer, e) Call scan_pub_->on_activate()</strong><br>
<code>on_configure</code> sets up the interface: open hardware connections, allocate publishers, read parameters. The node is now <code>Inactive</code> — nothing flows yet. <code>on_activate</code> starts the data flow: enable the publisher, start timers, command the hardware to begin operating.
</details>

---

**7. Which services does a lifecycle node automatically expose? (select all that apply)**

- a) `change_state`
- b) `get_state`
- c) `set_parameters`
- d) `get_available_transitions`
- e) `get_available_states`
- f) `restart`

<details>
<summary>Show correct answers</summary>
<br>
<strong>a) change_state, b) get_state, d) get_available_transitions, e) get_available_states</strong><br>
Every lifecycle node exposes these four services automatically. <code>set_parameters</code> (c) is a standard node service, not lifecycle-specific. There is no <code>restart</code> service (f) — restarting is a sequence of <code>deactivate</code> + <code>cleanup</code> + <code>configure</code> + <code>activate</code> calls.
</details>

---

## What's next

The next tutorial of this series will cover **Services** and **Actions** to understand the main differences, and when to use one or the other. **Stay tuned**.

**Happy robotics programming!** :robot:
