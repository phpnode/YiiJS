/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CForm represents a form object that contains form input specifications.
 * 
 * The main purpose of introducing the abstraction of form objects is to enhance the
 * reusability of forms. In particular, we can divide a form in two parts: those
 * that specify each individual form inputs, and those that decorate the form inputs.
 * A CForm object represents the former part. It relies on the rendering process to
 * accomplish form input decoration. Reusability is mainly achieved in the rendering process.
 * That is, a rendering process can be reused to render different CForm objects.
 * 
 * A form can be rendered in different ways. One can call the {@link render} method
 * to get a quick form rendering without writing any HTML code; one can also override
 * {@link render} to render the form in a different layout; and one can use an external
 * view template to render each form element explicitly. In these ways, the {@link render}
 * method can be applied to all kinds of forms and thus achieves maximum reusability;
 * while the external view template keeps maximum flexibility in rendering complex forms.
 * 
 * Form input specifications are organized in terms of a form element hierarchy.
 * At the root of the hierarchy, it is the root CForm object. The root form object maintains
 * its children in two collections: {@link elements} and {@link buttons}.
 * The former contains non-button form elements ({@link CFormStringElement},
 * {@link CFormInputElement} and CForm); while the latter mainly contains
 * button elements ({@link CFormButtonElement}). When a CForm object is embedded in the
 * {@link elements} collection, it is called a sub-form which can have its own {@link elements}
 * and {@link buttons} collections and thus form the whole form hierarchy.
 * 
 * Sub-forms are mainly used to handle multiple models. For example, in a user
 * registration form, we can have the root form to collect input for the user
 * table while a sub-form to collect input for the profile table. Sub-form is also
 * a good way to partition a lengthy form into shorter ones, even though all inputs
 * may belong to the same model.
 * 
 * Form input specifications are given in terms of a configuration array which is
 * used to initialize the property values of a CForm object. The {@link elements} and
 * {@link buttons} properties need special attention as they are the main properties
 * to be configured. To configure {@link elements}, we should give it an array like
 * the following:
 * <pre>
 * 'elements':{
 *     'username':{'type':'text', 'maxlength':80},
 *     'password':{'type':'password', 'maxlength':80},
 * }
 * </pre>
 * The above code specifies two input elements: 'username' and 'password'. Note the model
 * object must have exactly the same attributes 'username' and 'password'. Each element
 * has a type which specifies what kind of input should be used. The rest of the array elements
 * (e.g. 'maxlength') in an input specification are rendered as HTML element attributes
 * when the input field is rendered. The {@link buttons} property is configured similarly.
 * 
 * For more details about configuring form elements, please refer to {@link CFormInputElement}
 * and {@link CFormButtonElement}.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CForm.php 3076 2011-03-14 13:16:43Z qiang.xue $
 * @package system.web.form
 * @since 1.1
 * @author Charles Pick
 * @class
 * @extends Yii.CFormElement
 */
Yii.CForm = function CForm (config, model, parent) {
	if (config !== false) {
		this.construct(config, model, parent);
	}
};
Yii.CForm.prototype = new Yii.CFormElement(false);
Yii.CForm.prototype.constructor =  Yii.CForm;
/**
 * @var {String} the title for this form. By default, if this is set, a fieldset may be rendered
 * around the form body using the title as its legend. Defaults to null.
 */
Yii.CForm.prototype.title = null;
/**
 * @var {String} the description of this form.
 */
Yii.CForm.prototype.description = null;
/**
 * @var {String} the submission method of this form. Defaults to 'post'.
 * This property is ignored when this form is a sub-form.
 */
Yii.CForm.prototype.method = 'post';
/**
 * @var {Mixed} the form action URL (see {@link CHtml::normalizeUrl} for details about this parameter.)
 * Defaults to an empty string, meaning the current request URL.
 * This property is ignored when this form is a sub-form.
 */
Yii.CForm.prototype.action = '';
/**
 * @var {String} the name of the class for representing a form input element. Defaults to 'CFormInputElement'.
 */
Yii.CForm.prototype.inputElementClass = 'CFormInputElement';
/**
 * @var {String} the name of the class for representing a form button element. Defaults to 'CFormButtonElement'.
 */
Yii.CForm.prototype.buttonElementClass = 'CFormButtonElement';
/**
 * @var {Array} HTML attribute values for the form tag. When the form is embedded within another form,
 * this property will be used to render the HTML attribute values for the fieldset enclosing the child form.
 */
