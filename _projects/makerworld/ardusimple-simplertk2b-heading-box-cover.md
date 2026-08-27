---
title: "ARDUSIMPLE simpleRTK2B Heading - Box/cover"
excerpt: "I reworked this GrabCad project to create a custom box for the ARDUSIMPLE simpleRTK2B Heading Starter Kit."
author: "Walter Lucetti"
index: 3300
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/overlay.jpg
  teaser: /assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/teaser.jpg
  actions:
    - label: "<i class='fas fa-cube'></i> Download on MakerWorld"
      url: "https://makerworld.com/en/models/231598-ardusimple-simplertk2b-heading-box-cover"
      target: _blank
layout: single
classes: single

gallery_photos:
  - url: /assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/gallery-1.jpg
    image_path: /assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/gallery-1.jpg
    alt: "ARDUSIMPLE simpleRTK2B Heading - Box/cover"
  - url: /assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/gallery-2.jpg
    image_path: /assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/gallery-2.jpg
    alt: "ARDUSIMPLE simpleRTK2B Heading - Box/cover"
  - url: /assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/gallery-3.jpg
    image_path: /assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/gallery-3.jpg
    alt: "ARDUSIMPLE simpleRTK2B Heading - Box/cover"
  - url: /assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/gallery-4.jpg
    image_path: /assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/gallery-4.jpg
    alt: "ARDUSIMPLE simpleRTK2B Heading - Box/cover"
---

## Overview

I reworked this [GrabCad project](https://grabcad.com/library/ardusimple-simplertk2b-heading-1){: target="_blank"} to create a custom box for the [ARDUSIMPLE simpleRTK2B Heading Starter Kit](https://www.ardusimple.com/product/simplertk2b-heading-basic-starter-kit-ip67/){: target="_blank"}.

This kit pairs two u-blox ZED-F9P RTK receivers to work out not just a robot's centimeter-level GPS position, but also its true compass heading, by comparing the signal phase between two antennas mounted a fixed distance apart, which is exactly the kind of reliable heading source a mobile robot needs for outdoor navigation. That is a big upgrade over estimating heading from a magnetometer or from GPS motion alone, both of which get unreliable at low speed or near ferrous metal. Two exposed RTK boards and a bundle of antenna and communication cabling are not something you want sitting bare on a robot chassis though, so a proper enclosure was one of the first things I needed once I started integrating this kit into my own projects.

Rather than start a box from scratch, I found a compatible enclosure design already published on GrabCad and reworked it to fit my own needs: the exact board stack, the connector layout I needed exposed, and the assembly method I prefer for my projects.

The bottom cover is fully closed, without holes, and I printed it in ASA to make it more resistant to UV. That choice matters if the box is going to live outdoors on top of a robot for any length of time: PLA gets brittle and warps under sustained sun exposure, while ASA holds up to UV and temperature swings much better, which is why I reach for it by default on any enclosure meant to spend real time outside.

{% include figure popup=true image_path="/assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/inline-0.jpg" alt="Bottom cover" caption="Bottom cover" %}

The cover holes are suitable for M3 brass inserts to lock to the top cover.

{% include figure popup=true image_path="/assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/inline-1.jpg" alt="Brass inserts ready to be fitted" caption="Brass inserts ready to be fitted" %}

{% include figure popup=true image_path="/assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/inline-2.jpg" alt="Brass inserts pushed into the cover" caption="Brass inserts pushed into the cover" %}

Starting from an existing, already-tested design and adapting it to the exact board stack and connector layout I needed was faster and more reliable here than modeling an enclosure from a blank canvas, especially for a stack with this many connectors and mounting constraints to get right.

The box is perfect for fitting the main board with [u-blox ZED-F9P](https://www.u-blox.com/en/product/zed-f9p-module){: target="_blank"} and the heading board with a second [u-blox ZED-F9P](https://www.u-blox.com/en/product/zed-f9p-module){: target="_blank"}. It is also ready to fit the Xbee daughter board for local communication.

{% include figure popup=true image_path="/assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/inline-3.jpg" alt="The main board is locked in the bottom cover exposing the antenna connector and the communication ports" caption="The main board is locked in the bottom cover exposing the antenna connector and the communication ports" %}

{% include figure popup=true image_path="/assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/inline-4.jpg" alt="The heading daughterboard is mounted on the expansion port, exposing the second antenna port" caption="The heading daughterboard is mounted on the expansion port, exposing the second antenna port" %}

The top cover in transparent PETG lets you monitor the LEDs' blinking to check whether the satellite fix is available.

{% include figure popup=true image_path="/assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/inline-5.jpg" alt="The top cover is made with transparent PETG" caption="The top cover is made with transparent PETG" %}

{% include figure popup=true image_path="/assets/images/projects/makerworld/ardusimple-simplertk2b-heading-box-cover/inline-6.jpg" alt="The full box closed and operative" caption="The full box closed and operative" %}

{% include gallery id="gallery_photos" caption="ARDUSIMPLE simpleRTK2B Heading - Box/cover on MakerWorld" %}

## Download

The model is free to download and print, licensed under the Standard Digital File License.

[Download on MakerWorld](https://makerworld.com/en/models/231598-ardusimple-simplertk2b-heading-box-cover){: .btn .btn--info target="_blank"}
