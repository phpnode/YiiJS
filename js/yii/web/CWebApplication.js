/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CWebApplication extends CApplication by providing functionalities specific to Web requests.
 * 
 * CWebApplication manages the controllers in MVC pattern, and provides the following additional
 * core application components:
 * <ul>
 * <li>{@link urlManager}: provides URL parsing and constructing functionality;</li>
 * <li>{@link request}: encapsulates the Web request information;</li>
 * <li>{@link session}: provides the session-related functionalities;</li>
 * <li>{@link assetManager}: manages the publishing of private asset files.</li>
 * <li>{@link user}: represents the user session information.</li>
 * <li>{@link themeManager}: manages themes.</li>
 * <li>{@link authManager}: manages role-based access control (RBAC).</li>
 * <li>{@link clientScript}: manages client scripts (javascripts and CSS).</li>
 * <li>{@link widgetFactory}: creates widgets and supports widget skinning.</li>
 * </ul>
 * 
 * User requests are resolved as controller-action pairs and additional parameters.
 * CWebApplication creates the requested controller instance and let it to handle
 * the actual user request. If the user does not specify controller ID, it will
 * assume {@link defaultController} is requested (which defaults to 'site').
 * 
 * Controller class files must reside under the directory {@link getControllerPath controllerPath}
 * (defaults to 'protected/controllers'). The file name and the class name must be
 * the same as the controller ID with the first letter in upper case and appended with 'Controller'.
 * For example, the controller 'article' is defined by the class 'ArticleController'
 * which is in the file 'protected/controllers/ArticleController.php'.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CWebApplication.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.web
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CApplication
 */
Yii.CWebApplication = function CWebApplication (config) {
	if (config !== false) {
		this.construct(config);
	}
};
Yii.CWebApplication.prototype = new Yii.CApplication(false);
Yii.CWebApplication.prototype.constructor =  Yii.CWebApplication;
/**
 * @returns {String} the route of the default controller, action or module. Defaults to 'site'.
 */
Yii.CWebApplication.prototype.defaultController = 'site';
/**
 * @var {Mixed} the application-wide layout. Defaults to 'main' (relative to {@link getLayoutPath layoutPath}).
 * If this is false, then no layout will be used.
 */
Yii.CWebApplication.prototype.layout = 'main';
/**
 * @var {Array} mapping from controller ID to controller configurations.
 * Each name-value pair specifies the configuration for a single controller.
 * A controller configuration can be either a string or an array.
 * If the former, the string should be the class name or
 * {@link YiiBase::getPathOfAlias class path alias} of the controller.
 * If the latter, the array must contain a 'class' element which specifies
 * the controller's class name or {@link YiiBase::getPathOfAlias class path alias}.
 * The rest name-value pairs in the array are used to initialize
 * the corresponding controller properties. For example,
 * <pre>
 * {
 *   'post':{
 *      'class':'path.to.PostController',
 *      'pageTitle':'something new',
 *   },
 *   'user':'path.to.UserController',,
 * }
 * </pre>
 * 
 * Note, when processing an incoming request, the controller map will first be
 * checked to see if the request can be handled by one of the controllers in the map.
 * If not, a controller will be searched for under the {@link getControllerPath default controller path}.
 */
Yii.CWebApplication.prototype.controllerMap = [];
/**
 * @var {Array} the configuration specifying a controller which should handle
 * all user requests. This is mainly used when the application is in maintenance mode
 * and we should use a controller to handle all incoming requests.
 * The configuration specifies the controller route (the first element)
 * and GET parameters (the rest name-value pairs). For example,
 * <pre>
 * {
 *     'offline/notice',
 *     'param1':'value1',
 *     'param2':'value2',
 * }
 * </pre>
 * Defaults to null, meaning catch-all is not effective.
 */
Yii.CWebApplication.prototype.catchAllRequest = null;
Yii.CWebApplication.prototype._controllerPath = null;
Yii.CWebApplication.prototype._viewPath = null;
Yii.CWebApplication.prototype._systemViewPath = null;
Yii.CWebApplication.prototype._layoutPath = null;
Yii.CWebApplication.prototype._controller = null;
Yii.CWebApplication.prototype._homeUrl = null;
Yii.CWebApplication.prototype._theme = null;
/**
 * Processes the current request.
 * It first resolves the request into controller and action,
 * and then creates the controller to perform the action.
 */
