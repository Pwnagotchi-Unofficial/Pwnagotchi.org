+++
archetype = "default"
title = "pwnagotchi org"
weight = 1
+++

<meta name="description" content="Pwnagotchi is a tool that utilizes bettercap and operates on a Raspberry Pi to monitor its surrounding Wi-Fi environment, aiming to capture crackable WPA key material. It collects this data by passively sniffing or performing deauthentication and association attacks. The captured material is stored on disk as PCAP files, which include various handshakes supported by hashcat, such as full and half WPA handshakes and PMKIDs.">

<style>
main{
text-align: center !important;
}

th{
text-align: center !important;
background-color: #300000 !important;
}
</style>

Pwnagotchi is an A2C-based “AI” powered by bettercap and running on a Raspberry Pi Zero W that learns from its surrounding WiFi environment in order to maximize the crackable WPA key material it captures (either through passive sniffing or by performing deauthentication and association attacks). This material is collected on disk as PCAP files containing any form of handshake supported by hashcat, including full and half WPA handshakes as well as PMKIDs.

|                 quick                   |                   links                   |
|-----------------------------------------|-------------------------------------------|
| [Getting Started](/getting-started)     | [3rd Party Images](/3rd-party-images)     |
| [3rd Party Plugins](/3rd-party-plugins) | [3D Printable Cases](/3d-printable-cases) |
| [Common Issues](/common-issues)         | [Customization](/customization)           |
| [Modifications](/modifications)         | [Opwngrid](/opwngrid)                     |
| [Contributing](/contributing)           | [Hall of Fame](/hall-of-fame)             |
