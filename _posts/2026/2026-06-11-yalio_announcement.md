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
  teaser: /assets/images/projects/yalio/yalio-odometry.png
  overlay_image: /assets/images/projects/yalio/yalio-odometry.png
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

In the few spare hours I've managed to carve out lately, I started working on a nice little project that I'm quite excited about: using **cheap 2D lidars to calculate robot odometry**. It’s one of those technical challenges that seems straightforward on paper but gets surprisingly deep once I started looking at the noise profiles of budget sensors and the nuances of real-time scan matching.

The project is called **YALIO**, which stands for *Yet Another Lidar ICP Odometry*, and I've made it available on GitHub at **[Myzhar/yalio-ros2](https://github.com/Myzhar/yalio-ros2){:target="_blank"}**.

To be honest, this is a project that has been on my mind for a long time. I spent a significant amount of time searching, but I could never find anything simple online that performs only odometry estimation using 2D lidar information. Most existing solutions are either buried inside massive, complex SLAM suites or are too specialized for a specific research platform. I wanted something modular, lightweight, and easy to drop into any ROS 2 stack—something that does one thing and does it well.

There's also a bit of personal history behind it. I first worked with **ICP (Iterative Closest Point) algorithms** back in **2005**, right after getting my laurea degree. Back then, I was working on my thesis, and the computational power I had available was a tiny fraction of what a modern NVIDIA Jetson offers. I’ve always wanted to go back and see how these algorithms have evolved over the 21 years since then. After digging back into the literature, I decided to go with **Point-to-Line ICP (PL-ICP)** because it seemed to be the most promising evolution of the original method for structured environments.

The idea is simple: low-cost 2D lidars like the **LDRobot LD19 and LD06** are everywhere now. While they are often used just for basic obstacle avoidance, I believe the scan data they produce is more than good enough to estimate the motion of a robot by matching consecutive scans. YALIO does exactly that. I chose PL-ICP because, unlike standard point-to-point matching, it accounts for the surface geometry of walls and corners, which makes it much more robust in the indoor environments where these 2D lidars typically operate.

I've implemented YALIO as a managed (lifecycle) ROS 2 component that loads into a shared container. However, I made a conscious effort to keep the core algorithm in a pure C++ library with no ROS dependency. This means the math can be reused in non-ROS projects or even on tiny embedded systems if needed. If you've followed my recent ROS 2 Lifecycle Nodes tutorial, you’ll recognize YALIO as a real-world application of those concepts: the odometry node is a `nav2_util::LifecycleNode` composable component, optionally managed by the Nav2 `lifecycle_manager`.

⚠️ Please keep in mind that the project is still a **work in progress**. I’m currently refining the error handling and tuning the parameters for higher speeds. In the next few weeks, once I have validated and tested it in different lighting and geometric conditions, I will add a new page to the ROS 2 Projects section to describe its internal architecture in detail.

In the meantime, I've already added a [new branch to my **LD Lidar ROS 2 Driver** repository](https://github.com/Myzhar/ldrobot-lidar-ros2/tree/add_yalio_odometry), `add_yalio_odometry`{:target="_blank"}. This branch uses YALIO as the primary odometry source in a new demo SLAM launch file. I finally got to replace the "fake" static odometry node I used in the original launch file with a real, dynamic estimate. This makes the SLAM demo much more meaningful and closer to how a real autonomous robot should behave.

I'm excited to see how this performs on MyzharBot in more complex environments. Stay tuned for updates, and feel free to try it out and open issues on GitHub if you find problems or have ideas for improvements!

Happy robotics programming! 🤖
