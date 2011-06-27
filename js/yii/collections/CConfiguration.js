/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CConfiguration represents an array-based configuration.
 * 
 * It can be used to initialize an object's properties.
 * 
 * The configuration data may be obtained from a PHP script. For example,
 * <pre>
 * return {
 *     'name':'My Application',
 *     'defaultController':'index',
 * };
 * </pre>
 * Use the following code to load the above configuration data:
 * <pre>
 * config=new Yii.CConfiguration('path/to/config.php');
 * </pre>
 * 
 * To apply the configuration to an object, call {@link applyTo()}.
 * Each (key,value) pair in the configuration data is applied
 * to the object like: $object->$key=$value.
 * 
 * Since CConfiguration extends from {@link CMap}, it can be
 * used like an associative array. See {@link CMap} for more details.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CConfiguration.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.collections
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CMap
 */
Yii.CConfiguration = function CConfiguration (data, readOnly) {
	this.construct(data, readOnly);
	
};
Yii.CConfiguration.prototype = new Yii.CMap();
Yii.CConfiguration.prototype.constructor =  Yii.CConfiguration;

/**
 * Saves the configuration into a JSON string.
 * The string is a valid JSON expression representing the configuration data as an object.
 * @returns {String} the JSON representation of the configuration
 */
Yii.CConfiguration.prototype.saveAsString = function () {
		return Yii.CJSON.encode(this.toObject());
	};
/**
 * Applies the configuration to an object.
 * Each (key,value) pair in the configuration data is applied
 * to the object like: $object->$key=$value.
 * @param {Object} object object to be applied with this configuration
 */
Yii.CConfiguration.prototype.applyTo = function (object) {
		var keyValue, key, value;
		keyValue = this.toObject();
		for (key in keyValue) {
			if (keyValue.hasOwnProperty(key)) {
				value = keyValue[key];
				object[key] = value;
			}
		}
	};