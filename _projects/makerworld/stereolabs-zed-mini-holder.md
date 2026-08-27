---
title: "Stereolabs ZED Mini holder"
excerpt: "A simple holder for the STEREOLABS ZED Mini 3D camera: https://www.stereolabs.com/products/zed-2"
author: "Walter Lucetti"
index: 3500
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/projects/makerworld/stereolabs-zed-mini-holder/overlay.jpg
  teaser: /assets/images/projects/makerworld/stereolabs-zed-mini-holder/teaser.jpg
  actions:
    - label: "<i class='fas fa-cube'></i> Download on MakerWorld"
      url: "https://makerworld.com/en/models/44185-stereolabs-zed-mini-holder"
      target: _blank
layout: single
classes: single

gallery_photos:
  - url: /assets/images/projects/makerworld/stereolabs-zed-mini-holder/gallery-1.jpg
    image_path: /assets/images/projects/makerworld/stereolabs-zed-mini-holder/gallery-1.jpg
    alt: "Stereolabs ZED Mini holder"
  - url: /assets/images/projects/makerworld/stereolabs-zed-mini-holder/gallery-2.jpg
    image_path: /assets/images/projects/makerworld/stereolabs-zed-mini-holder/gallery-2.jpg
    alt: "Stereolabs ZED Mini holder"
  - url: /assets/images/projects/makerworld/stereolabs-zed-mini-holder/gallery-3.jpg
    image_path: /assets/images/projects/makerworld/stereolabs-zed-mini-holder/gallery-3.jpg
    alt: "Stereolabs ZED Mini holder"
  - url: /assets/images/projects/makerworld/stereolabs-zed-mini-holder/gallery-4.jpg
    image_path: /assets/images/projects/makerworld/stereolabs-zed-mini-holder/gallery-4.jpg
    alt: "Stereolabs ZED Mini holder"
---

## Overview

### Summary

A simple holder for the STEREOLABS ZED Mini 3D camera:
[https://www.stereolabs.com/products/zed-2](https://www.stereolabs.com/products/zed-2){: target="_blank"}

The ZED Mini is a stereo camera, it works out depth by comparing what its two lenses see, side by side, much like human binocular vision. That means the exact position and alignment of the camera on a robot is not just a mounting convenience, it directly affects how well the depth data lines up with the rest of the robot's frame of reference. A holder that is off-center or lets the camera shift slightly over time can introduce a calibration error that is a lot more annoying to track down in software than it would have been to avoid in the mechanical design.

The holder has two M3 holes to fix the camera to the case of a robot, and it has been designed to keep the middle of the stereo baseline in the middle of its base. Centering the baseline like this makes it much simpler to reason about the camera's position relative to the rest of the robot: the geometric center of the mount corresponds to the effective center of the stereo pair, rather than requiring an offset correction in software.

A mirrored model is provided to hold the camera upside down, which is useful whenever cabling or the rest of the sensor stack forces the camera into an inverted mounting position, common on robots where the camera has to sit under a shelf or an arm rather than on top of it, since the video feed can simply be flipped in software afterward.

Four M1.7 holes can be used to fix the camera to the holder to give more stability, keeping the camera body itself from flexing or shifting slightly in its mount under vibration, which matters more than it sounds for a sensor whose whole job is measuring geometry precisely.

{% include gallery id="gallery_photos" caption="Stereolabs ZED Mini holder on MakerWorld" %}

I have used this exact holder on more than one robot build over the years, since the ZED Mini keeps coming back as my go-to depth sensor whenever a project needs real stereo vision rather than a single RGB camera. Having a reliable, repeatable mount for it means I do not have to redesign the mechanical interface from scratch every time it moves to a new chassis.

## Printing

| Profile | Settings | Print time |
| --- | --- | --- |
| Normal | 0.2mm layer, 3 walls, 15% infill | ~1.5 h |
| Mirror | 0.2mm layer, 3 walls, 15% infill | ~1.5 h |

## Download

The model is free to download and print, licensed under the Standard Digital File License.

[Download on MakerWorld](https://makerworld.com/en/models/44185-stereolabs-zed-mini-holder){: .btn .btn--info target="_blank"}

