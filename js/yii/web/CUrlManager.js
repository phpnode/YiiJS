/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CUrlManager manages the URLs of Yii Web applications.
 * 
 * It provides URL construction ({@link createUrl()}) as well as parsing ({@link parseUrl()}) functionality.
 * 
 * URLs managed via CUrlManager can be in one of the following two formats,
 * by setting {@link setUrlFormat urlFormat} property:
 * <ul>
 * <li>'path' format: /path/to/EntryScript.php/name1/value1/name2/value2...</li>
 * <li>'get' format:  /path/to/EntryScript.php?name1=value1&name2=value2...</li>
 * </ul>
 * 
 * When using 'path' format, CUrlManager uses a set of {@link setRules rules} to:
 * <ul>
 * <li>parse the requested URL into a route ('ControllerID/ActionID') and GET parameters;</li>
 * <li>create URLs based on the given route and GET parameters.</li>
 * </ul>
 * 
 * A rule consists of a route and a pattern. The latter is used by CUrlManager to determine
 * which rule is used for parsing/creating URLs. A pattern is meant to match the path info
 * part of a URL. It may contain named parameters using the syntax '&lt;ParamName:RegExp&gt;'.
 * 
 * When parsing a URL, a matching rule will extract the named parameters from the path info
 * and put them into the Yii.app().getRequest.params variable; when creating a URL, a matching rule will extract
 * the named parameters from Yii.app().getRequest.params and put them into the path info part of the created URL.
 * 
 * If a pattern ends with '/ *', it means additional GET parameters may be appended to the path
 * info part of the URL; otherwise, the GET parameters can only appear in the query string part.
 * 
 * To specify URL rules, set the {@link setRules rules} property as an array of rules (pattern=>route).
 * For example,
 * <pre>
 * {
 *     'articles':'article/list',
 *     'article/<id:\d+>/ *':'article/read',
 * }
 * </pre>
 * Two rules are specified in the above:
 * <ul>
 * <li>The first rule says that if the user requests the URL '/path/to/index.php/articles',
 *   it should be treated as '/path/to/index.php/article/list'; and vice versa applies
 *   when constructing such a URL.</li>
 * <li>The second rule contains a named parameter 'id' which is specified using
 *   the &lt;ParamName:RegExp&gt; syntax. It says that if the user requests the URL
 *   '/path/to/index.php/article/13', it should be treated as '/path/to/index.php/article/read?id=13';
 *   and vice versa applies when constructing such a URL.</li>
 * </ul>
 * 
 * Starting from version 1.0.5, the route part may contain references to named parameters defined
 * in the pattern part. This allows a rule to be applied to different routes based on matching criteria.
 * For example,
 * <pre>
 * {
 *      '<_c:(post|comment)>/<id:\d+>/<_a:(create|update|delete)>':'<_c>/<_a>',
 *      '<_c:(post|comment)>/<id:\d+>':'<_c>/view',
 *      '<_c:(post|comment)>s/ *':'<_c>/list',
 * }
 * </pre>
 * In the above, we use two named parameters '<_c>' and '<_a>' in the route part. The '<_c>'
 * parameter matches either 'post' or 'comment', while the '<_a>' parameter matches an action ID.
 * 
 * Like normal rules, these rules can be used for both parsing and creating URLs.
 * For example, using the rules above, the URL '/index.php/post/123/create'
 * would be parsed as the route 'post/create' with GET parameter 'id' being 123.
 * And given the route 'post/list' and GET parameter 'page' being 2, we should get a URL
 * '/index.php/posts/page/2'.
 * 
 * Starting from version 1.0.11, it is also possible to include hostname into the rules
 * for parsing and creating URLs. One may extract part of the hostname to be a GET parameter.
 * For example, the URL <code>http://admin.example.com/en/profile</code> may be parsed into GET parameters
 * <code>user=admin</code> and <code>lang=en</code>. On the other hand, rules with hostname may also be used to
 * create URLs with parameterized hostnames.
 * 
 * In order to use parameterized hostnames, simply declare URL rules with host info, e.g.:
 * <pre>
 * {
 *     'http://<user:\w+>.example.com/<lang:\w+>/profile' : 'user/profile',
 * }
 * </pre>
 * 
 * CUrlManager is a default application component that may be accessed via
 * {@link CWebApplication::getUrlManager()}.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CUrlManager.php 3165 2011-04-06 08:27:40Z mdomba $
 * @package system.web
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CApplicationComponent
 */
Yii.CUrlManager = function CUrlManager () {
};
Yii.CUrlManager.prototype = new Yii.CApplicationComponent();
Yii.CUrlManager.prototype.constructor =  Yii.CUrlManager;
/**
 * @const
 */
