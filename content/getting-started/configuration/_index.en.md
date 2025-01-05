+++
tags = ["config"]
title = "basic configuration"
weight = 20
+++

## Setting up pwnagotchi config
If you have followed the guide, your SD card should still be mounted to your PC. There should be two partitions: one called "boot" and one called "rootfs". (On Windows, you will see just the boot partition, which is okay for now.)

![Two different partitions in Thunar file manager](https://github.com/pwndevelopers/community-wiki/assets/21370314/cfa1dcba-45ed-4a87-8a02-50fda15a0e9e)
At this point you have 2 options:

## New user-friendly wizard

While you are connected through SSH you can run the wizard:

    sudo pwnagotchi --wizard

This will start the configuration wizard and ask questions to set up a basic configuration file.

The final file is stored as `/etc/pwnagotchi/config.toml`.

    sudo cat /etc/pwnagotchi/config.toml

This will show the contents of the created file. If you feel up to it, you can now edit it if you want to.

## Manual editing

**A.** In SSH, your custom configuration file can also be edited manually:


    sudo nano /etc/pwnagotchi/config.toml

This will open a file editor, and create the file (config.toml) if it does not exist. Make any adjustments as you see fit.

`CTRL+S` will save the file.

`CTRL+X` will close the file, if any changes have been made and not yet saved it will ask you if you want to save the changes.



**B.** (Before the first boot) Add `config.toml` to the boot partition: Mount the boot partition and open it. In there, create a file named `config.toml`. Open this file in your favorite text editor, then pay close attention to the configuration recommendations described below.



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
A longer default config can be found [here](https://github.com/jayofelony/pwnagotchi/blob/noai/pwnagotchi/defaults.toml).
When you are done with the changes, save and close the file, then Boot your Pwnagotchi!
