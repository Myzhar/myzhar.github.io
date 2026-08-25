---
title: "OpenCV 5 is Finally Here!"
excerpt: "After years of development, OpenCV 5 officially launched at CVPR 2026. A complete DNN engine rewrite, native LLM/VLM support, FP16/BF16 types, HAL hardware acceleration, and a major 3D vision reorganization make this the biggest OpenCV release in years."
date: 2026-06-08 22:00:00 +01:00
author: "Walter Lucetti"
layout: single
classes: single
toc: true
breadcrumbs: false

sitemap: true
noindex: false

header:
  teaser: /assets/images/opencv5/opencv5-teaser.jpg
  overlay_image: /assets/images/opencv5/opencv5-teaser.jpg
  overlay_filter: "0.4"
  actions:
    - label: "Official Announcement"
      url: "https://opencv.org/opencv-5/"
      target: _blank
    - label: "Install OpenCV 5 Tutorial"
      url: "/tutorials/opencv/installing-opencv5-cuda-ubuntu/"

categories:
  - news
  - computer_vision
tags:
  - OpenCV
  - computer_vision
  - deep_learning
  - news
  - release
  - opencv5
  - DNN
  - ONNX
---

It's out! **OpenCV 5** has officially been released, and honestly, this one feels like a bigger deal than most people might realize at first glance.

{: .notice--info}
**Want to try it yourself?** I wrote a full step-by-step guide to building it from source with GPU support: [**Installing OpenCV 5 with CUDA and DNN Support on Ubuntu 24.04**](/tutorials/opencv/installing-opencv5-cuda-ubuntu/).

{% include figure popup=true image_path="/assets/images/opencv5/opencv5-release.jpg" alt="OpenCV 5 Release" max_width="400px" %}

