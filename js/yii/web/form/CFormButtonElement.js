/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CFormButtonElement represents a form button element.
 * 
 * CFormButtonElement can represent the following types of button based on {@link type} property:
 * <ul>
 * <li>htmlButton: a normal button generated using {@link CHtml::htmlButton}</li>
 * <li>htmlReset a reset button generated using {@link CHtml::htmlButton}</li>
 * <li>htmlSubmit: a submit button generated using {@link CHtml::htmlButton}</li>
 * <li>submit: a submit button generated using {@link CHtml::submitButton}</li>
 * <li>button: a normal button generated using {@link CHtml::button}</li>
 * <li>image: an image button generated using {@link CHtml::imageButton}</li>
 * <li>reset: a reset button generated using {@link CHtml::resetButton}</li>
 * <li>link: a link button generated using {@link CHtml::linkButton}</li>
 * </ul>
 * The {@link type} property can also be a class name or a path alias to the class. In this case,
 * the button is generated using a widget of the specified class. Note, the widget must
 * have a property called "name".
 * 
 * Because CFormElement is an ancestor class of CFormButtonElement, a value assigned to a non-existing property will be
 * stored in {@link attributes} which will be passed as HTML attribute values to the {@link CHtml} method
 * generating the button or initial values of the widget properties.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CFormButtonElement.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.web.form
 * @since 1.1
 * @author Charles Pick
 * @class
 * @extends Yii.CFormElement
 */
Yii.CFormButtonElement = function CFormButtonElement (config, parent) {
	if (config !== false) {
		this.name = null;
		this.type = null;
		this.label = null;
		this._on = null;
		this.construct(config, parent);
	}
};
Yii.CFormButtonElement.prototype = new Yii.CFormElement(false);
Yii.CFormButtonElement.prototype.constructor =  Yii.CFormButtonElement;
/**
 * @var {Array} Core button types (alias=>CHtml method name)
 */
Yii.CFormButtonElement.prototype.coreTypes = {'htmlButton':'htmlButton','htmlSubmit':'htmlButton','htmlReset':'htmlButton','button':'button','submit':'submitButton','reset':'resetButton','image':'imageButton','link':'linkButton'};
/**
 * @var {String} the type of this button. This can be a class name, a path alias of a class name,
 * or a button type alias (submit, button, image, reset, link, htmlButton, htmlSubmit, htmlReset).
 */
Yii.CFormButtonElement.prototype.type = null;
/**
 * @var {String} name of this button
 */
Yii.CFormButtonElement.prototype.name = null;
/**
 * @var {String} the label of this button. This property is ignored when a widget is used to generate the button.
 */
Yii.CFormButtonElement.prototype.label = null;
Yii.CFormButtonElement.prototype._on = null;
/**
 * Returns a value indicating under which scenarios this button is visible.
 * If the value is empty, it means the button is visible under all scenarios.
 * Otherwise, only when the model is in the scenario whose name can be found in
 * this value, will the button be visible. See {@link CModel::scenario} for more
 * information about model scenarios.
 * @returns {String} scenario names separated by commas. Defaults to null.
 */
Yii.CFormButtonElement.prototype.getOn = function () {
		return this._on;
	};
/**
 * @param {String} value scenario names separated by commas.
 */
Yii.CFormButtonElement.prototype.setOn = function (value) {
		this._on=value.split(/[\s,]+/);
	};
/**
 * Returns this button.
 * @returns {String} the rendering result
 */
Yii.CFormButtonElement.prototype.render = function () {
		var attributes, coreTypes, method, element;
		attributes=this.attributes;
		
		if (attributes.save !== undefined && attributes.save) {
			if (attributes.id === undefined) {
				attributes.id = Yii.CHtml.ID_PREFIX+(Yii.CHtml.count++);
			}
			jQuery("body").delegate("#" + attributes.id,"click", attributes.save);
			delete attributes.save;
		}
		if(this.coreTypes[this.type] !== undefined) {
			method=this.coreTypes[this.type];
			if(method==='linkButton') {
				if(attributes['params'][this.name] === undefined) {
					attributes['params'][this.name]=1;
				}
			}
			else if(method==='htmlButton') {
				attributes['type']=this.type==='htmlSubmit' ? 'submit' : (this.type==='htmlReset' ? 'reset' : 'button');
				attributes['name']=this.name;
			}
			else {
				attributes['name']=this.name;
			}
			if(method==='imageButton') {
				return Yii.CHtml.imageButton(attributes['src'] !== undefined ? attributes['src'] : '',attributes);
			}
			else {
				return Yii.CHtml[method](this.label,attributes);
			}
		}
		else {
			attributes['name']=this.name;
			ob_start();
			this.getParent().getOwner().widget(this.type, attributes);
			return ob_get_clean();
		}
	
	};
/**
 * Evaluates the visibility of this element.
 * This method will check the {@link on} property to see if
 * the model is in a scenario that should have this string displayed.
 * @returns {Boolean} whether this element is visible.
 */
Yii.CFormButtonElement.prototype.evaluateVisible = function () {
		return php.empty(this._on) || php.in_array(this.getParent().getModel().getScenario(),this._on);
	};