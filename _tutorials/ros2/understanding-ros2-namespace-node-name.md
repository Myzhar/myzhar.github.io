---
title: "Understanding ROS 2 Node Names and Namespaces"
excerpt: "This tutorial explains the concepts of node names and namespaces in ROS 2."
author: "Walter Lucetti"
index: 800
date: 2026-02-21 10:00:00 +01:00
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/ros2/understanding-ros2-node-names-namespaces.jpg
  teaser: /assets/images/ros2/understanding-ros2-node-names-namespaces.jpg
  actions:
    - label: "Official ROS 2 Website"
      url: "https://www.ros.org/"
layout: single
classes: single
---

## Introduction

Before diving into more advanced topics in ROS 2, it's essential to understand the basics of node names and namespaces. This tutorial is simple and quick, but these concepts are fundamental to organizing and managing your robotic applications effectively.

## ROS 2 Nodes and Names

In the [first ROS tutorial](/tutorials/ros2/understanding-ros2/), we have seen that nodes are the basic computational units in ROS 2, each handling a single modular task like sensor data publishing or motor control. Each node is identified by his **name**, multiple nodes can be "grouped" behind the same **namespace**.

## Node Names

Node names uniquely identify nodes within the ROS graph to prevent conflicts. By default, the executable name becomes the node name, but you can assign to each node a custom name by remapping it using `--ros-args -r __node:=new_name`.

For example, running

```bash
ros2 run demo_nodes_cpp talker --ros-args -r __node:=my_talker
```

changes the node from `/talker` to `/my_talker`.

This is useful for distinguishing between multiple instances of the same node type.

For example, on a robot with multiple cameras, you might have these names for the same camera type node:

- `/camera_front`
- `/camera_back`
- `/camera_left`
- `/camera_right`

## Namespaces

Namespaces provide a **prefix** for node names, topics, and services, enabling isolation normally required in multi-robot systems or when your robot is equipped with sensors and components of the same type. Namespaces are prepended to relative names and set via `--ros-args -r __ns:=/robot1`.

A node with namespace `/robot1` and name `sensor` becomes fully `/robot1/sensor`.

## Practical Example

Launch two identical publishers with different namespaces:

Open a terminal and enter:

```bash
ros2 run demo_nodes_py talker --ros-args -r __ns:=/robot1
```

Open a second terminal and enter:

```bash
ros2 run demo_nodes_py talker --ros-args -r __ns:=/robot2
```

Now open another terminal to understand what's happening

1. Run `ros2 node list` to see the active nodes:

   ```bash
   ros2 node list
   ```

   This shows the namespaced nodes:

   ```bash
   $ ros2 node list
   /robot1/talker
   /robot2/talker
   ```

2. Run the command `ros2 topic list` to see the active topics:

   ```bash
   ros2 topic list
   ```

   This shows the namespaced topics:

   ```bash
   $ ros2 topic list
   /parameter_events
   /robot1/chatter
   /robot2/chatter
   /rosout
   ```

The two talker nodes publish messages on the same topic `chatter`, but each within its namespace. Therefore, you know which node is publishing which message and you can subscribe to them individually, without conflicts and errors.

You can now launch a listener node to receive messages from one of the talker nodes, but you need to ensure it operates within the same namespace.

For the namespace `robot1`:

```bash
ros2 run demo_nodes_py listener --ros-args -r __ns:=/robot1
```

For the namespace `robot2`:

```bash
ros2 run demo_nodes_py listener --ros-args -r __ns:=/robot2
```

It is not mandatory that the subscriber node operates within the same namespace as the publisher node. There are situation where this setup is not valid, for example, when you have a node that monitors the status of multiple robots.

In this case you can use the fully qualified topic names to subscribe to the desired topics, using topic name remapping instead of node namespace remapping:

To subscribe to the chatter topic of the robot1 namespace, from another namespace:

```bash
ros2 run demo_nodes_py listener --ros-args -r chatter:=/robot1/chatter
```

To subscribe to the chatter topic of the robot2 namespace, from another namespace:

```bash
ros2 run demo_nodes_py listener --ros-args -r chatter:=/robot2/chatter
```

## Visual Graph Introspection

When the ROS 2 graph is running, you can visualize the nodes and their connections using tools like `rqt_graph`. This tool provides a graphical representation of the active nodes, topics, and services, making it easier to understand the system's architecture.

To use `rqt_graph`, simply run the following command in a terminal:

```bash
ros2 run rqt_graph rqt_graph
```

or more simply:

```bash
rqt_graph
```

This will open a new window displaying the current ROS 2 graph. You can see the namespaced nodes and their connections, helping you identify how data flows between different parts of your robotic system.

For example, in the first condition of the previous section, where each couple of talker and listener nodes were launched in their respective namespaces, `rqt_graph` will clearly show the separation between the two sets of nodes. You can easily identify which listener is subscribed to which talker by observing the namespaced topic connections:

{% include figure popup=true image_path="/assets/images/tutorials/ros2_launch/rqt_graph-two_nodes.jpg" alt="Two nodes running in their namespaces without listeners" caption="The two nodes running in their namespaces without listeners" %}

{% include figure popup=true image_path="/assets/images/tutorials/ros2_launch/rqt_graph-two_nodes-one_subscriber.jpg" alt="A listener node subscribed to a talker node" caption="A listener has been added in the robot2 namespace" %}

{% include figure popup=true image_path="/assets/images/tutorials/ros2_launch/rqt_graph-two_nodes-two_subscriber.jpg" alt="Two nodes running in their namespaces with listeners" caption="Both listeners are now active in their respective namespaces" %}

> :pushpin: **Note:** You can also run `rqt_graph` as a view in the `rqt` GUI by selecting it from `Plugins` -> `Introspection` -> `Node Graph`.

`rqt_graph` legend:

- The names in a circle represent nodes.
- The names in a rectangle represent topics.
- The arrows show the data stream flow between nodes.

By hovering the mouse arrow on a node, or on a topic, you can highlight all the connected entities.