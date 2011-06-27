/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CLogRoute is the base class for all log route classes.
 * 
 * A log route object retrieves log messages from a logger and sends it
 * somewhere, such as files, emails.
 * The messages being retrieved may be filtered first before being sent
 * to the destination. The filters include log level filter and log category filter.
 * 
 * To specify level filter, set {@link levels} property,
 * which takes a string of comma-separated desired level names (e.g. 'Error, Debug').
 * To specify category filter, set {@link categories} property,
 * which takes a string of comma-separated desired category names (e.g. 'System.Web, System.IO').
 * 
 * Level filter and category filter are combinational, i.e., only messages
 * satisfying both filter conditions will they be returned.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CLogRoute.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.logging
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CLogRoute = function CLogRoute () {
};
Yii.CLogRoute.prototype = new Yii.CComponent();
Yii.CLogRoute.prototype.constructor =  Yii.CLogRoute;
/**
 * @var {Boolean} whether to enable this log route. Defaults to true.
 * @since 1.0.7
 */
Yii.CLogRoute.prototype.enabled = true;
/**
 * @var {String} list of levels separated by comma or space. Defaults to empty, meaning all levels.
 */
Yii.CLogRoute.prototype.levels = '';
/**
 * @var {String} list of categories separated by comma or space. Defaults to empty, meaning all categories.
 */
Yii.CLogRoute.prototype.categories = '';
/**
 * @var {Mixed} the additional filter (eg {@link CLogFilter}) that can be applied to the log messages.
 * The value of this property will be passed to {@link Yii::createComponent} to create
 * a log filter object. As a result, this can be either a string representing the
 * filter class name or an array representing the filter configuration.
 * In general, the log filter class should be {@link CLogFilter} or a child class of it.
 * Defaults to null, meaning no filter will be used.
 * @since 1.0.6
 */
Yii.CLogRoute.prototype.filter = null;
/**
 * @var {Array} the logs that are collected so far by this log route.
 * @since 1.1.0
 */
Yii.CLogRoute.prototype.logs = null;
/**
 * Initializes the route.
 * This method is invoked after the route is created by the route manager.
 */
Yii.CLogRoute.prototype.init = function () {
	};
/**
 * Formats a log message given different fields.
 * @param {String} message message content
 * @param {Integer} level message level
 * @param {String} category message category
 * @param {Integer} time timestamp
 * @returns {String} formatted message
 */
Yii.CLogRoute.prototype.formatLogMessage = function (message, level, category, time) {
		return php.date('Y/m/d H:i:s',time)+" [" + level + "] [" + category + "] " + message + "\n";
	};
/**
 * Retrieves filtered log messages from logger for further processing.
 * @param {Yii.CLogger} logger logger instance
 * @param {Boolean} processLogs whether to process the logs after they are collected from the logger
 */
Yii.CLogRoute.prototype.collectLogs = function (logger, processLogs) {
		var logs;
		
		if (processLogs === undefined) {
			processLogs = false;
		}
		
		logs=logger.getLogs(this.levels,this.categories);
		this.logs=php.empty(this.logs) ? logs : php.array_merge(this.logs,logs);
		if(processLogs && !php.empty(this.logs)) {
			if(this.filter!==null) {
				Yii.createComponent(this.filter).filter(this.logs);
			}
			this.processLogs(this.logs);
		}
	};
/**
 * Processes log messages and sends them to specific destination.
 * Derived child classes must implement this method.
 * @param {Array} logs list of messages.  Each array elements represents one message
 * with the following structure:
 * array(
 *   [0] => message (string)
 *   [1] => level (string)
 *   [2] => category (string)
 *   [3] => timestamp (float, obtained by microtime(true));
 */
Yii.CLogRoute.prototype.processLogs = function (logs) {
	};