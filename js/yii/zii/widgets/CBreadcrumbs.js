/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CBreadcrumbs displays a list of links indicating the position of the current page in the whole website.
 * 
 * For example, breadcrumbs like "Home > Sample Post > Edit" means the user is viewing an edit page
 * for the "Sample Post". He can click on "Sample Post" to view that page, or he can click on "Home"
 * to return to the homepage.
 * 
 * To use CBreadcrumbs, one usually needs to configure its {@link links} property, which specifies
 * the links to be displayed. For example,
 * 
 * <pre>
 * this.widget('zii.widgets.CBreadcrumbs', {
 *     'links':{
 *         'Sample post':{'post/view', 'id':12},
 *         'Edit',
 *     ),
 * });
 * </pre>
 * 
 * Because breadcrumbs usually appears in nearly every page of a website, the widget is better to be placed
 * in a layout view. One can define a property "breadcrumbs" in the base controller class and assign it to the widget
 * in the layout, like the following:
 * 
 * <pre>
 * this.widget('zii.widgets.CBreadcrumbs', {
 *     'links':this.breadcrumbs,
 * });
 * </pre>
 * 
 * Then, in each view script, one only needs to assign the "breadcrumbs" property as needed.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CBreadcrumbs.php 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package zii.widgets
 * @since 1.1
 * @author Charles Pick
 * @class
 * @extends Yii.CWidget
 */
Yii.CBreadcrumbs = function CBreadcrumbs () {
};
Yii.CBreadcrumbs.prototype = new Yii.CWidget(false);
Yii.CBreadcrumbs.prototype.constructor =  Yii.CBreadcrumbs;
/**
 * @var {String} the tag name for the breadcrumbs container tag. Defaults to 'div'.
 */
Yii.CBreadcrumbs.prototype.tagName = 'div';
/**
 * @var {Array} the HTML attributes for the breadcrumbs container tag.
 */
Yii.CBreadcrumbs.prototype.htmlOptions = {'class':'breadcrumbs'};
/**
 * @var {Boolean} whether to HTML encode the link labels. Defaults to true.
 */
Yii.CBreadcrumbs.prototype.encodeLabel = true;
/**
 * @var {String} the first hyperlink in the breadcrumbs (called home link).
 * If this property is not set, it defaults to a link pointing to {@link CWebApplication::homeUrl} with label 'Home'.
 * If this property is false, the home link will not be rendered.
 */
Yii.CBreadcrumbs.prototype.homeLink = null;
/**
 * @var {Array} list of hyperlinks to appear in the breadcrumbs. If this property is empty,
 * the widget will not render anything. Each key-value pair in the array
 * will be used to generate a hyperlink by calling CHtml::link(key, value). For this reason, the key
 * refers to the label of the link while the value can be a string or an array (used to
 * create a URL). For more details, please refer to {@link CHtml::link}.
 * If an element's key is an integer, it means the element will be rendered as a label only (meaning the current page).
 * 
 * The following example will generate breadcrumbs as "Home > Sample post > Edit", where "Home" points to the homepage,
 * "Sample post" points to the "index.php?r=post/view&id=12" page, and "Edit" is a label. Note that the "Home" link
 * is specified via {@link homeLink} separately.
 * 
 * <pre>
 * [
 * 	{
 * 		'label': 'Sample Post',
 * 		'url': ['post/view',{id: 12}]
 * 	},
 * 'Edit'
 * ]
 * </pre>
 */
Yii.CBreadcrumbs.prototype.links = [];
/**
 * @var {String} the separator between links in the breadcrumbs. Defaults to ' &raquo; '.
 */
Yii.CBreadcrumbs.prototype.separator = ' &raquo; ';
/**
 * Renders the content of the portlet.
 */
Yii.CBreadcrumbs.prototype.run = function () {
		var links, label, url, ret = '', self = this;
		if(php.empty(this.links)) {
			return;
		}
		ret += Yii.CHtml.openTag(this.tagName,this.htmlOptions)+"\n";
		links=[];
		if(this.homeLink===null) {
			links.push(Yii.CHtml.link(Yii.t('zii','Home'),Yii.app().homeUrl));
		}
		else if(this.homeLink!==false) {
			links.push(this.homeLink);
		}
		Yii.forEach(this.links, function(i, item) {
			if (typeof item === "object") {
				label = item.label;
				delete item.label;
				url = item.url;
				delete item.url;
				links.push(Yii.CHtml.link(self.encodeLabel ? Yii.CHtml.encode(label) : label,url,item));
			}
			else {
				links.push('<span>'+(self.encodeLabel ? Yii.CHtml.encode(item) : item)+'</span>');
			}
		});
		ret += links.join(this.separator);
		ret += Yii.CHtml.closeTag(this.tagName);
		return ret;
};