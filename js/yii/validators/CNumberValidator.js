/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CNumberValidator validates that the attribute value is a number.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CNumberValidator.php 3120 2011-03-25 01:50:48Z qiang.xue $
 * @package system.validators
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CValidator
 */
Yii.CNumberValidator = function CNumberValidator() {
};
Yii.CNumberValidator.prototype = new Yii.CValidator();
Yii.CNumberValidator.prototype.constructor =  Yii.CNumberValidator;
/**
 * @var {Boolean} whether the attribute value can only be an integer. Defaults to false.
 */
Yii.CNumberValidator.prototype.integerOnly = false;
/**
 * @var {Boolean} whether the attribute value can be null or empty. Defaults to true,
 * meaning that if the attribute is empty, it is considered valid.
 */
Yii.CNumberValidator.prototype.allowEmpty = true;
/**
 * @var {Integer|float} upper limit of the number. Defaults to null, meaning no upper limit.
 */
Yii.CNumberValidator.prototype.max = null;
/**
 * @var {Integer|float} lower limit of the number. Defaults to null, meaning no lower limit.
 */
Yii.CNumberValidator.prototype.min = null;
/**
 * @var {String} user-defined error message used when the value is too big.
 */
Yii.CNumberValidator.prototype.tooBig = null;
/**
 * @var {String} user-defined error message used when the value is too small.
 */
Yii.CNumberValidator.prototype.tooSmall = null;
/**
 * @var {String} the regular expression for matching integers.
 * @since 1.1.7
 */
Yii.CNumberValidator.prototype.integerPattern = '^\\s*[+-]?\\d+\\s*$';
/**
 * @var {String} the regular expression for matching numbers.
 * @since 1.1.7
 */
Yii.CNumberValidator.prototype.numberPattern = '^\\s*[-+]?[0-9]*\\.?[0-9]+([eE][-+]?[0-9]+)?\\s*$';
/**
 * Validates the attribute of the object.
 * If there is any error, the error message is added to the object.
 * @param {Yii.CModel} object the object being validated
 * @param {String} attribute the attribute being validated
 */
Yii.CNumberValidator.prototype.validateAttribute = function (object, attribute) {
	var value, message, intRe = new RegExp(this.integerPattern), numRe = new RegExp(this.numberPattern);
	value=String(object[attribute]);
	if(this.allowEmpty && this.isEmpty(value)) {
		return;
	}
	if(this.integerOnly) {
		if(!intRe.exec(value)) {
			message=this.message!==null?this.message:Yii.t('yii','{attribute} must be an integer.');
			this.addError(object,attribute,message);
		}
	}
	else {
		if(!numRe.exec(value)) {
			message=this.message!==null?this.message:Yii.t('yii','{attribute} must be a number.');
			this.addError(object,attribute,message);
		}
	}
	if(this.min!==null && value<this.min) {
		message=this.tooSmall!==null?this.tooSmall:Yii.t('yii','{attribute} is too small (minimum is {min}).');
		this.addError(object,attribute,message,{'{min}':this.min});
	}
	if(this.max!==null && value>this.max) {
		message=this.tooBig!==null?this.tooBig:Yii.t('yii','{attribute} is too big (maximum is {max}).');
		this.addError(object,attribute,message,{'{max}':this.max});
	}
};
