---
layout: post
title:  "sign apps with electron-builder"
date:   2021-02-10 18:26:00 +0000
categories: electron-builder codesign development
---

Woah, as been such a long since I wrote anything here. I'll do my best to keep this updated with meaningful content on a timely fashion :)

Moving to more important topics... ELECTRON!

As part of my current role, I am in charge of development of a certain electron-based application. While publishing an electron-based application is quite simple ( thanks to electron-builder! ) it also means differences on how application packages are generated and published for each platform - win, mac and linux. There is no surprise there.

## Certificates...
One of the main challenges that I keep having is how to correctly configure the build instance machine so that the electron-builder can do it's job of generating the package, signing it and uploading it to whatever backend you use to store the deliverables.

First of all - you'll need a code signing certificate. You can get one from DigiCert. There are caveats: To prevent Gatekeeper from complaining, you'll need to sign with an Apple Certificate. With a single certificate I am able to sign my applications, both for Windows and Mac and more importantly - enable auto-updates. 

***Very important: auto-updates don't work if your code isn't signed. So make sure to get yourself a certificate, otherwise you'll have problems afterwards.***

### Install the certificates on your machine
Let's assume that this is your first time configuring your CI/CD server to deploy the app. On Mac you'll need to install the certificates on your machine keystore. Tipically you'll need to install both - the code signing certificate and the CA certificate, otherwise, the code-signing one will me marked as not trusted ( check if there is a red mark on top of the certificate when loading the keystore access ). After that step, you'll need top generate a *.p12 file based on the code-signing certificate and configure electron-builder to use that, otherwise the ```codesign``` command will fail.

#### Generate the *.p12 file

To generate the *.p12 file you can simply open Keystore Access app on mac. Click 'login'> "My Certificates" and select the certificates you want to export to your new *.p12 file. You want to export the CA root certificate along with the private key contained on your code-signing certificate. Select both and click 'File' > 'Export...'. Type the name of the certificate and on the drop-down, select the type that contains p12. Click 'OK'. Enter a password for the *.p12 file and hit OK. This will produce a *.p12 file on the choosen destination.

#### Configure electron-builder

```electron-builder``` needs to be configured properly in order to use the certificate you generated before.
To do so, please edit the environment variable script ( if you use ```bash``` tipically is ~/.bashrc ). Append the following to the file:

```
export CSC_LINK=~/Documents/User/Certificates/<Certificate file>
export CSC_KEY_PASSWORD=<Password>
```

**Certificate file** refers to the name of the file exported previously through keystore app.

**Password** is the password defined previously on the keystore app.

For windows it's a bit easier. I've found that we don't need to add environment variables for this to work. We just need to add the certificates.





