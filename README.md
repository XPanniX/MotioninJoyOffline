# MotioninJoy Offline
*Use your PS3 Controller on your PC.*

---

## Disclaimer:   
>This is **not the official MotioninJoy Repository**!  
>This version acts as an replacement for the official version which seems to not be maintained anymore and requires a connection to a now offline website (which makes it unusable).  
>**I am not the creator of this software or the drivers!**  
>This repository is just a place to host them and give usage instructions.

---

## How to use:
1. Download this repository as a zip file or clone it.
1. Connect your PS3 Controller via USB Cable
1. Open `DS3_Tool_Local.exe`
1. Select `Driver Manager` in the top
1. Now there should be one entry listed, select the checkboy on its left
1. Select the appropriate driver and click install.
1. Click the `Load driver` button
    1. If loading gets stuck at `INFO:RETURN: DriverPackageInstallW (0xE0000247)` set your Computers date to 2014 and try again
    1. If changing the date does not work, check the troubleshooting section on how to disable driver signature enformcement
1. To emulate a Xbox Gamepad go back to the Profiles Tab, select `Xbox 360 Emulator` and click the `Enable` button in the bottom left

---

## Troubleshooting

### The driver can not be installed (invalid/outdated signature) -> Disable driver signature enformcement

If the driver can not be installed, you can try to disable Windows driver signature enformcement:
1. Restart your Windows into advanced settings menu: Go into the settings app -> Update and Security -> Recovery -> Advanced startup -> Restart now
1. Your PC should now restart into the advanced startup screen ("Choose an option"-screen with blue background)
1. Select Troubleshoot > Advanced options > Startup Settings > Restart
1. Your PC should now restart again and ask how you want to start Windows
1. Choose the option "Disable Driver Signature Enformcement" (this should be option 7, so press F7. If it shows as option 5, press F5, etc)
1. Windows should now start with the driver signature enformcement disabled
1. You should now be able to sucessfully install the driver

(Thanks [@JANogueira](https://github.com/JANogueira) for this guide)

More extensive guide with pictures (follow option one):  
https://www.tenforums.com/tutorials/156602-how-enable-disable-driver-signature-enforcement-windows-10-a.html
>>>

