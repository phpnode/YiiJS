/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CLogFilter preprocesses the logged messages before they are handled by a log route.
 * 
 * CLogFilter is meant to be used by a log route to preprocess the logged messages
 * before they are handled by the route. The default implementation of CLogFilter
 * prepends additional context information to the logged messages. In particular,
 * by setting {@link logVars}, predefined PHP variables such as
 * $_SERVER, $_POST, etc. can be saved as a log message, which may help identify/debug
 * issues encountered.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CLogFilter.php 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package system.logging
 * @since 1.0.6
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CLogFilter = function CLogFilter () {
};
Yii.CLogFilter.prototype = new Yii.CComponent();
Yii.CLogFilter.prototype.constructor =  Yii.CLogFilter;
/**
 * @var {Boolean} whether to prefix each log message with the current user session ID.
 * Defaults to false.
 */
Yii.CLogFilter.prototype.prefixSession = false;
/**
 * @var {Boolean} whether to prefix each log message with the current user
 * {@link CWebUser::name name} and {@link CWebUser::id ID}. Defaults to false.
 */
Yii.CLogFilter.prototype.prefixUser = false;
/**
 * @var {Boolean} whether to log the current user name and ID. Defaults to true.
 */
Yii.CLogFilter.prototype.logUser = true;
/**
 * @var {Array} list of the predefined variables that should be logged.
 * Note that a variable must be globally accessible. Otherwise it won't be logged.
 */
Yii.CLogFilter.prototype.logVars = [];
/**
 * Filters the given log messages.
 * This is the main method of CLogFilter. It processes the log messages
 * by adding context information, etc.
 * @param {Array} logs the log messages
 */
Yii.CLogFilter.prototype.filter = function (logs) {
		var message;
		if (!php.empty(logs)) {
			if((message=this.getContext())!=='') {
				php.array_unshift(logs,[message,Yii.CLogger.LEVEL_INFO,'application',YII_BEGIN_TIME]);
			}
			this.format(logs);			
		}
		return logs;
	};
/**
 * Formats the log messages.
 * The default implementation will prefix each message with session ID
 * if {@link prefixSession} is set true. It may also prefix each message
 * with the current user's name and ID if {@link prefixUser} is true.
 * @param {Array} logs the log messages
 */
Yii.CLogFilter.prototype.format = function (logs) {
		var prefix, id, user, i, log;
		prefix='';
		if(this.prefixSession && (id=document.cookie.match(/PHPSESSID=[^;]+/))!==null) {
			prefix+="[" + id + "]";
		}
		if(this.prefixUser && (user=Yii.app().getComponent('user',false))!==null) {
			prefix+='['+user.getName()+']['+user.getId()+']';
		}
		if(prefix!=='')	{
			for (i in logs) {
				if (logs.hasOwnProperty(i)) {
					logs[i][0]=prefix+' '+logs[i][0];
				}
			}
		}
	};
/**
 * Generates the context information to be logged.
 * The default implementation will dump user information, system variables, etc.
 * @returns {String} the context information. If an empty string, it means no context information.
 */
Yii.CLogFilter.prototype.getContext = function () {
		var context, user, i, name;
		context=[];
		if(this.logUser && (user=Yii.app().getComponent('user',false))!==null) {
			context.push('User: '+user.getName()+' (ID: '+user.getId()+')');
		}
		for (i in this.logVars)	{
			if (this.logVars.hasOwnProperty(i)) {
				name = this.logVars[i];
				if(window[name] !== undefined) {
					context.push(name + " = "  + window[name]);
				}
			}
		}
		return context.join("\n\n");
	};