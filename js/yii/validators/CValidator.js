/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CValidator is the base class for all validators.
 * 
 * Child classes must implement the {@link validateAttribute} method.
 * 
 * The following properties are defined in CValidator:
 * <ul>
 * <li>{@link attributes}: array, list of attributes to be validated;</li>
 * <li>{@link message}: string, the customized error message. The message
 *   may contain placeholders that will be replaced with the actual content.
 *   For example, the "{attribute}" placeholder will be replaced with the label
 *   of the problematic attribute. Different validators may define additional
 *   placeholders.</li>
 * <li>{@link on}: string, in which scenario should the validator be in effect.
 *   This is used to match the 'on' parameter supplied when calling {@link CModel::validate}.</li>
 * </ul>
 * 
 * When using {@link createValidator} to create a validator, the following aliases
 * are recognized as the corresponding built-in validator classes:
 * <ul>
 * <li>required: {@link CRequiredValidator}</li>
 * <li>filter: {@link CFilterValidator}</li>
 * <li>match: {@link CRegularExpressionValidator}</li>
 * <li>email: {@link CEmailValidator}</li>
 * <li>url: {@link CUrlValidator}</li>
 * <li>unique: {@link CUniqueValidator}</li>
 * <li>compare: {@link CCompareValidator}</li>
 * <li>length: {@link CStringValidator}</li>
 * <li>in: {@link CRangeValidator}</li>
 * <li>numerical: {@link CNumberValidator}</li>
 * <li>captcha: {@link CCaptchaValidator}</li>
 * <li>type: {@link CTypeValidator}</li>
 * <li>file: {@link CFileValidator}</li>
 * <li>default: {@link CDefaultValueValidator}</li>
 * <li>exist: {@link CExistValidator}</li>
 * <li>boolean: {@link CBooleanValidator}</li>
 * <li>date: {@link CDateValidator}</li>
 * <li>safe: {@link CSafeValidator}</li>
 * <li>unsafe: {@link CUnsafeValidator}</li>
 * </ul>
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CValidator.php 3160 2011-04-03 01:08:23Z qiang.xue $
 * @package system.validators
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CValidator = function CValidator() {
};
Yii.CValidator.prototype = new Yii.CComponent();
Yii.CValidator.prototype.constructor =  Yii.CValidator;
/**
 * @var {Object} list of built-in validators (name=>class)
 */
Yii.CValidator.prototype.builtInValidators = {
		'required':'Yii.CRequiredValidator',
		'filter':'Yii.CFilterValidator',
		'match':'Yii.CRegularExpressionValidator',
		'email':'Yii.CEmailValidator',
		'url':'Yii.CUrlValidator',
		'unique':'Yii.CUniqueValidator',
		'compare':'Yii.CCompareValidator',
		'length':'Yii.CStringValidator',
		'in':'Yii.CRangeValidator',
		'numerical':'Yii.CNumberValidator',
		'captcha':'Yii.CCaptchaValidator',
		'type':'Yii.CTypeValidator',
		'file':'Yii.CFileValidator',
		'default':'Yii.CDefaultValueValidator',
		'exist':'Yii.CExistValidator',
		'boolean':'Yii.CBooleanValidator',
		'safe':'Yii.CSafeValidator',
		'unsafe':'Yii.CUnsafeValidator',
		'date':'Yii.CDateValidator'
	};
/**
 * @var {Array} list of attributes to be validated.
 */
Yii.CValidator.prototype.attributes = null;
/**
 * @var {String} the user-defined error message. Different validators may define various
 * placeholders in the message that are to be replaced with actual values. All validators
 * recognize "{attribute}" placeholder, which will be replaced with the label of the attribute.
 */
Yii.CValidator.prototype.message = null;
/**
 * @var {Boolean} whether this validation rule should be skipped if when there is already a validation
 * error for the current attribute. Defaults to false.
 * @since 1.1.1
 */
Yii.CValidator.prototype.skipOnError = false;
/**
 * @var {Array} list of scenarios that the validator should be applied.
 * Each array value refers to a scenario name with the same name as its array key.
 */
Yii.CValidator.prototype.on = null;
/**
 * @var {Boolean} whether attributes listed with this validator should be considered safe for massive assignment.
 * Defaults to true.
 * @since 1.1.4
 */
Yii.CValidator.prototype.safe = true;
/**
 * @var {Boolean} whether to perform client-side validation. Defaults to true.
 * Please refer to {@link CActiveForm::enableClientValidation} for more details about client-side validation.
 * @since 1.1.7
 */
Yii.CValidator.prototype.enableClientValidation = true;
/**
 * Validates a single attribute.
 * This method should be overridden by child classes.
 * @param {Yii.CModel} object the data object being validated
 * @param {String} attribute the name of the attribute to be validated.
 */
Yii.CValidator.prototype.validateAttribute = function (object, attribute) {
	};
