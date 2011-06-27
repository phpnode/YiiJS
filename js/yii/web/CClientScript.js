/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CClientScript manages JavaScript and CSS stylesheets for views.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CClientScript.php 3142 2011-03-29 13:27:50Z qiang.xue $
 * @package system.web
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CApplicationComponent
 */
Yii.CClientScript = function CClientScript () {
};
Yii.CClientScript.prototype = new Yii.CApplicationComponent();
Yii.CClientScript.prototype.constructor =  Yii.CClientScript;

/**
 * @var {Array} the mapping between script file names and the corresponding script URLs.
 * The array keys are script file names (without directory part) and the array values are the corresponding URLs.
 * If an array value is false, the corresponding script file will not be rendered.
 * If an array key is '*.js' or '*.css', the corresponding URL will replace all
 * all JavaScript files or CSS files, respectively.
 * 
 * This property is mainly used to optimize the generated HTML pages
 * by merging different scripts files into fewer and optimized script files.
 * @since 1.0.3
 */
Yii.CClientScript.prototype.scriptMap = {};

/**
 * @var {Array} the registered CSS files (CSS URL=>media type).
 * @since 1.0.4
 */
Yii.CClientScript.prototype.cssFiles = {};
/**
 * @var {Array} the registered JavaScript files (position, key => URL)
 * @since 1.0.4
 */
Yii.CClientScript.prototype.scriptFiles = {};
/**
 * @var {Array} the registered JavaScript code blocks (position, key => code)
 * @since 1.0.5
 */
Yii.CClientScript.prototype.scripts = {};

/**
 * @var {Array} the registered css code blocks (key => array(CSS code, media type)).
 * @since 1.1.3
 */
Yii.CClientScript.prototype.css = {};
/**
 * @var {Boolean} whether there are any javascript or css to be rendered.
 * @since 1.1.7
 */
Yii.CClientScript.prototype.hasScripts = false;

Yii.CClientScript.prototype._baseUrl = null;
/**
 * Cleans all registered scripts.
 */
Yii.CClientScript.prototype.reset = function () {
		this.hasScripts=false;
		this.cssFiles={};
		this.css={};
		this.scriptFiles={};
		this.scripts={};
	};
/**
 * Renders the registered scripts.
 * This method is called in {@link CController::render} when it finishes
 * rendering content. CClientScript thus gets a chance to insert script tags
 * at <code>head</code> and <code>body</code> sections in the HTML output.
 * @param {String} output the existing output that needs to be inserted with script tags
 */
Yii.CClientScript.prototype.render = function (output) {
		if(!this.hasScripts) {
			return;
		}
		// Register the JavaScript files
		Yii.forEach(this.scriptFiles, function(i, url) {
			jQuery("head").append(jQuery("<script type='text/javascript'></script>").attr("src",url));
		});
		
		// Register the CSS files
		Yii.forEach(this.cssFiles, function(url, mediaType) {
			var element = jQuery("<link rel='stylesheet' type='text/css' />").attr("href",url);
			if (mediaType) {
				element.attr("media", mediaType);
			}
			jQuery("head").append(element);
		});
		
		// Register the inline CSS
		Yii.forEach(this.css, function (i, item) {
			var css = item[0];
			if (item[1]) {
				css = "@media " + item[1] + "{\n" + css + "\n}";
			}
			jQuery("head").append(jQuery("<style type='text/css'></style>").append(css));
		});
		
		// Run the registered JavaScript
		
		Yii.forEach(this.scripts, function(id, func) {
			setTimeout(func, 20); // add a small delay to make sure any required elements have been bound
			
		});
		
		
		// Now reset the component
		this.reset();
		
	};


/**
 * Registers a CSS file
 * @param {String} url URL of the CSS file
 * @param {String} media media that the CSS file should be applied to. If empty, it means all media types.
 * @returns {Yii.CClientScript} the CClientScript object itself (to support method chaining, available since version 1.1.5).
 */
Yii.CClientScript.prototype.registerCssFile = function (url, media) {
		var params;
		if (media === undefined) {
			media = '';
		}
		this.hasScripts=true;
		this.cssFiles[url]=media;
		return this;
	};
/**
 * Registers a piece of CSS code.
 * @param {String} id ID that uniquely identifies this piece of CSS code
 * @param {String} css the CSS code
 * @param {String} media media that the CSS code should be applied to. If empty, it means all media types.
 * @returns {Yii.CClientScript} the CClientScript object itself (to support method chaining, available since version 1.1.5).
 */
Yii.CClientScript.prototype.registerCss = function (id, css, media) {
		var params;
		if (media === undefined) {
			media = '';
		}
		this.hasScripts=true;
		this.css[id]=[css,media];
		return this;
	};
/**
 * Registers a javascript file.
 * @param {String} url URL of the javascript file
 * @returns {Yii.CClientScript} the CClientScript object itself (to support method chaining, available since version 1.1.5).
 */
Yii.CClientScript.prototype.registerScriptFile = function (url) {
		this.hasScripts=true;
		this.scriptFiles[url]=url;
		return this;
	};
/**
 * Registers a piece of javascript code.
 * @param {String} id ID that uniquely identifies this piece of JavaScript code
 * @param {Function} script the javascript code
 * @returns {Yii.CClientScript} the CClientScript object itself (to support method chaining, available since version 1.1.5).
 */
Yii.CClientScript.prototype.registerScript = function (id, script) {
	
		this.hasScripts=true;
		this.scripts[id]=script;
		
		return this;
	};

/**
 * Checks whether the CSS file has been registered.
 * @param {String} url URL of the CSS file
 * @returns {Boolean} whether the CSS file is already registered
 */
Yii.CClientScript.prototype.isCssFileRegistered = function (url) {
		return this.cssFiles[url] !== undefined;
	};
/**
 * Checks whether the CSS code has been registered.
 * @param {String} id ID that uniquely identifies the CSS code
 * @returns {Boolean} whether the CSS code is already registered
 */
Yii.CClientScript.prototype.isCssRegistered = function (id) {
		return this.css[id] !== undefined;
	};
/**
 * Checks whether the JavaScript file has been registered.
 * @param {String} url URL of the javascript file
 * @returns {Boolean} whether the javascript file is already registered
 */
Yii.CClientScript.prototype.isScriptFileRegistered = function (url) {
		return this.scriptFiles[url] !== undefined;
	};
/**
 * Checks whether the JavaScript code has been registered.
 * @param {String} id ID that uniquely identifies the JavaScript code
 * @returns {Boolean} whether the javascript code is already registered
 */
Yii.CClientScript.prototype.isScriptRegistered = function (id) {
		return this.scripts[id] !== undefined;
	};
