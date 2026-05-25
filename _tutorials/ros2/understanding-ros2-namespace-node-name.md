---
title: "Understanding ROS 2 Node Names and Namespaces"
excerpt: "Learn how ROS 2 node names and namespaces work, how to rename and remap nodes at launch time, and best practices for organizing multi-robot systems cleanly."
author: "Walter Lucetti"
index: 1080
date: 2026-02-21 10:00:00 +01:00
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/ros2/understanding-ros2-node-names-namespaces.jpg
  teaser: /assets/images/ros2/understanding-ros2-node-names-namespaces.jpg
  actions:
    - label: "<i class='fas fa-globe'></i> Official ROS 2 Website"
      url: "https://www.ros.org/"
      target: _blank
layout: single
classes: single
---

## Introduction

Before diving into more advanced topics in ROS 2, it is essential to understand the basics of node names and namespaces. While this tutorial is brief, these concepts are fundamental to organizing and managing your robotic applications effectively.

## ROS 2 Nodes and Names

In the [first ROS tutorial](/tutorials/ros2/understanding-ros2/), we saw that nodes are the basic computational units in ROS 2, each handling a single modular task like sensor data publishing or motor control. Each node is identified by its **name**, and multiple nodes can be grouped under the same **namespace**.

## Node Names

Node names uniquely identify nodes within the ROS graph to prevent conflicts. By default, the executable name becomes the node name, but you can assign a custom name to each node by remapping it using `--ros-args -r __node:=new_name`.

For example, running:

```bash
ros2 run demo_nodes_cpp talker --ros-args -r __node:=my_talker
```

changes the node name from `/talker` to `/my_talker`.

This is useful for distinguishing between multiple instances of the same node type. For example, on a robot with multiple cameras, you might use the following names for the same camera node type:

- `/camera_front`
- `/camera_back`
- `/camera_left`
- `/camera_right`

## Namespaces

Namespaces provide a **prefix** for node names, topics, and services, enabling the isolation typically required in multi-robot systems or when a robot is equipped with multiple components of the same type. Namespaces are prepended to relative names and set via `--ros-args -r __ns:=/namespace_name`.

For example, a node with the namespace `/robot1` and the name `sensor` becomes **fully qualified** as `/robot1/sensor`.

## Practical Example

Launch two identical publishers with different namespaces.

Open a terminal and enter:

```bash
ros2 run demo_nodes_cpp talker --ros-args -r __ns:=/robot1
```

Open a second terminal and enter:

```bash
ros2 run demo_nodes_cpp talker --ros-args -r __ns:=/robot2
```

Now open another terminal to observe the system:

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

2. Run `ros2 topic list` to see the active topics:

   ```bash
   ros2 topic list
   ```

   This shows the namespaced topics:

   ```bash
   $ ros2 topic list
   /robot1/chatter
   /robot2/chatter
   [...]
   ```

The two talker nodes publish messages on the same `chatter` topic, but each within its own namespace. This allows you to know exactly which node is publishing which message, enabling you to subscribe to them individually without conflicts or errors.

You can now launch a listener node to receive messages from one of the talker nodes, ensuring it operates within the same namespace.

For the `robot1` namespace:

```bash
ros2 run demo_nodes_cpp listener --ros-args -r __ns:=/robot1
```

For the `robot2` namespace:

```bash
ros2 run demo_nodes_py listener --ros-args -r __ns:=/robot2
```

It is not mandatory for the subscriber node to operate within the same namespace as the publisher node. There are situations where this setup is not ideal, such as when a single node monitors the status of multiple robots.

In such cases, you can use fully qualified topic names to subscribe to the desired topics by using **topic name remapping** instead of **node namespace remapping**.

To subscribe to the `chatter` topic of the `robot1` namespace from another namespace:

```bash
ros2 run demo_nodes_cpp listener --ros-args -r chatter:=/robot1/chatter
```

To subscribe to the `chatter` topic of the `robot2` namespace from another namespace:

```bash
ros2 run demo_nodes_cpp listener --ros-args -r chatter:=/robot2/chatter
```

## Visual Graph Introspection

When the ROS 2 graph is running, you can visualize the nodes and their connections using tools like `rqt_graph`. This tool provides a graphical representation of the active nodes, topics, and services, making it easier to understand the system's architecture.

To use `rqt_graph`, run the following command in a terminal:

```bash
ros2 run rqt_graph rqt_graph
```

or simply:

```bash
rqt_graph
```

This opens a new window displaying the current ROS 2 graph. You can see the namespaced nodes and their connections, helping you identify how data flows between different parts of your robotic system.

For example, in the scenario from the previous section where each pair of talker and listener nodes was launched in their respective namespaces, `rqt_graph` clearly shows the separation between the two sets of nodes. You can easily identify which listener is subscribed to which talker by observing the namespaced topic connections:

{% include figure popup=true image_path="/assets/images/tutorials/ros2_launch/rqt_graph-two_nodes.jpg" alt="Two nodes running in their namespaces without listeners" caption="The two nodes running in their namespaces without listeners" %}

