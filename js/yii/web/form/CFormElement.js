/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CFormElement is the base class for presenting all kinds of form element.
 * 
 * CFormElement implements the way to get and set arbitrary attributes.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CFormElement.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.web.form
 * @since 1.1
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CFormElement = function CFormElement (config, parent) {
	if (config !== false) {
		this.construct(config, parent);
	}
};
Yii.CFormElement.prototype = new Yii.CComponent();
Yii.CFormElement.prototype.constructor =  Yii.CFormElement;
/**
 * @var {Array} list of attributes (name=>value) for the HTML element represented by this object.
 */
Yii.CFormElement.prototype.attributes = {};
Yii.CFormElement.prototype._parent = null;
Yii.CFormElement.prototype._visible = null;
/**
 * Renders this element.
 * @returns {String} the rendering result
 */
Yii.CFormElement.prototype.render = function () {
	};
/**
 * Constructor.
 * @param {Mixed} config the configuration for this element.
 * @param {Mixed} parent the direct parent of this element.
 * @see configure
 */
Yii.CFormElement.prototype.construct = function (config, parent) {
		
		this.configure(config);
		this._parent=parent;
	};
/**
 * Converts the object to a string.
 * This is a PHP magic method.
 * The default implementation simply calls {@link render} and return
 * the rendering result.
 * @returns {String} the string representation of this object.
 */
Yii.CFormElement.prototype.toString = function () {
		return this.render();
	};
/**
 * Returns a property value or an attribute value.
 * Do not call this method. This is a PHP magic method that we override
 * to allow using the following syntax to read a property or attribute:
 * <pre>
 * value=element.propertyName;
 * value=element.attributeName;
 * </pre>
 * @param {String} name the property or attribute name
 * @returns {Mixed} the property or attribute value
 * @throws {Yii.CException} if the property or attribute is not defined
 * @see __set
 */
Yii.CFormElement.prototype.get = function (name) {
		var getter;
		getter='get'+php.ucfirst(name);
		if(php.method_exists(this,getter)) {
			return this[getter]();
		}
		else if(this.attributes[name] !== undefined) {
			return this.attributes[name];
		}
		else {
			throw new Yii.CException(Yii.t('yii','Property "{class}.{property}" is not defined.',
				{'{class}':this.getClassName(), '{property}':name}));
		}
	};
/**
 * Sets value of a property or attribute.
 * Do not call this method. This is a PHP magic method that we override
 * to allow using the following syntax to set a property or attribute.
 * <pre>
 * this.propertyName=value;
 * this.attributeName=value;
 * </pre>
 * @param {String} name the property or attribute name
 * @param {Mixed} value the property or attribute value
 * @see __get
 */
Yii.CFormElement.prototype.set = function (name, value) {
		var setter;
		setter='set'+php.ucfirst(name);
		
		if(php.method_exists(this,setter)) {
			this[setter](value);
		}
		else if (this[name] !== undefined) {
			this[name] = value;
		}
		else {
			this.attributes[name]=value;
		}
	};
/**
 * Configures this object with property initial values.
 * @param {Object} config the configuration for this object. 
 */
Yii.CFormElement.prototype.configure = function (config) {
		var name, value;
		
		for (name in config) {
			if (config.hasOwnProperty(name)) {
				value = config[name];
				this.set(name,value);
			}
		}
	};
/**
 * Returns a value indicating whether this element is visible and should be rendered.
 * This method will call {@link evaluateVisible} to determine the visibility of this element.
 * @returns {Boolean} whether this element is visible and should be rendered.
 */
Yii.CFormElement.prototype.getVisible = function () {
		if(this._visible===null) {
			this._visible=this.evaluateVisible();
		}
		return this._visible;
	};
/**
 * @param {Boolean} value whether this element is visible and should be rendered.
 */
Yii.CFormElement.prototype.setVisible = function (value) {
		this._visible=value;
	};
/**
 * @returns {Mixed} the direct parent of this element. This could be either a {@link CForm} object or a {@link CBaseController} object
 * (a controller or a widget).
 */
Yii.CFormElement.prototype.getParent = function () {
		return this._parent;
	};
/**
 * Evaluates the visibility of this element.
 * Child classes should override this method to implement the actual algorithm
 * for determining the visibility.
 * @returns {Boolean} whether this element is visible. Defaults to true.
 */
Yii.CFormElement.prototype.evaluateVisible = function () {
		return true;
	};