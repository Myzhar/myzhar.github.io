---
title: "ROS 2 Python launch file explained"
excerpt: "This tutorial explains how to create and use launch files in ROS 2 using Python, with best practices."
author: "Walter Lucetti"
index: 900
date: 2026-02-24 21:30:00 +01:00
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/ros2/python-launch-explained.jpg
  teaser: /assets/images/ros2/python-launch-explained.jpg
  actions:
    - label: "Official ROS 2 Website"
      url: "https://www.ros.org/"
    - label: "Support my work (sponsored link) :moneybag: "
      url: "https://likelihoodhangingbell.com/dp2wdk1h?key=30034c44490a811f41ecd32c62d751fd"
      target: _blank
layout: single
classes: single
---

## Introduction

In this tutorial, we will explore how to create and use launch files in ROS 2 using Python. Launch files are essential for managing complex robot systems, as they allow you to start multiple nodes and configure their parameters in a single, organized way. By the end of this tutorial, you will have a solid understanding of how to create and use Python launch files in your ROS 2 projects.

## Python modules

To create a Python launch file in ROS 2, you need to import the necessary modules. The most commonly used modules are:

- `launch`: The core launch module
  - [Official documentation](https://docs.ros.org/en/rolling/p/launch/)
  - [Source code](https://github.com/ros2/launch)
- `launch_ros`: A module that provides ROS 2 specific launch functionality
  - [Source code](https://github.com/ros2/launch_ros)

Here is an example of how to import these modules in your Python launch file:

```python
import launch
import launch_ros
```

### Submodules

The two main modules are composed of several submodules that provide additional functionality.

#### `launch` Submodules

The `launch` module includes several submodules that provide specific functionalities:

- `launch.actions`: Contains actions that can be executed during the launch process.
- `launch.conditions`: Provides conditions to control when actions are executed.
- `launch.descriptions`: Includes descriptions of launch entities.
- `launch.event_handlers`: Defines handlers for managing launch events.
- `launch.events`: Contains events that can be emitted during the launch process.
- `launch.frontend`: Provides support for parsing launch files written in various formats.
- `launch.launch_context`: Defines the context in which a launch process runs.
- `launch.launch_description`: Represents the description of a launch process.
- `launch.launch_service`: Manages the execution of a launch process.
- `launch.some_actions_type`: Placeholder for additional action types.
- `launch.substitutions`: Provides mechanisms for substituting values at runtime.
- `launch.utilities`: Includes utility functions and classes for the launch system.

For more details, refer to the [official documentation](https://docs.ros.org/en/rolling/p/launch/launch.html#module-launch){: target="_blank"}.

#### Functions, Classes, and Properties in `launch` Submodules

Here is a breakdown of the key functions, classes, and properties provided by each submodule in the `launch` module:

- **`launch.actions`**:
  - `ExecuteProcess`: Launches a process.
  - `DeclareLaunchArgument`: Declares a launch argument.
  - `IncludeLaunchDescription`: Includes another launch description.
  - `OpaqueFunction`: Represents an action that executes a Python function.

- **`launch.conditions`**:
  - `IfCondition`: Executes an action if a condition is true.
  - `UnlessCondition`: Executes an action unless a condition is true.

- **`launch.descriptions`**:
  - `LaunchDescription`: Represents a complete launch description.

- **`launch.event_handlers`**:
  - `OnProcessExit`: Handles events triggered when a process exits.
  - `OnProcessStart`: Handles events triggered when a process starts.

- **`launch.events`**:
  - `Shutdown`: Represents a shutdown event.
  - `ProcessExited`: Represents a process exit event.

- **`launch.frontend`**:
  - `Parser`: Parses launch files written in XML, YAML, or Python.

- **`launch.launch_context`**:
  - `LaunchContext`: Represents the context in which a launch process runs.

- **`launch.launch_description`**:
  - `LaunchDescription`: Contains the entities that define a launch process.

- **`launch.launch_service`**:
  - `LaunchService`: Manages the execution of a launch process.

- **`launch.substitutions`**:
  - `LaunchConfiguration`: Substitutes a value from the launch configuration.
  - `TextSubstitution`: Substitutes a static text value.

- **`launch.utilities`**:
  - `perform_substitutions`: Resolves substitutions at runtime.
  - `normalize_to_list_of_substitutions`: Normalizes input to a list of substitutions.

For a complete list of features, refer to the [official documentation](https://docs.ros.org/en/rolling/p/launch/launch.html#module-launch){: target="_blank"}.

#### `launch_ros` Submodules

The `launch_ros` module includes several submodules that provide ROS 2 specific launch functionalities:

- `launch_ros.actions`: Contains ROS 2 specific actions for the launch system.
- `launch_ros.descriptions`: Includes descriptions of ROS 2 specific launch entities.
- `launch_ros.event_handlers`: Defines handlers for managing ROS 2 specific launch events.
- `launch_ros.events`: Contains ROS 2 specific events that can be emitted during the launch process.
- `launch_ros.parameters_type`: Defines types for ROS 2 parameters.
- `launch_ros.substitutions`: Provides mechanisms for substituting ROS 2 specific values at runtime.
- `launch_ros.utilities`: Includes utility functions and classes for ROS 2 launch processes.

#### Functions, Classes, and Properties in `launch_ros` Submodules

Here is a breakdown of the key functions, classes, and properties provided by each submodule in the `launch_ros` module:

- **`launch_ros.actions`**:
  - `ComposableNodeContainer`: Launches a container for composable nodes.
  - `Node`: Launches a ROS 2 node.
  - `LifecycleNode`: Launches a ROS 2 lifecycle node.
  - `LifecycleTransition`: Represents a lifecycle transition.  
  - `LoadComposableNodes`: Loads composable nodes into a container.

- **`launch_ros.descriptions`**:
  - `ComposableNode`: Represents a composable node description.
  - `ComposableLifecycleNode`: Represents a composable lifecycle node description.

- **`launch_ros.event_handlers`**:
  - `OnStateTransition`: Handles events triggered by lifecycle state transitions.

- **`launch_ros.events`**:
  - `StateTransition`: Represents a lifecycle state transition event.
  - `ChangeState`: Represents a request to change the state of a lifecycle node.

- **`launch_ros.parameters_type`**:
  - `ParameterValue`: Represents a parameter value that can be set for a node.

- **`launch_ros.substitutions`**:
  - `FindPackage`: Substitutes the path to a package's share directory.
  - `Parameter`: Substitutes a parameter value.

- **`launch_ros.utilities`**:
  - `evaluate_parameters`: Resolves parameter substitutions at runtime.
  - `LifecycleEventManager`: Manages lifecycle events for nodes.
  - `namespace_utilities`: Provides utilities for working with namespaces.
  - `normalize_parameters`: Normalizes input to a list of parameters.
  - `normalize_remap_rules`: Normalizes input to a list of remap rules.

For more details, refer to the [source code on GitHub](https://github.com/ros2/launch_ros/tree/rolling/launch_ros/launch_ros){: target="_blank"}.

## Usage

We have seen that the `launch` and `launch_ros` modules provide a rich set of functionalities for managing the launch of ROS 2 nodes and systems. By leveraging the various actions, conditions, descriptions, event handlers, events, parameters, substitutions, and utilities, users can create flexible and powerful launch configurations.

The best way to understand how to use these modules is through examples.

This tutorial will focus on basic usage patterns for launching ROS 2 nodes. Future tutorials will focus on advanced usage scenarios, like Node Composition and Lifecycle Node Management.

### Basic example

In the [Starting ROS 2 Nodes tutorial](/tutorials/ros2/starting-ros2-nodes/#creating-a-simple-launch-file) we have already seen a basic example of launch file:

```bash
import launch
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='demo_nodes_cpp',
            executable='talker',
            output='screen',
            name='talker'
        ),
        Node(
            package='demo_nodes_cpp',
            executable='listener',
            output='screen',
            name='listener'
        )
    ])
```

Let's analyze the structure of this launch file:

1. **Imports**: The necessary modules are imported at the beginning. This includes the main `launch` module, the `LaunchDescription` class from the `launch` module, and the `Node` action from `actions` submodule of the main `launch_ros` module.

2. **Launch Description**: The `generate_launch_description` function creates and returns a `LaunchDescription` object. This object contains the list of actions to be executed when the launch file is run.

3. **Node Actions**: Inside the `LaunchDescription`, we define two `Node` actions:
   - The first `Node` action launches the `talker` node from the `demo_nodes_cpp` package.
   - The second `Node` action launches the `listener` node from the same package.

This basic launch file demonstrates how to launch multiple ROS 2 nodes using the `launch` and `launch_ros` modules. It serves as a foundation for more complex launch configurations that may involve additional features like parameters, remapping, and event handling.

## Launch file configuration

Launch file can have their own specific settings used to customize the launch process.

Settings are defined as `LaunchConfiguration` objects, which can be created using the `LaunchConfiguration` class from the `launch` module. These settings can then be accessed and modified throughout the launch file.

For example we can create a launch configuration to specify a common namespace for all the nodes started by the launch file.

We can modify the previous example to add this advanced feature:

```bash
import launch
from launch import LaunchDescription
from launch_ros.actions import Node
from launch.substitutions import LaunchConfiguration

def generate_launch_description():
    
    namespace = LaunchConfiguration('namespace', default='demo_namespace')

    return LaunchDescription([
        Node(
            package='demo_nodes_cpp',
            executable='talker',
            output='screen',
            name='talker',
            namespace=namespace
        ),
        Node(
            package='demo_nodes_cpp',
            executable='listener',
            output='screen',
            name='listener',
            namespace=namespace
        )
    ])
    return launch_description
```

This example makes the launch file more flexible, but it still misses something: the ability to customize the namespace from the command line. To achieve this, we can use the `DeclareLaunchArgument` function to declare a launch argument for the namespace. This allows users to specify the namespace when launching the file.

Here's the modified example:

```bash
import launch
from launch import LaunchDescription
from launch_ros.actions import Node
from launch.substitutions import LaunchConfiguration
from launch.actions import DeclareLaunchArgument

def generate_launch_description():

    namespace = LaunchConfiguration('namespace')

    return LaunchDescription([
        DeclareLaunchArgument(
          'namespace', 
          default_value='demo_namespace',
          description='Namespace for the nodes'
        ),
        Node(
            package='demo_nodes_cpp',
            executable='talker',
            output='screen',
            name='talker',
            namespace=namespace
        ),
        Node(
            package='demo_nodes_cpp',
            executable='listener',
            output='screen',
            name='listener',
            namespace=namespace
        )
    ])
    return launch_description
```

Now we can launch the file with a custom namespace using the command line:

Let's suppose to have created a package named `test_launch_pkg` and to have saved the launch file as `test_launch_pkg/launch/talker_listener_adv.launch.py`, then we can launch it with:

```bash
ros2 launch test_launch_pkg talker_listener_adv.launch.py namespace:=custom_namespace
```

This will start the `talker` and `listener` nodes under the `custom_namespace` namespace. If no namespace is provided, the default `demo_namespace` will be used:

```bash
$ ros2 launch test_launch_pkg talker_listener_adv.launch.py namespace:=custom_namespace
[INFO] [launch]: All log files can be found below /home/walter/.ros/log/2026-02-24-23-05-19-628873-walter-Legion-5-u24-31044
[INFO] [launch]: Default logging verbosity is set to INFO
[INFO] [talker-1]: process started with pid [31047]
[INFO] [listener-2]: process started with pid [31048]
[talker-1] [INFO] [1771970720.710569195] [custom_namespace.talker]: Publishing: 'Hello World: 1'
[listener-2] [INFO] [1771970720.710934315] [custom_namespace.listener]: I heard: [Hello World: 1]
[talker-1] [INFO] [1771970721.711117998] [custom_namespace.talker]: Publishing: 'Hello World: 2'
[listener-2] [INFO] [1771970721.711778468] [custom_namespace.listener]: I heard: [Hello World: 2]
[talker-1] [INFO] [1771970722.710816991] [custom_namespace.talker]: Publishing: 'Hello World: 3'
[listener-2] [INFO] [1771970722.711250763] [custom_namespace.listener]: I heard: [Hello World: 3]
[talker-1] [INFO] [1771970723.710654678] [custom_namespace.talker]: Publishing: 'Hello World: 4'
[listener-2] [INFO] [1771970723.711186993] [custom_namespace.listener]: I heard: [Hello World: 4]
[talker-1] [INFO] [1771970724.710782820] [custom_namespace.talker]: Publishing: 'Hello World: 5'
[listener-2] [INFO] [1771970724.711224484] [custom_namespace.listener]: I heard: [Hello World: 5]
^C[WARNING] [launch]: user interrupted with ctrl-c (SIGINT)
[talker-1] [INFO] [1771970725.362314578] [rclcpp]: signal_handler(signum=2)
[listener-2] [INFO] [1771970725.362314578] [rclcpp]: signal_handler(signum=2)
[INFO] [talker-1]: process has finished cleanly [pid 31047]
[INFO] [listener-2]: process has finished cleanly [pid 31048]
```

It's possible to get a list of all the available launch arguments by using the `-s` option:

```bash
$ ros2 launch test_launch_pkg talker_listener_adv.launch.py -s
Arguments (pass arguments as '<name>:=<value>'):

    'namespace':
        Namespace for the nodes
        (default: 'demo_namespace')
```

## Processing Launch Arguments and Launch Configurations

In ROS 2 launch files, managing launch arguments and configurations is crucial for creating flexible and reusable launch setups.

For example we would like to create a common prefix for the node names, in this case it's not very useful, because we already have the namespace, but it makes it easy to understand the next concepts.

Let's add the new Launch Configuration with the new Launch Parameter to set a node name common prefix:

```python
import launch
from launch import LaunchDescription
from launch_ros.actions import Node
from launch.substitutions import LaunchConfiguration
from launch.actions import DeclareLaunchArgument

def generate_launch_description():

    namespace = LaunchConfiguration('namespace')
    name_prefix = LaunchConfiguration('name_prefix')

    return LaunchDescription([
        DeclareLaunchArgument(
          'namespace', 
          default_value='demo_namespace',
          description='Namespace for the nodes'
        ),
        DeclareLaunchArgument(
          'name_prefix',
          default_value='',
          description='Common prefix for the node names'
        ),
        Node(
            package='demo_nodes_cpp',
            executable='talker',
            output='screen',
            name=name_prefix + 'talker',
            namespace=namespace
        ),
        Node(
            package='demo_nodes_cpp',
            executable='listener',
            output='screen',
            name=name_prefix + 'listener',
            namespace=namespace
        )
    ])
    return launch_description
```

What's changed here is that we want to perform an operation on the node name string by adding a prefix to it:

```python
name=name_prefix + 'talker',
```

and

```python
name=name_prefix + 'listener',
```

What does it happen if we try to start this new launch file?

```bash
$ ros2 launch test_launch_pkg talker_listener_advanced.launch.py namespace:=custom_namespace name_prefix:=demo_
[INFO] [launch]: All log files can be found below /home/walter/.ros/log/2026-02-24-23-21-41-884448-walter-Legion-5-u24-34746
[INFO] [launch]: Default logging verbosity is set to INFO
[ERROR] [launch]: Caught exception in launch (see debug for traceback): Caught multiple exceptions when trying to load file of format [py]:
 - TypeError: unsupported operand type(s) for +: 'LaunchConfiguration' and 'str'
 - InvalidFrontendLaunchFileError: The launch file may have a syntax error, or its format is unknown
```

`namespace` and `name_prefix` are both `LaunchConfiguration` objects, and you cannot directly concatenate them with strings.

We need a way to substitute their values into the strings we want to create.

To achieve this, we can use `launch.actions.OpaqueFunction` to create a function that will be called at runtime with the actual values of the launch configurations.

Inside this function we can use `perform()` passing the execution context as parameter to obtain the resolved values to be elaborated.

The example above must be modified as follows:

```python


```