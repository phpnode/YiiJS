/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CMenu displays a multi-level menu using nested HTML lists.
 * 
 * The main property of CMenu is {@link items}, which specifies the possible items in the menu.
 * A menu item has three main properties: visible, active and items. The "visible" property
 * specifies whether the menu item is currently visible. The "active" property specifies whether
 * the menu item is currently selected. And the "items" property specifies the child menu items.
 * 
 * The following example shows how to use CMenu:
 * <pre>
 * this.widget('zii.widgets.CMenu', {
 *     'items':{
 *         // Important: you need to specify url as 'controller/action',
 *         // not just as 'controller' even if default acion is used.
 *         {'label':'Home', 'url':{'site/index'}),
 *         {'label':'Products', 'url':{'product/index'}, 'items':{
 *             {'label':'New Arrivals', 'url':{'product/new', 'tag':'new'}),
 *             {'label':'Most Popular', 'url':{'product/index', 'tag':'popular'}),
 *         )),
 *         {'label':'Login', 'url':{'site/login'}, 'visible':Yii.app().user.isGuest),
 *     ),
 * });
 * </pre>
 * 
 * 
 * @originalAuthor Jonah Turnquist <poppitypop@gmail.com>
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CMenu.php 3034 2011-03-08 18:22:29Z qiang.xue $
 * @package zii.widgets
 * @since 1.1
 * @author Charles Pick
 * @class
 * @extends Yii.CWidget
 */
Yii.CMenu = function CMenu () {
	
};
Yii.CMenu.prototype = new Yii.CWidget(false);
Yii.CMenu.prototype.constructor =  Yii.CMenu;
/**
 * @var {Array} list of menu items. Each menu item is specified as an array of name-value pairs.
 * Possible option names include the following:
 * <ul>
 * <li>label: string, optional, specifies the menu item label. When {@link encodeLabel} is true, the label
 * will be HTML-encoded. If the label is not specified, it defaults to an empty string.</li>
 * <li>url: string or array, optional, specifies the URL of the menu item. It is passed to {@link CHtml::normalizeUrl}
 * to generate a valid URL. If this is not set, the menu item will be rendered as a span text.</li>
 * <li>visible: boolean, optional, whether this menu item is visible. Defaults to true.
 * This can be used to control the visibility of menu items based on user permissions.</li>
 * <li>items: array, optional, specifies the sub-menu items. Its format is the same as the parent items.</li>
 * <li>active: boolean, optional, whether this menu item is in active state (currently selected).
 * If a menu item is active and {@link activeClass} is not empty, its CSS class will be appended with {@link activeClass}.
 * If this option is not set, the menu item will be set active automatically when the current request
 * is triggered by {@link url}. Note that the GET parameters not specified in the 'url' option will be ignored.</li>
 * <li>template: string, optional, the template used to render this menu item.
 * When this option is set, it will override the global setting {@link itemTemplate}.
 * Please see {@link itemTemplate} for more details. This option has been available since version 1.1.1.</li>
 * <li>linkOptions: array, optional, additional HTML attributes to be rendered for the link or span tag of the menu item.</li>
 * <li>itemOptions: array, optional, additional HTML attributes to be rendered for the container tag of the menu item.</li>
 * <li>submenuOptions: array, optional, additional HTML attributes to be rendered for the container of the submenu if this menu item has one.
 * When this option is set, the {@link submenuHtmlOptions} property will be ignored for this particular submenu.
 * This option has been available since version 1.1.6.</li>
 * </ul>
 */
Yii.CMenu.prototype.items = [];
/**
 * @var {String} the template used to render an individual menu item. In this template,
 * the token "{menu}" will be replaced with the corresponding menu link or text.
 * If this property is not set, each menu will be rendered without any decoration.
 * This property will be overridden by the 'template' option set in individual menu items via {@items}.
 * @since 1.1.1
 */
Yii.CMenu.prototype.itemTemplate = undefined;
/**
 * @var {Boolean} whether the labels for menu items should be HTML-encoded. Defaults to true.
 */
