/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CFormInputElement represents form input element.
 * 
 * CFormInputElement can represent the following types of form input based on {@link type} property:
 * <ul>
 * <li>text: a normal text input generated using {@link CHtml::activeTextField}</li>
 * <li>hidden: a hidden input generated using {@link CHtml::activeHiddenField}</li>
 * <li>password: a password input generated using {@link CHtml::activePasswordField}</li>
 * <li>textarea: a text area generated using {@link CHtml::activeTextArea}</li>
 * <li>file: a file input generated using {@link CHtml::activeFileField}</li>
 * <li>radio: a radio button generated using {@link CHtml::activeRadioButton}</li>
 * <li>checkbox: a check box generated using {@link CHtml::activeCheckBox}</li>
 * <li>listbox: a list box generated using {@link CHtml::activeListBox}</li>
 * <li>dropdownlist: a drop-down list generated using {@link CHtml::activeDropDownList}</li>
 * <li>checkboxlist: a list of check boxes generated using {@link CHtml::activeCheckBoxList}</li>
 * <li>radiolist: a list of radio buttons generated using {@link CHtml::activeRadioButtonList}</li>
 * </ul>
 * The {@link type} property can also be a class name or a path alias to the class. In this case,
 * the input is generated using a widget of the specified class. Note, the widget must
 * have a property called "model" which expects a model object, and a property called "attribute"
 * which expects the name of a model attribute.
 * 
 * Because CFormElement is an ancestor class of CFormInputElement, a value assigned to a non-existing property will be
 * stored in {@link attributes} which will be passed as HTML attribute values to the {@link CHtml} method
 * generating the input or initial values of the widget properties.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CFormInputElement.php 3126 2011-03-26 12:21:13Z qiang.xue $
 * @package system.web.form
 * @since 1.1
 * @author Charles Pick
 * @class
 * @extends Yii.CFormElement
 */
Yii.CFormInputElement = function CFormInputElement (config, parent) {
	if (config !== false) {
		this.attributes = {};
		this.construct(config, parent);
	}
};
Yii.CFormInputElement.prototype = new Yii.CFormElement(false);
Yii.CFormInputElement.prototype.constructor =  Yii.CFormInputElement;
/**
 * @var {Array} Core input types (alias=>CHtml method name)
 */
Yii.CFormInputElement.prototype.coreTypes = {'text':'activeTextField','hidden':'activeHiddenField','password':'activePasswordField','textarea':'activeTextArea','file':'activeFileField','radio':'activeRadioButton','checkbox':'activeCheckBox','listbox':'activeListBox','dropdownlist':'activeDropDownList','checkboxlist':'activeCheckBoxList','radiolist':'activeRadioButtonList'};
/**
 * @var {String} the type of this input. This can be a widget class name, a path alias of a widget class name,
 * or a input type alias (text, hidden, password, textarea, file, radio, checkbox, listbox, dropdownlist, checkboxlist, or radiolist).
 * If a widget class, it must extend from {@link CInputWidget} or (@link CJuiInputWidget).
 */
Yii.CFormInputElement.prototype.type = null;
/**
 * @var {String} name of this input
 */
Yii.CFormInputElement.prototype.name = null;
/**
 * @var {String} hint text of this input
 */
Yii.CFormInputElement.prototype.hint = null;
/**
 * @var {Array} the options for this input when it is a list box, drop-down list, check box list, or radio button list.
 * Please see {@link CHtml::listData} for details of generating this property value.
 */
Yii.CFormInputElement.prototype.items = {};
/**
 * @var {Array} the options used when rendering the error part. This property will be passed
 * to the {@link CActiveForm::error} method call as its $htmlOptions parameter.
 * @see CActiveForm::error
 * @since 1.1.1
 */
Yii.CFormInputElement.prototype.errorOptions = {}
/**
 * @var {Boolean} whether to allow AJAX-based validation for this input. Note that in order to use
 * AJAX-based validation, {@link CForm::activeForm} must be configured with 'enableAjaxValidation'=>true.
 * This property allows turning on or off  AJAX-based validation for individual input fields.
 * Defaults to true.
 * @since 1.1.7
 */
Yii.CFormInputElement.prototype.enableAjaxValidation = true;
/**
 * @var {Boolean} whether to allow client-side validation for this input. Note that in order to use
 * client-side validation, {@link CForm::activeForm} must be configured with 'enableClientValidation'=>true.
 * This property allows turning on or off  client-side validation for individual input fields.
 * Defaults to true.
 * @since 1.1.7
 */
Yii.CFormInputElement.prototype.enableClientValidation = true;
/**
 * @var {String} the layout used to render label, input, hint and error. They correspond to the placeholders
 * "{label}", "{input}", "{hint}" and "{error}".
 */
Yii.CFormInputElement.prototype.layout = '{label}\n{input}\n{hint}\n{error}';
Yii.CFormInputElement.prototype._label = null;
Yii.CFormInputElement.prototype._required = null;
/**
 * Gets the value indicating whether this input is required.
 * If this property is not set explicitly, it will be determined by calling
 * {@link CModel::isAttributeRequired} for the associated model and attribute of this input.
 * @returns {Boolean} whether this input is required.
 */
