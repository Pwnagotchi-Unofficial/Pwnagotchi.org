+++
tags = ["config"]
title = "basic configuration"
weight = 20
+++

## Setting up pwnagotchi config
If you have followed the guide, your SD card should still be mounted to your PC. There should be two partitions, one called "boot" and one called "rootfs". On Windows, you will see just the boot partition, which is okay for now.

![Two different partitions in Thunar file manager](https://github.com/pwndevelopers/community-wiki/assets/21370314/cfa1dcba-45ed-4a87-8a02-50fda15a0e9e)

## At this point you have 2 options.
Insert the SD card and boot up the pwnagotchi and edit your config.toml later or, the other option, add one to the boot partition


Mount the boot partition, and open it. In there, you will create a file named `config.toml`. Open this file in your favourite text editor, and pay close attention to next steps.



```toml
main.name = "pwnagotchi"
main.lang = "en"
main.whitelist = [
  "EXAMPLE_NETWORK",
  "ANOTHER_EXAMPLE_NETWORK",
  "fo:od:ba:be:fo:od",
  "fo:od:ba"
]

ui.display.enabled = true
ui.display.type = "waveshare_3" #Change this to match your screen
ui.display.color = "black"
ui.fps = 1
```
#### Explanation of stuff you probably want to change

`main.name` specifies the name of your pwny. You can enter whatever you like in there.

`main.lang` specifies the language of your pwny. For language reference, see [here](https://pwnagotchi.ai/configuration/#choose-your-unit-s-language).

`main.whitelist` is a list of access points that **WON'T** be pwned, so for example your home WiFi. You can enter it's SSID (The Name of the Wi-Fi router) or it's MAC address there.

`main.plugins.grid` controls the bevaiour of the Grid, which is sort of a backend for the pwny, that has statistics, you can message others using it, etc. Read more about Grid [here](https://pwnagotchi.ai/configuration/#set-your-pwngrid-preferences).

`main.plugins.bt-tether.enabled = true` is necessary to get Bluetooth conenction enabled.

`main.plugins.bt-tether.devices.XXX` here you configure your Bluetooth. You want to delete whichever section you do not use (i.e. if you have Android phone, delete every line with "ios" in it).

Configuring this can get a little tricky, so here's a rundown of what to change.

`main.plugins.bt-tether.devices.ios-phone.ip` is the IP address at which your pwny will be located at. For simplicity, leave this to default, but you can change it.

`main.plugins.bt-tether.devices.ios-phone.mac` in this field, you will enter your phone's BT MAC address. Guides on how to find those are here for [Android](https://www.esper.io/blog/kiosk-signage-android-mac-address-serial-tracking) and for [iOS](https://www.wikihow.com/Check-Your-iPhone%27s-Bluetooth-Address).

`main.plugins.bt-tether.devices.ios-phone.share_internet = true` change this to true if it isn't, this is needed to share the internet connection of your phone with your pwny (for uploading stats, some plugins, time sync etc.)

`main.plugins.memtemp.enabled = true` enables plugin, that shows you your system's load and temp. Those are nice to know. You can change units and orientation, but what's above works best with phones.

`main.plugins.logtail.enabled = true` enabled plugin that lets you view pwny's log in your phone. Nice for debugging if anything goes ass up, you can disable it when you are done with your pwny.

`ui.web.enabled = true` enables the webUI, keep this enabled, otherwise you won't be able to see your pwny in your phone. However you will have to change some things, see below.

`ui.web.username = "changeme"` and `ui.web.password = "changeme"` as the text says, it is highly recommended to change your login username and password, again, from security standpoint.

`ui.display.enabled = false` this disables the physical display, since we don't have a display attached to our pwnagotchi, we can disable it.

---

When you are done with the changes, save and close the file.
