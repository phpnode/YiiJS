/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CWidgetFactory creates new widgets to be used in views.
 * 
 * CWidgetFactory is used as the default "widgetFactory" application component.
 * 
 * When calling {@link CBaseController::createWidget}, {@link CBaseController::widget}
 * or {@link CBaseController::beginWidget}, if the "widgetFactory" component is installed,
 * it will be used to create the requested widget. To install the "widgetFactory" component,
 * we should have the following application configuration:
 * <pre>
 * return {
 *     'components':{
 *         'widgetFactory':{
 *             'class':'CWidgetFactory',
 *         },
 *     ),
 * }
 * </pre>
 * 
 * CWidgetFactory implements the "skin" feature, which allows a new widget to be created
 * and initialized with a set of predefined property values (called skin).
 * 
 * When CWidgetFactory is used to create a new widget, it will first instantiate the
 * widget instance. It then checks if there is a skin available for this widget
 * according to the widget class name and the widget {@link CWidget::skin} property.
 * If a skin is found, it will be merged with the initial properties passed via
 * {@link createWidget}. Then the merged initial properties will be used to initialize
 * the newly created widget instance.
 * 
 * As aforementioned, a skin is a set of initial property values for a widget.
 * It is thus represented as an associative array of name-value pairs.
 * Skins are stored in PHP scripts like other configurations. Each script file stores the skins
 * for a particular widget type and is named as the wiget class name (e.g. CLinkPager.php).
 * Each widget type may have one or several skins, identified by the skin name set via
 * {@link CWidget::skin} property. If the {@link CWidget::skin} property is not set for a given
 * widget, it means the default skin would be used. The following shows the possible skins for
 * the {@link CLinkPager} widget:
 * <pre>
 * return {
 *     'default':{
 *         'nextPageLabel':'&gt;&gt;',
 *         'prevPageLabel':'&lt;&lt;',
 *     },
 *     'short':{
 *         'header':'',
 *         'maxButtonCount':5,
 *     },
 * };
 * </pre>
 * In the above, there are two skins. The first one is the default skin which is indexed by the string "default".
 * Note that {@link CWidget::skin} defaults to "default". Therefore, this is the skin that will be applied
 * if we do not explicitly specify the {@link CWidget::skin} property.
 * The second one is named as the "short" skin which will be used only when we set {@link CWidget::skin}
 * to be "short".
 * 
 * By default, CWidgetFactory looks for the skin of a widget under the "skins" directory
 * of the current application's {@link CWebApplication::viewPath} (e.g. protected/views/skins).
 * If a theme is being used, it will look for the skin under the "skins" directory of
 * the theme's {@link CTheme::viewPath} (as well as the aforementioned skin directory).
 * In case the specified skin is not found, a widget will still be created
 * normally without causing any error.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CWidgetFactory.php 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package system.web
 * @since 1.1
 * @author Charles Pick
 * @class
 * @extends Yii.CApplicationComponent
 */
Yii.CWidgetFactory = function CWidgetFactory () {
};
Yii.CWidgetFactory.prototype = new Yii.CApplicationComponent();
Yii.CWidgetFactory.prototype.constructor =  Yii.CWidgetFactory;

/**
 * @var {Object} widget initial property values. Each array key-value pair
 * represents the initial property values for a single widget class, with
 * the array key being the widget class name, and array value being the initial
 * property value array. For example,
 * <pre>
 * {
 *     'CLinkPager':{
 *         'maxButtonCount':5,
 *         'cssFile':false,
 *     ),
 *     'CJuiDatePicker':{
 *         'language':'ru',
 *     },
 * }
 * </pre>
 * 
 * Note that the initial values specified here may be overridden by
 * the values given in {@link CBaseController::createWidget} calls.
 * They may also be overridden by widget skins, if {@link enableSkin} is true.
 * @since 1.1.3
 */
Yii.CWidgetFactory.prototype.widgets = {};

/**
 * Initializes the application component.
 * This method overrides the parent implementation by resolving the skin path.
 */
Yii.CWidgetFactory.prototype.init = function () {
		Yii.CApplicationComponent.prototype.init.call(this);
		
	};
/**
 * Creates a new widget based on the given class name and initial properties.
 * @param {Yii.CBaseController} owner the owner of the new widget
 * @param {String} className the class name of the widget. This can also be a path alias (e.g. system.web.widgets.COutputCache)
 * @param {Array} properties the initial property values (name=>value) of the widget.
 * @returns {Yii.CWidget} the newly created widget whose properties have been initialized with the given values.
 */
Yii.CWidgetFactory.prototype.createWidget = function (owner, className, properties) {
		var widget, skinName, skin, name, value;
		if (properties === undefined) {
			properties = [];
		}
		className=Yii.imports(className,true);
		widget=new Yii[className](owner);
		
		if(this.widgets[className] !== undefined) {
			properties=properties===[] ? this.widgets[className] : Yii.CMap.prototype.mergeArray(this.widgets[className],properties);
		}
		
		for (name in properties) {
			if (properties.hasOwnProperty(name)) {
				value = properties[name];
				widget[name]=value;
			}
		}
		return widget;
	};
