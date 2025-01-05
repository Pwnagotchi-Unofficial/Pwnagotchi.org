+++
tags = ["customization"]
title = "BT-Tethering"
weight = 8
+++

## BT-Tethering

If you want to use your Pwnagotchi on the go, you can use a Bluetooth tethering connection. This way you can connect to the internet without needing a Wi-Fi connection. To do this enter the following commands while connected over SSH:

    sudo bluetoothctl
    scan on
    # Wait for your phone to show up
    pair <Your phone's MAC address>
    trust <Your phone's MAC address>

Now you can enter the details into the configuration file `config.toml` under the `main.plugins.bt-tether` section. And enable the plugin by setting `enabled = true`. Either reboot the Pwnagotchi or restart the service using `pwnkill`.

    main.plugins.bt-tether.enabled = true
    main.plugins.bt-tether.phone-name = "" # Your phone's name
    main.plugins.bt-tether.phone = "" # android or ios
    main.plugins.bt-tether.mac = "" # your phone's MAC address
    main.plugins.bt-tether.ip = "" # 192.168.44.2-254 for android, 172.20.10.2-254 for ios

### Pre Pwnagotchi v2.9.4:

If your BT doesn't go to the IP you specified in the bt-tether config settings:

`sudo nmcli connection modify` press TAB choose your phones name then continue and enter `ipv4.addresses 192.168.44.44` or the ios IP

It would look like this:

    sudo nmcli connection modify <phone name> ipv4.addresses <ip>
    sudo nmcli connection reload
    sudo nmcli connection up <phone name>