Yii.CWebApplication.prototype.processRequest = function () {
		var route, nameValue, name, value;
		if(Object.prototype.toString.call(this.catchAllRequest) === '[object Array]' && this.catchAllRequest[0] !== undefined) {
			route=this.catchAllRequest[0];
			nameValue = php.array_splice(this.catchAllRequest,1);
			for (name in nameValue) {
				if (nameValue.hasOwnProperty(name)) {
					value = nameValue[name];
					this.getRequest().params[name]=value;
				}
			}
		}
		else {
			route=this.getUrlManager().parseUrl(this.getRequest());
		}
		this.runController(route);
	};
/**
 * Registers the core application components.
 * This method overrides the parent implementation by registering additional core components.
 * @see setComponents
 */
Yii.CWebApplication.prototype.registerCoreComponents = function () {
		var components;
		Yii.CApplication.prototype.registerCoreComponents.call(this);
		components={
			'session':{
				'class':'CHttpSession'
			},
			'assetManager':{
				'class':'CAssetManager'
			},
			'user':{
				'class':'CWebUser'
			},
			'themeManager':{
				'class':'CThemeManager'
			},
			'authManager':{
				'class':'CPhpAuthManager'
			},
			'clientScript':{
				'class':'CClientScript'
			},
			'widgetFactory':{
				'class':'CWidgetFactory'
			}
		};
		this.setComponents(components);
	};

/**
 * @returns {IAuthManager} the authorization manager component
 */
Yii.CWebApplication.prototype.getAuthManager = function () {
		return this.getComponent('authManager');
	};
/**
 * @returns {Yii.CAssetManager} the asset manager component
 */
Yii.CWebApplication.prototype.getAssetManager = function () {
		return this.getComponent('assetManager');
	};
/**
 * @returns {Yii.CHttpSession} the session component
 */
Yii.CWebApplication.prototype.getSession = function () {
		return this.getComponent('session');
	};
/**
 * @returns {Yii.CWebUser} the user session information
 */
Yii.CWebApplication.prototype.getUser = function () {
		return this.getComponent('user');
	};
/**
 * Returns the view renderer.
 * If this component is registered and enabled, the default
 * view rendering logic defined in {@link CBaseController} will
 * be replaced by this renderer.
 * @returns {IViewRenderer} the view renderer.
 */
Yii.CWebApplication.prototype.getViewRenderer = function () {
		return this.getComponent('viewRenderer');
	};
/**
 * Returns the client script manager.
 * @returns {Yii.CClientScript} the client script manager
 */
Yii.CWebApplication.prototype.getClientScript = function () {
		return this.getComponent('clientScript');
	};
/**
 * Returns the widget factory.
 * @returns {IWidgetFactory} the widget factory
 * @since 1.1
 */
Yii.CWebApplication.prototype.getWidgetFactory = function () {
		return this.getComponent('widgetFactory');
	};
/**
 * @returns {Yii.CThemeManager} the theme manager.
 */
Yii.CWebApplication.prototype.getThemeManager = function () {
		return this.getComponent('themeManager');
	};
/**
 * @returns {Yii.CTheme} the theme used currently. Null if no theme is being used.
 */
Yii.CWebApplication.prototype.getTheme = function () {
		if(typeof(this._theme) === 'string') {
			this._theme=this.getThemeManager().getTheme(this._theme);
		}
		return this._theme;
	};
/**
 * @param {String} value the theme name
 */
Yii.CWebApplication.prototype.setTheme = function (value) {
		this._theme=value;
	};
/**
 * Creates a relative URL based on the given controller and action information.
 * @param {String} route the URL route. This should be in the format of 'ControllerID/ActionID'.
 * @param {Array} params additional GET parameters (name=>value). Both the name and value will be URL-encoded.
 * @param {String} ampersand the token separating name-value pairs in the URL.
 * @returns {String} the constructed URL
 */
Yii.CWebApplication.prototype.createUrl = function (route, params, ampersand) {
		if (params === undefined) {
			params = [];
		}
		if (ampersand === undefined) {
			ampersand = '&';
		}
		return this.getUrlManager().createUrl(route,params,ampersand);
	};
/**
 * Creates an absolute URL based on the given controller and action information.
 * @param {String} route the URL route. This should be in the format of 'ControllerID/ActionID'.
 * @param {Array} params additional GET parameters (name=>value). Both the name and value will be URL-encoded.
 * @param {String} schema schema to use (e.g. http, https). If empty, the schema used for the current request will be used.
 * @param {String} ampersand the token separating name-value pairs in the URL.
 * @returns {String} the constructed URL
 */
Yii.CWebApplication.prototype.createAbsoluteUrl = function (route, params, schema, ampersand) {
		var url;
		if (params === undefined) {
			params = [];
		}
		if (schema === undefined) {
			schema = '';
		}
		if (ampersand === undefined) {
			ampersand = '&';
		}
		url=this.createUrl(route,params,ampersand);
		if(php.strpos(url,'http')===0) {
			return url;
		}
		else {
			return this.getRequest().getHostInfo(schema)+url;
		}
	};
