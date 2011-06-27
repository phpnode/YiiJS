/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CMap implements a collection that takes key-value pairs.
 * 
 * You can access, add or remove an item with a key by using
 * {@link itemAt}, {@link add}, and {@link remove}.
 * To get the number of the items in the map, use {@link getCount}.
 * CMap can also be used like a regular array as follows,
 * <pre>
 * map[key]=value; // add a key-value pair
 * delete map[key]; // remove the value with the specified key
 * if(map[key] !== undefined) { // if the map contains the key
 *     for (key in map) // traverse the items in the map
 *         n=php.count(map);
 * }  // returns the number of items in the map
 * </pre>
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CMap.php 3153 2011-04-01 12:50:06Z qiang.xue $
 * @package system.collections
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CMap = function CMap (data, readOnly) {
	if (data !== false) {
		this.construct(data, readOnly);
	}
	
};
Yii.CMap.prototype = new Yii.CComponent();
Yii.CMap.prototype.constructor =  Yii.CMap;


/**
 * Constructor.
 * Initializes the list with an array or an iterable object.
 * @param {Object} data the intial data. Default is null, meaning no initialization.
 * @throws {Yii.CException} If data is not null and neither an array nor an iterator.
 */
Yii.CMap.prototype.construct = function (data) {
		if (data === undefined) {
			data = null;
		}
		
		if(data!==null) {
			this.copyFrom(data);
		}
	};

/**
 * Returns the number of items in the map.
 * @returns {Integer} number of items in the map.
 */
Yii.CMap.prototype.count = function () {
		return this.getCount();
	};
/**
 * Returns the number of items in the map.
 * @returns {Integer} the number of items in the map
 */
Yii.CMap.prototype.getCount = function () {
		var total = 0, i;
		for (i in this) {
			if (this.hasOwnProperty(i)) {
				total++;
			}
		}
		
		return total;
	};

/**
 * @returns {Array} the key list
 */
Yii.CMap.prototype.getKeys = function () {
		var i, keys = [];
		for (i in this) {
			if (this.hasOwnProperty(i)) {
				keys.push(i);
			}
		}
		return keys;
	};
/**
 * Returns the item with the specified key.
 * @param {Mixed} key the key
 * @returns {Mixed} the element at the offset, null if no element is found at the offset
 */
Yii.CMap.prototype.itemAt = function (key) {
		if(this[key] !== undefined) {
			return this[key];
		}
		else {
			return null;
		}
	};
/**
 * Adds an item into the map.
 * Note, if the specified key already exists, the old value will be overwritten.
 * @param {Mixed} key key
 * @param {Mixed} value value
 * @throws {Yii.CException} if the map is read-only
 */
Yii.CMap.prototype.add = function (key, value) {
		if (key === null) {
			key = this.count();
		}
		this[key] = value;
	};
/**
 * Removes an item from the map by its key.
 * @param {Mixed} key the key of the item to be removed
 * @returns {Mixed} the removed value, null if no such key exists.
 * @throws {Yii.CException} if the map is read-only
 */
Yii.CMap.prototype.remove = function (key) {
		var value;
		if(this[key] !== undefined) {
			value=this[key];
			delete this[key];
			return value;
		}
	};
/**
 * Removes all items in the map.
 */
Yii.CMap.prototype.clear = function () {
		var i, keyList, key;
		for (i in this) {
			if (this.hasOwnProperty(i)) {
				this.remove(i);
			}
		}
	};
/**
 * @param {Mixed} key the key
 * @returns {Boolean} whether the map contains an item with the specified key
 */
Yii.CMap.prototype.contains = function (key) {
		return this[key] !== undefined;
	};
/**
 * @returns {Array} the list of items in array
 */
Yii.CMap.prototype.toArray = function () {
		var i, ret = [];
		for (i in this) {
			if (this.hasOwnProperty(i)) {
				ret.push(this[i]);
			}
		}
		return ret;
	};
