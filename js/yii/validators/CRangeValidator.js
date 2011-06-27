/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CRangeValidator validates that the attribute value is among the list (specified via {@link range}).
 * You may invert the validation logic with help of the {@link not} property (available since 1.1.5).
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CRangeValidator.php 3120 2011-03-25 01:50:48Z qiang.xue $
 * @package system.validators
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CValidator
 */
Yii.CRangeValidator = function CRangeValidator() {
};
Yii.CRangeValidator.prototype = new Yii.CValidator();
Yii.CRangeValidator.prototype.constructor =  Yii.CRangeValidator;
/**
 * @var {Array} list of valid values that the attribute value should be among
 */
Yii.CRangeValidator.prototype.range = null;
/**
 * @var {Boolean} whether the comparison is strict (both type and value must be the same)
 */
Yii.CRangeValidator.prototype.strict = false;
/**
 * @var {Boolean} whether the attribute value can be null or empty. Defaults to true,
 * meaning that if the attribute is empty, it is considered valid.
 */
Yii.CRangeValidator.prototype.allowEmpty = true;
/**
 * @var {Boolean} whether to invert the validation logic. Defaults to false. If set to true,
 * the attribute value should NOT be among the list of values defined via {@link range}.
 * @since 1.1.5
 */
Yii.CRangeValidator.prototype.not = false;
/**
 * Validates the attribute of the object.
 * If there is any error, the error message is added to the object.
 * @param {Yii.CModel} object the object being validated
 * @param {String} attribute the attribute being validated
 */
Yii.CRangeValidator.prototype.validateAttribute = function (object, attribute) {
	var value, message;
	value=object.get(attribute);
	
	if(this.allowEmpty && this.isEmpty(value)) {
		return;
	}
	if(Object.prototype.toString.call(this.range) !== '[object Array]') {
		throw new Yii.CException(Yii.t('yii','The "range" property must be specified with a list of values.'));
	}
	if(!this.not && !php.in_array(value,this.range,this.strict))
	{
		message=this.message!==null?this.message:Yii.t('yii','{attribute} is not in the list.');
		this.addError(object,attribute,message);
	}
	else if(this.not && php.in_array(value,this.range,this.strict))
	{
		message=this.message!==null?this.message:Yii.t('yii','{attribute} is in the list.');
		this.addError(object,attribute,message);
	}
};
