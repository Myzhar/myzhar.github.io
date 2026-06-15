---
title: "New ROS 2 Tutorial: Understanding the ROS 2 Communication Middleware"
excerpt: "I released a new tutorial on understanding the ROS 2 communication middleware."
date: 2026-02-12 00:00:00 +01:00
author: "Walter Lucetti"
layout: single
classes: wide
toc: false
breadcrumbs: false

sitemap: false
noindex: true

header:
  teaser: /assets/images/ros2/understanding-ros2-middleware.jpg
  overlay_image: /assets/images/ros2/understanding-ros2-middleware.jpg
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
  - parameters
  - configure
  - rqt
---

I’m thrilled to announce a brand-new addition to my ROS 2 tutorial series: [**Understanding the ROS 2 Communication Middleware**](/tutorials/ros2/understanding-ros2-middleware/)!

When I first started migrating MyzharBot from ROS 1 to ROS 2, one of the biggest "culture shocks" I experienced was the total absence of a central `ROS Master`. In the old days, I just took it for granted that everything worked because the Master was there to coordinate the handshake between nodes. When I moved to ROS 2, I realized that everything is decentralized, and it all relies on a complex layer called the middleware.

I’ll be honest: when I first looked at the documentation, I felt completely overwhelmed by the "alphabet soup" of acronyms. DDS, RTPS, RMW... it was a lot to take in. I found myself asking, "Why do I have to care about this? I just want my nodes to talk to each other!" But as I started building more complex systems with different sensors and multiple computers, I realized that the choice of middleware isn't just a technical detail: **it can actually make or break the reliability and performance of your robot**.

If you’ve ever felt confused by how ROS 2 handles communication under the hood, you’re definitely not alone. This layer can be tricky, especially for developers moving between paradigms or those jumping into robotics for the first time.

In this new guide, I’ve tried to demystify this layer by explaining how it fits into the broader ROS 2 architecture from my own perspective. I explore the different middleware implementations I’ve used and encountered, including:

- **Fast DDS**: Which is the default for most of my projects and has been a reliable go-to for standard desktop setups.
- **Cyclone DDS**: Which I’ve found to be incredibly robust for embedded tasks and deterministic behavior.
- **Connext DDS**, **GurumDDS**, and a fascinating emerging alternative, **Zenoh**.

I’m particularly excited about **Zenoh**. I’ve been experimenting with it lately for remote teleoperation of MyzharBot over high-latency networks, and I think it has the potential to be a total game-changer compared to traditional DDS in those scenarios.

Inside the tutorial, I don't just list dry technical features. I share the hands-on examples and the specific configuration tips I wish I had when I was first setting up my own development environment. I’ll show you how you can actually swap between these implementations with just a single environment variable; a feature that still feels like a bit of magic to me compared to the rigid structure of ROS 1.

If you’ve ever wondered why your nodes aren't discovering each other or which vendor is "best" for your specific hardware platform, this guide is for you. I’ve put a lot of work into making these concepts accessible, as I truly believe that understanding the "wire" is just as important as writing the code.

Dive in, experiment with the different RMW options, and as always... 

Happy robotics programming! 🤖