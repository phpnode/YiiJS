/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CHttpRequest encapsulates the $_SERVER variable and resolves its inconsistency among different Web servers.
 * 
 * CHttpRequest also manages the cookies sent from and sent to the user.
 * By setting {@link enableCookieValidation} to true,
 * cookies sent from the user will be validated to see if they are tampered.
 * The property {@link getCookies cookies} returns the collection of cookies.
 * For more details, see {@link CCookieCollection}.
 * 
 * CHttpRequest is a default application component loaded by {@link CWebApplication}. It can be
 * accessed via {@link CWebApplication::getRequest()}.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CHttpRequest.php 3050 2011-03-12 13:22:11Z qiang.xue $
 * @package system.web
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CApplicationComponent
 */
Yii.CHttpRequest = function CHttpRequest () {
};
Yii.CHttpRequest.prototype = new Yii.CApplicationComponent();
Yii.CHttpRequest.prototype.constructor =  Yii.CHttpRequest;
/**
 * @var {Boolean} whether cookies should be validated to ensure they are not tampered. Defaults to false.
 */
Yii.CHttpRequest.prototype.enableCookieValidation = false;
/**
 * @var {Boolean} whether to enable CSRF (Cross-Site Request Forgery) validation. Defaults to false.
 * By setting this property to true, forms submitted to an Yii Web application must be originated
 * from the same application. If not, a 400 HTTP exception will be raised.
 * Note, this feature requires that the user client accepts cookie.
 * You also need to use {@link CHtml::form} or {@link CHtml::statefulForm} to generate
 * the needed HTML forms in your pages.
 * @see http://seclab.stanford.edu/websec/csrf/csrf.pdf
 */
Yii.CHttpRequest.prototype.enableCsrfValidation = false;
/**
 * @var {String} the name of the token used to prevent CSRF. Defaults to 'YII_CSRF_TOKEN'.
 * This property is effectively only when {@link enableCsrfValidation} is true.
 */
Yii.CHttpRequest.prototype.csrfTokenName = 'YII_CSRF_TOKEN';
/**
 * @var {Object} the property values (in name-value pairs) used to initialize the CSRF cookie.
 * Any property of {@link CHttpCookie} may be initialized.
 * This property is effective only when {@link enableCsrfValidation} is true.
 */
Yii.CHttpRequest.prototype.csrfCookie = null;
/**
 * @var {Object} a list of GET parameters for this URL
 */
Yii.CHttpRequest.prototype.params = {};

Yii.CHttpRequest.prototype._requestUri = null;
Yii.CHttpRequest.prototype._pathInfo = null;
Yii.CHttpRequest.prototype._scriptFile = null;
Yii.CHttpRequest.prototype._scriptUrl = null;
Yii.CHttpRequest.prototype._hostInfo = null;
Yii.CHttpRequest.prototype._baseUrl = null;
Yii.CHttpRequest.prototype._cookies = null;
Yii.CHttpRequest.prototype._preferredLanguage = null;
Yii.CHttpRequest.prototype._csrfToken = null;
Yii.CHttpRequest.prototype._deleteParams = null;
Yii.CHttpRequest.prototype._putParams = null;
Yii.CHttpRequest.prototype._port = null;
Yii.CHttpRequest.prototype._securePort = null;
/**
 * Initializes the application component.
 * This method overrides the parent implementation by preprocessing
 * the user request data.
 */
Yii.CHttpRequest.prototype.init = function () {
		Yii.CApplicationComponent.prototype.init.call(this);
		this.normalizeRequest();
	};
/**
 * Normalizes the request data.
 */
Yii.CHttpRequest.prototype.normalizeRequest = function () {
	this.parseParams();
};

/**
 * Returns the named GET parameter value. POST is not supported because JavaScript doesn't have access to it.
 * If the GET parameter does not exist, the second parameter to this method will be returned.
 * @param {String} name the GET parameter name
 * @param {Mixed} defaultValue the default parameter value if the GET parameter does not exist.
 * @returns {Mixed} the GET parameter value
 * @since 1.0.4
 * @see getQuery
 */
Yii.CHttpRequest.prototype.getParam = function (name, defaultValue) {
		if (this.params.hasOwnProperty(name)) {
			return this.params[name];
		}
		return defaultValue;
	};
/**
 * Returns the named GET parameter value.
 * If the GET parameter does not exist, the second parameter to this method will be returned.
 * @param {String} name the GET parameter name
 * @param {Mixed} defaultValue the default parameter value if the GET parameter does not exist.
 * @returns {Mixed} the GET parameter value
 * @since 1.0.4
 * @see getPost
 * @see getParam
 */
