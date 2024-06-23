+++
tags = ["config"]
title = "basic configuration"
weight = 20
+++

## Setting up pwnagotchi config
If you have followed the guide, your SD card should still be mounted to your PC. There should be two partitions: one called "boot" and one called "rootfs". (On Windows, you will see just the boot partition, which is okay for now.)

![Two different partitions in Thunar file manager](https://github.com/pwndevelopers/community-wiki/assets/21370314/cfa1dcba-45ed-4a87-8a02-50fda15a0e9e)

## At this point you have 2 options:
**A.** Insert the SD card, boot up the Pwnagotchi and edit your `config.toml` later. 


**B.** Add `config.toml` to the boot partition: Mount the boot partition and open it. In there, create a file named `config.toml`. Open this file in your favorite text editor, then pay close attention to the configuration recommendations described below.



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
#### Explanation of stuff you probably want to change in `config.toml`:

`main.name` → Specifies the name of your Pwny. You can choose whatever name you desire here.

`main.lang` → Specifies the language of your Pwny's UI. A list of available languages is [here](https://pwnagotchi.ai/configuration/#choose-your-unit-s-language).

`main.whitelist` → A list of access points that **WON'T** be pwned. You can enter either an SSID (= the name of the Wi-Fi router) or a MAC address here. (It is a good idea to add your home Wi-Fi network here.)

`main.plugins.grid` → Controls the behavior of the Grid, which is sort of a backend for the Pwny. The server maintains statistics about individual units and also allows you to message others using your Pwny. (Learn more about the Grid [here](https://pwnagotchi.ai/configuration/#set-your-pwngrid-preferences).)

`main.plugins.bt-tether.enabled = true` → This enables the Bluetooth connection, allowing you to see Pwny's UI on your phone.

`main.plugins.bt-tether.devices.XXX` → These parameters are where you configure the Bluetooth connection. Be sure to delete whichever sections you will not use (_i.e.,_ if you have Android phone, delete every line with "ios" in it). Configuring this can get a little tricky, so here's a rundown of what to change:

`main.plugins.bt-tether.devices.ios-phone.ip` → The IP address at which your Pwny will be located at. (For simplicity you can leave this as the default, but you can change it.)

`main.plugins.bt-tether.devices.ios-phone.mac` → You should enter your phone's Bluetooth MAC address here. (Not sure how to determine this? Guides are available for [Android](https://www.esper.io/blog/kiosk-signage-android-mac-address-serial-tracking) and [iOS](https://www.wikihow.com/Check-Your-iPhone%27s-Bluetooth-Address).)

`main.plugins.bt-tether.devices.ios-phone.share_internet = true` → Change this to true if it isn't already. This is needed to share the internet connection of your phone with your Pwny (for uploading statistics, some plugins, time sync, etc).

`main.plugins.memtemp.enabled = true` → Enables a plugin that shows your Pwny system's load and temp. (This is nice to know.) You can change units and orientation, but what's above works best with phones.

`main.plugins.logtail.enabled = true` → Enables a plugin that lets you view Pwny's log in your phone. Nice for debugging if anything goes ass up — you can disable it when you are done with your Pwny.

`ui.web.enabled = true` → Enables the webUI. Keep this enabled, otherwise you won't be able to see your Pwny on your phone. Be sure to change the default credentials for accessing this (see `ui.web.username` and `ui.web.password`).

`ui.web.username = "changeme"` and `ui.web.password = "changeme"` → As the default credentials suggest, it is highly recommended to change your login username and password to something only you know.

`ui.display.enabled = false` → This disables the physical display. This should remain disabled unless you've attached a screen to your Pwny. (If you're using an attached screen on your Pwny, set this to `true`.)

---

When you are done with the changes, save and close the file.
