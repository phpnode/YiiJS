/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CComponent is the base class for all components.
 * 
 * CComponent implements the protocol of defining, using properties and events.
 * 
 * A property is defined by a getter method, and/or a setter method.
 * Properties can be accessed in the way like accessing normal object members.
 * Reading or writing a property will cause the invocation of the corresponding
 * getter or setter method, e.g
 * <pre>
 * a=component.text;     // equivalent to $a=$component->getText();
 * component.text='abc';  // equivalent to $component->setText('abc');
 * </pre>
 * The signatures of getter and setter methods are as follows,
 * <pre>
 * // getter, defines a readable property 'text'
 * public function getText() { +++ }
 * // setter, defines a writable property 'text' with $value to be set to the property
 * public function setText(value) { +++ }
 * </pre>
 * 
 * An event is defined by the presence of a method whose name starts with 'on'.
 * The event name is the method name. When an event is raised, functions
 * (called event handlers) attached to the event will be invoked automatically.
 * 
 * An event can be raised by calling {@link raiseEvent} method, upon which
 * the attached event handlers will be invoked automatically in the order they
 * are attached to the event. Event handlers must have the following signature,
 * <pre>
 * function eventHandler(event) { +++ }
 * </pre>
 * where $event includes parameters associated with the event.
 * 
 * To attach an event handler to an event, see {@link attachEventHandler}.
 * You can also use the following syntax:
 * <pre>
 * component.onClick=callback;    // or $component->onClick->add($callback);
 * </pre>
 * where $callback refers to a valid PHP callback. Below we show some callback examples:
 * <pre>
 * 'handleOnClick'                   // handleOnClick() is a global function
 * [object,'handleOnClick']    // using $object->handleOnClick()
 * ['Page','handleOnClick']     // using Page::handleOnClick()
 * </pre>
 * 
 * To raise an event, use {@link raiseEvent}. The on-method defining an event is
 * commonly written like the following:
 * <pre>
 * public function onClick(event)
 * {
 *     this.raiseEvent('onClick',event);
 * }
 * </pre>
 * where <code>$event</code> is an instance of {@link CEvent} or its child class.
 * One can then raise the event by calling the on-method instead of {@link raiseEvent} directly.
 * 
 * Both property names and event names are case-insensitive.
 * 
 * Starting from version 1.0.2, CComponent supports behaviors. A behavior is an
 * instance of {@link IBehavior} which is attached to a component. The methods of
 * the behavior can be invoked as if they belong to the component. Multiple behaviors
 * can be attached to the same component.
 * 
 * To attach a behavior to a component, call {@link attachBehavior}; and to detach the behavior
 * from the component, call {@link detachBehavior}.
 * 
 * A behavior can be temporarily enabled or disabled by calling {@link enableBehavior}
 * or {@link disableBehavior}, respectively. When disabled, the behavior methods cannot
 * be invoked via the component.
 * 
 * Starting from version 1.1.0, a behavior's properties (either its public member variables or
 * its properties defined via getters and/or setters) can be accessed through the component it
 * is attached to.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CComponent.php 3066 2011-03-13 14:22:55Z qiang.xue $
 * @package system.base
 * @since 1.0
 * @author Charles Pick
 * @class
 */
Yii.CComponent = function CComponent() {
};
Yii.CComponent.prototype._e = null;
Yii.CComponent.prototype._m = null;
/**
 * Gets the class name for this item.
 * Since JavaScript doesn't really support this we 
 * abuse function declarations to implement it,
 * for example instead of:
 * <pre>
 * Yii.Blah = function() { ... }
 * </pre>
 * we use:
 * <pre>
 * Yii.Blah = function Blah() { ... }
 * </pre>
 * We can now retrieve the name of the class by inspecting the constructor.
 */
Yii.CComponent.prototype.getClassName = function() {
	var matches, className;
	
	matches = /function(.*)\((.*)\)/.exec((this).constructor);
	if (matches) {
		return php.trim(matches[1]);
	}
};
/**
 * Returns a property value, an event handler list or a behavior based on its name.
 * Do not call this method. This is a PHP magic method that we override
 * to allow using the following syntax to read a property or obtain event handlers:
 * <pre>
 * value=component.propertyName;
 * handlers=component.eventName;
 * </pre>
 * @param {String} name the property name or event name
 * @returns {Mixed} the property value, event handlers attached to the event, or the named behavior (since version 1.0.2)
 * @throws {Yii.CException} if the property or event is not defined
 * @see __set
 */
