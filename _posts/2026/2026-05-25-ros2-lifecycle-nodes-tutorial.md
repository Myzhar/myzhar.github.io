---
title: "New ROS 2 Tutorial: Lifecycle (Managed) Nodes"
excerpt: "A new in-depth tutorial covering the ROS 2 lifecycle state machine, all states and transitions, C++ implementation, Nav2 Lifecycle Manager, and real hardware driver examples."
date: 2026-05-24 22:00:00 +01:00
author: "Walter Lucetti"
layout: single
classes: wide
toc: false
breadcrumbs: false

sitemap: false
noindex: true

header:
  teaser: /assets/images/ros2/ros2-lifecycle-nodes.jpg
  overlay_image: /assets/images/ros2/ros2-lifecycle-nodes.jpg
  overlay_filter: "0.5"

categories:
  - updates
  - website
  - tutorials
tags:
  - updates
  - website
  - tutorials
  - ROS
  - ROS_2
  - robotics
  - lifecycle
  - managed_nodes
  - nav2
  - hardware_drivers
---

New tutorial out tonight: **[Lifecycle (Managed) Nodes: why, what, and how](/tutorials/ros2/ros2-lifecycle-nodes/)**.

This one has been sitting on my to-do list for a while, and for good reason — lifecycle nodes are one of those topics that you can technically ignore until the day you really need them, at which point you wish someone had forced you to learn them earlier. I've been burned enough times by unmanaged hardware drivers doing the wrong thing at startup that I felt it was time to write this properly.

The tutorial covers the full lifecycle state machine from first principles: the four primary states, the six transition states, all transitions with their success and failure paths, and what actually happens inside each callback. There's a detailed interactive diagram you can expand to read every state and arrow at full resolution.

{% include figure popup=true max_width="600px" image_path="/assets/images/tutorials/ros2_lifecycle_nodes/lifecycle-state-machine.svg" alt="ROS 2 Lifecycle Node State Machine diagram showing all states and transitions" caption="The complete ROS 2 lifecycle node state machine. Blue = primary states, amber = transition states, red = error handling state. Green arrows = success, red arrows = failure, dashed orange = error/shutdown paths." %}

On the practical side, I use my own [ldrobot-lidar-ros2](https://myzhar.tech/projects/ros2/ldrobot-lidar-ros2/) driver as a concrete example of why lifecycle nodes make sense for hardware: being able to stop a LiDAR motor without closing the serial port, or reconfigure the driver without destroying and recreating the node, is exactly the kind of thing that saves you in production.

The tutorial also covers **Nav2's Lifecycle Manager** and, more importantly, explains why Nav2 introduced its own `nav2_util::LifecycleNode` on top of the standard one — the *bond* mechanism. If you've ever had a navigation stack silently fall apart because one node crashed without anyone noticing, bonds are the answer to that.

And yes, there's a "Test Your Knowledge" section at the end. Seven multiple-choice questions, some with more than one correct answer. I put a particular amount of care into the `on_activate()` question — let's just say it was inspired by personal experience 😅

Happy robotics programming! 🤖
