---
title: "Flir Lepton3 Breakout case"
excerpt: "This case is for the GroupGets FLIR Lepton Breakout Board and has been designed to safely use the FLIR Lepton3 thermal sensor."
author: "Walter Lucetti"
index: 3460
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/projects/makerworld/flir-lepton3-breakout-case/overlay.jpg
  teaser: /assets/images/projects/makerworld/flir-lepton3-breakout-case/teaser.jpg
  actions:
    - label: "<i class='fas fa-cube'></i> Download on MakerWorld"
      url: "https://makerworld.com/en/models/44186-flir-lepton3-breakout-case"
      target: _blank
    - label: "<i class='fab fa-github'></i> GitHub repository"
      url: "https://github.com/Myzhar/Lepton3_BBB"
      target: _blank
layout: single
classes: single

gallery_photos:
  - url: /assets/images/projects/makerworld/flir-lepton3-breakout-case/gallery-1.jpg
    image_path: /assets/images/projects/makerworld/flir-lepton3-breakout-case/gallery-1.jpg
    alt: "Flir Lepton3 Breakout case"
  - url: /assets/images/projects/makerworld/flir-lepton3-breakout-case/gallery-2.jpg
    image_path: /assets/images/projects/makerworld/flir-lepton3-breakout-case/gallery-2.jpg
    alt: "Flir Lepton3 Breakout case"
  - url: /assets/images/projects/makerworld/flir-lepton3-breakout-case/gallery-3.jpg
    image_path: /assets/images/projects/makerworld/flir-lepton3-breakout-case/gallery-3.jpg
    alt: "Flir Lepton3 Breakout case"
  - url: /assets/images/projects/makerworld/flir-lepton3-breakout-case/gallery-4.jpg
    image_path: /assets/images/projects/makerworld/flir-lepton3-breakout-case/gallery-4.jpg
    alt: "Flir Lepton3 Breakout case"
---

## Overview

This case is for the [GroupGets FLIR Lepton Breakout Board](https://groupgets.com/manufacturers/getlab/products/flir-lepton-breakout-board-v1-4){: target="_blank"} and has been designed to safely use the [FLIR Lepton3](https://www.flir.eu/products/lepton/?vertical=microcam&segment=oem){: target="_blank"} thermal sensor.

The Lepton3 itself is a tiny thermal imaging module, barely bigger than a fingernail, and the GroupGets breakout board that carries it is just as small and just as exposed: a bare PCB with the sensor module socketed on top and header pins along the edge. That is fine on a workbench, but the moment you want to actually use the sensor for something, whether mounted on a robot, pointed out of a window, or carried around during testing, you need an enclosure that protects the board and the delicate sensor module without blocking its field of view.

I have used the Lepton3 in several projects over the years, mostly around embedded thermal imaging on single-board computers, and this case is the enclosure I kept reusing across all of them: a snug shell that exposes the sensor's lens and the header pins for wiring, while keeping the rest of the board protected from knocks and dust. It has genuinely been useful hardware, not just a one-off print, which is why I keep coming back to it whenever a new Lepton3-based project starts.

You can find my projects with the Flir Lepton3 sensors by following these links:

- [Driver for BeagleBone embedded board](https://github.com/Myzhar/Lepton3_BBB){: target="_blank"}
- [Driver for NVIDIA Jetson boards](https://github.com/Myzhar/Lepton3_Jetson){: target="_blank"}
- [Thermal Images on Jetson™ Nano with FLIR Lepton3](https://www.myzhar.com/blog/jetson-nano-with-flir-lepton3/){: target="_blank"}
- [Jetson Fever Control against COVID-19](https://www.myzhar.com/blog/jetson-fever-control-application-against-covid19/){: target="_blank"}

[NVIDIA spoke about my project during the COVID-19 period.](https://developer.nvidia.com/embedded/community/jetson-projects/fever_control_lepton3){: target="_blank"}

That fever-screening project is probably the best example of why having a solid, reusable case for this sensor mattered: it was built to run continuously in a real environment, not just sit on a bench for a demo, and a bare thermal sensor board would not have survived that kind of use for long. Having a dependable enclosure already designed and printed meant I could focus on the software and the thermal calibration instead of reinventing the hardware mount every time a new project called for the Lepton3.

{% include gallery id="gallery_photos" caption="Flir Lepton3 Breakout case on MakerWorld" %}

A reusable enclosure like this ends up paying for its design time many times over across a sensor's whole working life.

A small case that has followed this sensor across several very different projects.

If you are just getting started with the Lepton3, pairing this case with one of the driver repositories linked above is the fastest way to get from an unopened breakout board to actual thermal images on screen.

## Download

The model is free to download and print, licensed under the Standard Digital File License.

[Download on MakerWorld](https://makerworld.com/en/models/44186-flir-lepton3-breakout-case){: .btn .btn--info target="_blank"}

