# Deadline Desklet for Linux Mint Cinnamon

A desklet is a javascript program that acts a 'widget' on a Linux Mint Cinnamon Desktop. The range of available desklets via download is relatively lackluster, with multiple desklets named "My First Desklet" appearing near the top of the page. 

Deadline Desklet is a lightweight time-management desklet for Linux Mint Cinnamon. Provides a graphical representation of time elapsed between two dates, acting as a reminder of an upcoming date, as well as how long you have until the date arrives.

Below are a few various examples for deadlines (partial - few segments, partial - many segments, deadline elapsed):

![loading-bar-1](https://github.com/CodeZilla12/DeadlineDeskletCinnamon/assets/69915380/22ee82ff-f1dd-449e-89aa-4d27e94d49a8)

![loading-bar-2.jpg](https://github.com/CodeZilla12/DeadlineDeskletCinnamon/assets/69915380/96412408-343f-469b-9a60-0c5f423e833e)

![loading-bar-3.jpg](https://github.com/CodeZilla12/DeadlineDeskletCinnamon/assets/69915380/03b8e906-089d-4f2f-9c9a-719660b95103)

![config-demo.jpg](https://github.com/CodeZilla12/DeadlineDeskletCinnamon/assets/69915380/102033a3-eaf7-4d11-a5fc-51fd929634fa)

![desktop-demo.jpg](https://github.com/CodeZilla12/DeadlineDeskletCinnamon/assets/69915380/c3081589-941f-46c0-89c6-8267e8668ad2)

The dates as well as the number of segments can be modified via right click -> 'configure...' . Which then updates in real-time. Default settings located in settings-schema.json.

This was a deceptively challenging project, as the existing documentation for desklet development is extremely lackluster.

# Dependencies & Installation

Linux Mint 21.1 Cinnamon <=

Drop the contents into at folder located at _~/.local/share/cinnamon/desklets/DeadlineBar@SG_. Right click on desktop and click "Add Desklet", choosing this desklet from the menu.


# Future Features
-  Sanitising input on the config & adding return to default option.
-  Multiple desklet instances with individual deadlines tracked.
-  Ability to have a tracker span multiple lines.
-  Option to automatically insert current date into config.
-  Different visual representations of time (Pie chart, clocks, images etc) 
