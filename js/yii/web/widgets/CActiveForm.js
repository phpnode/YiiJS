/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CActiveForm provides a set of methods that can help to simplify the creation
 * of complex and interactive HTML forms that are associated with data models.
 * 
 * The 'beginWidget' and 'endWidget' call of CActiveForm widget will render
 * the open and close form tags. Most other methods of CActiveForm are wrappers
 * of the corresponding 'active' methods in {@link CHtml}. Calling them in between
 * the 'beginWidget' and 'endWidget' calls will render text labels, input fields,
 * etc. For example, calling {@link CActiveForm::textField}
 * would generate an input field for a specified model attribute.
 * 
 * What makes CActiveForm extremely useful is its support for data validation.
 * CActiveForm supports data validation at three levels:
 * <ul>
 * <li>server-side validation: the validation is performed at server side after
 * the whole page containing the form is submitted. If there is any validation error,
 * CActiveForm will render the error in the page back to user.</li>
 * <li>AJAX-based validation: when the user enters data into an input field,
 * an AJAX request is triggered which requires server-side validation. The validation
 * result is sent back in AJAX response and the input field changes its appearance
 * accordingly.</li>
 * <li>client-side validation (available since version 1.1.7):
 * when the user enters data into an input field,
 * validation is performed on the client side using JavaScript. No server contact
 * will be made, which reduces the workload on the server.</li>
 * </ul>
 * 
 * All these validations share the same set of validation rules declared in
 * the associated model class. CActiveForm is designed in such a way that
 * all these validations will lead to the same user interface changes and error
 * message content.
 * 
 * To ensure data validity, server-side validation is always performed.
 * By setting {@link enableAjaxValidation} to true, one can enable AJAX-based validation;
 * and by setting {@link enableClientValidation} to true, one can enable client-side validation.
 * Note that in order to make the latter two validations work, the user's browser
 * must has its JavaScript enabled. If not, only the server-side validation will
 * be performed.
 * 
 * The AJAX-based validation and client-side validation may be used together
 * or separately. For example, in a user registration form, one may use AJAX-based
 * validation to check if the user has picked a unique username, and use client-side
 * validation to ensure all required fields are entered with data.
 * Because the AJAX-based validation may bring extra workload on the server,
 * if possible, one should mainly use client-side validation.
 * 
 * The AJAX-based validation has a few limitations. First, it does not work
 * with file upload fields. Second, it should not be used to perform validations that
 * may cause server-side state changes. Third, it is not designed
 * to work with tabular data input for the moment.
 * 
 * Support for client-side validation varies for different validators. A validator
 * will support client-side validation only if it implements {@link CValidator::clientValidateAttribute}
 * and has its {@link CValidator::enableClientValidation} property set true.
 * At this moment, the following core validators support client-side validation:
 * <ul>
 * <li>{@link CBooleanValidator}</li>
 * <li>{@link CCaptchaValidator}</li>
 * <li>{@link CCompareValidator}</li>
 * <li>{@link CEmailValidator}</li>
 * <li>{@link CNumberValidator}</li>
 * <li>{@link CRangeValidator}</li>
 * <li>{@link CRegularExpressionValidator}</li>
 * <li>{@link CRequiredValidator}</li>
 * <li>{@link CStringValidator}</li>
 * <li>{@link CUrlValidator}</li>
 * </ul>
 * 
 * CActiveForm relies on CSS to customize the appearance of input fields
 * which are in different validation states. In particular, each input field
 * may be one of the four states: initial (not validated),
 * validating, error and success. To differentiate these states, CActiveForm
 * automatically assigns different CSS classes for the last three states
 * to the HTML element containing the input field.
 * By default, these CSS classes are named as 'validating', 'error' and 'success',
 * respectively. We may customize these CSS classes by configuring the
 * {@link clientOptions} property or specifying in the {@link error} method.
 * 
 * The following is a piece of sample view code showing how to use CActiveForm:
 * 
 * <pre>
 * <?php form = this.beginWidget('CActiveForm', {
 *     'id':'user-form',
 *     'enableAjaxValidation':true,
 *     'enableClientValidation':true,
 *     'focus':{model,'firstName'},
 * }); ?>
 * 
 * document.write(form.errorSummary(model)); ?>
 * 
 * <div class="row">
 *     document.write(form.labelEx(model,'firstName')); ?>
 *     document.write(form.textField(model,'firstName')); ?>
 *     document.write(form.error(model,'firstName')); ?>
 * </div>
 * <div class="row">
 *     document.write(form.labelEx(model,'lastName')); ?>
 *     document.write(form.textField(model,'lastName')); ?>
 *     document.write(form.error(model,'lastName')); ?>
 * </div>
 * 
 * this.endWidget(); ?>
 * </pre>
 * 
 * To respond to the AJAX validation requests, we need the following class code:
 * <pre>
 * public function actionCreate()
 * {
 *     model=new User();
 *     this.performAjaxValidation(model);
 *     if(_POST['User'] !== undefined)
 *     {
 *         model.attributes=_POST['User'];
 *         if(model.save()) {
 *             this.redirect('index');
 * 		}
 *     }
 *     this.render('create',{'model':model});
 * }
 * 
 * protected function performAjaxValidation(model)
 * {
 *     if(_POST['ajax'] !== undefined && _POST['ajax']==='user-form')
 *     {
 *         document.write(Yii.CActiveForm.validate(model));
 *         Yii.app().php.end();
 *     }
 * }
 * </pre>
 * 
 * In the above code, if we do not enable the AJAX-based validation, we can remove
 * the <code>performAjaxValidation</code> method and its invocation.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CActiveForm.php 3171 2011-04-08 20:51:31Z qiang.xue $
 * @package system.web.widgets
 * @since 1.1.1
 * @author Charles Pick
 * @class
 * @extends Yii.CWidget
 */
