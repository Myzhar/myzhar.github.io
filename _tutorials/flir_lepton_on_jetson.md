---
title: "Using a FLIR Lepton3 Thermal Camera with NVIDIA® Jetson"
excerpt: "A comprehensive step-by-step guide to interfacing a FLIR¶ Lepton3 thermal camera with NVIDIA® Jetson platforms."
author: "Walter Lucetti"
number: 200
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/tutorials/flir_jetson/breadboard.jpg
  teaser: /assets/images/tutorials/flir_jetson/breadboard.jpg
  actions:
    - label: "GitHub Repository"
      url: "https://github.com/Myzhar/Lepton3_Jetson"
layout: single
classes: single

gallery_pcb:
  - url: /assets/images/tutorials/flir_jetson/breadboard.jpg
    image_path: /assets/images/tutorials/flir_jetson/breadboard.jpg
    alt: "Front View of the Breadboard"
    title: "Front View of the Breadboard"
  - url: /assets/images/tutorials/flir_jetson/breadboard_top.jpg
    image_path: /assets/images/tutorials/flir_jetson/breadboard_top.jpg
    alt: "Top View of the Breadboard"
    title: "Top View of the Breadboard"
  - url: /assets/images/tutorials/flir_jetson/breadboard_bottom.jpg
    image_path: /assets/images/tutorials/flir_jetson/breadboard_bottom.jpg
    alt: "Bottom View of the Breadboard"
    title: "Bottom View of the Breadboard"

gallery_case:
  - url: /assets/images/tutorials/flir_jetson/case_lepton.jpg
    image_path: /assets/images/tutorials/flir_jetson/case_lepton.jpg
    alt: "3D Printed Enclosure for FLIR Lepton3 Breakout Board"
    title: "3D Printed Enclosure for FLIR Lepton3 Breakout Board"
  - url: /assets/images/tutorials/flir_jetson/case.jpg
    image_path: /assets/images/tutorials/flir_jetson/case.jpg
    alt: "3D Printed Enclosure for FLIR Lepton3 Breakout Board"
    title: "3D Printed Enclosure for FLIR Lepton3 Breakout Board"

gallery_demo:
  - url: /assets/images/tutorials/flir_jetson/FeverNormal.png
    image_path: /assets/images/tutorials/flir_jetson/FeverNormal.png
    alt: "No Fever Detected"
    title: "No Fever Detected"
  - url: /assets/images/tutorials/flir_jetson/FeverWarning.png
    image_path: /assets/images/tutorials/flir_jetson/FeverWarning.png
    alt: "Fever Warning Detected"
    title: "Fever Warning Detected"
  - url: /assets/images/tutorials/flir_jetson/FeverAlert.png
    image_path: /assets/images/tutorials/flir_jetson/FeverAlert.png
    alt: "Fever Alert Detected"
    title: "Fever Alert Detected" 
---

## Introduction

