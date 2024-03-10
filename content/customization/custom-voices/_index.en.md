+++
tags = ["customization"]
title = "custom voices"
weight = 2
+++

## Custom voices

### 1\. Download a personality

You can find screenshots and descriptions in each folder. If you only want to download a specific subfolder, [DownGit](https://minhaskamal.github.io/DownGit/) is helpful.

### 2\. Copy files

Copy your chosen `voice.py` to `/usr/local/lib/python3.7/dist-packages/pwnagotchi/` on your pwnagotchi (and overwrite the file which is there already).

I prefer to do this by using FileZilla, and FTPing in. [Tutorial on FTP by WiFiTube](https://www.youtube.com/watch?v=6f7PB3bgaxQ)

[![](https://i3.wp.com/github.com/TheJustinCrow/PwnPersonalities/raw/main/media/CopyFiles.gif)](https://github.com/TheJustinCrow/PwnPersonalities/raw/main/media/CopyFiles.gif)

### 3\. Reboot Pwnagotchi

Click Reboot at the bottom of your WebUI or:

SSH into your pwnagotchi and run the command `sudo reboot now` or `sudo shutdown now -f -r` <Force reboots the system with the -f and -r flags using the shutdown command>

### 4\. Enjoy!

I would advise against looking inside the `voice.py` file, I've tried to add lots of things for each character to say so it never gets boring.

List of Personalities
---------------------

| Name | Description |
| --- | --- |
| [Default](https://github.com/TheJustinCrow/PwnPersonalities/tree/main/Default) | This is the default faceset and voice for your Pwnagotchi. |
| [Harold](https://github.com/TheJustinCrow/PwnPersonalities/tree/main/Harold) | (⌐■\_■) Wise, laid-back, and a hint of sarcasm. Imagine a seasoned friend with a virtual twinkle in his eye. |
| [1337-haxxor](https://github.com/antifreeze31/pwnagotchi-personalities/tree/master/1337-haxxor) | Simply a hacker saying hacker things!|
| [AAAAAAAAA](https://github.com/antifreeze31/pwnagotchi-personalities/tree/master/AAAAAA) | Screams all the time.... AAAAAAAAAAAA! |
| [Gamer](https://github.com/antifreeze31/pwnagotchi-personalities/tree/master/gamer) | Get your Pwny to talk like you when your playing your favourite game! |
| [UwU](https://github.com/antifreeze31/pwnagotchi-personalities/tree/master/uwu) | Everything is beeing said in a UwU-way! |

Contributions
-------------

Contributions are always welcome! Feel free to contribute additional personalities (or suggest changes to current ones) by submitting pull requests.