Yii.CActiveForm = function CActiveForm () {
	
};
Yii.CActiveForm.prototype = new Yii.CWidget(false);
Yii.CActiveForm.prototype.constructor =  Yii.CActiveForm;
/**
 * @var {Mixed} the form action URL (see {@link CHtml::normalizeUrl} for details about this parameter).
 * If not set, the current page URL is used.
 */
Yii.CActiveForm.prototype.action = '';
/**
 * @var {String} the form submission method. This should be either 'post' or 'get'.
 * Defaults to 'post'.
 */
Yii.CActiveForm.prototype.method = 'post';
/**
 * @var {Boolean} whether to generate a stateful form (See {@link CHtml::statefulForm}). Defaults to false.
 */
Yii.CActiveForm.prototype.stateful = false;
/**
 * @var {String} the CSS class name for error messages. Defaults to 'errorMessage'.
 * Individual {@link error} call may override this value by specifying the 'class' HTML option.
 */
Yii.CActiveForm.prototype.errorMessageCssClass = 'errorMessage';
/**
 * @var {Array} additional HTML attributes that should be rendered for the form tag.
 */
Yii.CActiveForm.prototype.htmlOptions = {};
/**
 * @var {Array} the options to be passed to the javascript validation plugin.
 * The following options are supported:
 * <ul>
 * <li>ajaxVar: string, the name of the parameter indicating the request is an AJAX request.
 * When the AJAX validation is triggered, a parameter named as this property will be sent
 * together with the other form data to the server. The parameter value is the form ID.
 * The server side can then detect who triggers the AJAX validation and react accordingly.
 * Defaults to 'ajax'.</li>
 * <li>validationUrl: string, the URL that performs the AJAX validations.
 * If not set, it will take the value of {@link action}.</li>
 * <li>validationDelay: integer, the number of milliseconds that an AJAX validation should be
 * delayed after an input is changed. A value 0 means the validation will be triggered immediately
 * when an input is changed. A value greater than 0 means changing several inputs may only
 * trigger a single validation if they happen fast enough, which may help reduce the server load.
 * Defaults to 200 (0.2 second).</li>
 * <li>validateOnSubmit: boolean, whether to perform AJAX validation when the form is being submitted.
 * If there are any validation errors, the form submission will be stopped.
 * Defaults to false.</li>
 * <li>validateOnChange: boolean, whether to trigger an AJAX validation
 * each time when an input's value is changed.	You may want to turn this off
 * if it causes too much performance impact, because each AJAX validation request
 * will submit the data of the whole form. Defaults to true.</li>
 * <li>validateOnType: boolean, whether to trigger an AJAX validation each time when the user
 * presses a key. When setting this property to be true, you should tune up the 'validationDelay'
 * option to avoid triggering too many AJAX validations. Defaults to false.</li>
 * <li>hideErrorMessage: boolean, whether to hide the error message even if there is an error.
 * Defaults to false, which means the error message will show up whenever the input has an error.</li>
 * <li>inputContainer: string, the jQuery selector for the HTML element containing the input field.
 * During the validation process, CActiveForm will set different CSS class for the container element
 * to indicate the state change. If not set, it means the closest 'div' element that contains the input field.</li>
 * <li>errorCssClass: string, the CSS class to be assigned to the container whose associated input
 * has AJAX validation error. Defaults to 'error'.</li>
 * <li>successCssClass: string, the CSS class to be assigned to the container whose associated input
 * passes AJAX validation without any error. Defaults to 'success'.</li>
 * <li>validatingCssClass: string, the CSS class to be assigned to the container whose associated input
 * is currently being validated via AJAX. Defaults to 'validating'.</li>
 * <li>errorMessageCssClass: string, the CSS class assigned to the error messages returned
 * by AJAX validations. Defaults to 'errorMessage'.</li>
 * <li>beforeValidate: function, the function that will be invoked before performing ajax-based validation
 * triggered by form submission action (available only when validateOnSubmit is set true).
 * The expected function signature should be <code>beforeValidate(form) {...}</code>, where 'form' is
 * the jquery representation of the form object. If the return value of this function is NOT true, the validation
 * will be cancelled.
 * 
 * Note that because this option refers to a js function, you should prefix the value with 'js:' to prevent it
 * from being encoded as a string. This option has been available since version 1.1.3.</li>
 * <li>afterValidate: function, the function that will be invoked after performing ajax-based validation
 * triggered by form submission action (available only when validateOnSubmit is set true).
 * The expected function signature should be <code>afterValidate(form, data, hasError) {...}</code>, where 'form' is
 * the jquery representation of the form object; 'data' is the JSON response from the server-side validation; 'hasError'
 * is a boolean value indicating whether there is any validation error. If the return value of this function is NOT true,
 * the normal form submission will be cancelled.
 * 
 * Note that because this option refers to a js function, you should prefix the value with 'js:' to prevent it
 * from being encoded as a string. This option has been available since version 1.1.3.</li>
 * <li>beforeValidateAttribute: function, the function that will be invoked before performing ajax-based validation
 * triggered by a single attribute input change. The expected function signature should be
 * <code>beforeValidateAttribute(form, attribute) {...}</code>, where 'form' is the jquery representation of the form object
 * and 'attribute' refers to the js options for the triggering attribute (see {@link error}).
 * If the return value of this function is NOT true, the validation will be cancelled.
 * 
 * Note that because this option refers to a js function, you should prefix the value with 'js:' to prevent it
 * from being encoded as a string. This option has been available since version 1.1.3.</li>
 * <li>afterValidateAttribute: function, the function that will be invoked after performing ajax-based validation
 * triggered by a single attribute input change. The expected function signature should be
 * <code>beforeValidateAttribute(form, attribute, data, hasError) {...}</code>, where 'form' is the jquery
 * representation of the form object; 'attribute' refers to the js options for the triggering attribute (see {@link error});
 * 'data' is the JSON response from the server-side validation; 'hasError' is a boolean value indicating whether
 * there is any validation error.
 * 
 * Note that because this option refers to a js function, you should prefix the value with 'js:' to prevent it
 * from being encoded as a string. This option has been available since version 1.1.3.</li>
 * </ul>
 * 
 * Some of the above options may be overridden in individual calls of {@link error()}.
 * They include: validationDelay, validateOnChange, validateOnType, hideErrorMessage,
 * inputContainer, errorCssClass, successCssClass, validatingCssClass, beforeValidateAttribute, afterValidateAttribute.
 */
