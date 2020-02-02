## Introduction
All files are saved as .xml files and as such need to follow the XML Syntax (just look at a file and you'll figure it out).  
First step is to copy this into an empty file:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<timetrial version="1.2.0">

</timetrial>
```
Then start writing inside the `<timetrial>` element. All elements required are explained below. If you don't understand something, look at a [finished file](https://github.com/blueYOSHI9000/TimeTrialTracker/tree/master/xml) or contact [blueYOSHI](https://twitter.com/yoshisrc).  

In this documentation all optional elements or attributes are inside [square brackets] to indicate they are not required.

Changes to the file format is documented [here](https://github.com/blueYOSHI9000/TimeTrialTracker/wiki/XML-Version-changes). But unless new features are used, updating is not required as TTT will always support older versions as well.

### Done
If the file is finished and you want to submit it, create a [Pull Request](https://github.com/blueYOSHI9000/TimeTrialTracker/pulls) and submit the files with it and wait until it's approved.

Another way is to just contact [blueYOSHI](https://twitter.com/yoshisrc) with a link to the file.

## Metadata
`<metadata>` includes information about the game, how the times should be displayed and other related stuff.  
Following elements can be included:

### Title & Logo
```xml
<title short="MK8D">Mario Kart 8 Deluxe</title>
<logo src="logo.png" />
<empty>Not avaible.</empty>
```
- `<title>` includes the full title of the game. Attributes:
	- "short": A shortened version of the title without any special characters or whitespaces. Should also be the name of the XML file and of the folder that contains all images.
- `<logo />` specifies the location of the games logo.
	- "src": The location of the games logo.
- [`<empty>`] specifies what should be displayed when there's no value for a time. Default is "N/A".

### Columns
```xml
<columnlist>
	<column content="track">Level</column>
	<column content="time" type="sapphire">Sapphire</column>
	<column content="time" type="gold">Gold</column>
	<column content="time" type="platin">Platinum</column>
	<column content="time" type="dev" empty="No time avaible">Dev Time</column>
	<column content="name" type="dev" hidden="true">Dev Name</column>
</columnlist>
```
`<columnlist>` specifies the various columns in which times are displayed.

- `<column>` includes the name of one column. Attributes:
	- "content": What type of content should be shown. Can only be one of these strings:
		- "trackname": Column displays the tracks name.
		- "time": Column displays the time of the specified type.
		- "name": Column displays the drivers name of the specified type.
	- "type": The type of time that should be used. Can be a custom name, needs to be the same name as used on the times themselved.
	- ["empty"]: What should be displayed when there's no value for a time. Overwrites the `<empty>` element from earlier. Default is "N/A".
	- ["hidden"]: Hides the column if true. Can be shown with presets.

### Presets [Optional]
```xml
<presetlist>
	<preset name="Relict Difficulty">
		<option name="Easy">
			<toggle content="time" type="easy" force="show" />
			<toggle content="time" type="hard" force="hide" />
		</option>
		<option name="Hard">
			<toggle content="time" type="easy" force="hide" />
			<toggle content="time" type="hard" force="show" />
		</option>
	</preset>
	<preset name="Toggle ghosts" pstype="button" notitle="true" hidden="true">
		<option name="Toggle ghosts">
			<toggle content="time" type="ntropy" />
			<toggle content="time" type="oxide" />
		</option>
	</preset>
</presetlist>
```
`<presetlist>` includes various presets which can be selected. They hide or show various columns, best used when games have different times based on difficulty so only one is shown at a time.

- `<preset>` includes one preset.
	- "name": The name of the preset.
	- ["pstype"]: Preset type, defines what type the preset should be. Can only be one of these strings:
		- "radio": Each option is a seperate radio button, only one can be active at a time. Gets used if pstype isn't avaible.
		- "button": Uses a button instead, the first option gets executed when pressed.
	- ["notitle"]: If present the title is invisible.
	- ["hidden"]: If present the preset is hidden.
- `<option>` stores one option.
	- "name": The name of the option.
	- `<toggle>` specifies which column should be shown/hidden.
		- "content": Which content type should be targeted.
		- "type": Which type should be targeted.
		- ["force"]: If the column should be shown or hidden. If not avaible it toggles the visibility.

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
`<styles>` includes a variety of options to change how the site is displayed.

- `<favicon />` stores the favicon. The normal site favicon gets used if no favicon is specified.
	- "src": The location of the favicon.
- `<background />` specifies what the background should look like. Use either "style", "img" or "color". If multiple are present a random one is used.
	- "style": Custom CSS style (only enter a single value, will be applied to "background").
	- "img": The location of the image that should be used.
	- "color": The plain color that should be used (can be any CSS valid color type like Hex (#FFFFFF) or RGB (rgb(255, 255, 255) )).
	- ["repeat"]: If present it repeats the background instead of fixing it (same as using "background-repeat: repeat;").
- `<frontbg />` specified what the front background (inside the border) should look like. Uses same attributes as `<background />`.
- `<textcolor />` specifies what the text color should be. Needs to be a valid CSS color type like Hex (#FFFFFF) or RGB (rgb(255, 255, 255)).
	- ["game"]: Changes the color for the games name.
	- ["cup"]: Changes the color for the cups name.
	- ["title"]: Changes the color for the title (the one specified in `<column>`).
	- ["track"]: Changes the color for the tracks name & it's times.
	- ["link"]: Changes the color for links.
	- ["linkhover"]: Changes the color for links when hovered.
- `<font />` specifies what fonts should be used. Uses the same attributes as `<textcolor />`, if one is present the font will be used for that.
	- "src": The location of the font file, supports same file formats as all browsers do (.ttf and .woff being the best).
- `<fontsize />` specifies the text size, only really needed when using different fonts. Uses same attributes as `<textcolor />`. Size should be given in px, em or rem.
- `<custom>` stores custom CSS not specific to any element.

### Credits [Technically optional but should be used]
```xml
<credits>
	<times name="CrashRatchet008" url="https://twitter.com/CrashRatchet008" source="https://docs.google.com/spreadsheets/d/1qXiCwTyVdOsB8yBs-T9lZBTsx9iY8R_GurFtYAOjeLE/edit#gid=0" />
	<creator name="blueYOSHI9000" />
	<background official="true" />
</credits>
```
`<credits>` stores various credits about who created the leaderboard, who gathered the times etc.  
All elements can exist multiple times in case multiple people worked on it.  
Use "Anonymous" in case someone doesn't want to be credited.

- `<times />` credits the person that gathered all the times.
	- "name": Name of the person.
	- ["url"]: Link to the persons website/social media.
	- ["source"]: Link to the place they originally stored their times on.
	- ["custom"]: Custom HTML code that replaces the normal one (symbols like < > " & need to be replaced with [symbol codes](https://www.rapidtables.com/web/html/html-codes.html))
- `<creator />` credits the person that created the leaderboard. Uses same attributes as `<times />` with the exception of "source" which should not be used here.
- `<background />` credits the person that created the background, should only be used in case an image is used.
	- ["official"]: If this exists it's official artwork and all other attributes won't be used ("name" is also not needed in this case).
	- "name": Name of the person.
	- ["url"]: Link to the persons website/social media.
	- ["custom"]: Custom HTML code that replaces the normal one (symbols like < > " & need to be replaced with [symbol codes](https://www.rapidtables.com/web/html/html-codes.html))
- `<frontbg />` credits the person that created the front background, should only be used in case an image is used. Uses same attributes as `<background />`.
- `<font />` credits and links to the custom font used. Uses same attributes as `<times />`.
- `<other>` allows to create custom credits that are placed below all others. No attributes.

**=== METADATA ENDS HERE ===**

## Times
```xml
<game name="Mario Kart 8 Deluxe" src="logo.png">
	<cup name="Mushroom Cup">
		<track name="Mario Kart Stadium">
			<ghost type="150" name="Nin★Chris">1:53.191</ghost>
			<ghost type="200" name="Nin★Sophia">1:21.984</ghost>
		</track>
		<track name="Water Park">
			<ghost type="150" name="Nin★Massim">2:02.186</ghost>
			<ghost type="200" name="Nin★Yuya">1:22.799</ghost>
		</track>
		<track name="Sweet Sweet Canyon">
			<ghost type="150" name="Nin★Fausti">2:07.205</ghost>
			<ghost type="200" name="Nin★Alice">1:40.972</ghost>
		</track>
		<track name="Thwomp Ruins">
			<ghost type="150" name="Nin★Sophia">2:12.125</ghost>
			<ghost type="200" name="Nin★Skip">1:31.436</ghost>
		</track>
	</cup>
</game>
```
- `<game>` contains all data for a single game, intended for collections with multiple games.
	- "name": The full name of the game.
	- ["src"]: Location for the games logo, will be displayed next to the games title.
	- ["replace"]: If present, the logo completely replaces the games title.
- `<cup>` contains all data for a single cup or a world.
	- "name": The full name of the cup/world.
- `<track>` contains all data of a single track or level.
	- "name": The full name of the track/level.
- `<ghost>` contains data for a single ghost. The time can be in whatever format. If empty it will display the text specified in `<empty>`.
	- "type": The type of the ghost, used in `<column>`.
	- ["name"]: The name of the driver/player.