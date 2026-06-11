---
title: "YALIO: Yet Another Lidar ICP Odometry"
excerpt: "A new side project is born: YALIO, a ROS 2 package that turns cheap 2D lidars like the LDRobot LD19/LD06 into a reliable odometry source using Point-to-Line ICP scan matching."
date: 2026-06-11 22:00:00 +01:00
author: "Walter Lucetti"
layout: single
classes: wide
toc: false
breadcrumbs: false

sitemap: true
noindex: false

header:
  teaser: /assets/images/yalio/yalio-odometry.png
  overlay_image: /assets/images/yalio/yalio-odometry.png
  overlay_filter: "0.5"
  actions:
    - label: "YALIO on GitHub"
      url: "https://github.com/Myzhar/yalio-ros2"
      target: _blank

categories:
  - news
  - projects
  - robotics
tags:
  - ROS
  - ROS_2
  - robotics
  - lidar
  - odometry
  - ICP
  - SLAM
  - ldrobot
  - LD19
  - LD06
  - yalio
---

In the few spare hours I've managed to carve out lately, I started working on a nice little project that I'm quite excited about: using **cheap 2D lidars to calculate robot odometry**.

The project is called **YALIO**, which stands for *Yet Another Lidar ICP Odometry*, and it's available on GitHub at **[Myzhar/yalio-ros2](https://github.com/Myzhar/yalio-ros2){:target="_blank"}**.

To be honest, this is a project that has been on my mind for a long time: I could never find anything simple online that performs only odometry estimation using 2D lidar information.

There's also a bit of personal history behind it. I worked with **ICP algorithms** back in **2005**, right after getting my laurea degree, and I've always wanted to study how these algorithms evolved over the 21 years since then. After digging into the literature, I decided to go with **Point-to-Line ICP (PL-ICP)** because it seemed to be the most promising evolution of the original algorithm.

The idea is simple: low-cost 2D lidars like the **LDRobot LD19 and LD06** are everywhere now, and the scan data they produce is good enough to estimate the motion of a robot by matching consecutive scans. YALIO does exactly that, using a **PL-ICP** scan matcher wrapped in a managed (lifecycle) ROS 2 component that loads into a shared container. The core algorithm lives in a pure C++ library with no ROS dependency, so it can be reused outside of ROS 2 as well.

If you've followed my recent [ROS 2 Lifecycle Nodes tutorial](/tutorials/ros2/ros2-lifecycle-nodes/), YALIO is also a real-world application of those concepts: the odometry node is a `nav2_util::LifecycleNode` composable component, optionally managed by the Nav2 `lifecycle_manager`.

⚠️ Keep in mind that the project is a **work in progress**. In the next few weeks, once it has been validated and tested in different conditions, I will add a new page to the [ROS 2 Projects](/projects/ros2/) section to describe it in detail.

In the meantime, I've already added a new branch to the **[LD Lidar ROS 2 Driver](/projects/ros2/ldrobot-lidar-ros2/)** repository, [`add_yalio_odometry`](https://github.com/Myzhar/ldrobot-lidar-ros2/tree/add_yalio_odometry){:target="_blank"}, which uses YALIO as the odometry source in a new demo SLAM launch file, replacing the fake odometry node used in the original launch file. A real odometry estimate instead of a static placeholder makes the SLAM demo much more meaningful.

Stay tuned for updates, and feel free to try it out and open issues on GitHub if you find problems!

Happy robotics programming! 🤖
