/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CModule is the base class for module and application classes.
 * 
 * CModule mainly manages application components and sub-modules.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CModule.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.base
 * @since 1.0.4
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CModule = function CModule (id, parent, config) {
	if (id !== false) {
		this.models = {};
		this.views = {};
		this.controllers = {};
		
		this.construct(id, parent, config);
	}
};
Yii.CModule.prototype = new Yii.CComponent();
Yii.CModule.prototype.constructor =  Yii.CModule;
/**
 * @var {Array} the IDs of the application components that should be preloaded.
 */
Yii.CModule.prototype.preload = [];
/**
 * @var {Array} the behaviors that should be attached to the module.
 * The behaviors will be attached to the module when {@link init} is called.
 * Please refer to {@link CModel::behaviors} on how to specify the value of this property.
 */
Yii.CModule.prototype.behaviors = {};
Yii.CModule.prototype._id = null;
Yii.CModule.prototype._parentModule = null;
Yii.CModule.prototype._basePath = null;
Yii.CModule.prototype._modulePath = null;
Yii.CModule.prototype._params = null;
Yii.CModule.prototype._modules = {};
Yii.CModule.prototype._moduleConfig = {};
Yii.CModule.prototype._components = {};
Yii.CModule.prototype._componentConfig = {};
/**
 * jQuery events to delegate for this module.
 * Array should be of the following format:
 * <pre>
 * [
 * 	['#selector a.someLink', 'click', function (e) { alert("clicked!")}],
 * 	['#selector form', 'submit', function (e) { alert('Submitted!'); e.preventDefault(); }]
 * ] 
 * </pre>
 * These events will be bound to their selectors when the module is run
 * @var Array
 */
Yii.CModule.prototype.delegates = [];

/**
 * Holds a list of models belonging to this module
 */
Yii.CModule.prototype.models = {};
/**
 * Holds a list of views belonging to this module
 */
Yii.CModule.prototype.views = {};
/**
 * Holds a list of controllers belonging to this module
 */
Yii.CModule.prototype.controllers = {};
/**
 * Constructor.
 * @param {String} id the ID of this module
 * @param {Yii.CModule} parent the parent module (if any)
 * @param {Mixed} config the module configuration. It can be either an array or
 * the path of a PHP file returning the configuration array.
 */
Yii.CModule.prototype.construct = function (id, parent, config) {
		if (config === undefined) {
			config = {};
		}
		this._id=id;
		this._parentModule=parent;
		// set basePath at early as possible to avoid trouble
		
		if(config.basePath !== undefined) {
			this.setBasePath(config.basePath);
			delete config.basePath;
		}
		Yii.setPathOfAlias(id,this.getBasePath());
		this.preinit();
		this.configure(config);
		this.attachBehaviors(this.behaviors);
		this.preloadComponents();
		this.init();
	};
/**
 * Getter magic method.
 * This method is overridden to support accessing application components
 * like reading module properties.
 * @param {String} name application component or property name
 * @returns {Mixed} the named property value
 */
Yii.CModule.prototype.get = function (name) {
		if(this.hasComponent(name)) {
			return this.getComponent(name);
		}
		else {
			return Yii.CComponent.prototype.get.call(this, name);
		}
	};



/**
 * Checks if a property value is null.
 * This method overrides the parent implementation by checking
 * if the named application component is loaded.
 * @param {String} name the property name or the event name
 * @returns {Boolean} whether the property value is null
 */
Yii.CModule.prototype.isset = function (name) {
		if(this.hasComponent(name)) {
			return this.getComponent(name)!==null;
		}
		else {
			return Yii.CComponent.prototype.isset.call(this, name);
		}
	};
/**
 * Returns the module ID.
 * @returns {String} the module ID.
 */
Yii.CModule.prototype.getId = function () {
		return this._id;
	};
/**
 * Sets the module ID.
 * @param {String} id the module ID
 */
Yii.CModule.prototype.setId = function (id) {
		this._id=id;
	};
