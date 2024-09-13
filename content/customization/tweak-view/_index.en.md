+++
tags = ["customization"]
title = "tweak view"
weight = 4
+++


## Tweak View

Another great way to customize your Pwnagotchi quickly is TweakView by NurseJackass, it's really easy to set up. Here is how:

### Quick Intstall Steps

\- Set up your pi and Pwnagotchi with webUI. The Tweak View interface is accessed through webUI, so make sure that works first.

\- [Download the file](https://raw.githubusercontent.com/Sniffleupagus/pwnagotchi_plugins/main/tweak_view.py) 

```wget -P /usr/local/share/pwnagotchi/custom-plugins/ https://raw.githubusercontent.com/Sniffleupagus/pwnagotchi_plugins/main/tweak_view.py```

into the custom plugins folder on Pwnagotchi. Enable the plugin through the webUI, then reload the plugins page. "Tweak View" is now a link to the editor interface. The interface is not pretty, but it works. It was a development tool to learn Python and how to integrate with Pwnagotchi. Mostly it provides a quicker and easier update cycle for fine-tuning UI layout (as opposed to editing all of the plugin and view files and restarting Pwnagotchi).

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