/**
 * @returns {Object} the list of items in object
 */
Yii.CMap.prototype.toObject = function () {
		var i, ret = {};
		for (i in this) {
			if (this.hasOwnProperty(i)) {
				ret[i] = this[i];
			}
		}
		return ret;
	};
/**
 * Copies iterable data into the map.
 * Note, existing data in the map will be cleared first.
 * @param {Mixed} data the data to be copied from, must be an array or object implementing Traversable
 * @throws {Yii.CException} If data is neither an array nor an iterator.
 */
Yii.CMap.prototype.copyFrom = function (data) {
		var key, value;
		if(typeof data === "object") {
			if(this.getCount()>0) {
				this.clear();
			}
			if(data instanceof Yii.CMap) {
				data=data.toObject();
			}
			for (key in data) {
				if (data.hasOwnProperty(key)) {
					value = data[key];
					this.add(key,value);
				}
			}
		}
		else if(data!==null) {
			throw new Yii.CException(Yii.t('yii','Map data must be an array or an object implementing Traversable.'));
		}
	};
/**
 * Merges iterable data into the map.
 * 
 * Existing elements in the map will be overwritten if their keys are the same as those in the source.
 * If the merge is recursive, the following algorithm is performed:
 * <ul>
 * <li>the map data is saved as $a, and the source data is saved as $b;</li>
 * <li>if $a and $b both have an array indxed at the same string key, the arrays will be merged using this algorithm;</li>
 * <li>any integer-indexed elements in $b will be appended to $a and reindxed accordingly;</li>
 * <li>any string-indexed elements in $b will overwrite elements in $a with the same index;</li>
 * </ul>
 * 
 * @param {Mixed} data the data to be merged with, must be an array or object implementing Traversable
 * @param {Boolean} recursive whether the merging should be recursive.
 * 
 * @throws {Yii.CException} If data is neither an array nor an iterator.
 */
Yii.CMap.prototype.mergeWith = function (data, recursive) {
		var d, key, value;
		if (recursive === undefined) {
			recursive = true;
		}
		if(typeof data === "object") {
			if(data instanceof Yii.CMap) {
				data=data.toObject();
			}
			else if(data instanceof Yii.CList) {
				data=data.toArray();
			}
			if(recursive) {
				this.mergeArray(this,data);
			}
			else
			{
				for (key in data) {
					if (data.hasOwnProperty(key)) {
						value = data[key];
						this.add(key,value);
					}
				}
			}
		}
		else if(data!==null) {
			throw new Yii.CException(Yii.t('yii','Map data must be an array or an object implementing Traversable.'));
		}
	};
/**
 * Merges two arrays into one recursively.
 * If each array has an element with the same string key value, the latter
 * will overwrite the former (different from array_merge_recursive).
 * Recursive merging will be conducted if both arrays have an element of array
 * type and are having the same key.
 * For integer-keyed elements, the elements from the latter array will
 * be appended to the former array.
 * @param {Array} a array to be merged to
 * @param {Array} b array to be merged from
 * @returns {Array} the merged array (the original arrays are not changed.)
 * @see mergeWith
 */
Yii.CMap.prototype.mergeArray = function (a, b) {
		var k, v;
		for (k in b) {
			if (b.hasOwnProperty(k)) {
				v = b[k];
				if((typeof(k) === 'number' && (k % 1 ? false : true))) {
					a[k] !== undefined ? a.push(v) : a[k]=v;
				}
				else if (a[k] !== undefined && typeof a[k] === "object") {
					a[k]=this.mergeArray(a[k],v);
				}
				else {
					a[k]=v;
				}
			}
		}
		return a;
	};
/**
 * Provides convenient access to Yii.forEach()
 * @param {Function} callback The callback function, this will receive 2 parameters, key and value
 * @returns {Yii.CMap} the map
 */
Yii.CMap.prototype.forEach = function(callback) {
	return Yii.forEach(this,callback);
};