/**
 * Creates a validator object.
 * @param {String} name the name or class of the validator
 * @param {Yii.CModel} object the data object being validated that may contain the inline validation method
 * @param {Mixed} attributes list of attributes to be validated. This can be either an array of
 * the attribute names or a string of comma-separated attribute names.
 * @param {Array} params initial values to be applied to the validator properties
 * @returns {Yii.CValidator} the validator
 */
Yii.CValidator.prototype.createValidator = function (name, object, attributes, params) {
		var n, on, validator, builtInValidators, className, value, nameParts, i, limit, classObject;
		if (params === undefined) {
			params = [];
		}
		if(typeof(attributes) === 'string') {
			attributes=attributes.split(/[\s,]+/);
		}
		if(params.on !== undefined) {
			if(Object.prototype.toString.call(params.on) === '[object Array]') {
				on=params.on;
			}
			else {
				on=params.on.split(/[\s,]+/);
			}
		}
		else {
			on=[];
		}
		if (object[name] !== undefined && typeof object[name] === "function") {
			validator=new Yii.CInlineValidator();
			validator.attributes=attributes;
			validator.method=name;
			validator.params=params;
			if(params.skipOnError !== undefined) {
				validator.skipOnError=params.skipOnError;
			}
		}
		else {
			params.attributes = attributes;
			if(this.builtInValidators[name] !== undefined) {
				className = this.builtInValidators[name];
			}
			else {
				className = name;
			}
			
			if (className.slice(0,3) === "Yii") {
				
				validator=new Yii[className.slice(4)]();
				
			}
			else {
				validator = new window[className]();
			}
			for (n in params) {
				if (params.hasOwnProperty(n)) {
					value = params[n];
					validator[n]=value;
				}
			}
			
		}
		validator.on=php.empty(on) ? [] : php.array_combine(on,on);
		return validator;
	};
/**
 * Validates the specified object.
 * @param {Yii.CModel} object the data object being validated
 * @param {Array} attributes the list of attributes to be validated. Defaults to null,
 * meaning every attribute listed in {@link attributes} will be validated.
 */
Yii.CValidator.prototype.validate = function (object, attributes) {
		var i, attribute, self = this;
		
		if (attributes === undefined) {
			attributes = null;
		}
		if(Object.prototype.toString.call(attributes) === '[object Array]') {
			attributes=php.array_intersect(this.attributes,attributes);
		}
		else {
			attributes=this.attributes;
		}
		
		Yii.forEach(attributes, function(i,attribute) {
			if(!self.skipOnError || !object.hasErrors(attribute)) {
				self.validateAttribute(object,attribute);
			}
		});
	
	};
/**
 * Returns the JavaScript needed for performing client-side validation.
 * Do not override this method if the validator does not support client-side validation.
 * Two predefined JavaScript variables can be used:
 * <ul>
 * <li>value: the value to be validated</li>
 * <li>messages: an array used to hold the validation error messages for the value</li>
 * </ul>
 * @param {Yii.CModel} object the data object being validated
 * @param {String} attribute the name of the attribute to be validated.
 * @returns {String} the client-side validation script. Null if the validator does not support client-side validation.
 * @see CActiveForm::enableClientValidation
 * @since 1.1.7
 */
Yii.CValidator.prototype.clientValidateAttribute = function (object, attribute) {
	};
/**
 * Returns a value indicating whether the validator applies to the specified scenario.
 * A validator applies to a scenario as long as any of the following conditions is met:
 * <ul>
 * <li>the validator's "on" property is empty</li>
 * <li>the validator's "on" property contains the specified scenario</li>
 * </ul>
 * @param {String} scenario scenario name
 * @returns {Boolean} whether the validator applies to the specified scenario.
 * @since 1.0.2
 */
Yii.CValidator.prototype.applyTo = function (scenario) {
		return php.empty(this.on) || this.on[scenario] !== undefined;
	};
/**
 * Adds an error about the specified attribute to the active record.
 * This is a helper method that performs message selection and internationalization.
 * @param {Yii.CModel} object the data object being validated
 * @param {String} attribute the attribute being validated
 * @param {String} message the error message
 * @param {Array} params values for the placeholders in the error message
 */
Yii.CValidator.prototype.addError = function (object, attribute, message, params) {
		if (params === undefined) {
			params = [];
		}
		params['{attribute}']=object.getAttributeLabel(attribute);
		
		object.addError(attribute,php.strtr(message,params));
	};
/**
 * Checks if the given value is empty.
 * A value is considered empty if it is null, an empty array, or the trimmed result is an empty string.
 * Note that this method is different from PHP empty(). It will return false when the value is 0.
 * @param {Mixed} value the value to be checked
 * @param {Boolean} trim whether to perform trimming before checking if the string is empty. Defaults to false.
 * @returns {Boolean} whether the value is empty
 * @since 1.0.9
 */
Yii.CValidator.prototype.isEmpty = function (value, trim) {
		if (trim === undefined) {
			trim = false;
		}
		return value===null || value===[] || value==='' || trim && (/boolean|number|string/).test(typeof value) && php.trim(value)==='';
	}