/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CUrlRule represents a URL formatting/parsing rule.
 * 
 * It mainly consists of two parts: route and pattern. The former classifies
 * the rule so that it only applies to specific controller-action route.
 * The latter performs the actual formatting and parsing role. The pattern
 * may have a set of named parameters.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CUrlManager.php 3165 2011-04-06 08:27:40Z mdomba $
 * @package system.web
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CUrlRule = function CUrlRule (route, pattern) {
	if (route !== false) {
		this.construct(route, pattern);
	}
};
Yii.CUrlRule.prototype = new Yii.CComponent();
Yii.CUrlRule.prototype.constructor =  Yii.CUrlRule;
/**
 * @var {String} the URL suffix used for this rule.
 * For example, ".html" can be used so that the URL looks like pointing to a static HTML page.
 * Defaults to null, meaning using the value of {@link CUrlManager::urlSuffix}.
 * @since 1.0.6
 */
Yii.CUrlRule.prototype.urlSuffix = null;
/**
 * @var {Boolean} whether the rule is case sensitive. Defaults to null, meaning
 * using the value of {@link CUrlManager::caseSensitive}.
 * @since 1.0.1
 */
Yii.CUrlRule.prototype.caseSensitive = null;
/**
 * @var {Object} the default GET parameters (name=>value) that this rule provides.
 * When this rule is used to parse the incoming request, the values declared in this property
 * will be injected into Yii.app().getRequest().params
 * @since 1.0.8
 */
Yii.CUrlRule.prototype.defaultParams = {};
/**
 * @var {Boolean} whether the GET parameter values should match the corresponding
 * sub-patterns in the rule when creating a URL. Defaults to null, meaning using the value
 * of {@link CUrlManager::matchValue}. When this property is false, it means
 * a rule will be used for creating a URL if its route and parameter names match the given ones.
 * If this property is set true, then the given parameter values must also match the corresponding
 * parameter sub-patterns. Note that setting this property to true will degrade performance.
 * @since 1.1.0
 */
Yii.CUrlRule.prototype.matchValue = null;
/**
 * @var {String} the HTTP verb (e.g. GET, POST, DELETE) that this rule should match.
 * If this rule can match multiple verbs, please separate them with commas.
 * If this property is not set, the rule can match any verb.
 * Note that this property is only used when parsing a request. It is ignored for URL creation.
 * @since 1.1.7
 */
Yii.CUrlRule.prototype.verb = null;
/**
 * @var {Boolean} whether this rule is only used for request parsing.
 * Defaults to false, meaning the rule is used for both URL parsing and creation.
 * @since 1.1.7
 */
Yii.CUrlRule.prototype.parsingOnly = false;
/**
 * @var {String} the controller/action pair
 */
Yii.CUrlRule.prototype.route = null;
/**
 * @var {Object} the mapping from route param name to token name (e.g. _r1=><1>)
 * @since 1.0.5
 */
Yii.CUrlRule.prototype.references = {};
/**
 * @var {String} the pattern used to match route
 * @since 1.0.5
 */
Yii.CUrlRule.prototype.routePattern = null;
/**
 * @var {String} regular expression used to parse a URL
 */
Yii.CUrlRule.prototype.pattern = null;
/**
 * @var {String} template used to construct a URL
 */
Yii.CUrlRule.prototype.template = null;
/**
 * @var {Object} list of parameters (name=>regular expression)
 */
Yii.CUrlRule.prototype.params = {};
/**
 * @var {Boolean} whether the URL allows additional parameters at the end of the path info.
 */
Yii.CUrlRule.prototype.append = null;
/**
 * @var {Boolean} whether host info should be considered for this rule
 * @since 1.0.11
 */
Yii.CUrlRule.prototype.hasHostInfo = null;
/**
 * Constructor.
 * @param {String} route the route of the URL (controller/action)
 * @param {String} pattern the pattern for matching the URL
 */
