/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CFormatter provides a set of commonly used data formatting methods.
 * 
 * The formatting methods provided by CFormatter are all named in the form of <code>formatXyz</code>.
 * The behavior of some of them may be configured via the properties of CFormatter. For example,
 * by configuring {@link dateFormat}, one may control how {@link formatDate} formats the value into a date string.
 * 
 * For convenience, CFormatter also implements the mechanism of calling formatting methods with their shortcuts (called types).
 * In particular, if a formatting method is named <code>formatXyz</code>, then its shortcut method is <code>xyz</code>
 * (case-insensitive). For example, calling <code>$formatter->date($value)</code> is equivalent to calling
 * <code>$formatter->formatDate($value)</code>.
 * 
 * Currently, the following types are recognizable:
 * <ul>
 * <li>raw: the attribute value will not be changed at all.</li>
 * <li>text: the attribute value will be HTML-encoded when rendering.</li>
 * <li>ntext: the {@link formatNtext} method will be called to format the attribute value as a HTML-encoded plain text with newlines converted as the HTML &lt;br /&gt; tags.</li>
 * <li>html: the attribute value will be purified and then returned.</li>
 * <li>date: the {@link formatDate} method will be called to format the attribute value as a date.</li>
 * <li>time: the {@link formatTime} method will be called to format the attribute value as a time.</li>
 * <li>datetime: the {@link formatDatetime} method will be called to format the attribute value as a date with time.</li>
 * <li>boolean: the {@link formatBoolean} method will be called to format the attribute value as a boolean display.</li>
 * <li>number: the {@link formatNumber} method will be called to format the attribute value as a number display.</li>
 * <li>email: the {@link formatEmail} method will be called to format the attribute value as a mailto link.</li>
 * <li>image: the {@link formatImage} method will be called to format the attribute value as an image tag where the attribute value is the image URL.</li>
 * <li>url: the {@link formatUrl} method will be called to format the attribute value as a hyperlink where the attribute value is the URL.</li>
 * </ul>
 * 
 * By default, {@link CApplication} registers {@link CFormatter} as an application component whose ID is 'format'.
 * Therefore, one may call <code>Yii::app()->format->boolean(1)</code>.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CFormatter.php 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package system.utils
 * @since 1.1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CApplicationComponent
 */
Yii.CFormatter = function CFormatter() {
};
Yii.CFormatter.prototype = new Yii.CApplicationComponent();
Yii.CFormatter.prototype.constructor =  Yii.CFormatter;
Yii.CFormatter.prototype._htmlPurifier = null;
/**
 * @var {String} the format string to be used to format a date using PHP date() function. Defaults to 'Y/m/d'.
 */
Yii.CFormatter.prototype.dateFormat = 'Y/m/d';
/**
 * @var {String} the format string to be used to format a time using PHP date() function. Defaults to 'h:i:s A'.
 */
Yii.CFormatter.prototype.timeFormat = 'h:i:s A';
/**
 * @var {String} the format string to be used to format a date and time using PHP date() function. Defaults to 'Y/m/d h:i:s A'.
 */
Yii.CFormatter.prototype.datetimeFormat = 'Y/m/d h:i:s A';
/**
 * @var {Array} the format used to format a number with PHP number_format() function.
 * Three elements may be specified: "decimals", "decimalSeparator" and "thousandSeparator". They
 * correspond to the number of digits after the decimal point, the character displayed as the decimal point,
 * and the thousands separator character.
 */
Yii.CFormatter.prototype.numberFormat = {
	'decimals':null,
	'decimalSeparator':null,
	'thousandSeparator':null
};
/**
 * @var {Array} the text to be displayed when formatting a boolean value. The first element corresponds
 * to the text display for false, the second element for true. Defaults to <code>array('No', 'Yes')</code>.
 */
Yii.CFormatter.prototype.booleanFormat = ['No','Yes'];
/**
 * Calls the format method when its shortcut is invoked.
 * This is a PHP magic method that we override to implement the shortcut format methods.
 * @param {String} name the method name
 * @param {Array} parameters method parameters
 * @returns {Mixed} the method return value
 */
Yii.CFormatter.prototype.call = function (name, parameters) {
		if(php.method_exists(this,'format'+name)) {
			return php.call_user_func_array([this,'format'+name],parameters);
		}
		else {
			return parent.call(name,parameters);
		}
	};