Yii.CUrlManager.prototype.CACHE_KEY = 'Yii.CUrlManager.rules';
/**
 * @const
 */
Yii.CUrlManager.prototype.GET_FORMAT = 'get';
/**
 * @const
 */
Yii.CUrlManager.prototype.PATH_FORMAT = 'path';
/**
 * @var {Array} an array of url rule configurations
 */
Yii.CUrlManager.prototype.rules = [];
/**
 * @var {String} the URL suffix used when in 'path' format.
 * For example, ".html" can be used so that the URL looks like pointing to a static HTML page. Defaults to empty.
 */
Yii.CUrlManager.prototype.urlSuffix = '';
/**
 * @var {Boolean} whether to show entry script name in the constructed URL. Defaults to true.
 */
Yii.CUrlManager.prototype.showScriptName = true;
/**
 * @var {Boolean} whether to append GET parameters to the path info part. Defaults to true.
 * This property is only effective when {@link urlFormat} is 'path' and is mainly used when
 * creating URLs. When it is true, GET parameters will be appended to the path info and
 * separate from each other using slashes. If this is false, GET parameters will be in query part.
 * @since 1.0.3
 */
Yii.CUrlManager.prototype.appendParams = true;
/**
 * @var {String} the GET variable name for route. Defaults to 'r'.
 */
Yii.CUrlManager.prototype.routeVar = 'r';
/**
 * @var {Boolean} whether routes are case-sensitive. Defaults to true. By setting this to false,
 * the route in the incoming request will be turned to lower case first before further processing.
 * As a result, you should follow the convention that you use lower case when specifying
 * controller mapping ({@link CWebApplication::controllerMap}) and action mapping
 * ({@link CController::actions}). Also, the directory names for organizing controllers should
 * be in lower case.
 * @since 1.0.1
 */
Yii.CUrlManager.prototype.caseSensitive = true;
/**
 * @var {Boolean} whether the GET parameter values should match the corresponding
 * sub-patterns in a rule before using it to create a URL. Defaults to false, meaning
 * a rule will be used for creating a URL only if its route and parameter names match the given ones.
 * If this property is set true, then the given parameter values must also match the corresponding
 * parameter sub-patterns. Note that setting this property to true will degrade performance.
 * @since 1.1.0
 */
Yii.CUrlManager.prototype.matchValue = false;
/**
 * @var {String} the ID of the cache application component that is used to cache the parsed URL rules.
 * Defaults to 'cache' which refers to the primary cache application component.
 * Set this property to false if you want to disable caching URL rules.
 * @since 1.0.3
 */
Yii.CUrlManager.prototype.cacheID = 'cache';
/**
 * @var {Boolean} whether to enable strict URL parsing.
 * This property is only effective when {@link urlFormat} is 'path'.
 * If it is set true, then an incoming URL must match one of the {@link rules URL rules}.
 * Otherwise, it will be treated as an invalid request and trigger a 404 HTTP exception.
 * Defaults to false.
 * @since 1.0.6
 */
Yii.CUrlManager.prototype.useStrictParsing = false;
Yii.CUrlManager.prototype._urlFormat = 'get';
Yii.CUrlManager.prototype._rules = [];
Yii.CUrlManager.prototype._baseUrl = null;
/**
 * Initializes the application component.
 */
Yii.CUrlManager.prototype.init = function () {
		Yii.CApplicationComponent.prototype.init.call(this);
		this.processRules();
	};
/**
 * Processes the URL rules.
 */
Yii.CUrlManager.prototype.processRules = function () {
		var cache, hash, data, route, pattern, i, limit;
		if(php.empty(this.rules) || this.getUrlFormat()===this.GET_FORMAT) {
			return;
		}
		limit = this.rules.length;
		for (i = 0; i < limit; i++) {
			route = this.rules[i];
			this._rules.push(this.createUrlRule(route, route.pattern));
		}
		if(cache !== undefined) {
			cache.set(this.Yii.CACHE_KEY,[this._rules,hash]);
		}
	};
/**
 * Adds new URL rules.
 * In order to make the new rules effective, this method must be called BEFORE
 * {@link CWebApplication::processRequest}.
 * @param {Array} rules new URL rules (pattern=>route).
 * @since 1.1.4
 */
Yii.CUrlManager.prototype.addRules = function (rules) {
		var route, pattern;
		for (pattern in rules) {
			if (rules.hasOwnProperty(pattern)) {
				route = rules[pattern];
				this._rules.push(this.createUrlRule(route,pattern));
			}
		}
	};
