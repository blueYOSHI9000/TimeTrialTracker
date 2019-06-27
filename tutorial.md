## Introduction
All files are saved as .xml files and as such need to follow the XML Syntax (just look at a file and you'll figure it out).  
First step is to copy this into an empty file:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<timetrial version="0">

</timetrial>
```
Then start writing inside the `<timetrial>` element. All elements required are explained below. If you don't understand somethig, look at a finished file or contact [blueYOSHI](https://twitter.com/yoshisrc).  

### Done
If the file is finished and you want to submit it, edit index.html first. Copy this:
```html
<img src="xml/MK8D/logo.png" onclick="loadXML('MK8D')" alt="Mario Kart 8 Deluxe" title="Mario Kart 8 Deluxe">
```  
- Edit the "src" attribute with the full path to the logo
- Replace "MK8D" inside "onlick" to the .xml file's name (without the extension)
- Replace the "alt" and "title" attribute with the full game name
- Then place it inside index.html (there's a text inside the file explaining where, around line 50)

Once done, create a Pull Request and submit the files with it and wait until it's approved.

Another way is to just contact [blueYOSHI](https://twitter.com/yoshisrc) with a link to the file, no need to edit index.html or anything this way.

## Metadata
`<metadata> </metadata` Contains the following elements.

### Title & Logo
```xml
<title short="CrashTrilogy">Crash Bandicoot N. Sane Trilogy</title>
<logo src="logo.png" />
```
- `<title>` specifies the games title in full. - Attribute:
	- short: The short title without spaces or special characters, should also be the name of the folder that contains all images
- `<logo />` contains the filename of the games logo inside it's "src" attribute.

### Columns
```xml
<columns>
	<column name="track">Level</column>
	<column name="time" type="sapphire">Sapphire</column>
	<column name="time" type="gold">Gold</column>
	<column name="time" type="platin">Platinum</column>
	<column name="time" type="dev">Dev Time</column>
	<column name="name" type="dev">Dev Name</column>
</columns>
```
- `<column>` Attributes:
	- name Attribute can contain:
		- "track": Column displays all track names
		- "time": Column displays all times with the specified type
		- "name": Column displays all names with the specified type
	- type Attribute is used to get all runs with the same type

### Styles [Optional]
```xml
<styles>
	<favicon src="wumpafruit.png" />
	<background img="bg.jpg" />
	<frontbg style="linear-gradient(#d46100, #d43e00)" />
	<textcolor game="" cup="" title="#f9e52c" track="" link="#f9e52c" linkhover="#f9aa2c" />
	<font src="../../font.ttf" />
	<fontsize game="" cup="" title="" track="" />
	<custom>
	</custom>
</styles>
```
- `<favicon />` stores the favicon inside it's "src" attribute.  
- `<background />` stores info about the background that should be used. - Attributes (only use one):  
	- style: custom CSS style (only enter a single value, will be applied to 'background')
	- img: Uses the entered file
	- color: Uses the entered color (can be HTML (#FFFFFF = white) or RGB (rgb(255, 255, 255) = white))
- `<frontbg />` stores info about the front background (the one inside the border). Uses same attributes as `<background />`  
- `<textcolor />` stores the color that should be used for text. Attributes should contain either HTML (#FFFFFF = white) or RGB (rgb(255, 255, 255) = white) - Attributes:  
	- game: Changes the color for the games name
	- cup: Changes the color for the cups name
	- title: Changes the color for the titles name (the one specified in `<column>`)
	- track: Changes the color for the tracks name & it's times
	- link: Changes the color for the links
	- linkhover: Changes the color for links when hovered  
- `<font />` stores the filename inside it's "src" attribute. Uses the same attributes as `<textcolor />`, if they contain something the font will be used for that, if empty it gets ignored. There can be multiple fonts.  
- `<fontsize />` stores the font size. Uses the same attributes as `<textcolor />`, size should be given in either px, em or rem.  
- `<custom>` stores custom CSS.

### Credits
```xml
<credits>
	<times name="CrashRatchet008" url="https://twitter.com/CrashRatchet008" source="https://docs.google.com/spreadsheets/d/1qXiCwTyVdOsB8yBs-T9lZBTsx9iY8R_GurFtYAOjeLE/edit#gid=0" />
	<creator name="blueYOSHI9000" />
	<background official="true" />
</credits>
```
All credits store info about who helped to create the leaderboard and to credit images used etc. All elements can exist multiple times to credit more people.  
"name" attributes are currently required, use "Anonymous" instead if the person doesn't want to be credited.  
- `<times />` credits who gathered all the times. - Attributes:
	- name: Name of the person
	- url: Url of the persons website/account
	- source: Link to the place where they stored all the times previously
- `<creator />` credits who created the leaderboard. Uses same attributes as `<times />`
- `<background />` credits who created the background. Uses same attributes as `<times />` with one additional attribute:
	- official: If this exists it's official artwork, all other attributes won't be used in this case.
- `<frontbg />` credits who created the front background. Uses same attributes as `<background />`
- `<font />` links to the font. Uses same attributes as `<times />`, "source" is required.
- `<other>` allows to create custom credits, will be placed below all others. No Attributes.

**=== METADATA ENDS HERE ===**

## Game
```xml
<game name="Crash Bandicoot 2: Cortex Strikes Back" src="crash2.png"> 
	<cup name="Jungle">
		<track name="Turtle Woods">
			<ghost type="sapphire">1:15.00</ghost>
			<ghost type="gold">0:56.87</ghost>
			<ghost type="platin">0:45.47</ghost>
			<ghost type="dev" name="Stephen I.">0:42:35</ghost>
		</track>
		<track name="Snow Go">
			<ghost type="sapphire">1:10.00</ghost>
			<ghost type="gold">0:49.64</ghost>
			<ghost type="platin">0:42.88</ghost>
			<ghost type="dev" name="Hunter G.">0:41.88</ghost>
		</track>
	</cup>
</game>
```
- `<game>` contains all data for a single game. - Attributes:
	- name: The full name of the game
	- src [optional]: Filename of the games logo, will be displayed next to the name
	- replace [optional]: If this exists, the logo will completely replace the text
- `<cup>` contains all data for a single cup. Needs to be inside `<game>`. - Attribute:
	- name: The full name of the cup
- `<track>` contains all data for a single track. Needs to be inside `<cup>`. - Attribute:
	- name: The full name of the track
- `<ghost>` contains data for a single ghost. Time is placed inside it, can be in whatever format. Needs to be inside `<track>`. - Attributes:
	- type: The type of the ghost, will be displayed in the column specified by `<column>`
	- name [optional]: The name of the ghost