/**
 * Returns the relative URL for the application.
 * This is a shortcut method to {@link CHttpRequest::getBaseUrl()}.
 * @param {Boolean} absolute whether to return an absolute URL. Defaults to false, meaning returning a relative one.
 * This parameter has been available since 1.0.2.
 * @returns {String} the relative URL for the application
 * @see CHttpRequest::getBaseUrl()
 */
Yii.CWebApplication.prototype.getBaseUrl = function (absolute) {
		if (absolute === undefined) {
			absolute = false;
		}
		return this.getRequest().getBaseUrl(absolute);
	};
/**
 * @returns {String} the homepage URL
 */
Yii.CWebApplication.prototype.getHomeUrl = function () {
		if(this._homeUrl===null) {
			if(this.getUrlManager().showScriptName) {
				return this.getRequest().getScriptUrl();
			}
			else {
				return this.getRequest().getBaseUrl()+'/';
			}
		}
		else {
			return this._homeUrl;
		}
	};
/**
 * @param {String} value the homepage URL
 */
Yii.CWebApplication.prototype.setHomeUrl = function (value) {
		this._homeUrl=value;
	};
/**
 * Creates the controller and performs the specified action.
 * @param {String} route the route of the current request. See {@link createController} for more details.
 * @throws {Yii.CHttpException} if the controller could not be created.
 */
Yii.CWebApplication.prototype.runController = function (route) {
		var ca, controller, actionID, oldController;
		if((ca=this.createController(route))!==null && ca[0] !== undefined && ca[0] !== false) {
			
			controller = ca[0];
			
			actionID = ca[1];
			// oldController=this._controller;
			this._controller=controller;
			controller.init();
			controller.run(actionID);
			// this._controller=oldController;
		}
		else {
			throw new Yii.CHttpException(404,Yii.t('yii','Unable to resolve the request "{route}".',
				{'{route}':route===''?this.defaultController:route}));
		}
	};
/**
 * Creates a controller instance based on a route.
 * The route should contain the controller ID and the action ID.
 * It may also contain additional GET variables. All these must be concatenated together with slashes.
 * 
 * This method will attempt to create a controller in the following order:
 * <ol>
 * <li>If the first segment is found in {@link controllerMap}, the corresponding
 * controller configuration will be used to create the controller;</li>
 * <li>If the first segment is found to be a module ID, the corresponding module
 * will be used to create the controller;</li>
 * <li>Otherwise, it will search under the {@link controllerPath} to create
 * the corresponding controller. For example, if the route is "admin/user/create",
 * then the controller will be created using the class file "protected/controllers/admin/UserController.php".</li>
 * </ol>
 * @param {String} route the route of the request.
 * @param {Yii.CWebModule} owner the module that the new controller will belong to. Defaults to null, meaning the application
 * instance is the owner.
 * @returns {Array} the controller instance and the action ID. Null if the controller class does not exist or the route is invalid.
 */
Yii.CWebApplication.prototype.createController = function (route, owner) {
		var caseSensitive, pos, id, basePath = null, module, controllerID, className, classFile;
		if (owner === undefined) {
			owner = null;
		}
		if(owner===null) {
			owner=this;
		}
		if((route=php.trim(route,'/'))==='') {
			route=owner.defaultController;
		}
		caseSensitive=this.getUrlManager().caseSensitive;
		route+='/';
		
		while((pos=php.strpos(route,'/'))!==false) {
			id=route.slice(0, pos);
			if(!/^\w+$/.exec(id)) {
				return null;
			}
			if(!caseSensitive) {
				id=id.toLowerCase();
			}
			route=String(route.slice(pos+1));
			if(basePath === null) {
				// first segment
				if(owner.controllerMap[id] !== undefined) {
					return [
						Yii.createComponent(owner.controllerMap[id],id,owner===this?null:owner),
						this.parseActionParams(route)
					];
				}
				if((module=owner.getModule(id))!==null && module !== undefined) {
					return this.createController(route,module);
				}
				basePath=owner.getControllerPath();
				controllerID='';
			}
			else {
				controllerID+='/';
			}
			// try and include the file
			className=php.ucfirst(id)+'Controller';
			classFile=basePath+'/'+className+'.js';
			
			return [
					Yii.createComponent(classFile,id,owner===this?null:owner),
					this.parseActionParams(route)
				];
			
		}
	};
/**
 * Parses a path info into an action ID and GET variables.
 * @param {String} pathInfo path info
 * @returns {String} action ID
 * @since 1.0.3
 */
