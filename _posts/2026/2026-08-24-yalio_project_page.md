---
title: "The YALIO Project Page Is Now Available"
excerpt: "The ROS 2 Projects section now includes a dedicated page for YALIO, covering its lifecycle architecture, Point-to-Line ICP scan matching, and practical use on a robot."
date: 2026-08-24 18:00:00 +02:00
author: "Walter Lucetti"
layout: single
classes: wide
toc: false
breadcrumbs: false

sitemap: false
noindex: true

header:
  teaser: /assets/images/projects/yalio/yalio-odometry.png
  overlay_image: /assets/images/projects/yalio/yalio-odometry.png
  overlay_filter: "0.5"
  actions:
    - label: "<i class='fas fa-book-open'></i> Read the YALIO project page"
      url: "/projects/ros2/yalio/"
    - label: "<i class='fab fa-github'></i> YALIO on GitHub"
      url: "https://github.com/Myzhar/yalio-ros2"
      target: _blank

categories:
  - news
  - projects
  - website
  - robotics
tags:
  - updates
  - website
  - projects
  - ROS
  - ROS_2
  - robotics
  - lidar
  - odometry
  - ICP
  - SLAM
  - yalio
---

When I first announced **YALIO**, *Yet Another Lidar ICP Odometry*, I described it as a small but ambitious side project: a ROS 2 package that estimates a robot's motion from consecutive 2D lidar scans. I have now added a dedicated [YALIO project page](/projects/ros2/yalio/) to the ROS 2 Projects section, where I can explain the ideas behind the package in more detail than a repository README or a short announcement can comfortably hold.

YALIO is intended for affordable 2D lidars such as the **LDRobot LD19** and **LD06**. Instead of using scan data only for obstacle detection, it matches each new scan to a reference keyframe and estimates the robot's relative motion. This produces an odometry estimate that can be useful while bringing up a mobile robot, and it can be combined with a SLAM or localization back-end when an absolute pose is required.

The new page looks at YALIO from both the practical and architectural sides. It documents the three packages in the repository, explains how to build and launch the component, and describes the `odom_icp` output, TF publication, and odometry reset interfaces. It also makes a point of showing that the ROS 2 lifecycle model is not an afterthought in this project. The node is configured before its interfaces are ready, processes scans only when active, and can be managed automatically by the Nav2 lifecycle manager.

I also added a visual explanation of the **Point-to-Line ICP** loop. The animation follows a new lidar scan as it is matched to a fixed reference keyframe: local reference lines are identified, correspondences are formed, a planar correction is estimated, and the process repeats until the alignment converges. The page then links directly to the relevant implementation blocks in the YALIO source code, including correspondence search, trimmed outlier rejection, the Gauss-Newton solve, and covariance estimation.

{% include figure max_width="800px" popup=true image_path="/assets/images/projects/yalio/yalio-point-to-line-icp.gif" alt="Animated Point-to-Line ICP alignment used on the YALIO project page" caption="The YALIO project page includes an animated Point-to-Line ICP walkthrough for a new lidar scan." %}

The project remains a **work in progress**, and the page is intentionally a living companion to the code. I would be very grateful for tests in real environments, especially with different robots, lidar placements, surface geometries, and motion speeds. Real-world feedback is the best way to identify weak spots in a scan-matching odometry system and to improve the default parameters and error handling.

If you are interested in ROS 2 lifecycle nodes, composable components, low-cost lidar integration, or ICP-based odometry, have a look at the new [YALIO project page](/projects/ros2/yalio/). You can also browse the code, report an issue, or contribute an improvement in the [YALIO GitHub repository](https://github.com/Myzhar/yalio-ros2){: target="_blank"}.

Happy robotics programming! 🤖
