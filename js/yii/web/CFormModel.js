/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CFormModel represents a data model that collects HTML form inputs.
 * 
 * Unlike {@link CActiveRecord}, the data collected by CFormModel are stored
 * in memory only, instead of database.
 * 
 * To collect user inputs, you may extend CFormModel and define the attributes
 * whose values are to be collected from user inputs. You may override
 * {@link rules()} to declare validation rules that should be applied to
 * the attributes.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CFormModel.php 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package system.web
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CModel
 */
Yii.CFormModel = function CFormModel(scenario) {
	if (scenario !== false) {
		this.construct(scenario);
	}
};
Yii.CFormModel.prototype = new Yii.CModel();
Yii.CFormModel.prototype.constructor =  Yii.CFormModel;
Yii.CFormModel.prototype._names = null;
/**
 * Constructor.
 * @param {String} scenario name of the scenario that this model is used in.
 * See {@link CModel::scenario} on how scenario is used by models.
 * @see getScenario
 */
Yii.CFormModel.prototype.construct = function (scenario) {
		if (scenario === undefined) {
			scenario = '';
		}
		this.setScenario(scenario);
		this.init();
		this.attachBehaviors(this.behaviors());
		this.afterConstruct();
	};
/**
 * Initializes this model.
 * This method is invoked in the constructor right after {@link scenario} is set.
 * You may override this method to provide code that is needed to initialize the model (e.g. setting
 * initial property values.)
 * @since 1.0.8
 */
Yii.CFormModel.prototype.init = function () {
	};
/**
 * Returns the list of attribute names.
 * By default, this method returns all public properties of the class.
 * You may override this method to change the default.
 * @returns {Array} list of attribute names. Defaults to all public properties of the class.
 */
Yii.CFormModel.prototype.attributeNames = function () {
		var i;
		if(this._names === null) {
			this._names=[];
			for (i in this) {
				if (this.hasOwnProperty(i) && i.slice(0,1) !== "_") {
					this._names.push(i);
				}
			}
			return this._names;
		}
		else {
			return this._names;
		}
};