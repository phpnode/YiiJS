/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CApplicationComponent is the base class for application component classes.
 * 
 * CApplicationComponent implements the basic methods required by {@link IApplicationComponent}.
 * 
 * When developing an application component, try to put application component initialization code in
 * the {@link init()} method instead of the constructor. This has the advantage that
 * the application component can be customized through application configuration.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CApplicationComponent.php 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package system.base
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CApplicationComponent = function CApplicationComponent() {
};
Yii.CApplicationComponent.prototype = new Yii.CComponent();
Yii.CApplicationComponent.prototype.constructor =  Yii.CApplicationComponent;
/**
 * @var {Array} the behaviors that should be attached to this component.
 * The behaviors will be attached to the component when {@link init} is called.
 * Please refer to {@link CModel::behaviors} on how to specify the value of this property.
 * @since 1.0.2
 */
Yii.CApplicationComponent.prototype.behaviors = [];
Yii.CApplicationComponent.prototype._initialized = false;
/**
 * Initializes the application component.
 * This method is required by {@link IApplicationComponent} and is invoked by application.
 * If you override this method, make sure to call the parent implementation
 * so that the application component can be marked as initialized.
 */
Yii.CApplicationComponent.prototype.init = function () {
		this.attachBehaviors(this.behaviors);
		this._initialized=true;
	};
/**
 * Checks if this application component bas been initialized.
 * @returns {Boolean} whether this application component has been initialized (ie, {@link init()} is invoked).
 */
Yii.CApplicationComponent.prototype.getIsInitialized = function () {
		return this._initialized;
};