{% include figure popup=true image_path="/assets/images/tutorials/ros2_launch/rqt_graph-two_nodes-one_subscriber.jpg" alt="A listener node subscribed to a talker node" caption="A listener has been added in the robot2 namespace" %}

{% include figure popup=true image_path="/assets/images/tutorials/ros2_launch/rqt_graph-two_nodes-two_subscriber.jpg" alt="Two nodes running in their namespaces with listeners" caption="Both listeners are now active in their respective namespaces" %}

> :pushpin: **Note:** You can also run `rqt_graph` as a view in the `rqt` GUI by selecting it from `Plugins` -> `Introspection` -> `Node Graph`.

`rqt_graph` legend:

- Names in a circle represent nodes.
- Names in a rectangle represent topics.
- Arrows show the data stream flow between nodes.

By hovering the mouse cursor over a node or a topic, you can highlight all of its connected entities.

## Conclusions

In this tutorial, we explored the concept of node names and namespaces in ROS 2. You learned how namespaces can be used to organize and isolate nodes, topics, and services, allowing for better modularity and reduced naming conflicts in complex robotic systems. We also demonstrated how to run nodes with specific names and namespaces, visualize the ROS 2 graph using `rqt_graph`, and use topic name remapping to subscribe to topics across different namespaces.

Understanding and effectively using node names and namespaces is crucial for developing robust ROS 2 applications, especially when dealing with multiple robots or components. By leveraging these concepts, you can enhance the overall organization and clarity of your robotic systems.

## Test your knowledge

**1. How do you assign a custom name to a node at startup without modifying its code?**

- a) `ros2 run demo_nodes_cpp talker --name my_talker`
- b) `ros2 run demo_nodes_cpp talker --ros-args -r __node:=my_talker`
- c) `ros2 run demo_nodes_cpp talker --ros-args --node-name my_talker`
- d) `ros2 run demo_nodes_cpp talker -n my_talker`

<details>
<summary>Show correct answer</summary>
<br>
<strong>b) ros2 run demo_nodes_cpp talker --ros-args -r __node:=my_talker</strong><br>
Node name remapping uses <code>--ros-args -r __node:=new_name</code>. This changes the node's name in the ROS graph without altering the executable or its source code.
</details>

---

**2. What is the fully qualified name of a node with name `sensor` running under namespace `/robot1`?**

- a) `robot1/sensor`
- b) `/sensor/robot1`
- c) `/robot1/sensor`
- d) `sensor_robot1`

<details>
<summary>Show correct answer</summary>
<br>
<strong>c) /robot1/sensor</strong><br>
A fully qualified node name combines the namespace prefix and the node name with a leading slash: <code>/robot1/sensor</code>.
</details>

---

**3. Which command assigns the namespace `/robot2` to a node at startup?**

- a) `ros2 run demo_nodes_cpp talker --ros-args --namespace /robot2`
- b) `ros2 run demo_nodes_cpp talker --ros-args -r __ns:=/robot2`
- c) `ros2 run demo_nodes_cpp talker /robot2`
- d) `ros2 run demo_nodes_cpp talker --ns /robot2`

<details>
<summary>Show correct answer</summary>
<br>
<strong>b) ros2 run demo_nodes_cpp talker --ros-args -r __ns:=/robot2</strong><br>
Namespace remapping uses <code>--ros-args -r __ns:=/namespace_name</code>. This prepends the given namespace to the node name and all its relative topic and service names.
</details>

---

**4. What does topic name remapping allow you to do? (select all that apply)**

- a) Subscribe to a topic from a different namespace without changing the node's namespace
- b) Rename a topic to a fully qualified name at runtime
- c) Create a new topic type
- d) Redirect a node's topic to a topic published under another namespace

<details>
<summary>Show correct answers</summary>
<br>
<strong>a) Subscribe to a topic from a different namespace without changing the node's namespace, b) Rename a topic to a fully qualified name at runtime, d) Redirect a node's topic to a topic published under another namespace</strong><br>
Topic name remapping (e.g., <code>--ros-args -r chatter:=/robot1/chatter</code>) lets you redirect a node's relative topic name to any fully qualified topic name at launch time, without touching the node's source code or namespace.
</details>

---

**5. Which tool provides a graphical view of active nodes and their topic connections?**

- a) `ros2 node list`
- b) `rviz2`
- c) `rqt_graph`
- d) `ros2 topic echo`

<details>
<summary>Show correct answer</summary>
<br>
<strong>c) rqt_graph</strong><br>
<code>rqt_graph</code> renders the live ROS 2 graph as a visual diagram showing nodes (circles), topics (rectangles), and the data-flow arrows between them.
</details>

---

## What's next

The next tutorial of this series will explain how to create Python scripts to launch multiple configured nodes with a single command: [ROS 2 Python Launch File Explained](/tutorials/ros2/python-launch-explained/).

**Happy robotics programming!** :robot:
