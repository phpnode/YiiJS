/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CInlineValidator represents a validator which is defined as a method in the object being validated.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CInlineValidator.php 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package system.validators
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CValidator
 */
Yii.CInlineValidator = function CInlineValidator() {
};
Yii.CInlineValidator.prototype = new Yii.CValidator();
Yii.CInlineValidator.prototype.constructor =  Yii.CInlineValidator;
/**
 * @var {String} the name of the validation method defined in the active record class
 */
Yii.CInlineValidator.prototype.method = null;
/**
 * @var {Array} additional parameters that are passed to the validation method
 */
Yii.CInlineValidator.prototype.params = null;
/**
 * Validates the attribute of the object.
 * If there is any error, the error message is added to the object.
 * @param {Yii.CModel} object the object being validated
 * @param {String} attribute the attribute being validated
 */
Yii.CInlineValidator.prototype.validateAttribute = function (object, attribute) {
		var method;
		method=this.method;
		object[method](attribute,this.params);
};