Yii.CHttpRequest.prototype.getQuery = function (name, defaultValue) {
		if (this.params.hasOwnProperty(name)) {
			return this.params[name];
		}
		return defaultValue;
	};

/**
 * Parses the query string and adds the relevant GET variables to the list of parameters,
 * @see CHttpRequest.params
 * @returns {Object} The GET parameters key: value
 */
Yii.CHttpRequest.prototype.parseParams = function () {
	var i, limit, matches, key, value;
	if (document.location.search.length === 0) {
		return false;
	}
	matches = document.location.search.slice(1).split("&");
	limit = matches.length;
	for (i = 0; i < limit; i++) {
		value = matches[i].split("=");
		key = value.shift();
		key = decodeURIComponent((key + '').replace(/\+/g, '%20'));
		value = decodeURIComponent((value.join("=") + '').replace(/\+/g, '%20'));
		this.params = this._setParamValue(key, value, this.params);
		
	}
	return this.params;
};
/**
 * Sets / parses a GET parameter, do not call this function directly
 * @see CHttpRequest.parseParams
 * @private
 * 
 * @param {String} key The key to set
 * @param {mixed} value The value to set this key to
 * @param {Object} params The list of parameters to modify
 * @returns {Object} the modified list of parameters
 */
Yii.CHttpRequest.prototype._setParamValue = function (key, value, params) {
	var parts, firstItem, secondItem, i, limit = 0;
	if (key.indexOf("[") === -1) {
		params[key] = value;
		return params;
	}
	parts = key.split("[");
	firstItem = parts.shift();
	if (firstItem.length === 0) {
		for (i in params) {
			if (params.hasOwnProperty(i)) {
				limit++;
			}
		}
		limit++;
		params[limit] = value;
		return params;
	}
	secondItem = parts.shift().split("]").shift();
	if (secondItem.length === 0) {
		limit = 0;
		for (i in params) {
			if (params.hasOwnProperty(i)) {
				limit++;
			}
		}
		limit++;
		secondItem = limit;
	}
	if (parts.length > 0) {
		parts = "[" + parts.join("[");
	}
	else {
		parts = "";
	}
	if (params[firstItem] === undefined) {
		params[firstItem] = {};
	}
	
	params[firstItem] = this._setParamValue(secondItem  + parts, value, params[firstItem]);
	return params;
};
/**
 * Returns the currently requested URL.
 * This is the same as {@link getRequestUri}.
 * @returns {String} part of the request URL after the host info.
 */
Yii.CHttpRequest.prototype.getUrl = function () {
	return this.getRequestUri();
};
/**
 * Returns the schema and host part of the application URL.
 * The returned URL does not have an ending slash.
 * By default this is determined based on the user request information.
 * You may explicitly specify it by setting the {@link setHostInfo hostInfo} property.
 * @param {String} schema schema to use (e.g. http, https). If empty, the schema used for the current request will be used.
 * @returns {String} schema and hostname part (with port number if needed) of the request URL (e.g. http://www.yiiframework.com)
 * @see setHostInfo
 */
Yii.CHttpRequest.prototype.getHostInfo = function (schema) {
		var secure, http, port, pos;
		if (this._hostInfo === null) {
			secure = this.getIsSecureConnection();
			if (secure) {
				http = "https";
			}
			else {
				http = "http";
			}
			this._hostInfo = http + "://" + location.host;
		}
		if (schema !== undefined && schema !== null) {
			secure = this.getIsSecureConnection();
			if ((secure && schema === 'https') || (!secure && schema === 'http')) {
				return this._hostInfo;
			}
			port = this.getPort();
			if ((port !== 80 && schema === 'http') || (port !== 443 && schema === 'https')) {
				port = ':' + port;
			}
			else {
				port = '';
			}
			return this._hostInfo + port;
		}
		else {
			return this._hostInfo;
		}
	};
/**
 * Sets the schema and host part of the application URL.
 * This setter is provided in case the schema and hostname cannot be determined
 * on certain Web servers.
 * @param {String} value the schema and host part of the application URL.
 */
Yii.CHttpRequest.prototype.setHostInfo = function (value) {
		this._hostInfo=php.rtrim(value,'/');
	};
/**
 * Returns the relative URL for the application.
 * This is similar to {@link getScriptUrl scriptUrl} except that
 * it does not have the script file name, and the ending slashes are stripped off.
 * @param {Boolean} absolute whether to return an absolute URL. Defaults to false, meaning returning a relative one.
 * This parameter has been available since 1.0.2.
 * @returns {String} the relative URL for the application
 * @see setScriptUrl
 */