Yii.CComponent.prototype.get = function (name) {
		var getter, i, object, nameParts = [], limit;
		
		if (name.indexOf !== undefined && name.indexOf(".") !== -1) {
			nameParts = name.split(".");
			name = nameParts.shift();
		}
		if (this[name] !== undefined) {
			object = this[name];
			if (nameParts.length > 0) {
				if (object instanceof Yii.CComponent) {
					return object.get(nameParts.join("."));
				}
				limit = nameParts.length;
				for (i = 0; i < limit; i++) {
					name = nameParts.shift();
					object = object[name];
					if (nameParts.length === 0) {
						return object;
					}
					
					if (object instanceof Yii.CComponent) {
						return object.get(nameParts.join("."));
					}
				}
			}
			return object;
		}
		getter='get'+php.ucfirst(name);
		if(php.method_exists(this,getter)) {
			object = this[getter]();
			if (nameParts.length > 0) {
				if (object instanceof Yii.CComponent) {
					return object.get(nameParts.join("."));
				}
				limit = nameParts.length;
				for (i = 0; i < limit; i++) {
					name = nameParts.shift();
					object = object[name];
					if (nameParts.length === 0) {
						return object;
					}
					
					if (object instanceof Yii.CComponent) {
						return object.get(nameParts.join("."));
					}
					
				}
			}
			return object;
		}
		else if(php.strncasecmp(name,'on',2)===0 && php.method_exists(this,name)) {
			// duplicating getEventHandlers() here for performance
			name=name.toLowerCase();
			if(this._e[name] === undefined) {
				this._e[name]=new Yii.CList();
			}
			return this._e[name];
		}
		else if(this._m !== null && this._m[name] !== undefined) {
			return this._m[name];
		}
		else if(this._m !== null) {
			for (i in this._m) {
				if (this._m.hasOwnProperty(i)) {
					
					object = this._m[i];
					try {
						if(object.getEnabled() && (php.property_exists(object,name) || object.canGetProperty(name))) {
							if (nameParts.length > 0) {
								return object.get(nameParts.join("."));
							}
							return object.get(name);
						}
					}
					catch (e) {
						console.log(e);
					}
				}
			}
		}
		console.log(this.getClassName() + " : " + name);
		throw new Yii.CException(Yii.t('yii','Property "{class}.{property}" is not defined.',
			{'{class}':this.getClassName(), '{property}':name}));
	};
/**
 * Sets value of a component property.
 * Do not call this method. This is a PHP magic method that we override
 * to allow using the following syntax to set a property or attach an event handler
 * <pre>
 * this.propertyName=value;
 * this.eventName=callback;
 * </pre>
 * @param {String} name the property name or the event name
 * @param {Mixed} value the property value or callback
 * @throws {Yii.CException} if the property/event is not defined or the property is read only.
 * @see __get
 */
Yii.CComponent.prototype.set = function (name, value) {
		var setter, i, object, nameParts = [];
		if (name.indexOf(".") !== -1) {
			nameParts = name.split(".");
			name = nameParts.pop();
			return (this.get(nameParts.join("."))[name] = value);
		}
		if (this[name] !== undefined) {
			return (this[name] = value);
		}
		
		setter='set'+php.ucfirst(name);
		if(php.method_exists(this,setter)) {
			return this[setter](value);
		}
		else if(php.strncasecmp(name,'on',2)===0 && php.method_exists(this,name)) {
			// duplicating getEventHandlers() here for performance
			name=name.toLowerCase();
			if(this._e[name] === undefined) {
				this._e[name]=new Yii.CList();
			}
			return this._e[name].add(value);
		}
		else if(this._m !== null) {
			for (i in this._m) {
				if (this._m.hasOwnProperty(i)) {
					
					object = this._m[i];
					
					if(object.getEnabled() && (php.property_exists(object,name) || object.canSetProperty(name))) {
						return (object.set(name,value));
					}
				}
			}
		}
		if(php.method_exists(this,'get'+php.ucfirst(name))) {
			throw new Yii.CException(Yii.t('yii','Property "{class}.{property}" is read only.',
				{'{class}':this.getClassName(), '{property}':name}));
		}
		else {
			throw new Yii.CException(Yii.t('yii','Property "{class}.{property}" is not defined.',
				{'{class}':this.getClassName(), '{property}':name}));
		}
	};
