---
title: "OpenCV Tutorials"
excerpt: "Practical OpenCV tutorials on computer vision and deep learning inference, from the DNN module to GPU-accelerated real-time pipelines."
author: "Walter Lucetti"
index: 4000
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/tutorials/opencv-tutorials-banner.svg
  teaser: /assets/images/tutorials/opencv-tutorials-banner.svg
  actions:
    - label: "<i class='fas fa-globe'></i> Official OpenCV Website"
      url: "https://opencv.org/"
      target: _blank
layout: single
classes: wide
toc: false
---

A collection of hands-on **OpenCV** tutorials, focused on the parts of the library that turn a camera stream into something a machine can actually act on: deep learning inference, GPU acceleration, and real-time pipelines.

|  | Tutorial | Description |
| :----: | :------: | :---------- |
| [![Installing OpenCV 5 with CUDA and DNN support on Ubuntu 24.04](/assets/images/tutorials/opencv5_cuda_install/opencv5-cuda-install-banner.svg)](/tutorials/opencv/installing-opencv5-cuda-ubuntu/) | [**Installing OpenCV 5 with CUDA and DNN Support on Ubuntu 24.04**](/tutorials/opencv/installing-opencv5-cuda-ubuntu/) | Build OpenCV 5.0.0 from source with the CUDA DNN backend. The NVIDIA driver, CUDA and cuDNN stack, every CMake flag that decides whether GPU inference works, the NumPy 2 trap Ubuntu 24.04 sets for you, and a five-step verification ladder that catches the failures OpenCV never reports. |
| [![Object detection with YOLO, OpenCV and CUDA](/assets/images/tutorials/yolo_opencv_cuda/yolo-opencv-cuda-banner.svg)](/tutorials/opencv/yolo-object-detection-cuda/) | [**Detecting Everyday Objects with YOLO, OpenCV DNN and CUDA**](/tutorials/opencv/yolo-object-detection-cuda/) | Run a COCO-trained YOLO model in real time using nothing but OpenCV and an NVIDIA® GPU. Complete Python and C++ code, the letterbox and output-tensor maths explained, CUDA build instructions, and the OpenCV 5 engine trap that silently sends your inference back to the CPU. |
{: style="table-layout: fixed;" }

<style>
  table th:nth-child(1), table td:nth-child(1) { width: 20%; }
  table th:nth-child(2), table td:nth-child(2) { width: 25%; }
  table th:nth-child(3), table td:nth-child(3) { width: 55%; }
</style>