Yii.CForm.prototype.attributes = {};
/**
 * @var {Boolean} whether to show error summary. Defaults to false.
 */
Yii.CForm.prototype.showErrorSummary = false;
/**
 * @var {Array} the configuration used to create the active form widget.
 * The widget will be used to render the form tag and the error messages.
 * The 'class' option is required, which specifies the class of the widget.
 * The rest of the options will be passed to {@link CBaseController::beginWidget()} call.
 * Defaults to array('class'=>'CActiveForm').
 * @since 1.1.1
 */
Yii.CForm.prototype.activeForm = {'class':'CActiveForm'};
Yii.CForm.prototype._model = null;
Yii.CForm.prototype._elements = null;
Yii.CForm.prototype._buttons = null;
Yii.CForm.prototype._activeForm = null;
/**
 * Constructor.
 * If you override this method, make sure you do not modify the method
 * signature, and also make sure you call the parent implementation.
 * @param {Mixed} config the configuration for this form. It can be a configuration array
 * or the path alias of a PHP script file that returns a configuration array.
 * The configuration array consists of name-value pairs that are used to initialize
 * the properties of this form.
 * @param {Yii.CModel} model the model object associated with this form. If it is null,
 * the parent's model will be used instead.
 * @param {Mixed} parent the direct parent of this form. This could be either a {@link CBaseController}
 * object (a controller or a widget), or a {@link CForm} object.
 * If the former, it means the form is a top-level form; if the latter, it means this form is a sub-form.
 */
Yii.CForm.prototype.construct = function (config, model, parent) {
		if (model === undefined) {
			model = null;
		}
		if (parent === undefined) {
			parent = null;
		}
		this._model = null;
		this._elements = null;
		this._buttons = null;
		this._activeForm = null;
		this.setModel(model);
		
		if(parent===null) {
			parent=Yii.app().getController();
		}
		Yii.CFormElement.prototype.construct.call(this,config,parent);
		this.init();
	};
/**
 * Initializes this form.
 * This method is invoked at the end of the constructor.
 * You may override this method to provide customized initialization (such as
 * configuring the form object).
 */
Yii.CForm.prototype.init = function () {
	};
/**
 * This method is called before the form is submitted
 * @returns {Boolean} whether to submit the form or not
 */
Yii.CForm.prototype.beforeSubmit = function () {
		var event;
		if(this.hasEventHandler('onBeforeSubmit')) {
			event=new Yii.CEvent(this);
			this.onBeforeSubmit(event);
			return event.isValid;
		}
		else {
			return true;
		}
	};
/**
 * This method is called after the form is submitted
 */
Yii.CForm.prototype.afterSubmit = function () {
		var event;
		if(this.hasEventHandler('onAfterSubmit')) {
			event=new Yii.CEvent(this);
			this.onAfterSubmit(event);
		}
	};
/**
 * This method is called when the form is submitted, it does not submit the
 * form itself! To do that use the normal jQuery("#formId").submit() method which
 * will in turn call this method.
 * @param {DOMEvent} e The DOMEvent raised when the form is submitted
 */
Yii.CForm.prototype.submit = function (e) {
		var event;
		if(this.hasEventHandler('onSubmit')) {
			event=new Yii.CEvent(this);
			this.onSubmit(event);
			return event.isValid;
		}
		else {
			return true;
		}
	};

/**
 * This event is raised when the form is submitted
 * @param {Yii.CEvent} event the event parameter
 */
Yii.CForm.prototype.onSubmit = function (event) {
		this.raiseEvent('onSubmit',event);
	};
/**
 * This event is raised before the form is submitted
 * @param {Yii.CEvent} event the event parameter
 */
Yii.CForm.prototype.onBeforeSubmit = function (event) {
		this.raiseEvent('onBeforeSubmit',event);
	};
/**
 * This event is raised after the form is submitted
 * @param {Yii.CEvent} event the event parameter
 */
Yii.CForm.prototype.onAfterSubmit = function (event) {
		this.raiseEvent('onAfterSubmit',event);
	};

/**
 * Validates the models associated with this form.
 * All models, including those associated with sub-forms, will perform
 * the validation. You may use {@link CModel::getErrors()} to retrieve the validation
 * error messages.
 * @returns {Boolean} whether all models are valid
 */
Yii.CForm.prototype.validate = function () {
		var ret, i, modelList, model;
		ret=true;
		modelList = this.getModels();
		for (i in modelList) {
			if (modelList.hasOwnProperty(i)) {
				model = modelList[i];
				ret=model.validate() && ret;
			}
		}
		return ret;
	};
