/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CEvent is the base class for all event classes.
 * 
 * It encapsulates the parameters associated with an event.
 * The {@link sender} property describes who raises the event.
 * And the {@link handled} property indicates if the event is handled.
 * If an event handler sets {@link handled} to true, those handlers
 * that are not invoked yet will not be invoked anymore.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CComponent.php 3066 2011-03-13 14:22:55Z qiang.xue $
 * @package system.base
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CEvent = function CEvent(sender, params) {
	if (sender !== false) {
		this.construct(sender, params);
	}
};
Yii.CEvent.prototype = new Yii.CComponent();
Yii.CEvent.prototype.constructor =  Yii.CEvent;
/**
 * @var {Object} the sender of this event
 */
Yii.CEvent.prototype.sender = null;
/**
 * @var {Boolean} whether the event is handled. Defaults to false.
 * When a handler sets this true, the rest of the uninvoked event handlers will not be invoked anymore.
 */
Yii.CEvent.prototype.handled = false;
/**
 * @var {Mixed} additional event parameters.
 * @since 1.1.7
 */
Yii.CEvent.prototype.params = null;
/**
 * Constructor.
 * @param {Mixed} sender sender of the event
 * @param {Mixed} params additional parameters for the event
 */
Yii.CEvent.prototype.construct = function (sender, params) {
	if (sender === undefined) {
		sender = null;
	}
	if (params === undefined) {
		params = null;
	}
	this.sender=sender;
	this.params=params;
};