/**
 * Checks if a property value is null.
 * Do not call this method. This is a PHP magic method that we override
 * to allow using isset() to detect if a component property is set or not.
 * @param {String} name the property name or the event name
 * @since 1.0.1
 */
Yii.CComponent.prototype.isset = function (name) {
		var getter, i, object, nameParts = [], value;
		if (name.indexOf(".") !== -1) {
			nameParts = name.split(".");
			name = nameParts.pop();
			try {
				value = this.get(nameParts.join("."))[name];
				if (value !== undefined && value !== null) {
					return true;
				}
				return false;
			}
			catch (e) {
				return false;
			}
		}
		if (this[name] !== undefined) {
			return true;
		}
		getter='get'+php.ucfirst(name);
		if(php.method_exists(this,getter)) {
			return (this[getter]()!==null);
		}
		else if(php.strncasecmp(name,'on',2)===0 && php.method_exists(this,name))
		{
			name=name.toLowerCase();
			return this._e !== null && this._e[name] !== undefined && this._e[name].getCount();
		}
		else if(this._m !== null) {
			if(this._m[name] !== undefined) {
				return true;
			}
			for (i in this._m) {
				if (this._m.hasOwnProperty(i)) {
					object = this._m[i];
					if(object.getEnabled() && (php.property_exists(object,name) || object.canGetProperty(name))) {
						return true;
					}
				}
			}
		}
		return false;
	};
/**
 * Sets a component property to be null.
 * Do not call this method. This is a PHP magic method that we override
 * to allow using unset() to set a component property to be null.
 * @param {String} name the property name or the event name
 * @throws {Yii.CException} if the property is read only.
 * @since 1.0.1
 */
Yii.CComponent.prototype.unset = function (name) {
		var setter, i, object, nameParts = [];
		if (name.indexOf(".") !== -1) {
			nameParts = name.split(".");
			name = nameParts.pop();
			object = this.get(nameParts.join("."))[name];
			if (object.unset !== undefined) {
				return object.unset(name);
			} 
			return (this.get(nameParts.join("."))[name] = null);
		}
		setter='set'+php.ucfirst(name);
		if (this[name] !== undefined) {
			this[name] = null; 
			return;
		}
		else if(php.method_exists(this,setter)) {
			this[setter](null);
		}
		else if(php.strncasecmp(name,'on',2)===0 && php.method_exists(this,name)) {
			delete this._e[name.toLowerCase()];
		}
		else if(this._m !== null)
		{
			if(this._m[name] !== undefined) {
				this.detachBehavior(name);
			}
			else
			{
				for (i in this._m) {
					if (this._m.hasOwnProperty(i)) {
						object = this._m[i];
						if(object.getEnabled())	{
							if(php.property_exists(object,name)) {
								return (object[name]=null);
							}
							else if(object.canSetProperty(name)) {
								return object[setter](null);
							}
						}
					}
				}
			}
		}
		else if(php.method_exists(this,'get'+name)) {
			throw new Yii.CException(Yii.t('yii','Property "{class}.{property}" is read only.',
				{'{class}':this.getClassName(), '{property}':name}));
		}
	};
/**
 * Calls the named method which is not a class method.
 * Do not call this method. This is a PHP magic method that we override
 * to implement the behavior feature.
 * @param {String} name the method name
 * @param {Array} parameters method parameters
 * @returns {Mixed} the method return value
 * @since 1.0.2
 */
Yii.CComponent.prototype.call = function (name, parameters) {
		var i, object;
		if (this[name] !== undefined) {
			return php.call_user_func_array([this,name],parameters);
		}
		else if(this._m!==null) {
			for (i in this._m) {
				if (this._m.hasOwnProperty(i)) {
					object = this._m[i];
					if(object.getEnabled() && php.method_exists(object,name)) {
						return php.call_user_func_array([object,name],parameters);
					}
				}
			}
		}
		
		throw new Yii.CException(Yii.t('yii','{class} does not have a method named "{name}".',
			{'{class}':this.getClassName(), '{name}':name}));
	};
