+++
tags = ["documentation"]
title = "first run (windows)"
weight = 55
+++


## First run
Congratulations, your SD card should be now ready for boot! Safely remove your SD card from your computer, and insert it into your Raspberry Pi. There are two USB ports on your Pi 0, labeled as "PWR IN" and "DATA", see this image:

![RPi 0 USB ports](https://github.com/pwndevelopers/community-wiki/assets/21370314/8de186f5-e095-47af-8e2c-e39705aac432)

Insert your USB cable into the "DATA" port, and connect it to your PC. The green LED on your Pi should start blinking quickly for a while, that means it is starting up. In the meantime, you can enable Bluetooth and Hotspot on your phone, so you can get up and running. The process of booting up for the first time can take few minutes or up to tens of minutes depending on your SD card, so give it a little while. In the meantime, you can make yourself a coffee, have a snack, or join our community [Discord](https://discord.gg/PgaU3Vp) and get to know the most amazing people!

## SSH into your pi
If you are on a Windows PC, after a while, the OS should notify you of a new network device. Open your network settings, and you should see a new Ethernet Connection with the type of "RNDIS". This is your pwny. Right click this, choose "Properties", in the menu, find "Internet Protocol Version 4", and click "Properties" on that again. A new window should pop up with loads of fields to fill. You want to check "manual" settings, and enter the following:
- IP address: `10.0.0.1`
- Subnet Mask: `255.255.255.0`
- Gateway: `10.0.0.1`
- DNS Server: `8.8.8.8` and `1.1.1.1`

Accept and close those two windows. Now you can try to enable the internet sharing by right clicking your main network connection (usually Ethernet 1), select "Properties" and "Sharing". In there, tick the box to allow other network users to connect through this connection. If there is a list below, choose your pwny's connection.

You should now be able to connect to your pwny. I recommend using [PuTTY](https://www.putty.org/) to do that. As host, enter `<username>@10.0.0.2` where `<username>` is whatever username you have specified in the Imager. If you haven't, the default is `pi`. Leave the port default `22`. Click "Connect", a new window should pop up, asking for password. Enter the password you have specified in the Imager, if you haven't, then the default is `raspberry`. 