/**
 * Returns the root directory of the module.
 * @returns {String} the root directory of the module. Defaults to the directory containing the module class.
 */
Yii.CModule.prototype.getBasePath = function () {
		var classVar;
		if(this._basePath===null) {
			classVar=new ReflectionClass(php.get_class(this));
			this._basePath=php.dirname(classVar.getFileName());
		}
		return this._basePath;
	};
/**
 * Sets the root directory of the module.
 * This method can only be invoked at the beginning of the constructor.
 * @param {String} path the root directory of the module.
 */
Yii.CModule.prototype.setBasePath = function (path) {
		this._basePath=path;
	};
/**
 * Returns user-defined parameters.
 * @returns {Yii.CAttributeCollection} the list of user-defined parameters
 */
Yii.CModule.prototype.getParams = function () {
		if(this._params!==null) {
			return this._params;
		}
		else
		{
			this._params=new Yii.CAttributeCollection();
			this._params.caseSensitive=true;
			return this._params;
		}
	};
/**
 * Sets user-defined parameters.
 * @param {Array} value user-defined parameters. This should be in name-value pairs.
 */
Yii.CModule.prototype.setParams = function (value) {
		var params, k, v;
		params=this.getParams();
		for (k in value) {
			if (value.hasOwnProperty(k)) {
				v = value[k];
				params.add(k,v);
			}
		}
	};
/**
 * Returns the directory that contains the application modules.
 * @returns {String} the directory that contains the application modules. Defaults to the 'modules' subdirectory of {@link basePath}.
 */
Yii.CModule.prototype.getModulePath = function () {
		if(this._modulePath!==null) {
			return this._modulePath;
		}
		else {
			return (this._modulePath=this.getBasePath()+"/"+'modules');
		}
	};
/**
 * Sets the directory that contains the application modules.
 * @param {String} value the directory that contains the application modules.
 */
Yii.CModule.prototype.setModulePath = function (value) {
		this._modulePath = value;
		
	};
/**
 * Sets the aliases that are used in the module.
 * @param {Array} aliases list of aliases to be imported
 */
Yii.CModule.prototype.setImport = function (aliases) {
		var i, alias;
		for (i in aliases) {
			if (aliases.hasOwnProperty(i)) {
				alias = aliases[i];
				Yii.imports(alias);
			}
		}
	};
/**
 * Defines the root aliases.
 * @param {Array} mappings list of aliases to be defined. The array keys are root aliases,
 * while the array values are paths or aliases corresponding to the root aliases.
 * For example,
 * <pre>
 * {
 *    'models':'application.models',              // an existing alias
 *    'extensions':'application.extensions',      // an existing alias
 *    'backend':php.dirname(__FILE__)+'/../backend',  // a directory
 * }
 * </pre>
 * @since 1.0.5
 */
Yii.CModule.prototype.setAliases = function (mappings) {
		var path, alias, name;
		for (name in mappings) {
			if (mappings.hasOwnProperty(name)) {
				alias = mappings[name];
				if((path=Yii.getPathOfAlias(alias))!==false) {
					Yii.setPathOfAlias(name,path);
				}
				else {
					Yii.setPathOfAlias(name,alias);
				}
			}
		}
	};
/**
 * Returns the parent module.
 * @returns {Yii.CModule} the parent module. Null if this module does not have a parent.
 */
Yii.CModule.prototype.getParentModule = function () {
		return this._parentModule;
	};
/**
 * Retrieves the named application module.
 * The module has to be declared in {@link modules}. A new instance will be created
 * when calling this method with the given ID for the first time.
 * @param {String} id application module ID (case-sensitive)
 * @returns {Yii.CModule} the module instance, null if the module is disabled or does not exist.
 */
