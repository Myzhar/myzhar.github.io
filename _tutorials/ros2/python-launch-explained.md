---
title: "ROS 2 Python launch file explained"
excerpt: "This tutorial explains how to create and use launch files in ROS 2 using Python, with best practices."
author: "Walter Lucetti"
index: 1090
date: 2026-05-11 21:30:00 +01:00
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/ros2/python-launch-explained.jpg
  teaser: /assets/images/ros2/python-launch-explained.jpg
  actions:
    - label: "<i class='fas fa-globe'></i> Official ROS 2 Website"
      url: "https://www.ros.org/"
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

```python
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

```python
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
```

This example makes the launch file more flexible, but it still misses something: the ability to customize the namespace from the command line.

### Declaring Launch Arguments

To customize launch configuration values we must use the `DeclareLaunchArgument` function to declare launch arguments.

Here's the modified example to be able to modify the namespace configuration from the launch command line:

```python
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
```

Let's suppose to have created a package named `test_launch_pkg` and to have saved the launch file as `test_launch_pkg/launch/talker_listener_adv.launch.py`.
Now we can launch the file with a custom namespace using the command line:

```bash
ros2 launch test_launch_pkg talker_listener_adv.launch.py namespace:=custom_namespace
```

The command above will start the `talker` and `listener` nodes under the `custom_namespace` namespace:

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

For example, we would like to create a common prefix for the node names.

> :pushpin: **Note**: the example is useless, because we already have the namespace and we do not need a node name prefix, but it makes it easy to understand the important concepts of this section.

Let's create the new Launch Configuration with the new Launch Parameter and use it to change the name of the nodes:

```python
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
            name=name_prefix + 'talker', # Operation on the node name
            namespace=namespace
        ),
        Node(
            package='demo_nodes_cpp',
            executable='listener',
            output='screen',
            name=name_prefix + 'listener', # Operation on the node name
            namespace=namespace
        )
    ])
```

What's changed here is that we want to perform an operation on the node name string by adding a prefix to it:

```python
name=name_prefix + 'talker',
```

and

```python
name=name_prefix + 'listener',
```

What does it happen if we try to run this new launch file?

```bash
$ ros2 launch test_launch_pkg talker_listener_advanced.launch.py namespace:=custom_namespace name_prefix:=demo_
[INFO] [launch]: All log files can be found below /home/walter/.ros/log/2026-02-24-23-21-41-884448-walter-Legion-5-u24-34746
[INFO] [launch]: Default logging verbosity is set to INFO
[ERROR] [launch]: Caught exception in launch (see debug for traceback): Caught multiple exceptions when trying to load file of format [py]:
 - TypeError: unsupported operand type(s) for +: 'LaunchConfiguration' and 'str'
 - InvalidFrontendLaunchFileError: The launch file may have a syntax error, or its format is unknown
```

`namespace` and `name_prefix` are both `LaunchConfiguration` objects, not `string`, and you cannot directly concatenate them with string variables.

Generally speaking, you cannot use the value of a `LaunchConfiguration` directly in any kind of operation involving other variable types.

In this case, we need a way to substitute their values into the strings we want to create.

To achieve this, we can use `launch.actions.OpaqueFunction` to create a function that will be called at runtime with the actual values of the launch configurations.

Inside this function we can use `perform()` passing the execution context as parameter to obtain the resolved values to be elaborated.

The example above must be modified. In my opinion, this is the most effective way of creating Python launch files, and this is how I normally do:

```python
from launch import LaunchDescription
from launch_ros.actions import Node
from launch.substitutions import LaunchConfiguration
from launch.actions import (
    DeclareLaunchArgument,
    OpaqueFunction
)

# This is the function that fills the array of actions used to generate the launch description.
def launch_setup(context, *args, **kwargs):
    # Empty actions array
    actions = []

    # Declare the launch configurations
    namespace_conf = LaunchConfiguration('namespace')
    name_prefix_conf = LaunchConfiguration('name_prefix')

    # Create variables storing the launch configuration values
    namespace_str = namespace_conf.perform(context)
    name_prefix_str = name_prefix_conf.perform(context)

    # Create the nodes
    talker_node = Node(
        package='demo_nodes_cpp',
        executable='talker',
        output='screen',
        name=name_prefix_str + 'talker',
        namespace=namespace_str
    )
    listener_node = Node(
        package='demo_nodes_cpp',
        executable='listener',
        output='screen',
        name=name_prefix_str + 'listener',
        namespace=namespace_str
    )

    # Add the nodes to the action list
    actions.append(talker_node)
    actions.append(listener_node)

    # Return the list of actions
    return actions

