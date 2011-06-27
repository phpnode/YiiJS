/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CEmailValidator validates that the attribute value is a valid email address.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CEmailValidator.php 3120 2011-03-25 01:50:48Z qiang.xue $
 * @package system.validators
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CValidator
 */
Yii.CEmailValidator = function CEmailValidator() {
};
Yii.CEmailValidator.prototype = new Yii.CValidator();
Yii.CEmailValidator.prototype.constructor =  Yii.CEmailValidator;
/**
 * @var {String} the regular expression used to validate the attribute value.
 * @see http://www.regular-expressions.info/email.html
 */
Yii.CEmailValidator.prototype.pattern = '^[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$';
/**
 * @var {String} the regular expression used to validate email addresses with the name part.
 * This property is used only when {@link allowName} is true.
 * @since 1.0.5
 * @see allowName
 */
Yii.CEmailValidator.prototype.fullPattern = '^[^@]*<[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?>$';
/**
 * @var {Boolean} whether to allow name in the email address (e.g. "Qiang Xue <qiang.xue@gmail.com>"). Defaults to false.
 * @since 1.0.5
 * @see fullPattern
 */
Yii.CEmailValidator.prototype.allowName = false;

/**
 * @var {Boolean} whether the attribute value can be null or empty. Defaults to true,
 * meaning that if the attribute is empty, it is considered valid.
 */
Yii.CEmailValidator.prototype.allowEmpty = true;
/**
 * Validates the attribute of the object.
 * If there is any error, the error message is added to the object.
 * @param {Yii.CModel} object the object being validated
 * @param {String} attribute the attribute being validated
 */
Yii.CEmailValidator.prototype.validateAttribute = function (object, attribute) {
		var value, message;
		
		value=object[attribute];
		if(this.allowEmpty && this.isEmpty(value)) {
			return;
		}
		if(!this.validateValue(value)) {
			message=this.message!==null?this.message:Yii.t('yii','{attribute} is not a valid email address.');
			
			this.addError(object,attribute,message);
		}
	};
/**
 * Validates a static value to see if it is a valid email.
 * Note that this method does not respect {@link allowEmpty} property.
 * This method is provided so that you can call it directly without going through the model validation rule mechanism.
 * @param {Mixed} value the value to be validated
 * @returns {Boolean} whether the value is a valid email
 * @since 1.1.1
 */
Yii.CEmailValidator.prototype.validateValue = function (value) {
	
		var valid, re, reFull;
		re = new RegExp(this.pattern);
		reFull = new RegExp(this.fullPattern);
		
		valid=typeof(value) === 'string' && (re.exec(value) || this.allowName && reFull.exec(value));
		
		return valid;
	};