Yii.CActiveForm.prototype.clientOptions = {};
/**
 * @var {Boolean} whether to enable data validation via AJAX. Defaults to false.
 * When this property is set true, you should respond to the AJAX validation request on the server side as shown below:
 * <pre>
 * public function actionCreate()
 * {
 *     model=new User();
 *     if(_POST['ajax'] !== undefined && _POST['ajax']==='user-form')
 *     {
 *         document.write(Yii.CActiveForm.validate(model));
 *         Yii.app().php.end();
 *     }
 *     ++++++
 * }
 * </pre>
 */
Yii.CActiveForm.prototype.enableAjaxValidation = false;
/**
 * @var {Boolean} whether to enable client-side data validation. Defaults to false.
 * 
 * When this property is set true, client-side validation will be performed by validators
 * that support it (see {@link CValidator::enableClientValidation} and {@link CValidator::clientValidateAttribute}).
 * 
 * @see error
 * @since 1.1.7
 */
Yii.CActiveForm.prototype.enableClientValidation = false;
/**
 * @var {Mixed} form element to get initial input focus on page load.
 * 
 * Defaults to null meaning no input field has a focus.
 * If set as array, first element should be model and second element should be the attribute.
 * If set as string any jQuery selector can be used
 * 
 * Example - set input focus on page load to:
 * <ul>
 * <li>'focus'=>array($model,'username') - $model->username input filed</li>
 * <li>'focus'=>'#'.CHtml::activeId($model,'username') - $model->username input field</li>
 * <li>'focus'=>'#LoginForm_username' - input field with ID LoginForm_username</li>
 * <li>'focus'=>'input[type="text"]:first' - first input element of type text</li>
 * <li>'focus'=>'input:visible:enabled:first' - first visible and enabled input element</li>
 * <li>'focus'=>'input:text[value=""]:first' - first empty input</li>
 * </ul>
 * 
 * @since 1.1.4
 */
