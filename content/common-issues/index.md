+++
pre = "<i class='fas fa-book-medical'></i> "
archetype = "default"
title = "Common Issues"
weight = 6
+++


## Bluetooth tethering not working

If your bluetooth isnt working (or your Pwnagotchi wont connect to your hotspot), here is a quick guide which will hopefully help you out by N3tt.

### Instructions:

If your bluetooth is not working, you can try these steps:

1. SSH into your pwnagotchi
2. run `sudo bluetoothctl`
3. run `scan on`. Find your phone either by it's name, or MAC address. You will need only MAC address, so the best you can do is to find it in your phone.
4. run `pair <mac>`, where `<mac>` is your phone's BT MAC address.
5. run `trust <mac>`, where again, `<mac>` is your phone's BT MAC address.
6. In a few moments, you should be prompted (on your phone) to allow communication with pwnagotchi.
7. If the problem still persists, try untrusting and unpairing pwnagotchi from your phone, rebooting both devices and repeating process. 

Sometimes, you need to repeat this process multiple times for it to work (I needed 3 attempts before it started working).



## Cannot SSH into the Pwnagotchi

### Instructions:

(done by N3tt) [rewritten slightly]

1. Check if you connected your RPi to correct USB port. RPi0(W) have 2 USB ports - one for power only (labelled PWR) and one for data (labelled USB). You want to be plugged in USB marked one (closer to HDMI)
2. Try different cable. Some cheap cables are power only.
3. Try different USB port on your PC/Laptop
4. Is your Pwnagotchi detected as RNDIS gadget? If not, download the RNDIS driver [here](https://discord.com/channels/717817147853766687/717818155061346427/1196805896290971658).
5. Have you assigned static IP to your RPi? You can do that in your Network Manager by right clicking your RPi (detected as RNDIS gadget) -> Properties -> Internet Protocol Version 4 (TCP/IPv4) -> Properties -> Use the following IP address. You can choose whatever IP you want (preferably `10.0.0.1`, but that depends on your LAN),subnet mask should be `255.255.255.0`, gateway `10.0.0.1` and if you need to specify DNS, go with `8.8.8.8`, `8.8.4.4` (both Google) or `1.1.1.1` (Cloudflare). By now, you should be able to ping `10.0.0.2` (yes, .2, not .1) and if you have response, you are able to ssh.

NOTE:
If you want to SSH using pwnagotchi.local instead of IP address, you need to have Bonjour Print Services installed. You can download installed from [here](https://support.apple.com/kb/DL999?viewlocale=en_US&locale=en_US).

## Pwnagotchi not showing up as RDNIS gadget

If you noticed that your Pwnagotchi isnt beeing recognized by Windows follow the following steps N3tt and Aleda wrote:

### Instructions for Windows 10:


1. Check if you connected your RPi to correct USB port. RPi0(W) have 2 USB ports - one for power only (labelled PWR) and one for data (labelled USB). You want to be plugged in USB marked one (closer to HDMI)
2. Try different cable. Some cheap cables are power only.
3. Try different USB port on your PC/Laptop
4. If your RPi is shown on some COM port (COM5 for example), you need to install RNDIS drivers (because Windows doesn't install those automatically for some reason). Follow this [guide](https://www.factoryforward.com/pi-zero-w-headless-setup-windows10-rndis-driver-issue-resolved/).
5. [RNDIS windows 10 driver download link](https://modclouddownloadprod.blob.core.windows.net/shared/mod-rndis-driver-windows.zip)