Yii.CMenu.prototype.encodeLabel = true;
/**
 * @var {String} the CSS class to be appended to the active menu item. Defaults to 'active'.
 * If empty, the CSS class of menu items will not be changed.
 */
Yii.CMenu.prototype.activeCssClass = 'active';
/**
 * @var {Boolean} whether to automatically activate items according to whether their route setting
 * matches the currently requested route. Defaults to true.
 * @since 1.1.3
 */
Yii.CMenu.prototype.activateItems = true;
/**
 * @var {Boolean} whether to activate parent menu items when one of the corresponding child menu items is active.
 * The activated parent menu items will also have its CSS classes appended with {@link activeCssClass}.
 * Defaults to false.
 */
Yii.CMenu.prototype.activateParents = false;
/**
 * @var {Boolean} whether to hide empty menu items. An empty menu item is one whose 'url' option is not
 * set and which doesn't contain visible child menu items. Defaults to true.
 */
Yii.CMenu.prototype.hideEmptyItems = true;
/**
 * @var {Object} HTML attributes for the menu's root container tag
 */
Yii.CMenu.prototype.htmlOptions = {};
/**
 * @var {Object} HTML attributes for the submenu's container tag.
 */
Yii.CMenu.prototype.submenuHtmlOptions = {};
/**
 * @var {String} the HTML element name that will be used to wrap the label of all menu links.
 * For example, if this property is set as 'span', a menu item may be rendered as
 * &lt;li&gt;&lt;a href="url"&gt;&lt;span&gt;label&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;
 * This is useful when implementing menu items using the sliding window technique.
 * Defaults to null, meaning no wrapper tag will be generated.
 * @since 1.1.4
 */
Yii.CMenu.prototype.linkLabelWrapper = null;
/**
 * @var {String} the CSS class that will be assigned to the first item in the main menu or each submenu.
 * Defaults to null, meaning no such CSS class will be assigned.
 * @since 1.1.4
 */
Yii.CMenu.prototype.firstItemCssClass = null;
/**
 * @var {String} the CSS class that will be assigned to the last item in the main menu or each submenu.
 * Defaults to null, meaning no such CSS class will be assigned.
 * @since 1.1.4
 */
Yii.CMenu.prototype.lastItemCssClass = null;

/**
 * Calls {@link renderMenu} to render the menu.
 */
Yii.CMenu.prototype.run = function () {
		var route, hasActiveChild;
		this.htmlOptions.id=this.getId();
		route=this.getController().getRoute();
		this.items=this.normalizeItems(this.items,route,hasActiveChild);
		return this.renderMenu(this.items);
	};
/**
 * Renders the menu items.
 * @param {Array} items menu items. Each menu item will be an array with at least two elements: 'label' and 'active'.
 * It may have three other optional elements: 'items', 'linkOptions' and 'itemOptions'.
 */
Yii.CMenu.prototype.renderMenu = function (items) {
		var ret = "";
		if(items !== undefined && items !== null && items.length > 0) {
			ret += Yii.CHtml.openTag('ul',this.htmlOptions)+"\n";
			ret += this.renderMenuRecursive(items);
			ret += Yii.CHtml.closeTag('ul');
		}
		return ret;
	};
/**
 * Recursively renders the menu items.
 * @param {Array} items the menu items to be rendered recursively
 */
