/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CLogger records log messages in memory.
 * 
 * CLogger implements the methods to retrieve the messages with
 * various filter conditions, including log levels and log categories.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CLogger.php 3137 2011-03-28 11:08:06Z mdomba $
 * @package system.logging
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CLogger = function() {
};
Yii.CLogger.prototype = new Yii.CComponent();
Yii.CLogger.prototype.constructor =  Yii.CLogger;
/**
 * @const
 */
Yii.CLogger.prototype.LEVEL_TRACE = 'trace';
/**
 * @const
 */
Yii.CLogger.prototype.LEVEL_WARNING = 'warning';
/**
 * @const
 */
Yii.CLogger.prototype.LEVEL_ERROR = 'error';
/**
 * @const
 */
Yii.CLogger.prototype.LEVEL_INFO = 'info';
/**
 * @const
 */
Yii.CLogger.prototype.LEVEL_PROFILE = 'profile';
/**
 * @var {Integer} how many messages should be logged before they are flushed to destinations.
 * Defaults to 10,000, meaning for every 10,000 messages, the {@link flush} method will be
 * automatically invoked once. If this is 0, it means messages will never be flushed automatically.
 * @since 1.1.0
 */
Yii.CLogger.prototype.autoFlush = 10000;
/**
 * @var {Array} log messages
 */
Yii.CLogger.prototype._logs = [];
/**
 * @var {Integer} number of log messages
 */
Yii.CLogger.prototype._logCount = 0;
/**
 * @var {Array} log levels for filtering (used when filtering)
 */
Yii.CLogger.prototype._levels = null;
/**
 * @var {Array} log categories for filtering (used when filtering)
 */
Yii.CLogger.prototype._categories = null;
/**
 * @var {Array} the profiling results (category, token => time in seconds)
 * @since 1.0.6
 */
Yii.CLogger.prototype._timings = null;
/**
 * Logs a message.
 * Messages logged by this method may be retrieved back via {@link getLogs}.
 * @param {String} message message to be logged
 * @param {String} level level of the message (e.g. 'Trace', 'Warning', 'Error'). It is case-insensitive.
 * @param {String} category category of the message (e.g. 'system.web'). It is case-insensitive.
 * @see getLogs
 */
Yii.CLogger.prototype.log = function (message, level, category) {
		if (level === undefined) {
			level = 'info';
		}
		if (category === undefined) {
			category = 'application';
		}
		this._logs.push([message,level,category,php.microtime(true)]);
		this._logCount++;
		if(this.autoFlush>0 && this._logCount>=this.autoFlush) {
			this.flush();
		}
	};
/**
 * Retrieves log messages.
 * 
 * Messages may be filtered by log levels and/or categories.
 * A level filter is specified by a list of levels separated by comma or space
 * (e.g. 'trace, error'). A category filter is similar to level filter
 * (e.g. 'system, system.web'). A difference is that in category filter
 * you can use pattern like 'system.*' to indicate all categories starting
 * with 'system'.
 * 
 * If you do not specify level filter, it will bring back logs at all levels.
 * The same applies to category filter.
 * 
 * Level filter and category filter are combinational, i.e., only messages
 * satisfying both filter conditions will be returned.
 * 
 * @param {String} levels level filter
 * @param {String} categories category filter
 * @returns {Array} list of messages. Each array elements represents one message
 * with the following structure:
 * array(
 *   [0] => message (string)
 *   [1] => level (string)
 *   [2] => category (string)
 *   [3] => timestamp (float, obtained by microtime(true));
 */
Yii.CLogger.prototype.getLogs = function (levels, categories) {
		var ret, self;
		if (levels === undefined) {
			levels = '';
			this._levels = [];
		}
		else {
			this._levels=levels.toLowerCase().split(/[\s,]+/);
		}
		if (categories === undefined) {
			categories = '';
			this._categories = [];
		}
		else {
			this._categories=categories.toLowerCase().split(/[\s,]+/);	
		}
		
		
		self = this;
		if(php.empty(levels) && php.empty(categories)) {
			return this._logs;
		}		
		else if(php.empty(levels)) {
			
			return Yii.filter(this._logs,function(value, k, arr) {
				var matched = false, cat = value[2].toLowerCase(), c;
				Yii.forEach(self._categories, function(i, category) {
					if(cat===category || ((c=php.rtrim(category,'.*'))!==category && php.strpos(cat,c)===0)) {
						matched = true;
						return false;
					}
				});
				return matched ? value : false;
			});
			
		}
		else if(php.empty(categories)) {
			return Yii.filter(this._logs,function(value, k, arr) {
				var matched = false, matchLevel = value[1].toLowerCase();
				Yii.forEach(self._levels, function(i, level) {
					if (level === matchLevel) {
						matched = true;
						return false;
					}
				});
				return matched ? value : false;
			});
		}
		else {
			return Yii.filter(Yii.filter(this._logs,function(value, k, arr) {
				var matched = false, cat = value[2].toLowerCase(), c;
				Yii.forEach(self._categories, function(i, category) {
					if(cat===category || ((c=php.rtrim(category,'.*'))!==category && php.strpos(cat,c)===0)) {
						matched = true;
						return false;
					}
				});
				return matched ? value : false;
			}), function(value, k, arr) {
				var matched = false, matchLevel = value[1].toLowerCase();
				Yii.forEach(self._levels, function(i, level) {
					if (level === matchLevel) {
						matched = true;
						return false;
					}
				});
				return matched ? value : false;
			});
			
		}
	};
