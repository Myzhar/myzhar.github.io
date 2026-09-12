---
title: "ROS 2 Projects"
excerpt: "Open source ROS 2 packages for robotics: drivers, tools, and integration libraries."
author: "Walter Lucetti"
index: 2000
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/ros2/ros2-projects.jpg
  teaser: /assets/images/ros2/ros2-projects.jpg
layout: single
classes: wide
toc: false
sitemap: true
noindex: false
---

Welcome to the **ROS 2 Projects** collection! These are open source ROS 2 packages built to solve real integration problems that came up while working on actual robots, drivers and odometry components that are designed to be dropped into a running system rather than studied as examples. Every package here is written against modern ROS 2 practices: Nav2-style Lifecycle nodes, composable components, and the parameter and QoS conventions that make a node behave predictably inside a larger stack.

## What these projects have in common

Each project targets a specific, narrow problem rather than trying to be a general-purpose framework. The [LD Lidar ROS 2 Driver](/projects/ros2/ldrobot-lidar-ros2/) turns a low-cost LDRobot LD19/LD06 2D lidar into a fully integrated ROS 2 sensor, with Lifecycle management, SLAM Toolbox compatibility, and built-in benchmarking so you can verify the driver's performance on your own hardware before trusting it in production. [YALIO](/projects/ros2/yalio/) tackles the next problem in the same pipeline, odometry from that same class of low-cost 2D lidar, using Point-to-Line ICP scan matching packaged as a lifecycle-managed composable component so it slots into an existing Nav2-based stack without extra glue code.

## Who these projects are for

These packages are aimed at robotics developers who need a working, maintained driver or algorithm rather than a starting point to fork and rewrite: hobbyists building a budget SLAM-capable robot, students who need real sensor data flowing into Nav2 without reinventing a driver, and engineers evaluating whether a low-cost lidar can replace a more expensive sensor on a commercial platform. Familiarity with ROS 2 concepts (nodes, topics, parameters, launch files) is assumed; if you're still getting up to speed on those, the [ROS 2 Tutorials](/tutorials/ros2/) series covers the fundamentals these projects build on.

## Compatibility and requirements

All packages target current ROS 2 LTS distributions on Ubuntu and follow Lifecycle node conventions, so they compose cleanly with Nav2 and other managed-node stacks. Each project's repository documents its specific distro support, hardware requirements, and build instructions; where a package depends on vendor firmware or a specific sensor revision, that is called out in the project's own README rather than duplicated here.

## Why these projects are open source

Low-cost 2D lidars are common in hobbyist and educational robots, but the drivers and odometry algorithms available for them are often unmaintained, tied to ROS 1, or missing the Lifecycle and composition support that a modern Nav2 stack expects. These projects exist to close that gap, maintained, benchmarked, and kept current with ROS 2 best practices, so you can spend your time building the rest of your robot instead of patching a sensor driver.

|  | Project | Description |
| :----: | :------: | :---------- |
| [![LD Lidar ROS 2 Driver](/assets/images/projects/ldrobot-lidar-ros2/teaser.jpg)](/projects/ros2/ldrobot-lidar-ros2/) | [**LD Lidar ROS 2 Driver**](/projects/ros2/ldrobot-lidar-ros2/) | ROS 2 driver for LDRobot LD19/LD06 DToF 2D lidars, built on Nav2 Lifecycle nodes with full robot integration support, SLAM Toolbox compatibility, and benchmarking tools. |
| [![YALIO](/assets/images/projects/yalio/yalio-odometry.png)](/projects/ros2/yalio/) | [**YALIO, Yet Another Lidar ICP Odometry**](/projects/ros2/yalio/) | ROS 2 lidar odometry for low-cost 2D sensors, using Point-to-Line ICP scan matching in a lifecycle-managed composable component. |
{: style="table-layout: fixed;" }

<style>
  table th:nth-child(1), table td:nth-child(1) { width: 20%; }
  table th:nth-child(2), table td:nth-child(2) { width: 25%; }
  table th:nth-child(3), table td:nth-child(3) { width: 55%; }
</style>
