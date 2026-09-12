---
makerworld_key: model_187139
makerworld_id: 187139
title: "ABS ASA stress test and calibration"
excerpt: "This is a stress test that I designed to calibrate the settings of my 3D printer for ASA and ABS materials, but it can also be used for other types of filaments."
author: "Walter Lucetti"
index: 3370
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/overlay.jpg
  teaser: /assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/teaser.jpg
  actions:
    - label: "<i class='fas fa-cube'></i> Download on MakerWorld"
      url: "https://makerworld.com/en/models/187139-abs-asa-stress-test-and-calibration"
      target: _blank
    - label: "<i class='fas fa-cube'></i> 3D Model on OnShape"
      url: "https://cad.onshape.com/documents/983ac572c575ad90eec56080/w/ad6133a1d5e53377ef56fd71/e/a11e37f7c28f171bd058486f?renderMode=0&uiState=65cdf8580bc2b577b9022890"
      target: _blank
layout: single
classes: single

gallery_photos:
  - url: /assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/gallery-1.jpg
    image_path: /assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/gallery-1.jpg
    alt: "ABS ASA stress test and calibration"
  - url: /assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/gallery-2.jpg
    image_path: /assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/gallery-2.jpg
    alt: "ABS ASA stress test and calibration"
  - url: /assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/gallery-3.jpg
    image_path: /assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/gallery-3.jpg
    alt: "ABS ASA stress test and calibration"
  - url: /assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/gallery-4.jpg
    image_path: /assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/gallery-4.jpg
    alt: "ABS ASA stress test and calibration"
---
## Overview

*Update 2024/11/27: Added a new profile for **Bambu Lab ABS-GF**. **Amazing filament!***

*Update 2024/02/25: New version v2 with axes labels and new overhangs test on the top faces*

This is a stress test that I designed to calibrate the settings of my 3D printer for ASA and ABS materials, but it can also be used for other types of filaments.

**Bed adhesion**: the size of the base is 80 mm, its height is 3 mm, and the vertices are square. *If the bottom plane tends to rise from the bed, then raise the bed temperatures and/or use glue.*

{% include figure popup=true image_path="/assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/inline-0.jpg" alt="[ASA] Bed adhesion and quality of top surfaces" caption="[ASA] Bed adhesion and quality of top surfaces" %}

{% include figure popup=true image_path="/assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/inline-1.jpg" alt="[ABS] Bed adhesion and quality of top surfaces" caption="[ABS] Bed adhesion and quality of top surfaces" %}

**Flow:** the large planar surfaces of the base and the second level allow you to check the quality of the print and validate the flow and pressure advance settings. *If there is too little or too much material near the edges of the plane, then perform a* [***Flow Dynamic Calibration***](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa){: target="_blank"} *to find the correct K value for the filament, and a* [***Flow Rate Calibration***](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate){: target="_blank"} *to fix the flow rate parameters for the material.*

{% include figure popup=true image_path="/assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/inline-2.jpg" alt="Flow control along the axis" caption="Flow control along the axis" %}

{% include figure popup=true image_path="/assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/inline-3.jpg" alt="Flow control along the Y axis" caption="Flow control along the Y axis" %}

**Wall quality:** the five different wall types/sizes allow you to tune the external wall speed. The bottom of the sphere and the 45% surface slopes (v2) on the top allow you to tune the overhang settings (cooling and speed).

{% include figure popup=true image_path="/assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/inline-4.jpg" alt="[ASA] Overhangs check result" caption="[ASA] Overhangs check result" %}

{% include figure popup=true image_path="/assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/inline-5.jpg" alt="Overhangs and different surfaces" caption="Overhangs and different surfaces" %}

{% include figure popup=true image_path="/assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/inline-6.jpg" alt="[ABS] Overhangs check result" caption="[ABS] Overhangs check result" %}

**Small perimeters:** the two top cylinders allow you to check the quality of small perimeter settings.

{% include figure popup=true image_path="/assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/inline-7.jpg" alt="Small perimeters and hole" caption="Small perimeters and hole" %}

**Precision checks:**

- *Base width:* 80 mm
- *Second base width:* 50 mm
- *Square column width:* 15 mm
- *Sphere diameter:* 30 mm
- *First cylinder diameter:* 10 mm
- *Second cylinder diameter:* 5 mm
- *Hole diameter:* 3 mm
- *Hole wall:* 1 mm

{% include figure popup=true image_path="/assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/inline-8.jpg" alt="Validating the precision" caption="Validating the precision" %}

**Belt tensioning:** if the external walls present wobbles, then you must [fix the belt tension of your printer](https://wiki.bambulab.com/en/x1/maintenance/belt-tension){: target="_blank"}.

{% include figure popup=true image_path="/assets/images/projects/makerworld/abs-asa-stress-test-and-calibration/inline-9.jpg" alt="Wobbles (old v1 image)" caption="Wobbles (old v1 image)" %}

**Robustness and layer adhesion:** try to break the column by hand. If you can't, then the temperature, the infill, and the flow settings are very good.

If you want to remix the model, you can find it on [OnShape](https://cad.onshape.com/documents/983ac572c575ad90eec56080/w/ad6133a1d5e53377ef56fd71/e/a11e37f7c28f171bd058486f?renderMode=0&uiState=65cdf8580bc2b577b9022890){: target="_blank"}.

Happy tuning… and do not hesitate to add comments to improve the model.

{% include gallery id="gallery_photos" caption="ABS ASA stress test and calibration on MakerWorld" %}

One print, updated a couple of times as I learned more, and still the first thing I reach for whenever a new spool or a new printer needs dialing in.

## Print profiles

{% include makerworld-profiles.html %}

## Download

The model is free to download and print, licensed under the Standard Digital File License.

[Download on MakerWorld](https://makerworld.com/en/models/187139-abs-asa-stress-test-and-calibration){: .btn .btn--info target="_blank"}
