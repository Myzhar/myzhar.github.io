---
makerworld_key: model_44182
makerworld_id: 44182
title: "Rpi3 cover with support for dual GeekPi fan"
excerpt: "Cover for Raspberry Pi 3 that fits the GeeekPi dual fan cooler, and provides back supports to add screws to fix it."
author: "Walter Lucetti"
index: 3490
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/projects/makerworld/rpi3-cover-with-support-for-dual-geekpi-fan/overlay.jpg
  teaser: /assets/images/projects/makerworld/rpi3-cover-with-support-for-dual-geekpi-fan/teaser.jpg
  actions:
    - label: "<i class='fas fa-cube'></i> Download on MakerWorld"
      url: "https://makerworld.com/en/models/44182-rpi3-cover-with-support-for-dual-geekpi-fan"
      target: _blank
    - label: "<i class='fas fa-cube'></i> 3D Model on OnShape"
      url: "https://cad.onshape.com/documents/f3063ef963fd4483357fc647/w/db4639d4febb204a30da3a2e/e/33446fcb9ee84ad0c63f9103"
      target: _blank
layout: single
classes: single

gallery_photos:
  - url: /assets/images/projects/makerworld/rpi3-cover-with-support-for-dual-geekpi-fan/gallery-1.jpg
    image_path: /assets/images/projects/makerworld/rpi3-cover-with-support-for-dual-geekpi-fan/gallery-1.jpg
    alt: "Rpi3 cover with support for dual GeekPi fan"
  - url: /assets/images/projects/makerworld/rpi3-cover-with-support-for-dual-geekpi-fan/gallery-2.jpg
    image_path: /assets/images/projects/makerworld/rpi3-cover-with-support-for-dual-geekpi-fan/gallery-2.jpg
    alt: "Rpi3 cover with support for dual GeekPi fan"
  - url: /assets/images/projects/makerworld/rpi3-cover-with-support-for-dual-geekpi-fan/gallery-3.jpg
    image_path: /assets/images/projects/makerworld/rpi3-cover-with-support-for-dual-geekpi-fan/gallery-3.jpg
    alt: "Rpi3 cover with support for dual GeekPi fan"
  - url: /assets/images/projects/makerworld/rpi3-cover-with-support-for-dual-geekpi-fan/gallery-4.jpg
    image_path: /assets/images/projects/makerworld/rpi3-cover-with-support-for-dual-geekpi-fan/gallery-4.jpg
    alt: "Rpi3 cover with support for dual GeekPi fan"
---
## Overview

Cover for Raspberry Pi 3 that fits the [GeeekPi dual fan cooler](https://www.amazon.it/GeeekPi-Raspberry-dissipatore-Ventola-Raffreddamento/dp/B07DCP4973){: target="_blank"}, and provides back supports to add screws to fix it.

I use Raspberry Pi boards as the compute core in several of my robotics projects, and a bare board sitting exposed on a robot chassis is asking for trouble: stray screws, dust, and the occasional short circuit from something metallic brushing against the pins. Active cooling helps a lot too, since a Pi 3 under sustained CPU load, running vision or sensor fusion code for example, will throttle itself once it gets hot enough, so a dual fan cooler like the GeeekPi kit keeps the board running at full speed for longer.

The trouble with most cooling kits is that they are not designed to be mounted inside anything; they just sit loose on top of the board's heatsinks. This cover solves that: it wraps around the Pi 3 and the GeeekPi dual fan assembly together, leaving the fans free to pull air through, while adding back-panel supports so the whole thing can be screwed down onto a chassis or enclosure instead of floating loose inside it.

The CAD 3D model for remixes is publicly available on [OnShape](https://cad.onshape.com/documents/f3063ef963fd4483357fc647/w/db4639d4febb204a30da3a2e/e/33446fcb9ee84ad0c63f9103){: target="_blank"}, so if your project uses a different fan kit or you need extra cutouts for cabling, you can adjust the model instead of starting from a blank canvas.

{% include figure popup=true image_path="/assets/images/projects/makerworld/rpi3-cover-with-support-for-dual-geekpi-fan/inline-0.jpg" alt="Rpi3 cover with support for dual GeekPi fan" %}

***Note**: users reported that it does not fit the Rpi4 model.*

The Pi 3 and Pi 4 look similar at a glance but moved several connectors and mounting details around between generations, which is exactly the kind of small change that breaks a snug-fitting case even when the board's overall footprint stays close to the same. If you are on a Pi 4, it is worth checking for a case designed specifically around that board rather than assuming this one will fit; a mismatch is usually only a couple of millimeters off, but that is enough to block a connector or leave a fan misaligned.

{% include gallery id="gallery_photos" caption="Rpi3 cover with support for dual GeekPi fan on MakerWorld" %}

## Print profiles

{% include makerworld-profiles.html %}

## Download

The model is free to download and print, licensed under the Standard Digital File License.

[Download on MakerWorld](https://makerworld.com/en/models/44182-rpi3-cover-with-support-for-dual-geekpi-fan){: .btn .btn--info target="_blank"}

