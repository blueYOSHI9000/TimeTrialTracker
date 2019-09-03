var permXML;
var ver = {
	major: null, //basically never gets changed anyway (see wiki), no need to use it anywhere
	minor: null  //minor and micro can be combined as micro additions are always backwards compatible on their own (see wiki)
}

/*
* Loads the XML file.
* 
* @param {string} file The file name (no directory & no extension)
*/
function loadXML (file) {
	$.get('xml/' + file + '.xml', function(data) {
		permXML = data; //for debugging

		var stateObj = {};
		history.pushState(stateObj, file + ' - Time Trial Tracker', '?game=' + file);

		var arr = data.querySelector('timetrial').getAttribute('version').split('.');
		ver.major = parseInt(arr[0]);
		ver.minor = parseFloat(arr[1] + '.' + arr[2]);

		document.getElementById('gameSelect').style.display = 'none';
		document.getElementById('backButton').style.display = 'unset';

		document.getElementById('contentsContainer').style.display = 'inline-block';
		$('html,body').scrollTop(0);

		if (ver.minor < 1.2) {
			loadLegacy(data);
		}

		loadTimes(data);
		loadStyles(data);
		loadPresetList(data);
		loadCredits(data);

		if (lHash != '' && lHash != undefined) {
			document.getElementById(lHash).scrollIntoView();
			location.hash = lHash;
		}
	});
}

var lHash;
window.onload = function () {
	if (getUrl('game') != false) {
		loadXML(getUrl('game'));
	}
	if (location.hash != '') {
		lHash = location.hash.substring(1);
	}
}

