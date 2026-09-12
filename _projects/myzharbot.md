---
title: "The MyzharBot project"
excerpt: "MyzharBot is an open source and open hardware robotic platform born to study sensor fusion algorithms for autonomous navigation"
author: "Walter Lucetti"
index: 1000
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/robots_default.jpg
  teaser: /assets/images/robots_default.jpg
layout: single
classes: wide
toc: false
sitemap: true
noindex: false
---

Welcome to **MyzharBot**, my main project since 2012! It's an open source and open hardware robotic platform I started to study sensor fusion algorithms for autonomous navigation, and it's the project I keep coming back to whenever I want to try out a new sensor, a new algorithm, or a new piece of hardware on something real rather than in simulation.

## Why I built it

I didn't set out to build a commercial product; I wanted a physical robot I fully understood, from the mechanics to the firmware to the navigation stack, so I could experiment with sensor fusion without fighting someone else's black-box platform. Every iteration has been driven by a question I wanted to answer myself: how do I combine wheel odometry with an IMU without drifting, how far can a Jetson push real-time AI-driven navigation, how do I make the mechanics robust enough to survive my own testing.

## How the project has evolved

I designed [MyzharBot v1](/projects/myzharbot/myzharbot-v1/) from scratch as a tracked platform, mostly to get the mechanics and low-level control right before touching anything autonomous. With [MyzharBot v2](/projects/myzharbot/myzharbot-v2/) I took my first real steps toward autonomy, improving the hardware and adding early autonomous capabilities. [MyzharBot v3](/projects/myzharbot/myzharbot-v3/) is the version I'm proudest of: powered by an NVIDIA Jetson and advanced AI-driven navigation, it's also the robot that earned me the NVIDIA Jetson™ Champion recognition. MyzharBot v4 is honestly the version I'm least proud of: it suffered from enough mechanical problems that it was almost unusable, and I'm still writing up that story, so its full page is coming later. I'm currently working on MyzharBot v5, so check back for updates as I publish them.

## What you'll find in each version's writeup

For every version I document the mechanical design, the electronics and sensors I chose and why, the software stack running on board, and the specific problems I hit and how I solved them, rather than just showing a finished robot driving around. If you're building your own robotic platform and want to study sensor fusion or autonomous navigation on real hardware, I hope these writeups save you some of the trial and error I went through myself.

|  | Version | Description |
| :----: | :------: | :---------- |
| [![MyzharBot v1](/assets/images/projects/myzharbot/v1/MyzharBot-v1.0.jpg)](/projects/myzharbot/myzharbot-v1/) | [**MyzharBot v1**](/projects/myzharbot/myzharbot-v1/) | The first version of MyzharBot, a tracked robot platform built from scratch to study sensor fusion for autonomous navigation. |
| [![MyzharBot v2](/assets/images/projects/myzharbot/v2/MyzharBot-v2.0.jpg)](/projects/myzharbot/myzharbot-v2/) | [**MyzharBot v2**](/projects/myzharbot/myzharbot-v2/) | First steps toward autonomous navigation, with improved hardware and early autonomous capabilities. |
| [![MyzharBot v3](/assets/images/projects/myzharbot/v3/MyzharBot-v3.1.jpg)](/projects/myzharbot/myzharbot-v3/) | [**MyzharBot v3**](/projects/myzharbot/myzharbot-v3/) | The robot that made me a Jetson™ Champion, powered by NVIDIA Jetson and advanced AI-driven navigation. |
| ![MyzharBot v4](/assets/images/projects/myzharbot/v4/MyzharBot-v4.1.jpg) | **MyzharBot v4** | Coming soon … |
| | **MyzharBot v5** | Coming soon … |
{: style="table-layout: fixed;" }

<style>
  table th:nth-child(1), table td:nth-child(1) { width: 20%; }
  table th:nth-child(2), table td:nth-child(2) { width: 25%; }
  table th:nth-child(3), table td:nth-child(3) { width: 55%; }
</style>