/**
 * Loads the submitted data into the associated model(s) to the form.
 * This method will go through all models associated with this form and its sub-forms
 * and massively assign the submitted data to the models.
 * @see submitted
 */
Yii.CForm.prototype.loadData = function () {
		var classVar;
		if(this._model!==null)	{
			classVar=this._model.getClassName();
			if(Yii.app().getRequest().params[classVar] !== undefined) {
				this._model.setAttributes(Yii.app().getRequest().params[classVar]);
			}
		}
		this.getElements().forEach(function(i, element) {
			if(element instanceof Yii.CForm) {
				element.loadData();
			}
		});
		
	};
/**
 * @returns {Yii.CForm} the top-level form object
 */
Yii.CForm.prototype.getRoot = function () {
		var root;
		root=this;
		while(root.getParent() instanceof Yii.CForm) {
			root=root.getParent();
		}
		return root;
	};
/**
 * @returns {Yii.CActiveForm} the active form widget associated with this form.
 * This method will return the active form widget as specified by {@link activeForm}.
 * @since 1.1.1
 */
Yii.CForm.prototype.getActiveFormWidget = function () {
		if(this._activeForm!==null) {
			return this._activeForm;
		}
		else {
			return this.getRoot()._activeForm;
		}
	};
/**
 * @returns {Yii.CBaseController} the owner of this form. This refers to either a controller or a widget
 * by which the form is created and rendered.
 */
Yii.CForm.prototype.getOwner = function () {
		var owner;
		owner=this.getParent();
		while(owner instanceof Yii.CForm) {
			owner=owner.getParent();
		}
		return owner;
	};
/**
 * Returns the model that this form is associated with.
 * @param {Boolean} checkParent whether to return parent's model if this form doesn't have model by itself.
 * @returns {Yii.CModel} the model associated with this form. If this form does not have a model,
 * it will look for a model in its ancestors.
 */
Yii.CForm.prototype.getModel = function (checkParent) {
		var form;
		if (checkParent === undefined) {
			checkParent = true;
		}
		if(!checkParent) {
			return this._model;
		}
		form=this;
		while(form._model===null && form.getParent() instanceof Yii.CForm) {
			form=form.getParent();
		}
		return form._model;
	};
/**
 * @param {Yii.CModel} model the model to be associated with this form
 */
Yii.CForm.prototype.setModel = function (model) {
		this._model=model;
	};
/**
 * Returns all models that are associated with this form or its sub-forms.
 * @returns {Array} the models that are associated with this form or its sub-forms.
 */
Yii.CForm.prototype.getModels = function () {
		var models, i, elementList, element;
		models=[];
		if(this._model!==null) {
			models.push(this._model);
		}
		this.getElements().forEach(function(i, element) {
			if(element instanceof Yii.CForm) {
				models=php.array_merge(models,element.getModels());
			}
		});
		
		return models;
	};
/**
 * Returns the input elements of this form.
 * This includes text strings, input elements and sub-forms.
 * Note that the returned result is a {@link CFormElementCollection} object, which
 * means you can use it like an array. For more details, see {@link CMap}.
 * @returns {Yii.CFormElementCollection} the form elements.
 */
Yii.CForm.prototype.getElements = function () {
		if(this._elements===null) {
			this._elements=new Yii.CFormElementCollection(this,false);
		}
		return this._elements;
	};
/**
 * Configures the input elements of this form.
 * The configuration must be an array of input configuration array indexed by input name.
 * Each input configuration array consists of name-value pairs that are used to initialize
 * a {@link CFormStringElement} object (when 'type' is 'string'), a {@link CFormElement} object
 * (when 'type' is a string ending with 'Form'), or a {@link CFormInputElement} object in
 * all other cases.
 * @param {Array} elements the button configurations
 */
Yii.CForm.prototype.setElements = function (elements) {
		var collection, name, config;
		collection=this.getElements();
		
		Yii.forEach(elements,function (name, config) {
			
			collection.add(name,config);
		});
		
	};
/**
 * Returns the button elements of this form.
 * Note that the returned result is a {@link CFormElementCollection} object, which
 * means you can use it like an array. For more details, see {@link CMap}.
 * @returns {Yii.CFormElementCollection} the form elements.
 */
Yii.CForm.prototype.getButtons = function () {
		if(this._buttons===null) {
			this._buttons=new Yii.CFormElementCollection(this,true);
		}
		return this._buttons;
	};