/*
* Load the times from an XML Tree.
* 
* @param {XML tree} xml XML tree that should be loaded.
*/
function loadTimes (xml) {
	var games = xml.querySelectorAll('game');
	if (ver.minor >= 1) {
		var metaColumns = xml.querySelectorAll('columnlist column');
	} else {
		var metaColumns = xml.querySelectorAll('columns column');
	}
	var titleShort = xml.querySelector('title').getAttribute('short');

	for (let num = 0; num < games.length; num++) { //game loop
		var num1 = num + 1;

		var curGame = xml.querySelectorAll('game:nth-of-type(' + num1 + ')')[0];

		var elem = cElem('h2', 'timetrials');
		elem.id = curGame.getAttribute('name').replace(/ /g,"_");
		if (curGame.getAttribute('src') != null) {
			if (curGame.getAttribute('replace') != null) {
				elem.innerHTML = '<img src="xml/' + titleShort + '/' + curGame.getAttribute('src') + '" class="gameImg" alt="' + curGame.getAttribute('name') + '" title="' + curGame.getAttribute('name') + '">';
			} else {
				elem.innerHTML = '<img src="xml/' + titleShort + '/' + curGame.getAttribute('src') + '" class="gameImg" alt="' + curGame.getAttribute('name') + '" title="' + curGame.getAttribute('name') + '">' + curGame.getAttribute('name');
			}
		} else {
			elem.innerHTML = curGame.getAttribute('name');
		}
		var elem = cElem('li', 'contents');
		elem.innerHTML = '<a href="#' + curGame.getAttribute('name').replace(/ /g,"_") + '">' + curGame.getAttribute('name') + '</a>';

		var curGameOl = cElem('ol', elem);

		var cups = xml.querySelectorAll('game:nth-of-type(' + num1 + ') cup');

		for (let num2 = 0; num2 < cups.length; num2++) { //cup loop
			var elem = cElem('h3', 'timetrials');
			elem.id = cups[num2].getAttribute('name').replace(/ /g,"_");
			elem.innerHTML = cups[num2].getAttribute('name');

			var elem = cElem('li', curGameOl);
			elem.innerHTML = '<a href="#' + cups[num2].getAttribute('name').replace(/ /g,"_") + '">' + cups[num2].getAttribute('name') + '</a>';
			elem.classList.add('contentsMargin');

			var row = cElem('div', 'timetrials');
			row.setAttribute('class', 'flexRow');

			var tracks = cups[num2].children;

			for (let num3 = 0; num3 < metaColumns.length; num3++) { //loop for each column
				var column = cElem('div', row);
				column.setAttribute('class', 'flexColumn');

				var curC = metaColumns[num3];

				column.setAttribute('content', curC.getAttribute('content'));
				if (curC.getAttribute('type') != null) {
					column.setAttribute('type', curC.getAttribute('type'));
				}
				if (curC.getAttribute('hidden') != null) {
					column.style.display = 'none';
				}

				switch (curC.getAttribute('content')) { //get what type the column is and then loop for each ghost
					case 'track':
					case 'trackname':
						var elem = cElem('span', column);
						elem.innerHTML = curC.innerHTML;

						for (let num4 = 0; num4 < tracks.length; num4++) {
							var elem = cElem('span', column);
							if (tracks[num4].getAttribute('name') == '' || tracks[num4].getAttribute('name') === null) {
								var result;
								var typeEmpty = xml.querySelector('column[name="track"]').getAttribute('empty');
								if (typeEmpty != null) {
									result = typeEmpty;
								} else if (xml.querySelector('empty') != null && xml.querySelector('empty').innerHTML != null) {
									result = xml.querySelector('empty').innerHTML;
								} else {
									result = 'N/A';
								}
								elem.innerHTML = result;
							} else {
								elem.innerHTML = tracks[num4].getAttribute('name');
							}
						}
						break;
					case 'time':
						var elem = cElem('span', column);
						elem.innerHTML = curC.innerHTML;

						for (let num4 = 0; num4 < tracks.length; num4++) {
							var elem = cElem('span', column);
							var types = tracks[num4].children;
							var result = undefined;
							for (let num5 = 0; num5 < types.length; num5++) {
								if (types[num5].getAttribute('type') === curC.getAttribute('type')) {
									if (types[num5].innerHTML == '') {
										break;
									} else {
										result = types[num5].innerHTML;
									}
									break;
								}
							}
							if (result === undefined) {
								var typeEmpty = xml.querySelector('column[content="time"][type="' + curC.getAttribute('type') + '"]').getAttribute('empty');
								if (typeEmpty != null) {
									result = typeEmpty;
								} else if (xml.querySelector('empty') != null && xml.querySelector('empty').innerHTML != null) {
									result = xml.querySelector('empty').innerHTML;
								} else {
									result = 'N/A';
								}
							}
							elem.innerHTML = result;
						}
						break;
					case 'name':
						var elem = cElem('span', column);
						elem.innerHTML = curC.innerHTML;

						for (let num4 = 0; num4 < tracks.length; num4++) {
							var elem = cElem('span', column);
							var types = tracks[num4].children;
							var result = undefined;
							for (let num5 = 0; num5 < types.length; num5++) {
								if (types[num5].getAttribute('type') === curC.getAttribute('type')) {
									if (types[num5].getAttribute('name') == '' || types[num5].getAttribute('name') === null) {
										break;
									} else {
										result = types[num5].getAttribute('name');
									}
									break;
								}
							}
							if (result === undefined) {
								var typeEmpty = xml.querySelector('column[content="time"][type="' + curC.getAttribute('type') + '"]').getAttribute('empty');
								if (typeEmpty != null) {
									result = typeEmpty;
								} else if (xml.querySelector('empty') != null && xml.querySelector('empty').innerHTML != null) {
									result = xml.querySelector('empty').innerHTML;
								} else {
									result = 'N/A';
								}
							}
							elem.innerHTML = result;
						}
						break;
				}
			}
		}
		var elem = cElem('div', 'timetrials');
		elem.classList.add('borderBottom');
	}
}

