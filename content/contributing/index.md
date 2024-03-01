+++
pre = "<i class='fas fa-dna'></i> "
archetype = "default"
title = "Contributing"
weight = 8
+++

In this site, we'll explain how to contribute to the **Pwnagotchi community!** Do you want to add a feature? **Code a plugin!** While beginners might fear tinkering with their Pwnagotchi, this is where the ultimate freedom begins.

This contributing page is **not** for this wiki, its for the Pwnagotchi framework in general. However if you made a new plugin or image, which you want to be displayed on this site, feel free to **open a pull request or reach out to one of the developers.**

## Developing your own plugin

If you want to develop your own plugin, you have the following callbacks availaible:

Callback

Description

`on_ai_best_reward`

Called when the AI got the best reward so far.

`on_ai_policy`

Called when the AI finds a new set of parameters.

`on_ai_ready`

Called when the AI finished loading.

`on_ai_training_end`

Called when the AI has done training.

`on_ai_training_start`

Called when the AI starts training for a given number of epochs.

`on_ai_training_step`

Called after the AI completed a training epoch.

`on_ai_worst_reward`

Called when the AI got the worst reward so far.

`on_association`

Called when the agent is sending an association frame.

`on_bored`

Called when the status is set to bored.

`on_channel_hop`

callend when the agent is tuning on a specific channel.

`on_config_changed`

This will be triggered if the config has changed (also right after **on_loaded**).

`on_deauthentication`

Called when the agent is deauthenticating a client station from an AP.

`on_display_setup`

Called when the hardware display setup is done, display is an hardware specific object.

`on_epoch`

Called when an epoch is over (where an epoch is a single loop of the main algorithm).

`on_excited`

Called when the status is set to excited.

`on_free_channel`

Called when a non overlapping wifi channel is found to be free.

`on_handshake`

Called when a new handshake is captured, access_point and client_station are json objects if the agent could match the BSSIDs to the current list, otherwise they are just the strings of the BSSIDs.

`on_internet_available`

This will be triggered every few seconds during the time pwnagotchi has internet.

`on_loaded`

The plugin got loaded and is enabled.

`on_lonely`

Called when the status is set to lonely.

`on_peer_detected`

Called when a new peer is detected.

`on_peer_lost`

Called when a known peer is lost.

`on_ready`

Called when everything is ready and the main loop is about to start.

`on_rebooting`

Called when the agent is rebooting the board.

`on_sad`

Called when the status is set to sad.

`on_sleep`

Called when the agent is sleeping for t seconds.

`on_ui_setup`

Called to setup the ui elements.

`on_ui_update`

Called when the ui is updated.

`on_unfiltered_ap_list`

Called when the agent refreshed an unfiltered access point list this list contains all access points that were detected BEFORE filtering.

`on_unload`

This will be triggered if the plugin gets unloaded (e.g. the user toggled the enable/disable switch). You should remove unneeded **ui-elements** here.

`on_wait`

Called when the agent is waiting for t seconds.

`on_webhook`

You can provide some web-functionality here. Will be triggered if the user opens `/plugins/<pluginname>`.

`on_wifi_update`

Called when the agent refreshed its access points list.

### Exampleplugin

To illustrate how easy it is to add additional functionality via the plugin system, here is the code for the GPS plugin (`gps.py`):

```python
    import logging
    import json
    import os
    import pwnagotchi.plugins as plugins


    class GPS(plugins.Plugin):
        __author__ = 'evilsocket@gmail.com'
        __version__ = '1.0.0'
        __license__ = 'GPL3'
        __description__ = 'Save GPS coordinates whenever an handshake is captured.'

        def __init__(self):
            self.running = False

        def on_loaded(self):
            logging.info("gps plugin loaded for %s" % self.options['device'])

        def on_ready(self, agent):
            if os.path.exists(self.options['device']):
                logging.info("enabling gps bettercap's module for %s" % self.options['device'])
                try:
                    agent.run('gps off')
                except:
                    pass

                agent.run('set gps.device %s' % self.options['device'])
                agent.run('set gps.speed %d' % self.options['speed'])
                agent.run('gps on')
                self.running = True
            else:
                logging.warning("no GPS detected")

        def on_handshake(self, agent, filename, access_point, client_station):
            if self.running:
                info = agent.session()
                gps = info['gps']
                gps_filename = filename.replace('.pcap', '.gps.json')

                logging.info("saving GPS to %s (%s)" % (gps_filename, gps))
                with open(gps_filename, 'w+t') as fp:
                    json.dump(gps, fp)
```

