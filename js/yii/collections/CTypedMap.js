/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CTypedMap represents a map whose items are of the certain type.
 * 
 * CTypedMap extends {@link CMap} by making sure that the elements to be
 * added to the list is of certain class type.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CTypedMap.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.collections
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CMap
 */
Yii.CTypedMap = function CTypedMap (type) {
	this.construct(type);
};
Yii.CTypedMap.prototype = new Yii.CMap();
Yii.CTypedMap.prototype.constructor =  Yii.CTypedMap;
Yii.CTypedMap.prototype._type = null;
/**
 * Constructor.
 * @param {String} type class type
 */
Yii.CTypedMap.prototype.construct = function (type) {
		this._type=type;
	};
/**
 * Adds an item into the map.
 * This method overrides the parent implementation by
 * checking the item to be inserted is of certain type.
 * @param {Integer} index the specified position.
 * @param {Mixed} item new item
 * @throws {Yii.CException} If the index specified exceeds the bound,
 * the map is read-only or the element is not of the expected type.
 */
Yii.CTypedMap.prototype.add = function (index, item) {
		if(item instanceof this._type) {
			Yii.CMap.prototype.add.call(this, index,item);
		}
		else {
			throw new Yii.CException(Yii.t('yii','CTypedMap<{type}> can only hold objects of {type} class.',
				{'{type}':this._type}));
		}
};