Yii.CActiveForm.prototype.focus = null;
/**
 * @var {Array} the javascript options for model attributes (input ID => options)
 * @see error
 * @since 1.1.7
 */
Yii.CActiveForm.prototype.attributes = [];
/**
 * @var {String} the ID of the container element for error summary
 * @see errorSummary
 * @since 1.1.7
 */
Yii.CActiveForm.prototype.summaryID = null;
/**
 * Initializes the widget.
 * This renders the form open tag.
 */
Yii.CActiveForm.prototype.init = function () {
		if(this.htmlOptions['id'] === undefined) {
			this.htmlOptions['id']=this.id;
		}
				
		
	};
/**
 * Runs the widget.
 * This registers the necessary javascript code and renders the form close tag.
 */
Yii.CActiveForm.prototype.run = function () {
		var cs, options, id;
		
		if(Object.prototype.toString.call(this.focus) === '[object Array]') {
			this.focus="#"+Yii.CHtml.activeId(this.focus[0],this.focus[1]);
		}
		document.write(Yii.CHtml.endForm());
		cs=Yii.app().clientScript;
		if(!this.enableAjaxValidation && !this.enableClientValidation || php.empty(this.attributes)) {
			if(this.focus!==null) {
				cs.registerCoreScript('jquery');
			}
		}
		options=this.clientOptions;
		if(this.clientOptions['validationUrl'] !== undefined && Object.prototype.toString.call(this.clientOptions['validationUrl']) === '[object Array]') {
			options['validationUrl']=Yii.CHtml.normalizeUrl(this.clientOptions['validationUrl']);
		}
		options['attributes']=php.array_values(this.attributes);
		if(this.summaryID!==null) {
			options['summaryID']=this.summaryID;
		}
		if(this.focus!==null) {
			options['focus']=this.focus;
		}
		options=Yii.CJavaScript.encode(options);
		cs.registerCoreScript('yiiactiveform');
		id=this.id;
		cs.registerScript(__CLASS__+'#'+id,"\$('#id').yiiactiveform(options);");
	};
/**
 * Displays the first validation error for a model attribute.
 * This is similar to {@link CHtml::error} except that it registers the model attribute
 * so that if its value is changed by users, an AJAX validation may be triggered.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute name
 * @param {Array} htmlOptions additional HTML attributes to be rendered in the container div tag.
 * Besides all those options available in {@link CHtml::error}, the following options are recognized in addition:
 * <ul>
 * <li>validationDelay</li>
 * <li>validateOnChange</li>
 * <li>validateOnType</li>
 * <li>hideErrorMessage</li>
 * <li>inputContainer</li>
 * <li>errorCssClass</li>
 * <li>successCssClass</li>
 * <li>validatingCssClass</li>
 * <li>beforeValidateAttribute</li>
 * <li>afterValidateAttribute</li>
 * </ul>
 * These options override the corresponding options as declared in {@link options} for this
 * particular model attribute. For more details about these options, please refer to {@link clientOptions}.
 * Note that these options are only used when {@link enableAjaxValidation} or {@link enableClientValidation}
 * is set true.
 * 
 * When client-side validation is enabled, an option named "clientValidation" is also recognized.
 * This option should take a piece of JavaScript code to perform client-side validation. In the code,
 * the variables are predefined:
 * <ul>
 * <li>value: the current input value associated with this attribute.</li>
 * <li>messages: an array that may be appended with new error messages for the attribute.</li>
 * <li>attribute: a data structure keeping all client-side options for the attribute</li>
 * </ul>
 * @param {Boolean} enableAjaxValidation whether to enable AJAX validation for the specified attribute.
 * Note that in order to enable AJAX validation, both {@link enableAjaxValidation} and this parameter
 * must be true.
 * @param {Boolean} enableClientValidation whether to enable client-side validation for the specified attribute.
 * Note that in order to enable client-side validation, both {@link enableClientValidation} and this parameter
 * must be true. This parameter has been available since version 1.1.7.
 * @returns {String} the validation result (error display or success message).
 * @see CHtml::error
 */
