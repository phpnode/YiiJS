/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CFormStringElement represents a string in a form.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CFormStringElement.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.web.form
 * @since 1.1
 * @author Charles Pick
 * @class
 * @extends Yii.CFormElement
 */
Yii.CFormStringElement = function CFormStringElement (config, parent) {
	if (config !== false) {
		this.construct(config, parent);
	}
};
Yii.CFormStringElement.prototype = new Yii.CFormElement(false);
Yii.CFormStringElement.prototype.constructor =  Yii.CFormStringElement;
/**
 * @var {String} the string content
 */
Yii.CFormStringElement.prototype.content = null;
Yii.CFormStringElement.prototype._on = null;
/**
 * Returns a value indicating under which scenarios this string is visible.
 * If the value is empty, it means the string is visible under all scenarios.
 * Otherwise, only when the model is in the scenario whose name can be found in
 * this value, will the string be visible. See {@link CModel::scenario} for more
 * information about model scenarios.
 * @returns {String} scenario names separated by commas. Defaults to null.
 */
Yii.CFormStringElement.prototype.getOn = function () {
		return this._on;
	};
/**
 * @param {String} value scenario names separated by commas.
 */
Yii.CFormStringElement.prototype.setOn = function (value) {
		this._on=value.split(/[\s,]+/);
	};
/**
 * Renders this element.
 * The default implementation simply returns {@link content}.
 * @returns {String} the string content
 */
Yii.CFormStringElement.prototype.render = function () {
		return this.content;
	};
/**
 * Evaluates the visibility of this element.
 * This method will check the {@link on} property to see if
 * the model is in a scenario that should have this string displayed.
 * @returns {Boolean} whether this element is visible.
 */
Yii.CFormStringElement.prototype.evaluateVisible = function () {
		return php.empty(this._on) || php.in_array(this.getParent().getModel().getScenario(),this._on);
	};