/**
 * Formats a value based on the given type.
 * @param {Mixed} value the value to be formatted
 * @param {String} type the data type. This must correspond to a format method available in CFormatter.
 * For example, we can use 'text' here because there is method named {@link formatText}.
 * @returns {String} the formatted data
 */
Yii.CFormatter.prototype.format = function (value, type) {
		var method;
		method='format'+php.ucfirst(type);
		if(php.method_exists(this,method)) {
			return this[method](value);
		}
		else {
			throw new Yii.CException(Yii.t('yii','Unknown type "{type}".',{'{type}':type}));
		}
	};
/**
 * Formats the value as is without any formatting.
 * This method simply returns back the parameter without any format.
 * @param {Mixed} value the value to be formatted
 * @returns {String} the formatted result
 */
Yii.CFormatter.prototype.formatRaw = function (value) {
		return value;
	};
/**
 * Formats the value as a HTML-encoded plain text.
 * @param {Mixed} value the value to be formatted
 * @returns {String} the formatted result
 */
Yii.CFormatter.prototype.formatText = function (value) {
		return Yii.CHtml.encode(value);
	};
/**
 * Formats the value as a HTML-encoded plain text and converts newlines with HTML br tags.
 * @param {Mixed} value the value to be formatted
 * @returns {String} the formatted result
 */
Yii.CFormatter.prototype.formatNtext = function (value) {
		return php.nl2br(Yii.CHtml.encode(value));
	};
/**
 * Formats the value as HTML text without any encoding.
 * @param {Mixed} value the value to be formatted
 * @returns {String} the formatted result
 */
Yii.CFormatter.prototype.formatHtml = function (value) {
		return this.getHtmlPurifier().purify(value);
	};
/**
 * Formats the value as a date.
 * @param {Mixed} value the value to be formatted
 * @returns {String} the formatted result
 * @see dateFormat
 */
Yii.CFormatter.prototype.formatDate = function (value) {
		return php.date(this.dateFormat,value);
	};
/**
 * Formats the value as a time.
 * @param {Mixed} value the value to be formatted
 * @returns {String} the formatted result
 * @see timeFormat
 */
Yii.CFormatter.prototype.formatTime = function (value) {
		return php.date(this.timeFormat,value);
	};
/**
 * Formats the value as a date and time.
 * @param {Mixed} value the value to be formatted
 * @returns {String} the formatted result
 * @see datetimeFormat
 */
Yii.CFormatter.prototype.formatDatetime = function (value) {
		return php.date(this.datetimeFormat,value);
	};
/**
 * Formats the value as a boolean.
 * @param {Mixed} value the value to be formatted
 * @returns {String} the formatted result
 * @see trueText
 * @see falseText
 */
Yii.CFormatter.prototype.formatBoolean = function (value) {
		return value ? this.booleanFormat[1] : this.booleanFormat[0];
	};
/**
 * Formats the value as a mailto link.
 * @param {Mixed} value the value to be formatted
 * @returns {String} the formatted result
 */
Yii.CFormatter.prototype.formatEmail = function (value) {
		return Yii.CHtml.mailto(value);
	};
/**
 * Formats the value as an image tag.
 * @param {Mixed} value the value to be formatted
 * @returns {String} the formatted result
 */
Yii.CFormatter.prototype.formatImage = function (value) {
		return Yii.CHtml.image(value);
	};
/**
 * Formats the value as a hyperlink.
 * @param {Mixed} value the value to be formatted
 * @returns {String} the formatted result
 */
Yii.CFormatter.prototype.formatUrl = function (value) {
		var url;
		url=value;
		if(php.strpos(url,'http://')!==0 && php.strpos(url,'https://')!==0) {
			url='http://'+url;
		}
		return Yii.CHtml.link(Yii.CHtml.encode(value),url);
	};
/**
 * Formats the value as a number using PHP number_format() function.
 * @param {Mixed} value the value to be formatted
 * @returns {String} the formatted result
 * @see numberFormat
 */
Yii.CFormatter.prototype.formatNumber = function (value) {
		return php.number_format(value,this.numberFormat['decimals'],this.numberFormat['decimalSeparator'],this.numberFormat['thousandSeparator']);
	};
/**
 * @returns {Yii.CHtmlPurifier} the HTML purifier instance
 */
Yii.CFormatter.prototype.getHtmlPurifier = function () {
		if(this._htmlPurifier===null) {
			this._htmlPurifier=new Yii.CHtmlPurifier();
		}
		return this._htmlPurifier;
	}