Yii.CActiveForm.prototype.error = function (model, attribute, htmlOptions, enableAjaxValidation, enableClientValidation) {
		var id, inputID, option, optionNames, i, name, validators, n, validatorList, validator, js, html;
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		if (enableAjaxValidation === undefined) {
			enableAjaxValidation = true;
		}
		if (enableClientValidation === undefined) {
			enableClientValidation = true;
		}
		if(!this.enableAjaxValidation) {
			enableAjaxValidation=false;
		}
		if(!this.enableClientValidation) {
			enableClientValidation=false;
		}
		if(!enableAjaxValidation && !enableClientValidation) {
			return Yii.CHtml.error(model,attribute,htmlOptions);
		}
		id=Yii.CHtml.activeId(model,attribute);
		inputID=htmlOptions['inputID'] !== undefined ? htmlOptions['inputID'] : id;
		delete htmlOptions['inputID'];
		if(htmlOptions['id'] === undefined) {
			htmlOptions['id']=inputID+'_em_';
		}
		option={
			'id':id,
			'inputID':inputID,
			'errorID':htmlOptions['id'],
			'model':model.getClassName(),
			'name':Yii.CHtml.resolveName(model, attribute),
			'enableAjaxValidation':enableAjaxValidation
		};
		optionNames=[
			'validationDelay',
			'validateOnChange',
			'validateOnType',
			'hideErrorMessage',
			'inputContainer',
			'errorCssClass',
			'successCssClass',
			'validatingCssClass',
			'beforeValidateAttribute',
			'afterValidateAttribute'
		];
		for (i in optionNames) {
			if (optionNames.hasOwnProperty(i)) {
				name = optionNames[i];
				if(htmlOptions[name] !== undefined)	{
					option[name]=htmlOptions[name];
					delete htmlOptions[name];
				}
			}
		}
		if(model instanceof Yii.CActiveRecord && !model.isNewRecord) {
			option['status']=1;
		}
		if(enableClientValidation) {
			validators=htmlOptions['clientValidation'] !== undefined ? [htmlOptions['clientValidation']] : [];
			validatorList = model.getValidators(attribute);
			for (n in validatorList) {
				if (validatorList.hasOwnProperty(n)) {
					validator = validatorList[n];
					if(enableClientValidation && validator.enableClientValidation) {
						if((js=validator.clientValidateAttribute(model,attribute))!='') {
							validators.push(js);
						}
					}
				}
			}
			if(validators!==[]) {
				option['clientValidation']="js:function(value, messages, attribute) {\n"+validators.join("\n")+"\n}";
			}
		}
		if(htmlOptions['class'] === undefined) {
			htmlOptions['class']=this.errorMessageCssClass;
		}
		html=Yii.CHtml.error(model,attribute,htmlOptions);
		if(html==='') {
			if(htmlOptions['style'] !== undefined) {
				htmlOptions['style']=php.rtrim(htmlOptions['style'],';')+';display:none';
			}
			else {
				htmlOptions['style']='display:none';
			}
			html=Yii.CHtml.tag('div',htmlOptions,'');
		}
		this.attributes[inputID]=option;
		return html;
	};
/**
 * Displays a summary of validation errors for one or several models.
 * This method is very similar to {@link CHtml::errorSummary} except that it also works
 * when AJAX validation is performed.
 * @param {Mixed} models the models whose input errors are to be displayed. This can be either
 * a single model or an array of models.
 * @param {String} header a piece of HTML code that appears in front of the errors
 * @param {String} footer a piece of HTML code that appears at the end of the errors
 * @param {Array} htmlOptions additional HTML attributes to be rendered in the container div tag.
 * @returns {String} the error summary. Empty if no errors are found.
 * @see CHtml::errorSummary
 */