# Create the launch description
def generate_launch_description():
    return LaunchDescription(
        [
            # Declare the Launch Arguments
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
            # This function will be called and processed at runtime
            OpaqueFunction(function=launch_setup)
        ]
    )
```

The **`launch_setup()`** function is a helper callback responsible for dynamically creating and configuring the actions (nodes, parameters, etc.) that make up the launch process. It is executed at runtime through an `OpaqueFunction`, allowing access to the launch context and substitution values (like launch arguments).

Within this function:

- It first initializes an empty list named `actions`, which will store all the actions to be executed in the launch description.
- Two `LaunchConfiguration` objects are created:  
  - **`namespace_conf`** retrieves the value of the `namespace` argument.  
  - **`name_prefix_conf`** retrieves the value of the `name_prefix` argument.  
- Using these configurations, the corresponding string values are extracted via the `.perform(context)` method. This ensures that any substitution or runtime evaluation (from command-line arguments or parent launches) is resolved before being used.
- Two ROS 2 nodes are then defined using the `Node` action:  
  - A **`talker`** node, which publishes messages.  
  - A **`listener`** node, which subscribes to those messages.  
  Both nodes are assigned names composed of `name_prefix_str` + their base name and are placed under the specified `namespace_str`.
- These node actions are appended to the `actions` list, which the function returns at the end.

When `generate_launch_description()` is executed, it:

1. Declares the `namespace` and `name_prefix` arguments with default values and descriptions.  
2. Calls the `launch_setup()` function via an `OpaqueFunction`, ensuring that the launch configuration values are resolved in the correct order.  
3. Returns a `LaunchDescription` object containing the declared arguments and the dynamically generated actions.

### Example execution

Let's suppose to have saved the new launch file as `talker_listener_with_args.launch.py` in the package `test_launch_pkg`.

When you launch this file with:

```bash
ros2 launch test_launch_pkg talker_listener_with_args.launch.py namespace:=example name_prefix:=my_
```

it will create two nodes:

- `/example/my_talker`
- `/example/my_listener`

With the following output:

```bash
$ ros2 launch test_launch_pkg talker_listener_with_args.launch.py namespace:=example name_prefix:=my_
[INFO] [launch]: All log files can be found below /home/walter/.ros/log/2026-02-28-13-47-30-997312-walter-Legion-5-u24-11379
[INFO] [launch]: Default logging verbosity is set to INFO
[INFO] [talker-1]: process started with pid [11382]
[INFO] [listener-2]: process started with pid [11383]
[talker-1] [INFO] [1772282852.190707789] [example.my_talker]: Publishing: 'Hello World: 1'
[listener-2] [INFO] [1772282852.191514754] [example.my_listener]: I heard: [Hello World: 1]
[talker-1] [INFO] [1772282853.190900040] [example.my_talker]: Publishing: 'Hello World: 2'
[listener-2] [INFO] [1772282853.191426447] [example.my_listener]: I heard: [Hello World: 2]
[talker-1] [INFO] [1772282854.190641277] [example.my_talker]: Publishing: 'Hello World: 3'
[listener-2] [INFO] [1772282854.191206167] [example.my_listener]: I heard: [Hello World: 3]
[talker-1] [INFO] [1772282855.190680702] [example.my_talker]: Publishing: 'Hello World: 4'
[listener-2] [INFO] [1772282855.191432422] [example.my_listener]: I heard: [Hello World: 4]
[talker-1] [INFO] [1772282856.190642144] [example.my_talker]: Publishing: 'Hello World: 5'
[listener-2] [INFO] [1772282856.191208221] [example.my_listener]: I heard: [Hello World: 5]
[talker-1] [INFO] [1772282857.190921400] [example.my_talker]: Publishing: 'Hello World: 6'
[listener-2] [INFO] [1772282857.191540698] [example.my_listener]: I heard: [Hello World: 6]
^C[WARNING] [launch]: user interrupted with ctrl-c (SIGINT)
[listener-2] [INFO] [1772282857.569766319] [rclcpp]: signal_handler(signum=2)
[talker-1] [INFO] [1772282857.569774420] [rclcpp]: signal_handler(signum=2)
[INFO] [talker-1]: process has finished cleanly [pid 11382]
[INFO] [listener-2]: process has finished cleanly [pid 11383]
```

## A real example

Let's use Python, launch configuration, launch arguments, and see how they work together in a practical scenario.

We have a robot that can be used with a variable number of webcams to analyze the environment. We want to create a launch file that allows us to specify the number of webcams to use and their individual configurations.

Let's install the [`camera-ros` package](https://docs.ros.org/en/ros2_packages/rolling/api/camera_ros/) to use the webcams:

```bash
sudo apt install ros-jazzy-camera-ros
```

the package provides the `camera_ros camera.launch.py` launch file to start a configured camera:

```bash
$ ros2 launch camera_ros camera.launch.py -s
Arguments (pass arguments as '<name>:=<value>'):

    'camera':
        camera ID or name
        (default: '0')

    'format':
        pixel format
        (default: '')
