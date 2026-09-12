---
makerworld_key: model_647454
makerworld_id: 647454
title: "Ultrasonic sensor HC-SR04 holder"
excerpt: "This is a custom-designed case/holder for the popular HC-SR04 ultrasonic sensor, commonly used in robotics and various other projects."
author: "Walter Lucetti"
index: 3200
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/projects/makerworld/ultrasonic-sensor-hc-sr04-holder/overlay.jpg
  teaser: /assets/images/projects/makerworld/ultrasonic-sensor-hc-sr04-holder/teaser.jpg
  actions:
    - label: "<i class='fas fa-cube'></i> Download on MakerWorld"
      url: "https://makerworld.com/en/models/647454-ultrasonic-sensor-hc-sr04-holder"
      target: _blank
    - label: "<i class='fas fa-cube'></i> 3D Model on OnShape"
      url: "https://cad.onshape.com/documents/13fbeb1687d3e479bd119c8f/w/02fe54385272a973ea8aeb1a/e/5081490c32c47e5a3ea86de8?renderMode=0&uiState=66e975865b681a7292009b88"
      target: _blank
layout: single
classes: single

gallery_photos:
  - url: /assets/images/projects/makerworld/ultrasonic-sensor-hc-sr04-holder/gallery-1.jpg
    image_path: /assets/images/projects/makerworld/ultrasonic-sensor-hc-sr04-holder/gallery-1.jpg
    alt: "Ultrasonic sensor HC-SR04 holder"
  - url: /assets/images/projects/makerworld/ultrasonic-sensor-hc-sr04-holder/gallery-2.jpg
    image_path: /assets/images/projects/makerworld/ultrasonic-sensor-hc-sr04-holder/gallery-2.jpg
    alt: "Ultrasonic sensor HC-SR04 holder"
  - url: /assets/images/projects/makerworld/ultrasonic-sensor-hc-sr04-holder/gallery-3.jpg
    image_path: /assets/images/projects/makerworld/ultrasonic-sensor-hc-sr04-holder/gallery-3.jpg
    alt: "Ultrasonic sensor HC-SR04 holder"
  - url: /assets/images/projects/makerworld/ultrasonic-sensor-hc-sr04-holder/gallery-4.jpg
    image_path: /assets/images/projects/makerworld/ultrasonic-sensor-hc-sr04-holder/gallery-4.jpg
    alt: "Ultrasonic sensor HC-SR04 holder"
---
## Overview

This is a custom-designed case/holder for the popular HC-SR04 ultrasonic sensor, commonly used in robotics and various other projects.

The HC-SR04 is one of those parts that shows up in nearly every beginner robotics kit, cheap, easy to wire to any microcontroller, and good enough for basic obstacle detection or distance measurement. What it does not come with is any kind of mount: it is a bare PCB with two open transducer cups on the front, meant to be glued, zip-tied, or otherwise improvised onto whatever chassis it ends up on. I got tired of improvising a new mounting solution every time I reused one of these sensors across different robots, so I designed a proper holder once and reused it since.

I printed it using TPU for its flexibility, and I've included a Bambu Lab P1S profile optimized for this material. A flexible holder is genuinely useful here: it can flex slightly to snap-fit around the sensor's PCB edges rather than needing separate screws to clamp it, and it absorbs small vibrations from the robot's motors instead of transmitting them straight into the sensor. However, the design is versatile, and if you would rather bolt the sensor down solidly, you can print it using PLA or other rigid materials instead.

**The 3D CAD model is available for free customization on** [**OnShape**](https://cad.onshape.com/documents/13fbeb1687d3e479bd119c8f/w/02fe54385272a973ea8aeb1a/e/5081490c32c47e5a3ea86de8?renderMode=0&uiState=66e975865b681a7292009b88){: target="_blank"}**.**

### Mounting

- Size of the screws to fix the holder to a plate: **M3**
- Size of the screws to fix the sensor to the holder: **M1.6**

### Dimensions

{% include figure popup=true image_path="/assets/images/projects/makerworld/ultrasonic-sensor-hc-sr04-holder/inline-0.jpg" alt="Ultrasonic sensor HC-SR04 holder" %}

### Printing

This is the position to be used on the printer bed:

{% include figure popup=true image_path="/assets/images/projects/makerworld/ultrasonic-sensor-hc-sr04-holder/inline-1.jpg" alt="Ultrasonic sensor HC-SR04 holder" %}

Supports are required:

{% include figure popup=true image_path="/assets/images/projects/makerworld/ultrasonic-sensor-hc-sr04-holder/inline-2.jpg" alt="Ultrasonic sensor HC-SR04 holder" %}

Supports settings:

{% include figure popup=true image_path="/assets/images/projects/makerworld/ultrasonic-sensor-hc-sr04-holder/inline-3.jpg" alt="Ultrasonic sensor HC-SR04 holder" %}

{% include figure popup=true image_path="/assets/images/projects/makerworld/ultrasonic-sensor-hc-sr04-holder/inline-4.jpg" alt="Ultrasonic sensor HC-SR04 holder" %}

Ultrasonic sensors are also directional; they need a relatively clear, unobstructed cone in front of the transducers to get a reliable echo back, so the holder's angle on the chassis matters just as much as how securely it is mounted. Getting that angle wrong is an easy way to end up with a robot that reports phantom obstacles or misses real ones, so I designed the holder's mounting geometry around the angles I actually needed on my own robot, rather than a generic flat bracket.

This is what they look like when installed on my robot

{% include figure popup=true image_path="/assets/images/projects/makerworld/ultrasonic-sensor-hc-sr04-holder/inline-5.jpg" alt="Ultrasonic sensor HC-SR04 holder" %}

{% include gallery id="gallery_photos" caption="Ultrasonic sensor HC-SR04 holder on MakerWorld" %}

A small mount, but the difference between a sensor that reads reliably and one glued on at a guessed angle.

## Print profiles

{% include makerworld-profiles.html %}

## Download
The model is free to download and print, licensed under the Standard Digital File License.

[Download on MakerWorld](https://makerworld.com/en/models/647454-ultrasonic-sensor-hc-sr04-holder){: .btn .btn--info target="_blank"}