Yii.CActiveForm.prototype.errorSummary = function (models, header, footer, htmlOptions) {
		var html, errorSummaryCss;
		if (header === undefined) {
			header = null;
		}
		if (footer === undefined) {
			footer = null;
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		if(!this.enableAjaxValidation && !this.enableClientValidation) {
			return Yii.CHtml.errorSummary(models,header,footer,htmlOptions);
		}
		if(htmlOptions['id'] === undefined) {
			htmlOptions['id']=this.id+'_es_';
		}
		html=Yii.CHtml.errorSummary(models,header,footer,htmlOptions);
		if(html==='') {
			if(header===null) {
				header='<p>'+Yii.t('yii','Please fix the following input errors:')+'</p>';
			}
			if(htmlOptions['class'] === undefined) {
				htmlOptions['class']=Yii.CHtml.errorSummaryCss;
			}
			htmlOptions['style']=htmlOptions['style'] !== undefined ? php.rtrim(htmlOptions['style'],';')+';display:none' : 'display:none';
			html=Yii.CHtml.tag('div',htmlOptions,header+"\n<ul><li>dummy</li></ul>"+footer);
		}
		this.summaryID=htmlOptions['id'];
		return html;
	};
/**
 * Renders an HTML label for a model attribute.
 * This method is a wrapper of {@link CHtml::activeLabel}.
 * Please check {@link CHtml::activeLabel} for detailed information
 * about the parameters for this method.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes.
 * @returns {String} the generated label tag
 */
Yii.CActiveForm.prototype.labelVar = function (model, attribute, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return Yii.CHtml.activeLabel(model,attribute,htmlOptions);
	};
/**
 * Renders an HTML label for a model attribute.
 * This method is a wrapper of {@link CHtml::activeLabelEx}.
 * Please check {@link CHtml::activeLabelEx} for detailed information
 * about the parameters for this method.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes.
 * @returns {String} the generated label tag
 */
Yii.CActiveForm.prototype.labelEx = function (model, attribute, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return Yii.CHtml.activeLabelEx(model,attribute,htmlOptions);
	};
/**
 * Renders a text field for a model attribute.
 * This method is a wrapper of {@link CHtml::activeTextField}.
 * Please check {@link CHtml::activeTextField} for detailed information
 * about the parameters for this method.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes.
 * @returns {String} the generated input field
 */
Yii.CActiveForm.prototype.textField = function (model, attribute, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return Yii.CHtml.activeTextField(model,attribute,htmlOptions);
	};
/**
 * Renders a hidden field for a model attribute.
 * This method is a wrapper of {@link CHtml::activeHiddenField}.
 * Please check {@link CHtml::activeHiddenField} for detailed information
 * about the parameters for this method.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes.
 * @returns {String} the generated input field
 */
Yii.CActiveForm.prototype.hiddenField = function (model, attribute, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return Yii.CHtml.activeHiddenField(model,attribute,htmlOptions);
	};
/**
 * Renders a password field for a model attribute.
 * This method is a wrapper of {@link CHtml::activePasswordField}.
 * Please check {@link CHtml::activePasswordField} for detailed information
 * about the parameters for this method.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes.
 * @returns {String} the generated input field
 */
Yii.CActiveForm.prototype.passwordField = function (model, attribute, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return Yii.CHtml.activePasswordField(model,attribute,htmlOptions);
	};
/**
 * Renders a text area for a model attribute.
 * This method is a wrapper of {@link CHtml::activeTextArea}.
 * Please check {@link CHtml::activeTextArea} for detailed information
 * about the parameters for this method.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes.
 * @returns {String} the generated text area
 */
Yii.CActiveForm.prototype.textArea = function (model, attribute, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return Yii.CHtml.activeTextArea(model,attribute,htmlOptions);
	};
/**
 * Renders a file field for a model attribute.
 * This method is a wrapper of {@link CHtml::activeFileField}.
 * Please check {@link CHtml::activeFileField} for detailed information
 * about the parameters for this method.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes
 * @returns {String} the generated input field
 */
Yii.CActiveForm.prototype.fileField = function (model, attribute, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return Yii.CHtml.activeFileField(model,attribute,htmlOptions);
	};
/**
 * Renders a radio button for a model attribute.
 * This method is a wrapper of {@link CHtml::activeRadioButton}.
 * Please check {@link CHtml::activeRadioButton} for detailed information
 * about the parameters for this method.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes.
 * @returns {String} the generated radio button
 */
Yii.CActiveForm.prototype.radioButton = function (model, attribute, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return Yii.CHtml.activeRadioButton(model,attribute,htmlOptions);
	};
/**
 * Renders a checkbox for a model attribute.
 * This method is a wrapper of {@link CHtml::activeCheckBox}.
 * Please check {@link CHtml::activeCheckBox} for detailed information
 * about the parameters for this method.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes.
 * @returns {String} the generated check box
 */
Yii.CActiveForm.prototype.checkBox = function (model, attribute, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return Yii.CHtml.activeCheckBox(model,attribute,htmlOptions);
	};
/**
 * Renders a dropdown list for a model attribute.
 * This method is a wrapper of {@link CHtml::activeDropDownList}.
 * Please check {@link CHtml::activeDropDownList} for detailed information
 * about the parameters for this method.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} data data for generating the list options (value=>display)
 * @param {Array} htmlOptions additional HTML attributes.
 * @returns {String} the generated drop down list
 */
Yii.CActiveForm.prototype.dropDownList = function (model, attribute, data, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return Yii.CHtml.activeDropDownList(model,attribute,data,htmlOptions);
	};
/**
 * Renders a list box for a model attribute.
 * This method is a wrapper of {@link CHtml::activeListBox}.
 * Please check {@link CHtml::activeListBox} for detailed information
 * about the parameters for this method.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} data data for generating the list options (value=>display)
 * @param {Array} htmlOptions additional HTML attributes.
 * @returns {String} the generated list box
 */
Yii.CActiveForm.prototype.listBox = function (model, attribute, data, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return Yii.CHtml.activeListBox(model,attribute,data,htmlOptions);
	};
/**
 * Renders a checkbox list for a model attribute.
 * This method is a wrapper of {@link CHtml::activeCheckBoxList}.
 * Please check {@link CHtml::activeCheckBoxList} for detailed information
 * about the parameters for this method.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} data value-label pairs used to generate the check box list.
 * @param {Array} htmlOptions addtional HTML options.
 * @returns {String} the generated check box list
 */
Yii.CActiveForm.prototype.checkBoxList = function (model, attribute, data, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return Yii.CHtml.activeCheckBoxList(model,attribute,data,htmlOptions);
	};
/**
 * Renders a radio button list for a model attribute.
 * This method is a wrapper of {@link CHtml::activeRadioButtonList}.
 * Please check {@link CHtml::activeRadioButtonList} for detailed information
 * about the parameters for this method.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} data value-label pairs used to generate the radio button list.
 * @param {Array} htmlOptions addtional HTML options.
 * @returns {String} the generated radio button list
 */
Yii.CActiveForm.prototype.radioButtonList = function (model, attribute, data, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return Yii.CHtml.activeRadioButtonList(model,attribute,data,htmlOptions);
	};
/**
 * Validates one or several models and returns the results in JSON format.
 * This is a helper method that simplifies the way of writing AJAX validation code.
 * @param {Mixed} models a single model instance or an array of models.
 * @param {Array} attributes list of attributes that should be validated. Defaults to null,
 * meaning any attribute listed in the applicable validation rules of the models should be
 * validated. If this parameter is given as a list of attributes, only
 * the listed attributes will be validated.
 * @param {Boolean} loadInput whether to load the data from $_POST array in this method.
 * If this is true, the model will be populated from <code>$_POST[ModelClass]</code>.
 * @returns {String} the JSON representation of the validation error messages.
 */
Yii.CActiveForm.prototype.validate = function (models, attributes, loadInput) {
		var result, i, _POST, model, attributeErrors, attribute, errors;
		if (attributes === undefined) {
			attributes = null;
		}
		if (loadInput === undefined) {
			loadInput = true;
		}
		result={};
		if(Object.prototype.toString.call(models) !== '[object Array]') {
			models=[models];
		}
		for (i in models) {
			if (models.hasOwnProperty(i)) {
				model = models[i];
				if(loadInput && _POST[model.getClassName()] !== undefined) {
					model.attributes=_POST[model.getClassName()];
				}
				model.validate(attributes);
				attributeErrors = model.getErrors();
				for (attribute in attributeErrors) {
					if (attributeErrors.hasOwnProperty(attribute)) {
						errors = attributeErrors[attribute];
						result[Yii.CHtml.activeId(model,attribute)]=errors;
					}
				}
			}
		}
		return Yii.CJSON.encode(result);
	};