```

The idea is to create a launch file to be launched with this command:

```bash
ros2 launch my_package multi_webcam.launch.py cam_names:=[front,rear,left,right] cam_ids:=[0,1,2,3]
```

The launch files will create _N_ nodes according to the size of the `cam_names` and `cam_ids` arrays.

```python
import os
from launch import LaunchDescription
from launch.actions import (
    DeclareLaunchArgument,
    IncludeLaunchDescription,
    OpaqueFunction,
)
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import GroupAction, PushRosNamespace
from launch_ros.substitutions import FindPackageShare


def launch_setup(context, *args, **kwargs):
    actions = []

    # Resolve launch argument values to plain strings
    cam_names_str = LaunchConfiguration('cam_names').perform(context)
    cam_ids_str = LaunchConfiguration('cam_ids').perform(context)

    # Parse "[front,rear,left,right]" -> ['front', 'rear', 'left', 'right']
    cam_names = [n.strip() for n in cam_names_str.strip('[]').split(',')]
    cam_ids = [i.strip() for i in cam_ids_str.strip('[]').split(',')]

    if len(cam_names) != len(cam_ids):
        raise RuntimeError(
            f"'cam_names' and 'cam_ids' must have the same length "
            f"({len(cam_names)} vs {len(cam_ids)})"
        )

    # Locate the camera_ros launch file once
    camera_launch_file = os.path.join(
        FindPackageShare('camera_ros').perform(context),
        'launch',
        'camera.launch.py'
    )

    # For each camera, include camera.launch.py inside its own namespace
    for name, cam_id in zip(cam_names, cam_ids):
        actions.append(
            GroupAction(
                actions=[
                    PushRosNamespace(name),
                    IncludeLaunchDescription(
                        PythonLaunchDescriptionSource(camera_launch_file),
                        launch_arguments={'camera': cam_id}.items(),
                    ),
                ]
            )
        )

    return actions


def generate_launch_description():
    return LaunchDescription([
        DeclareLaunchArgument(
            'cam_names',
            default_value='[front]',
            description='Comma-separated list of camera names, e.g. [front,rear,left,right]'
        ),
        DeclareLaunchArgument(
            'cam_ids',
            default_value='[0]',
            description='Comma-separated list of camera device IDs, e.g. [0,1,2,3]'
        ),
        OpaqueFunction(function=launch_setup),
    ])
```

Let's break down the key parts of this launch file:

- **Argument parsing**: `cam_names` and `cam_ids` are received as strings (e.g. `"[front,rear,left,right]"`). Inside `launch_setup()` the brackets are stripped and the values split on commas to produce plain Python lists. This must happen inside `launch_setup()` because `.perform(context)` — which resolves the actual runtime string — is only available there.

- **Validation**: before creating any node, the lengths of the two lists are checked. A mismatch raises a `RuntimeError` early so the user gets a clear error message rather than a silent misconfiguration.

- **Dynamic node instantiation**: a `for` loop iterates over the paired `(name, cam_id)` tuples. For each pair it creates a `GroupAction` that:
  - pushes a ROS namespace equal to the camera name using `PushRosNamespace`, so every topic and service published by that camera node is automatically scoped under `/front/`, `/rear/`, etc.
  - includes `camera.launch.py` from the `camera_ros` package, forwarding only the `camera` argument (the device ID).

### Running the multi-webcam launch file

Running the launch file with four webcams:

```bash
ros2 launch my_package multi_webcam.launch.py cam_names:=[front,rear,left,right] cam_ids:=[0,1,2,3]
```

produces four independent camera nodes:

| Node path | Device |
| --- | --- |
| `/front/camera` | `/dev/video0` |
| `/rear/camera` | `/dev/video1` |
| `/left/camera` | `/dev/video2` |
| `/right/camera` | `/dev/video3` |

Each node publishes its image stream under its own namespace, e.g. `/front/camera/image_raw`, `/rear/camera/image_raw`, and so on, keeping all topics neatly separated without any manual remapping.

## Conclusions

In this tutorial we have covered the essential building blocks for writing Python launch files in ROS 2:

- **Basic structure**: every launch file exposes a `generate_launch_description()` function that returns a `LaunchDescription` containing the actions to execute.
- **`LaunchConfiguration` and `DeclareLaunchArgument`**: these two classes work together to expose configurable parameters that callers can override from the command line. Always declare the argument inside `LaunchDescription` before referencing its configuration.
- **`OpaqueFunction`**: the recommended pattern whenever you need to operate on launch configuration values as plain Python strings. Move all logic that depends on resolved values into a `launch_setup(context, *args, **kwargs)` helper and register it via `OpaqueFunction(function=launch_setup)`. This sidesteps the `LaunchConfiguration` + `str` type mismatch that breaks naive concatenation.
- **`IncludeLaunchDescription` + `GroupAction` + `PushRosNamespace`**: the standard trio for reusing an existing launch file multiple times while keeping each instance isolated under its own namespace.

The pattern below is a solid template to start any new Python launch file from:

```python
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument, OpaqueFunction
from launch.substitutions import LaunchConfiguration


