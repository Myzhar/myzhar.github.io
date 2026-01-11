---
title: "MyzharBot-v1"
excerpt: "The first version of MyzharBot"
author: "Walter Lucetti"
number: 100
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/projects/myzharbot/v1/MyzharBot-v1.0.jpg
  teaser: /assets/images/projects/myzharbot/v1/MyzharBot-v1.0.jpg
  #actions:
  #  - label: "More Info"
  #    url: "https://www.myzhar.com"
layout: single
classes: single
---

## MyzharBot v1

The first version of MyzharBot was built in 2012 using a simple chassis made of laser-cut plastic sheets joint together with nuts and bolts.

![MyzharBot-v1](/assets/images/projects/myzharbot/v1/MyzharBot-v1.0.jpg "MyzharBot-v1")

## Electronics

The electronics was very simple, allowing to control only the movement of the robot with no automation capabilities.

It was powered by a custom made motor driver board allowing it to move using simple serial commands on Modbus protocol.

The tracks were driven by the same [Micromotors e192-12-18](https://www.micromotors.eu/motoriduttori/serie-e192/) that I continue to use today.

Feedback on speed and position was provided by the [AMT102-V Quadrature Encoder](https://www.sameskydevices.com/product/motion-and-control/rotary-encoders/incremental/modular/amt102-v) connected to the motor shafts, the same used in the latest versions of MyzharBot.

## Software

To control it I designed a simple Qt-based GUI application that allowed me to send movement commands and monitor the encoder feedback.

ROS was not yet used at that time; I heard about it but I wrongly thought that making everything from scratch would have been easier and faster.

I was a young and naive engineer...

## Videos

A few videos of my first tests in 2012:

{% include video id="o4W0ir7bfkw" provider="youtube" %}
{% include video id="x7R6s1xjjNg" provider="youtube" %}
{% include video id="czmqUQI7SEg" provider="youtube" %}
{% include video id="XWvtm3Ovpjg" provider="youtube" %}
