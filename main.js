/*
* Loads presets.
* 
* @param {string} id The ID of the option activated.
*/
function loadPreset (id) {
	var name = id.substring(0, id.length - 1);
	var num = id[id.length - 1];

	if (ver.minor >= 1) {
		var presetList = permXML.querySelectorAll('presetlist preset');
	} else {
		var presetList = permXML.querySelectorAll('presets preset');
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