/**
 * Filter function used by {@link getLogs}
 * @param {Array} value element to be filtered
 * @returns {Array} valid log, false if not.
 */
Yii.CLogger.prototype.filterByCategory = function (value) {
		var i, cat, category, c;
		for (i in this._categories) {
			if (this._categories.hasOwnProperty(i)) {
				category = this._categories[i];
				cat=value[2].toLowerCase();
				if(cat===category || ((c=php.rtrim(category,'.*'))!==category && php.strpos(cat,c)===0)) {
					return value;
				}
			}
		}
		return false;
	};
/**
 * Filter function used by {@link getLogs}
 * @param {Array} value element to be filtered
 * @returns {Array} valid log, false if not.
 */
Yii.CLogger.prototype.filterByLevel = function (value) {
		var matched = false, matchLevel = value[1].toLowerCase();
		
		Yii.forEach(this._levels, function(i, level) {
			console.log(level);
			if (level === matchLevel) {
				matched = true;
				return false;
			}
		});
		return matched ? value : false;
	};
/**
 * Returns the total time for serving the current request.
 * This method calculates the difference between now and the timestamp
 * defined by constant YII_BEGIN_TIME.
 * To estimate the execution time more accurately, the constant should
 * be defined as early as possible (best at the beginning of the entry script.)
 * @returns {Float} the total time for serving the current request.
 */
Yii.CLogger.prototype.getExecutionTime = function () {
		return php.microtime(true)-YII_BEGIN_TIME;
	};
/**
 * Not Available in JavaScript, always returns 0
 * @returns {Integer} memory usage of the application (in bytes).
 */
Yii.CLogger.prototype.getMemoryUsage = function () {
		return 0;
	};
/**
 * Returns the profiling results.
 * The results may be filtered by token and/or category.
 * If no filter is specified, the returned results would be an array with each element
 * being array($token,$category,$time).
 * If a filter is specified, the results would be an array of timings.
 * @param {String} token token filter. Defaults to null, meaning not filtered by token.
 * @param {String} category category filter. Defaults to null, meaning not filtered by category.
 * @param {Boolean} refresh whether to refresh the internal timing calculations. If false,
 * only the first time calling this method will the timings be calculated internally.
 * @returns {Array} the profiling results.
 * @since 1.0.6
 */
Yii.CLogger.prototype.getProfilingResults = function (token, category, refresh) {
		var results, i, timing;
		if (token === undefined) {
			token = null;
		}
		if (category === undefined) {
			category = null;
		}
		if (refresh === undefined) {
			refresh = false;
		}
		if(this._timings===null || refresh) {
			this.calculateTimings();
		}
		if(token===null && category===null) {
			return this._timings;
		}
		results=[];
		for (i in this._timings) {
			if (this._timings.hasOwnProperty(i)) {
				timing = this._timings[i];
				if((category===null || timing[1]===category) && (token===null || timing[0]===token)) {
					results.push(timing[2]);
				}
			}
		}
		return results;
	};
Yii.CLogger.prototype.calculateTimings = function () {
		var stack, i, log, message, level, category, timestamp, token, last, delta, now;
		this._timings=[];
		stack=[];
		for (i in this._logs) {
			if (this._logs.hasOwnProperty(i)) {
				log = this._logs[i];
				if(log[1]!==Yii.CLogger.prototype.LEVEL_PROFILE) {
					continue;
				}
				message = log[0];
				level = log[1];
				category = log[2];
				timestamp = log[3];
				if(!php.strncasecmp(message,'begin:',6)) {
					log[0]=message.slice(6);
					stack.push(log);
				}
				else if(!php.strncasecmp(message,'end:',4)) {
					token=message.slice(4);
					if((last=php.array_pop(stack))!==null && last[0]===token) {
						delta=log[3]-last[3];
						this._timings.push([message,category,delta]);
					}
					else {
						throw new Yii.CException(Yii.t('yii','CProfileLogRoute found a mismatching code block "{token}". Make sure the calls to Yii::beginProfile() and Yii::endProfile() be properly nested.',
							{'{token}':token}));
					}
				}
			}
		}
		now=php.microtime(true);
		while((last=php.array_pop(stack))!==null) {
			delta=now-last[3];
			this._timings.push([last[0],last[2],delta]);
		}
	};
/**
 * Removes all recorded messages from the memory.
 * This method will raise an {@link onFlush} event.
 * The attached event handlers can process the log messages before they are removed.
 * @param {Boolean} dumpLogs whether to process the logs
 * @since 1.1.0
 */
Yii.CLogger.prototype.flush = function (dumpLogs) {
		if (dumpLogs === undefined) {
			dumpLogs = false;
		}
		this.onFlush(new Yii.CEvent(this, {'dumpLogs':dumpLogs}));
		this._logs=[];
		this._logCount=0;
	};
/**
 * Raises an <code>onFlush</code> event.
 * @param {Yii.CEvent} event the event parameter
 * @since 1.1.0
 */
Yii.CLogger.prototype.onFlush = function (event) {
		this.raiseEvent('onFlush', event);
	}