Yii.CMenu.prototype.renderMenuRecursive = function (items) {
		var count, n, i, limit, options, item, classVar, menu, template, ret = "";
		count=0;
		
		n=items.length;
		limit = items.length;
		for (i = 0; i < limit; i++) {
			item = items[i];
			count++;
			options=item.itemOptions !== undefined ? item.itemOptions : {};
			classVar=[];
			if(item['active'] && this.activeCssClass!='') {
				classVar.push(this.activeCssClass);
			}
			if(count===1 && this.firstItemCssClass!='') {
				classVar.push(this.firstItemCssClass);
			}
			if(count===n && this.lastItemCssClass!='') {
				classVar.push(this.lastItemCssClass);
			}	
			if(classVar!==[]) {
				if(php.empty(options['class'])) {
					options['class']=classVar.join(' ');
				}
				else {
					options['class']+=' '+classVar.join(' ');
				}
			}
			ret += Yii.CHtml.openTag('li', options);
			menu=this.renderMenuItem(item);
			if(this.itemTemplate !== undefined || item.template !== undefined) {
				template=item.template !== undefined ? item.template : this.itemTemplate;
				ret += php.strtr(template,{'{menu}':menu});
			}
			else {
				ret += menu;
			}
			if(item.items !== undefined && php.count(item.items)) {
				ret += "\n"+Yii.CHtml.openTag('ul',item.submenuOptions !== undefined ? item.submenuOptions : this.submenuHtmlOptions)+"\n";
				this.renderMenuRecursive(item.items);
				ret += Yii.CHtml.closeTag('ul')+"\n";
			}
			ret += Yii.CHtml.closeTag('li')+"\n";
		}
		return ret;
	};
/**
 * Renders the content of a menu item.
 * Note that the container and the sub-menus are not rendered here.
 * @param {Array} item the menu item to be rendered. Please see {@link items} on what data might be in the item.
 * @since 1.1.6
 */
Yii.CMenu.prototype.renderMenuItem = function (item) {
		var label;
		if(item.url !== undefined) {
			label=this.linkLabelWrapper===null ? item.label : '<'+this.linkLabelWrapper+'>'+item.label+'</'+this.linkLabelWrapper+'>';
			return Yii.CHtml.link(label,item.url,item.linkOptions !== undefined ? item.linkOptions : {});
		}
		else {
			return Yii.CHtml.tag('span',item.linkOptions !== undefined ? item.linkOptions : {}, item.label);
		}
	};
/**
 * Normalizes the {@link items} property so that the 'active' state is properly identified for every menu item.
 * @param {Array} items the items to be normalized.
 * @param {String} route the route of the current request.
 * @param {Boolean} active whether there is an active child menu item.
 * @returns {Array} the normalized menu items
 */
Yii.CMenu.prototype.normalizeItems = function (items, route, active) {
		var item, i, hasActiveChild;
		for (i in items) {
			if (items.hasOwnProperty(i)) {
				item = items[i];
				if(item.visible !== undefined && !item.visible) {
					delete items[i];
					continue;
				}
				if(item.label === undefined) {
					item.label='';
				}
				if(this.encodeLabel) {
					items[i].label=Yii.CHtml.encode(item.label);
				}
				hasActiveChild=false;
				if(item.items !== undefined) {
					items[i].items=this.normalizeItems(item.items,route,hasActiveChild);
					if(php.empty(items[i].items) && this.hideEmptyItems) {
						delete items[i].items;
					}
				}
				if(item.active === undefined) {
					if(this.activateParents && hasActiveChild || this.activateItems && this.isItemActive(item,route)) {
						active=items[i].active=true;
					}
					else {
						items[i].active=false;
					}
				}
				else if(item.active) {
					active=true;
				}
			}
		}
		return items;
		//return php.array_values(items);
	};
/**
 * Checks whether a menu item is active.
 * This is done by checking if the currently requested URL is generated by the 'url' option
 * of the menu item. Note that the GET parameters not specified in the 'url' option will be ignored.
 * @param {Array} item the menu item to be checked
 * @param {String} route the route of the current request
 * @returns {Boolean} whether the menu item is active
 */
Yii.CMenu.prototype.isItemActive = function (item, route) {
		var nameValue, name, value;
		if(item.url !== undefined && Object.prototype.toString.call(item.url) === '[object Array]' && !php.strcasecmp(php.trim(item.url[0],'/'),route)) {
			
			if(php.count(item.url)>1) {
				nameValue = php.array_splice(item.url,1);
				for (name in nameValue) {
					if (nameValue.hasOwnProperty(name)) {
						value = nameValue[name];
						if(Yii.app().getRequest().params[name] === undefined || Yii.app().getRequest().params[name]!=value) {
							return false;
						}
					}
				}
			}
			return true;
		}
		return false;
	};