/**
 * Configures the buttons of this form.
 * The configuration must be an array of button configuration array indexed by button name.
 * Each button configuration array consists of name-value pairs that are used to initialize
 * a {@link CFormButtonElement} object.
 * @param {Array} buttons the button configurations
 */
Yii.CForm.prototype.setButtons = function (buttons) {
		var collection, name, config;
		collection=this.getButtons();
		for (name in buttons) {
			if (buttons.hasOwnProperty(name)) {
				config = buttons[name];
				collection.add(name,config);
			}
		}
	};
/**
 * Renders the form.
 * The default implementation simply calls {@link renderBegin}, {@link renderBody} and {@link renderEnd}.
 * @returns {String} the rendering result
 */
Yii.CForm.prototype.render = function () {
		return this.renderBegin() + this.renderBody() + this.renderEnd();
		
	};
/**
 * Renders the open tag of the form.
 * The default implementation will render the open form tag.
 * @returns {String} the rendering result
 */
Yii.CForm.prototype.renderBegin = function () {
		var options, classVar, name, value, self = this, id;
		
		if(this.getParent() instanceof Yii.CForm) {
				return '';
		}
			
		options=this.activeForm;
		if(options['class'] !== undefined) {
			classVar=options['class'];
			delete options['class'];
		}
		else {
			classVar='CActiveForm';
		}
		options['action']=this.action;
		options['method']=this.method;
		if(options['htmlOptions'] !== undefined) {
			for (name in this.attributes) {
				if (this.attributes.hasOwnProperty(name)) {
					value = this.attributes[name];
					options['htmlOptions'][name]=value;
				}
			}
		}
		else {
			options['htmlOptions']=this.attributes;
		}
		if (options.htmlOptions.id === undefined) {
			options.htmlOptions.id = this.getModel().getClassName() + "_form";
		}
		id = options.htmlOptions.id;
		Yii.app().getClientScript().registerScript("Yii.CForm#" + id, function () {
			jQuery("body").delegate("#" + id, "submit", function(e) {
				var handler;
				if (self.beforeSubmit()) {
					handler = self.submit(e);
					if (handler) {
						self.afterSubmit();
						return true;
					}
					else {
						e.preventDefault();
						return false; // stop event propogation
					}
				}
				else {
					e.preventDefault();
					return false; // stop event propogation
				}
			});
			jQuery("#" + id).data("Yii.CForm", self);
			return self;
		});
		return Yii.CHtml.beginForm(options.action, options.method, options.htmlOptions) + "<div style=\"visibility:hidden\">"+Yii.CHtml.hiddenField(this.getUniqueId(),1)+"</div>\n";

	
	};
/**
 * Renders the close tag of the form.
 * @returns {String} the rendering result
 */
Yii.CForm.prototype.renderEnd = function () {
		if(this.getParent() instanceof Yii.CForm) {
			return '';
		}
		else {
			return Yii.CHtml.endForm();
		}
	};
/**
 * Renders the body content of this form.
 * This method mainly renders {@link elements} and {@link buttons}.
 * If {@link title} or {@link description} is specified, they will be rendered as well.
 * And if the associated model contains error, the error summary may also be displayed.
 * The form tag will not be rendered. Please call {@link renderBegin} and {@link renderEnd}
 * to render the open and close tags of the form.
 * You may override this method to customize the rendering of the form.
 * @returns {String} the rendering result
 */
Yii.CForm.prototype.renderBody = function () {
		var output, attributes, model;
		output='';
		
		if(this.title!==null && this.title !== undefined) {
			if(this.getParent() instanceof Yii.CForm) {
				attributes=this.attributes;
				delete attributes['name'];
				output=Yii.CHtml.openTag('fieldset', attributes)+"<legend>"+this.title+"</legend>\n";
			}
			else {
				output="<fieldset>\n<legend>"+this.title+"</legend>\n";
			}
		}
		
		if(this.description!==null && this.title !== undefined) {
			output+="<div class=\"description\">\n"+this.description+"</div>\n";
		}
		
		output+=this.renderElements();
		output+="\n"+this.renderButtons()+"\n";
	
		if(this.title!==null && this.title !== undefined) {
			output+="</fieldset>\n";
		}
		return output;
	};
/**
 * Renders the {@link elements} in this form.
 * @returns {String} the rendering result
 */
Yii.CForm.prototype.renderElements = function () {
		var output, i, elementList, element, self = this;
		output='';
		this.getElements().forEach(function(i, element) {
			output+=self.renderElement(element);
		});
		return output;
	};
