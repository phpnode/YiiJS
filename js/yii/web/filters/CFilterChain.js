/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CFilterChain represents a list of filters being applied to an action.
 * 
 * CFilterChain executes the filter list by {@link run()}.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CFilterChain.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.web.filters
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CList
 */
Yii.CFilterChain = function CFilterChain (data, readOnly) {
	if (data !== false) {
		this.construct(data, readOnly);
	}
};
Yii.CFilterChain.prototype = new Yii.CList(false);
Yii.CFilterChain.prototype.constructor =  Yii.CFilterChain;
/**
 * @var {Yii.CController} the controller who executes the action.
 */
Yii.CFilterChain.prototype.controller = null;
/**
 * @var {Yii.CAction} the action being filtered by this chain.
 */
Yii.CFilterChain.prototype.action = null;
/**
 * @var {Integer} the index of the filter that is to be executed when calling {@link run()}.
 */
Yii.CFilterChain.prototype.filterIndex = 0;
/**
 * Constructor.
 * @param {Yii.CController} controller the controller who executes the action.
 * @param {Yii.CAction} action the action being filtered by this chain.
 */
Yii.CFilterChain.prototype.construct = function (controller, action) {
		this.controller=controller;
		this.action=action;
	};
/**
 * CFilterChain factory method.
 * This method creates a CFilterChain instance.
 * @param {Yii.CController} controller the controller who executes the action.
 * @param {Yii.CAction} action the action being filtered by this chain.
 * @param {Array} filters list of filters to be applied to the action.
 */
Yii.CFilterChain.prototype.create = function (controller, action, filters) {
		var chain, actionID, i, filter, pos, matched, filterClass;
		chain=new Yii.CFilterChain(controller,action);
		actionID=action.getId();
		for (i in filters)	{
			if (filters.hasOwnProperty(i)) {
				filter = filters[i];
				if(typeof(filter) === 'string') {
					// filterName [+|- action1 action2]
					if((pos=php.strpos(filter,'+'))!==false || (pos=php.strpos(filter,'-'))!==false) {
						matched=/\b{actionID}\b/i.exec(filter.slice(pos+1))>0;
						if((filter[pos]==='+')===matched) {
							filter=Yii.CInlineFilter.create(controller,php.trim(filter.slice(0, pos)));
						}
					}
					else {
						filter=Yii.CInlineFilter.create(controller,filter);
					}
				}
			}
			else if(typeof(filter) === "object") {
				// array('path.to.class [+|- action1, action2]','param1'=>'value1',...)
				if(filter[0] === undefined) {
					throw new Yii.CException(Yii.t('yii','The first element in a filter configuration must be the filter class.'));
				}
				filterClass=filter[0];
				delete filter[0];
				if((pos=php.strpos(filterClass,'+'))!==false || (pos=php.strpos(filterClass,'-'))!==false) {
					matched=((new RegExp("\\b" + actionID + "\\b","i")).exec(filterClass.slice(pos+1))>0);
					if((filterClass[pos]==='+')===matched) {
						filterClass=php.trim(filterClass.slice(0, pos));
					}
					else {
						continue;
					}
				}
				filter['class']=filterClass;
				filter=Yii.createComponent(filter);
			}
			if (typeof filter === "object") {
				filter.init();
				chain.add(filter);
			}
		}
		return chain;
	};
/**
 * Inserts an item at the specified position.
 * This method overrides the parent implementation by adding
 * additional check for the item to be added. In particular,
 * only objects implementing {@link IFilter} can be added to the list.
 * @param {Integer} index the specified position.
 * @param {Mixed} item new item
 * @throws {Yii.CException} If the index specified exceeds the bound or the list is read-only, or the item is not an {@link IFilter} instance.
 */
Yii.CFilterChain.prototype.insertAt = function (index, item) {
		if(item instanceof Yii.CFilter) {
			Yii.CList.prototype.insertAt.call(this,index,item);
		}
		else {
			throw new Yii.CException(Yii.t('yii','CFilterChain can only take objects implementing the IFilter interface.'));
		}
	};
/**
 * Executes the filter indexed at {@link filterIndex}.
 * After this method is called, {@link filterIndex} will be automatically incremented by one.
 * This method is usually invoked in filters so that the filtering process
 * can continue and the action can be executed.
 */
Yii.CFilterChain.prototype.run = function () {
		var filter;
		if(this.offsetExists(this.filterIndex))	{
			filter=this.itemAt(this.filterIndex++);
			Yii.trace('Running filter '+(filter instanceof Yii.CInlineFilter ? this.controller.getClassName()+'.filter'+filter.name+'()':filter.getClassName()+'.filter()'),'system.web.filters.CFilterChain');
			filter.filter(this);
		}
		else {
			this.controller.runAction(this.action);
		}
	};