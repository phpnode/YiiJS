/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CInlineFilter represents a filter defined as a controller method.
 * 
 * CInlineFilter executes the 'filterXYZ($action)' method defined
 * in the controller, where the name 'XYZ' can be retrieved from the {@link name} property.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CInlineFilter.php 3026 2011-03-06 10:41:56Z haertl.mike $
 * @package system.web.filters
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CFilter
 */
Yii.CInlineFilter = function CInlineFilter () {
};
Yii.CInlineFilter.prototype = new Yii.CFilter();
Yii.CInlineFilter.prototype.constructor =  Yii.CInlineFilter;
/**
 * @var {String} name of the filter. It stands for 'XYZ' in the filter method name 'filterXYZ'.
 */
Yii.CInlineFilter.prototype.name = null;
/**
 * Creates an inline filter instance.
 * The creation is based on a string describing the inline method name
 * and action names that the filter shall or shall not apply to.
 * @param {Yii.CController} controller the controller who hosts the filter methods
 * @param {String} filterName the filter name
 * @returns {Yii.CInlineFilter} the created instance
 * @throws {Yii.CException} if the filter method does not exist
 */
Yii.CInlineFilter.prototype.create = function (controller, filterName) {
		var filter;
		if(controller['filter'+php.ucfirst(filterName)] !== undefined) {
			filter=new Yii.CInlineFilter();
			filter.name=filterName;
			return filter;
		}
		else {
			throw new Yii.CException(Yii.t('yii','Filter "{filter}" is invalid. Controller "{class}" does not have the filter method "filter{filter}".',
				{'{filter}':filterName, '{class}':controller.getClassName()}));
		}
	};
/**
 * Performs the filtering.
 * This method calls the filter method defined in the controller class.
 * @param {Yii.CFilterChain} filterChain the filter chain that the filter is on.
 */
Yii.CInlineFilter.prototype.filter = function (filterChain) {
		var method;
		method='filter'+php.ucfirst(this.name);
		filterChain.controller[method](filterChain);
	};