/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CRequiredValidator validates that the specified attribute does not have null or empty value.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CRequiredValidator.php 3157 2011-04-02 19:21:06Z qiang.xue $
 * @package system.validators
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CValidator
 */
Yii.CRequiredValidator = function CRequiredValidator() {
};
Yii.CRequiredValidator.prototype = new Yii.CValidator();
Yii.CRequiredValidator.prototype.constructor =  Yii.CRequiredValidator;
/**
 * @var {Mixed} the desired value that the attribute must have.
 * If this is null, the validator will validate that the specified attribute does not have null or empty value.
 * If this is set as a value that is not null, the validator will validate that
 * the attribute has a value that is the same as this property value.
 * Defaults to null.
 * @since 1.0.10
 */
Yii.CRequiredValidator.prototype.requiredValue = null;
/**
 * @var {Boolean} whether the comparison to {@link requiredValue} is strict.
 * When this is true, the attribute value and type must both match those of {@link requiredValue}.
 * Defaults to false, meaning only the value needs to be matched.
 * This property is only used when {@link requiredValue} is not null.
 * @since 1.0.10
 */
Yii.CRequiredValidator.prototype.strict = false; 
/**
 * Validates the attribute of the object.
 * If there is any error, the error message is added to the object.
 * @param {Yii.CModel} object the object being validated
 * @param {String} attribute the attribute being validated
 */
Yii.CRequiredValidator.prototype.validateAttribute = function (object, attribute) {
	var value, message;
	value=object.get(attribute);
	
	if(this.requiredValue!==null) {
		if(!this.strict && value!=this.requiredValue || this.strict && value!==this.requiredValue) {
			message=this.message!==null?this.message:Yii.t('yii','{attribute} must be {value}.',
				{'{value}':this.requiredValue});
			this.addError(object,attribute,message);
		}
	}
	else if(this.isEmpty(value,true)) {
		message=this.message!==null?this.message:Yii.t('yii','{attribute} cannot be blank.');
		this.addError(object,attribute,message);
	}
};
