---
layout: splash
description: "Personal robotics and AI lab of Walter Lucetti: hands-on ROS 2 tutorials, stereo vision, NVIDIA Jetson, CUDA, and 3D printing; from concept to working hardware and real results."
excerpt: "Beyond Perception / Beyond Robotics"
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/background.jpg
  actions:
  - label: ":link: Follow Me"
    url: "https://linktr.ee/myzhar"
  - label: ":robot: MyzharBot Project"
    url: "/projects/myzharbot/"
  - label: ":turtle: ROS 2 Projects"
    url: "/projects/ros2/"
  - label: ":turtle: ROS 2 Tutorials :book:"
    url: "/tutorials/ros2/"
  - label: ":eyes: OpenCV Tutorials :book:"
    url: "/tutorials/opencv/"

intro:
  - excerpt: "**Welcome to my personal lab space!**<br/>I'm Walter 'Myzhar' Lucetti, a Computer Engineer who loves robotics.<br/>This is where my robots come alive. It's a place fueled by code, sensors, and my endless curiosity about machines that can see and think for themselves. Here, you'll find my hands-on tutorials, in-depth guides, and honest stories from my projects. I dive into everything from **ROS 2** and stereo vision to **NVIDIA® Jetson**, **CUDA**, **3D printing**, and **AI**... always keeping things grounded in real hardware and the actual problems I'm trying to solve."

feature_row:
  - image_path: /assets/images/robots_default.jpg
    alt: "projects"
    title: "Projects"
    excerpt: "MyzharBot and other robotics, computer vision, and AI projects. From concept to hardware."
    url: "/projects/"
    btn_label: "Explore"
    btn_class: "btn--warning"
  - image_path: /assets/images/post_default.jpg
    alt: "tutorials"
    title: "Tutorials"
    excerpt: "Deep‑dive guides on ROS 2, stereo vision, NVIDIA Jetson, CUDA, 3D printing, and more."
    url: "/tutorials/"
    btn_label: "Learn"
    btn_class: "btn--info"
  - image_path: /assets/images/events_default.jpg
    alt: "events"
    title: "Events"
    excerpt: "Workshops, conferences, and meetups where you can find Myzhar and the MyzharBot."
    url: "/events/"
    btn_label: "Upcoming"
    btn_class: "btn--success"

---

{% include feature_row id="intro" type="center" %}

{% include latest_posts %}

{% include feature_row %}
