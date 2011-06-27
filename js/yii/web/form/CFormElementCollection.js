/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CFormElementCollection implements the collection for storing form elements.
 * 
 * Because CFormElementCollection extends from {@link CMap}, it can be used like an associative array.
 * For example,
 * <pre>
 * element=collection['username'];
 * collection['username']={'type':'text', 'maxlength':128};
 * collection['password']=new Yii.CFormInputElement({'type':'password'},form);
 * collection.push('some string');
 * </pre>
 * 
 * CFormElementCollection can store three types of value: a configuration array, a {@link CFormElement}
 * object, or a string, as shown in the above example. Internally, these values will be converted
 * to {@link CFormElement} objects.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CFormElementCollection.php 3054 2011-03-12 21:30:21Z qiang.xue $
 * @package system.web.form
 * @since 1.1
 * @author Charles Pick
 * @class
 * @extends Yii.CMap
 */
Yii.CFormElementCollection = function CFormElementCollection (form, forButtons) {
	if (form !== false) {
		this.construct(form, forButtons);
	}
};
Yii.CFormElementCollection.prototype = new Yii.CMap(false);
Yii.CFormElementCollection.prototype.constructor =  Yii.CFormElementCollection;
Yii.CFormElementCollection.prototype._form = null;
Yii.CFormElementCollection.prototype._forButtons = null;
/**
 * Constructor.
 * @param {Yii.CForm} form the form object that owns this collection
 * @param {Boolean} forButtons whether this collection is used to store buttons.
 */
Yii.CFormElementCollection.prototype.construct = function (form, forButtons) {
		if (forButtons === undefined) {
			forButtons = false;
		}
		
		this._form=form;
		this._forButtons=forButtons;
		Yii.CMap.prototype.construct.call(this);
	};
/**
 * Adds an item to the collection.
 * This method overrides the parent implementation to ensure
 * only configuration arrays, strings, or {@link CFormElement} objects
 * can be stored in this collection.
 * @param {Mixed} key key
 * @param {Mixed} value value
 * @throws {Yii.CException} if the value is invalid.
 */
Yii.CFormElementCollection.prototype.add = function (key, value) {
		var classVar, element;
		if(value instanceof Yii.CFormElement) {
			if(php.property_exists(value,'name') && typeof(key) === 'string') {
				value[name]=key;
			}
			element=value;
		}
		else if(typeof value === 'object') {
			value['name']=key;
			if(this._forButtons) {
				classVar=this._form.buttonElementClass;
				element=new Yii[classVar](value,this._form);
			}
			else {
				if(value['type'] === undefined) {
					value['type']='text';
				}
				if(value['type']==='string') {
					delete value['type'];
					element=new Yii.CFormStringElement(value,this._form);
				}
				else if(!php.strcasecmp(value['type'].slice(-4),'form')) {
					// a form
					classVar=value['type']==='form' ? this._form.getClassName() : Yii.imports(value['type']);
					element=new Yii[classVar](value,null,this._form);
				}
				else {
					classVar=this._form.inputElementClass;
					element=new Yii[classVar](value,this._form);
					
				}
			}
		}
		else {
			element=new Yii.CFormStringElement({'content':value},this._form);
		}
		
		Yii.CMap.prototype.add.call(this,key,element);
		this._form.addedElement(key,element,this._forButtons);
	};
/**
 * Removes the specified element by key.
 * @param {String} key the name of the element to be removed from the collection
 */
Yii.CFormElementCollection.prototype.remove = function (key) {
		var item;
		if((item=Yii.CMap.prototype.remove.call(this, key))!==null) {
			this._form.removedElement(key,item,this._forButtons);
		}
	};

/**
 * Provides convenient access to Yii.forEach()
 * @param {Function} callback The callback function, this will receive 2 parameters, key and value
 * @returns {Yii.CMap} the map
 */
Yii.CFormElementCollection.prototype.forEach = function(callback) {
	return Yii.forEach(this,function(k,v) {
			if (k !== "_form" && k !== "_forButtons") {
				return callback(k,v);
			}
		});
};