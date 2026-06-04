---
title: "ROS 2 Lyrical Luth is Here!"
excerpt: "The twelfth ROS 2 release lands today. A new LTS distribution built on Ubuntu 26.04, packed with performance gains, async Python support, zero-copy GPU transfers, and much more."
date: 2026-05-22 22:00:00 +01:00
author: "Walter Lucetti"
layout: single
classes: single
toc: true
breadcrumbs: false

sitemap: true
noindex: false

header:
  teaser: /assets/images/ros2/ros2-lyrical-luth-teaser.jpg
  overlay_image: /assets/images/ros2/ros2-lyrical-luth-teaser.jpg
  overlay_filter: "0.4"
  actions:
    - label: "Official Announcement"
      url: "https://discourse.openrobotics.org/t/ros-2-lyrical-luth-released/"
      target: _blank

categories:
  - news
  - robotics
tags:
  - ROS
  - ROS_2
  - robotics
  - news
  - release
  - lyrical_luth
  - ubuntu
  - lyrical
---



It's out! **ROS 2 Lyrical Luth** has officially landed, and I have to say: this is the release I've been looking forward to for a while. It's the twelfth ROS 2 distribution and a brand new **Long-Term Support (LTS)** release, supported until **May 2031**.

{% include figure popup=true image_path="/assets/images/ros2/ros2-lyrical-luth-release.jpg" alt="ROS 2 Lyrical Luth" max_width="300px" %}

It pairs with **Ubuntu 26.04 "Resolute"** as its primary Tier 1 platform, which makes total sense: Lyrical Luth + Ubuntu 26.04 is the LTS-on-LTS combo that most production teams have been waiting for. If you're still on ROS 2 Humble with Ubuntu 22.04, now is a great time to start planning your migration.

---

## What's new compared to Jazzy?

Jazzy Jalisco was a good release, but Lyrical Luth brings some things that genuinely excited me when I read the changelog. Let me walk you through what I think is most interesting.

### Callback Group Events Executor

This one is huge for performance. The new `CallbackGroupEventsExecutor` uses **10–15% less CPU** than the classic `SingleThreadedExecutor` and `MultiThreadedExecutor`. It also comes with proper support for multiple time sources and finer threading control. On nodes with a lot of callbacks, this is a meaningful free win; **you just switch executor type and get better efficiency for nothing**. Can't wait to try it on my setups!

### Async ROS Nodes in Python (`AsyncNode`)

Finally! `rclpy` now has an `AsyncNode` base class that integrates ROS callbacks natively with Python's `asyncio` event loop. If you've ever wrestled with mixing async code and ROS subscribers, you know how painful that could be. This makes the whole thing much cleaner and more CPU-efficient than the default `SingleThreadedExecutor`.

### Zero-Copy GPU Data Transfer

This is the one I'm personally most excited about. `rosidl::Buffer` now lets you publish and subscribe to ROS messages **without copying data between CPU and GPU memory**. The initial support is for `rmw_fastrtps_cpp`, but it's a game changer for any pipeline that touches deep learning or computer vision; the cost of memcpy between GPU frames has always been a silent killer of latency budgets.

### Parameters and configuration

- **YAML type annotations**: you can now use `!!str`, `!!bool`, `!!int`, `!!float` tags in parameter files to resolve ambiguous type interpretation once and for all
- **Parameter range validation** extended to integer and double arrays, not just scalars
- Expanded `ros2 param` CLI with batch operations on single nodes

### Launch file improvements

A bunch of quality-of-life improvements here that will make launch files nicer to write and maintain:

- **New substitutions**: `string-join` and `path-join` for XML/YAML launch files
- **Per-message log level control**: granular severity per message directly from the launch file
- **Runtime logging backend selection**: via `RCL_LOGGING_IMPLEMENTATION` env variable, no rebuild needed

### Bag recording enhancements

Several additions I've wanted for a long time:

- **Remote control** via ROS service APIs; start/stop/discover bags from anywhere on the network
- **Python bag APIs** for programmatic pause, resume, seek, and state queries
- **Circular recording** with `--max-bag-files` to cap disk usage by auto-deleting the oldest splits
- **Descriptive split naming** with counter, prefix, and timestamp built in
- **Per-topic message loss statistics** published to `events/rosbag2_messages_lost`

### CLI enhancements

- **`ros2 topic bw`** can now monitor multiple topics at once
- **`ros2 service info --verbose`** shows QoS profiles and endpoint details
- **`ros2 doctor --report`** expanded to include actions, services, and ROS env variables
- **Fish shell** support is finally here alongside bash/zsh 🐟

### URDF 1.2

The robot description format gets a proper update:

- **Quaternion support** via `quat_xyzw`, no more euler-only rotations
- **Capsule geometry** as a new collision primitive
- Acceleration, deceleration, and jerk limits in joint definitions
- `robot_state_publisher` can now subscribe to `robot_description` topic instead of only publishing it

### Tracing

For anyone doing serious performance work:

- **Runtime opt-out** via `TRACETOOLS_RUNTIME_DISABLE=1` disable instrumentation without a rebuild
- **Snapshot mode** with LTTng for "flight recorder" style memory-buffered capture
- **Dual session tracing** with separate sessions for initialization and runtime events

### Developer quality of life

- Thread naming utilities in `rcpputils` for easier profiling and debugging
- `class_loader` plugins can now accept constructor arguments for initialization parameters
- `rcutils` gains Base64 encoding/decoding and `strnlen` for platform compatibility
- New CMake target `ament_ros_defaults` for consistent C/C++ version specification across packages

---

## Supported platforms

| Tier | Platform |
|------|----------|
| 1 | Ubuntu 26.04 amd64 / arm64 |
| 1 | Windows 11 (VS 2022) amd64 |
| 2 | RHEL 10 amd64 |
| 3 | Ubuntu 24.04, macOS, Debian Trixie, OpenEmbedded |

---

## By the numbers

Behind every `apt install ros-lyrical-*` there's a massive community effort: **239 contributors**, **110 beta testers**, and nearly **2,651 test cases** executed. That's pretty impressive, and it shows how healthy the ROS ecosystem remains.

---

## What's next?

The next non-LTS distribution, **ROS 2 Makoa Mata-mata**, is already on the calendar for May 2027.

If you're on Jazzy, migration should be pretty smooth; most new features are additive and things like the executor change are opt-in. I covered the highlights here, but the full changelog is extensive, so check the [official Lyrical Luth release notes](https://docs.ros.org/en/lyrical/Releases/Release-Lyrical-Luth.html){:target="_blank"} for the complete picture before jumping in on production systems.

Happy robotics programming! 🤖