/*
* Load Styles from an XML Tree.
* 
* @param {XML Tree} xml XML tree that should be loaded.
*/
function loadStyles (xml) {
	var titleShort = xml.querySelector('title').getAttribute('short');
	document.title = xml.querySelector('title').innerHTML + ' - Time Trial Tracker';

	if (xml.querySelector('favicon') != null) {
		var link = document.createElement('link'),
		oldLink = document.getElementById('dynamic-favicon');
		link.id = 'dynamic-favicon';
		link.rel = 'shortcut icon';
		link.href = 'xml/' + titleShort + '/' + xml.querySelector('favicon').getAttribute('src');
		if (oldLink) {
			document.head.removeChild(oldLink);
		}
		document.head.appendChild(link);
	}


	var background = xml.querySelector('styles background');
	var frontbg = xml.querySelector('styles frontbg');
	var textcolor = xml.querySelector('styles textcolor');
	var fontList = xml.querySelectorAll('styles font');
	var fontsize = xml.querySelector('styles fontsize');
	var custom = xml.querySelector('styles custom');

	if (background != null) {
		if (background.getAttribute('repeat') === null) {
			document.getElementsByTagName('body')[0].classList.add('imgCover');
		}
		if (background.getAttribute('style') != null) {
			addCSSRule('body', 'background', background.getAttribute('style'));
		} else if (background.getAttribute('img') != null) {
			addCSSRule('body', 'background-image', 'url(xml/' + titleShort + '/' + background.getAttribute('img') + ')');
			if (background.getAttribute('repeat') != null) {
				addCSSRule('body', 'background-repeat', 'repeat');
			}
		} else if (background.getAttribute('color') != null) {
			addCSSRule('body', 'background', background.getAttribute('color'));
		}
	}

	if (frontbg != null) {
		if (frontbg.getAttribute('style') != null) {
			addCSSRule('#mainContainer', 'background', frontbg.getAttribute('style'));
		} else if (frontbg.getAttribute('img') != null) {
			addCSSRule('#mainContainer', 'background', 'url(xml/' + titleShort + '/' + frontbg.getAttribute('img') + ')');
			if (frontbg.getAttribute('repeat') != null) {
				addCSSRule('#mainContainer', 'background-repeat', 'repeat');
			}
		} else if (frontbg.getAttribute('color') != null) {
			addCSSRule('#mainContainer', 'background-color', frontbg.getAttribute('color'));
		}
	}

	if (textcolor != null) {
		if (textcolor.getAttribute('game') != null) {
			addCSSRule('h2', 'color', textcolor.getAttribute('game'));
			addCSSRule('borderBottom', 'border-color', textcolor.getAttribute('game'));
		}
		if (textcolor.getAttribute('cup') != null) {
			addCSSRule('h3', 'color', textcolor.getAttribute('cup'));
		}
		if (textcolor.getAttribute('title') != null) {
			addCSSRule('.flexColumn span:nth-child(1)', 'color', textcolor.getAttribute('title'));
			addCSSRule('.flexColumn span:nth-child(1)', 'border-color', textcolor.getAttribute('title'));
		}
		if (textcolor.getAttribute('track') != null) {
			addCSSRule('#mainContainer', 'color', textcolor.getAttribute('track'));
		}
		if (textcolor.getAttribute('link') != null) {
			addCSSRule('a', 'color', textcolor.getAttribute('link'));
		}
		if (textcolor.getAttribute('linkhover') != null) {
			addCSSRule('a:hover', 'color', textcolor.getAttribute('linkhover'));
		}
	}

	for (let num = 0; num < fontList.length; num++) {
		var font = fontList[num];
		if (font != null && font.getAttribute('src') != null) {
			var newStyle = document.createElement('style');
			newStyle.appendChild(document.createTextNode("\
				@font-face {\
					font-family: 'custom" + num + "';\
					src: url('xml/" + titleShort + "/" + font.getAttribute('src') + "');\
				}\
			"));
			document.head.appendChild(newStyle);
			if (font.getAttribute('all') != null) {
				addCSSRule('#mainContainer', 'font-family', '\'custom' + num + '\'');
			} else {
				if (font.getAttribute('game') != null) {
					addCSSRule('h2', 'font-family', '\'custom' + num + '\'');
				}
				if (font.getAttribute('cup') != null) {
					addCSSRule('h3', 'font-family', '\'custom' + num + '\'');
				}
				if (font.getAttribute('title') != null) {
					addCSSRule('.flexColumn span:nth-child(1)', 'font-family', '\'custom' + num + '\'');
				}
				if (font.getAttribute('track') != null) {
					addCSSRule('.flexColumn span', 'font-family', '\'custom' + num + '\'');
				}
			}
		}
	}

	if (fontsize != null) {
		if (fontsize.getAttribute('game') != null) {
			addCSSRule('h2', 'font-size', fontsize.getAttribute('game'));
		}
		if (fontsize.getAttribute('cup') != null) {
			addCSSRule('h3', 'font-size', fontsize.getAttribute('cup'));
		}
		if (fontsize.getAttribute('title') != null) {
			addCSSRule('.flexColumn span:nth-child(1)', 'font-size', fontsize.getAttribute('title'));
		}
		if (fontsize.getAttribute('track') != null) {
			addCSSRule('.flexColumn', 'font-size', fontsize.getAttribute('track'));
		}
	}

	if (custom != null) {
		var styleSheet = document.createElement("style");
		styleSheet.type = "text/css";
		styleSheet.innerText = custom.innerHTML;
		document.head.appendChild(styleSheet);
	}
}

