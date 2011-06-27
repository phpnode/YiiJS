/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CAction is the base class for all controller action classes.
 * 
 * CAction provides a way to divide a complex controller into
 * smaller actions in separate class files.
 * 
 * Derived classes must implement {@link run()} which is invoked by
 * controller when the action is requested.
 * 
 * An action instance can access its controller via {@link getController controller} property.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CAction.php 3058 2011-03-13 04:20:12Z qiang.xue $
 * @package system.web.actions
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CAction = function CAction(controller, id) {
	if (controller !== false) {
		this.construct(controller, id);
	}
};
Yii.CAction.prototype = new Yii.CComponent();
Yii.CAction.prototype.constructor =  Yii.CAction;
Yii.CAction.prototype._id = null;
Yii.CAction.prototype._controller = null;
/**
 * Constructor.
 * @param {Yii.CController} controller the controller who owns this action.
 * @param {String} id id of the action.
 */
Yii.CAction.prototype.construct = function (controller, id) {
		this._controller=controller;
		this._id=id;
	};
/**
 * @returns {Yii.CController} the controller who owns this action.
 */
Yii.CAction.prototype.getController = function () {
		return this._controller;
	};
/**
 * @returns {String} id of this action
 */
Yii.CAction.prototype.getId = function () {
		return this._id;
	};
/**
 * Runs the action with the supplied request parameters.
 * This method is internally called by {@link CController::runAction()}.
 * @param {Array} params the request parameters (name=>value)
 * @returns {Boolean} whether the request parameters are valid
 * @since 1.1.7
 */
Yii.CAction.prototype.runWithParams = function (params) {
		var methodParams = [], matches;
		matches = /function(.*)\((.*)\)/.exec(this.run);
		if (matches) {
			methodParams = matches[2].split(/[\s,]+/);
		}
		if(methodParams.length >0) {
			return this.runWithParamsInternal(this, "run", params);
		}
		else {
			return this.run();
		}
	};
/**
 * Executes a method of an object with the supplied named parameters.
 * This method is internally used.
 * @param {Mixed} object the object whose method is to be executed
 * @param {String} method the name of the method
 * @param {Array} params the named parameters
 * @returns {Boolean} whether the named parameters are valid
 * @since 1.1.7
 */
Yii.CAction.prototype.runWithParamsInternal = function (object, method, params) {
		var ps, paramList, name, param, i, limit;
		ps=[];
		paramList = /function(.*)\((.*)\)/.exec(object[method]).pop();
		if (paramList !== '') {
			paramList = paramList.split(/[\s,]+/);
		}
		else {
			paramList = [];
		}
		limit = paramList.length;
		for (i = 0; i < limit; i++) {
			name = paramList[i];
			if(params !== undefined && params[name] !== undefined) {
				ps.push(params[name]);
			}
		}
		object[method].apply(object,ps);
		return true;
	}