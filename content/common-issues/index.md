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

Before you start this is very important for Android make sure bluetooth tethering is activated and for apple you need iPhone's personal hotspot ON

1. SSH into your pwnagotchi
2. run `sudo bluetoothctl`
3. run `scan on`. Find your phone either by it's name, or MAC address. You will need only MAC address, so the best you can do is to find it in your phone.
4. run `pair <mac>`, where `<mac>` is your phone's BT MAC address.
5. run `trust <mac>`, where again, `<mac>` is your phone's BT MAC address.
6. In a few moments, you should be prompted (on your phone) to allow communication with pwnagotchi.
7. If the problem still persists, try untrusting and unpairing pwnagotchi from your phone, rebooting both devices and repeating process.

Sometimes, you need to repeat this process multiple times for it to work (I needed 3 attempts before it started working).

These are known working settings to edit on your config file.

```toml
main.plugins.bt-tether.enabled = false

# Configuration for Android Phone
main.plugins.bt-tether.devices.android-phone.enabled = false
main.plugins.bt-tether.devices.android-phone.search_order = 1
main.plugins.bt-tether.devices.android-phone.mac = ""  # Bluetooth MAC address of the Android phone
main.plugins.bt-tether.devices.android-phone.ip = "192.168.44.44"  # Static IP of the Pwnagotchi
main.plugins.bt-tether.devices.android-phone.netmask = 24  # Netmask of the PAN
main.plugins.bt-tether.devices.android-phone.interval = 1  # Search interval in minutes
main.plugins.bt-tether.devices.android-phone.scantime = 10  # Duration of each search in seconds
main.plugins.bt-tether.devices.android-phone.max_tries = 10  # Maximum attempts to find the phone
main.plugins.bt-tether.devices.android-phone.share_internet = false  # Enable internet sharing via Bluetooth
main.plugins.bt-tether.devices.android-phone.priority = 1  # Priority level for tethering
```

```toml
# Configuration for iOS Phone
main.plugins.bt-tether.devices.ios-phone.enabled = false
main.plugins.bt-tether.devices.ios-phone.search_order = 1
main.plugins.bt-tether.devices.ios-phone.mac = ""  # Bluetooth MAC address of the iOS phone
main.plugins.bt-tether.devices.ios-phone.ip = "172.20.10.6"  # Static IP of the Pwnagotchi when tethered to iOS
main.plugins.bt-tether.devices.ios-phone.netmask = 24  # Netmask of the PAN
main.plugins.bt-tether.devices.ios-phone.interval = 1  # Search interval in minutes
main.plugins.bt-tether.devices.ios-phone.scantime = 10  # Duration of each search in seconds
main.plugins.bt-tether.devices.ios-phone.max_tries = 10  # Maximum attempts to find the phone
main.plugins.bt-tether.devices.ios-phone.share_internet = false  # Enable internet sharing via Bluetooth
main.plugins.bt-tether.devices.ios-phone.priority = 1  # Priority level for tethering
```

## Cannot SSH into the Pwnagotchi

### Instructions:

(done by N3tt) [rewritten slightly]

1. Check if you connected your RPi to correct USB port. RPi0(W) have 2 USB ports - one for power only (labelled PWR) and one for data (labelled USB). You want to be plugged in USB marked one (closer to HDMI)
2. Try different cable. Some cheap cables are power only.
3. Try different USB port on your PC/Laptop
4. Is your Pwnagotchi detected as RNDIS gadget? If not, download the RNDIS driver [here](https://modclouddownloadprod.blob.core.windows.net/shared/mod-rndis-driver-windows.zip).
5. Have you assigned static IP to your RPi? You can do that in your Network Manager by right clicking your RPi (detected as RNDIS gadget) -> Properties -> Internet Protocol Version 4 (TCP/IPv4) -> Properties -> Use the following IP address. You can choose whatever IP you want (preferably `10.0.0.1`, but that depends on your LAN),subnet mask should be `255.255.255.0`, gateway `10.0.0.1` and if you need to specify DNS, go with `8.8.8.8`, `8.8.4.4` (both Google) or `1.1.1.1` (Cloudflare). By now, you should be able to ping `10.0.0.2` (yes, .2, not .1) and if you have response, you are able to ssh.

On some images, SSH will refuse connection (connection refused) even if the RPi is reachable via 10.0.0.2.

In that case, plug the Pi into HDMI + keyboard and check if a default pi user exists.
We had to create a pi user manually and assign a password before SSH was possible.

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

## Pwnagotchi's subnet clash with computer's subnet

If your network is using `10.0.0.0/24` as the network address and this is clashing with Pwnagotchi's network address, you can change the IP address and network address of Pwnagotchi USB interface by using a different subnet. In order to do this, login to your pi via SSH and edit the file `/etc/network/interfaces.d/usb0-cfg` with your preferred editor and use the following config:

```
allow-hotplug usb0
iface usb0 inet static
  address 192.168.0.2
  netmask 255.255.255.0
  network 192.168.0.0
  broadcast 192.168.0.255
  gateway 192.168.0.1
  dns-nameservers 1.1.1.1
  metric 20
```

Save the file and reboot your pwnagotchi. After it boots up, you should be able to access it by using the ip address `192.168.0.2` instead of `10.0.0.2`. **Remember to change also the configuration of your computer's interface by using the IP address `192.168.0.1`.**

## Pwnagotchi changes MAC address with every Boot (New network device)

To use the pwnagotchi as a rndis-device, you need to setup a manual network configuration.

Depending on your OS, this configuration is bound to the MAC address of the device (in my example Ubuntu) or the network device which name includes the MAC.
The problem is, that the pwnagotchi, generates a new MAC address with every boot, so with linux and mac, you get the issue, that after every boot, the pwnagotchi will show up as a new network device and you need to reconfigure it everytime.

To mitigate this issue, you need to eject your Micro SD, and edit the file `cmdline.txt` on the boot partition by appending the following line to it to set a _static MAC_ with a texteditor:

```
g_ether.host_addr=f8:e0:79:af:57:eb g_ether.dev_addr=f8:e0:79:af:57:eb 
```
*Make sure, that you don't paste a newline/Enter! The config file needs to be one line*

Found this solution [here](https://betweenmistakes.com/2019/11/09/rndis-ethernet-gadget-rpi0w/) and [here](https://forums.raspberrypi.com/viewtopic.php?p=1555672#p1556036)

Bonus:

You are free to change the MAC `f8:e0:79:af:57:eb` to a custom hexadecimal one as long as it is valid and [not reserved](https://www.iana.org/assignments/ethernet-numbers/ethernet-numbers.xml)
Some fun ones could be: `b1:gb:00:bd:ba:be, 1e:at:de:ad:be:ef` or the good old classic `ca:fe:c0:ff:ee:00` 
