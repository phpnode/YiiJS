/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CAccessRule represents an access rule that is managed by {@link CAccessControlFilter}.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CAccessControlFilter.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.web.auth
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CAccessRule = function CAccessRule () {
};
Yii.CAccessRule.prototype = new Yii.CComponent();
Yii.CAccessRule.prototype.constructor =  Yii.CAccessRule;
/**
 * @var {Boolean} whether this is an 'allow' rule or 'deny' rule.
 */
Yii.CAccessRule.prototype.allow = null;
/**
 * @var {Array} list of action IDs that this rule applies to. The comparison is case-insensitive.
 */
Yii.CAccessRule.prototype.actions = null;
/**
 * @var {Array} list of controler IDs that this rule applies to. The comparison is case-insensitive.
 * @since 1.0.4
 */
Yii.CAccessRule.prototype.controllers = null;
/**
 * @var {Array} list of user names that this rule applies to. The comparison is case-insensitive.
 */
Yii.CAccessRule.prototype.users = null;
/**
 * @var {Array} list of roles this rule applies to. For each role, the current user's
 * {@link CWebUser::checkAccess} method will be invoked. If one of the invocations
 * returns true, the rule will be applied.
 * Note, you should mainly use roles in an "allow" rule because by definition,
 * a role represents a permission collection.
 * @see CAuthManager
 */
Yii.CAccessRule.prototype.roles = null;
/**
 * @var {Array} IP patterns.
 */
Yii.CAccessRule.prototype.ips = null;
/**
 * @var {Array} list of request types (e.g. GET, POST) that this rule applies to.
 */
Yii.CAccessRule.prototype.verbs = null;
/**
 * @var {String} a PHP expression whose value indicates whether this rule should be applied.
 * In this expression, you can use <code>$user</code> which refers to <code>Yii::app()->user</code>.
 * Starting from version 1.0.11, the expression can also be a valid PHP callback,
 * including class method name (array(ClassName/Object, MethodName)),
 * or anonymous function (PHP 5.3.0+). The function/method signature should be as follows:
 * <pre>
 * function foo(user, rule) { +++ }
 * </pre>
 * where $user is the current application user object and $rule is this access rule.
 * @since 1.0.3
 */
Yii.CAccessRule.prototype.expression = null;
/**
 * @var {String} the error message to be displayed when authorization is denied by this rule.
 * If not set, a default error message will be displayed.
 * @since 1.1.1
 */
Yii.CAccessRule.prototype.message = null;
/**
 * Checks whether the Web user is allowed to perform the specified action.
 * @param {Yii.CWebUser} user the user object
 * @param {Yii.CController} controller the controller currently being executed
 * @param {Yii.CAction} action the action to be performed
 * @param {String} ip the request IP address
 * @param {String} verb the request verb (GET, POST, etc.)
 * @returns {Integer} 1 if the user is allowed, -1 if the user is denied, 0 if the rule does not apply to the user
 */
Yii.CAccessRule.prototype.isUserAllowed = function (user, controller, action, ip, verb) {
		if(this.isActionMatched(action)
			&& this.isUserMatched(user)
			&& this.isRoleMatched(user)
			&& this.isIpMatched(ip)
			&& this.isVerbMatched(verb)
			&& this.isControllerMatched(controller)
			&& this.isExpressionMatched(user)) {
			return this.allow ? 1 : -1;
		}
		else {
			return 0;
		}
	};
/**
 * @param {Yii.CAction} action the action
 * @returns {Boolean} whether the rule applies to the action
 */
Yii.CAccessRule.prototype.isActionMatched = function (action) {
		return php.empty(this.actions) || php.in_array(action.getId().toLowerCase(),this.actions);
	};
/**
 * @param {Yii.CAction} controller the action
 * @returns {Boolean} whether the rule applies to the action
 */
Yii.CAccessRule.prototype.isControllerMatched = function (controller) {
		return php.empty(this.controllers) || php.in_array(controller.getId().toLowerCase(),this.controllers);
	};
/**
 * @param {IWebUser} user the user
 * @returns {Boolean} whether the rule applies to the user
 */
Yii.CAccessRule.prototype.isUserMatched = function (user) {
		var i, u;
		if(php.empty(this.users)) {
			return true;
		}
		for (i in this.users)
		{
			if (this.users.hasOwnProperty(i)) {
				u = this.users[i];
			if(u==='*') {
				return true;
		}
			else if(u==='?' && user.getIsGuest()) {
				return true;
		}
			else if(u==='@' && !user.getIsGuest()) {
				return true;
		}
			else if(!php.strcasecmp(u,user.getName())) {
				return true;
		}
		}
		}
		return false;
	};
/**
 * @param {IWebUser} user the user object
 * @returns {Boolean} whether the rule applies to the role
 */
Yii.CAccessRule.prototype.isRoleMatched = function (user) {
		var i, role;
		if(php.empty(this.roles)) {
			return true;
		}
		for (i in this.roles)
		{
			if (this.roles.hasOwnProperty(i)) {
				role = this.roles[i];
			if(user.checkAccess(role)) {
				return true;
		}
		}
		}
		return false;
	};
/**
 * @param {String} ip the IP address
 * @returns {Boolean} whether the rule applies to the IP address
 */
Yii.CAccessRule.prototype.isIpMatched = function (ip) {
		var i, rule, pos;
		if(php.empty(this.ips)) {
			return true;
		}
		for (i in this.ips)
		{
			if (this.ips.hasOwnProperty(i)) {
				rule = this.ips[i];
			if(rule==='*' || rule===ip || ((pos=php.strpos(rule,'*'))!==false && !php.strncmp(ip,rule,pos))) {
				return true;
		}
		}
		}
		return false;
	};
/**
 * @param {String} verb the request method
 * @returns {Boolean} whether the rule applies to the request
 */
Yii.CAccessRule.prototype.isVerbMatched = function (verb) {
		return php.empty(this.verbs) || php.in_array(verb.toLowerCase(),this.verbs);
	};
/**
 * @param {IWebUser} user the user
 * @returns {Boolean} the expression value. True if the expression is not specified.
 * @since 1.0.3
 */
Yii.CAccessRule.prototype.isExpressionMatched = function (user) {
		if(this.expression===null) {
			return true;
		}
		else {
			return this.evaluateExpression(this.expression, {'user':user});
		}
	};