/**
 * Renders the {@link buttons} in this form.
 * @returns {String} the rendering result
 */
Yii.CForm.prototype.renderButtons = function () {
		var output, i, self = this, button;
		output='';
		this.getButtons().forEach(function(i, button) {
			output+=self.renderElement(button);
		});
		
		
		return output!=='' ? "<div class=\"row buttons\">"+output+"</div>\n" : '';
	};
/**
 * Renders a single element which could be an input element, a sub-form, a string, or a button.
 * @param {Mixed} element the form element to be rendered. This can be either a {@link CFormElement} instance
 * or a string representing the name of the form element.
 * @returns {String} the rendering result
 */
Yii.CForm.prototype.renderElement = function (element) {
		var e;
		if(typeof(element) === 'string') {
			if((e=this[element])===null && (e=this.getButtons().itemAt(element))===null) {
				return element;
			}
			else {
				element=e;
			}
		}
		if(element.getVisible()) {
			if(element instanceof Yii.CFormInputElement) {
				if(element.type==='hidden') {
					return "<div style=\"visibility:hidden\">\n"+element.render()+"</div>\n";
				}
				else {
					return "<div class=\"row field_" + element.name + "\">\n"+element.render()+"</div>\n";
				}
			}
			else if(element instanceof Yii.CFormButtonElement) {
				return element.render()+"\n";
			}
			else {
				return element.render();
			}
		}
		else {
			return '';
		}
	};
/**
 * This method is called after an element is added to the element collection.
 * @param {String} name the name of the element
 * @param {Yii.CFormElement} element the element that is added
 * @param {Boolean} forButtons whether the element is added to the {@link buttons} collection.
 * If false, it means the element is added to the {@link elements} collection.
 */
Yii.CForm.prototype.addedElement = function (name, element, forButtons) {
	};
/**
 * This method is called after an element is removed from the element collection.
 * @param {String} name the name of the element
 * @param {Yii.CFormElement} element the element that is removed
 * @param {Boolean} forButtons whether the element is removed from the {@link buttons} collection
 * If false, it means the element is removed from the {@link elements} collection.
 */
Yii.CForm.prototype.removedElement = function (name, element, forButtons) {
	};
/**
 * Evaluates the visibility of this form.
 * This method will check the visibility of the {@link elements}.
 * If any one of them is visible, the form is considered as visible. Otherwise, it is invisible.
 * @returns {Boolean} whether this form is visible.
 */
Yii.CForm.prototype.evaluateVisible = function () {
		var i, elementList, element;
		elementList = this.getElements();
		for (i in elementList) {
			if (elementList.hasOwnProperty(i)) {
				element = elementList[i];
				if(element.getVisible()) {
					return true;
				}
			}
		}
		return false;
	};
/**
 * Returns a unique ID that identifies this form in the current page.
 * @returns {String} the unique ID identifying this form
 */
Yii.CForm.prototype.getUniqueId = function () {
		if(this.attributes['id'] !== undefined) {
			return 'yform_'+this.attributes['id'];
		}
		else {
			return 'yform_'+php.sprintf('%x',php.crc32(Yii.CJSON.encode(php.array_keys(this.getElements().toObject()))));
		}
	};
/**
 * Returns whether there is an element at the specified offset.
 * This method is required by the interface ArrayAccess.
 * @param {Mixed} offset the offset to check on
 * @returns {Boolean}
 */
Yii.CForm.prototype.offsetExists = function (offset) {
		return this.getElements().contains(offset);
	};
/**
 * Returns the element at the specified offset.
 * This method is required by the interface ArrayAccess.
 * @param {Integer} offset the offset to retrieve element.
 * @returns {Mixed} the element at the offset, null if no element is found at the offset
 */
Yii.CForm.prototype.offsetGet = function (offset) {
		return this.getElements().itemAt(offset);
	};
/**
 * Sets the element at the specified offset.
 * This method is required by the interface ArrayAccess.
 * @param {Integer} offset the offset to set element
 * @param {Mixed} item the element value
 */
Yii.CForm.prototype.offsetSet = function (offset, item) {
		this.getElements().add(offset,item);
	};
/**
 * Unsets the element at the specified offset.
 * This method is required by the interface ArrayAccess.
 * @param {Mixed} offset the offset to unset element
 */
Yii.CForm.prototype.offsetUnset = function (offset) {
		this.getElements().remove(offset);
	};