/**
 * Returns the named behavior object.
 * The name 'asa' stands for 'as a'.
 * @param {String} behavior the behavior name
 * @returns {IBehavior} the behavior object, or null if the behavior does not exist
 * @since 1.0.2
 */
Yii.CComponent.prototype.asa = function (behavior) {
		return this._m !== null && this._m[behavior] !== undefined ? this._m[behavior] : null;
	};
/**
 * Attaches a list of behaviors to the component.
 * Each behavior is indexed by its name and should be an instance of
 * {@link IBehavior}, a string specifying the behavior class, or an
 * array of the following structure:
 * <pre>
 * {
 *     'class':'path.to.BehaviorClass',
 *     'property1':'value1',
 *     'property2':'value2',
 * }
 * </pre>
 * @param {Array} behaviors list of behaviors to be attached to the component
 * @since 1.0.2
 */
Yii.CComponent.prototype.attachBehaviors = function (behaviors) {
		var name, behavior;
		for (name in behaviors) {
			if (behaviors.hasOwnProperty(name)) {
				behavior = behaviors[name];
				this.attachBehavior(name,behavior);
			}
		}
	};
/**
 * Detaches all behaviors from the component.
 * @since 1.0.2
 */
Yii.CComponent.prototype.detachBehaviors = function () {
		var name, behavior;
		if(this._m!==null) {
			for (name in this._m) {
				if (this._m.hasOwnProperty(name)) {
					behavior = this._m[name];
					this.detachBehavior(name);
				}
			}
			this._m=null;
		}
	};
/**
 * Attaches a behavior to this component.
 * This method will create the behavior object based on the given
 * configuration. After that, the behavior object will be initialized
 * by calling its {@link IBehavior::attach} method.
 * @param {String} name the behavior's name. It should uniquely identify this behavior.
 * @param {Mixed} behavior the behavior configuration. This is passed as the first
 * parameter to {@link YiiBase::createComponent} to create the behavior object.
 * @returns {IBehavior} the behavior object
 * @since 1.0.2
 */
Yii.CComponent.prototype.attachBehavior = function (name, behavior) {
		if(!(behavior instanceof Yii.CBehavior)) {
			behavior=Yii.createComponent(behavior);
		}
		behavior.setEnabled(true);
		behavior.attach(this);
		if (this._m === null) {
			this._m = {};
		}
		return (this._m[name]=behavior);
	};
/**
 * Detaches a behavior from the component.
 * The behavior's {@link IBehavior::detach} method will be invoked.
 * @param {String} name the behavior's name. It uniquely identifies the behavior.
 * @returns {IBehavior} the detached behavior. Null if the behavior does not exist.
 * @since 1.0.2
 */
Yii.CComponent.prototype.detachBehavior = function (name) {
		var behavior;
		if(this._m[name] !== undefined) {
			this._m[name].detach(this);
			behavior=this._m[name];
			delete this._m[name];
			return behavior;
		}
	};
/**
 * Enables all behaviors attached to this component.
 * @since 1.0.2
 */
Yii.CComponent.prototype.enableBehaviors = function () {
		var i, behavior;
		if(this._m!==null) {
			for (i in this._m) {
				if (this._m.hasOwnProperty(i)) {
					behavior = this._m[i];
					behavior.setEnabled(true);
				}
			}
		}
	};
/**
 * Disables all behaviors attached to this component.
 * @since 1.0.2
 */
Yii.CComponent.prototype.disableBehaviors = function () {
		var i, behavior;
		if(this._m!==null) {
			for (i in this._m) {
				if (this._m.hasOwnProperty(i)) {
					behavior = this._m[i];
					behavior.setEnabled(false);
				}
			}
		}
	};
/**
 * Enables an attached behavior.
 * A behavior is only effective when it is enabled.
 * A behavior is enabled when first attached.
 * @param {String} name the behavior's name. It uniquely identifies the behavior.
 * @since 1.0.2
 */
