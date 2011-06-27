/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CLogRouter manages log routes that record log messages in different media.
 * 
 * For example, a file log route {@link CFileLogRoute} records log messages
 * in log files. An email log route {@link CEmailLogRoute} sends log messages
 * to specific email addresses. See {@link CLogRoute} for more details about
 * different log routes.
 * 
 * Log routes may be configured in application configuration like following:
 * <pre>
 * {
 *     'preload':{'log'}, // preload log component when app starts
 *     'components':{
 *         'log':{
 *             'class':'CLogRouter',
 *             'routes':{
 *                 {
 *                     'class':'CFileLogRoute',
 *                     'levels':'trace, info',
 *                     'categories':'system.*',
 *                 },
 *                 {
 *                     'class':'CEmailLogRoute',
 *                     'levels':'error, warning',
 *                     'email':'admin@example.com',
 *                 },
 *             ),
 *         ),
 *     ),
 * }
 * </pre>
 * 
 * You can specify multiple routes with different filtering conditions and different
 * targets, even if the routes are of the same type.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CLogRouter.php 3066 2011-03-13 14:22:55Z qiang.xue $
 * @package system.logging
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CApplicationComponent
 */
Yii.CLogRouter = function CLogRouter () {
};
Yii.CLogRouter.prototype = new Yii.CApplicationComponent();
Yii.CLogRouter.prototype.constructor =  Yii.CLogRouter;
Yii.CLogRouter.prototype._routes = [];
/**
 * Initializes this application component.
 * This method is required by the IApplicationComponent interface.
 */
Yii.CLogRouter.prototype.init = function () {
		var route, name;
		Yii.CApplicationComponent.prototype.init();
		for (name in this._routes) {
			if (this._routes.hasOwnProperty(name)) {
				route = this._routes[name];
				route=Yii.createComponent(route);
				route.init();
				this._routes[name]=route;
			}
		}
		Yii.getLogger().attachEventHandler('onFlush',[this,'collectLogs']);
		Yii.app().attachEventHandler('onEndRequest',[this,'processLogs']);
		
	};
/**
 * @returns {Array} the currently initialized routes
 */
Yii.CLogRouter.prototype.getRoutes = function () {
		return new Yii.CMap(this._routes);
	};
/**
 * @param {Array} config list of route configurations. Each array element represents
 * the configuration for a single route and has the following array structure:
 * <ul>
 * <li>class: specifies the class name or alias for the route class.</li>
 * <li>name-value pairs: configure the initial property values of the route.</li>
 * </ul>
 */
Yii.CLogRouter.prototype.setRoutes = function (config) {
		var name, route;
		for (name in config) {
			if (config.hasOwnProperty(name)) {
				route = config[name];
				this._routes[name]=route;
			}
		}
		
	};
/**
 * Collects log messages from a logger.
 * This method is an event handler to the {@link CLogger::onFlush} event.
 * @param {Yii.CEvent} event event parameter
 */
Yii.CLogRouter.prototype.collectLogs = function (event) {
		var logger, dumpLogs, i, route;
		logger=Yii.getLogger();
		dumpLogs=event.params.dumpLogs !== undefined && event.params.dumpLogs;
		for (i in this._routes) {
			if (this._routes.hasOwnProperty(i)) {
				route = this._routes[i];
				if(route.enabled) {
					route.collectLogs(logger,dumpLogs);
				}
			}
		}
	};
/**
 * Collects and processes log messages from a logger.
 * This method is an event handler to the {@link CApplication::onEndRequest} event.
 * @param {Yii.CEvent} event event parameter
 * @since 1.1.0
 */
Yii.CLogRouter.prototype.processLogs = function (event) {
		var logger, i, route;
		logger=Yii.getLogger();
		
		for (i in this._routes)	{
			if (this._routes.hasOwnProperty(i)) {
				route = this._routes[i];
				
				if(route.enabled) {
					
					route.collectLogs(logger,true);
					
				}
			}
		}
	};