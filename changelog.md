## How versions are handled
`version="1.3.16"`
- "16" is for minor changes/additions that are fully backwards-compatible (like adding a new attribute which doesn't affect anything else)
- "3" is for changes/additions which aren't backwards-compatible (like completely replacing a attribute)
- "1" is the major version, only changed for major rewrites to the system (so likely never)

# Changelog
[pre 1.0.1/0](https://github.com/blueYOSHI9000/TimeTrialTracker/wiki/Add-a-new-game/645469daeb0459692bb5cbddd08da8c1de607032)
- Only used "0" as a version, initial release

[1.0.1](https://github.com/blueYOSHI9000/TimeTrialTracker/wiki/Add-a-new-game/a8cacdff83115fe3a64ada5dce9ad58230c0bfb4)
- Added "custom" attribute for credits

[1.0.2](https://github.com/blueYOSHI9000/TimeTrialTracker/wiki/Add-a-new-game/ecc3391b081850328e866b3e3629b7cb661296f3)
- Added `<empty>` and "empty" attributes in case a value is missing

[1.1.0](https://github.com/blueYOSHI9000/TimeTrialTracker/wiki/Add-a-new-game/688ff85bd497ab87cabbb97e3c7f0fb3289408d8)
- Added Presets
- Added "hidden" attributes for columns
- Renamed `<columns>` to `<columnlist>`

[1.2.0](https://github.com/blueYOSHI9000/TimeTrialTracker/wiki/Add-a-new-game/a1d763941f9b6606420156981e85ee104bf340e9)
- Renamed "name" attribute to "content"

[1.3.0](https://github.com/blueYOSHI9000/TimeTrialTracker/wiki/Add-a-new-game/6587811085f35617608661f47c4b3cd3d01f043f)
- Renamed "track" to "trackname" for columns
- Renamed "type" to "pstype" for presets