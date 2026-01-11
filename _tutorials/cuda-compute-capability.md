---
title: "NVIDIA® CUDA® Compute Capability"
excerpt: "An overview of CUDA® Compute Capability and its importance in GPU programming"
author: "Walter Lucetti"
number: 100
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/totorials/compute_capability/geforce-rtx-50series-nv-sfg-thumbnail-1920x1080.jpeg
  teaser: /assets/images/totorials/compute_capability/geforce-rtx-50series-nv-sfg-thumbnail-1920x1080.jpeg
  actions:
    - label: "Official Source"
      url: "https://developer.nvidia.com/cuda/gpus"
layout: single
classes: single
---

## Understanding CUDA Compute Capability

When compiling CUDA code for NVIDIA® GPUs, understanding the **Compute Capability** of your target GPU is crucial. You may have encountered this error:

```bash
nvcc fatal : Unsupported gpu architecture 'compute_XX'
```

This error indicates that you need to specify the correct compute capability for your GPU.

### The Solution

Add the appropriate flag to your `nvcc` compiler command:

```bash
-gencode arch=compute_XX,code=[sm_XX,compute_XX]
```

Replace `XX` with your GPU's compute capability value (without the decimal point).

### Finding Your GPU's Compute Capability

NVIDIA® provides a comprehensive list of GPU compute capabilities on their [CUDA GPUs webpage](https://developer.nvidia.com/cuda/gpus).

### Example: Desktop GPU

If you have an **NVIDIA® GeForce RTX 4090**:

1. Locate it in the "Workstation/Consumer" column of the table
2. Find its compute capability: **8.9**
3. Use the following flag:

```bash
-gencode arch=compute_89,code=[sm_89,compute_89]
```

### Example: Embedded GPU

If you're working with an **NVIDIA Jetson AGX Thor**:

1. Look in the "Jetson" column of the table and search for "Jetson T5000"
2. The Jetson T5000 and T4000 modules have compute capability: **11.0**
3. Use this configuration:

```bash
-gencode arch=compute_110,code=[sm_110,compute_110]
```

## Multi-GPU Support

For applications that need to run on various systems with different GPUs, you can compile for multiple compute capabilities:

```bash
ARCH="-gencode arch=compute_60,code=sm_60 \
-gencode arch=compute_70,code=sm_70 \
-gencode arch=compute_75,code=sm_75 \
-gencode arch=compute_80,code=sm_80 \
-gencode arch=compute_89,code=sm_89"
nvcc ${ARCH} [other nvcc options] <input_file> -o <output_file>
```

This approach ensures your application is compatible across different GPU architectures, though it will increase compilation time and binary size.

## Compute Capability Overview

Here's a summary of NVIDIA® GPU architectures and their compute capabilities

### Recent Architectures

| Compute Capability | Data Center | Workstation/Consumer | Jetson |
|-------------------|-------------|---------------------|---------|
| 12.1 | | NVIDIA GB10 (DGX Spark) | |
| 12.0 | NVIDIA RTX PRO 6000 Blackwell Server Edition | NVIDIA RTX PRO 6000 Blackwell Workstation Edition<br>NVIDIA RTX PRO 6000 Blackwell Max-Q Workstation Edition<br>NVIDIA RTX PRO 5000 Blackwell<br>NVIDIA RTX PRO 4500 Blackwell<br>NVIDIA RTX PRO 4000 Blackwell<br>NVIDIA RTX PRO 4000 Blackwell SFF Edition<br>NVIDIA RTX PRO 2000 Blackwell<br>GeForce RTX 5090<br>GeForce RTX 5080<br>GeForce RTX 5070 Ti<br>GeForce RTX 5070<br>GeForce RTX 5060 Ti<br>GeForce RTX 5060<br>GeForce RTX 5050 | |
| 11.0 | | | Jetson T5000<br>Jetson T4000 |
| 10.3 | NVIDIA GB300<br>NVIDIA B300 | | |
| 10.0 | NVIDIA GB200<br>NVIDIA B200 | | |
| 9.0 | NVIDIA GH200<br>NVIDIA H200<br>NVIDIA H100 | | |
| 8.9 | NVIDIA L4<br>NVIDIA L40<br>NVIDIA L40S | NVIDIA RTX 6000 Ada<br>NVIDIA RTX 5000 Ada<br>NVIDIA RTX 4500 Ada<br>NVIDIA RTX 4000 Ada<br>NVIDIA RTX 4000 SFF Ada<br>NVIDIA RTX 2000 Ada<br>GeForce RTX 4090<br>GeForce RTX 4080<br>GeForce RTX 4070 Ti<br>GeForce RTX 4070<br>GeForce RTX 4060 Ti<br>GeForce RTX 4060<br>GeForce RTX 4050 | |
| 8.7 | | | Jetson AGX Orin<br>Jetson Orin NX<br>Jetson Orin Nano |
| 8.6 | NVIDIA A40<br>NVIDIA A10<br>NVIDIA A16<br>NVIDIA A2 | NVIDIA RTX A6000<br>NVIDIA RTX A5000<br>NVIDIA RTX A4000<br>NVIDIA RTX A3000<br>NVIDIA RTX A2000<br>GeForce RTX 3090 Ti<br>GeForce RTX 3090<br>GeForce RTX 3080 Ti<br>GeForce RTX 3080<br>GeForce RTX 3070 Ti<br>GeForce RTX 3070<br>GeForce RTX 3060 Ti<br>GeForce RTX 3060<br>GeForce RTX 3050 Ti<br>GeForce RTX 3050 | |
| 8.0 | NVIDIA A100<br>NVIDIA A30 | | |
| 7.5 | NVIDIA T4 | QUADRO RTX 8000<br>QUADRO RTX 6000<br>QUADRO RTX 5000<br>QUADRO RTX 4000<br>QUADRO RTX 3000<br>QUADRO T2000<br>NVIDIA T1200<br>NVIDIA T1000<br>NVIDIA T600<br>NVIDIA T500<br>NVIDIA T400<br>GeForce GTX 1650 Ti<br>NVIDIA TITAN RTX<br>GeForce RTX 2080 Ti<br>GeForce RTX 2080<br>GeForce RTX 2070<br>GeForce RTX 2060 | |

### Older Architectures

| Compute Capability | Data Center | Workstation/Consumer | Jetson |
|-------------------|-------------|---------------------|---------|
| 7.2 | | | Jetson AGX Xavier<br>Jetson Xavier NX |
| 7.0 | NVIDIA V100 | Quadro GV100<br>NVIDIA TITAN V | |
| 6.2 | | | Jetson TX2 |
| 6.1 | Tesla P40<br>Tesla P4 | Quadro P6000<br>Quadro P5200<br>Quadro P5000<br>Quadro P4200<br>Quadro P4000<br>Quadro P3200<br>Quadro P3000<br>Quadro P2200<br>Quadro P2000<br>Quadro P1000<br>Quadro P620<br>Quadro P600<br>Quadro P500<br>Quadro P400<br>P620<br>P520<br>NVIDIA TITAN Xp<br>NVIDIA TITAN X<br>GeForce GTX 1080 Ti<br>GeForce GTX 1080<br>GeForce GTX 1070 Ti<br>GeForce GTX 1070<br>GeForce GTX 1060<br>GeForce GTX 1050 | |
| 6.0 | Tesla P100 | Quadro GP100 | |
| 5.3 | | | Jetson Nano |
| 5.2 | Tesla M60<br>Tesla M40 | Quadro M6000 24GB<br>Quadro M6000<br>Quadro M5000<br>Quadro M4000<br>Quadro M2000<br>Quadro M5500M<br>Quadro M2200<br>Quadro M620<br>GeForce GTX TITAN X<br>GeForce GTX 980 Ti<br>GeForce GTX 980<br>GeForce GTX 970<br>GeForce GTX 960<br>GeForce GTX 950<br>GeForce GTX 980M<br>GeForce GTX 970M<br>GeForce GTX 965M<br>GeForce 910M | |
| 5.0 | | Quadro K2200<br>Quadro K1200<br>Quadro K620<br>Quadro M1200<br>Quadro M520<br>Quadro M5000M<br>Quadro M4000M<br>Quadro M3000M<br>Quadro M2000M<br>Quadro M1000M<br>Quadro K620M<br>Quadro M600M<br>Quadro M500M<br>NVIDIA NVS 810<br>GeForce GTX 750 Ti<br>GeForce GTX 750<br>GeForce GTX 960M<br>GeForce GTX 950M<br>GeForce 940M<br>GeForce 930M<br>GeForce GTX 850M<br>GeForce 840M<br>GeForce 830M | |
| 3.7 | Tesla K80 | | |
| 3.5 | Tesla K40<br>Tesla K20 | Quadro K6000<br>Quadro K5200<br>Quadro K610M<br>Quadro K510M<br>GeForce GTX TITAN Z<br>GeForce GTX TITAN Black<br>GeForce GTX TITAN<br>GeForce GTX 780 Ti<br>GeForce GTX 780<br>GeForce GT 730<br>GeForce GT 720<br>GeForce GT 705*<br>GeForce GT 640 (GDDR5)<br>GeForce 920M | |
| 3.2 | | | Tegra K1<br>Jetson TK1 |
| 3.0 | Tesla K10 | Quadro K5000<br>Quadro K4200<br>Quadro K4000<br>Quadro K2000<br>Quadro K2000D<br>Quadro K600<br>Quadro K420<br>Quadro 410<br>Quadro K6000M<br>Quadro K5200M<br>Quadro K5100M<br>Quadro K500M<br>Quadro K4200M<br>Quadro K4100M<br>Quadro K3100M<br>Quadro K2200M<br>Quadro K2100M<br>Quadro K1100M<br>NVIDIA NVS 510<br>GeForce GTX 770<br>GeForce GTX 760<br>GeForce GTX 690<br>GeForce GTX 680<br>GeForce GTX 670<br>GeForce GTX 660 Ti<br>GeForce GTX 660<br>GeForce GTX 650 Ti BOOST<br>GeForce GTX 650 Ti<br>GeForce GTX 650<br>GeForce GT 740<br>GeForce GTX 880M<br>GeForce GTX 870M<br>GeForce GTX 780M<br>GeForce GTX 770M<br>GeForce GTX 765M<br>GeForce GTX 760M<br>GeForce GTX 680MX<br>GeForce GTX 680M<br>GeForce GTX 675MX<br>GeForce GTX 670MX<br>GeForce GTX 660M<br>GeForce GT 755M<br>GeForce GT 750M<br>GeForce GT 650M<br>GeForce GT 745M<br>GeForce GT 645M<br>GeForce GT 740M<br>GeForce GT 730M<br>GeForce GT 640M<br>GeForce GT 640M LE<br>GeForce GT 735M<br>GeForce GT 730M | |
| 2.1 | | NVIDIA NVS 315<br>NVIDIA NVS 310<br>NVS 5400M<br>NVS 5200M<br>NVS 4200M<br>Quadro 2000<br>Quadro 2000D<br>Quadro 600<br>Quadro 4000M<br>Quadro 3000M<br>Quadro 2000M<br>Quadro 1000M<br>GeForce GTX 560 Ti<br>GeForce GTX 550 Ti<br>GeForce GTX 460<br>GeForce GTS 450<br>GeForce GTS 450*<br>GeForce GT 730 DDR3,128bit<br>GeForce GT 640 (GDDR3)<br>GeForce GT 630<br>GeForce GT 620<br>GeForce GT 610<br>GeForce GT 520<br>GeForce GT 440<br>GeForce GT 440*<br>GeForce GT 430<br>GeForce GT 430*<br>GeForce 820M<br>GeForce 800M<br>GeForce GTX 675M<br>GeForce GTX 670M<br>GeForce GT 635M<br>GeForce GT 630M<br>GeForce GT 625M<br>GeForce GT 720M<br>GeForce GT 620M<br>GeForce 710M<br>GeForce 705M<br>GeForce 610M<br>GeForce GTX 580M<br>GeForce GTX 570M<br>GeForce GTX 560M<br>GeForce GT 555M<br>GeForce GT 550M<br>GeForce GT 540M<br>GeForce GT 525M<br>GeForce GT 520MX<br>GeForce GT 520M<br>GeForce GTX 485M<br>GeForce GTX 470M<br>GeForce GTX 460M<br>GeForce GT 445M<br>GeForce GT 435M<br>GeForce GT 420M<br>GeForce GT 415M<br>GeForce 710M<br>GeForce 410M | |
| 2.0 | Tesla C2075<br>Tesla C2050<br>Tesla C2070<br>Tesla M2050<br>Tesla M2070<br>Tesla M2075<br>Tesla M2090 | Quadro Plex 7000<br>Quadro 6000<br>Quadro 5000<br>Quadro 4000<br>Quadro 4000 for Mac<br>Quadro 5010M<br>Quadro 5000M<br>GeForce GTX 590<br>GeForce GTX 580<br>GeForce GTX 570<br>GeForce GTX 480<br>GeForce GTX 470<br>GeForce GTX 465<br>GeForce GTX 480M | |
| 1.3 | Tesla C1060<br>Tesla S1070<br>Tesla M1060 | Quadro FX 5800<br>Quadro FX 4800<br>Quadro FX 4800 for Mac<br>Quadro FX 3800<br>Quadro CX<br>Quadro Plex 2200 D2<br>GeForce GTX 295<br>GeForce GTX 285<br>GeForce GTX 285 for Mac<br>GeForce GTX 280<br>GeForce GTX 275<br>GeForce GTX 260 | |
| 1.2 | | Quadro 400<br>Quadro FX 380 Low Profile<br>NVIDIA NVS 300<br>Quadro FX 1800M<br>Quadro FX 880M<br>Quadro FX 380M<br>NVIDIA NVS 300<br>NVS 5100M<br>NVS 3100M<br>NVS 2100M<br>GeForce GT 240<br>GeForce GT 220*<br>GeForce 210*<br>GeForce GTS 360M<br>GeForce GTS 350M<br>GeForce GT 335M<br>GeForce GT 330M<br>GeForce GT 325M<br>GeForce GT 240M<br>GeForce G210M<br>GeForce 310M<br>GeForce 305M | |
| 1.1 | | Quadro FX 4700 X2<br>Quadro FX 3700<br>Quadro FX 1800<br>Quadro FX 1700<br>Quadro FX 580<br>Quadro FX 570<br>Quadro FX 470<br>Quadro FX 380<br>Quadro FX 370<br>Quadro FX 370 Low Profile<br>Quadro NVS 450<br>Quadro NVS 420<br>Quadro NVS 295<br>Quadro Plex 2100 D4<br>Quadro FX 3800M<br>Quadro FX 3700M<br>Quadro FX 3600M<br>Quadro FX 2800M<br>Quadro FX 2700M<br>Quadro FX 1700M<br>Quadro FX 1600M<br>Quadro FX 770M<br>Quadro FX 570M<br>Quadro FX 370M<br>Quadro FX 360M<br>Quadro NVS 320M<br>Quadro NVS 160M<br>Quadro NVS 150M<br>Quadro NVS 140M<br>Quadro NVS 135M<br>Quadro NVS 130M<br>Quadro NVS 450<br>Quadro NVS 420<br>Quadro NVS 295<br>GeForce GTS 250<br>GeForce GTS 150<br>GeForce GT 130*<br>GeForce GT 120*<br>GeForce G100*<br>GeForce 9800 GX2<br>GeForce 9800 GTX+<br>GeForce 9800 GTX<br>GeForce 9600 GSO<br>GeForce 9500 GT<br>GeForce 8800 GTS<br>GeForce 8800 GT<br>GeForce 8800 GS<br>GeForce 8600 GTS<br>GeForce 8600 GT<br>GeForce 8500 GT<br>GeForce 8400 GS<br>GeForce 9400 mGPU<br>GeForce 9300 mGPU<br>GeForce 8300 mGPU<br>GeForce 8200 mGPU<br>GeForce 8100 mGPU<br>GeForce GTX 285M<br>GeForce GTX 280M<br>GeForce GTX 260M<br>GeForce 9800M GTX<br>GeForce 8800M GTX<br>GeForce GTS 260M<br>GeForce GTS 250M<br>GeForce 9800M GT<br>GeForce 9600M GT<br>GeForce 8800M GTS<br>GeForce 9800M GTS<br>GeForce GT 230M<br>GeForce 9700M GT<br>GeForce 9650M GS<br>GeForce 9700M GT<br>GeForce 9650M GS<br>GeForce 9600M GT<br>GeForce 9600M GS<br>GeForce 9500M GS<br>GeForce 8700M GT<br>GeForce 8600M GT<br>GeForce 8600M GS<br>GeForce 9500M G<br>GeForce 9300M G<br>GeForce 8400M GS<br>GeForce G210M<br>GeForce G110M<br>GeForce 9300M GS<br>GeForce 9200M GS<br>GeForce 9100M G<br>GeForce 8400M GT<br>GeForce G105M | |
| 1.0 | Tesla C870<br>Tesla D870<br>Tesla S870 | Quadro FX 5600<br>Quadro FX 4600<br>Quadro Plex 2100 S4<br>GeForce GT 420*<br>GeForce 8800 Ultra<br>GeForce 8800 GTX<br>GeForce GT 340*<br>GeForce GT 330*<br>GeForce GT 320*<br>GeForce 315*<br>GeForce 310*<br>GeForce 9800 GT<br>GeForce 9600 GT<br>GeForce 9400GT | |