Yii.CUrlRule.prototype.construct = function (route, pattern) {
		var i, name, tr2 = {}, tr = {}, matches2, n, matches, tokens, value, p, vals, limit;
		this.references = {};
		this.defaultParams = {};
		this.params = {};
		if(typeof route === 'object') {
			vals = ['urlSuffix','caseSensitive','defaultParams','matchValue','verb','parsingOnly'];
			limit = vals.length;
			for (i = 0; i < limit; i ++) {
				name = vals[i];
				if(route[name] !== undefined) {
					this[name]=route[name];
				}
			}
		
			if(route.pattern !== undefined) {
				pattern=route.pattern;
			}
			route=route.route;
		}
		this.route=php.trim(route,'/');
		tr2['/']=tr['/']='\\/';
		if(php.strpos(route,'<')!==false) {
			matches2 = Yii.matchAll(/<(\w+)>/g, route);
			limit = matches2.length;
			for (n in matches2) {
				if (matches2.hasOwnProperty(n)) {
					this.references[matches2[n][1]] = "<" + matches2[n][1] + ">";
				}
			}
		}
		this.hasHostInfo=!php.strncasecmp(pattern,'http://',7) || !php.strncasecmp(pattern,'https://',8);
		if(this.verb!==null) {
			this.verb=this.verb.toUpperCase().split(/[\s,]+/);
		}
		
		matches = Yii.matchAll(/<(\w+):?(.*?)?>/g, pattern);
		
		if (matches !== null) {
			for (i in matches) {
				if (matches.hasOwnProperty(i)) {
					if (matches[i][2] === '') {
						matches[i][2] = '[^\/]+';
					}
					tr["<" + matches[i][1] + ">"] = "(" + matches[i][2] + ")";
					if (this.references[matches[i][1]] !== undefined) {
						
						tr2["<" + matches[i][1] + ">"] = tr["<" + matches[i][1] + ">"];
						
					}
					else {
						
						this.params[matches[i][1]] = matches[i][2];
					}
				}
			}
		}
		p=php.rtrim(pattern,'*');
		this.append=p!==pattern;
		p=php.trim(p,'/');
		this.template=p.replace(/<(\w+):?.*?>/g,'<$1>');
		this.pattern='^'+php.strtr(this.template,tr) + "\/";
		if(!this.append) {
			this.pattern+='$';
		}
		limit = 0;
		
		for (i in this.references) {
			if (this.references.hasOwnProperty(i)) {
				limit++;
			}
		}
		if (limit > 0) {
			
			this.routePattern = "^" + php.strtr(this.route, tr2) + "$";
		}
		
	};
/**
 * Creates a URL based on this rule.
 * @param {Yii.CUrlManager} manager the manager
 * @param {String} route the route
 * @param {Array} params list of parameters
 * @param {String} ampersand the token separating name-value pairs in the URL.
 * @returns {Mixed} the constructed URL or false on error
 */