Yii.CFormInputElement.prototype.getRequired = function () {
		if(this._required!==null) {
			return this._required;
		}
		else {
			return this.getParent().getModel().isAttributeRequired(this.name);
		}
	};
/**
 * @param {Boolean} value whether this input is required.
 */
Yii.CFormInputElement.prototype.setRequired = function (value) {
		this._required=value;
	};
/**
 * @returns {String} the label for this input. If the label is not manually set,
 * this method will call {@link CModel::getAttributeLabel} to determine the label.
 */
Yii.CFormInputElement.prototype.getLabel = function () {
		if(this._label!==null) {
			return this._label;
		}
		else {
			return this.getParent().getModel().getAttributeLabel(this.name);
		}
	};
/**
 * @param {String} value the label for this input
 */
Yii.CFormInputElement.prototype.setLabel = function (value) {
		this._label=value;
	};
/**
 * Renders everything for this input.
 * The default implementation simply returns the result of {@link renderLabel}, {@link renderInput},
 * {@link renderHint}. When {@link CForm::showErrorSummary} is false, {@link renderError} is also called
 * to show error messages after individual input fields.
 * @returns {String} the complete rendering result for this input, including label, input field, hint, and error.
 */
Yii.CFormInputElement.prototype.render = function () {
		var output;
		if(this.type==='hidden') {
			return this.renderInput();
		}
		
		output={
			'{label}':this.renderLabel(),
			'{input}':this.renderInput(),
			'{hint}':this.renderHint(),
			'{error}':this.getParent().showErrorSummary ? '' : this.renderError()
		};
		
		
		return php.strtr(this.layout,output);
	};
/**
 * Renders the label for this input.
 * The default implementation returns the result of {@link CHtml activeLabelEx}.
 * @returns {String} the rendering result
 */
Yii.CFormInputElement.prototype.renderLabel = function () {
		var options;
		
		options = {
			'label':this.getLabel(),
			'required':this.getRequired()
		};
		if(!php.empty(this.attributes['id'])) {
            options['for'] = this.attributes['id'];
        }
		return Yii.CHtml.activeLabel(this.getParent().getModel(), this.name, options);
	};
/**
 * Renders the input field.
 * The default implementation returns the result of the appropriate CHtml method or the widget.
 * @returns {String} the rendering result
 */
Yii.CFormInputElement.prototype.renderInput = function () {
		var coreTypes, method, attributes, element, self = this, model = this.getParent().getModel();
		if(this.coreTypes[this.type] !== undefined) {
			method=this.coreTypes[this.type];
			if(php.strpos(method,'List')!==false) {
				element = Yii.CHtml[method](model, this.name, this.items, this.attributes);
			}
			else {
				element = Yii.CHtml[method](model, this.name, this.attributes);
			}
		}
		else	{
			attributes=this.attributes;
			attributes['model']=model;
			attributes['attribute']=this.name;
			element = this.getParent().getOwner().widget(this.type, attributes);
		}
		jQuery("body").delegate("#" + jQuery(element).attr("id"), "blur", function(e) {
			
			var el = jQuery("#" + jQuery(element).attr("id")), errorDiv;
			
			errorDiv = jQuery(el.parent().find("div.errorMessage"));
			model.set(self.name, jQuery(this).val());
			if (!model.validate([self.name])) {
				errorDiv.html(Yii.CHtml.error(model,self.name)).fadeIn(500);
			}
			else if (errorDiv.is(":visible")) {
				errorDiv.fadeOut(250);
			}
			
		});
		return element;
	};
/**
 * Renders the error display of this input.
 * The default implementation returns the result of {@link CHtml::error}
 * @returns {String} the rendering result
 */
Yii.CFormInputElement.prototype.renderError = function () {
		var htmlOptions = {}, html, model;
		htmlOptions['class'] = 'errorMessage';
		model=this.getParent().getModel();
		html=Yii.CHtml.error(model,this.name);
		if(html==='') {
			if(htmlOptions['style'] !== undefined) {
				htmlOptions['style']=php.rtrim(htmlOptions['style'],';')+';display:none';
			}
			else {
				htmlOptions['style']='display:none';
			}
			html=Yii.CHtml.tag('div',htmlOptions,'');
		}
		return html;
	};
/**
 * Renders the hint text for this input.
 * The default implementation returns the {@link hint} property enclosed in a paragraph HTML tag.
 * @returns {String} the rendering result.
 */
Yii.CFormInputElement.prototype.renderHint = function () {
		return this.hint===null ? '' : '<div class="hint">'+this.hint+'</div>';
	};
/**
 * Evaluates the visibility of this element.
 * This method will check if the attribute associated with this input is safe for
 * the current model scenario.
 * @returns {Boolean} whether this element is visible.
 */
Yii.CFormInputElement.prototype.evaluateVisible = function () {
		return this.getParent().getModel().isAttributeSafe(this.name);
	};