Yii.CHttpRequest.prototype.getBaseUrl = function (absolute) {
		if (absolute === undefined) {
			absolute = false;
		}
		if(this._baseUrl===null) {
			this._baseUrl=php.rtrim(php.dirname(this.getScriptUrl()),'\\/');
		}
		return absolute ? this.getHostInfo() + this._baseUrl : this._baseUrl;
	};
/**
 * Sets the relative URL for the application.
 * By default the URL is determined based on the entry script URL.
 * This setter is provided in case you want to change this behavior.
 * @param {String} value the relative URL for the application
 */
Yii.CHttpRequest.prototype.setBaseUrl = function (value) {
		this._baseUrl=value;
	};
/**
 * Returns the relative URL of the entry script.
 * @returns {String} the relative URL of the entry script.
 */
Yii.CHttpRequest.prototype.getScriptUrl = function () {
		if(this._scriptUrl===null) {
			this._scriptUrl = "";
		}
		return this._scriptUrl;
	};
/**
 * Sets the relative URL for the application entry script.
 * This setter is provided in case the entry script URL cannot be determined
 * on certain Web servers.
 * @param {String} value the relative URL for the application entry script.
 */
Yii.CHttpRequest.prototype.setScriptUrl = function (value) {
		this._scriptUrl='/'+php.trim(value,'/');
	};
/**
 * Returns the path info of the currently requested URL.
 * This refers to the part that is after the entry script and before the question mark.
 * The starting and ending slashes are stripped off.
 * @returns {String} part of the request URL that is after the entry script and before the question mark.
 */
Yii.CHttpRequest.prototype.getPathInfo = function () {
		if(this._pathInfo===null) {
			this._pathInfo = location.pathname;
			if (this._pathInfo.slice(0, 1) === "/") {
				this._pathInfo = this._pathInfo.slice(1);
			}
			if (this._pathInfo.slice(-1) === "/") {
				this._pathInfo = this._pathInfo.slice(0, -1);
			}
		}
		return this._pathInfo;
	};
/**
 * Returns the request URI portion for the currently requested URL.
 * This refers to the portion that is after the {@link hostInfo host info} part.
 * It includes the {@link queryString query string} part if any.
 * The implementation of this method referenced Zend_Controller_Request_Http in Zend Framework.
 * @returns {String} the request URI portion for the currently requested URL.
 * @throws {Yii.CException} if the request URI cannot be determined due to improper server configuration
 * @since 1.0.1
 */
Yii.CHttpRequest.prototype.getRequestUri = function () {
		if (this._requestUri === null) {
			this._requestUri = document.location.pathname + document.location.search;
		}
		return this._requestUri;
	};
/**
 * Returns part of the request URL that is after the question mark.
 * @returns {String} part of the request URL that is after the question mark
 */
Yii.CHttpRequest.prototype.getQueryString = function () {
	return location.search.length === 0 ? '' : location.search.slice(1);
};
/**
 * Return if the request is sent via secure channel (https).
 * @returns {Boolean} if the request is sent via secure channel (https)
 */
Yii.CHttpRequest.prototype.getIsSecureConnection = function () {
		return location.protocol === "https:";
	};
/**
 * Returns the request type. Always GET in this version.
 * @returns {String} request type, such as GET, POST, HEAD, PUT, DELETE.
 */
Yii.CHttpRequest.prototype.getRequestType = function () {
		return "GET";
	};

/**
 * Returns the server name.
 * @returns {String} server name
 */
Yii.CHttpRequest.prototype.getServerName = function () {
		return location.host;
	};
/**
 * Returns the server port number.
 * @returns {Integer} server port number
 */
Yii.CHttpRequest.prototype.getServerPort = function () {
		return location.port;
	};
/**
 * Returns the URL referrer, null if not present
 * @returns {String} URL referrer, null if not present
 */
Yii.CHttpRequest.prototype.getUrlReferrer = function () {
		return document.referrer !== "" ? document.referrer :null;
	};
/**
 * Returns the user agent, null if not present.
 * @returns {String} user agent, null if not present
 */
Yii.CHttpRequest.prototype.getUserAgent = function () {
		return navigator.userAgent !== undefined && navigator.userAgent !== ''? navigator.userAgent : null;
	};
/**
 * Doesn't return the user IP address because it's impossible without a server side call
 * @returns {String} user IP address
 */
Yii.CHttpRequest.prototype.getUserHostAddress = function () {
		return null;
	};
/**
 * Returns the user host name, null if it cannot be determined.
 * @returns {String} user host name, null if cannot be determined
 */
Yii.CHttpRequest.prototype.getUserHost = function () {
		return null;
	};