/**
 * Creates a URL rule instance.
 * The default implementation returns a CUrlRule object.
 * @param {Mixed} route the route part of the rule. This could be a string or an array
 * @param {String} pattern the pattern part of the rule
 * @returns {Yii.CUrlRule} the URL rule instance
 * @since 1.1.0
 */
Yii.CUrlManager.prototype.createUrlRule = function (route, pattern) {
		return new Yii.CUrlRule(route,pattern);
	};
/**
 * Constructs a URL.
 * @param {String} route the controller and the action (e.g. article/read)
 * @param {Array} params list of GET parameters (name=>value). Both the name and value will be URL-encoded.
 * If the name is '#', the corresponding value will be treated as an anchor
 * and will be appended at the end of the URL. This anchor feature has been available since version 1.0.1.
 * @param {String} ampersand the token separating name-value pairs in the URL. Defaults to '&'.
 * @returns {String} the constructed URL
 */
Yii.CUrlManager.prototype.createUrl = function (route, params, ampersand) {
		var i, param, anchor, n, url, rule;
		if (params === undefined) {
			params = [];
		}
		if (ampersand === undefined) {
			ampersand = '&';
		}
		delete params[this.routeVar];
		for (i in params) {
			if (params.hasOwnProperty(i)) {
				if(params[i]===null) {
					params[i]='';
				}
			}
		}
		if(params['#'] !== undefined) {
			anchor='#'+params['#'];
			delete params['#'];
		}
		else {
			anchor='';
		}
		route=php.trim(route,'/');
		for (n in this._rules) {
			if (this._rules.hasOwnProperty(n)) {
				rule = this._rules[n];
				if((url=rule.createUrl(this,route,params,ampersand))!==false) {
					if(rule.hasHostInfo) {
						return url==='' ? '/'+anchor : url+anchor;
					}
					else {
						return this.getBaseUrl()+'/'+url+anchor;
					}
				}
			}
		}
		return this.createUrlDefault(route,params,ampersand)+anchor;
	};
/**
 * Contructs a URL based on default settings.
 * @param {String} route the controller and the action (e.g. article/read)
 * @param {Array} params list of GET parameters
 * @param {String} ampersand the token separating name-value pairs in the URL.
 * @returns {String} the constructed URL
 */
Yii.CUrlManager.prototype.createUrlDefault = function (route, params, ampersand) {
		var url, query;
		if(this.getUrlFormat()===this.PATH_FORMAT) {
			url=php.rtrim(this.getBaseUrl()+'/'+route,'/');
			if(this.appendParams) {
				url=php.rtrim(url+'/'+this.createPathInfo(params,'/','/'),'/');
				return route==='' ? url : url+this.urlSuffix;
			}
			else {
				if(route!=='') {
					url+=this.urlSuffix;
				}
				query=this.createPathInfo(params,'=',ampersand);
				return query==='' ? url : url+'?'+query;
			}
		}
		else
		{
			url=this.getBaseUrl();
			if(!this.showScriptName) {
				url+='/';
			}
			if(route!=='') {
				url+='?'+this.routeVar+'='+route;
				if((query=this.createPathInfo(params,'=',ampersand))!=='') {
					url+=ampersand+query;
				}
			}
			else if((query=this.createPathInfo(params,'=',ampersand))!=='') {
				url+='?'+query;
			}
			return url;
		}
	};
/**
 * Parses the user request.
 * @param {Yii.CHttpRequest} request the request application component
 * @returns {String} the route (controllerID/actionID) and perhaps GET parameters in path format.
 */
Yii.CUrlManager.prototype.parseUrl = function (request) {
		var rawPathInfo, pathInfo, i, r, rule;
		if(this.getUrlFormat()===this.PATH_FORMAT) {
			rawPathInfo=request.getPathInfo();
			pathInfo=this.removeUrlSuffix(rawPathInfo,this.urlSuffix);
			for (i in this._rules) {
				if (this._rules.hasOwnProperty(i)) {
					rule = this._rules[i];
					
					if((r=rule.parseUrl(this,request,pathInfo,rawPathInfo))!==false) {
						
						return Yii.app().getRequest().params[this.routeVar] !== undefined ? Yii.app().getRequest().params[this.routeVar] : r;
					}
				}
			}
			if(this.useStrictParsing) {
				throw new Yii.CHttpException(404,Yii.t('yii','Unable to resolve the request "{route}".',
					{'{route}':pathInfo}));
			}
			else {
				return pathInfo;
			}
		}
		else if(Yii.app().getRequest().params[this.routeVar] !== undefined) {
			return Yii.app().getRequest().params[this.routeVar];
		}
		else {
			return '';
		}
	};
