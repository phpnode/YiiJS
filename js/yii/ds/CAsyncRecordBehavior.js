/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CAsyncRecordBehavior is the base class for behaviors that can be attached to {@link CAsyncRecord}.
 * Compared with {@link CModelBehavior}, CAsyncRecordBehavior attaches to more events
 * that are only defined by {@link CAsyncRecord}.
 * 
 * @package system.ds
 * @since 1.0.2
 * @author Charles Pick
 * @class
 * @extends Yii.CModelBehavior
 */
Yii.CAsyncRecordBehavior = function CAsyncRecordBehavior () {
};
Yii.CAsyncRecordBehavior.prototype = new Yii.CModelBehavior();
Yii.CAsyncRecordBehavior.prototype.constructor =  Yii.CAsyncRecordBehavior;
/**
 * Declares events and the corresponding event handler methods.
 * If you override this method, make sure you merge the parent result to the return value.
 * @returns {Array} events (array keys) and the corresponding event handler methods (array values).
 * @see CBehavior::events
 */
Yii.CAsyncRecordBehavior.prototype.events = function () {
		return php.array_merge(parent.events(), {
			'onBeforeSave':'beforeSave',
			'onAfterSave':'afterSave',
			'onBeforeDelete':'beforeDelete',
			'onAfterDelete':'afterDelete',
			'onBeforeFind':'beforeFind',
			'onAfterFind':'afterFind'
		});
	};
/**
 * Responds to {@link CAsyncRecord::onBeforeSave} event.
 * Overrides this method if you want to handle the corresponding event of the {@link CBehavior::owner owner}.
 * You may set {@link CModelEvent::isValid} to be false to quit the saving process.
 * @param {Yii.CModelEvent} event event parameter
 */
Yii.CAsyncRecordBehavior.prototype.beforeSave = function (event) {
	};
/**
 * Responds to {@link CAsyncRecord::onAfterSave} event.
 * Overrides this method if you want to handle the corresponding event of the {@link CBehavior::owner owner}.
 * @param {Yii.CModelEvent} event event parameter
 */
Yii.CAsyncRecordBehavior.prototype.afterSave = function (event) {
	};
/**
 * Responds to {@link CAsyncRecord::onBeforeDelete} event.
 * Overrides this method if you want to handle the corresponding event of the {@link CBehavior::owner owner}.
 * You may set {@link CModelEvent::isValid} to be false to quit the deletion process.
 * @param {Yii.CEvent} event event parameter
 */
Yii.CAsyncRecordBehavior.prototype.beforeDelete = function (event) {
	};
/**
 * Responds to {@link CAsyncRecord::onAfterDelete} event.
 * Overrides this method if you want to handle the corresponding event of the {@link CBehavior::owner owner}.
 * @param {Yii.CEvent} event event parameter
 */
Yii.CAsyncRecordBehavior.prototype.afterDelete = function (event) {
	};
/**
 * Responds to {@link CAsyncRecord::onBeforeFind} event.
 * Overrides this method if you want to handle the corresponding event of the {@link CBehavior::owner owner}.
 * @param {Yii.CEvent} event event parameter
 * @since 1.0.9
 */
Yii.CAsyncRecordBehavior.prototype.beforeFind = function (event) {
	};
/**
 * Responds to {@link CAsyncRecord::onAfterFind} event.
 * Overrides this method if you want to handle the corresponding event of the {@link CBehavior::owner owner}.
 * @param {Yii.CEvent} event event parameter
 */
Yii.CAsyncRecordBehavior.prototype.afterFind = function (event) {
	};