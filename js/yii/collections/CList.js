/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CList implements an integer-indexed collection class.
 * 
 * You can access, append, insert, remove an item by using
 * {@link itemAt}, {@link add}, {@link insertAt}, {@link remove}, and {@link removeAt}.
 * To get the number of the items in the list, use {@link getCount}.
 * CList can also be used like a regular array as follows,
 * <pre>
 * list.push(item);  // append at the end
 * list[index]=item; // $index must be between 0 and $list->Count
 * delete list[index]; // remove the item at $index
 * if(list[index] !== undefined) { // if the list has an item at $index
 * for (index in list) // traverse each item in the list
 * n=php.count(list);
 * 		} // returns the number of items in the list
 * </pre>
 * 
 * To extend CList by doing additional operations with each addition or removal
 * operation (e.g. performing type check), override {@link insertAt()}, and {@link removeAt()}.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CList.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.collections
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CList = function CList (data, readOnly) {
	if (data !== false) {
		this.construct(data, readOnly);
	}
	
};
Yii.CList.prototype = new Array();
Yii.CList.prototype.constructor =  Yii.CList;
Yii.augment(Yii.CList, Yii.CComponent);
/**
 * @var {Boolean} whether this list is read-only
 */
Yii.CList.prototype._r = false;
/**
 * Constructor.
 * Initializes the list with an array or an iterable object.
 * @param {Array} data the initial data. Default is null, meaning no initialization.
 * @param {Boolean} readOnly whether the list is read-only
 * @throws {Yii.CException} If data is not null and neither an array nor an iterator.
 */
Yii.CList.prototype.construct = function (data, readOnly) {
		if (data === undefined) {
			data = null;
		}
		if (readOnly === undefined) {
			readOnly = false;
		}
		if(data!==null) {
			this.copyFrom(data);
		}
		this.setReadOnly(readOnly);
	};
/**
 * @returns {Boolean} whether this list is read-only or not. Defaults to false.
 */
Yii.CList.prototype.getReadOnly = function () {
		return this._r;
	};
/**
 * @param {Boolean} value whether this list is read-only or not
 */
Yii.CList.prototype.setReadOnly = function (value) {
		this._r=value;
	};


/**
 * Returns the number of items in the list.
 * @returns {Integer} the number of items in the list
 */
Yii.CList.prototype.getCount = function () {
		return this.length;
	};
/**
 * Returns the item at the specified offset.
 * This method is exactly the same as {@link offsetGet}.
 * @param {Integer} index the index of the item
 * @returns {Mixed} the item at the index
 * @throws {Yii.CException} if the index is out of the range
 */
Yii.CList.prototype.itemAt = function (index) {
		if(this[index] !== undefined) {
			return this[index];
		}
		else {
			throw new Yii.CException(Yii.t('yii','List index "{index}" is out of bound.',
				{'{index}':index}));
		}
	};
/**
 * Appends an item at the end of the list.
 * @param {Mixed} item new item
 * @returns {Integer} the zero-based index at which the item is added
 */
Yii.CList.prototype.add = function (item) {
		return this.push(item);
	};
	
/**
 * Appends an item at the end of the list, fails if the list is read only.
 * @param {Mixed} item new item
 * @returns {Integer} the zero-based index at which the item is added
 */
Yii.CList.prototype.push = function (item) {
		if (!this._r) {
			return Array.prototype.push.call(this, item);
		}
		else {
			throw new Yii.CException(Yii.t('yii','The list is read only.'));
		}
	};
	
/**
 * Pops an item off the end of the list, fails if the list is read only.
 * @returns {Mixed} the popped item
 */
Yii.CList.prototype.pop = function () {
		if (!this._r) {
			return Array.prototype.pop.call(this);
		}
		else {
			throw new Yii.CException(Yii.t('yii','The list is read only.'));
		}
	};
	
/**
 * Shifts an item off the start of the list, fails if the list is read only.
 * @returns {Mixed} the shifted item
 */
Yii.CList.prototype.shift = function () {
		if (!this._r) {
			return Array.prototype.shift.call(this);
		}
		else {
			throw new Yii.CException(Yii.t('yii','The list is read only.'));
		}
	};
/**
 * Inserts an item at the specified position.
 * Original item at the position and the next items
 * will be moved one step towards the end.
 * @param {Integer} index the specified position.
 * @param {Mixed} item new item
 * @throws {Yii.CException} If the index specified exceeds the bound or the list is read-only
 */
