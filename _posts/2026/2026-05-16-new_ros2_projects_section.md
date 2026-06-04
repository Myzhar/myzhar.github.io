---
title: "Introducing the ROS 2 Projects Section"
excerpt: "A new section of the website dedicated to open source ROS 2 packages — starting with the LD Lidar ROS 2 Driver for LDRobot LD19/LD06 sensors."
date: 2026-05-16 07:00:00 +01:00
author: "Walter Lucetti"
layout: single
classes: wide
toc: false
breadcrumbs: false

sitemap: false
noindex: true

header:
  teaser: /assets/images/projects/ldrobot-lidar-ros2/teaser.jpg
  overlay_image: /assets/images/projects/ldrobot-lidar-ros2/teaser.jpg
  overlay_filter: "0.5"

gallery_ldlidar:
  - url: /assets/images/projects/ldrobot-lidar-ros2/ldlidar_rviz2.png
    image_path: /assets/images/projects/ldrobot-lidar-ros2/ldlidar_rviz2.png
    alt: "Live laser scan in RViz2"
    title: "Live laser scan in RViz2"
  - url: /assets/images/projects/ldrobot-lidar-ros2/ld19_slam.png
    image_path: /assets/images/projects/ldrobot-lidar-ros2/ld19_slam.png
    alt: "2D occupancy map built with SLAM Toolbox"
    title: "2D occupancy map built with SLAM Toolbox"
  - url: /assets/images/projects/ldrobot-lidar-ros2/ld19_3d_mount.jpg
    image_path: /assets/images/projects/ldrobot-lidar-ros2/ld19_3d_mount.jpg
    alt: "LD19 on its 3D-printed mount"
    title: "LD19 on its 3D-printed mount"

categories: 
  - updates
  - website
  - projects
tags:
  - updates
  - website
  - projects
  - ROS
  - ROS_2
  - robotics
  - lidar
  - ldrobot
  - LD19
  - LD06
---

Alongside the [tutorials section](/tutorials/), I've been working on a dedicated space for the open source ROS 2 packages I've built over the years. Today I'm launching the [ROS 2 Projects](/projects/ros2/) section of the website.

The first project page covers the **[LD Lidar ROS 2 Driver](/projects/ros2/ldrobot-lidar-ros2/)** — a driver I originally wrote because no ROS 2 support existed for the LDRobot LD19 lidar I backed on Kickstarter. What started as a weekend effort to get a `/scan` topic publishing grew into a full driver: Nav2 Lifecycle nodes, SLAM Toolbox integration, a custom-modelled URDF, udev rules, benchmarking tools, and launch files for every use case. It supports the **LD19** and **LD06** sensors on ROS 2 **Humble** and **Jazzy**.

{% include gallery id="gallery_ldlidar" caption="RViz2 scan (left), SLAM Toolbox map (center), LD19 on its 3D-printed mount (right)" %}

More ROS 2 project pages are on the way. Stay tuned!

Happy robotics programming! 🤖
