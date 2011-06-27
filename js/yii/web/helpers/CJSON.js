/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CJSON converts PHP data to and from JSON format.
 * 
 * @originalAuthor Michal Migurski <mike-json@teczno.com>
 * @originalAuthor Matt Knapp <mdknapp[at]gmail[dot]com>
 * @originalAuthor Brett Stimmerman <brettstimmerman[at]gmail[dot]com>
 * @version $Id: CJSON.php 3009 2011-02-28 14:22:53Z mdomba $
 * @package	system.web.helpers
 * @since 1.0
 * @author Charles Pick
 * @class
 */
Yii.CJSON = {
	/**
	 * Encodes an arbitrary variable into JSON format
	 * 
	 * @param {Mixed} varVar any number, boolean, string, array, or object to be encoded.
	 *  if var is a string, note that encode() always expects it to be in ASCII or UTF-8 format!
	 * @returns {String} JSON string representation of input var
	 */
	encode: function (content) {
		return JSON.stringify(content);
	},
	/**
	 * decodes a JSON string into appropriate variable
	 * 
	 * @param {String} str  JSON-formatted string
	 * @returns {Mixed}   number, boolean, string, array, or object corresponding to given JSON input string.
	 *    Note that decode() always returns strings in ASCII or UTF-8 format!
	 * @access   public
	 */
	decode: function (str) {
		return JSON.parse(str);
	}
};
