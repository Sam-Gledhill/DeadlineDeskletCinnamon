# Deadline Desklet for Linux Mint Cinnamon

Lightweight time-management desklet for Linux Mint. Provides a graphical representation of time elapsed between two dates, acting as a reminder of an upcoming date, as well as how long you have until the date arrives.

Below are a few various examples for dates. These dates as well as the number of segments can be modified via right click -> 'configure...' . Default settings located in settings-schema.json.

![loading-bar.jpg](https://github.com/CodeZilla12/DeadlineDeskletCinnamon/assets/69915380/96412408-343f-469b-9a60-0c5f423e833e)

This was a deceptively challenging project, as the existing documentation for desklet development is extremely lackluster.

# Dependencies & Installation

Linux Mint 21.1 Cinnamon <=

Drop the contents into at folder located at _~/.local/share/cinnamon/desklets/DeadlineDesklet@SG_. Right click on desktop and click "Add Desklet", choosing this desklet from the dropdown.


# Todo
-  Sanitising input on the config & adding return to default
-  Multiple instances with individual dates tracked
-  Ability to have a tracker span multiple newlines
