+++
tags = ["customization"]
title = "Fancygotchi"
weight = 3
+++

## Fancygotchi

### For further information, go check the [Fancygotchi wiki](https://github.com/V0r-T3x/Fancygotchi/wiki)

<!--
## Fancygotchi

[Fancygotchi](https://github.com/V0r-T3x/pwnagotchi-fancygotchi) is a theme manager developed by [V0rt3x](https://github.com/V0r-T3x). He setup a [Patreon](https://www.patreon.com/V0rt3x_workshop) for his Project and I hope you check it out.

### Compatible with:  
- [Aluminum-ice's image](https://github.com/aluminum-ice/pwnagotchi/releases)
- [Wpa2 1.5.5FIX image](https://github.com/wpa-2/pwnagotchi/releases)
- [NurseJackass image](https://github.com/Sniffleupagus/pwnagotchi-snflpgs/releases)(but the tweak_view and display_setting plugins can't be used)
- [Original image](https://github.com/evilsocket/pwnagotchi/releases)
### Incompatible with:  
- [Jayofelony's image](https://github.com/jayofelony/pwnagotchi-bookworm/releases)

### Quick installation:

Fancygotchi can be installed with [Fancytools](https://github.com/V0r-T3x/Fancytools).

- Set up your pi and the display correctly, also enable the WebUI. 
- Download the code and paste the fancytools.py, fancyserver.py and the fancytools folder inside your custom plugins folder. (default folder path: `/usr/local/share/pwnagotchi/custom-plugins`)  
- Download the [Fancygotchi Theme](https://github.com/V0r-T3x/fancygotchi_themes) you want to use. Create the theme folder inside the custom plugins folder and place your theme folder inside it. (default themes folder path: `/usr/local/share/pwnagotchi/custom-plugins/themes/`)  
- If you are using a custom theme, you need to configure it inside the `/etc/pwnagotchi/config.toml` file:  
```
fancygotchi.theme = 'custom_theme_name'
fancygotchi.rotation = 0 #<--- 0 or 180 for horizontal and 90 or 270 vertical
```  
- Restart the pwnagotchi.  
- Go to the web UI plugin page.
- Click on the enable button and refresh the page.
- The Fancytools web UI page is now available.
- Go to the Fancygotchi tab.
- Click on the install button.
- Accept the confirmation pop-up and wait for the success pop-up.
- Wait for the pwnagotchi restart.
- The new face will appear on the screen.

### To create a theme:  
----  
You can create your own theme easily with Fancygothci. You just have to copy the right resolution folders from the theme folder inside the fancygotchi theme folder.  

The folder three is always the same for each theme. Like the cyber theme folder.   

You have the img folder for all images used inside the theme. A css file to modify the webui. And a folder with the resolution of the display. The cyber use the 320x240.  

![image](https://github.com/V0r-T3x/pwnagotchi-fancygotchi/assets/70115207/e33e0937-f00c-4aac-81f2-642795885d88)  

Here a list of display resoltion types:  

![resolution type](https://github.com/V0r-T3x/pwnagotchi-fancygotchi/assets/70115207/a1197aa9-7a63-4e54-9a0e-68c849dc25f1)  

Inside the resolution folder, you will have two file config-h.toml and config-v.toml.  

They stand for the Horizontal and Vertical configuration files. Inside it you have all the possible options. Each position, color, if it can icon or not.. etc etc etc  

1- Copy the default folder.  
2- Rename it with the name of your choice, ex. yourtheme:  
`.../fancygotchi/themes/yourtheme`  
3- Inside this folder, you need a folder named with your display type (look into the config.toml file at `ui.display.type`). If the folder don't exist, just copy another one and rename it with the display type:   
`.../fancygotchi/themes/yourtheme/resolution/config-h.tom`  
4- Change your /etc/pwngotchi/config.toml file with your custom name:   
```
fancygotchi.theme = 'yourtheme'
fancygotchi.rotation = 0 #<--- 0 or 180 for horizontal and 90 or 270 vertical
```  
5- You can now modify this config-h.toml file to create your own interface.  
6- After saving the config file, no need to restart the pwnagotchi, just goto the fancygotchi web plugin page, and refresh it, this will activate the OTG feature, and the UI should be refresh.  

### Configuration Files:

The configuration file header is composed with all the global options for the theme.

### Global Options:

This starts with \[theme.options\].

    stealth_mode = false:
    
It's not implemented yet, but will give a way to hide the pwnagotchi UI with a foreground image and potentially custom naive components.

    fg_image: Foreground image name.
    bg_color: Background color.
    bg_image: Background image name.
    bg_anim_image: Animated background gif name.
    font_sizes: Font sizes in this order [Bold, BoldSmall, Medium, Huge, BoldBig, Small]
    font = 'DejaVuSansMono' Font name.
    status_font: Status font name (not work properly for now).
    label_spacing: General label space.
    size_offset: Status font offset.
    fps: Refresh rate of the UI.
    cursor: Name cursor.
    friend_bars: Friend bar icons.
    friend_no_bars: Friend bar at 0.
    color_web & color_display: The color mode for the web UI or the Display. They are independent, the web UI (and share to twitter, telegram, discord, etc) can be in full color, but the pwnagotchi can still use an e-ink waveshare into 1-bit color mode. '2' = 1-bit color mode B&W '' = full color mode
    anim_web & anim_display: If no animated background is set, it can be used as a fixed image too. (true = animated) (false = fixed on the first frame)
    main_text_color: If the full color or animated full color is enabled, the main color will have priority on all text colors. This option helps to avoid too much lag on a Raspberry Pi Zero w.
    color_text: Sets the text color for low color option displays. Possible options: 'black' 'white' 'auto' = pale color will be 'white' and dark color will be 'black'
    
### Main Theme Options:

This part is for all the options and native options of the pwnagotchi. This starts with \[theme.main\_elements\].

Each Text components options can have those options:

    position: Position [x, y].
    font: Font type.
    color: The component color.
    colors: The component color table for a color animation [colorname1, colorname2, ...].
    icon: If enabled (true), the component value is treated as an image name to add to the image folder path, which will be used as an image instead of a text.
    f_awesome: If enabled (true) and the icon feature is enabled, the component value is used to select the right font awesome character to use instead of a text.
    f_awesome_size: The font size for Font Awesome.
    
Each label component option can have the following options:

    position: Position [x, y].
    label: The label value.
    label_font: The label font.
    text_font: The text font.
    label_spacing: Custom label spacing for the component.
    label_line_spacing: Custom label vertical position compared to the label text.
    color: The component color.
    colors: The component color table for a color animation [colorname1, colorname2, ...].
    icon: If enabled (true), the component value is treated as an image name to add to the image folder path to use an image instead of a text.
    f_awesome: If enabled (true) and the icon feature is enabled, the component value is used to select the right font awesome character to use instead of a text.
    f_awesome_size: The font size for Font Awesome.
    zoom: A multiplier to adjust the image size. Number < 0 = smaller image (0.5 = half size) Number > 0 = bigger image (2 = double size)
    
### Plugins Options:

The third section is for all other custom plugins configuration. This starts with \[theme.plugin\_elements\].

To customize other plugin appearance:

For the bluetooth components for exapmple, you can simply check inside the plugin file for the "add\_element" variable:

    ui.add_element('bluetooth', LabeledValue(color=BLACK, label='BT', value='-', position=(ui.width() / 2 - 15, 0), label_font=fonts.Bold, text_font=fonts.Medium))
    
If you check the config-h.toml you can see how the bluetooth part is constituted.

All other custom plugins are stocked under \[theme.plugin\_elements\].

    [theme.plugin_elements]
    [theme.plugin_elements.bluetooth]
    position = [276, 170]
    label = 'BT'
    value = '-'
    label_font = 'Bold'
    text_font = 'Medium'
    label_spacing = 9
    label_line_spacing = 0
    color = 'lime'
    colors = ['yellow','orange','red','purple','blue']
    icon = false
    f_awesome = false
    f_awesome_size = 40
    
### Changing the Pwnagotchi Face with Image:

If you want you can change the pwny face too. Enable the icon feature, and place all the images (faces) with the right names in /themes/mytheme/img/. You can change the image type to use (only tested with png). The pure white on images will become transparent. Note that each image needs to have the same size.

    [theme.main_elements.face]
    position = [14, 28]
    font = "Huge"
    color = "lime"
    colors = ['yellow','orange','red','purple','blue']
    icon = true # Enable here
    image_type = "png"
    
Images name in `/themes/mytheme/img/`:

*   look\_r.png
*   look\_l.png
*   look\_r\_happy.png
*   look\_l\_happy.png
*   sleep.png
*   sleep2.png
*   awake.png
*   bored.png
*   intense.png
*   cool.png
*   happy.png
*   excited.png
*   grateful.png
*   motivated.png
*   demotivated.png
*   smart.png
*   lonely.png
*   sad.png
*   angry.png
*   friend.png
*   broken.png
*   debug.png
*   upload.png
*   upload1.png
*   upload2.png

### On-The-Go Refresh:

If something in the configuration changed, there is no need to restart the pwnagotchi. You open the Fancygotchi plugin page on the WEBUI to refresh it. All the UI will be uptated and refreshed.

### Sharing Custom Theme:

If you want to share a custom theme, just share the theme folder with another device, which has Fancygotchi installed already.

-->
