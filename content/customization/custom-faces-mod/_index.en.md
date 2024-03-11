+++
tags = ["customization"]
title = "custom faces mod"
weight = 1
+++

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

Use FileZilla or any other method you know to upload your images to the /custom-faces/ folder that was created earlier. If you don't have it, use one of my packages from [here](https://github.com/roodriiigooo/PWNAGOTCHI-CUSTOM-FACES-MOD/tree/main/custom-themes).

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