Pwnagotchi’s developement environment is [Raspbian](https://www.raspberrypi.org/downloads/raspbian/) + [nexmon patches](https://re4son-kernel.com/re4son-pi-kernel/) for monitor mode, or any Linux with a monitor mode enabled interface (if you tune `config.toml`).

**Do not try with Kali on the Raspberry Pi 0 W**, it is compiled without hardware floating point support and TensorFlow is simply not available for it, use Raspbian.

## Adding a new Display

Currently Pwnagotchi supports several displays and adding support for new ones is very easy! All you have to do is copying the specific Python libraries of the hardware [into this folder](https://github.com/evilsocket/pwnagotchi/tree/master/pwnagotchi/ui/hw/libs) and then create a new class in its parent folder that implements the methods of the following abstract class:

```python
    class DisplayImpl(object):
    def __init__(self, config, name):
    self.name = name
    self.config = config['ui']['display']
    self._layout = {
    'width': 0,
    'height': 0,
    'face': (0, 0),
    'name': (0, 0),
    'channel': (0, 0),
    'aps': (0, 0),
    'uptime': (0, 0),
    'line1': (0, 0),
    'line2': (0, 0),
    'friend_face': (0, 0),
    'friend_name': (0, 0),
    'shakes': (0, 0),
    'mode': (0, 0),
    # status is special :D
    'status': {
        'pos': (0, 0),
        'font': fonts.Medium,
        'max': 20
    }
    }

    def layout(self):
    raise NotImplementedError

    def initialize(self):
    raise NotImplementedError

    def render(self, canvas):
    raise NotImplementedError

    def clear(self):
    raise NotImplementedError
```

For instance, the [pwnagotchi/ui/hw/oledhat.py](https://github.com/evilsocket/pwnagotchi/blob/master/pwnagotchi/ui/hw/oledhat.py) file which supports [this hat](https://www.waveshare.com/wiki/1.3inch_OLED_HAT) looks like this:

```python
    import logging

    import pwnagotchi.ui.fonts as fonts
    from pwnagotchi.ui.hw.base import DisplayImpl


    class OledHat(DisplayImpl):
    def __init__(self, config):
    super(OledHat, self).__init__(config, 'oledhat')
    self._display = None

    def layout(self):
    fonts.setup(8, 8, 8, 8)
    self._layout['width'] = 128
    self._layout['height'] = 64
    self._layout['face'] = (0, 32)
    self._layout['name'] = (0, 10)
    self._layout['channel'] = (0, 0)
    self._layout['aps'] = (25, 0)
    self._layout['uptime'] = (65, 0)
    self._layout['line1'] = [0, 9, 128, 9]
    self._layout['line2'] = [0, 53, 128, 53]
    self._layout['friend_face'] = (0, 41)
    self._layout['friend_name'] = (40, 43)
    self._layout['shakes'] = (0, 53)
    self._layout['mode'] = (103, 10)
    self._layout['status'] = {
    'pos': (30, 18),
    'font': fonts.Small,
    'max': 18
    }
    return self._layout

    def initialize(self):
    logging.info("initializing oledhat display")
    from pwnagotchi.ui.hw.libs.waveshare.oledhat.epd import EPD
    self._display = EPD()
    self._display.init()
    self._display.Clear()

    def render(self, canvas):
    self._display.display(canvas)

    def clear(self):
    self._display.clear()
```

## Creating an Image

### Linux

If you want to create a custom image for testing, developing or just hacking, you will need a GNU/Linux computer and the binaries for `curl`, `git`, `make`, `unzip`, `go`, `qemu-user-static` and `kpartx`. The Makefile will also temporarily install [packer](https://www.packer.io/) and use `sudo` as needed.

To create a zip file with the image and one with its sha256 checksum, just run:

```bash
    make image
```

To remove the generated files:

```bash
    sudo make clean
```

### Windows

Download [Win32Diskimager](https://win32diskimager.org/)

Launch the program and select an .img file which you dont need anymore (or download one from Github). The select the BOOT drive of your sd-card and hit read. Once that is done the image you chose prior is now an exact copy of your current setup. Flash it on another sd-card or share it!
Adding a Language

## Contributing a new translation

If you want to contribute a new translation of Pwnagotchi’s status messages for the UI, do the following:

- Copy the language template (`voice.pot`); the template should NOT be changed manually.

```bash
      ./scripts/language.sh add <lang> (e.g. "de")
```

- Now the user changes the file `pwnagotchi/locale/<lang>/LC_MESSAGES/voice.po`

  - The important part: be sure to change the `msgstr` part, NOT the `msgid` part!

- Now you’ll need to compile it; this will create the `.mo` files:

```bash
      ./scripts/language.sh compile <lang>
```

### Updating an existing translation

Sometimes we change old or add new status messages in Pwnagotchi’s UI. If that’s happened and something in the `voice.py` the code has changed, users can submit updated translations using the following procedure:

1.  Update the template and merges it with the already translated po-file:

```bash
        ./scripts/language.sh update <lang>
```

1.  Now you need to
    - Look for `fuzzy` marked strings in the file pwnagotchi/locale//LC_MESSAGES/voice.po
    - Add your new/changed translation
    - Remove the `fuzzy` string afterwards
1.  Recompile the `.mo` file

```bash
        ./scripts/language.sh compile <lang>
```

Afterwards you can either compile it to a custom image, or submit it, in a pull request, to one ot multiple github image repos of your choice. After some time the developer/developers responsible for the repo should see your commit and hopefully add your translation.
