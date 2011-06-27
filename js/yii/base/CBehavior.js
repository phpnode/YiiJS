/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CBehavior is a convenient base class for behavior classes.
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CBehavior.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.base
 * @since 1.0.2
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CBehavior = function CBehavior() {
};
Yii.CBehavior.prototype = new Yii.CComponent();
Yii.CBehavior.prototype.constructor =  Yii.CBehavior;
Yii.CBehavior.prototype._enabled = null;
Yii.CBehavior.prototype._owner = null;
/**
 * Declares events and the corresponding event handler methods.
 * The events are defined by the {@link owner} component, while the handler
 * methods by the behavior class. The handlers will be attached to the corresponding
 * events when the behavior is attached to the {@link owner} component; and they
 * will be detached from the events when the behavior is detached from the component.
 * @returns {Object} events (keys) and the corresponding event handler methods (values).
 */
Yii.CBehavior.prototype.events = function () {
		return {};
	};
/**
 * Attaches the behavior object to the component.
 * The default implementation will set the {@link owner} property
 * and attach event handlers as declared in {@link events}.
 * Make sure you call the parent implementation if you override this method.
 * @param {Yii.CComponent} owner the component that this behavior is to be attached to.
 */
Yii.CBehavior.prototype.attach = function (owner) {
		var eventHandler, event, handler;
		this._owner=owner;
		eventHandler = this.events();
		for (event in eventHandler) {
			if (eventHandler.hasOwnProperty(event)) {
				handler = eventHandler[event];
				owner.attachEventHandler(event,[this,handler]);
			}
		}
	};
/**
 * Detaches the behavior object from the component.
 * The default implementation will unset the {@link owner} property
 * and detach event handlers declared in {@link events}.
 * Make sure you call the parent implementation if you override this method.
 * @param {Yii.CComponent} owner the component that this behavior is to be detached from.
 */
Yii.CBehavior.prototype.detach = function (owner) {
		var eventHandler, event, handler;
		eventHandler = this.events();
		for (event in eventHandler) {
			if (eventHandler.hasOwnProperty(event)) {
				handler = eventHandler[event];
				owner.detachEventHandler(event,[this,handler]);
			}
		}
		this._owner=null;
	};
/**
 * @returns {Yii.CComponent} the owner component that this behavior is attached to.
 */
Yii.CBehavior.prototype.getOwner = function () {
		return this._owner;
	};
/**
 * @returns {Boolean} whether this behavior is enabled
 */
Yii.CBehavior.prototype.getEnabled = function () {
		return this._enabled;
	};
/**
 * @param {Boolean} value whether this behavior is enabled
 */
Yii.CBehavior.prototype.setEnabled = function (value) {
		var eventHandler, event, handler, eventHandlerList;
		if(this._enabled!=value && this._owner) {
			if(value) {
				eventHandler = this.events();
				for (event in eventHandler) {
					if (eventHandler.hasOwnProperty(event)) {
						handler = eventHandler[event];
						this._owner.attachEventHandler(event,[this,handler]);
					}
				}
			}
			else {
				eventHandlerList = this.events();
				for (event in eventHandlerList) {
					if (eventHandlerList.hasOwnProperty(event)) {
						handler = eventHandlerList[event];
						this._owner.detachEventHandler(event,[this,handler]);
					}
				}
			}
		}
		this._enabled=value;
	}