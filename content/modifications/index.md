+++
pre = "<i class='fas fa-toolbox'></i> "
archetype = "default"
title = "modifications"
weight = 6
+++


## External Antenna

If you want to increase the power of your Pwnagotchi just get an external antenna! It´s fairly easy to setup and we are gonna show you how to do just that!

You got two options:
1. use an USB-antenna (recommended)
2. use an IPEX-connected antenna (for more advanced users)

## USB-Antenna 

1. Connect your already flashed  sd-card to your computer and navigate to the `/BOOT/` directory.
2. Locate a file named `config.txt`
3. Open said file and place this at the end of it: `dtoverlay=disable-wifi`
4. (depends on antenna) Some antennas may require monitor mode drivers to work properly. (Check if Linux and Monitor mode are supported before buying an adapter)
5. Plug your antenna into your Pwny (be sure to use the data port if you are using a Raspberry Pi 0w or 02w) and reboot
6. Enjoy your upgraded Pwnagotchi!

## IPEX-Antenna

Caution: If you mess something up or are not careful you could break your Pwnagotchi/Raspberry Pi or hurt yourself!

It can improve the signal by ~6-8 dB. (Please note: If you implement this, you will no longer be able to use the RPi0W’s built-in antenna.)

(Contributed by @Mastblast09.)

### Parts needed:

1. Connector
2. Coax cable 
3. Antenna (any SMA antenna should do the trick)

### Tools needed:
1. Soldering iron OR (if you have access to one, but not necessary) hot air rework station
2. Solder
3. Flux
4. Magnifying device (having a stereo microscope is ideal, because the components are VERY small)
5. Steady hands!

Please be aware that if you modify your Pi, you will invalidate its FCC certification (if that matters to you).

I used the following guide for the great images that they were able to take: briandorey.com/post/raspberry-pi-zero-w-external-antenna-mod

WARNING: If you do not have soldering skills OR don’t have the correct tools for this mod, you will damage your Pi.
This can be done very quickly with a hot air rework station, but not many folks will have a hot air rework station—so I did it with my soldering iron.
You will need some sort of magnification device (whether a jewelers loupe or a stereo microscope) when it comes to the moving of the 0ohm resistor. It is VERY small.

If you soldered everything correctely and plugged your external antenna into the new connector you just put on your Pi, your good to go. Enjoy your Pwnagotchi with a DIY IPEX-antenna.



## Slimagotchi

Another advanced Pwnagotchi mod is called "Slimagotchi". As the name suggests it´s really slim, which is benefitial for carrying it around to save some space or just for aesthetics.

(Contributed by @Mastblast09.)

### Tools needed:
1. a soldering iron
2. flux
3. copper braided wick
4. side cutter


### Parts needed:
1. a RPi0W
2. a Waveshare e-ink screen
3. some kapton tape

### Instructions:
1. Place some flux on the wick.

2. Place some flux on the connector pins.

3. Set your soldering iron to around 300˚C; you want it hot enough to flow solder into the wick.

4. Place the wick above the pins and heat with the soldering iron.

5. When you get to the side pads, you can use a side cutter like this one if you need to cut the pins. (Sometimes these are difficult to remove because of the size and solder amount.)

6. When finished, your pads should look like this: _Image needed_

7. Apply some Kapton tape to the back to prevent any shorting and isolate the board.

8. Now it’s time to make some pins to use in your thruhole RPi0W. You can cut these headers and use the pins like this: _Image needed_

9. Finally, place the pins in the screen and set your RPi0W on top; then solder the pins onto the RPi0W.

10. And you’re finished!
