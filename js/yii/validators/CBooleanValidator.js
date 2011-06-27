/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CBooleanValidator validates that the attribute value is either {@link trueValue}  or {@link falseValue}.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CBooleanValidator.php 3120 2011-03-25 01:50:48Z qiang.xue $
 * @package system.validators
 * @since 1.0.10
 * @author Charles Pick
 * @class
 * @extends Yii.CValidator
 */
Yii.CBooleanValidator = function CBooleanValidator() {
};
Yii.CBooleanValidator.prototype = new Yii.CValidator();
Yii.CBooleanValidator.prototype.constructor =  Yii.CBooleanValidator;
/**
 * @var {Mixed} the value representing true status. Defaults to '1'.
 */
Yii.CBooleanValidator.prototype.trueValue = '1';
/**
 * @var {Mixed} the value representing false status. Defaults to '0'.
 */
Yii.CBooleanValidator.prototype.falseValue = '0';
/**
 * @var {Boolean} whether the comparison to {@link trueValue} and {@link falseValue} is strict.
 * When this is true, the attribute value and type must both match those of {@link trueValue} or {@link falseValue}.
 * Defaults to false, meaning only the value needs to be matched.
 */
Yii.CBooleanValidator.prototype.strict = false;
/**
 * @var {Boolean} whether the attribute value can be null or empty. Defaults to true,
 * meaning that if the attribute is empty, it is considered valid.
 */
Yii.CBooleanValidator.prototype.allowEmpty = true;
/**
 * Validates the attribute of the object.
 * If there is any error, the error message is added to the object.
 * @param {Yii.CModel} object the object being validated
 * @param {String} attribute the attribute being validated
 */
Yii.CBooleanValidator.prototype.validateAttribute = function (object, attribute) {
		var value, message;
		value=object.get(attribute);
		if(this.allowEmpty && this.isEmpty(value)) {
			return;
		}
		if(!this.strict && value!=this.trueValue && value!=this.falseValue || this.strict && value!==this.trueValue && value!==this.falseValue) {
			message=this.message!==null?this.message:Yii.t('yii','{attribute} must be either {true} or {false}.');
			this.addError(object,attribute,message,{
				'{true}':this.trueValue,
				'{false}':this.falseValue
			});
		}
	};
