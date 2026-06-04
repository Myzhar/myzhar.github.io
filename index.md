---
layout: splash
description: "Personal robotics and AI lab of Walter Lucetti: hands-on ROS 2 tutorials, stereo vision, NVIDIA Jetson, CUDA, and 3D printing — from concept to working hardware and real results."
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
  - label: ":turtle: ROS 2 Tutorials"
    url: "/tutorials/ros2/"

intro:
  - excerpt: "**Welcome to the personal lab space of Walter 'Myzhar' Lucetti** — a place where robots come to life through code, sensors, and a relentless curiosity about machines that see and think. Expect hands‑on tutorials, deep‑dive guides, and honest project stories spanning ROS 2, stereo vision, NVIDIA Jetson, CUDA, 3D printing, and AI, all grounded in real hardware and real problems."

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