I have a special relationship with this library. I started using OpenCV back in the early 2000s, during its **beta versions**, when the API was pure C and the documentation was sparse. I picked it up while writing my [**laurea degree thesis**](https://etd.adm.unipi.it/t/etd-11152004-085347/){: target="_blank"}, and it immediately became the tool I relied on for everything vision-related. Over the following years, I watched it evolve from that original C interface, through the C++ rewrite that made it actually pleasant to use, through the Python bindings that brought it to an entirely new audience, and through the deep learning integration in the 4.x era. It's a library I've grown up with professionally, and every major release carries a bit of that history.

{% include figure popup=true image_path="/assets/images/opencv5/walter-gary_bradsky.jpg" alt="Walter Lucetti with Gary Bradski at GTC 2015, San Jose" caption="Me with [Gary Bradski](https://en.wikipedia.org/wiki/Gary_Bradski), the father of OpenCV, at GTC 2015 in San Jose." max_width="200px" %}

So yes, this announcement landed differently for me than just another library update. OpenCV is one of those tools you just take for granted; it's been the backbone of computer vision projects for over two decades, and this major version bump is the largest leap the project has taken in a long time.

The official launch happened at **[CVPR 2026 in Denver](https://cvpr.thecvf.com/Conferences/2026){:target="_blank"}** on June 4th, with the pip package following on June 8th. And honestly, coming just two weeks after [ROS 2 Lyrical Luth](/posts/ros2-lyrical-luth-released/), this is shaping up to be quite a season for open-source robotics and computer vision. Two major releases in less than a month; I'll happily take it.

Given how important OpenCV is to me, I read through the full announcement pretty carefully, and there's a lot to unpack.

## The DNN engine rewrite: the headline feature

If there is one thing that defines this release, it's the **complete redesign of the deep learning inference engine**. The old DNN module in OpenCV 4.x was functional but limited; ONNX operator coverage sat at around **22%**, which meant you constantly ran into missing ops when trying to load modern models. OpenCV 5 brings that number to **80%+**. That is not an incremental improvement; that is a fundamental change in what you can actually run with OpenCV out of the box.

{% include figure popup=true image_path="/assets/images/opencv5/opencv5-onnx-coverage.jpg" alt="ONNX operator coverage comparison: ~22% in OpenCV 4.x vs >80% in OpenCV 5" caption="ONNX operator coverage: ~22% in OpenCV 4.x vs. more than 80% in OpenCV 5." max_width="400px" %}

The new engine is graph-based, with proper shape inference, constant folding, dynamic shape support, and even control flow through If/Loop subgraphs. It also handles quantized models natively and includes attention fusion using [FlashAttention](https://github.com/Dao-AILab/flash-attention){:target="_blank"}-style optimizations. This is a serious piece of engineering.

### Three engines for a smooth transition

One of the smartest decisions the team made was keeping backward compatibility through a three-tier engine selection model, exposed via the `EngineType` enum:

`ENGINE_CLASSIC` is the original 4.x engine, preserved for non-CPU backend support. `ENGINE_NEW` is the new graph-based engine, currently CPU-only. `ENGINE_AUTO` is the default: it tries the new engine first and falls back to classic when needed. There's also `ENGINE_ORT`, an optional wrapper around [ONNX Runtime](https://onnxruntime.ai){:target="_blank"} for cases where you want to delegate to that backend explicitly.

This is a thoughtful migration path. You get the new engine's benefits immediately for supported models, and nothing breaks for everything else. I can already imagine how many CI pipelines would have exploded otherwise.

### LLM and VLM support, natively

This one genuinely surprised me. OpenCV 5 can now run **large language models and vision-language models** natively, with a built-in tokenizer (no external dependency), KV-cache for autoregressive decoding, and support for [Qwen 2.5](https://github.com/QwenLM/Qwen2.5){:target="_blank"}, [Gemma 3](https://ai.google.dev/gemma){:target="_blank"}, [PaliGemma](https://ai.google.dev/gemma/docs/paligemma){:target="_blank"}, and the [GPT](https://openai.com){:target="_blank"} family. The team reports token-for-token accuracy matching ONNX Runtime. Running a VLM from OpenCV directly is not something I expected to see in 2026, but here we are.

{% include figure popup=true image_path="/assets/images/opencv5/opencv5-llm-output.jpg" alt="Qwen 2.5 running via OpenCV DNN, output matching ONNX Runtime token for token" caption="Qwen 2.5 running natively via OpenCV DNN; output matches ONNX Runtime token for token on the same prompt." max_width="400px" %}

### Performance numbers

The team benchmarked the new engine against ONNX Runtime on an Intel Core i9-14900KS, and the results are worth quoting: [XFeat](https://github.com/verlab/accelerated_features){:target="_blank"} is **31.25% faster**, [YOLOv8n](https://github.com/ultralytics/ultralytics){:target="_blank"} is **11.5% faster**, [OWLv2](https://huggingface.co/google/owlv2-base-patch16){:target="_blank"} is **36.6% faster**, and [BiRefNet](https://github.com/ZhengPeng7/BiRefNet){:target="_blank"} is **32.4% faster**. These are real workloads, not toy benchmarks.

{% include figure popup=true image_path="/assets/images/opencv5/opencv5-benchmarks.png" alt="CPU inference latency benchmark: OpenCV 5 DNN vs ONNX Runtime across lightweight, mid-weight, and heavy models" caption="CPU inference latency across lightweight, mid-weight, and heavy models. OpenCV 5 DNN vs. ONNX Runtime; lower is better." max_width="400px" %}


## New data types and core improvements

OpenCV 5 adds **native FP16 (`cv::hfloat`) and BF16 (`cv::bfloat`) support**, which is long overdue. Working with neural network outputs in deep learning pipelines has always required manual conversion steps; having these types first-class in `cv::Mat` makes the whole thing significantly cleaner.

There's also support for **0D (scalar) and 1D tensor** representations, proper broadcasting operations, and new 64-bit integer and boolean types. The library is finally catching up to how modern ML frameworks represent data, which matters a lot when you're gluing OpenCV preprocessing together with [PyTorch](https://pytorch.org){:target="_blank"} or ONNX models.

On raw performance: the team reports **up to 2x improvements** on mathematical workloads and **3 to 4x speedups** on ARM for operations like resizing and warping. The Universal Intrinsics layer has been updated to v2.0 with support for SSE, AVX2/512, NEON, SVE, and RISC-V Vector. This is great news for anyone running embedded vision on ARM boards.

## Hardware Acceleration Layer (HAL)

This is a feature that I think will have a big long-term impact: OpenCV 5 introduces an automatic dispatch mechanism to **vendor-optimized kernels** through a Hardware Acceleration Layer. Currently supported backends include [Intel IPP](https://www.intel.com/content/www/us/en/developer/tools/oneapi/ipp.html){:target="_blank"} (IPPICV) for x86/x64 with SSE/AVX, [Arm KleidiCV](https://gitlab.arm.com/kleidi/kleidicv){:target="_blank"} for AArch64, [Qualcomm FastCV](https://developer.qualcomm.com/software/fastcv-sdk){:target="_blank"} for Snapdragon/Hexagon DSP, and [RISC-V Vector](https://github.com/riscv/riscv-v-spec){:target="_blank"} extensions. The dispatch is automatic; the same OpenCV code just runs faster on each platform.

For robotics and edge deployments, this is a big deal. You write once and the library adapts to the hardware underneath without any extra configuration.

{% include figure popup=true image_path="/assets/images/opencv5/opencv5-hal-diagram.jpg" alt="HAL architecture diagram: OpenCV code dispatched transparently to CPU, GPU, or NPU" caption="The HAL transparently dispatches the same OpenCV code to the best available backend, whether CPU, GPU, or NPU." max_width="400px" %}

## 3D vision: a long-overdue reorganization

This section is personally very relevant to my work. The `calib3d` module, which had grown into a bloated catch-all over the years, has been split into three focused modules:

**`3d`** covers geometry, I/O, ICP, and SLAM components. **`calib`** handles single and multi-camera calibration, including hand-eye and robot-world calibration. **`stereo`** covers depth estimation from stereo pairs.

The new `calibrateMultiview` API for multi-camera setups, point cloud and mesh I/O for OBJ and PLY formats, dense RGB-D fusion with TSDF, HashTSDF, and ColorTSDF, and the USAC framework with MAGSAC robust estimation are all welcome additions. At Stereolabs, we deal with 3D reconstruction and depth pipelines every day; a well-structured API for these building blocks makes a real difference.

## Features module: deep learning meets classic detectors

The `features2d` module has been replaced by a new **`features`** module that brings deep learning-based detection and matching alongside the classic detectors we know and love.

New additions include **[ALIKED](https://github.com/Shiaoming/ALIKED){:target="_blank"}** (a CNN-based keypoint detector and descriptor), **[DISK](https://github.com/cvlab-epfl/disk){:target="_blank"}** (reinforcement learning features designed for wide-baseline matching), and **[LightGlueMatcher](https://github.com/cvg/LightGlue){:target="_blank"}** (an attention-based matcher with confidence-scored correspondences). Classic detectors like SIFT, ORB, and FAST are retained for backward compatibility, so nothing breaks if you're not ready to migrate.

The combination of learned features with the classic OpenCV pipeline architecture is interesting; I'm curious to see how ALIKED and LightGlueMatcher perform on real-world robotics sequences versus standard benchmarks.

{% include figure popup=true image_path="/assets/images/opencv5/opencv5-lightglue-matching.jpg" alt="LightGlue keypoint matching on easy and difficult image pairs with adaptive depth" caption="LightGlue adapts computation to scene difficulty: easy pairs stop after 3 layers (16.9ms), hard pairs go deeper (8 layers, 32.3ms)." max_width="400px" %}

## Generative models in OpenCV

I wouldn't have predicted this one a couple of years ago. OpenCV 5 ships with **[LaMa inpainting](https://github.com/advimman/lama){:target="_blank"}** for mask-guided object removal and a **diffusion-based inpainting** pipeline as a second option. This feels a bit out of scope for a library historically focused on classical and discriminative vision, but given where the field has gone, I understand the push. It makes OpenCV more self-contained for demo and prototyping use cases.

{% include figure popup=true image_path="/assets/images/opencv5/opencv5-lama-inpainting.jpg" alt="LaMa inpainting example: input image, masked region, and clean output" caption="LaMa inpainting: the original image, the masked region, and the restored output with the tree seamlessly removed." max_width="400px" %}

## Python and C++ improvements

On the Python side: **[NumPy 2.x](https://numpy.org/doc/stable/release/2.0.0-notes.html){:target="_blank"} support** is here at last, named (keyword) arguments work properly for algorithm classes, and the bindings have been modernized throughout. If you've spent time fighting NumPy deprecation warnings in OpenCV, this update is for you.

On the C++ side: **[C++17](https://en.cppreference.com/w/cpp/17){:target="_blank"} is now the minimum recommended standard**, with [C++20](https://en.cppreference.com/w/cpp/20){:target="_blank"} modules planned for later 5.x releases. The legacy C API (the old `cvXxx` function style) is officially deprecated in this release. It's been a long time coming; the C API has been a maintenance burden and a source of confusion for newcomers for years.

The documentation has also been migrated from [Doxygen](https://www.doxygen.nl){:target="_blank"} to [Sphinx](https://www.sphinx-doc.org){:target="_blank"} + Doxygen, with persistent navigation, hand-written tutorials alongside the API reference, and Python and C++ signatures shown together. A small change in appearance, but a big improvement in day-to-day usability.

## What's coming next in the 5.x cycle

The work isn't done. The team has committed to GPU acceleration for the new DNN engine ([CUDA](https://developer.nvidia.com/cuda-toolkit){:target="_blank"} and [TensorRT](https://developer.nvidia.com/tensorrt){:target="_blank"}), a non-CPU HAL for accelerated pre/post-processing that avoids GPU-to-CPU round trips during inference, and C++20 module support. These are the pieces that will make OpenCV 5 really complete for production deep learning pipelines; right now the new engine is CPU-only, which limits where you'd actually deploy it.

## Final thoughts

OpenCV 5 is a real release. The DNN engine rewrite alone would justify a major version bump; everything else on top, the HAL, the 3D reorganization, the new data types, and the Python modernization, makes this feel like the library catching up to where the field has been for the past few years. The ~1 million daily installs figure and [86,000+ GitHub stars](https://github.com/opencv/opencv){:target="_blank"} show how many projects still depend on it; this update will have a wide impact.

If you're maintaining a computer vision pipeline that uses OpenCV's DNN module, this is the time to start testing. The `ENGINE_AUTO` default means migration should be smooth for most cases, but it's worth validating explicitly rather than assuming. The [full OpenCV 5.0 documentation](https://docs.opencv.org/5.0/){:target="_blank"} is the best place to start.

If you want to get your hands on it right away, I put together a complete walkthrough of building 5.0.0 from source on Ubuntu 24.04 with the CUDA DNN backend: [**Installing OpenCV 5 with CUDA and DNN Support on Ubuntu 24.04**](/tutorials/opencv/installing-opencv5-cuda-ubuntu/). It covers the NVIDIA® driver, CUDA and cuDNN stack, every CMake flag that actually decides whether GPU inference works, the NumPy 2 trap Ubuntu 24.04 sets for you, and a verification ladder that catches the silent failures OpenCV never reports.

Happy robotics programming... with vision! 🤖
