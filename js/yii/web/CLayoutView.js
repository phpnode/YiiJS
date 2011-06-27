/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CLayoutView is a base class for layouts
 * 
 * @package system.web
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CLayoutView = function CLayoutView (config) {
	if (config !== false) {
		this.template = null;
		this.construct(config);
	}
};
Yii.CLayoutView.prototype = new Yii.CView(false);
Yii.CLayoutView.prototype.constructor =  Yii.CLayoutView;
/**
 * The content to render
 * @var String
 */
Yii.CLayoutView.prototype.content = "";

/**
 * The template to render
 * @var String
 */
Yii.CLayoutView.prototype.templateURL = "application.views.layouts.main";

/**
 * Gets the page title
 * @returns {String} The page title
 */
Yii.CLayoutView.prototype.pageTitle = function () {
	return Yii.app().getController().getPageTitle();
};


/**
 * Displays the breadcrumbs
 * @returns {String} The html for the main menu
 */
Yii.CLayoutView.prototype.breadcrumbs = function () {
	var crumbs, links;
	if (Yii.app().getController().breadcrumbs !== undefined) {
		links = Yii.app().getController().breadcrumbs;
		if (links.length === 0) {
			return "";
		}
		crumbs = new Yii.CBreadcrumbs;
		crumbs.links = links;
		return crumbs.run();
	}
	return "";
};