/**
 * Parses a path info into URL segments and saves them to Yii.app().getRequest.params
 * @param {String} pathInfo path info
 * @since 1.0.3
 */
Yii.CUrlManager.prototype.parsePathInfo = function (pathInfo) {
		var segs, n, i, key, value, pos, m, matches, name, j, val;
		if(pathInfo==='') {
			return;
		}
		segs=pathInfo+'/'.split('/');
		n=php.count(segs);
		for(i=0;i<n-1;i+=2) {
			key=segs[i];
			if(key==='') {
				continue;
			}
			value=segs[i+1];
			if((pos=php.strpos(key,'['))!==false && (matches=key.match(/\[(.*?)\]/g)) !== null) {
				name=key.slice(0, pos);
				for(j=m-1;j>=0;--j) {
					if(matches[1][j]==='') {
						value=[value];
					}
					else {
						val = {};
						val[matches[1][j]] = value;
						value = val;
					}
				}
				if(Yii.app().getRequest.params[name] !== undefined && typeof Yii.app().getRequest.params[name] === 'object') {
					value=Yii.CMap.prototype.mergeArray(Yii.app().getRequest.params[name],value);
				}
				Yii.app().getRequest.params[name]=value;
			}
			else {
				Yii.app().getRequest.params[key]=value;
			}
		}
	};
/**
 * Creates a path info based on the given parameters.
 * @param {Array} params list of GET parameters
 * @param {String} equal the separator between name and value
 * @param {String} ampersand the separator between name-value pairs
 * @param {String} key this is used internally.
 * @returns {String} the created path info
 * @since 1.0.3
 */
Yii.CUrlManager.prototype.createPathInfo = function (params, equal, ampersand, key) {
		var pairs, k, v;
		if (key === undefined) {
			key = null;
		}
		pairs = [];
		for (k in params) {
			if (params.hasOwnProperty(k)) {
				v = params[k];
				if (key!==null) {
					k = key+'['+k+']';
				}
				if (typeof v === "object") {
					pairs.push(this.createPathInfo(v,equal,ampersand, k));
				}
				else {
					pairs.push(php.urlencode(k)+equal+php.urlencode(v));
				}
			}
		}
		return pairs.join(ampersand);
	};
/**
 * Removes the URL suffix from path info.
 * @param {String} pathInfo path info part in the URL
 * @param {String} urlSuffix the URL suffix to be removed
 * @returns {String} path info with URL suffix removed.
 */
Yii.CUrlManager.prototype.removeUrlSuffix = function (pathInfo, urlSuffix) {
		if(urlSuffix!=='' && pathInfo.slice(-php.strlen(urlSuffix))===urlSuffix) {
			return pathInfo.slice(0, -php.strlen(urlSuffix));
		}
		else {
			return pathInfo;
		}
	};
/**
 * Returns the base URL of the application.
 * @returns {String} the base URL of the application (the part after host name and before query string).
 * If {@link showScriptName} is true, it will include the script name part.
 * Otherwise, it will not, and the ending slashes are stripped off.
 */
Yii.CUrlManager.prototype.getBaseUrl = function () {
		if(this._baseUrl!==null) {
			return this._baseUrl;
		}
		else
		{
			if(this.showScriptName) {
				this._baseUrl=Yii.app().getRequest().getScriptUrl();
			}
			else {
				this._baseUrl=Yii.app().getRequest().getBaseUrl();
			}
			return this._baseUrl;
		}
	};
/**
 * Sets the base URL of the application (the part after host name and before query string).
 * This method is provided in case the {@link baseUrl} cannot be determined automatically.
 * The ending slashes should be stripped off. And you are also responsible to remove the script name
 * if you set {@link showScriptName} to be false.
 * @param {String} value the base URL of the application
 * @since 1.1.1
 */
Yii.CUrlManager.prototype.setBaseUrl = function (value) {
		this._baseUrl=value;
	};
/**
 * Returns the URL format.
 * @returns {String} the URL format. Defaults to 'path'. Valid values include 'path' and 'get'.
 * Please refer to the guide for more details about the difference between these two formats.
 */
Yii.CUrlManager.prototype.getUrlFormat = function () {
		return this._urlFormat;
	};
/**
 * Sets the URL format.
 * @param {String} value the URL format. It must be either 'path' or 'get'.
 */
Yii.CUrlManager.prototype.setUrlFormat = function (value) {
		if(value===this.PATH_FORMAT || value===this.GET_FORMAT) {
			this._urlFormat=value;
		}
		else {
			throw new Yii.CException(Yii.t('yii','CUrlManager.UrlFormat must be either "path" or "get".'));
		}
	};