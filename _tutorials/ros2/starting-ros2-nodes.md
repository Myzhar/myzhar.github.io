---
title: "Starting ROS 2 Nodes"
excerpt: "Learn how to start and manage ROS 2 nodes in your robotics applications."
author: "Walter Lucetti"
index: 500
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/ros2/starting-ros2-nodes.jpg
  teaser: /assets/images/ros2/starting-ros2-nodes.jpg
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

In the [first tutorial about ROS 2](/tutorials/ros2/understanding-ros2/), I briefly introduced the concept of nodes as fundamental building blocks of a ROS 2 system. Nodes are processes that perform computation and communicate with each other using topics, services, and actions. In this tutorial, we will explore how to start and manage ROS 2 nodes effectively.

## Prerequisites

Before you begin, ensure you have the following:

1. **ROS 2 Installed**: Make sure you have a working installation of ROS 2. You can follow my tutorial on [Installing ROS 2](/tutorials/ros2/installing-ros2/) for guidance.
2. **Basic Knowledge of ROS 2 Concepts**: Familiarity with ROS 2 concepts such as nodes, topics, and services. You can refer to my introductory tutorial on [Understanding ROS 2](/tutorials/ros2/understanding-ros2/).

## Starting a ROS 2 Node

To start a ROS 2 node, you typically use the command-line interface (CLI) provided by ROS 2.

There are two common ways to start a node:

1. **Using the `ros2 run` Command**: This command allows you to run a specific node from a package. The syntax is as follows:

   ```bash
   ros2 run <package_name> <node_executable>
   ```

2. **Using a Launch File**: Launch files allow you to start multiple nodes and set their parameters with a single command. You can create a launch file using Python, XML, or YAML.

   ```bash
   ros2 launch <package_name> <launch_file>
   ```

Usually, the `ros2 run` command is used for simple cases when you want to start a single node quickly using the default parameters.

For more complex scenarios, such as starting multiple nodes or configuring parameters, launch files are preferred.

### Starting a Simple Node with `ros2 run`

As an example, we will start a simple talker node from the `demo_nodes_cpp` package using the `ros2 run` command:

1. Open a terminal.
2. Run the following command:

   ```bash
   ros2 run demo_nodes_cpp talker
   ```

This command will start the talker node, which will begin publishing messages to the `/topic` topic.

:pushpin: **NOTE**: Make sure that the `demo_nodes_cpp` package is installed in your ROS 2 environment:

```bash
sudo apt install ros-<ros2-distro>-demo-nodes-cpp
```

:bulb: **TIP**: After entering `ros2 run` in the terminal, you can press the `TAB` key twice to see a list of available packages. Type the first few letters of the package name and press `TAB` again to complete it. You can do the same for the node executable after typing the package name.

The `talker` node will start publishing messages to the `/topic` topic:

```bash
$ ros2 run demo_nodes_cpp talker
[INFO] [1769884855.147401206] [talker]: Publishing: 'Hello World: 1'
[INFO] [1769884856.147085415] [talker]: Publishing: 'Hello World: 2'
[INFO] [1769884857.147146647] [talker]: Publishing: 'Hello World: 3'
[INFO] [1769884858.147423698] [talker]: Publishing: 'Hello World: 4'
[INFO] [1769884859.147470611] [talker]: Publishing: 'Hello World: 5'
[INFO] [1769884860.147462206] [talker]: Publishing: 'Hello World: 6'
[INFO] [1769884861.147503530] [talker]: Publishing: 'Hello World: 7'
[INFO] [1769884862.147414311] [talker]: Publishing: 'Hello World: 8'
[...]
```

This is a typical output for a node:

`[INFO]` indicates the log level, followed by a timestamp, the node name in square brackets, and the message being published.

Each node can use different log levels, such as `DEBUG`, `INFO`, `WARN`, `ERROR`, and `FATAL`. You can configure the log level when starting the node by using the `--ros-args --log-level` option.