Yii.CModule.prototype.getModule = function (id) {
		var config, classVar, module;
		if(this._modules[id] !== undefined) {
			return this._modules[id];
		}
		else if(this._moduleConfig[id] !== undefined) {
			config=this._moduleConfig[id];
			if(config.enabled === undefined || config.enabled) {
				Yii.trace("Loading \"" + id + "\" module",'system.base.CModule');
				classVar=config['class'];
				delete config['class'];
				if(this===Yii.app()) {
					module=Yii.createComponent(classVar,id,null,config);
				}
				else {
					module=Yii.createComponent(classVar,this.getId()+'/'+id,this,config);
				}
				return (this._modules[id]=module);
			}
		}
	};
/**
 * Returns a value indicating whether the specified module is installed.
 * @param {String} id the module ID
 * @returns {Boolean} whether the specified module is installed.
 * @since 1.1.2
 */
Yii.CModule.prototype.hasModule = function (id) {
		return this._moduleConfig[id] !== undefined || this._modules[id] !== undefined;
	};
/**
 * Returns the configuration of the currently installed modules.
 * @returns {Array} the configuration of the currently installed modules (module ID => configuration)
 */
Yii.CModule.prototype.getModules = function () {
		return this._moduleConfig;
	};
/**
 * Configures the sub-modules of this module.
 * 
 * Call this method to declare sub-modules and configure them with their initial property values.
 * The parameter should be an array of module configurations. Each array element represents a single module,
 * which can be either a string representing the module ID or an ID-configuration pair representing
 * a module with the specified ID and the initial property values.
 * 
 * For example, the following array declares two modules:
 * <pre>
 * {
 *     'admin',                // a single module ID
 *     'payment':{       // ID-configuration pair
 *         'server':'paymentserver.com',
 *     },
 * }
 * </pre>
 * 
 * By default, the module class is determined using the expression <code>ucfirst($moduleID).'Module'</code>.
 * And the class file is located under <code>modules/$moduleID</code>.
 * You may override this default by explicitly specifying the 'class' option in the configuration.
 * 
 * You may also enable or disable a module by specifying the 'enabled' option in the configuration.
 * 
 * @param {Array} modules module configurations.
 */
Yii.CModule.prototype.setModules = function (modules) {
		var id, module;
		for (id in modules) {
			if (modules.hasOwnProperty(id)) {
				module = modules[id];
				if(php.is_int(id)) {
					id=module;
					module={};
				}
				if(module['class'] === undefined) {
					Yii.setPathOfAlias(id,this.getModulePath()+"/"+id);
					module['class'] = id+'.'+php.ucfirst(id)+'Module';
				}
				if(this._moduleConfig[id] !== undefined) {
					this._moduleConfig[id]=Yii.CMap.mergeArray(this._moduleConfig[id],module);
				}
				else {
					this._moduleConfig[id]=module;
				}
			}
		}
	};
/**
 * Checks whether the named component exists.
 * @param {String} id application component ID
 * @returns {Boolean} whether the named application component exists (including both loaded and disabled.)
 */
Yii.CModule.prototype.hasComponent = function (id) {
		return this._components[id] !== undefined || this._componentConfig[id] !== undefined;
	};
/**
 * Retrieves the named application component.
 * @param {String} id application component ID (case-sensitive)
 * @param {Boolean} createIfNull whether to create the component if it doesn't exist yet. This parameter
 * has been available since version 1.0.6.
 * @returns {CApplicationComponent} the application component instance, null if the application component is disabled or does not exist.
 * @see hasComponent
 */
Yii.CModule.prototype.getComponent = function (id, createIfNull) {
		var config, component;
		if (createIfNull === undefined) {
			createIfNull = true;
		}
		if(this._components[id] !== undefined) {
			return this._components[id];
		}
		else if(this._componentConfig[id] !== undefined && createIfNull) {
			config=this._componentConfig[id];
			if(config.enabled === undefined || config.enabled) {
				Yii.trace("Loading \"" + id + "\" application component",'system.CModule');
				
				delete config.enabled;
				component=Yii.createComponent(config);
				
				component.init();
				return (this._components[id]=component);
			}
		}
		
	};
/**
 * Puts a component under the management of the module.
 * The component will be initialized by calling its {@link CApplicationComponent::init() init()}
 * method if it has not done so.
 * @param {String} id component ID
 * @param {CApplicationComponent} component the component to be added to the module.
 * If this parameter is null, it will unload the component from the module.
 */