Yii.CWebApplication.prototype.parseActionParams = function (pathInfo) {
		var pos, manager, actionID;
		if((pos=php.strpos(pathInfo,'/'))!==false) {
			manager=this.getUrlManager();
			manager.parsePathInfo(String(pathInfo.slice(pos+1)));
			actionID=pathInfo.slice(0, pos);
			return manager.caseSensitive ? actionID : actionID.toLowerCase();
		}
		else {
			return pathInfo;
		}
	};
/**
 * @returns {Yii.CController} the currently active controller
 */
Yii.CWebApplication.prototype.getController = function () {
		return this._controller;
	};
/**
 * @param {Yii.CController} value the currently active controller
 * @since 1.0.6
 */
Yii.CWebApplication.prototype.setController = function (value) {
		this._controller=value;
	};
/**
 * @returns {String} the directory that contains the controller classes. Defaults to 'protected/controllers'.
 */
Yii.CWebApplication.prototype.getControllerPath = function () {
		if(this._controllerPath!==null) {
			return this._controllerPath;
		}
		else {
			return (this._controllerPath=this.getBasePath()+'/controllers');
		}
	};
/**
 * @param {String} value the directory that contains the controller classes.
 */
Yii.CWebApplication.prototype.setControllerPath = function (value) {
		this._controllerPath=value;
	};
/**
 * @returns {String} the root directory of view files. Defaults to 'protected/views'.
 */
Yii.CWebApplication.prototype.getViewPath = function () {
		if(this._viewPath!==null) {
			return this._viewPath;
		}
		else {
			return (this._viewPath=this.getBasePath()+'/views');
		}
	};
/**
 * @param {String} path the root directory of view files.
 */
Yii.CWebApplication.prototype.setViewPath = function (path) {
		this._viewPath=path;
	};
/**
 * @returns {String} the root directory of system view files. Defaults to 'protected/views/system'.
 */
Yii.CWebApplication.prototype.getSystemViewPath = function () {
		if(this._systemViewPath!==null) {
			return this._systemViewPath;
		}
		else {
			return (this._systemViewPath=this.getViewPath()+'/system');
		}
	};
/**
 * @param {String} path the root directory of system view files.
 */
Yii.CWebApplication.prototype.setSystemViewPath = function (path) {
		this._systemViewPath=path;
	};
/**
 * @returns {String} the root directory of layout files. Defaults to 'protected/views/layouts'.
 */
Yii.CWebApplication.prototype.getLayoutPath = function () {
		if(this._layoutPath!==null) {
			return this._layoutPath;
		}
		else {
			return (this._layoutPath=this.getViewPath()+'/layouts');
		}
	};
/**
 * @param {String} path the root directory of layout files.
 */
Yii.CWebApplication.prototype.setLayoutPath = function (path) {
		this._layoutPath=path;
	};
/**
 * The pre-filter for controller actions.
 * This method is invoked before the currently requested controller action and all its filters
 * are executed. You may override this method with logic that needs to be done
 * before all controller actions.
 * @param {Yii.CController} controller the controller
 * @param {Yii.CAction} action the action
 * @returns {Boolean} whether the action should be executed.
 * @since 1.0.4
 */
Yii.CWebApplication.prototype.beforeControllerAction = function (controller, action) {
		return true;
	};
/**
 * The post-filter for controller actions.
 * This method is invoked after the currently requested controller action and all its filters
 * are executed. You may override this method with logic that needs to be done
 * after all controller actions.
 * @param {Yii.CController} controller the controller
 * @param {Yii.CAction} action the action
 * @since 1.0.4
 */
Yii.CWebApplication.prototype.afterControllerAction = function (controller, action) {
	};
/**
 * Searches for a module by its ID.
 * This method is used internally. Do not call this method.
 * @param {String} id module ID
 * @returns {Yii.CWebModule} the module that has the specified ID. Null if no module is found.
 * @since 1.0.3
 */
Yii.CWebApplication.prototype.findModule = function (id) {
		var controller, module, m;
		if((controller=this.getController())!==null && (module=controller.getModule())!==null) {
			do
			{
				if((m=module.getModule(id))!==null) {
					return m;
				}
			} while((module=module.getParentModule())!==null);
		}
		if((m=this.getModule(id))!==null) {
			return m;
		}
	};
/**
 * Initializes the application.
 * This method overrides the parent implementation by preloading the 'request' component.
 */
Yii.CWebApplication.prototype.init = function () {
		Yii.CApplication.prototype.init.call(this);
		// preload 'request' so that it has chance to respond to onBeginRequest event.
		this.getRequest();
	};