var presetsVar;
/*
* Loads all presets from an XML Tree.
* 
* @param {XML Tree} xml The XML Tree.
*/
function loadPresetList (xml) {
	var elem = document.getElementById('presets');
	elem.innerHTML = '';

	presetsVar = xml.querySelector('presets');

	if (ver.minor >= 1) {
		var presetList = xml.querySelectorAll('presetlist preset');
	} else {
		var presetList = xml.querySelectorAll('presets preset');
	}

	for (let num = 0; num < presetList.length; num++) {
		cElem('br', elem);
		var elContainer = cElem('span', elem);
		if (presetList[num].getAttribute('hidden') === 'true') {
			elContainer.style.display = 'none';
		}

		var elTitle = cElem('span', elContainer);
		elContainer.classList.add('preset');
		elTitle.classList.add('presetTitle');
		elTitle.innerText = presetList[num].getAttribute('name') + ':';
		if (presetList[num].getAttribute('notitle') != null) {
			elTitle.style.visibility = 'hidden';
			var notitle = true;
		} else {
			var notitle = false;
		}
		if (ver.minor < 1.3) {
			var type = presetList[num].getAttribute('type');
			if (type == null) {
				type = 'radio';
			}
		} else {
			var type = presetList[num].getAttribute('pstype');
			if (type == null) {
				type = 'radio';
			}
		}

		var presetName = presetList[num].getAttribute('name').replace(/[^\w\s]/gi, '').replace(/ /g,"_");

		var optionList = presetList[num].querySelectorAll('preset option');

		for (let num2 = 0; num2 < optionList.length; num2++) {
			cElem('br', elContainer);
			var elem4 = cElem('span', elContainer);

			switch (type) {
				case 'button':
					elem4.innerHTML = '<button class="presetButton" name="' + presetName + '" id="' + presetName + num2 + '" onclick="loadPreset(this.id)">' + optionList[num2].getAttribute('name'); + '</button> <br>';
					break;
				default:
					elem4.innerHTML = '<input type="radio" class="presetInput" name="' + presetName + '" id="' + presetName + num2 + '" onclick="loadPreset(this.id)"> <label for="' + presetName + num2 + '" class="presetLabel">' + optionList[num2].getAttribute('name'); + '</label> <br>';
			}
			if (notitle === false) {
				document.getElementById(presetName + num2).classList.add('presetWTitle');
			}

			if (optionList[num2].getAttribute('default') != '' && optionList[num2].getAttribute('default') != null) {
				document.getElementById(presetName + num2).checked = true;
				loadPreset(presetName + num2);
			}
		}
	}
}