Yii.CModule.prototype.setComponent = function (id, component) {
		if(component===null) {
			delete this._components[id];
		}
		else {
			this._components[id]=component;
			if(!component.getIsInitialized()) {
				component.init();
			}
		}
	};
/**
 * Returns the application components.
 * @param {Boolean} loadedOnly whether to return the loaded components only. If this is set false,
 * then all components specified in the configuration will be returned, whether they are loaded or not.
 * Loaded components will be returned as objects, while unloaded components as configuration arrays.
 * This parameter has been available since version 1.1.3.
 * @returns {Array} the application components (indexed by their IDs)
 */
Yii.CModule.prototype.getComponents = function (loadedOnly) {
		if (loadedOnly === undefined) {
			loadedOnly = true;
		}
		if(loadedOnly) {
			return this._components;
		}
		else {
			return php.array_merge(this._componentConfig, this._components);
		}
	};
/**
 * Sets the application components.
 * 
 * When a configuration is used to specify a component, it should consist of
 * the component's initial property values (name-value pairs). Additionally,
 * a component can be enabled (default) or disabled by specifying the 'enabled' value
 * in the configuration.
 * 
 * If a configuration is specified with an ID that is the same as an existing
 * component or configuration, the existing one will be replaced silently.
 * 
 * The following is the configuration for two components:
 * <pre>
 * {
 *     'db':{
 *         'class':'CDbConnection',
 *         'connectionString':'sqlite:path/to/file.db',
 *     },
 *     'cache':{
 *         'class':'CDbCache',
 *         'connectionID':'db',
 *         'enabled':!YII_DEBUG,  // enable caching in non-debug mode
 *     ),
 * }
 * </pre>
 * 
 * @param {Array} components application components(id=>component configuration or instances)
 * @param {Boolean} merge whether to merge the new component configuration with the existing one.
 * Defaults to true, meaning the previously registered component configuration of the same ID
 * will be merged with the new configuration. If false, the existing configuration will be replaced completely.
 */
Yii.CModule.prototype.setComponents = function (components, merge) {
		var component, id;
		if (merge === undefined) {
			merge = true;
		}
		for (id in components) {
			if (components.hasOwnProperty(id)) {
				component = components[id];
				if(component instanceof Yii.CApplicationComponent) {
					this.setComponent(id,component);
				}
				else if(this._componentConfig[id] !== undefined && merge) {
					this._componentConfig[id]=Yii.CMap.prototype.mergeArray(this._componentConfig[id],component);
				}
				else {
					this._componentConfig[id]=component;
				}
			}
		}
	};
/**
 * Configures the module with the specified configuration.
 * @param {Array} config the configuration array
 */
Yii.CModule.prototype.configure = function (config) {
		var key, value;
		if(typeof config === 'object')	{
			for (key in config) {
				if (config.hasOwnProperty(key)) {
					value = config[key];
					this.set(key,value);
				}
			}
		}
	};
/**
 * Loads static application components.
 */
Yii.CModule.prototype.preloadComponents = function () {
		var i, id;
		for (i in this.preload) {
			if (this.preload.hasOwnProperty(i)) {
				id = this.preload[i];
				this.getComponent(id);
			}
		}
	};
/**
 * Preinitializes the module.
 * This method is called at the beginning of the module constructor.
 * You may override this method to do some customized preinitialization work.
 * Note that at this moment, the module is not configured yet.
 * @see init
 */
Yii.CModule.prototype.preinit = function () {
	};
/**
 * Initializes the module.
 * This method is called at the end of the module constructor.
 * Note that at this moment, the module has been configured, the behaviors
 * have been attached and the application components have been registered.
 * @see preinit
 */
Yii.CModule.prototype.init = function () {
	Yii.forEach(this.delegates, function(i, item) {
		jQuery("body").undelegate(item[0], item[1]).delegate(item[0], item[1], item[2]);
	});
};