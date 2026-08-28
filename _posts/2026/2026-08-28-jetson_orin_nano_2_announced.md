---
title: "NVIDIA® Announces Jetson™ Orin Nano 2 for Entry-Level Edge AI"
excerpt: "NVIDIA® has unveiled the Jetson™ Orin Nano 2, a new entry-level robotics computer promising 2x the inference performance of the Orin Nano Super at 40% lower power, though it won't ship until H1 2027."
date: 2026-08-27 22:00:00 +01:00
author: "Walter Lucetti"
layout: single
classes: single
toc: true
breadcrumbs: false

sitemap: true
noindex: false

header:
  teaser: /assets/images/posts/20260828-jetson_orin_nano_2/jetson-orin-nano-2.jpg
  overlay_image: /assets/images/posts/20260828-jetson_orin_nano_2/jetson-orin-nano-2.jpg
  overlay_filter: "0.5"
  actions:
    - label: "Official Announcement"
      url: "https://nvidianews.nvidia.com/news/nvidia-announces-jetson-orin-nano-2-robotics-computer-to-redefine-entry-level-edge-ai"
      target: _blank

categories:
  - news
tags:
  - NVIDIA®
  - Jetson™
  - Jetson™ Orin Nano
  - edge AI
  - robotics
  - embedded
---

NVIDIA® just announced the **Jetson™ Orin Nano 2**, a new robotics computer aimed at entry-level edge AI. It's worth noting right away: this is a different product from the older **Jetson™ Orin Nano 2GB**, a low-cost developer kit variant released a couple of years ago; the naming is close enough to cause confusion, but the "2" here refers to a second-generation Orin Nano, not a memory configuration.

## What's new

According to the [official press release](https://nvidianews.nvidia.com/news/nvidia-announces-jetson-orin-nano-2-robotics-computer-to-redefine-entry-level-edge-ai){:target="_blank"}, the Jetson™ Orin Nano 2 packs:

- **78 trillion operations per second (TOPS)** of AI compute
- **8GB** of memory
- An **8-core Arm CPU**
- The **same compact form factor** as its predecessor, the [Jetson™ Orin Nano Super](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/nano-super-developer-kit/){:target="_blank"}

NVIDIA® claims **2x the inference performance** of the Orin Nano Super, thanks to improved Tensor Cores and higher memory bandwidth, and in 15-watt mode it delivers the same performance as the previous generation while consuming **40% less power**. That power efficiency angle seems to be the real headline for anyone building battery-constrained platforms like drones or mobile robots, rather than the raw TOPS number.

On the software side, it runs on NVIDIA®'s open [Jetson™ software stack](https://developer.nvidia.com/embedded/jetpack){:target="_blank"} and is positioned to run memory-efficient edge inference for LLMs and VLMs, including NVIDIA® [Cosmos](https://www.nvidia.com/en-us/ai/cosmos/){:target="_blank"} and [Nemotron](https://www.nvidia.com/en-us/ai-data-science/foundation-models/nemotron/){:target="_blank"}, along with [Gemma 4](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/){:target="_blank"} and [Qwen 3](https://github.com/QwenLM/Qwen3){:target="_blank"}.

## Early adopters and ecosystem

NVIDIA® says more than **3 million developers** are already building on its robotics stack. Among the first to explore the Orin Nano 2 are:

- **[Cognex](https://www.cognex.com/){:target="_blank"}**
- **[Doosan Bobcat](https://www.doosanbobcat.com/en/){:target="_blank"}**
- **[Matic Robots](https://maticrobots.com/){:target="_blank"}**, which is adopting it for its home cleaning robots (conversational AI, gesture detection, precision mapping)
- **[Wing](https://wing.com/){:target="_blank"}** (Alphabet's drone delivery subsidiary), which currently runs Orin Nano Super and is evaluating the Orin Nano 2 for real-time perception and reasoning in its delivery drones

Partners across the ecosystem, including [AAEON](https://www.aaeon.com/en){:target="_blank"}, [ADLINK](https://www.adlinktech.com/){:target="_blank"}, [Advantech](https://www.advantech.com/en-us){:target="_blank"}, [Connect Tech](https://connecttech.com/){:target="_blank"}, [RidgeRun](https://www.ridgerun.com/){:target="_blank"}, [Seeed Studio](https://www.seeedstudio.com/){:target="_blank"} and others, are already building carrier boards and reference designs around the module.

## Availability

This is the part that stands out most: the module and developer kit are **not expected until the first half of 2027**, with no pricing disclosed yet. That's a meaningful gap between announcement and shipping product, so treat the performance claims as forward-looking until independent benchmarks are available.

## My take - _honest personal opinions_

I've been working with NVIDIA® Jetson™ boards since the first "TK1" development kit (see [MyzharBot v3](/projects/myzharbot/myzharbot-v3/)), and I've been part of the [Jetson Champion program](https://developer.nvidia.com/embedded/community/jetson-champions){:target="_blank"} since 2015. I've used every Jetson™ module for both hobby and professional work, right up to the latest monster, "Thor", so I'm genuinely curious to get my hands on this new one as soon as it ships.

That history is exactly why this generation excites me. Doubling inference performance while cutting power draw by 40% at the same performance level is a genuine generational leap, not an incremental bump, and it's the combination of the two that stands out: most of the edge robotics projects I've worked on are thermally or power constrained long before they're compute constrained, so getting more performance per watt and higher raw throughput at once is exactly what unlocks new form factors, like smaller drones, battery-powered inspection robots, and always-on home robots, rather than just making existing designs marginally faster.

I'm also genuinely impressed by the "frontier-class generative AI at the edge" framing, even if I'd temper the marketing language a bit. Running a capable VLM at low latency on 8GB, fast enough for real-time perception and reasoning, would have sounded like science fiction on the Jetson™ boards I was using a few years ago. Watching small and medium models catch up to what used to require a full frontier model in the cloud, and then seeing that capability land on a compact, power-sipping module, is exactly the kind of progress that makes edge robotics more accessible for everyone, not just teams with big power and thermal budgets.

The H1 2027 availability window is the detail I'd flag to anyone planning a design around this: that's a long lead time for a product announced today, and it leaves plenty of room for the roadmap to shift. I'll be keeping an eye on developer kit pricing once it's announced, since that (along with the Jetson™ Orin Nano Super's current $249 price point) has historically been what actually drives adoption in the maker and small robotics community.

What I'm most curious about, though, is the final specifications that NVIDIA® hasn't detailed yet: the hardware video encoders and decoders, camera connectivity, and the hardware ISP. The original Jetson™ Orin Nano shipped without a hardware encoder, and that was a real limitation for anyone streaming video off a robot; you either burned precious compute cycles on software encoding or had to work around it entirely. If the Jetson™ Orin Nano 2 brings back proper hardware encode/decode alongside solid camera and ISP support, that would matter just as much to real deployments as the headline TOPS and power numbers.

Stay tuned for more details as NVIDIA® reveals additional information ahead of the planned Q1 2027 launch.

---

Sources: [NVIDIA® Newsroom](https://nvidianews.nvidia.com/news/nvidia-announces-jetson-orin-nano-2-robotics-computer-to-redefine-entry-level-edge-ai){:target="_blank"}, [NVIDIA® Investor Relations](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Jetson-Orin-Nano-2-Robotics-Computer-to-Redefine-Entry-Level-Edge-AI/default.aspx){:target="_blank"}, [Unite.AI](https://www.unite.ai/nvidia-unveils-jetson-orin-nano-2-to-redefine-entry-level-edge-ai/){:target="_blank"}
