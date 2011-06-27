/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CModelBehavior is a base class for behaviors that are attached to a model component.
 * The model should extend from {@link CModel} or its child classes.
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CModelBehavior.php 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package system.base
 * @since 1.0.2
 * @author Charles Pick
 * @class
 * @extends Yii.CBehavior
 */
Yii.CModelBehavior = function CModelBehavior() {
};
Yii.CModelBehavior.prototype = new Yii.CBehavior();
Yii.CModelBehavior.prototype.constructor =  Yii.CModelBehavior;
/**
 * Declares events and the corresponding event handler methods.
 * The default implementation returns 'onBeforeValidate' and 'onAfterValidate' events and handlers.
 * If you override this method, make sure you merge the parent result to the return value.
 * @returns {Object} events (keys) and the corresponding event handler methods (values).
 * @see CBehavior::events
 */
Yii.CModelBehavior.prototype.events = function () {
		return {
			'onAfterConstruct':'afterConstruct',
			'onBeforeValidate':'beforeValidate',
			'onAfterValidate':'afterValidate'
		};
	};
/**
 * Responds to {@link CModel::onAfterConstruct} event.
 * Overrides this method if you want to handle the corresponding event of the {@link CBehavior::owner owner}.
 * @param {Yii.CEvent} event event parameter
 */
Yii.CModelBehavior.prototype.afterConstruct = function (event) {
	};
/**
 * Responds to {@link CModel::onBeforeValidate} event.
 * Overrides this method if you want to handle the corresponding event of the {@link owner}.
 * You may set {@link CModelEvent::isValid} to be false to quit the validation process.
 * @param {Yii.CModelEvent} event event parameter
 */
Yii.CModelBehavior.prototype.beforeValidate = function (event) {
	};
/**
 * Responds to {@link CModel::onAfterValidate} event.
 * Overrides this method if you want to handle the corresponding event of the {@link owner}.
 * @param {Yii.CEvent} event event parameter
 */
Yii.CModelBehavior.prototype.afterValidate = function (event) {
};