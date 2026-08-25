---
title: "Two New OpenCV Tutorials: Building OpenCV 5 with CUDA, and Running YOLO with It"
excerpt: "A new OpenCV Tutorials section is online, opening with two connected guides: building OpenCV 5.0.0 from source with the CUDA DNN backend on Ubuntu 24.04, and writing a real-time YOLO detector in Python and C++ using nothing but OpenCV and an NVIDIA GPU."
date: 2026-08-25 21:00:00 +02:00
author: "Walter Lucetti"
layout: single
classes: wide
toc: false
breadcrumbs: false

sitemap: true
noindex: false

header:
  teaser: /assets/images/tutorials/opencv-tutorials-banner.svg
  overlay_image: /assets/images/tutorials/opencv-tutorials-banner.svg
  overlay_filter: "0.5"
  actions:
    - label: "<i class='fas fa-book-open'></i> Browse the OpenCV Tutorials"
      url: "/tutorials/opencv/"
    - label: "<i class='fab fa-github'></i> YOLO Tutorial Code"
      url: "https://github.com/Myzhar/tutorial-opencv-yolo"
      target: _blank

categories:
  - news
  - tutorials
  - website
  - computer_vision
tags:
  - updates
  - website
  - tutorials
  - OpenCV
  - opencv5
  - computer_vision
  - deep_learning
  - DNN
  - ONNX
  - CUDA
  - NVIDIA
  - YOLO
  - COCO
  - object detection
  - ubuntu
---

When I wrote about the [OpenCV 5 release](/posts/opencv5-released/) back in June, I ended the post with the usual promise to follow up with something practical. That follow-up is now online, and it turned out to be two tutorials rather than one, because the honest answer to *"how do I run a neural network on my GPU with OpenCV?"* has two halves that are very hard to explain at the same time.

The website now has a dedicated [**OpenCV Tutorials**](/tutorials/opencv/) section, alongside the existing CUDA™, ROS 2 and electronics ones, and it opens with those two guides.

## Building the OpenCV you actually wanted

The first tutorial, [**Installing OpenCV 5 with CUDA and DNN Support on Ubuntu 24.04**](/tutorials/opencv/installing-opencv5-cuda-ubuntu/), is about the part everybody underestimates.

Installing OpenCV is a one-liner. Installing the OpenCV you actually wanted is an afternoon. `pip install opencv-python` gives you a perfectly good library that will never touch your GPU; `sudo apt install libopencv-dev` gives you OpenCV 4.6.0 on Ubuntu 24.04, which is four years old and will also never touch your GPU. Neither is built with `OPENCV_DNN_CUDA`, and no runtime flag can change that, because the code simply is not in the binary.

So the tutorial walks the whole chain, in order: the NVIDIA® driver, choosing between a CUDA™ 12.x and a 13.x toolkit (which matters more than it sounds if your GPU is Pascal or Volta), cuDNN, the build dependencies, the source trees, and every CMake flag that decides whether GPU inference will work. It also covers a few things I have not seen written down clearly anywhere else:

- The **NumPy 2 trap** that Ubuntu 24.04 sets specifically for you, and which does not break the build; it breaks `import cv2` a month later.
- A **private install prefix** that does not fight with the OpenCV 4.6.0 that ROS 2 and `cv_bridge` are already linked against. If you install to `/usr/local` and something starts segfaulting on a `cv::Mat` crossing a library boundary, there is no runtime fix for that.
- Reading the **CMake configure summary**: six lines tell you whether the build will do what you want, which is worth knowing *before* spending an hour compiling rather than after.
- A **five-step verification ladder**, because the two most consequential failures in this stack do not stop the build. They warn once, quietly, while your model is loading.
- What breaks the first time you compile existing code against OpenCV 5: the `opencv4` to `opencv5` path change, `calib3d` splitting into `geometry`, `calib`, `stereo` and `ptcloud`, `features2d` becoming `features`, and the C API being removed outright rather than deprecated.

There is also a section on **when not to do any of this**, which I think matters as much as the instructions. A source build is a real cost: an afternoon, a maintenance burden, and a machine that is now slightly non-standard. If you only need CPU inference, OpenCV 5's new engine is genuinely fast and arrives with a `pip install`.

## Running YOLO on it

The second tutorial, [**Detecting Everyday Objects with YOLO, OpenCV DNN and CUDA**](/tutorials/opencv/yolo-object-detection-cuda/), is what you do with the build once you have it.

The premise is that OpenCV can run YOLO by itself. The `dnn` module loads an ONNX file, runs it on your GPU, and hands you back a tensor. No PyTorch at runtime, no two gigabytes of wheels on your robot's Jetson™, and no Python at all if you would rather not have it. The catch is that OpenCV gives you a *tensor*, not a list of objects, and everything between raw pixels and "there is a dog at (312, 48, 190, 240)" is your job.

So the tutorial spells out that middle part, with the maths: exporting a YOLO model to ONNX in a form OpenCV can actually load, the letterbox and why a plain `resize()` gives you boxes in the wrong place on non-square frames, what the shape `1 x 84 x 8400` means and how to decode it, confidence filtering, class-aware non-maximum suppression, and mapping the result back into the original frame. Then it does the whole thing twice, as a complete real-time detector in **Python** and in **C++**, with the code also available in the [tutorial-opencv-yolo](https://github.com/Myzhar/tutorial-opencv-yolo){: target="_blank"} repository, including a test that checks both implementations against a reference produced by Ultralytics itself.

## The trap that connects them

Both tutorials keep returning to the same problem, which is the reason they exist as a pair.

OpenCV 5 ships a completely rewritten DNN engine. It is an excellent piece of engineering, with ONNX operator coverage jumping from roughly 22% to over 80%, and as of 5.0.0 it is **CPU-only**. OpenCV 5 therefore carries two engines, and the default, `ENGINE_AUTO`, tries the new one first. A YOLO11 graph loads on it perfectly well, so the classic engine is never reached, and your `setPreferableBackend(DNN_BACKEND_CUDA)` call has nowhere to go.

The model runs. The results are correct. It runs entirely on your CPU, and it tells you so in two warning lines printed once during loading, which are gone in a second in any real application log. Measured on an RTX 3060 Laptop with YOLO11n at 640x640, that is 55.2 ms per `forward()` instead of 16.3 ms; within 2% of the plain CPU path, with the GPU sitting idle. I am fairly confident this is the single most common reason "OpenCV 5 is slower than OpenCV 4" reports keep appearing. Nothing is broken.

The fix is one argument, `ENGINE_CLASSIC`, and it is the sort of thing you either know or lose an evening to.

## Have a look

Both tutorials are written to be read in either order, and each links into the other at the point where you would want it. If you want a GPU-capable OpenCV, start with the [installation guide](/tutorials/opencv/installing-opencv5-cuda-ubuntu/). If you already have one and just want detections, go straight to the [YOLO tutorial](/tutorials/opencv/yolo-object-detection-cuda/).

As always, corrections and reports of failure modes I have not listed are very welcome; those are the parts that make this kind of guide actually useful. [Let me know](/contact/) if you hit one.

Happy detecting! 🤖