Yii.CComponent.prototype.enableBehavior = function (name) {
		if(this._m !== null && this._m[name] !== undefined) {
			this._m[name].setEnabled(true);
		}
	};
/**
 * Disables an attached behavior.
 * A behavior is only effective when it is enabled.
 * @param {String} name the behavior's name. It uniquely identifies the behavior.
 * @since 1.0.2
 */
Yii.CComponent.prototype.disableBehavior = function (name) {
		if(this._m !== null && this._m[name] !== undefined) {
			this._m[name].setEnabled(false);
		}
	};
/**
 * Determines whether a property is defined.
 * A property is defined if there is a getter or setter method
 * defined in the class. Note, property names are case-insensitive.
 * @param {String} name the property name
 * @returns {Boolean} whether the property is defined
 * @see canGetProperty
 * @see canSetProperty
 */
Yii.CComponent.prototype.hasProperty = function (name) {
		return this[name] !== undefined || php.method_exists(this,'get'+php.ucfirst(name)) || php.method_exists(this,'set'+php.ucfirst(name));
	};
/**
 * Determines whether a property can be read.
 * A property can be read if the class has a getter method
 * for the property name. Note, property name is case-insensitive.
 * @param {String} name the property name
 * @returns {Boolean} whether the property can be read
 * @see canSetProperty
 */
Yii.CComponent.prototype.canGetProperty = function (name) {
		return this[name] !== undefined || php.method_exists(this,'get'+php.ucfirst(name));
	};
/**
 * Determines whether a property can be set.
 * A property can be written if the class has a setter method
 * for the property name. Note, property name is case-insensitive.
 * @param {String} name the property name
 * @returns {Boolean} whether the property can be written
 * @see canGetProperty
 */
Yii.CComponent.prototype.canSetProperty = function (name) {
		return this[name] !== undefined || php.method_exists(this,'set'+php.ucfirst(name));
	};
/**
 * Determines whether an event is defined.
 * An event is defined if the class has a method named like 'onXXX'.
 * Note, event name is case-insensitive.
 * @param {String} name the event name
 * @returns {Boolean} whether an event is defined
 */
Yii.CComponent.prototype.hasEvent = function (name) {
		return !php.strncasecmp(name,'on',2) && php.method_exists(this,name);
	};
/**
 * Checks whether the named event has attached handlers.
 * @param {String} name the event name
 * @returns {Boolean} whether an event has been attached one or several handlers
 */
Yii.CComponent.prototype.hasEventHandler = function (name) {
		
		return this._e !== null && this._e[name] !== undefined && this._e[name].getCount()>0;
	};
/**
 * Returns the list of attached event handlers for an event.
 * @param {String} name the event name
 * @returns {Yii.CList} list of attached event handlers for the event
 * @throws {Yii.CException} if the event is not defined
 */
Yii.CComponent.prototype.getEventHandlers = function (name) {
		if(this.hasEvent(name))	{
			
			if (this._e === null) {
				this._e = {};
			}
			if(this._e[name] === undefined) {
				this._e[name]=new Yii.CList();
			}
			return this._e[name];
		}
		else {
			throw new Yii.CException(Yii.t('yii','Event "{class}.{event}" is not defined.',
				{'{class}':this.getClassName(), '{event}':name}));
		}
	};
/**
 * Attaches an event handler to an event.
 * 
 * An event handler must be a valid PHP callback, i.e., a string referring to
 * a global function name, or an array containing two elements with
 * the first element being an object and the second element a method name
 * of the object.
 * 
 * An event handler must be defined with the following signature,
 * <pre>
 * function handlerName(event) {}
 * </pre>
 * where $event includes parameters associated with the event.
 * 
 * This is a convenient method of attaching a handler to an event.
 * It is equivalent to the following code:
 * <pre>
 * component.getEventHandlers(eventName).add(eventHandler);
 * </pre>
 * 
 * Using {@link getEventHandlers}, one can also specify the excution order
 * of multiple handlers attaching to the same event. For example:
 * <pre>
 * component.getEventHandlers(eventName).insertAt(0,eventHandler);
 * </pre>
 * makes the handler to be invoked first.
 * 
 * @param {String} name the event name
 * @param {Yii.Callback} handler the event handler
 * @throws {Yii.CException} if the event is not defined
 * @see detachEventHandler
 */
