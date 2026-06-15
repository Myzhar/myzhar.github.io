---
title: "The first ROS 2 tutorials are online!"
excerpt: "I released the first tutorials on ROS 2, covering installation and basic concepts."
date: 2026-01-25 00:15:00 +01:00
author: "Walter Lucetti"
layout: single
classes: wide
toc: false
breadcrumbs: false

sitemap: true
noindex: false

header:
  teaser: /assets/images/ros2/ROS2_TM_Color.svg
  overlay_image: /assets/images/ros2/ROS2_TM_Color.svg
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
---
I'm really happy to finally announce that I've hit the "publish" button on my first set of tutorials dedicated to ROS 2 (Robot Operating System). This has been a long time coming, and for me, it represents more than just adding content to my site; it's about documenting my own transition into what has become the industry standard for modern robotics.

If you've followed my work on MyzharBot over the years, you know I spent a lot of time in the ROS 1 ecosystem. However, as the field has evolved, I’ve seen first-hand why ROS 2 is becoming the go-to framework for researchers, developers, and hobbyists alike. It’s not just a minor update; it’s a complete rethink of how robotic processes should communicate, with a heavy focus on improved performance, security, and real-time capabilities that ROS 1 simply wasn't designed for.

I decided to start this series from the very beginning because I know how overwhelming it can be to switch paradigms. When I first started digging into ROS 2, I realized that while it provides a familiar collection of tools and libraries, the underlying architecture—shifting from a central master to a distributed DDS discovery system—requires a bit of a mental shift. I wanted to create a path for others that was clearer than the one I had to navigate.

The first two tutorials I've released today lay that groundwork:

- **[Understanding ROS 2](/tutorials/ros2/understanding-ros2/)**: In this overview, I break down exactly what ROS 2 is and, perhaps more importantly, *why* it has gained such massive traction in the robotics community. I explore the features that make it robust enough for industrial applications while remaining flexible enough for home projects.
- **[Install ROS 2](/tutorials/ros2/installing-ros2/)**: This is the practical first step. I’ve documented the process I use to set up a functional, clean ROS 2 environment on Ubuntu. I know how frustrating it is when your environment isn't configured correctly from day one, so I’ve tried to make this as step-by-step and foolproof as possible.

My goal with this website has always been to share the "lessons learned" from my own lab. As I migrate MyzharBot’s entire software stack to ROS 2 Humble and Jazzy, I’ll be taking the specific challenges I face—like managing lifecycle nodes or optimizing GPU perception—and turning them into more tutorials for this section. I truly believe that by sharing these foundational pieces, I can help you bridge the gap between having a cool idea and actually having a working, robust robot.

I’m committed to making this a living resource, so I’ll be releasing new tutorials regularly. I’d love to hear what you think of these first two! If there's a specific concept you're struggling with or a piece of hardware you're trying to integrate, reach out and let me know. 

I hope you enjoy these first steps into the world of ROS 2. 

Happy robotics programming! 🤖
