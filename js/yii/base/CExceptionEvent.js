/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CExceptionEvent represents the parameter for the {@link CApplication::onException onException} event.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CExceptionEvent.php 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package system.base
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CEvent
 */
Yii.CExceptionEvent = function CExceptionEvent (sender, exception) {
	this.construct(sender, exception);
};
Yii.CExceptionEvent.prototype = new Yii.CEvent();
Yii.CExceptionEvent.prototype.constructor =  Yii.CExceptionEvent;
/**
 * @var {Yii.CException} the exception that this event is about.
 */
Yii.CExceptionEvent.prototype.exception = null;
/**
 * Constructor.
 * @param {Mixed} sender sender of the event
 * @param {Yii.CException} exception the exception
 */
Yii.CExceptionEvent.prototype.construct = function (sender, exception) {
	this.exception=exception;
	Yii.CEvent.prototype.construct.call(this, sender);
};