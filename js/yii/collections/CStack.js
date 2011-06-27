/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CStack implements a stack.
 * 
 * The typical stack operations are implemented, which include
 * {@link push()}, {@link pop()} and {@link peek()}. In addition,
 * {@link contains()} can be used to check if an item is contained
 * in the stack. To obtain the number of the items in the stack,
 * check the {@link getCount Count} property.
 * 
 * Items in the stack may be traversed using foreach as follows,
 * <pre>
 * for (i in stack) +++
 * </pre>
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CStack.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.collections
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CStack = function CStack (data) {
	this.construct(data);
};
Yii.CStack.prototype = new Array();
Yii.CStack.prototype.constructor =  Yii.CStack;
Yii.augment(Yii.CStack, Yii.CComponent);
/**
 * Constructor.
 * Initializes the stack with an array or an iterable object.
 * @param {Array} data the initial data. Default is null, meaning no initialization.
 * @throws {Yii.CException} If data is not null and neither an array nor an iterator.
 */
Yii.CStack.prototype.construct = function (data) {
		if (data === undefined) {
			data = null;
		}
		if(data!==null) {
			this.copyFrom(data);
		}
	};
/**
 * @returns {Array} the list of items in stack
 */
Yii.CStack.prototype.toArray = function () {
		var ret = [], i, limit;
		limit = this.length;
		for (i = 0; i < limit; i++) {
			ret.push(this[i]);
		}
		return ret;
	};
/**
 * Copies iterable data into the stack.
 * Note, existing data in the list will be cleared first.
 * @param {Mixed} data the data to be copied from, must be an array or object implementing Traversable
 * @throws {Yii.CException} If data is neither an array nor a Traversable.
 */
Yii.CStack.prototype.copyFrom = function (data) {
		var i, item;
		if(Object.prototype.toString.call(data) === '[object Array]' || (data instanceof Array))
		{
			this.clear();
			for (i in data)
			{
				if (data.hasOwnProperty(i)) {
					item = data[i];
					this.push(item);
				}
			}
		}
		else if(data!==null) {
			throw new Yii.CException(Yii.t('yii','Stack data must be an array or an object implementing Traversable.'));
		}
	};
/**
 * Removes all items in the stack.
 */
Yii.CStack.prototype.clear = function () {
		var i, limit;
		limit = this.length;
		for(i = 0; i < limit; i++) {
			delete this[i];
		}
	};
/**
 * @param {Mixed} item the item
 * @returns {Boolean} whether the stack contains the item
 */
Yii.CStack.prototype.contains = function (item) {
		var i, limit = this.length;
		for (i = 0; i < limit; i++) {
			if (item === this[i]) {
				return true;
			}
		}
		return false;
	};
/**
 * Returns the item at the top of the stack.
 * Unlike {@link pop()}, this method does not remove the item from the stack.
 * @returns {Mixed} item at the top of the stack
 * @throws {Yii.CException} if the stack is empty
 */
Yii.CStack.prototype.peek = function () {
		if(this.length) {
			return this[this.length - 1];
		}
		else {
			throw new Yii.CException(Yii.t('yii','The stack is empty.'));
		}
	};
/**
 * Pops up the item at the top of the stack.
 * @returns {Mixed} the item at the top of the stack
 * @throws {Yii.CException} if the stack is empty
 */
Yii.CStack.prototype.pop = function () {
		if(this.length) {
			return Array.prototype.pop.call(this);
		}
		else {
			throw new Yii.CException(Yii.t('yii','The stack is empty.'));
		}
	};

/**
 * Returns the number of items in the stack.
 * @returns {Integer} the number of items in the stack
 */
Yii.CStack.prototype.getCount = function () {
		return this.length;
	};
/**
 * Returns the number of items in the stack.
 * This method is required by Countable interface.
 * @returns {Integer} number of items in the stack.
 */
Yii.CStack.prototype.count = function () {
		return this.length;
	};
/**
 * Provides convenient access to Yii.forEach()
 * @param {Function} callback The callback function, this will receive 2 parameters, key and value
 * @returns {Yii.CStack} the stack
 */
Yii.CStack.prototype.forEach = function(callback) {
	return Yii.forEach(this,callback);
};