/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CInlineAction represents an action that is defined as a controller method.
 * 
 * The method name is like 'actionXYZ' where 'XYZ' stands for the action name.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CInlineAction.php 3137 2011-03-28 11:08:06Z mdomba $
 * @package system.web.actions
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CAction
 */
Yii.CInlineAction = function CInlineAction(controller, id) {
	if (controller !== false) {
		this.construct(controller, id);
	}
};
Yii.CInlineAction.prototype = new Yii.CAction(false);
Yii.CInlineAction.prototype.constructor =  Yii.CInlineAction;
/**
 * Runs the action.
 * The action method defined in the controller is invoked.
 * This method is required by {@link CAction}.
 */
Yii.CInlineAction.prototype.run = function () {
		var method;
		method='action'+php.ucfirst(this.getId());
		this.getController()[method]();
	};
/**
 * Runs the action with the supplied request parameters.
 * This method is internally called by {@link CController::runAction()}.
 * @param {Array} params the request parameters (name=>value)
 * @returns {Boolean} whether the request parameters are valid
 * @since 1.1.7
 */
Yii.CInlineAction.prototype.runWithParams = function (params) {
		var methodName, controller, method, paramList;
		methodName='action'+this.getId();
		controller=this.getController();
		paramList = (/function(.*)\((.*)\)/.exec(controller[methodName])).pop();
		
		if(paramList.length > 0) {
			return this.runWithParamsInternal(controller, methodName, params);
		}
		else {
			return controller[methodName]();
		}
	}