def launch_setup(context, *args, **kwargs):
    actions = []

    my_param = LaunchConfiguration('my_param').perform(context)

    # ... build and append actions using plain Python strings ...

    return actions


def generate_launch_description():
    return LaunchDescription([
        DeclareLaunchArgument(
            'my_param',
            default_value='default',
            description='Description of my_param'
        ),
        OpaqueFunction(function=launch_setup),
    ])
```

### What's next

Future tutorials will cover more advanced launch patterns:

- **Node Composition** — loading multiple nodes into a single process using `ComposableNodeContainer` and `LoadComposableNodes` to reduce inter-process communication overhead.
- **Lifecycle Node Management** — orchestrating nodes that follow the ROS 2 managed-node lifecycle with `LifecycleNode` and `OnStateTransition` event handlers.

## Test your knowledge

**1. What is the entry point function that the ROS 2 launch system requires in every Python launch file?**

- a) `main()`
- b) `launch()`
- c) `generate_launch_description()`
- d) `create_launch()`

<details>
<summary>Show correct answer</summary>
<br>
<strong>c) generate_launch_description()</strong><br>
The ROS 2 launch system looks for a function named <code>generate_launch_description()</code> and calls it to obtain the <code>LaunchDescription</code> object that defines all nodes and actions to start.
</details>

---

**2. Which action is used to declare a configurable argument in a Python launch file?**

- a) `LaunchArgument`
- b) `DeclareLaunchArgument`
- c) `SetLaunchArgument`
- d) `AddLaunchArgument`

<details>
<summary>Show correct answer</summary>
<br>
<strong>b) DeclareLaunchArgument</strong><br>
<code>DeclareLaunchArgument</code> from <code>launch.actions</code> declares a named argument that can be passed on the command line when running <code>ros2 launch</code>, and optionally sets a default value and description.
</details>

---

**3. What is the purpose of `OpaqueFunction` in a Python launch file?**

- a) It hides sensitive launch arguments from the terminal output
- b) It wraps a plain Python function so it executes during the launch process, allowing arguments to be resolved before building nodes
- c) It launches a node without any output
- d) It creates an anonymous node with no name

<details>
<summary>Show correct answer</summary>
<br>
<strong>b) It wraps a plain Python function so it executes during the launch process, allowing arguments to be resolved before building nodes</strong><br>
<code>OpaqueFunction</code> defers node construction to a regular Python function (<code>launch_setup</code>). Inside that function you can call <code>.perform(context)</code> on any <code>LaunchConfiguration</code> to get its resolved string value and use plain Python logic to build the actions.
</details>

---

**4. Which substitution resolves the value of a declared launch argument at runtime?**

- a) `TextSubstitution`
- b) `LaunchConfiguration`
- c) `FindPackage`
- d) `EnvironmentVariable`

<details>
<summary>Show correct answer</summary>
<br>
<strong>b) LaunchConfiguration</strong><br>
<code>LaunchConfiguration('arg_name')</code> is a substitution that resolves to the current value of a declared launch argument at the moment the launch description is executed.
</details>

---

**5. Which actions from `launch_ros.actions` can be used to start a standard ROS 2 node? (select all that apply)**

- a) `Node`
- b) `LifecycleNode`
- c) `ComposableNodeContainer`
- d) `ExecuteProcess`

<details>
<summary>Show correct answers</summary>
<br>
<strong>a) Node, b) LifecycleNode</strong><br>
<code>Node</code> starts a regular ROS 2 node, and <code>LifecycleNode</code> starts a managed lifecycle node. <code>ComposableNodeContainer</code> starts a container for composable nodes (not a standalone node), and <code>ExecuteProcess</code> is a generic process launcher from the core <code>launch</code> module, not ROS 2 specific.
</details>

