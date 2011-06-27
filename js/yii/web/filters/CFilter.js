/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CFilter is the base class for all filters.
 * 
 * A filter can be applied before and after an action is executed.
 * It can modify the context that the action is to run or decorate the result that the
 * action generates.
 * 
 * Override {@link preFilter()} to specify the filtering logic that should be applied
 * before the action, and {@link postFilter()} for filtering logic after the action.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CFilter.php 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package system.web.filters
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CFilter = function CFilter () {
};
Yii.CFilter.prototype = new Yii.CComponent();
Yii.CFilter.prototype.constructor =  Yii.CFilter;
/**
 * Performs the filtering.
 * The default implementation is to invoke {@link preFilter}
 * and {@link postFilter} which are meant to be overridden
 * child classes. If a child class needs to override this method,
 * make sure it calls <code>$filterChain->run()</code>
 * if the action should be executed.
 * @param {Yii.CFilterChain} filterChain the filter chain that the filter is on.
 */
Yii.CFilter.prototype.filter = function (filterChain) {
		if(this.preFilter(filterChain))
		{
			filterChain.run();
			this.postFilter(filterChain);
		}
	};
/**
 * Initializes the filter.
 * This method is invoked after the filter properties are initialized
 * and before {@link preFilter} is called.
 * You may override this method to include some initialization logic.
 * @since 1.1.4
 */
Yii.CFilter.prototype.init = function () {
	};
/**
 * Performs the pre-action filtering.
 * @param {Yii.CFilterChain} filterChain the filter chain that the filter is on.
 * @returns {Boolean} whether the filtering process should continue and the action
 * should be executed.
 */
Yii.CFilter.prototype.preFilter = function (filterChain) {
		return true;
	};
/**
 * Performs the post-action filtering.
 * @param {Yii.CFilterChain} filterChain the filter chain that the filter is on.
 */
Yii.CFilter.prototype.postFilter = function (filterChain) {
	};