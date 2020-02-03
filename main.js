/*
* Redirects to each files own site.
*
* @param {string} file The file to load.
*/
function load (file) {
	location.search = '?game=' + file;
}

/*
* Loads presets.
*
* @param {string} id The ID of the option activated.
*/
function loadPreset (id) {
	var name = id.substring(0, id.length - 1);
	var num = id[id.length - 1];

	if (ver.minor >= 1) {
		var presetList = xml.querySelectorAll('presetlist preset');
	} else {
		var presetList = xml.querySelectorAll('presets preset');
	}

	for (let num2 = 0; num2 < presetList.length; num2++) {
		if (presetList[num2].getAttribute('name').replace(/[^\w\s]/gi, '').replace(/ /g,"_") === name) {
			var toggleList = presetList[num2].querySelectorAll('preset option')[num].querySelectorAll('option toggle');

			for (let num3 = 0; num3 < toggleList.length; num3++) {
				if (toggleList[num3].getAttribute('type') == null) {
					var arr = document.querySelectorAll('.flexColumn[content="' + toggleList[num3].getAttribute('content') + '"]');
				} else {
					var arr = document.querySelectorAll('.flexColumn[content="' + toggleList[num3].getAttribute('content') + '"][type="' + toggleList[num3].getAttribute('type') + '"]');
				}
				var force = toggleList[num3].getAttribute('force');
				for (let num4 = 0; num4 < arr.length; num4++) {
					switch (force) {
						case 'show':
							arr[num4].style.display = '';
							break;
						case 'hide':
							arr[num4].style.display = 'none';
							break;
						default:
							if (arr[num4].style.display != 'none') {
								arr[num4].style.display = 'none';
							} else {
								arr[num4].style.display = '';
							}
					}
				}
			}
			return;
		}
	}
}

/*
* Toggles table of contents visibility.
*/
function toggleContents () {
	var elem = document.getElementById('contentsWrapper');
	if (document.getElementById('contentsShow').innerText === 'Hide') {
		elem.style.height = 0;
		document.getElementById('contentsShow').innerText = 'Show';
		document.getElementById('contentsTitle').style.borderColor = 'transparent';
	} else {
		var wrapper = document.getElementById('contents');
		elem.style.height = wrapper.clientHeight + "px";
		document.getElementById('contentsShow').innerText = 'Hide';
		document.getElementById('contentsTitle').style.borderColor = '#a9a9a963';
	}
}

/*
* Opens Settings.
*/
function openSettings () {
	document.getElementById('settingsWrapper').style.visibility = 'visible';
	document.getElementById('settingsWrapper').style.opacity = 1;
}

/*
* Closes Settings.
*/
function closeSettings () {
	document.getElementById('settingsWrapper').style.opacity = 0;
	document.getElementById('settingsWrapper').style.visibility = 'hidden';
}

/*
* Activates or deactivates the custom theme.
*/
function changeDefaultTheme () {
	if (document.getElementById('defaultTheme').checked === true) {
		location.search = location.search + '&defTheme=1&showSettings=1';
		localStorage.setItem('defTheme', 1);
	} else {
		loadStyles();
		localStorage.setItem('defTheme', 0);
	}
}

var sheet = window.document.styleSheets[0];
/*
* Adds a single CSS rule.
*
* @param {string} selector The selector
* @param {string} property The property
* @param {string} value The value
*/
function addCSSRule (selector, property, value) {
	sheet.insertRule(selector + ' { ' + property + ': ' + value + ' !important; } ', sheet.cssRules.length);
}

/*
* Creates an element and returns it.
*
* @param {string} type The element type it should be.
* @param {string/DOM Element} parent The parent element, if an id is given it gets the DOM Element of it
*/
function cElem (type, parent) {
	if (typeof parent === 'string') {
		parent = document.getElementById(parent);
	}
	var elem = document.createElement(type);
	parent.appendChild(elem);
	return elem;
}

/*
* Gets variable from URL and returns it, returns false if it doesn't exist.
*
* @param {string} variable The variable it should get.
*/
function getUrl(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
 	return(false);
}

/*
* Closes the settings if the user doesn't click on the settings while they are opened.
*
* @param {string} event What event got fired.
*/
function windowOnClick (event) {
	var settings = document.querySelector("#settingsWrapper");
	if (event.target === settings) {
		closeSettings();
	}
}
window.addEventListener("click", windowOnClick);