---
title: "Test Your Knowledge - A New Section in the ROS 2 Tutorials"
excerpt: "All ROS 2 tutorials now include a 'Test Your Knowledge' section with multiple-choice questions so you can verify how well you've understood the material."
date: 2026-05-23 12:15:00 +01:00
author: "Walter Lucetti"
layout: single
classes: wide
toc: false
breadcrumbs: false

sitemap: true
noindex: false

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
I've always believed that the best way to learn robotics is by doing, but I also know how easy it is to read a long technical guide, nod along, and then realize five minutes later that I didn't actually retain the core concepts. When I was learning ROS 2 myself, I often found myself re-reading the same documentation pages over and over because I hadn't properly tested my understanding of the "why" behind certain features.

One of the main goals I set for this tutorial series was to make each entry a genuine learning tool, not just a reference document to skim and forget. I want to make sure that when I explain a concept, I’m giving you a way to verify that it actually stuck.

That's why I'm excited to announce that I've added a **"Test Your Knowledge"** section at the end of every ROS 2 tutorial on the site.

I didn't want these to be boring, academic tests. I've personally designed each quiz to be a short set of multiple-choice questions that target the specific ideas that I've seen trip people up, including the mistakes I made myself during my first few months with ROS 2. 

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

This is a bit of an experiment for me. I'm genuinely curious if you find these quizzes useful. Do the questions hit the right difficulty level? Do they actually help you feel more confident about the material? I'm always looking for ways to make my site a better resource for the community, and I'd love to hear your thoughts on how I can improve this format.

If you have any feedback, please drop me a message at **info@myzhar.com** or reach out through my contact page. I read every single message I get, and I'm always happy to chat about robotics.

Happy robotics programming! 🤖