For example, to start the talker node with the `DEBUG` log level, you can use the following command:

```bash
ros2 run demo_nodes_cpp talker --ros-args --log-level DEBUG
```

I recommend testing this yourself to see more detailed output from the node, which is useful for debugging more complex nodes.

What can you do with this running node? You can start a listener node in another terminal to subscribe to the messages being published by the talker node:

```bash
ros2 run demo_nodes_cpp listener
```

This command will start the listener node, which will subscribe to the `/topic` topic and print the received messages to the console:

```bash
$ ros2 run demo_nodes_cpp listener
[INFO] [1769885224.727656373] [listener]: I heard: [Hello World: 16]
[INFO] [1769885225.679028053] [listener]: I heard: [Hello World: 17]
[INFO] [1769885226.679029148] [listener]: I heard: [Hello World: 18]
[INFO] [1769885227.679319522] [listener]: I heard: [Hello World: 19]
[INFO] [1769885228.679479360] [listener]: I heard: [Hello World: 20]
[...]
```

:pushpin: **NOTE**: You can see that the listener node is receiving messages published by the talker node in real time, so the message indexes do not start from 1 but continue from where the talker node is currently publishing.
If you want the listener to start receiving messages from the beginning, you need to start it before starting the talker node.

### Stopping a ROS 2 Node

To stop a running ROS 2 node, you can simply use the keyboard shortcut `Ctrl + C` in the terminal where the node is running. This will send a termination signal to the node, allowing it to shut down gracefully.

```bash
^C[INFO] [1769885228.950347430] [rclcpp]: signal_handler(signum=2)
```

If you pay close attention, you can see that the node name changed to `rclcpp`, which is the ROS 2 client library for C++. This indicates that the ROS 2 signal handler has been invoked and the node is in the process of shutting down.

### Using Launch Files to Start Multiple Nodes

For more complex applications, you may want to start multiple nodes simultaneously.

For example, we can create a launch file to start both the talker and listener nodes together.