/*
* Load Credits from an XML Tree.
* 
* @param {XML Tree} xml XML tree that should be loaded.
*/
function loadCredits (xml) {
	var elem = cElem('h2', 'timetrials');
	elem.innerHTML = 'Credits';
	elem.id = "timetrialcredits"; //in case a game/cup is called credits

	var elem = cElem('li', 'contents');
	elem.innerHTML = '<a href="#timetrialcredits"> Credits </a>';

	var times = xml.querySelectorAll('credits times')
	var background = xml.querySelectorAll('credits background')
	var frontbg = xml.querySelectorAll('credits frontbg')
	var font = xml.querySelectorAll('credits font')
	var creator = xml.querySelectorAll('credits creator')
	var other = xml.querySelectorAll('credits other')

		
	if (times[0] != null) {
		var elem = cElem('span', 'timetrials');
		var arr = [];
		if (times[0].getAttribute('custom') != null) {
			elem.innerHTML = times[0].getAttribute('custom') + '<br>';
		} else {
			for (let num = 0; num < times.length; num++) {
				if (times[num].getAttribute('source') != null && times[num].getAttribute('url') != null) {
					arr.push('<a href="' + times[num].getAttribute('url') + '" rel="noopener" target="_blank"> ' + times[num].getAttribute('name') + '</a>' + ' (<a href="' + times[num].getAttribute('source') + '" rel="noopener" target="_blank">Source</a>)');

				} else if (times[num].getAttribute('source') != null) {
					arr.push(times[num].getAttribute('name') + ' (<a href="' + times[num].getAttribute('source') + '" rel="noopener" target="_blank">Source</a>)');

				} else if (times[num].getAttribute('url') != null) {
					arr.push('<a href="' + times[num].getAttribute('url') + '" rel="noopener" target="_blank"> ' + times[num].getAttribute('name') + '</a>');

				} else {
					arr.push(times[num].getAttribute('name'));
				}
			}
			elem.innerHTML = 'Times gathered by: ' + arr.join(', ') + ' <br>';
		}
	}

	if (creator[0] != null) {
		var elem = cElem('span', 'timetrials');
		var arr = [];
		if (creator[0].getAttribute('custom') != null) {
			elem.innerHTML = creator[0].getAttribute('custom') + '<br>';
		} else {
			for (let num = 0; num < creator.length; num++) {
				if (creator[num].getAttribute('url') != null) {
					arr.push('<a href="' + creator[num].getAttribute('url') + '" rel="noopener" target="_blank">' + creator[num].getAttribute('name') + '</a>');
				} else {
					arr.push(creator[num].getAttribute('name'));
				}
			}
			elem.innerHTML = 'Leaderboard created by: ' + arr.join(', ') + ' <br>';
		}
	}

	if (background[0] != null) {
		var elem = cElem('span', 'timetrials');
		if (background[0].getAttribute('official') != null) {
			elem.innerHTML = 'Background is official artwork. <br>';
		} else if (background[0].getAttribute('custom') != null) {
			elem.innerHTML = background[0].getAttribute('custom') + '<br>';
		} else {
			var arr = [];
			for (let num = 0; num < background.length; num++) {
				if (background[num].getAttribute('source') != null && background[num].getAttribute('url') != null) {
					arr.push('<a href="' + background[num].getAttribute('url') + '" rel="noopener" target="_blank"> ' + background[num].getAttribute('name') + '</a>' + ' (<a href="' + background[num].getAttribute('source') + '" rel="noopener" target="_blank">Source</a>)');

				} else if (background[num].getAttribute('source') != null) {
					arr.push(background[num].getAttribute('name') + ' (<a href="' + background[num].getAttribute('source') + '" rel="noopener" target="_blank">Source</a>)');

				} else if (background[num].getAttribute('url') != null) {
					arr.push('<a href="' + background[num].getAttribute('url') + '" rel="noopener" target="_blank"> ' + background[num].getAttribute('name') + '</a>');

				} else {
					arr.push(background[num].getAttribute('name'));
				}
			}
			elem.innerHTML = 'Background created by: ' + arr.join(', ') + ' <br>';
		}
	}

	if (frontbg[0] != null) {
		var elem = cElem('span', 'timetrials');
		if (frontbg[0].getAttribute('official') != null) {
			elem.innerHTML = 'Background is official artwork. <br>';
		} else if (frontbg[0].getAttribute('custom') != null) {
			elem.innerHTML = frontbg[0].getAttribute('custom') + '<br>';
		} else {
			var arr = [];
			for (let num = 0; num < frontbg.length; num++) {
				if (frontbg[num].getAttribute('source') != null && frontbg[num].getAttribute('url') != null) {
					arr.push('<a href="' + frontbg[num].getAttribute('url') + '" rel="noopener" target="_blank"> ' + frontbg[num].getAttribute('name') + '</a>' + ' (<a href="' + frontbg[num].getAttribute('source') + '" rel="noopener" target="_blank">Source</a>)');

				} else if (frontbg[num].getAttribute('source') != null) {
					arr.push(frontbg[num].getAttribute('name') + ' (<a href="' + frontbg[num].getAttribute('source') + '" rel="noopener" target="_blank">Source</a>)');

				} else if (frontbg[num].getAttribute('url') != null) {
					arr.push('<a href="' + frontbg[num].getAttribute('url') + '" rel="noopener" target="_blank"> ' + frontbg[num].getAttribute('name') + '</a>');

				} else {
					arr.push(frontbg[num].getAttribute('name'));
				}
			}
			elem.innerHTML = 'Leaderboard-background created by: ' + arr.join(', ') + ' <br>';
		}
	}

	if (font[0] != null) {
		var elem = cElem('span', 'timetrials');
		var arr = [];
		if (font[0].getAttribute('custom') != null) {
			elem.innerHTML = font[0].getAttribute('custom') + '<br>';
		} else {
			for (let num = 0; num < font.length; num++) {
				if (font[num].getAttribute('name') != null && font[num].getAttribute('url') != null) {
					arr.push('<a href="' + font[num].getAttribute('url') + '" rel="noopener" target="_blank"> ' + font[num].getAttribute('name') + '</a>' + ' (<a href="' + font[num].getAttribute('source') + '" rel="noopener" target="_blank">Source</a>)');

				} else if (font[num].getAttribute('name') != null) {
					arr.push(font[num].getAttribute('name') + ' (<a href="' + font[num].getAttribute('source') + '" rel="noopener" target="_blank">Source</a>)');

				} else {
					arr.push('<a href="' + font[num].getAttribute('source') + '" rel="noopener" target="_blank">Source</a>');
				}
			}
			elem.innerHTML = 'Times gathered by: ' + arr.join(', ') + ' <br>';
		}
	}

	if (other[0] != null) {
		for (let num = 0; num < other.length; num++) {
			var elem = cElem('span', 'timetrials');
			elem.innerHTML = other[num] + ' <br>';
		}
	}

	cElem('br', 'timetrials');
	var elem = cElem('span', 'timetrials');
	elem.innerHTML = 'Leaderboard created with <a href="https://blueyoshi9000.github.io/TimeTrialTracker/" rel="noopener" target="_blank">Time Trial Tracker</a>. <br> <br> All products and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.';
}

/*
* Loads legacy XML files and updates them.
* 
* @param {XML Tree} xml XML tree that should be loaded.
*/
function loadLegacy (xml) {
	if (ver.minor >= 1) {
		var columns = xml.querySelectorAll('columnlist column');
		var options = xml.querySelectorAll('preset option');
	} else {
		var columns = xml.querySelectorAll('columns column');
		var options = xml.querySelectorAll('presets option');
	}

	for (let num = 0; num < columns.length; num++) {
		columns[num].setAttribute('content', columns[num].getAttribute('name'));
	}
	for (let num = 0; num < options.length; num++) {
		options[num].setAttribute('content', options[num].getAttribute('name'));
	}
}