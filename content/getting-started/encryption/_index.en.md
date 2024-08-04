+++
tags = ["documentation"]
title = "encryption"
weight = 60
+++

**TL;DR:** Click [here](#a-step-by-step-guide) to jump directly to the step-by-step encryption guide.

What if you lose your Pwnagotchi? All your data (API keys, handshakes, etc) will be lost. Also, the person who finds your little friend will be able to read your data.

Although we cannot help you in not losing your device, we can help you prevent the leak of your data by using encryption. We will use [dm-crypt](https://en.wikipedia.org/wiki/Dm-crypt) subsystem of Linux.

### How it works

When Pwnagotchi boots up, it will look for the file `/root/.pwnagotchi-crypted`. Every line in this file represents a LUKS container that will be decrypted and mounted before Pwnagotchi starts.

Each line follows this format:

```
$container_name $container_path $mountpoint
```

Where:

- `$container_name` is the name of the container, typically `crypto<directory_name>`
- `$container_path` is the path to the container file, typically placed in the root (e.g. `/cryptoconfig`)
- `$mountpoint` is the path where the container will be mounted once it is decrypted (e.g. `/etc/pwnagotchi`)

**Cool, but how is the decryption password provided?**

Once booted up, Pwnagotchi will start a new hotspot with the following SSID/password:

- **SSID:** `DECRYPT-ME`
- **Password:** `pwnagotchi`

After connected to this hotspot, you'll be redirected to a web page on your browser.

If you aren't redirected, configure the IP address of your device manually (IP: `192.168.0.3` - subnet mask: `255.255.255.0`) and open [http://192.168.0.10/](http://192.168.0.10/) in your browser. The web page will look like this:

![Decryption web page](https://i.imgur.com/BRGATme.png)

Inside the webpage, you'll see an input box for every LUKS container you have added inside the `/root/.pwnagotchi-crypted` file. For every container, provide the correct password. After typing all the passwords, click `Submit`.

Your Pwnagotchi will decrypt every container with the provided password and complete the boot process, starting the service.

### What files should you encrypt?

The files to be encrypted depend solely on you and your level of paranoia. Generally, you should encrypt all files that may contain sensitive information.

What we suggest you do is to think about which files/folders you wouldn't want a stranger to see in the unfortunate event that you lose your Pwnagotchi. At the same time, though — don't encrypt the entire contents of the disk, otherwise your Pwnagotchi will no longer boot up.

A list of common directories that contain sensitive data and should be encrypted are:

- Config directory: `/etc/pwnagotchi`
- Handshakes directory: `/root/handshakes`
- Wardriver directory: `/root/wardriver` (*note: this is the default path but it depends if you have changed the config path inside your config*)

### Fix decryption server bug in evilsocket image

In evilsocket's original image, there is a bug with the decryption service (see this [issue](https://github.com/evilsocket/pwnagotchi/issues/879)). To fix it, run the following command:

```sh
sudo chmod u+x /usr/bin/decryption-webserver
```

### A step by step guide

So you have read all the docs above, now it's time to encrypt some bits. Isn't it?

The following steps will guide you through the encryption of the **Pwnagotchi's config directory** (i.e. `/etc/pwnagotchi`) using commands run in your Linux terminal.

You can apply the same steps to basically every directory you want to encrypt and keep secure. Just replace `/etc/pwnagotchi` with the path to your directory (**always use absolute path**) and `cryptoconfig` with the name that you want to use for your container (TIP: use `crypto<directory_name>` as the naming scheme).

**IMPORTANT: Most of the operations requires root privileges. So run the commands either with `sudo` or use `sudo su` to become `root`.**

#### 0. Backup your data

Before you start doing anything, it's important that you **backup** your data in case something goes wrong and you have to restore the data.

Backup and archive the directory content inside `/root/`:

```sh
tar -czvf /root/pwnagotchi_config.tar.gz /etc/pwnagotchi/
```

If you want to restore the data, use the following command to extract the contents of the archive in the current path:

```sh
tar -xzvf pwnagotchi_config.tar.gz
```

Then move all the files back in their original place:

```sh
mv ./etc/pwnagotchi/* /etc/pwnagotchi
```

#### 1. Create the container file

Create the container file:

```sh
dd if=/dev/zero of=/cryptoconfig bs=1M count=100
```

This will create a new file (`/cryptoconfig`) where all encrypted files will be stored. The size of the file will be 100MB. Increase `count=100` if you want to encrypt directories that are bigger.

#### 2. Make the container LUKS-ready

Set up LUKS inside the container:

```sh
cryptsetup luksFormat /cryptoconfig
```

Type `YES` when it asks you if you are sure to overwrite data.

After that, you'll be asked for a password. This password will be used to decrypt the container, so set a strong password and remember it (otherwise you'll not be able to decrypt your files).

#### 3. Open the container

Open the newly created container:

```sh
cryptsetup luksOpen /cryptoconfig cryptoconfig
```

You'll be asked for the password. Type the password that you set in step #2.

#### 4. Create ext4 filesystem

To create a `ext4` filesystem inside the container:

```sh
mkfs.ext4 /dev/mapper/cryptoconfig
```

#### 5. Mount the filesystem

Mount the filesystem:

```sh
mount /dev/mapper/cryptoconfig /mnt
```

#### 6. Copy files inside the container

Now we can copy the files that we want to encrypt inside the container:

```sh
cp /etc/pwnagotchi/* /mnt
```

#### 7. Remove old files

Remove the existing unencrypted files from the original location:

```sh
rm /etc/pwnagotchi/*
```

#### 8. Unmount the container

Unmount the container:

```sh
umount /mnt
```

#### 9. Configure Pwnagotchi to decrypt the new container

The last step is to tell Pwnagotchi about the newly created container. To do this, run:

```sh
echo "cryptoconfig /cryptoconfig /etc/pwnagotchi" >> /root/.pwnagotchi-crypted
```

#### 10. Reboot

Done! You have successfully set up encryption on your Pwnagotchi. If you want to create other containers, repeat the same process and change the directory path and container name.

All you have to do now is reboot your Pwnagotchi and connect to the hotspot to provide the decryption password.

```sh
reboot now
```

**Note: Remember to delete the original compressed backup archive once you are sure that everything is working fine.**

**Note 2: If the decryption web server is not working, run [this](#fix-decryption-server-bug-in-evilsocket-image) command.**

