/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CTypedList represents a list whose items are of the certain type.
 * 
 * CTypedList extends {@link CList} by making sure that the elements to be
 * added to the list is of certain class type.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CTypedList.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.collections
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CList
 */
Yii.CTypedList = function CTypedList (type) {
	this.construct(type);
};
Yii.CTypedList.prototype = new Yii.CList();
Yii.CTypedList.prototype.constructor =  Yii.CTypedList;
Yii.CTypedList.prototype._type = null;
/**
 * Constructor.
 * @param {String} type class type
 */
Yii.CTypedList.prototype.construct = function (type) {
		this._type=type;
	};
/**
 * Inserts an item at the specified position.
 * This method overrides the parent implementation by
 * checking the item to be inserted is of certain type.
 * @param {Integer} index the specified position.
 * @param {Mixed} item new item
 * @throws {Yii.CException} If the index specified exceeds the bound,
 * the list is read-only or the element is not of the expected type.
 */
Yii.CTypedList.prototype.insertAt = function (index, item) {
		if(item instanceof this._type) {
			Yii.CList.prototype.insertAt.call(this,index,item);
		}
		else {
			throw new Yii.CException(Yii.t('yii','CTypedList<{type}> can only hold objects of {type} class.',
				{'{type}':this._type}));
		}
};

/**
 * Pushes an item on to the end of the list
 * @param {Mixed} the item to add
 * @returns {Integer} the number of items in the list
 */
Yii.CTypedList.prototype.push = function (item) {
	if(item instanceof this._type) {
		return Yii.CList.prototype.push.call(this,item);
	}
	else {
		throw new Yii.CException(Yii.t('yii','CTypedList<{type}> can only hold objects of {type} class.',
			{'{type}':this._type}));
	}
};
