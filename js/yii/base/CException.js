/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CException represents a generic exception for all purposes.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CException.php 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package system.base
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.Exception
 */
Yii.CException = function CException (message) {
	if (message === false) {
		return;
	}
	this.message = message;
	

};
Yii.CException.prototype = new Error();
Yii.CException.prototype.constructor = Yii.CException;
/**
 * Gets a basic stack trace
 * @returns {Array} An array of function calls
 */
Yii.CException.prototype.stacktrace = function () {
	function st2(f) {
		return !f ? [] : 
		st2(f.caller).concat([f.toString().split('(')[0].substring(9) + '(' + Array.prototype.slice.call(f.arguments).join(',') + ')']);
	}
	return st2(arguments.callee.caller);
};

/**
 * Gets the stack trace as a string
 * @returns {String} the stack trace, latest item first
 */
Yii.CException.prototype.getTraceAsString = function () {
	return this.stacktrace().reverse().join("\n");
};

/**
 * Gets the exception message
 * @returns {String} the message associated with this error
 */
Yii.CException.prototype.getMessage = function () {
	return this.message;
}
