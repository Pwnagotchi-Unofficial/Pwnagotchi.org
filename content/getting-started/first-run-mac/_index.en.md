+++
tags = ["documentation"]
title = "first run (mac)"
weight = 56
+++


## First run
Congratulations, your SD card should be now ready for boot! Safely remove your SD card from your computer, and insert it into your Raspberry Pi. There are two USB ports on your Pi 0, labeled as "PWR IN" and "DATA", see this image:

![RPi 0 USB ports](https://github.com/pwndevelopers/community-wiki/assets/21370314/8de186f5-e095-47af-8e2c-e39705aac432)

Insert your USB cable into the "DATA" port, and connect it to your PC. The green LED on your Pi should start blinking quickly for a while, that means it is starting up. In the meantime, you can enable Bluetooth and Hotspot on your phone, so you can get up and running. The process of booting up for the first time can take few minutes or up to tens of minutes depending on your SD card, so give it a little while. In the meantime, you can make yourself a coffee, have a snack, or join our community [Discord](https://discord.gg/PgaU3Vp) and get to know the most amazing people!

## SSH into your pi...
### ... on MacOS
Steps in MacOS Are similar to Linux, and this example is based on Intel MacOS Sonoma, however it shouldn't be too much different for any other mac versions. First of all connect your Raspberry Pi to your Mac, I used an usb to type-c adapter, but if you own a microusb-typec cable you can use that! After you plug it in open your system settings ( >System Settings) and go to the "Network" section. You should see a window like this:

<img width="717" alt="macosnetwork" src="https://github.com/Pwnagotchi-Unofficial/Pwnagotchi.org/assets/9049886/0db1d580-9d83-475b-9b58-4c43c61aa774">


After plugging the Raspberry Pi in we should automatically see our ethernet connection:

<img width="717" alt="updatednetwork" src="https://github.com/Pwnagotchi-Unofficial/Pwnagotchi.org/assets/9049886/82831db8-7128-4cb0-be61-7bdbe4e67195">


Now click on the new network(RNDIS/Ethernet Gadget for me) and click on Details. You should see a screen popping up and click TCP/IP and set Configure IPv4 from(DHCP to Manually) configure the else like below.

<img width="714" alt="ipv4config" src="https://github.com/Pwnagotchi-Unofficial/Pwnagotchi.org/assets/9049886/7813c966-4199-4db1-91d8-2888b6a76111">


And go to DNS Section now and enter your desired DNS Server(i.e 9.9.9.9 or 8.8.8.8) by clicking + sign like below:

<img width="717" alt="dnsconfig" src="https://github.com/Pwnagotchi-Unofficial/Pwnagotchi.org/assets/9049886/025d024c-2b9b-4e5f-be1b-8ec413a172f4">


Note: If you cannot connect to the internet from your MacOS After this click on (**...** > Set Service Order...) drag the interface you use for internet to the top. 

After all of these click OK it might ask for your password and then the status should change from 'Self Assigned' IP to 'Connected' you are all done! Open your favorite terminal, and type in `ssh <username>@10.0.0.2`, where `<username>` is `pi` by default. Enter the password the default is `raspberry`.