/**
 * Returns entry script file path.
 * @returns {String} entry script file path (processed w/ realpath())
 */
Yii.CHttpRequest.prototype.getScriptFile = function () {
		if(this._scriptFile!==null) {
			return this._scriptFile;
		}
		else {
			return (this._scriptFile="/");
		}
	};

/**
 * Returns user browser accept types, null if not present.
 * @returns {String} user browser accept types, null if not present
 */
Yii.CHttpRequest.prototype.getAcceptTypes = function () {
		return null;
	};
/**
 * Returns the port to use for insecure requests.
 * Defaults to 80, or the port specified by the server if the current
 * request is insecure.
 * You may explicitly specify it by setting the {@link setPort port} property.
 * @returns {Integer} port number for insecure requests.
 * @see setPort
 * @since 1.1.3
 */
Yii.CHttpRequest.prototype.getPort = function () {
		if(this._port===null) {
			if (location.port === '') {
				if (this.getIsSecureConnection()) {
					this._port = 443;
				}
				else {
					this._port = 80;
				}
			}
		}
		return this._port;
	};
/**
 * Sets the port to use for insecure requests.
 * This setter is provided in case a custom port is necessary for certain
 * server configurations.
 * @param {Integer} value port number.
 * @since 1.1.3
 */
Yii.CHttpRequest.prototype.setPort = function (value) {
		this._port=Number(value);
		this._hostInfo=null;
	};
/**
 * Returns the port to use for secure requests.
 * Defaults to 443, or the port specified by the server if the current
 * request is secure.
 * You may explicitly specify it by setting the {@link setSecurePort securePort} property.
 * @returns {Integer} port number for secure requests.
 * @see setSecurePort
 * @since 1.1.3
 */
Yii.CHttpRequest.prototype.getSecurePort = function () {
		if(this._securePort===null) {
			this._securePort=this.getIsSecureConnection() && location.port !== '' ? Number(location.port) : 443;
		}
		return this._securePort;
	};
/**
 * Sets the port to use for secure requests.
 * This setter is provided in case a custom port is necessary for certain
 * server configurations.
 * @param {Integer} value port number.
 * @since 1.1.3
 */
Yii.CHttpRequest.prototype.setSecurePort = function (value) {
		this._securePort=Number(value);
		this._hostInfo=null;
	};
/**
 * Returns the cookie collection.
 * The result can be used like an associative array. Adding {@link CHttpCookie} objects
 * to the collection will send the cookies to the client; and removing the objects
 * from the collection will delete those cookies on the client.
 * @returns {Yii.CCookieCollection} the cookie collection.
 */
Yii.CHttpRequest.prototype.getCookies = function () {
		if(this._cookies!==null) {
			return this._cookies;
		}
		else {
			return (this._cookies=new Yii.CCookieCollection(this));
		}
	};
/**
 * Redirects the browser to the specified URL.
 * @param {String} url URL to be redirected to. If the URL is a relative one, the base URL of
 * the application will be inserted at the beginning.
 * @param {Boolean} terminate whether to terminate the current application
 * @param {Integer} statusCode the HTTP status code. Defaults to 302. See {@link http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html}
 * for details about HTTP status code. This parameter has been available since version 1.0.4.
 */
Yii.CHttpRequest.prototype.redirect = function (url, terminate, statusCode) {
		if (terminate === undefined) {
			terminate = true;
		}
		if (statusCode === undefined) {
			statusCode = 302;
		}
		if(php.strpos(url,'/')===0) {
			url=this.getHostInfo()+url;
		}
		document.location = url;
		if(terminate) {
			Yii.app().end();
		}
	};
/**
 * Returns the user preferred language.
 * The returned language ID will be canonicalized using {@link CLocale::getCanonicalID}.
 * This method returns false if the user does not have language preference.
 * @returns {String} the user preferred language.
 */
Yii.CHttpRequest.prototype.getPreferredLanguage = function () {
		if(this._preferredLanguage===null) {
			return (this._preferredLanguage=Yii.CLocale.getCanonicalID(navigator.language));
		}
		return this._preferredLanguage;
	};

/**
 * Returns the random token used to perform CSRF validation.
 * The token will be read from cookie first. If not found, a new token
 * will be generated.
 * @returns {String} the random token for CSRF validation.
 * @see enableCsrfValidation
 */
Yii.CHttpRequest.prototype.getCsrfToken = function () {
		
		return this._csrfToken;
	};
/**
 * Determine whether this is an AJAX request, always false.
 * @returns {Boolean} false
 */
Yii.CHttpRequest.prototype.getIsAjaxRequest = function () {
	return false;
};
