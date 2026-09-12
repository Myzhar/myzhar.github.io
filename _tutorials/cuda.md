---
title: "CUDA Tutorials"
excerpt: "Tutorials on NVIDIA CUDA programming and GPU computing, from fundamental concepts to practical applications."
author: "Walter Lucetti"
index: 3000
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/tutorials/cuda-tutorials-banner.svg
  teaser: /assets/images/tutorials/cuda-tutorials-banner.svg
  actions:
    - label: "<i class='fas fa-microchip'></i> NVIDIA Developer"
      url: "https://developer.nvidia.com/cuda-zone"
      target: _blank
layout: single
classes: wide
toc: false
---

Welcome to the **CUDA Tutorials** series! NVIDIA® CUDA™ is the platform that turns an NVIDIA GPU from a display adapter into a general-purpose parallel processor, and it underpins nearly every modern deep learning and computer vision pipeline that runs faster than real time. This series covers CUDA from the concepts you need before writing a single kernel to the concrete, applied case of running GPU-accelerated inference in a real pipeline.

## Who this series is for

These tutorials are aimed at developers who want to understand what their GPU is actually capable of and how to put that capability to work, rather than treating CUDA as a black box that "makes things fast." Some familiarity with C++ or Python is assumed, and prior GPU programming experience is not required for the conceptual tutorials, though the applied tutorials expect a working NVIDIA driver and CUDA toolkit installation.

## A structured learning path

**1. Understanding your hardware.** Start with [NVIDIA CUDA Compute Capability](/tutorials/cuda/cuda-compute-capability/), which explains what Compute Capability actually measures, why it determines which CUDA features, data types, and tensor core operations are available on your specific GPU, and how to look it up before you build anything that depends on it.

**2. Applying it to a real pipeline.** [Detecting Everyday Objects with YOLO, OpenCV DNN and CUDA](/tutorials/opencv/yolo-object-detection-cuda/) puts that hardware knowledge to work, building OpenCV with the CUDA DNN backend, verifying the GPU path is actually being used instead of silently falling back to the CPU, and running a COCO-trained YOLO model in real time from Python or C++.

**3. What's next.** Future additions will dig deeper into CUDA programming itself, kernels, memory hierarchies, and streams, so bookmark this page and check back as the series grows.

## Technical prerequisites

Tutorials in this series target Linux (Ubuntu is the reference platform) with a CUDA-capable NVIDIA GPU and a recent driver installed; where a CUDA toolkit or cuDNN version matters, the tutorial states it explicitly. No prior CUDA experience is required to follow the conceptual material, but the applied tutorials assume you can build software from source and read a CMake configuration, since that is how the GPU-accelerated tools in this series are typically compiled.

## Why this series exists

Most CUDA content online is either a dense low-level programming guide or a one-line "just install CUDA" instruction that skips the part where GPU features vary wildly between hardware generations, and inference silently falls back to the CPU when a single build flag is wrong. This series bridges that gap, explaining what your hardware can actually do before showing you how to exploit it in a real, working pipeline.

|  | Tutorial | Description |
| :----: | :------: | :---------- |
| [![NVIDIA CUDA Compute Capability](/assets/images/tutorials/compute_capability/geforce-rtx-50series-nv-sfg-thumbnail-1920x1080.jpeg)](/tutorials/cuda/cuda-compute-capability/) | [**NVIDIA® CUDA™ Compute Capability**](/tutorials/cuda/cuda-compute-capability/) | An overview of CUDA Compute Capability and its importance in GPU programming, helping you understand which GPU features are available on your hardware. |
| [![Object detection with YOLO, OpenCV and CUDA](/assets/images/tutorials/yolo_opencv_cuda/yolo-opencv-cuda-banner.svg)](/tutorials/opencv/yolo-object-detection-cuda/) | [**Detecting Everyday Objects with YOLO, OpenCV DNN and CUDA**](/tutorials/opencv/yolo-object-detection-cuda/) | Put the GPU to work on real-time object detection: build OpenCV with the CUDA DNN backend, verify it is actually being used, and run a COCO-trained YOLO model from Python or C++. |
{: style="table-layout: fixed;" }

<style>
  table th:nth-child(1), table td:nth-child(1) { width: 20%; }
  table th:nth-child(2), table td:nth-child(2) { width: 25%; }
  table th:nth-child(3), table td:nth-child(3) { width: 55%; }
</style>
