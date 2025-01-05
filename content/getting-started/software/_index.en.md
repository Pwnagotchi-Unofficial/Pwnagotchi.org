+++
archetype = "default"
title = "software"
weight = 2
+++

You will need a computer with basically any OS. I run Linux (Manjaro Xfce), but this should also apply for Windows and Mac aswell. We will be using [Raspberry Imager](https://www.raspberrypi.com/software/) to flash our system. Head to the installation page, you will find installation instructions for every OS imaginable there.

Next, we will need an image. The official one is no longer maintained, it's outdated and contains a bug that prevents the AI mode from starting. Instead, we will be using a community built image from [jayofelony](https://github.com/jayofelony). His images are hosted [here.](https://github.com/jayofelony/pwnagotchi/releases)

Look under assets if your device is a Raspberry Pi Zero W (or if you know it has a armhf processor) you would want to select the file with `32-bit` in the name as it is using a 32-bit processor. If your device is a Raspberry Pi Zero 2 W or a Raspberry Pi 3 to 5 (or if you know it has a arm64 processor) you would want to use the image with `64-bit` in the name as it is using a 64-bit processor.

You are able to download the RNDIS driver [here](https://modclouddownloadprod.blob.core.windows.net/shared/mod-rndis-driver-windows.zip).
