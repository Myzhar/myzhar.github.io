---
title: "Electronics Tutorials"
excerpt: "Hands-on electronics tutorials covering embedded systems, sensors, and hardware integration with NVIDIA Jetson and other platforms."
author: "Walter Lucetti"
index: 2000
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/tutorials/electronics-tutorials-banner.svg
  teaser: /assets/images/tutorials/electronics-tutorials-banner.svg
layout: single
classes: wide
toc: false
---

Welcome to the **Electronics Tutorials** series! This collection focuses on the practical side of hardware integration: wiring up sensors, talking to them over the interfaces embedded systems actually expose (SPI, I2C, GPIO), and getting the data into a form your software stack can use. The current focus is NVIDIA® Jetson™ platforms, since they sit at the intersection of embedded hardware and the kind of camera and sensor work covered in the rest of this site, but the underlying interfacing concepts apply to any single-board computer.

## Who this series is for

These tutorials are written for developers and makers who are comfortable with a breadboard and a terminal but want a guided path through a specific sensor integration, rather than generic interface documentation. No prior experience with the specific sensor covered is assumed, but basic familiarity with Linux, the command line, and reading a datasheet will make the material easier to follow.

## A structured learning path

**1. Sensor interfacing.** [Using a FLIR Lepton3 Thermal Camera with NVIDIA Jetson](/tutorials/electronics/flir-lepton-on-jetson/) is a complete, step-by-step walkthrough of wiring a FLIR® Lepton3 thermal sensor to a Jetson board over SPI and I2C, covering the breakout board, the Jetson pinout, and the driver setup needed to pull frames off the sensor and into your own code.

**2. What's next.** This series is intentionally narrow today but will grow as new sensors and boards are integrated on the bench; each new tutorial follows the same format: schematic, wiring, driver setup, and a working example you can build on. Bookmark this page and check back for additions.

## Technical prerequisites

Tutorials in this series assume basic soldering and breadboarding skills, a multimeter for sanity-checking wiring before powering anything on, and a Linux-based single-board computer (NVIDIA Jetson, in the current tutorial) with a fresh OS image flashed and network access configured. Where a vendor SDK or kernel driver is required, the tutorial walks through installing it rather than assuming it is already present. Some comfort with C++ or Python is useful for adapting the example code to your own project, though each tutorial's example code runs as-is on the hardware it targets.

## Why this series exists

Sensor datasheets and vendor SDKs tell you what a chip can do, but rarely how to get from an unopened breakout board to working data on a specific single-board computer, and that gap is usually where hours disappear into pinout mismatches, missing kernel modules, and undocumented power sequencing quirks. Each tutorial here closes that gap for one specific sensor and board combination, with wiring diagrams, exact commands, and the failure modes to watch for called out explicitly.

|  | Tutorial | Description |
| :----: | :------: | :---------- |
| [![Using a FLIR Lepton3 Thermal Camera with NVIDIA Jetson](/assets/images/tutorials/flir_jetson/breadboard.jpg)](/tutorials/electronics/flir-lepton-on-jetson/) | [**Using a FLIR Lepton3 Thermal Camera with NVIDIA® Jetson**](/tutorials/electronics/flir-lepton-on-jetson/) | A comprehensive step-by-step guide to interfacing a FLIR® Lepton3 thermal camera with NVIDIA® Jetson™ platforms. |
{: style="table-layout: fixed;" }

<style>
  table th:nth-child(1), table td:nth-child(1) { width: 20%; }
  table th:nth-child(2), table td:nth-child(2) { width: 25%; }
  table th:nth-child(3), table td:nth-child(3) { width: 55%; }
</style>
