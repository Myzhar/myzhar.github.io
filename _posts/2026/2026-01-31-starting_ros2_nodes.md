---
title: "New ROS 2 Tutorial: Starting ROS 2 Nodes"
excerpt: "I released a new tutorial on starting ROS 2 nodes using both the command line and Python launch files."
date: 2026-01-31 21:30:00 +01:00
author: "Walter Lucetti"
layout: single
classes: wide
toc: false
breadcrumbs: false

sitemap: true
noindex: false

header:
  teaser: /assets/images/ros2/starting-ros2-nodes.jpg
  overlay_image: /assets/images/ros2/starting-ros2-nodes.jpg
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
I’m excited to share another key entry in my ROS 2 series: [Starting ROS 2 Nodes](/tutorials/ros2/starting-ros2-nodes/).

I remember when I first started working on the early versions of MyzharBot, my workflow was a complete mess. I used to have ten different terminal tabs open, manually running `ros2 run` for the LiDAR, another for the motor controller, another for the camera, and so on. It was "terminal spaghetti" at its finest. If one node crashed or if I had to restart the robot, I had to cycle through every tab and re-type the commands. It was exhausting and, frankly, I knew there had to be a better way to scale my development process.

That’s why I decided to write this tutorial. It’s designed to take you from that initial stage of running simple, isolated nodes to understanding how to orchestrate a complex robotic system without losing your mind. In my early days, I wasted so much time just managing processes instead of writing code, and I want to help you avoid that same frustration. I've focused this guide on the two most common ways I get my software running:

- **Using the command-line interface with `ros2 run`**: This is perfect for when I'm just testing a new driver or quickly debugging a single node. I use it every day for quick "sanity checks."
- **Using Python launch files**: This was the real game-changer for me. Launch files allow me to start my entire robot with a single command. In this guide, I show you how to build flexible and scalable setups that can handle parameters, remappings, and multiple nodes simultaneously.

I've also included a detailed section on how I organize my launch files within a package structure. This is where most people get stuck, specifically with the `setup.py` or `CMakeLists.txt` changes needed to make sure ROS 2 can actually find your files. I’ve found that keeping things tidy and standardized from day one saves me countless hours of searching for misnamed files later on.

I've spent a lot of time refining my own internal templates for these files, and I've tried to distill those "best practices" into this guide. This tutorial isn't just a list of commands; it's a reflection of the workflow I've honed over years of building and rebuilding autonomous systems. I hope it helps you move past the manual "tab-switching" phase and into a more professional, automated development style.

I'm really proud of how this one turned out because it addresses the exact "growing pains" I felt when I moved MyzharBot to ROS 2.

Go check out the full tutorial here: [Starting ROS 2 Nodes](/tutorials/ros2/starting-ros2-nodes/).

I'm really enjoying putting these together, and I hope you find them as useful as I found writing them. If you have any questions or want to share your own "terminal horror stories," I'd love to hear them! It's always great to know I'm not the only one who has struggled with these concepts.

Happy robotics programming! 🤖
