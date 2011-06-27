/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CErrorEvent represents the parameter for the {@link CApplication::onError onError} event.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CErrorEvent.php 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package system.base
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CEvent
 */
Yii.CErrorEvent = function CErrorEvent () {
};
Yii.CErrorEvent.prototype = new Yii.CEvent();
Yii.CErrorEvent.prototype.constructor =  Yii.CErrorEvent;
/**
 * @var {String} error code
 */
Yii.CErrorEvent.prototype.code = null;
/**
 * @var {String} error message
 */
Yii.CErrorEvent.prototype.message = null;
/**
 * @var {String} error message
 */
Yii.CErrorEvent.prototype.file = null;
/**
 * @var {String} error file
 */
Yii.CErrorEvent.prototype.line = null;
/**
 * Constructor.
 * @param {Mixed} sender sender of the event
 * @param {String} code error code
 * @param {String} message error message
 * @param {String} file error file
 * @param {Integer} line error line
 */
Yii.CErrorEvent.prototype.construct = function (sender, code, message, file, line) {
		this.code=code;
		this.message=message;
		this.file=file;
		this.line=line;
		parent.__construct(sender);
	}