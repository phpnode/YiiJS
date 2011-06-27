/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CHttpException represents an exception caused by invalid operations of end-users.
 * 
 * The HTTP error code can be obtained via {@link statusCode}.
 * Error handlers may use this status code to decide how to format the error page.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CHttpException.php 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package system.base
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CException
 */
Yii.CHttpException = function CHttpException (status, message, code) {
	
	this.construct(status, message, code);
};
Yii.CHttpException.prototype = new Yii.CException(false);
Yii.CHttpException.prototype.constructor =  Yii.CHttpException;
/**
 * @var {Integer} HTTP status code, such as 403, 404, 500, etc.
 */
Yii.CHttpException.prototype.statusCode = null;
/**
 * Constructor.
 * @param {Integer} status HTTP status code, such as 404, 500, etc.
 * @param {String} message error message
 * @param {Integer} code error code
 */
Yii.CHttpException.prototype.construct = function (status, message, code) {
	if (message === undefined) {
		message = null;
	}
	if (code === undefined) {
		code = 0;
	}
	this.statusCode=status;
	
	Yii.CException.call(this, message, code);
};