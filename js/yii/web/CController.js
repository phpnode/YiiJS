/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CController manages a set of actions which deal with the corresponding user requests.
 * 
 * Through the actions, CController coordinates the data flow between models and views.
 * 
 * When a user requests an action 'XYZ', CController will do one of the following:
 * 1. Method-based action: call method 'actionXYZ' if it exists;
 * 2. Class-based action: create an instance of class 'XYZ' if the class is found in the action class map
 *    (specified via {@link actions()}, and execute the action;
 * 3. Call {@link missingAction()}, which by default will raise a 404 HTTP exception.
 * 
 * If the user does not specify an action, CController will run the action specified by
 * {@link defaultAction}, instead.
 * 
 * CController may be configured to execute filters before and after running actions.
 * Filters preprocess/postprocess the user request/response and may quit executing actions
 * if needed. They are executed in the order they are specified. If during the execution,
 * any of the filters returns true, the rest filters and the action will no longer get executed.
 * 
 * Filters can be individual objects, or methods defined in the controller class.
 * They are specified by overriding {@link filters()} method. The following is an example
 * of the filter specification:
 * <pre>
 * {
 *     'accessControl - login',
 *     'ajaxOnly + search',
 *     {
 *         'COutputCache + list',
 *         'duration':300,
 *     },
 * }
 * </pre>
 * The above example declares three filters: accessControl, ajaxOnly, COutputCache. The first two
 * are method-based filters (defined in CController), which refer to filtering methods in the controller class;
 * while the last refers to a object-based filter whose class is 'system.web.widgets.COutputCache' and
 * the 'duration' property is initialized as 300 (s).
 * 
 * For method-based filters, a method named 'filterXYZ($filterChain)' in the controller class
 * will be executed, where 'XYZ' stands for the filter name as specified in {@link filters()}.
 * Note, inside the filter method, you must call <code>$filterChain->run()</code> if the action should
 * be executed. Otherwise, the filtering process would stop at this filter.
 * 
 * Filters can be specified so that they are executed only when running certain actions.
 * For method-based filters, this is done by using '+' and '-' operators in the filter specification.
 * The '+' operator means the filter runs only when the specified actions are requested;
 * while the '-' operator means the filter runs only when the requested action is not among those actions.
 * For object-based filters, the '+' and '-' operators are following the class name.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CController.php 3137 2011-03-28 11:08:06Z mdomba $
 * @package system.web
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CBaseController
 */
Yii.CController = function CController(id, module) {
	if (id !== false) {
		this.construct(id, module);
	}
};
Yii.CController.prototype = new Yii.CBaseController();
Yii.CController.prototype.constructor =  Yii.CController;
/**
 * @const
 */
Yii.CController.prototype.STATE_INPUT_NAME = 'YII_PAGE_STATE';
/**
 * @var {Mixed} the name of the layout to be applied to this controller's views.
 * Defaults to null, meaning the {@link CWebApplication::layout application layout}
 * is used. If it is false, no layout will be applied.
 * Since version 1.0.3, the {@link CWebModule::layout module layout} will be used
 * if the controller belongs to a module and this layout property is null.
 */
Yii.CController.prototype.layout = null;
/**
 * @var {String} the name of the default action. Defaults to 'index'.
 */
Yii.CController.prototype.defaultAction = 'index';
Yii.CController.prototype._id = null;
Yii.CController.prototype._action = null;
Yii.CController.prototype._pageTitle = null;
Yii.CController.prototype._cachingStack = null;
Yii.CController.prototype._clips = null;
Yii.CController.prototype._dynamicOutput = null;
Yii.CController.prototype._pageStates = null;
Yii.CController.prototype._module = null;
/**
 * jQuery events to delegate for this controller.
 * Array should be of the following format:
 * <pre>
 * [
 * 	['#selector a.someLink', 'click', function (e) { alert("clicked!")}],
 * 	['#selector form', 'submit', function (e) { alert('Submitted!'); e.preventDefault(); }]
 * ] 
 * </pre>
 * These events will be bound to their selectors when the controller is run
 * @var Array
 */
Yii.CController.prototype.delegates = [];
/**
 * @param {String} id id of this controller
 * @param {Yii.CWebModule} module the module that this controller belongs to. This parameter
 * has been available since version 1.0.3.
 */
Yii.CController.prototype.construct = function (id, module) {
		if (module === undefined) {
			module = null;
		}
		this._id=id;
		this._module=module;
		this.attachBehaviors(this.behaviors());
	};
/**
 * Initializes the controller.
 * This method is called by the application before the controller starts to execute.
 * You may override this method to perform the needed initialization for the controller.
 * @since 1.0.1
 */
Yii.CController.prototype.init = function () {
	Yii.forEach(this.delegates, function(i, item) {
		jQuery("body").undelegate(item[0], item[1]).delegate(item[0], item[1], item[2]);
	});
	};
/**
 * Returns the filter configurations.
 * 
 * By overriding this method, child classes can specify filters to be applied to actions.
 * 
 * This method returns an array of filter specifications. Each array element specify a single filter.
 * 
 * For a method-based filter (called inline filter), it is specified as 'FilterName[ +|- Action1, Action2, ...]',
 * where the '+' ('-') operators describe which actions should be (should not be) applied with the filter.
 * 
 * For a class-based filter, it is specified as an array like the following:
 * <pre>
 * {
 *     'FilterClass[ +|- Action1, Action2, ...]',
 *     'name1':'value1',
 *     'name2':'value2',
 *     +++
 * }
 * </pre>
 * where the name-value pairs will be used to initialize the properties of the filter.
 * 
 * Note, in order to inherit filters defined in the parent class, a child class needs to
 * merge the parent filters with child filters using functions like array_merge().
 * 
 * @returns {Object} a list of filter configurations.
 * @see CFilter
 */
Yii.CController.prototype.filters = function () {
		return {};
	};
/**
 * Returns a list of external action classes.
 * Array keys are action IDs, and array values are the corresponding
 * action class in dot syntax (e.g. 'edit'=>'application.controllers.article.EditArticle')
 * or arrays representing the configuration of the actions, such as the following,
 * <pre>
 * return {
 *     'action1':'path.to.Action1Class',
 *     'action2':{
 *         'class':'path.to.Action2Class',
 *         'property1':'value1',
 *         'property2':'value2',
 *     },
 * };
 * </pre>
 * Derived classes may override this method to declare external actions.
 * 
 * Note, in order to inherit actions defined in the parent class, a child class needs to
 * merge the parent actions with child actions using functions like array_merge().
 * 
 * Since version 1.0.1, you may import actions from an action provider
 * (such as a widget, see {@link CWidget::actions}), like the following:
 * <pre>
 * return {
 *     +++other actions+++
 *     // import actions declared in ProviderClass::actions()
 *     // the action IDs will be prefixed with 'pro.'
 *     'pro.':'path.to.ProviderClass',
 *     // similar as above except that the imported actions are
 *     // configured with the specified initial property values
 *     'pro2.':{
 *         'class':'path.to.ProviderClass',
 *         'action1':{
 *             'property1':'value1',
 *         },
 *         'action2':{
 *             'property2':'value2',
 *         },
 *     ),
 * }
 * </pre>
 * 
 * In the above, we differentiate action providers from other action
 * declarations by the array keys. For action providers, the array keys
 * must contain a dot. As a result, an action ID 'pro2.action1' will
 * be resolved as the 'action1' action declared in the 'ProviderClass'.
 * 
 * @returns {Object} list of external action classes
 * @see createAction
 */
Yii.CController.prototype.actions = function () {
		return {};
	};
/**
 * Returns a list of behaviors that this controller should behave as.
 * The return value should be an array of behavior configurations indexed by
 * behavior names. Each behavior configuration can be either a string specifying
 * the behavior class or an array of the following structure:
 * <pre>
 * 'behaviorName':{
 *     'class':'path.to.BehaviorClass',
 *     'property1':'value1',
 *     'property2':'value2',
 * }
 * </pre>
 * 
 * Note, the behavior classes must implement {@link IBehavior} or extend from
 * {@link CBehavior}. Behaviors declared in this method will be attached
 * to the controller when it is instantiated.
 * 
 * For more details about behaviors, see {@link CComponent}.
 * @returns {Object} the behavior configurations (behavior name=>behavior configuration)
 * @since 1.0.6
 */
Yii.CController.prototype.behaviors = function () {
		return {};
	};
/**
 * Returns the access rules for this controller.
 * Override this method if you use the {@link filterAccessControl accessControl} filter.
 * @returns {Array} list of access rules. See {@link CAccessControlFilter} for details about rule specification.
 */
Yii.CController.prototype.accessRules = function () {
		return [];
	};
/**
 * Runs the named action.
 * Filters specified via {@link filters()} will be applied.
 * @param {String} actionID action ID
 * @throws {Yii.CHttpException} if the action does not exist or the action name is not proper.
 * @see filters
 * @see createAction
 * @see runAction
 */
Yii.CController.prototype.run = function (actionID) {
		var action, parent;
		if((action=this.createAction(actionID))!==null) {
			
			if((parent=this.getModule())===null) {
				
				parent=Yii.app();
			}
			if(parent.beforeControllerAction(this,action)) {
				this.runActionWithFilters(action,this.filters());
				parent.afterControllerAction(this,action);
			}
			
		}
		else {
			
			this.missingAction(actionID);
		}
	};
/**
 * Runs an action with the specified filters.
 * A filter chain will be created based on the specified filters
 * and the action will be executed then.
 * @param {Yii.CAction} action the action to be executed.
 * @param {Array} filters list of filters to be applied to the action.
 * @see filters
 * @see createAction
 * @see runAction
 */
Yii.CController.prototype.runActionWithFilters = function (action, filters) {
		var priorAction;
		if(php.empty(filters)) {
			this.runAction(action);
		}
		else
		{
			priorAction=this._action;
			this._action=action;
			Yii.CFilterChain.prototype.create(this,action,filters).run();
			this._action=priorAction;
		}
	};
/**
 * Runs the action after passing through all filters.
 * This method is invoked by {@link runActionWithFilters} after all possible filters have been executed
 * and the action starts to run.
 * @param {Yii.CAction} action action to run
 */
Yii.CController.prototype.runAction = function (action) {
	
		this._action=action;
		if(this.beforeAction(action)) {
			if(action.runWithParams(this.getActionParams())===false) {
				this.invalidActionParams(action);
			}
			else {
				this.afterAction(action);
			}
		}
	};
/**
 * Returns the request parameters that will be used for action parameter binding.
 * By default, this method will return $_GET. You may override this method if you
 * want to use other request parameters (e.g. $_GET+$_POST).
 * @returns {Array} the request parameters to be used for action parameter binding
 * @since 1.1.7
 */
Yii.CController.prototype.getActionParams = function () {
		return Yii.app().getRequest().params;
	};
/**
 * This method is invoked when the request parameters do not satisfy the requirement of the specified action.
 * The default implementation will throw a 400 HTTP exception.
 * @param {Yii.CAction} action the action being executed
 * @since 1.1.7
 */
Yii.CController.prototype.invalidActionParams = function (action) {
		throw new Yii.CHttpException(400,Yii.t('yii','Your request is invalid.'));
	};
/**
 * Postprocesses the output generated by {@link render()}.
 * This method is invoked at the end of {@link render()} and {@link renderText()}.
 * If there are registered client scripts, this method will insert them into the output
 * at appropriate places. If there are dynamic contents, they will also be inserted.
 * This method may also save the persistent page states in hidden fields of
 * stateful forms in the page.
 * @param {String} output the output generated by the current action
 * @returns {String} the output that has been processed.
 */
Yii.CController.prototype.processOutput = function (output) {
		Yii.app().getClientScript().render(output);
		// if using page caching, we should delay dynamic output replacement
		if(this._dynamicOutput!==null && this.isCachingStackEmpty())
		{
			output=this.processDynamicOutput(output);
			this._dynamicOutput=null;
		}
		if(this._pageStates===null) {
			this._pageStates=this.loadPageStates();
		}
		if(!php.empty(this._pageStates)) {
			output = this.savePageStates(this._pageStates,output);
		}
		return output;
	};
/**
 * Postprocesses the dynamic output.
 * This method is internally used. Do not call this method directly.
 * @param {String} output output to be processed
 * @returns {String} the processed output
 * @since 1.0.4
 */
Yii.CController.prototype.processDynamicOutput = function (output) {
		if(this._dynamicOutput) {
			output=output.replace(/<###dynamic-(\d+)###>/,Yii.getFunction([this,'replaceDynamicOutput']));
		}
		return output;
	};
/**
 * Replaces the dynamic content placeholders with actual content.
 * This is a callback function used internally.
 * @param {Array} matches matches
 * @returns {String} the replacement
 * @see processOutput
 */
Yii.CController.prototype.replaceDynamicOutput = function (matches) {
		var content;
		content=matches[0];
		if(this._dynamicOutput[matches[1]] !== undefined) {
			content=this._dynamicOutput[matches[1]];
			this._dynamicOutput[matches[1]]=null;
		}
		return content;
	};
/**
 * Creates the action instance based on the action name.
 * The action can be either an inline action or an object.
 * The latter is created by looking up the action map specified in {@link actions}.
 * @param {String} actionID ID of the action. If empty, the {@link defaultAction default action} will be used.
 * @returns {Yii.CAction} the action instance, null if the action does not exist.
 * @see actions
 */
Yii.CController.prototype.createAction = function (actionID) {
		var action;
		if(actionID==='') {
			actionID=this.defaultAction;
		}
		actionID = php.ucfirst(actionID);
		
		if(php.method_exists(this,'action'+actionID) && php.strcasecmp(actionID,'s')) { // we have actions method
			
			return new Yii.CInlineAction(this,actionID);
		}
		else {
			
			action=this.createActionFromMap(this.actions(),actionID,actionID);
			
			if(action!==null && action['run'] === undefined) {
				throw new Yii.CException(Yii.t('yii', 'Action class {class} must implement the "run" method.', {'{class}':php.get_class(action)}));
			}
			
			return action;
		}
	};
/**
 * Creates the action instance based on the action map.
 * This method will check to see if the action ID appears in the given
 * action map. If so, the corresponding configuration will be used to
 * create the action instance.
 * @param {Array} actionMap the action map
 * @param {String} actionID the action ID that has its prefix stripped off
 * @param {String} requestActionID the originally requested action ID
 * @param {Array} config the action configuration that should be applied on top of the configuration specified in the map
 * @returns {Yii.CAction} the action instance, null if the action does not exist.
 * @since 1.0.1
 */
Yii.CController.prototype.createActionFromMap = function (actionMap, actionID, requestActionID, config) {
		var pos, baseConfig, prefix, provider, providerType, classVar, map;
		actionID = php.lcfirst(actionID);
		
		requestActionID = php.lcfirst(requestActionID);
		if (config === undefined) {
			config = [];
		}
		if((pos=php.strpos(actionID,'.'))===false && actionMap[actionID] !== undefined) {
			baseConfig= typeof actionMap[actionID] === 'object' ? actionMap[actionID] : {'class':actionMap[actionID]};
			return Yii.createComponent(php.empty(config)?baseConfig:php.array_merge(baseConfig,config),this,requestActionID);
		}
		else if(pos===false) {
			return null;
		}
		
		// the action is defined in a provider
		prefix=actionID.slice(0, pos+1);
		if(actionMap[prefix] === undefined) {
			return null;
		}
		actionID=String(actionID.slice(pos+1));
		provider=actionMap[prefix];
		if(typeof(provider) === 'string') {
			providerType=provider;
		}
		else if(typeof provider === 'object' && provider['class'] !== undefined) {
			providerType=provider['class'];
			if(provider[actionID] !== undefined) {
				if(typeof(provider[actionID]) === 'string') {
					config=php.array_merge({'class':provider[actionID]},config);
				}
				else {
					config=php.array_merge(provider[actionID],config);
				}
			}
		}
		else {
			throw new Yii.CException(Yii.t('yii','Object configuration must be an array containing a "class" element.'));
		}
		classVar=Yii.imports(providerType,true);
		map=php.call_user_func([classVar,'actions']);
		return this.createActionFromMap(map,actionID,requestActionID,config);
	};
/**
 * Handles the request whose action is not recognized.
 * This method is invoked when the controller cannot find the requested action.
 * The default implementation simply throws an exception.
 * @param {String} actionID the missing action name
 * @throws {Yii.CHttpException} whenever this method is invoked
 */
Yii.CController.prototype.missingAction = function (actionID) {
		throw new Yii.CHttpException(404,Yii.t('yii','The system is unable to find the requested action "{action}".',
			{'{action}':actionID===''?this.defaultAction:actionID}));
	};
/**
 * @returns {Yii.CAction} the action currently being executed, null if no active action.
 */
Yii.CController.prototype.getAction = function () {
		return this._action;
	};
/**
 * @param {Yii.CAction} value the action currently being executed.
 */
Yii.CController.prototype.setAction = function (value) {
		this._action=value;
	};
/**
 * @returns {String} ID of the controller
 */
Yii.CController.prototype.getId = function () {
		return this._id;
	};
/**
 * @returns {String} the controller ID that is prefixed with the module ID (if any).
 * @since 1.0.3
 */
Yii.CController.prototype.getUniqueId = function () {
		return this._module ? this._module.getId()+'/'+this._id : this._id;
	};
/**
 * @returns {String} the route (module ID, controller ID and action ID) of the current request.
 * @since 1.1.0
 */
Yii.CController.prototype.getRoute = function () {
		var action;
		if((action=this.getAction())!==null) {
			return this.getUniqueId()+'/'+action.getId();
		}
		else {
			return this.getUniqueId();
		}
	};
/**
 * @returns {Yii.CWebModule} the module that this controller belongs to. It returns null
 * if the controller does not belong to any module
 * @since 1.0.3
 */
Yii.CController.prototype.getModule = function () {
		return this._module;
	};
/**
 * Returns the directory containing view files for this controller.
 * The default implementation returns 'protected/views/ControllerID'.
 * Child classes may override this method to use customized view path.
 * If the controller belongs to a module (since version 1.0.3), the default view path
 * is the {@link CWebModule::getViewPath module view path} appended with the controller ID.
 * @returns {String} the directory containing the view files for this controller. Defaults to 'protected/views/ControllerID'.
 */
Yii.CController.prototype.getViewPath = function () {
		var module;
		if((module=this.getModule())===null) {
			module=Yii.app();
		}
		return module.getViewPath()+'/'+this.getId();
	};
/**
 * Looks for the view file according to the given view name.
 * 
 * When a theme is currently active, this method will call {@link CTheme::getViewFile} to determine
 * which view file should be returned.
 * 
 * Otherwise, this method will return the corresponding view file based on the following criteria:
 * <ul>
 * <li>absolute view within a module: the view name starts with a single slash '/'.
 * In this case, the view will be searched for under the currently active module's view path.
 * If there is no active module, the view will be searched for under the application's view path.</li>
 * <li>absolute view within the application: the view name starts with double slashes '//'.
 * In this case, the view will be searched for under the application's view path.
 * This syntax has been available since version 1.1.3.</li>
 * <li>aliased view: the view name contains dots and refers to a path alias.
 * The view file is determined by calling {@link YiiBase::getPathOfAlias()}. Note that aliased views
 * cannot be themed because they can refer to a view file located at arbitrary places.</li>
 * <li>relative view: otherwise. Relative views will be searched for under the currently active
 * controller's view path.</li>
 * </ul>
 * 
 * After the view file is identified, this method may further call {@link CApplication::findLocalizedFile}
 * to find its localized version if internationalization is needed.
 * 
 * @param {String} viewName view name
 * @returns {String} the view file path, false if the view file does not exist
 * @see resolveViewFile
 * @see CApplication::findLocalizedFile
 */
Yii.CController.prototype.getViewFile = function (viewName) {
		var theme, viewFile, moduleViewPath, basePath, module;
		if((theme=Yii.app().getTheme())!==null && (viewFile=theme.getViewFile(this,viewName))!==false) {
			return viewFile;
		}
		moduleViewPath=basePath=Yii.app().getViewPath();
		if((module=this.getModule())!==null) {
			moduleViewPath=module.getViewPath();
		}
		return this.resolveViewFile(viewName,this.getViewPath(),basePath,moduleViewPath);
	};
/**
 * Looks for the layout view script based on the layout name.
 * 
 * The layout name can be specified in one of the following ways:
 * 
 * <ul>
 * <li>layout is false: returns false, meaning no layout.</li>
 * <li>layout is null: the currently active module's layout will be used. If there is no active module,
 * the application's layout will be used.</li>
 * <li>a regular view name.</li>
 * </ul>
 * 
 * The resolution of the view file based on the layout view is similar to that in {@link getViewFile}.
 * In particular, the following rules are followed:
 * 
 * Otherwise, this method will return the corresponding view file based on the following criteria:
 * <ul>
 * <li>When a theme is currently active, this method will call {@link CTheme::getLayoutFile} to determine
 * which view file should be returned.</li>
 * <li>absolute view within a module: the view name starts with a single slash '/'.
 * In this case, the view will be searched for under the currently active module's view path.
 * If there is no active module, the view will be searched for under the application's view path.</li>
 * <li>absolute view within the application: the view name starts with double slashes '//'.
 * In this case, the view will be searched for under the application's view path.
 * This syntax has been available since version 1.1.3.</li>
 * <li>aliased view: the view name contains dots and refers to a path alias.
 * The view file is determined by calling {@link YiiBase::getPathOfAlias()}. Note that aliased views
 * cannot be themed because they can refer to a view file located at arbitrary places.</li>
 * <li>relative view: otherwise. Relative views will be searched for under the currently active
 * module's layout path. In case when there is no active module, the view will be searched for
 * under the application's layout path.</li>
 * </ul>
 * 
 * After the view file is identified, this method may further call {@link CApplication::findLocalizedFile}
 * to find its localized version if internationalization is needed.
 * 
 * @param {Mixed} layoutName layout name
 * @returns {String} the view file for the layout. False if the view file cannot be found
 */
Yii.CController.prototype.getLayoutFile = function (layoutName) {
		var theme, layoutFile, module;
		if(layoutName===false) {
			return false;
		}
		if((theme=Yii.app().getTheme())!==null && (layoutFile=theme.getLayoutFile(this,layoutName))!==false) {
			return layoutFile;
		}
		if(php.empty(layoutName)) {
			module=this.getModule();
			while(module!==null) {
				if(module.layout===false) {
					return false;
				}
				if(!php.empty(module.layout)) {
					break;
				}
				module=module.getParentModule();
			}
			if(module===null) {
				module=Yii.app();
			}
			layoutName=module.layout;
		}
		else if((module=this.getModule())===null) {
			module=Yii.app();
		}
		return this.resolveViewFile(layoutName,module.getLayoutPath(),Yii.app().getViewPath(),module.getViewPath());
	};
/**
 * Finds a view file based on its name.
 * The view name can be in one of the following formats:
 * <ul>
 * <li>absolute view within a module: the view name starts with a single slash '/'.
 * In this case, the view will be searched for under the currently active module's view path.
 * If there is no active module, the view will be searched for under the application's view path.</li>
 * <li>absolute view within the application: the view name starts with double slashes '//'.
 * In this case, the view will be searched for under the application's view path.
 * This syntax has been available since version 1.1.3.</li>
 * <li>aliased view: the view name contains dots and refers to a path alias.
 * The view file is determined by calling {@link YiiBase::getPathOfAlias()}. Note that aliased views
 * cannot be themed because they can refer to a view file located at arbitrary places.</li>
 * <li>relative view: otherwise. Relative views will be searched for under the currently active
 * controller's view path.</li>
 * </ul>
 * For absolute view and relative view, the corresponding view file is a PHP file
 * whose name is the same as the view name. The file is located under a specified directory.
 * This method will call {@link CApplication::findLocalizedFile} to search for a localized file, if any.
 * @param {String} viewName the view name
 * @param {String} viewPath the directory that is used to search for a relative view name
 * @param {String} basePath the directory that is used to search for an absolute view name under the application
 * @param {String} moduleViewPath the directory that is used to search for an absolute view name under the current module.
 * If this is not set, the application base view path will be used.
 * @returns {Mixed} the view file path. False if the view file does not exist.
 * @since 1.0.3
 */
Yii.CController.prototype.resolveViewFile = function (viewName, viewPath, basePath, moduleViewPath) {
		var renderer, extension, viewFile;
		if (moduleViewPath === undefined) {
			moduleViewPath = null;
		}
		if(php.empty(viewName)) {
			return false;
		}
		if(moduleViewPath===null) {
			moduleViewPath=basePath;
		}
		extension='.js';
		
		if(viewName[0]==='/') {
			if(php.strncmp(viewName,'//',2)===0) {
				viewFile=basePath+viewName.slice(1);
			}
			else {
				viewFile=moduleViewPath+viewName;
			}
		}
		else if(php.strpos(viewName,'.')) {
			viewFile=Yii.getPathOfAlias(viewName);
		}
		else {
			viewFile=viewPath+'/'+viewName;
		}
		return Yii.app().findLocalizedFile(viewFile+extension);
		
		
	};
/**
 * Returns the list of clips.
 * A clip is a named piece of rendering result that can be
 * inserted at different places.
 * @returns {Yii.CMap} the list of clips
 * @see CClipWidget
 */
Yii.CController.prototype.getClips = function () {
		if(this._clips!==null) {
			return this._clips;
		}
		else {
			return (this._clips=new Yii.CMap());
		}
	};
/**
 * Processes the request using another controller action.
 * This is like {@link redirect}, but the user browser's URL remains unchanged.
 * In most cases, you should call {@link redirect} instead of this method.
 * @param {String} route the route of the new controller action. This can be an action ID, or a complete route
 * with module ID (optional in the current module), controller ID and action ID. If the former, the action is assumed
 * to be located within the current controller.
 * @param {Boolean} exit whether to end the application after this call. Defaults to true.
 * @since 1.1.0
 */
Yii.CController.prototype.forward = function (route, exit) {
		var module;
		if (exit === undefined) {
			exit = true;
		}
		if(php.strpos(route,'/')===false) {
			this.run(route);
		}
		else
		{
			if(route[0]!=='/' && (module=this.getModule())!==null) {
				route=module.getId()+'/'+route;
			}
			
			Yii.app().runController(route);
		}
		if(exit) {
			Yii.app().end();
		}
	};
/**
 * Renders a view with a layout.
 * 
 * This method first calls {@link renderPartial} to render the view (called content view).
 * It then renders the layout view which may embed the content view at appropriate place.
 * In the layout view, the content view rendering result can be accessed via variable
 * <code>$content</code>. At the end, it calls {@link processOutput} to insert scripts
 * and dynamic contents if they are available.
 * 
 * By default, the layout view script is "protected/views/layouts/main.php".
 * This may be customized by changing {@link layout}.
 * 
 * @param {String} view name of the view to be rendered. See {@link getViewFile} for details
 * about how the view script is resolved.
 * @param {Array} data data to be extracted into PHP variables and made available to the view script
 * @param {Boolean} returnVar whether the rendering result should be returned instead of being displayed to end users.
 * @returns {String} the rendering result. Null if the rendering result is not required.
 * @see renderPartial
 * @see getLayoutFile
 */
Yii.CController.prototype.render = function (viewAlias, data, callback) {
		var viewFile, self = this;
		if (data === undefined) {
			data = null;
		}
		
		if((viewFile=this.getViewFile(viewAlias))!==false) {
			return Yii.CView.prototype.load(viewFile, function (view) {
				if (typeof data === "object") {
					Yii.forEach(data, function (name, value) {
						view[name] = value;
					});
					if (self.beforeRender(view)) {
						view.render(function(html) {
							self.afterRender(view, html);
							Yii.app().getClientScript().render();
							return callback.apply(view, arguments);
						});
					}
				}
			});
		}
		else {
			throw new Yii.CException(Yii.t('yii','{controller} cannot find the requested view "{view}".',
				{'{controller}':php.get_class(this), '{view}':view}));
		}
	};
/**
 * This method is invoked at the beginning of {@link render()}.
 * You may override this method to do some preprocessing when rendering a view.
 * @param {String} view the view to be rendered
 * @returns {Boolean} whether the view should be rendered.
 * @since 1.1.5
 */
Yii.CController.prototype.beforeRender = function (view) {
		return true;
	};
/**
 * This method is invoked after the specified is rendered by calling {@link render()}.
 * Note that this method is invoked BEFORE {@link processOutput()}.
 * You may override this method to do some postprocessing for the view rendering.
 * @param {String} view the view that has been rendered
 * @param {String} output the rendering result of the view. Note that this parameter is passed
 * as a reference. That means you can modify it within this method.
 * @since 1.1.5
 */
Yii.CController.prototype.afterRender = function (view, output) {
	};
/**
 * Renders a static text string.
 * The string will be inserted in the current controller layout and returned back.
 * @param {String} text the static text string
 * @param {Boolean} returnVar whether the rendering result should be returned instead of being displayed to end users.
 * @returns {String} the rendering result. Null if the rendering result is not required.
 * @see getLayoutFile
 */
Yii.CController.prototype.renderText = function (text, returnVar) {
		var layoutFile;
		if (returnVar === undefined) {
			returnVar = false;
		}
		if((layoutFile=this.getLayoutFile(this.layout))!==false) {
			text=this.renderFile(layoutFile,{'content':text},true);
		}
		text=this.processOutput(text);
		if(returnVar) {
			return text;
		}
		else {
			$("body").append(text);
		}
	};
/**
 * Renders a view.
 * 
 * The named view refers to a PHP script (resolved via {@link getViewFile})
 * that is included by this method. If $data is an associative array,
 * it will be extracted as PHP variables and made available to the script.
 * 
 * This method differs from {@link render()} in that it does not
 * apply a layout to the rendered result. It is thus mostly used
 * in rendering a partial view, or an AJAX response.
 * 
 * @param {String} view name of the view to be rendered. See {@link getViewFile} for details
 * about how the view script is resolved.
 * @param {Array} data data to be made available to the view
 * @param {Function} callback The callback to execute with the rendering result
 * @returns {String} the rendering result. Null if the rendering result is not required.
 * @throws {Yii.CException} if the view does not exist
 * @see getViewFile
 * @see processOutput
 * @see render
 */
Yii.CController.prototype.renderPartial = function (viewAlias, data, callback, processOutput) {
		var viewFile, func;
		if (data === undefined) {
			data = null;
		}
		if (processOutput === undefined) {
			processOutput = false;
		}
		func = function() {
			if (processOutput) {
				Yii.app().getClientScript().render();
			}
			callback.apply(this, arguments);
		};
		if((viewFile=this.getViewFile(viewAlias))!==false) {
			return Yii.CView.prototype.load(viewFile, function (view) {
				if (typeof data === "object") {
					Yii.forEach(data, function (name, value) {
						view[name] = value;
					});
					view.renderPartial(func);
				}
			});
		}
		else {
			throw new Yii.CException(Yii.t('yii','{controller} cannot find the requested view "{view}".',
				{'{controller}':php.get_class(this), '{view}':view}));
		}
	};

/**
 * Creates a relative URL for the specified action defined in this controller.
 * @param {String} route the URL route. This should be in the format of 'ControllerID/ActionID'.
 * If the ControllerID is not present, the current controller ID will be prefixed to the route.
 * If the route is empty, it is assumed to be the current action.
 * Since version 1.0.3, if the controller belongs to a module, the {@link CWebModule::getId module ID}
 * will be prefixed to the route. (If you do not want the module ID prefix, the route should start with a slash '/'.)
 * @param {Array} params additional GET parameters (name=>value). Both the name and value will be URL-encoded.
 * If the name is '#', the corresponding value will be treated as an anchor
 * and will be appended at the end of the URL. This anchor feature has been available since version 1.0.1.
 * @param {String} ampersand the token separating name-value pairs in the URL.
 * @returns {String} the constructed URL
 */
Yii.CController.prototype.createUrl = function (route, params, ampersand) {
		var module;
		if (params === undefined) {
			params = [];
		}
		if (ampersand === undefined) {
			ampersand = '&';
		}
		if(route==='') {
			route=this.getId()+'/'+this.getAction().getId();
		}
		else if(php.strpos(route,'/')===false) {
			route=this.getId()+'/'+route;
		}
		if(route[0]!=='/' && (module=this.getModule())!==null) {
			route=module.getId()+'/'+route;
		}
		return Yii.app().createUrl(php.trim(route,'/'),params,ampersand);
	};
/**
 * Creates an absolute URL for the specified action defined in this controller.
 * @param {String} route the URL route. This should be in the format of 'ControllerID/ActionID'.
 * If the ControllerPath is not present, the current controller ID will be prefixed to the route.
 * If the route is empty, it is assumed to be the current action.
 * @param {Array} params additional GET parameters (name=>value). Both the name and value will be URL-encoded.
 * @param {String} schema schema to use (e.g. http, https). If empty, the schema used for the current request will be used.
 * @param {String} ampersand the token separating name-value pairs in the URL.
 * @returns {String} the constructed URL
 */
Yii.CController.prototype.createAbsoluteUrl = function (route, params, schema, ampersand) {
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
			return Yii.app().getRequest().getHostInfo(schema)+url;
		}
	};
/**
 * @returns {String} the page title. Defaults to the controller name and the action name.
 */
Yii.CController.prototype.getPageTitle = function () {
		var name;
		if(this._pageTitle!==null) {
			return this._pageTitle;
		}
		else {
			name=php.ucfirst(php.basename(this.getId()));
			if(this.getAction()!==null && php.strcasecmp(this.getAction().getId(),this.defaultAction)) {
				return (this._pageTitle=Yii.app().name+' - '+php.ucfirst(this.getAction().getId())+' '+name);
			}
			else {
				return (this._pageTitle=Yii.app().name+' - '+name);
			}
		}
	};
/**
 * @param {String} value the page title.
 */
Yii.CController.prototype.setPageTitle = function (value) {
		this._pageTitle=value;
		document.title = value;
	};
/**
 * Redirects the browser to the specified URL or route (controller/action).
 * @param {Mixed} url the URL to be redirected to. If the parameter is an array,
 * the first element must be a route to a controller action and the rest
 * are GET parameters in name-value pairs.
 * @param {Boolean} terminate whether to terminate the current application after calling this method
 * @param {Integer} statusCode the HTTP status code. Defaults to 302. See {@link http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html}
 * for details about HTTP status code. This parameter has been available since version 1.0.4.
 */
Yii.CController.prototype.redirect = function (url, terminate, statusCode) {
		var route;
		if (terminate === undefined) {
			terminate = true;
		}
		if (statusCode === undefined) {
			statusCode = 302;
		}
		if(Object.prototype.toString.call(url) === '[object Array]')
		{
			route=url[0] !== undefined ? url[0] : '';
			url=this.createUrl(route,php.array_splice(url,1));
		}
		Yii.app().getRequest().redirect(url,terminate,statusCode);
	};
/**
 * Refreshes the current page.
 * The effect of this method call is the same as user pressing the
 * refresh button on the browser (without post data).
 * @param {Boolean} terminate whether to terminate the current application after calling this method
 * @param {String} anchor the anchor that should be appended to the redirection URL.
 * Defaults to empty. Make sure the anchor starts with '#' if you want to specify it.
 * The parameter has been available since version 1.0.7.
 */
Yii.CController.prototype.refresh = function (terminate, anchor) {
		if (terminate === undefined) {
			terminate = true;
		}
		if (anchor === undefined) {
			anchor = '';
		}
		this.redirect(Yii.app().getRequest().getUrl()+anchor,terminate);
	};
/**
 * Records a method call when an output cache is in effect.
 * When the content is served from the output cache, the recorded
 * method will be re-invoked.
 * @param {String} context a property name of the controller. It refers to an object
 * whose method is being called. If empty it means the controller itself.
 * @param {String} method the method name
 * @param {Array} params parameters passed to the method
 * @see COutputCache
 */
Yii.CController.prototype.recordCachingAction = function (context, method, params) {
		var i, cache;
		if(this._cachingStack) {// record only when there is an active output cache
			for (i in this._cachingStack) {
				if (this._cachingStack.hasOwnProperty(i)) {
					cache = this._cachingStack[i];
					cache.recordAction(context,method,params);
				}
			}
		}
	};
/**
 * @param {Boolean} createIfNull whether to create a stack if it does not exist yet. Defaults to true.
 * @returns {Yii.CStack} stack of {@link COutputCache} objects
 */
Yii.CController.prototype.getCachingStack = function (createIfNull) {
		if (createIfNull === undefined) {
			createIfNull = true;
		}
		if(!this._cachingStack) {
			this._cachingStack=new Yii.CStack();
		}
		return this._cachingStack;
	};
/**
 * Returns whether the caching stack is empty.
 * @returns {Boolean} whether the caching stack is empty. If not empty, it means currently there are
 * some output cache in effect. Note, the return result of this method may change when it is
 * called in different output regions, depending on the partition of output caches.
 * @since 1.0.5
 */
Yii.CController.prototype.isCachingStackEmpty = function () {
		return this._cachingStack===null || !this._cachingStack.getCount();
	};
/**
 * This method is invoked right before an action is to be executed (after all possible filters.)
 * You may override this method to do last-minute preparation for the action.
 * @param {Yii.CAction} action the action to be executed.
 * @returns {Boolean} whether the action should be executed.
 */
Yii.CController.prototype.beforeAction = function (action) {
		return true;
	};
/**
 * This method is invoked right after an action is executed.
 * You may override this method to do some postprocessing for the action.
 * @param {Yii.CAction} action the action just executed.
 */
Yii.CController.prototype.afterAction = function (action) {
	};
/**
 * The filter method for 'postOnly' filter.
 * This filter reports an error if the applied action is receiving a non-POST request.
 * @param {Yii.CFilterChain} filterChain the filter chain that the filter is on.
 * @throws {Yii.CHttpException} if the current request is not a POST request
 */
Yii.CController.prototype.filterPostOnly = function (filterChain) {
		if(Yii.app().getRequest().getIsPostRequest()) {
			filterChain.run();
		}
		else {
			throw new Yii.CHttpException(400,Yii.t('yii','Your request is not valid.'));
		}
	};
/**
 * The filter method for 'ajaxOnly' filter.
 * This filter reports an error if the applied action is receiving a non-AJAX request.
 * @param {Yii.CFilterChain} filterChain the filter chain that the filter is on.
 * @throws {Yii.CHttpException} if the current request is not an AJAX request.
 */
Yii.CController.prototype.filterAjaxOnly = function (filterChain) {
		if(Yii.app().getRequest().getIsAjaxRequest()) {
			filterChain.run();
		}
		else {
			throw new Yii.CHttpException(400,Yii.t('yii','Your request is not valid.'));
		}
	};
/**
 * The filter method for 'accessControl' filter.
 * This filter is a wrapper of {@link CAccessControlFilter}.
 * To use this filter, you must override {@link accessRules} method.
 * @param {Yii.CFilterChain} filterChain the filter chain that the filter is on.
 */
Yii.CController.prototype.filterAccessControl = function (filterChain) {
		var filter;
		filter=new Yii.CAccessControlFilter();
		filter.setRules(this.accessRules());
		filter.filter(filterChain);
	};

/**
 * Returns a persistent page state value.
 * A page state is a variable that is persistent across POST requests of the same page.
 * In order to use persistent page states, the form(s) must be stateful
 * which are generated using {@link CHtml::statefulForm}.
 * @param {String} name the state name
 * @param {Mixed} defaultValue the value to be returned if the named state is not found
 * @returns {Mixed} the page state value
 * @see setPageState
 * @see CHtml::statefulForm
 */
Yii.CController.prototype.getPageState = function (name, defaultValue) {
		if (defaultValue === undefined) {
			defaultValue = null;
		}
		if(this._pageStates===null) {
			this._pageStates=this.loadPageStates();
		}
		return this._pageStates[name] !== undefined?this._pageStates[name]:defaultValue;
	};
/**
 * Saves a persistent page state value.
 * A page state is a variable that is persistent across POST requests of the same page.
 * In order to use persistent page states, the form(s) must be stateful
 * which are generated using {@link CHtml::statefulForm}.
 * @param {String} name the state name
 * @param {Mixed} value the page state value
 * @param {Mixed} defaultValue the default page state value. If this is the same as
 * the given value, the state will be removed from persistent storage.
 * @see getPageState
 * @see CHtml::statefulForm
 */
Yii.CController.prototype.setPageState = function (name, value, defaultValue) {
		var params;
		if (defaultValue === undefined) {
			defaultValue = null;
		}
		if(this._pageStates===null) {
			this._pageStates=this.loadPageStates();
		}
		if(value===defaultValue) {
			delete this._pageStates[name];
		}
		else {
			this._pageStates[name]=value;
		}
		params=arguments;
		this.recordCachingAction('','setPageState',params);
	};
/**
 * Removes all page states.
 */
Yii.CController.prototype.clearPageStates = function () {
		this._pageStates=[];
	};
/**
 * Loads page states from a hidden input.
 * @returns {Object} the loaded page states
 */
Yii.CController.prototype.loadPageStates = function () {
		
		return {};
	};
/**
 * Saves page states as a base64 string.
 * @param {Array} states the states to be saved.
 * @param {String} output the output to be modified. 
 * @returns {String} the modified output
 */
Yii.CController.prototype.savePageStates = function (states, output) {
		var data, value;
		data=Yii.app().getSecurityManager().hashData(Yii.CJSON.encode(states));
		
		value=php.base64_encode(data);
		return php.str_replace(Yii.CHtml.pageStateField(''),Yii.CHtml.pageStateField(value),output);
};