:pushpin: **NOTE**: In this tutorial, I will not cover how to create launch files in detail. If you are interested in learning more about launch files, please refer to the official ROS 2 documentation on the [Launch System](https://docs.ros.org/en/rolling/Tutorials/Intermediate/Launch/Creating-Launch-Files.html).

#### Creating a Simple Launch File

My preferred way to create launch files is using Python, as it provides more flexibility and allows for complex logic.

Here is an example of a simple launch file that starts both the talker and listener nodes with a single command:

```python
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

Each node is created using the `Node` action from the `launch_ros.actions` module. We specify the package name, executable name, output method (in this case, `screen` to print output to the terminal), and a custom name for each node.

The `LaunchDescription` object contains a list of all the nodes we want to start.

Finally, the `generate_launch_description` function returns the `LaunchDescription` object, which is used by the ROS 2 launch system to start the nodes.

This launch file is extremely simple, but it demonstrates the basic structure of a ROS 2 launch file using Python.

If you are curious, I suggest exploring more advanced launch files in one of my GitHub repositories, for example the one I created to start a ROS 2 node to use a LiDAR sensor: [ldlidar_bringup.launch.py](https://github.com/Myzhar/ldrobot-lidar-ros2/blob/devel/ldlidar_node/launch/ldlidar_bringup.launch.py).

#### Running the Launch File

To use this launch file, you must first create a new ROS 2 package (if you don't have one already) and save the launch file in the `launch` directory of your package:

```bash
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python test_launch_pkg
cd test_launch_pkg
```

Now create a `launch` directory and save the above launch file as `talker_listener.launch.py`:

```bash
mkdir launch
nano launch/talker_listener.launch.py
```

Paste the launch file content into the `nano` editor, save it, and exit.

To enable ROS 2 to locate and use our launch files, we need to inform Python’s setup tools of their presence. To achieve this, open the `setup.py` file that was automatically created, add the necessary import statements at the top, and include the launch files in the `data_files` parameter of `setup`:

```python
import os
from glob import glob
# Other imports ...

package_name = 'test_launch_pkg'

setup(
    # Other parameters ...
    data_files=[
        # ... Other data files
        # Include all launch files.
        (os.path.join('share', package_name, 'launch'), glob('launch/*'))
    ]
)
```

Next, build your package and update the environment to let ROS 2 recognize the new package:

```bash
cd ~/ros2_ws
colcon build
source install/setup.bash
```

Now you can start both nodes using the launch file:

```bash
ros2 launch test_launch_pkg talker_listener.launch.py
```

This command will start both the talker and listener nodes, and you will see their output in the terminal:

```bash
$ ros2 launch test_launch_pkg talker_listener.launch.py 
[INFO] [launch]: All log files can be found below /home/walter/.ros/log/2026-01-31-20-15-52-305861-walter-Legion-5-u24-44838
[INFO] [launch]: Default logging verbosity is set to INFO
[INFO] [talker-1]: process started with pid [44841]
[INFO] [listener-2]: process started with pid [44842]
[talker-1] [INFO] [1769886953.418751083] [talker]: Publishing: 'Hello World: 1'
[listener-2] [INFO] [1769886953.419166019] [listener]: I heard: [Hello World: 1]
[talker-1] [INFO] [1769886954.418596526] [talker]: Publishing: 'Hello World: 2'
[listener-2] [INFO] [1769886954.418948393] [listener]: I heard: [Hello World: 2]
[talker-1] [INFO] [1769886955.418740433] [talker]: Publishing: 'Hello World: 3'
[listener-2] [INFO] [1769886955.419021620] [listener]: I heard: [Hello World: 3]
[talker-1] [INFO] [1769886956.418598082] [talker]: Publishing: 'Hello World: 4'
[listener-2] [INFO] [1769886956.419057996] [listener]: I heard: [Hello World: 4]
[talker-1] [INFO] [1769886957.418826343] [talker]: Publishing: 'Hello World: 5'
[listener-2] [INFO] [1769886957.419250637] [listener]: I heard: [Hello World: 5]
[talker-1] [INFO] [1769886958.418564125] [talker]: Publishing: 'Hello World: 6'
[listener-2] [INFO] [1769886958.418831483] [listener]: I heard: [Hello World: 6]
[talker-1] [INFO] [1769886959.418563425] [talker]: Publishing: 'Hello World: 7'
[listener-2] [INFO] [1769886959.419143538] [listener]: I heard: [Hello World: 7]
^C[WARNING] [launch]: user interrupted with ctrl-c (SIGINT)
[listener-2] [INFO] [1769886960.051608141] [rclcpp]: signal_handler(signum=2)
[talker-1] [INFO] [1769886960.051608141] [rclcpp]: signal_handler(signum=2)
[INFO] [talker-1]: process has finished cleanly [pid 44841]
[INFO] [listener-2]: process has finished cleanly [pid 44842]
```

This output shows that both nodes are running simultaneously, with the talker publishing messages and the listener receiving them in sequence.

It is clear that the Python launch system also provides more logging information, such as process IDs and log file locations, which can be very useful for debugging and monitoring your nodes.

:pushpin: **NOTE**: I will cover more advanced topics about packages, the details of their structure, and how to create them in future tutorials. If you are interested in learning more about ROS 2 packages, please refer to the official ROS 2 documentation on [Creating a ROS 2 Package](https://docs.ros.org/en/rolling/Tutorials/Beginner-Client-Libraries/Creating-Your-First-ROS2-Package.html).

## Conclusion

In this tutorial, we explored how to start and manage ROS 2 nodes using both the `ros2 run` command and launch files. We demonstrated starting a simple talker node and a listener node, as well as creating a launch file to start both nodes simultaneously.

Understanding how to start and manage nodes is essential for building complex robotics applications using ROS 2. In future tutorials, we will delve deeper into node communication, parameter management, and more advanced topics.

Happy coding with ROS 2!
