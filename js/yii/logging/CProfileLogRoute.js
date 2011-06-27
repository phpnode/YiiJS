/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CProfileLogRoute displays the profiling results in Web page.
 * 
 * The profiling is done by calling {@link YiiBase::beginProfile()} and {@link YiiBase::endProfile()},
 * which marks the begin and end of a code block.
 * 
 * CProfileLogRoute supports two types of report by setting the {@link setReport report} property:
 * <ul>
 * <li>summary: list the execution time of every marked code block</li>
 * <li>callstack: list the mark code blocks in a hierarchical view reflecting their calling sequence.</li>
 * </ul>
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CProfileLogRoute.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.logging
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CWebLogRoute
 */
Yii.CProfileLogRoute = function CProfileLogRoute () {
};
Yii.CProfileLogRoute.prototype = new Yii.CWebLogRoute();
Yii.CProfileLogRoute.prototype.constructor =  Yii.CProfileLogRoute;
/**
 * @var {Boolean} whether to aggregate results according to profiling tokens.
 * If false, the results will be aggregated by categories.
 * Defaults to true. Note that this property only affects the summary report
 * that is enabled when {@link report} is 'summary'.
 * @since 1.0.6
 */
Yii.CProfileLogRoute.prototype.groupByToken = true;
/**
 * @var {String} type of profiling report to display
 */
Yii.CProfileLogRoute.prototype._report = 'summary';
/**
 * Initializes the route.
 * This method is invoked after the route is created by the route manager.
 */
Yii.CProfileLogRoute.prototype.init = function () {
		
		this.levels=Yii.CLogger.prototype.LEVEL_PROFILE;
	};
/**
 * @returns {String} the type of the profiling report to display. Defaults to 'summary'.
 */
Yii.CProfileLogRoute.prototype.getReport = function () {
		return this._report;
	};
/**
 * @param {String} value the type of the profiling report to display. Valid values include 'summary' and 'callstack'.
 */
Yii.CProfileLogRoute.prototype.setReport = function (value) {
		if(value==='summary' || value==='callstack') {
			this._report=value;
		}
		else {
			throw new Yii.CException(Yii.t('yii','CProfileLogRoute.report "{report}" is invalid. Valid values include "summary" and "callstack".',
				{'{report}':value}));
		}
	};
/**
 * Displays the log messages.
 * @param {Array} logs list of log messages
 */
Yii.CProfileLogRoute.prototype.processLogs = function (logs) {
		var app;
		app=Yii.app();
		
		if(!(app instanceof Yii.CWebApplication) || app.getRequest().getIsAjaxRequest()) {
			return;
		}
		
		if(this.getReport()==='summary') {
			this.displaySummary(logs);
		}
		else {
			this.displayCallstack(logs);
		}
	};
/**
 * Displays the callstack of the profiling procedures for display.
 * @param {Array} logs list of logs
 */
Yii.CProfileLogRoute.prototype.displayCallstack = function (logs) {
		var stack, results, n, i, log, message, token, last, delta, now;
		stack=[];
		results={};
		n=0;
		for (i in logs)	{
			if (logs.hasOwnProperty(i)) {
				log = logs[i];
				if(log[1]!==Yii.CLogger.prototype.LEVEL_PROFILE) {
					continue;
				}
				message=log[0];
				if(!php.strncasecmp(message,'begin:',6)){
					log[0]=message.slice(6);
					log[4]=n;
					stack.push(log);
					n++;
				}
				else if(!php.strncasecmp(message,'end:',4)) {
					token=message.slice(4);
					if((last=php.array_pop(stack))!==null && last[0]===token) {
						delta=log[3]-last[3];
						results[last[4]]=[token,delta,php.count(stack)];
					}
					else {
						throw new Yii.CException(Yii.t('yii','CProfileLogRoute found a mismatching code block "{token}". Make sure the calls to Yii::beginProfile() and Yii::endProfile() be properly nested.',
							{'{token}':token}));
					}
				}
			}
		}
		// remaining entries should be closed here
		now=php.microtime(true);
		while((last=php.array_pop(stack))!==null) {
			results[last[4]]=[last[0],now-last[3],php.count(stack)];
		}
		php.ksort(results);
		this.render('profile-callstack',results);
	};
/**
 * Displays the summary report of the profiling result.
 * @param {Array} logs list of logs
 */
Yii.CProfileLogRoute.prototype.displaySummary = function (logs) {
		var stack, i, log, message, token, last, delta, results = {}, now, entries, func, data;
		stack=[];
		for (i in logs)	{
			if (logs.hasOwnProperty(i)) {
			
				log = logs[i];
				
				if(log[1]!==Yii.CLogger.prototype.LEVEL_PROFILE) {
					continue;
				}
				message=log[0];
				
				if(!php.strncasecmp(message,'begin:',6)) {
					log[0]=message.slice(6);
					stack.push(log);
				}
				else if(!php.strncasecmp(message,'end:',4)) {
					token=message.slice(4);
					
					if((last=php.array_pop(stack))!==null && last[0]===token) {
						delta=log[3]-last[3];
						if(!this.groupByToken) {
							token=log[2];
						}
						if(results[token] !== undefined) {
							
							results[token]=this.aggregateResult(results[token],delta);
						}
						else {
							results[token]=[token,1,delta,delta,delta];
						}
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
			token=this.groupByToken ? last[0] : last[2];
			if(results[token] !== undefined) {
				results[token]=this.aggregateResult(results[token],delta);
			}
			else {
				results[token]=[token,1,delta,delta,delta];
			}
		}
		entries=php.array_values(results);
		func = function(a,b) {
			return a[4] < b[4] ? 1 : 0;
		};
		php.usort(entries,func);
		data = {
			time: php.sprintf('%0.5f',Yii.getLogger().getExecutionTime()),
			entries: []
		};
		
		Yii.forEach(entries, function(k, entry) {
			data.entries.push({
				'proc': Yii.CHtml.encode(entry[0]),
				'count': php.sprintf('%5d',entry[1]),
				'min': php.sprintf('%0.5f',entry[2]),
				'max': php.sprintf('%0.5f',entry[3]),
				'total': php.sprintf('%0.5f',entry[4]),
				'average': php.sprintf('%0.5f',entry[4] / entry[1])
			});
		});
		if (this.showInFireBug && window['console'] !== undefined) {
			if (console.group !== undefined) {
				console.group("Profiling Summary Report");
			}
			console.log(" count   total   average    min      max   ");
			Yii.forEach(data.entries, function(k, entry) {
				console.log(" " + entry.count + "  " + entry.total + "  " + entry.average + "  " + entry.min + "  " + entry.max + "    " + entry.proc);
			});
			if (console.group !== undefined) {
				console.groupEnd();
			}
		}
		else {
			this.render('profile-summary',data);
		}
	};
/**
 * Aggregates the report result.
 * @param {Array} result log result for this code block
 * @param {Float} delta time spent for this code block
 */
Yii.CProfileLogRoute.prototype.aggregateResult = function (result, delta) {
		var token, calls, min, max, total;
		token = result[0];
		calls = result[1];
		min = result[2];
		max = result[3];
		total = result[4];
		if(delta<min) {
			min=delta;
		}
		else if(delta>max) {
			max=delta;
		}
		calls++;
		total+=delta;
		return [token,calls,min,max,total];
	};