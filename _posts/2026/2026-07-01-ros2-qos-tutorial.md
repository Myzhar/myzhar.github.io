---
title: "New ROS 2 Tutorial: Quality of Service (QoS)"
excerpt: "A new in-depth tutorial on ROS 2 Quality of Service: why two healthy nodes refuse to talk, every QoS policy explained, publisher/subscriber compatibility tables, and how to tune QoS with node parameters and qos_overrides."
date: 2026-07-01 20:00:00 +01:00
author: "Walter Lucetti"
layout: single
classes: wide
toc: false
breadcrumbs: false

sitemap: true
noindex: false

header:
  teaser: /assets/images/ros2/understanding-ros2-qos.jpg
  overlay_image: /assets/images/ros2/understanding-ros2-qos.jpg
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
  - qos
  - quality_of_service
  - dds
  - middleware
---

New tutorial out today: **[ROS 2 QoS: Why Your Nodes Aren't Talking (and How to Fix It)](/tutorials/ros2/understanding-ros2-qos/)**.

I decided to write this one because of my day job. As Head of Support at Stereolabs, I've lost count of how many tickets I've opened, read, or answered that all boiled down to the same thing: "I can see the topic in `ros2 topic list`, I can `echo` nothing, and I have no idea why." The customer is convinced the camera driver is broken. It almost never is. What's broken is the *contract* between the two ends of the conversation, and that contract is Quality of Service.

It's such a recurring pattern that I could practically diagnose it in my sleep now. A sensor stream is published one way, someone subscribes the default way, the middleware quietly decides the two are incompatible, and everybody stares at a blinking cursor wondering where the data went. No crash, no error, just silence. When you spend your days helping people integrate real hardware into real robots, you learn very fast that this single concept causes more head-scratching than almost anything else in ROS 2.

But honestly, I didn't need the support queue to teach me this lesson; MyzharBot taught me first, the hard way. Years ago I spent an entire evening convinced I had a hardware fault on my little tracked robot, because a ultrasonic sensor topic simply wouldn't reach the node that needed it. I checked cables, I re-flashed, I swapped ports. The real culprit was a mismatched reliability setting between a best-effort sensor and a subscriber that politely demanded guarantees I could never provide. I felt equal parts relieved and embarrassed when I finally found it.

That's exactly why I promised, back in the [Understanding the ROS 2 Communication Middleware](/tutorials/ros2/understanding-ros2-middleware/) tutorial, that QoS deserved its own chapter, and why it kept resurfacing when the `qos_overrides` parameters showed up in the [node parameters](/tutorials/ros2/configure-node-with-parameters/) tutorial. This is that chapter, and I tried to write the guide I wish someone had handed me before that long "ultrasonic sensor" evening.

I kept the tone practical, with the compatibility tables I actually picture in my head when I read a support ticket, and I closed it with a short **"Test Your Knowledge"** quiz to make the ideas stick.

If a topic has ever gone mysteriously quiet on you, give it a read. My hope is the next silent topic costs you five seconds instead of an afternoon.

Happy robotics programming! 🤖
