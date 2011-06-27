/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CAttributeCollection implements a collection for storing attribute names and values.
 * 
 * Besides all functionalities provided by {@link CMap}, CAttributeCollection
 * allows you to get and set attribute values like getting and setting
 * properties. For example, the following usages are all valid for a
 * CAttributeCollection object:
 * <pre>
 * collection.text='text'; // same as:  $collection->add('text','text');
 * document.write(collection.text);   // same as:  echo $collection->itemAt('text');
 * </pre>
 * 
 * The case sensitivity of attribute names can be toggled by setting the
 * {@link caseSensitive} property of the collection.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CAttributeCollection.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.collections
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CMap
 */
Yii.CAttributeCollection = function CAttributeCollection(data, readOnly) {
	this.construct(data, readOnly);
	
};
Yii.CAttributeCollection.prototype = new Yii.CMap();
Yii.CAttributeCollection.prototype.constructor =  Yii.CAttributeCollection;
/**
 * @var {Boolean} whether the keys are case-sensitive. Defaults to false.
 */
Yii.CAttributeCollection.prototype.caseSensitive = false;
/**
 * Returns a property value or an event handler list by property or event name.
 * This method overrides the parent implementation by returning
 * a key value if the key exists in the collection.
 * @param {String} name the property name or the event name
 * @returns {Mixed} the property value or the event handler list
 * @throws {Yii.CException} if the property/event is not defined.
 */
Yii.CAttributeCollection.prototype.get = function (name) {
		if(this.contains(name)) {
			return this.itemAt(name);
		}
		else {
			return Yii.CMap.prototype.get.call(this, name);
		}
	};
/**
 * Sets value of a component property.
 * This method overrides the parent implementation by adding a new key value
 * to the collection.
 * @param {String} name the property name or event name
 * @param {Mixed} value the property value or event handler
 * @throws {Yii.CException} If the property is not defined or read-only.
 */
Yii.CAttributeCollection.prototype.set = function (name, value) {
		this.add(name,value);
	};
/**
 * Checks if a property value is null.
 * This method overrides the parent implementation by checking
 * if the key exists in the collection and contains a non-null value.
 * @param {String} name the property name or the event name
 * @returns {Boolean} whether the property value is null
 * @since 1.0.1
 */
Yii.CAttributeCollection.prototype.isset = function (name) {
		if(this.contains(name)) {
			return this.itemAt(name)!==null;
		}
		else {
			return Yii.CMap.prototype.isset.call(this, name);
		}
	};
/**
 * Sets a component property to be null.
 * This method overrides the parent implementation by clearing
 * the specified key value.
 * @param {String} name the property name or the event name
 * @since 1.0.1
 */
Yii.CAttributeCollection.prototype.unset = function (name) {
		this.remove(name);
	};
/**
 * Returns the item with the specified key.
 * This overrides the parent implementation by converting the key to lower case first if {@link caseSensitive} is false.
 * @param {Mixed} key the key
 * @returns {Mixed} the element at the offset, null if no element is found at the offset
 */
Yii.CAttributeCollection.prototype.itemAt = function (key) {
		if(this.caseSensitive) {
			return Yii.CMap.prototype.itemAt.call(this,key);
		}
		else {
			return Yii.CMap.prototype.itemAt.call(this,key.toLowerCase());
		}
	};
/**
 * Adds an item into the map.
 * This overrides the parent implementation by converting the key to lower case first if {@link caseSensitive} is false.
 * @param {Mixed} key key
 * @param {Mixed} value value
 */
Yii.CAttributeCollection.prototype.add = function (key, value) {
		if(this.caseSensitive) {
			Yii.CMap.prototype.add.call(this, key,value);
		}
		else {
			Yii.CMap.prototype.add.call(this, key.toLowerCase(),value);
		}
	};
/**
 * Removes an item from the map by its key.
 * This overrides the parent implementation by converting the key to lower case first if {@link caseSensitive} is false.
 * @param {Mixed} key the key of the item to be removed
 * @returns {Mixed} the removed value, null if no such key exists.
 */
Yii.CAttributeCollection.prototype.remove = function (key) {
		if(this.caseSensitive) {
			return Yii.CMap.prototype.remove.call(this, key);
		}
		else {
			return Yii.CMap.prototype.remove.call(this, key.toLowerCase());
		}
	};
/**
 * Returns whether the specified is in the map.
 * This overrides the parent implementation by converting the key to lower case first if {@link caseSensitive} is false.
 * @param {Mixed} key the key
 * @returns {Boolean} whether the map contains an item with the specified key
 */
Yii.CAttributeCollection.prototype.contains = function (key) {
		if(this.caseSensitive) {
			return Yii.CMap.prototype.contains.call(this, key);
		}
		else {
			return Yii.CMap.prototype.contains.call(this, key.toLowerCase());
		}
	};
/**
 * Determines whether a property is defined.
 * This method overrides parent implementation by returning true
 * if the collection contains the named key.
 * @param {String} name the property name
 * @returns {Boolean} whether the property is defined
 */
Yii.CAttributeCollection.prototype.hasProperty = function (name) {
		return this.contains(name) || Yii.CMap.prototype.hasProperty.call(this, name);
	};
/**
 * Determines whether a property can be read.
 * This method overrides parent implementation by returning true
 * if the collection contains the named key.
 * @param {String} name the property name
 * @returns {Boolean} whether the property can be read
 */
Yii.CAttributeCollection.prototype.canGetProperty = function (name) {
		return this.contains(name) || Yii.CMap.prototype.canGetProperty.call(this, name);
	};
/**
 * Determines whether a property can be set.
 * This method overrides parent implementation by always returning true
 * because you can always add a new value to the collection.
 * @param {String} name the property name
 * @returns {Boolean} true
 */
Yii.CAttributeCollection.prototype.canSetProperty = function (name) {
		return true;
	}