Yii.CComponent.prototype.attachEventHandler = function (name, handler) {
		this.getEventHandlers(name).add(handler);
	};
/**
 * Detaches an existing event handler.
 * This method is the opposite of {@link attachEventHandler}.
 * @param {String} name event name
 * @param {Yii.Callback} handler the event handler to be removed
 * @returns {Boolean} if the detachment process is successful
 * @see attachEventHandler
 */
Yii.CComponent.prototype.detachEventHandler = function (name, handler) {
		if(this.hasEventHandler(name)) {
			return this.getEventHandlers(name).remove(handler)!==false;
		}
		else {
			return false;
		}
	};
/**
 * Raises an event.
 * This method represents the happening of an event. It invokes
 * all attached handlers for the event.
 * @param {String} name the event name
 * @param {Yii.CEvent} event the event parameter
 * @throws {Yii.CException} if the event is undefined or an event handler is invalid.
 */
Yii.CComponent.prototype.raiseEvent = function (name, event) {
		var i, handler, object, method, limit;
		if(this._e !== null && this._e[name] !== undefined)	{
			limit = this._e[name].length;
			for (i = 0; i < limit; i++) {
				handler = this._e[name][i];
				if(typeof(handler) === 'string') {
					php.call_user_func(handler,event);
				}
				if(Object.prototype.toString.call(handler) === '[object Array]') {
					// an array: 0 - object, 1 - method name
					object = handler[0];
					method = handler[1];
					
					if(typeof(object) === 'string') {	// static method call
						php.call_user_func(handler,event);
					}
					else if(php.method_exists(object,method)) {
				
						object[method](event);
					}
					else {
						throw new Yii.CException(Yii.t('yii','Event "{class}.{event}" is attached with an invalid handler "{handler}".',
							{'{class}':this.getClassName(), '{event}':name, '{handler}':handler[1]}));
					}
				}
				else if (typeof handler === "function") { // callback function
					php.call_user_func(handler,event);
				}
				else {
					console.log(i);
					console.log(name);
					console.log(handler);
					throw new Yii.CException(Yii.t('yii','Event "{class}.{event}" is attached with an invalid handler "{handler}".',
						{'{class}':this.getClassName(), '{event}':name, '{handler}':handler}));
				}
				// stop further handling if param.handled is set true
				if((event instanceof Yii.CEvent) && event.handled) {
					return;
				}
				
			}
		}
		else if(YII_DEBUG && !this.hasEvent(name)) {
			throw new Yii.CException(Yii.t('yii','Event "{class}.{event}" is not defined.',
				{'{class}':this.getClassName(), '{event}':name}));
		}
	};
/**
 * Evaluates a PHP expression or callback under the context of this component.
 * 
 * Valid PHP callback can be class method name in the form of
 * array(ClassName/Object, MethodName), or anonymous function (only available in PHP 5.3.0 or above).
 * 
 * If a PHP callback is used, the corresponding function/method signature should be
 * <pre>
 * function foo(param1, param2, +++, component) { +++ }
 * </pre>
 * where the array elements in the second parameter to this method will be passed
 * to the callback as $param1, $param2, ...; and the last parameter will be the component itself.
 * 
 * If a PHP expression is used, the second parameter will be "extracted" into PHP variables
 * that can be directly accessed in the expression. See {@link http://us.php.net/manual/en/function.extract.php PHP extract}
 * for more details. In the expression, the component object can be accessed using $this.
 * 
 * @param {Mixed} _expression_ a PHP expression or PHP callback to be evaluated.
 * @param {Array} _data_ additional parameters to be passed to the above expression/callback.
 * @returns {Mixed} the expression result
 * @since 1.1.0
 */
Yii.CComponent.prototype.evaluateExpression = function (_expression_, _data_) {
		if (_data_ === undefined) {
			_data_ = [];
		}
		if(typeof(_expression_) === 'string')
		{
			php.extract(_data_);
			return eval('return '+_expression_+';');
		}
		else
		{
			_data_.push(this);
			return php.call_user_func_array(_expression_, _data_);
		}
	}