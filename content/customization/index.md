+++
pre = "<i class='fas fa-cog'></i> "
archetype = "default"
title = "Customization"
weight = 6
+++

A lot of people want to add a personal touch top their pwnagotchi. Thats why we decided on adding this page to the wiki.

If you want to **change the layout** of different things, or **change the faces** entirely, thats the place to look for guides.

Please ensure you **perform a backup** before installing any visual modifications. Additionally, please note that if changes and updates do not appear (even after a reboot), you may need to **unload and reload the plugin** to ensure proper display.

## Custom Faces Mod

This is a nice way to start modifying your pwnagotchi. This modification **allows you to use images** instead of the standard text faces. The [mod](https://github.com/roodriiigooo/PWNAGOTCHI-CUSTOM-FACES-MOD) has been made by [Rodrigo](https://github.com/roodriiigooo). **Make sure to check out his amazing work.**  
    
### 📑 Get Started

First, with the pwnagotchi connected to a computer in MANU mode, establish an SSH connection.

Login as root:

    pi@pwnagotchi:~ $ sudo su
    root@pwnagotchi:/home/pi#
    root@pwnagotchi:/home/pi# whoami
    root
    
Navigate to the root directory:

    root@pwnagotchi:/home/pi# cd /
    
Let's create two folders, one for backing up the files and another one to receive the custom faces:

    root@pwnagotchi:/# mkdir files-backup
    root@pwnagotchi:/# mkdir custom-faces

Now let's navigate to the folder that contains the files we're going to modify:

    root@pwnagotchi:/# cd /usr/local/lib/python3.7/dist-packages/pwnagotchi/ui
    
Stop the pwnagotchi service:

    root@pwnagotchi:/usr/local/lib/python3.7/dist-packages/pwnagotchi/ui# systemctl stop pwnagotchi
    
Here are the following files:

    root@pwnagotchi:/usr/local/lib/python3.7/dist-packages/pwnagotchi/ui# ls
    components.py  faces.py  hw           __pycache__  view.py
    display.py     fonts.py  __init__.py  state.py     web

Now run the following command to make a backup of the first file:

    root@pwnagotchi:/usr/local/lib/python3.7/dist-packages/pwnagotchi/ui# cp faces.py /files-backup/
    
Open the file using nano:

    root@pwnagotchi:/usr/local/lib/python3.7/dist-packages/pwnagotchi/ui# nano faces.py
    
Add these attributes to the code, resulting in the following:

    UPLOAD1 = '(1__1)'
    UPLOAD2 = '(0__1)'
    PNG = False
    POSITION_X = 0
    POSITION_Y = 40
    
    def load_from_config(config):
        for face_name, face_value in config.items():
            globals()[face_name.upper()] = face_value
    
CTRL + O to save, CTRL + X to close file.

Now let's move on to the next file. Backup first, then edit:

    root@pwnagotchi:/usr/local/lib/python3.7/dist-packages/pwnagotchi/ui# cp components.py /files-backup/
    root@pwnagotchi:/usr/local/lib/python3.7/dist-packages/pwnagotchi/ui# nano components.py
    
Locate this code snippet (You can manually delete lines by using BACKSPACE or by using CTRL-K to delete an entire line):

    class Text(Widget):
        def __init__(self, value="", position=(0, 0), font=None, color=0, wrap=False, max_length=0):
            super().__init__(position, color)
            self.value = value
            self.font = font
            self.wrap = wrap
            self.max_length = max_length
            self.wrapper = TextWrapper(width=self.max_length, replace_whitespace=False) if wrap else None
    
        def draw(self, canvas, drawer):
            if self.value is not None:
                if self.wrap:
                    text = '\n'.join(self.wrapper.wrap(self.value))
                else:
                    text = self.value
                drawer.text(self.xy, text, font=self.font, fill=self.color)
    
Now replace with (Using CTRL + SHIFT + V to paste in a terminal / ssh connection):

    class Text(Widget):
        def __init__(self, value="", position=(0, 0), font=None, color=0, wrap=False, max_length=0, png=False):
            super().__init__(position, color)
            self.value = value
            self.font = font
            self.wrap = wrap
            self.max_length = max_length
            self.wrapper = TextWrapper(width=self.max_length, replace_whitespace=False) if wrap else None
            self.png = png
    
        def draw(self, canvas, drawer):
            if self.value is not None:
                if not self.png:
                    if self.wrap:
                        text = '\n'.join(self.wrapper.wrap(self.value))
                    else:
                        text = self.value
                    drawer.text(self.xy, text, font=self.font, fill=self.color)
                else:
                    self.image = Image.open(self.value)
                    self.image = self.image.convert('RGBA')
                    self.pixels = self.image.load()
                    for y in range(self.image.size[1]):
                        for x in range(this image.size[0]):
                            if self.pixels[x,y][3] < 255:    # check alpha
                                self.pixels[x,y] = (255, 255, 255, 255)
                    if self.color == 255:
                        self._image = ImageOps.colorize(self.image.convert('L'), black = "white", white = "black")
                    else:
                        self._image = self.image
                    self.image = self._image.convert('1')
                    canvas.paste(self.image, self.xy)
    
CTRL + O to save, CTRL + X to close file.

Now let's move on to the next file. Once again, backup first and then edit:

    root@pwnagotchi:/usr/local/lib/python3.7/dist-packages/pwnagotchi/ui# cp view.py /files-backup/
    root@pwnagotchi:/usr/local/lib/python3.7/dist-packages/pwnagotchi/ui# nano view.py
    
Replace this one (You can use CTRL + K again or just BACKSPACE):

    ...
    'face': Text(value=faces.SLEEP, position=self._layout['face'], color=BLACK, font=fonts.Huge),
    ...
    
With that (CTRL + SHIFT + V again):

    ...
    'face': Text(value=faces.SLEEP, position=(config['ui']['faces']['position_x'], config['ui']['faces']['position_y']), color=BLACK, font=fonts.Huge, png=config['ui']['faces']['png']),
    ...
    
CTRL + O to save, CTRL + X to close file.

From this point on, the pwnagotchi is ready to display images instead of the default string.

### 📃 Configuration

From here, we will be able to configure the images for our custom Faces. So let's do that!

Prepare the files, there are a total of 25. I use images of size 128x45. To make it easier, name the files according to the facial expression or emotion:

Default .png file names:

    LOOK_R, LOOK_L, LOOK_R_HAPPY, LOOK_L_HAPPY, SLEEP, SLEEP2, AWAKE, BORED, INTENSE, COOL, HAPPY, GRATEFUL, EXCITED, MOTIVATED, DEMOTIVATED, LONELY, SAD, ANGRY, FRIEND, BROKEN, DEBUG, UPLOAD, UPLOAD1, UPLOAD2, ICON, POSITION_X, POSITION_Y
    
Stop the pwnagotchi service, if it's not:

    root@pwnagotchi:/# systemctl stop pwnagotchi
    
### 🎴 Upload Images

Use FileZilla or any other method you know to upload your images to the /custom-faces/ folder that was created earlier. If you don't have it, use one of my packages from here.

Open the pwnagotchi's configuration file:

    root@pwnagotchi:/# nano /etc/pwnagotchi/config.toml

Locate this code snippet:

    ...
    ui.faces.look_r = "( ⚆_⚆)"
    ui.faces.look_l = "(☉_⚆)"
    ui.faces.look_r_happy = "( ◕‿◕)"
    ui.faces.look_l_happy = "(◕‿◕ )"
    ui.faces.sleep = "(⇀‿‿↼)"
    ui.faces.sleep2 = "(≖‿‿≖)"
    ui.faces.awake = "(◕‿‿◕)"
    ui.faces.bored = "(-__-)"
    ui.faces.intense = "(°▃▃°)"
    ui.faces.cool = "(⌐■_■)"
    ui.faces.happy = "(•‿‿•)"
    ui.faces.excited = "(ᵔ◡◡ᵔ)"
    ui.faces.grateful = "(^▿▿^)"
    ui.faces.motivated = "(☼▿▿☼)"
    ui.faces.demotivated = "(≖__≖)"
    ui.faces.lonely = "(ب__ب)"
    ui.faces.sad = "(╥☁╥ )"
    ui.faces.angry = "(-_-')"
    ui.faces.friend = "(♥▿▿♥)"
    ui.faces.broken = "(☓▿▿☓)"
    ui.faces.debug = "(#__#)"
    ui.faces.upload = "(1__0)"
    ui.faces.upload1 = "(1__1)"
    ui.faces.upload2 = "(0__1)"
    ...
    
This snippet will be responsible for enabling our customization. If it doesn't exist, you can add it.

Add the new entries pointing to the folder where the images were placed, set the position where the custom Face will be displayed and set the activation flag to True.

    ...
    ui.faces.look_r = "/custom-faces/LOOK-R.png"
    ui.faces.look_l = "/custom-faces/LOOK-L.png"
    ui.faces.look_r_happy = "/custom-faces/LOOK-R-HAPPY.png"
    ui.faces.look_l_happy = "/custom-faces/LOOK-L-HAPPY.png"
    ui.faces.sleep = "/custom-faces/SLEEP.png"
    ui.faces.sleep2 = "/custom-faces/SLEEP2.png"
    ui.faces.awake = "/custom-faces/AWAKE.png"
    ui.faces.bored = "/custom-faces/BORED.png"
    ui.faces.intense = "/custom-faces/INTENSE.png"
    ui.faces.cool = "/custom-faces/COOL.png"
    ui.faces.happy = "/custom-faces/HAPPY.png"
    ui.faces.excited = "/custom-faces/EXCITED.png"
    ui.faces.grateful = "/custom-faces/GRATEFUL.png"
    ui.faces.motivated = "/custom-faces/MOTIVATED.png"
    ui.faces.demotivated = "/custom-faces/DEMOTIVATED.png"
    ui.faces.smart = "/custom-faces/SMART.png"
    ui.faces.lonely = "/custom-faces/LONELY.png"
    ui.faces.sad = "/custom-faces/SAD.png"
    ui.faces.angry = "/custom-faces/ANGRY.png"
    ui.faces.friend = "/custom-faces/FRIEND.png"
    ui.faces.broken = "/custom-faces/BROKEN.png"
    ui.faces.debug = "/custom-faces/DEBUG.png"
    ui.faces.upload = "/custom-faces/UPLOAD.png"
    ui.faces.upload1 = "/custom-faces/UPLOAD1.png"
    ui.faces.upload2 = "/custom-faces/UPLOAD2.png"
    ui.faces.png = true
    ui.faces.position_x = 0
    ui.faces.position_y = 34
    ...
    
**Note 1:** Check if your installed plugins modify the 'faces'. If there are any, replace them with the equivalent custom image address. If you don't do this, the pwnagotchi may crash. The code looks like this: ui.set('face', "(◕‿‿◕)") or view.set('face', "(◕‿‿◕)")  
  
**Note 2:** I recommend that you always use the same path (/custom-faces/ folder) for your customization. That way, it becomes easier as you only need to replace the files!  
  
CTRL + O to save, CTRL + X to close file. Restart your device.

    
      root@pwnagotchi:/# systemctl restart pwnagotchi
    
**Enjoy!**

## Fancygotchi

[Fancygotchi](https://github.com/V0r-T3x/fancygotchi) is beeing developed by [V0rt3x](https://github.com/V0r-T3x). He setup a [Patreon](https://www.patreon.com/V0rt3x_workshop) for this Project and i hope you check it out.

### Quick installation:

Setting up your pi and the display correctly, activate the web UI too

Download the files (fancygotchi.py and the fancygotchi folder) inside the custom plugins folder (or into the default plugins folder) on your pwnagotchi

Keep Fancygotchi disabled when you restart!

    ui.display.enabled = true
    ui.display.type = "displayhatmini" # set to your display
    ui.display.color = "black"
    ui.display.rotation = 0 #keep it to 0, don't use it
    
    main.plugins.fancygotchi.enabled = false
    main.plugins.fancygotchi.theme = '' # Keep empty to load the default theme.
    main.plugins.fancygotchi.rotation = 0 #<--- use it
    
Restart the pwnagotchi and open the web ui plugin page then wait for the automatic restart.

Afterwards the pwnagotchi should restart with its new face.

### Online update:

1.  Open the plugin page in the web UI
2.  Check the box 'Online Update'
3.  Click on "check fancygotchi update"
4.  This will verify the online update folder to see if there's a new version.
5.  If a newer version is detected, it will ask if you want to update.
6.  A pop-up will show up when the installation is finished (or if it failed).
7.  The pwnagotchi should restart itself afterwards.
8.  You need to restart the service manually one time to finish the update (the UI should be the original black and white one).

If successful, the theme should be come back and the update is supposed to be apply.

### Local update:

1.  Create an update folder inside the fancygotchi folder.
2.  Download the fancygotchi-main-20XX-XX-X.zip.
3.  Unzip this zip inside the .../fancygotchi/update/ folder. (this should create this path .../fancygotchi/update/fancygotchi-main/...)
4.  Open the plugin page in the web UI.
5.  Click on "check fancygotchi update"
6.  This will check the local update folder for a new version.
7.  If the new version is detected, it will ask if you want to install the update.
8.  A pop-up will show up when the installation is finished (or if it failed).
9.  The pwnagotchi should restart itself.
10.  You need to restart the service manually one time to finish the update. (the UI should be the original black and white one).

If successful, the theme should be come back and the update is supposed to be apply.

### Creating a Theme:

You can create your own theme easily with fancygotchi. You just have to copy the right display folders from the theme folder inside the fancygotchi folder.

The file structure is always the same for each theme. ![Fancygotchi Themes Tree](https://raw.githubusercontent.com/V0r-T3x/fancygotchi/main/img/themes_tree_note.png) You can use the following command to display your file structure.

    theme tree
    
You got the img folder for all images used inside the theme. A css file to modify the webui. And a folder with the display name. The cyber theme for example uses the displayhatmini.

Inside the display folder, you will have two files: config-h.toml and config-v.toml.

They stand for the horizontal and vertical configuration files. Inside it you have all the possible options. Each position, color, if it is an icon or not.. etc etc etc

1.  Copy the .default folder.
2.  Rename it with the name of your choice, ex. yourtheme: .../fancygotchi/themes/yourtheme
3.  Inside this folder, you need a folder named with your display type (look it up in the config.toml file at ui.display.type). If the folder doesn't exist, just copy another one and rename it with the display type: .../fancygotchi/themes/yourtheme/displayname/config-h.toml
4.  Edit your /etc/pwngotchi/config.toml file to enable your custom theme: main.plugins.fancygotchi.theme = 'yourtheme'.
5.  You can now modify this config-h.toml file to create your own interface.
6.  After saving the config file, there is no need to restart the pwnagotchi, just go to the fancygotchi web plugin page, and refresh it, this will activate the OTG feature, and the UI should refresh.

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

## Tweak View

Another great way to customize your Pwnagotchi quickly is TweakView by NurseJackass, it's really easy to set up. Here is how:

### Quick Intstall Steps

\- Set up your pi and Pwnagotchi with webUI. The Tweak View interface is accessed through webUI, so make sure that works first.

\- [Download the file](https://github.com/Sniffleupagus/pwnagotchi_plugins/blob/main/tweak_view.py) into the custom plugins folder on Pwnagotchi. Enable the plugin through the webUI, then reload the plugins page. "Tweak View" is now a link to the editor interface. The interface is not pretty, but it works. It was a development tool to learn Python and how to integrate with Pwnagotchi. Mostly it provides a quicker and easier update cycle for fine-tuning UI layout (as opposed to editing all of the plugin and view files and restarting Pwnagotchi).

\- The editor interface presents a list of all of the UI elements on the screen, with all of the editable parameters for each. To change an element, type something into the settings boxes or change the dropdowns. There is very little error checking, and some wrong changes can make the display stop updating. Be cautious when editing. UI Elements have the following editable parameters:
    
        Color: color is there, but does not really work (without further mods to the main Pwnagotchi code) because Pwnagotchi uses 1-bit UI.           If your Pwnagotchi does support color, enter values as 6 hex digits preceded by "#" (first two digits are red, next 2 are green, last 2 are blue, 00-ff == 0-255), or other "Color Names" allowed by Pillow.
        label: for "LabeledValue" elements, you can change the label. The plugin that "owns" the element might overwrite your change, but most do not. You can even make it empty.
        label_font: a drop-down for the (you guessed it) label font. The first 6 are the standard fonts.
        label_spacing: Approximate pixel offset between the label and the value. Larger fonts need more space.
        text_font: the font for the item value
        value: displayed to help find the element in the page, but not editable
        xy: coordinates of the upper left corner of the UI element. 0,0 is the upper left corner of the screen.        Negative values are interpreted as inset from the right or bottom edge, but still the upper-left of the element.        For example, to place "mode" in the bottom right of the screen, set mode.xy = "-40,-12". To move an item offscreen, use a positive value larger than the width of the screen in the first position.
    
\- After making the changes you want, press return or click the "Update View" button at the bottom. The "Tweak View POST" results page shows you the updated actions. The Pwnagotchi image on the page will most likely still show the old placement due to the way Pwnagotchi updates. The first section, labeled "Path," is also a leftover debugging element that really should be deleted in the future. Just ignore it.

\- The "Form" section of the results page shows all of the "mods" that were submitted. It is debugging output, sometimes showing the new value and the old value, or sometimes just the new value. It's pretty verbose. Again, probably skip it.

\- The useful section is "Current Mods," which gives you a list of all active changes to the screen elements. You can check the box next to any of them, then click "Delete Selected Mods" to return those to the default state. (This is very useful if you don't catch the font bug (see below), and accidentally set everything to "Small")

\- To keep making further changes, use the browser back button to get back to the editor.

Note: If the UI stops updating or displaying some things, edit or delete the changes you made.

### The Font Bug

If you go to the tweak view interface and see that all of the fonts are "Small", that is "the font bug". Go back, disable the plugin, count to 10 (or wait for the display UI to go back to "original"), then reload the plugin. This bug should be fixed in the latest version, so if you are experiencing the bug, update the plugin (download a new copy and put it in the custom plugins directory).

If you didn't catch the bug and submit a mod, then all of the display elements will be switched to "Small" font. Don't worry, you can delete the offending changes from the editor results page.

### Tweak Files

Tweak\_view stores your "mods" in /etc/pwnagotchi/tweak\_view.json. It should be JSON "pretty printed," with one mod per line. You can edit this file with any text editor (but be careful; typos can make it not load properly). Disable tweak\_view from the web UI before editing, or it might overwrite your changes. Enable tweakview after editing to activate the changes.

### Multiple Layouts

Tweak\_view does not have a way to switch between multiple layouts, but you can do it by changing the tweak\_view.json file from the command line.

Set up tweak view the way you like, for example, shrink the face and make memtempcpu bigger.
    
    ssh into the device, and copy the current settings to a file
    cd /etc/pwnagotchi
    sudo cp tweak_view.json readable_stats.json
    
Then go back into tweak\_view and change it to something else. Maybe relocate the face off the screen (x, y = 500, 150) to make room for more extended status messages and increase the max width of the status to go full screen. Then go back into the shell and save the settings to another file:
    
    sudo cp tweak_view.json faceless.json
    
When you want to switch to "readable\_stats":

Disable tweak\_view in the web UI,
    
    ssh in and
    sudo cp /etc/pwnagotchi/readable_stats.json /etc/pwnagotchi/tweak_view.json
    
Re-enable tweak\_view in the web UI.

A future version might have a drop-down to select among saved mods (but [Fancygotchi](link-to-fancy) is a much better choice for that).

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