Yii.CList.prototype.insertAt = function (index, item) {
		if(!this._r)
		{
			if(index===this.length) {
				this[this.length + 1]=item;
			}
			else if(index>=0 && index<this.length)
			{
				php.array_splice(this,index,0,[item]);
			}
			else {
				throw new Yii.CException(Yii.t('yii','List index "{index}" is out of bound.',
					{'{index}':index}));
		}
		}
		else {
			throw new Yii.CException(Yii.t('yii','The list is read only.'));
		}
	};
/**
 * Removes an item from the list.
 * The list will first search for the item.
 * The first item found will be removed from the list.
 * @param {Mixed} item the item to be removed.
 * @returns {Integer} the index at which the item is being removed
 * @throws {Yii.CException} If the item does not exist
 */
Yii.CList.prototype.remove = function (item) {
		var index;
		if((index=this.indexOf(item))>=0)
		{
			this.removeAt(index);
			return index;
		}
		else {
			return false;
		}
	};
/**
 * Removes an item at the specified position.
 * @param {Integer} index the index of the item to be removed.
 * @returns {Mixed} the removed item.
 * @throws {Yii.CException} If the index specified exceeds the bound or the list is read-only
 */
Yii.CList.prototype.removeAt = function (index) {
		var item;
		if(!this._r) {
			if(index>=0 && index<this.length) {
				if(index===this.length) {
					return this.pop();
				}
				else
				{
					item=this[index];
					php.array_splice(this,index,1);
					return item;
				}
			}
			else {
				throw new Yii.CException(Yii.t('yii','List index "{index}" is out of bound.',
					{'{index}':index}));
			}
		}
		else {
			throw new Yii.CException(Yii.t('yii','The list is read only.'));
		}
	};
/**
 * Removes all items in the list.
 */
Yii.CList.prototype.clear = function () {
		var i;
		for(i=this.length - 1; i >= 0; --i) {
			this.removeAt(i);
		}
	};
/**
 * @param {Mixed} item the item
 * @returns {Boolean} whether the list contains the item
 */
Yii.CList.prototype.contains = function (item) {
		return this.indexOf(item) >= 0;
	};

/**
 * @returns {Array} the list of items in array
 */
Yii.CList.prototype.toArray = function () {
	var ret = [], i, limit;
	limit = this.length;
	for (i = 0; i < limit; i++) {
		ret.push(this[i]);
	}
	return ret;
};
/**
 * Copies iterable data into the list.
 * Note, existing data in the list will be cleared first.
 * @param {Mixed} data the data to be copied from, must be an array or object implementing Traversable
 * @throws {Yii.CException} If data is neither an array nor a Traversable.
 */
Yii.CList.prototype.copyFrom = function (data) {
		var i, item, limit;
		if(Object.prototype.toString.call(data) === '[object Array]' || (data instanceof Array)) {
			if(this.length > 0) {
				this.clear();
			}
			if(data instanceof Yii.CList) {
				data=data.toArray();
			}
			for (i = 0, limit = data.length; i < limit; i++) {
				item = data[i];
				this.add(item);
			}
		}
		else if(data!==null) {
			throw new Yii.CException(Yii.t('yii','List data must be an array or an object implementing Traversable.'));
		}
	};
/**
 * Merges iterable data into the map.
 * New data will be appended to the end of the existing data.
 * @param {Mixed} data the data to be merged with, must be an array or object implementing Traversable
 * @throws {Yii.CException} If data is neither an array nor an iterator.
 */
Yii.CList.prototype.mergeWith = function (data) {
		var i, item;
		if(Object.prototype.toString.call(data) === '[object Array]' || (data instanceof Array))
		{
			if(data instanceof Yii.CList) {
				data=data.toArray();
			}
			for (i in data) {
				if (data.hasOwnProperty(i)) {
					item = data[i];
					this.add(item);
				}
			}
		}
		else if(data!==null) {
			throw new Yii.CException(Yii.t('yii','List data must be an array or an object implementing Traversable.'));
		}
	};
/**
 * Provides convenient access to Yii.forEach()
 * @param {Function} callback The callback function, this will receive 2 parameters, key and value
 * @returns {Yii.CList} the list
 */
Yii.CList.prototype.forEach = function(callback) {
	return Yii.forEach(this,callback);
};