In 2017, I participated in and won a [challenge](https://web.archive.org/web/20251014065758/https://www.myzhar.com/blog/smartc-smart-thermal-camera-won-flir-lepton3-beaglebone-blue-challenge/) promoted by [FLIR®](https://www.flir.com/) and the [BeagleBoard.org Foundation](https://www.beagleboard.org/). The project that I developed used a [FLIR® Lepton3 module](https://oem.flir.com/products/lepton/) and a [BeagleBone Blue](https://www.beagleboard.org/boards/beaglebone-blue) to detect and track people using thermal imaging.

This tutorial explains how to interface the [FLIR® Lepton3 module](https://oem.flir.com/products/lepton/) with NVIDIA® Jetson™ devices, including wiring, configuration, and software integration.

## The FLIR® Lepton3

![FLIR® Lepton3](/assets/images/tutorials/flir_jetson/flir_lepton_3.jpg){: .align-right}

> The [FLIR Lepton®](https://oem.flir.com/products/lepton/) is a radiometric-capable LWIR camera solution that is smaller than a dime, fits inside a smartphone, and is one-tenth the cost of traditional IR cameras. Using focal plane arrays of either 160×120 or 80×60 active pixels, Lepton easily integrates into native mobile devices and other electronics as an IR sensor or thermal imager. The radiometric Lepton captures accurate, calibrated, and non-contact temperature data in every pixel of each image.

The FLIR module uses two communication protocols:

* **I²C** - Controls sensor settings and configuration
* **SPI** - Transmits thermal image data

### Technical Specifications

Key specifications of the FLIR® Lepton3:

* **Resolution**: 160×120 pixels (19,200 thermal pixels)
* **Spectral Range**: 8 µm to 14 µm (longwave infrared)
* **Scene Temperature Range**: -10°C to +400°C (14°F to 752°F)
* **Thermal Sensitivity**: < 50 mK (0.050°C)
* **Field of View**: 57° (horizontal) × 43° (vertical)
* **Frame Rate**: 8.6 Hz
* **Input Clock**: 25 MHz
* **Power Consumption**: Typical 150 mW, max 180 mW
* **Weight**: < 0.9 grams
* **Dimensions**: 10.5mm × 12.4mm × 6.0mm

The compact form factor makes it ideal for embedded applications and mobile devices.

## The Breakout Board

The FLIR® Lepton3 module requires a breakout board for connectivity, when not integrated into a device. I use the GroupGets FLIR breakout board v1.4, which is no longer available. The [PureThermal Breakout Board](https://groupgets.com/products/purethermal-breakout-board) is a suitable alternative.

The breakout board provides all required voltages, I²C pull-ups, and clock signals, simplifying integration. 

Recent boards include a VSYNC signal for improved frame synchronization.

## Wiring the FLIR® Lepton3 to NVIDIA® Jetson

The following diagram shows the connections between the FLIR® Lepton3 breakout board and NVIDIA® Jetson:

{% include figure popup=true image_path="/assets/images/tutorials/flir_jetson/connections.png" alt="Wiring Diagram" caption="Wiring Diagram between FLIR® Lepton3 breakout board and NVIDIA® Jetson" %}

### Connection Table

The following table shows connections for the NVIDIA® Jetson Nano development kit. Other Jetson models with a 40-pin GPIO header (e.g., Jetson Orin Nano, Jetson AGX Orin) use similar connections but may have different pin assignments. Consult your specific model's pinout documentation.

| FLIR Lepton3 Pin | Signal | Jetson Pin | Jetson GPIO | Wire Color |
|------------------|--------|------------|-------------|------------|
| 1                | CS     | 24         | SPI1-CS0    | Green      |
| 2                | MOSI   | N.C.       | N.C.        | -          |
| 3                | MISO   | 21         | SPI1-MISO   | Yellow     |
| 4                | CLK    | 23         | SPI1-CLK    | White      |
| 5                | GND    | 6          | GND         | Black      |
| 6                | VIN    | 1          | 3V3         | Red        |
| 7                | SDA    | 27         | I2C1-SDA    | Orange     |
| 8                | SCL    | 28         | I2C1-SCL    | Brown      |

{% include figure popup=true image_path="/assets/images/tutorials/flir_jetson/connections.jpg" alt="Wiring on Carrier Board" caption="Wiring on Carrier Board" %}

I created a carrier board using a protoboard to mount the FLIR® Lepton3 vertically, but you can connect cables directly to the breakout board headers.

**Optional**: Add a 10KΩ resistor between MOSI and GND for improved connection stability.

{% include gallery id="gallery_pcb" %}

## Configure the NVIDIA® Jetson

### Enable SPI

Enable the SPI port on your Jetson™ using the Jetson-IO tool. Visit the [JetsonHacks blog](https://jetsonhacks.com/2020/05/04/spi-on-jetson-using-jetson-io/) and follow the guide to enable `SPI1` on pins `19`, `21`, `23`, `24`, and `26` of the expansion header (`J41`) on the NVIDIA® Jetson™ Nano Developer Kit.

### Change SPI Buffer Size

The default SPI buffer size is 4096 bytes. The Lepton3 requires 20KB to retrieve a full segment of thermal image data.

#### Temporary Method (Lost After Reboot)

Remove the spidev module:

```bash
sudo rmmod spidev
```

Reload it with the new buffer size:

```bash
sudo modprobe spidev bufsiz=20480
```

#### Permanent Method

Create a modprobe configuration file:

```bash
sudo nano /etc/modprobe.d/spidev.conf
```

Add the following line:

```bash
options spidev bufsiz=20480
```

Save the file and reboot.

#### Verify Buffer Size

Check the buffer size:

```bash
cat /sys/module/spidev/parameters/bufsiz
```

Expected output: `20480`

### Verify the I²C Connection

Check that the FLIR® Lepton3 is detected on the I²C bus:

```bash
i2cdetect -y -r 0
```

Where `0` is the I²C bus number (`I2C1` corresponds to bus 0 on Jetson Nano).

The FLIR® Lepton3 module should appear at address `0x2a`:

```bash
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- 2a -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --
```

## 3D Printed Enclosure

I designed a 3D printed enclosure to protect the breakout board. You can download the STL files from [MakerWorld](https://makerworld.com/en/models/44186-flir-lepton3-breakout-case).

{% include gallery id="gallery_case" %}

## Software

I've developed a C++ library to interface with the FLIR® Lepton3 using I²C commands for sensor control and SPI communication for thermal image retrieval.

**GitHub Repository**: [Lepton3_Jetson](https://github.com/Myzhar/Lepton3_Jetson)

The repository includes example code demonstrating how to capture and display thermal images using OpenCV.

## Demo Application: COVID-19 Temperature Screening

During the COVID-19 pandemic, I created a demo application that measures human body temperature and triggers visual alerts when the temperature exceeds 37.5°C (99.5°F).

### Features

* Real-time temperature measurement
* Visual alerts for elevated temperatures
* Fever simulation mode (adds offset to temperatures in human range)
* Fully commented and documented code

{% include gallery id="gallery_demo" %}

The application demonstrates practical use of thermal imaging for health screening. The code is available in the [GitHub repository](https://github.com/Myzhar/Lepton3_Jetson).

{% include video id="SFStaq--3-U" provider="youtube" %}

## Conclusion

If you have questions about the implementation, feel free to [contact me](mailto:info@myzhar.com).