Yii.CUrlRule.prototype.createUrl = function (manager, route, params, ampersand) {
		var caseVar, tr, matches, name, key, value, suffix, url, hostInfo, n;
		if(this.parsingOnly) {
			return false;
		}
		if(manager.caseSensitive && this.caseSensitive===null || this.caseSensitive) {
			caseVar='';
		}
		else {
			caseVar='i';
		}
		tr={};
		
		if(route!==this.route) {
			
			if(this.routePattern!==null && ((matches = new RegExp(this.routePattern,"u"+caseVar).exec(route)))) {
				n = 1;
				for (key in this.references) {
					if (this.references.hasOwnProperty(key)) {
						name = this.references[key];
						
						tr[name]=matches[n];
						n += 1;
					}
				}
			}
			else {
				
				return false;
			}
		}
		
		for (key in this.defaultParams) {
			if (this.defaultParams.hasOwnProperty(key)) {
				value = this.defaultParams[key];
				if(params[key] !== undefined) {
					if(params[key]==value) {
						delete params[key];
					}
					else {
						return false;
					}
				}
			}
		}
		
		for (key in this.params) {
			if (this.params.hasOwnProperty(key)) {
				value = this.params[key];
				if(params[key] === undefined) {
					return false;
				}
			}
		}
		
		if(manager.matchValue && this.matchValue===null || this.matchValue) {
			for (key in this.params) {
				if (this.params.hasOwnProperty(key)) {
					value = this.params[key];
					if(!(new RegExp(value,caseVar)).exec(params[key])) {
						return false;
					}
				}
			}
		}
		
		for (key in this.params) {
			if (this.params.hasOwnProperty(key)) {
				value = this.params[key];
				tr["<" + key + ">"]=php.urlencode(params[key]);
				delete params[key];
			}
		}
		suffix=this.urlSuffix===null ? manager.urlSuffix : this.urlSuffix;
		
		url=php.strtr(this.template,tr);
		if(this.hasHostInfo) {
			hostInfo=Yii.app().getRequest().getHostInfo();
			if(php.stripos(url,hostInfo)===0) {
				url=url.slice(php.strlen(hostInfo));
			}
		}
		
		if(php.empty(params)) {
			return url!=='' ? url+suffix : url;
		}
		if(this.append) {
			url+='/'+manager.createPathInfo(params,'/','/')+suffix;
		}
		else {
			if(url!=='') {
				url+=suffix;
			}
			url+='?'+manager.createPathInfo(params,'=',ampersand);
		}
		return url;
	};
/**
 * Parases a URL based on this rule.
 * @param {Yii.CUrlManager} manager the URL manager
 * @param {Yii.CHttpRequest} request the request object
 * @param {String} pathInfo path info part of the URL
 * @param {String} rawPathInfo path info that contains the potential URL suffix
 * @returns {Mixed} the route that consists of the controller ID and action ID or false on error
 */
Yii.CUrlRule.prototype.parseUrl = function (manager, request, pathInfo, rawPathInfo) {
		var caseVar, urlSuffix, matches, name, value, tr, key, i, n;
		if(this.verb!==null && !php.in_array(request.getRequestType(), this.verb, true)) {
			return false;
		}
		if(manager.caseSensitive && this.caseSensitive===null || this.caseSensitive) {
			caseVar='';
		}
		else {
			caseVar='i';
		}
		if(this.urlSuffix!==null) {
			pathInfo=manager.removeUrlSuffix(rawPathInfo,this.urlSuffix);
		}
		// URL suffix required, but not found in the requested URL
		if(manager.useStrictParsing && pathInfo===rawPathInfo) {
			urlSuffix=this.urlSuffix===null ? manager.urlSuffix : this.urlSuffix;
			if(urlSuffix!='' && urlSuffix!=='/') {
				return false;
			}
		}
		if(this.hasHostInfo) {
			pathInfo=request.getHostInfo().toLowerCase()+php.rtrim('/'+pathInfo,'/');
		}
		pathInfo+='/';
		if((matches = new RegExp(this.pattern,caseVar).exec(pathInfo))) {
			
			n = 1;
			tr={};
			for (i in this.references) {
				if (this.references.hasOwnProperty(i)) {
					tr[this.references[i]] = matches[n];
					n += 1;
				}
			}
			for (i in this.params) {
				if (this.params.hasOwnProperty(i)) {
					re = new RegExp(this.params[i]);
					if (re.exec(matches[n])) {
						
						request.params[i] = matches[n];
						n += 1;
					}
				}
			}
			for (i in this.defaultParams) {
				if (this.defaultParams.hasOwnProperty(i)) {
					request.params[i] = this.defaultParams[i];
				}
			}
			
			
			if(pathInfo!==matches[0]) { // there are additional GET params
				manager.parsePathInfo(php.ltrim(pathInfo.slice(php.strlen(matches[0])),'/'));
			}
			if(this.routePattern!==null) {
				return php.strtr(this.route,tr);
			}
			else {
				return this.route;
			}
		}
		else {
			return false;
		}
	};