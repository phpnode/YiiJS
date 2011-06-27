/*global Yii, php, $, jQuery, console, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CWebLogRoute shows the log content in Web page.
 * 
 * The log content can appear either at the end of the current Web page
 * or in FireBug console window (if {@link showInFireBug} is set true).
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CWebLogRoute.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.logging
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CLogRoute
 */
Yii.CWebLogRoute = function CWebLogRoute () {
};
Yii.CWebLogRoute.prototype = new Yii.CLogRoute();
Yii.CWebLogRoute.prototype.constructor =  Yii.CWebLogRoute;
/**
 * @var {Boolean} whether the log should be displayed in FireBug instead of browser window. Defaults to false.
 */
Yii.CWebLogRoute.prototype.showInFireBug = false;
/**
 * @var {Boolean} whether the log should be ignored in FireBug for ajax calls. Defaults to true.
 * This option should be used carefully, because an ajax call returns all output as a result data.
 * For example if the ajax call expects a json type result any output from the logger will cause ajax call to fail.
 */
Yii.CWebLogRoute.prototype.ignoreAjaxInFireBug = true;
/**
 * Displays the log messages.
 * @param {Array} logs list of log messages
 */
Yii.CWebLogRoute.prototype.processLogs = function (logs) {
		var logView = [], i, limit, log;
		limit = logs.length;
		for (i = 0; i < limit; i++) {
			log = logs[i];
			logView.push({
				'time': php.date('H:i:s.',log[3]) + php.sprintf('%06d',Number((log[3]-Number(log[3]))*1000000)),
				'level': log[1],
				'category': log[2],
				'message': log[0]
			});
		}
		if (this.showInFireBug) {
			if (console.group !== undefined) {
				console.group("Application Log");
			}
			Yii.forEach(logView, function (index, log) {
				var func;
				if (log[1] === Yii.CLogger.prototype.LEVEL_WARNING) {
					func = "warn";
				}
				else if (log[2] === Yii.CLogger.prototype.LEVEL_ERROR) {
					func = "error";
				}
				else {
					func = "log";
				}
				if (console[func] === undefined) {
					func = "log";
				}
				console[func]("[" + log.time + "] [" + log.level + "] [" + log.category + "] " + log.message);
			});
			if (console.group !== undefined) {
				console.groupEnd();
			}
		}
		else {
			this.render('log',logView);
		}
	};
/**
 * Renders the view.
 * @param {String} view the view name (file name without extension). The file is assumed to be located under framework/data/views.
 * @param {Array} data data to be passed to the view
 */
Yii.CWebLogRoute.prototype.render = function (view, data) {
		var app, isAjax, viewFile;
		
		app=Yii.app();
		isAjax=app.getRequest().getIsAjaxRequest();
		if(this.showInFireBug) {
			if(isAjax && this.ignoreAjaxInFireBug) {
				return;
			}
			view+='-firebug';
		}
		else if(!(app instanceof Yii.CWebApplication) || isAjax) {
			return;
		}
		viewFile='system.views.'+view;
		jQuery("body").append(Yii.CController.prototype.renderPartial(viewFile, {data: data},true));
	};