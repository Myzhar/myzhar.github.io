---
title: "New ROS 2 Tutorials about 'Python Launch Files' and 'Node Composition'"
excerpt: "Two new tutorials covering ROS 2 Python Launch files and Node Composition with IPC and zero-copy communication."
date: 2026-05-12 23:30:00 +01:00
author: "Walter Lucetti"
layout: single
classes: wide
toc: false
breadcrumbs: false

sitemap: false
noindex: true

header:
  teaser: /assets/images/ros2/python-launch-explained.jpg
  overlay_image: /assets/images/ros2/python-launch-explained.jpg
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
  - python
  - launch_files
  - composition
  - ipc
---

I have to admit that I wasn't able to keep my promise of releasing at least one ROS 2 tutorial every week. Life happens, and between a series of unexpected events and some health issues, I was forced to step away from my workstation for much longer than I ever intended. It was incredibly frustrating to have all these ideas for new content and projects swirling in my head while being physically unable to sit down and actually build them. But the good news is that I'm back now, feeling much better, and I'm ready to dive right back into the rhythm of things!

Instead of dwelling on the downtime, I want to focus on the two major updates I've just pushed to the site. These are topics I've been wanting to cover for a long time because they represent the bridge between simply "writing a script" and actually "building a production-ready robot system."

The first is a comprehensive guide on [**ROS 2 Python Launch files**](/tutorials/ros2/python-launch-explained/). If you've spent any time in the ROS ecosystem, you know that launch files are the glue that holds everything together. However, moving from the simple XML of ROS 1 to the fully programmatic Python-based system in ROS 2 can be quite a shock. I've packed this tutorial with the specific tips and tricks I use in my day-to-day workflow to make my bringup scripts as flexible and reusable as possible. I remember the "aha!" moment I had when I first mastered concepts like `OpaqueFunction`: it completely changed how I architect my robot software, and I’ve tried to pass that same clarity on in this guide.

The second update is an advanced tutorial diving deep into [**ROS 2 Node Composition**](/tutorials/ros2/ros2-node-composition-explained/). This is a topic that many developers overlook when they're starting out, but it's absolutely crucial for high-performance robotics. As I started pushing more high-bandwidth data, like high-resolution camera streams and dense point clouds, through the latest iterations of MyzharBot, I realized that the standard process-based node model was becoming a massive overhead bottleneck. Composition allows me to load multiple nodes into a single process container, enabling zero-copy data transfer between them. In this tutorial, I explain the core concepts behind IPC (Intra-Process Communication) and show you exactly how to leverage it to make your systems run significantly faster. 

I truly hope you find these tutorials useful in your own robotics journey. It feels great to be back at the keyboard sharing these lessons, and I'm already working on the next set of guides to keep this momentum going!

Happy robotics programming! 🤖
