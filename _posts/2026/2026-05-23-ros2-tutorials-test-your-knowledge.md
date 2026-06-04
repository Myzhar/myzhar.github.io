---
title: "Test Your Knowledge - A New Section in the ROS 2 Tutorials"
excerpt: "All ROS 2 tutorials now include a 'Test Your Knowledge' section with multiple-choice questions so you can verify how well you've understood the material."
date: 2026-05-23 12:15:00 +01:00
author: "Walter Lucetti"
layout: single
classes: wide
toc: false
breadcrumbs: false

sitemap: false
noindex: true

header:
  teaser: /assets/images/ros2/ros2-test-your-knowledge-teaser.jpg
  overlay_image: /assets/images/ros2/ros2-test-your-knowledge-teaser.jpg
  overlay_filter: "0.45"

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
  - learning
---

One of the goals I set for the ROS 2 tutorial series was to make each entry genuinely useful for learning, not just a reference to skim and forget. A tutorial that explains concepts clearly should also give you a way to check whether those concepts actually stuck.

That's why I've added a **"Test Your Knowledge"** section at the end of every ROS 2 tutorial.

## What it looks like

Each quiz is a short set of multiple-choice questions covering the key ideas from that tutorial. Questions are deliberately practical, they focus on concepts that tend to trip people up or that matter when you're working on a real system. You pick an answer, then expand a collapsible panel to see whether you got it right and, more importantly, **why**.

It looks like this:

> **What is the default RMW implementation in ROS 2 Humble?**
>
> - a) Cyclone DDS  
> - b) Fast DDS  
> - c) RTI Connext  
> - d) Zenoh
>
> <details>
> <summary>Show correct answer</summary>
> <br>
> <strong>b) Fast DDS</strong><br>
> ROS 2 Humble ships with eProsima Fast DDS as its default RMW implementation.
> </details>

No score, no time limit, just you and the material. If you find yourself unsure about an answer, it's a good signal to re-read that section of the tutorial before moving on.

## Where to find it

The section is already live in every published ROS 2 tutorial:

- [Understanding ROS 2](/tutorials/ros2/understanding-ros2/)
- [Installing ROS 2](/tutorials/ros2/installing-ros2/)
- [Starting ROS 2 Nodes](/tutorials/ros2/starting-ros2-nodes/)
- [Understanding the ROS 2 Communication Middleware](/tutorials/ros2/understanding-ros2-middleware/)
- [Configuring a ROS 2 Node Using Parameters](/tutorials/ros2/configure-node-with-parameters/)
- [Understanding ROS 2 Node Names and Namespaces](/tutorials/ros2/understanding-ros2-namespace-node-name/)
- [ROS 2 Python Launch File Explained](/tutorials/ros2/python-launch-explained/)
- [ROS 2 Node Composition Explained](/tutorials/ros2/ros2-node-composition-explained/)

Scroll to the bottom of any of these pages to find it.

## Let me know what you think

This is an experiment. I'm genuinely curious whether you find it useful, whether the questions hit the right level, whether they actually help you consolidate what you've read, or whether the format could be improved.

If you have feedback, drop me a message at **[info@myzhar.com](mailto:info@myzhar.com)** or reach out via the [contact page](/contact/). I read every message.

Happy robotics programming! 🤖
