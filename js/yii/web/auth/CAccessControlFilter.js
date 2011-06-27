/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CAccessControlFilter performs authorization checks for the specified actions.
 * 
 * By enabling this filter, controller actions can be checked for access permissions.
 * When the user is not denied by one of the security rules or allowed by a rule explicitly,
 * he will be able to access the action.
 * 
 * For maximum security consider adding
 * <pre>['deny']</pre>
 * as a last rule in a list so all actions will be denied by default.
 * 
 * To specify the access rules, set the {@link setRules rules} property, which should
 * be an array of the rules. Each rule is specified as an array of the following structure:
 * <pre>
 * {
 *   'allow',  // or 'deny'
 *   // optional, list of action IDs (case insensitive) that this rule applies to
 *   'actions':{'edit', 'delete'},
 *   // optional, list of controller IDs (case insensitive) that this rule applies to
 *   // This option is available since version 1.0.3.
 *   'controllers':{'post', 'admin/user'},
 *   // optional, list of usernames (case insensitive) that this rule applies to
 *   // Use * to represent all users, ? guest users, and @ authenticated users
 *   'users':{'thomas', 'kevin'},
 *   // optional, list of roles (case sensitive!) that this rule applies to.
 *   'roles':{'admin', 'editor'},
 *   // optional, list of IP address/patterns that this rule applies to
 *   // e.g. 127.0.0.1, 127.0.0.*
 *   'ips':{'127.0.0.1'},
 *   // optional, list of request types (case insensitive) that this rule applies to
 *   'verbs':{'GET', 'POST'},
 *   // optional, a PHP expression whose value indicates whether this rule applies
 *   // This option is available since version 1.0.3.
 *   'expression':'!$user->isGuest && $user->level==2',
 *   // optional, the customized error message to be displayed
 *   // This option is available since version 1.1.1.
 *   'message':'Access Denied.',
 * }
 * </pre>
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CAccessControlFilter.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.web.auth
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CFilter
 */
Yii.CAccessControlFilter = function CAccessControlFilter () {
};
Yii.CAccessControlFilter.prototype = new Yii.CFilter();
Yii.CAccessControlFilter.prototype.constructor =  Yii.CAccessControlFilter;
/**
 * @var {String} the error message to be displayed when authorization fails.
 * This property can be overridden by individual access rule via {@link CAccessRule::message}.
 * If this property is not set, a default error message will be displayed.
 * @since 1.1.1
 */
Yii.CAccessControlFilter.prototype.message = null;
Yii.CAccessControlFilter.prototype._rules = [];
/**
 * @returns {Array} list of access rules.
 */
Yii.CAccessControlFilter.prototype.getRules = function () {
		return this._rules;
	};
/**
 * @param {Array} rules list of access rules.
 */
Yii.CAccessControlFilter.prototype.setRules = function (rules) {
		var i, rule, r, nameValue, name, value;
		for (i in rules) {
			if (rules.hasOwnProperty(i)) {
				rule = rules[i];
				if(Object.prototype.toString.call(rule) === '[object Array]' && rule[0] !== undefined)
				{
					r=new Yii.CAccessRule();
					r.allow=rule[0]==='allow';
					nameValue = php.array_slice(rule,1);
					for (name in nameValue) {
						if (nameValue.hasOwnProperty(name)) {
							value = nameValue[name];
							if(name==='expression' || name==='roles' || name==='message') {
								r.name=value;
							}
							else {
								r.name=php.array_map('strtolower',value);
							}
						}
					}
					this._rules.push(r);
				}
			}
		}
	};
/**
 * Performs the pre-action filtering.
 * @param {Yii.CFilterChain} filterChain the filter chain that the filter is on.
 * @returns {Boolean} whether the filtering process should continue and the action
 * should be executed.
 */
Yii.CAccessControlFilter.prototype.preFilter = function (filterChain) {
		var app, request, user, verb, ip, i, ruleList, allow, rule;
		app=Yii.app();
		request=app.getRequest();
		user=app.getUser();
		verb=request.getRequestType();
		ip=request.getUserHostAddress();
		ruleList = this.getRules();
		for (i in ruleList) {
			if (ruleList.hasOwnProperty(i)) {
				rule = ruleList[i];
				if((allow=rule.isUserAllowed(user,filterChain.controller,filterChain.action,ip,verb))>0) { // allowed
					break;
				}
				else if(allow<0) {
					// denied
					this.accessDenied(user,this.resolveErrorMessage(rule));
					return false;
				}
			}
		}
		return true;
	};
/**
 * Resolves the error message to be displayed.
 * This method will check {@link message} and {@link CAccessRule::message} to see
 * what error message should be displayed.
 * @param {Yii.CAccessRule} rule the access rule
 * @returns {String} the error message
 * @since 1.1.1
 */
Yii.CAccessControlFilter.prototype.resolveErrorMessage = function (rule) {
		if(rule.message!==null) {
			return rule.message;
		}
		else if(this.message!==null) {
			return this.message;
		}
		else {
			return Yii.t('yii','You are not authorized to perform this action.');
		}
	};
/**
 * Denies the access of the user.
 * This method is invoked when access check fails.
 * @param {IWebUser} user the current user
 * @param {String} message the error message to be displayed
 * @since 1.0.5
 */
Yii.CAccessControlFilter.prototype.accessDenied = function (user, message) {
		if(user.getIsGuest()) {
			user.loginRequired();
		}
		else {
			throw new Yii.CHttpException(403,message);
		}
	};