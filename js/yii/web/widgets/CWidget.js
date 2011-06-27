/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CWidget is the base class for widgets.
 * 
 * A widget is a self-contained component that may generate presentation
 * based on model data.  It can be viewed as a micro-controller that embeds
 * into the controller-managed views.
 * 
 * Compared with {@link CController controller}, a widget has neither actions nor filters.
 * 
 * Usage is described at {@link CBaseController} and {@link CBaseController::widget}.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CWidget.php 3097 2011-03-17 20:01:03Z qiang.xue $
 * @package system.web.widgets
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CBaseController
 */
Yii.CWidget = function CWidget() {
};
Yii.CWidget.prototype = new Yii.CBaseController();
Yii.CWidget.prototype.constructor =  Yii.CWidget;
/**
 * @var {String} the prefix to the IDs of the {@link actions}.
 * When a widget is declared an action provider in {@link CController::actions},
 * a prefix can be specified to differentiate its action IDs from others.
 * The same prefix should then also be used to configure this property
 * when the widget is used in a view of the controller.
 * @since 1.0.1
 */
Yii.CWidget.prototype.actionPrefix = null;
/**
 * @var {Mixed} the name of the skin to be used by this widget. Defaults to 'default'.
 * If this is set as false, no skin will be applied to this widget.
 * @see CWidgetFactory
 * @since 1.1
 */
Yii.CWidget.prototype.skin = 'default';
/**
 * @var {Object} view paths for different types of widgets
 */
Yii.CWidget.prototype._viewPaths = {};
/**
 * @var {Integer} the counter for generating implicit IDs.
 */
Yii.CWidget.prototype._counter = 0;
/**
 * @var {String} id of the widget.
 */
Yii.CWidget.prototype._id = null;
/**
 * @var {Yii.CBaseController} owner/creator of this widget. It could be either a widget or a controller.
 */
Yii.CWidget.prototype._owner = null;
/**
 * Returns a list of actions that are used by this widget.
 * The structure of this method's return value is similar to
 * that returned by {@link CController::actions}.
 * 
 * When a widget uses several actions, you can declare these actions using
 * this method. The widget will then become an action provider, and the actions
 * can be easily imported into a controller.
 * 
 * Note, when creating URLs referring to the actions listed in this method,
 * make sure the action IDs are prefixed with {@link actionPrefix}.
 * 
 * @see actionPrefix
 * @see CController::actions
 * @since 1.0.1
 */
Yii.CWidget.prototype.actions = function () {
		return [];
	};
/**
 * Constructor.
 * @param {Yii.CBaseController} owner owner/creator of this widget. It could be either a widget or a controller.
 */
Yii.CWidget.prototype.construct = function (owner) {
		if (owner === undefined) {
			owner = null;
		}
		this._owner=owner===null?Yii.app().getController():owner;
	};
/**
 * Returns the owner/creator of this widget.
 * @returns {Yii.CBaseController} owner/creator of this widget. It could be either a widget or a controller.
 */
Yii.CWidget.prototype.getOwner = function () {
		return this._owner;
	};
/**
 * Returns the ID of the widget or generates a new one if requested.
 * @param {Boolean} autoGenerate whether to generate an ID if it is not set previously
 * @returns {String} id of the widget.
 */
Yii.CWidget.prototype.getId = function (autoGenerate) {
		var _counter;
		if (autoGenerate === undefined) {
			autoGenerate = true;
		}
		if(this._id!==null) {
			return this._id;
		}
		else if(autoGenerate) {
			return (this._id='yw'+Yii.CWidget.prototype._counter++);
		}
	};
/**
 * Sets the ID of the widget.
 * @param {String} value id of the widget.
 */
Yii.CWidget.prototype.setId = function (value) {
		this._id=value;
	};
/**
 * Returns the controller that this widget belongs to.
 * @returns {Yii.CController} the controller that this widget belongs to.
 */
Yii.CWidget.prototype.getController = function () {
		if(this._owner instanceof Yii.CController) {
			return this._owner;
		}
		else {
			return Yii.app().getController();
		}
	};
/**
 * Initializes the widget.
 * This method is called by {@link CBaseController::createWidget}
 * and {@link CBaseController::beginWidget} after the widget's
 * properties have been initialized.
 */
Yii.CWidget.prototype.init = function () {
	};
/**
 * Executes the widget.
 * This method is called by {@link CBaseController::endWidget}.
 */
Yii.CWidget.prototype.run = function () {
	};
/**
 * Returns the directory containing the view files for this widget.
 * The default implementation returns the 'views' subdirectory of the directory containing the widget class file.
 * If $checkTheme is set true, the directory "ThemeID/views/ClassName" will be returned when it exists.
 * @param {Boolean} checkTheme whether to check if the theme contains a view path for the widget.
 * @returns {String} the directory containing the view files for this widget.
 */
Yii.CWidget.prototype.getViewPath = function (checkTheme) {
		var className, _viewPaths, theme, path, viewFolder, pathParts;
		if (checkTheme === undefined) {
			checkTheme = false;
		}
		className=php.get_class(this);
		if(Yii.CWidget.prototype._viewPaths[className] !== undefined) {
			return Yii.CWidget.prototype._viewPaths[className];
		}
		else
		{
			if(checkTheme && (theme=Yii.app().getTheme())!==null) {
				path=theme.getViewPath()+"/";
				path+=className;
				return (Yii.CWidget.prototype._viewPaths[className]=path);
			}
			
			viewFolder = php.rtrim(Yii.app().getBasePath(),"/") + '/views/widgets/';
			return (Yii.CWidget.prototype._viewPaths[className]=viewFolder + className);
		}
	};
/**
 * Looks for the view script file according to the view name.
 * This method will look for the view under the widget's {@link getViewPath viewPath}.
 * The view script file is named as "ViewName.php". A localized view file
 * may be returned if internationalization is needed. See {@link CApplication::findLocalizedFile}
 * for more details.
 * Since version 1.0.2, the view name can also refer to a path alias
 * if it contains dot characters.
 * @param {String} viewName name of the view (without file extension)
 * @returns {String} the view file path. False if the view file does not exist
 * @see CApplication::findLocalizedFile
 */
Yii.CWidget.prototype.getViewFile = function (viewName) {
		var renderer, extension, viewFile;
		if((renderer=Yii.app().getViewRenderer())!==undefined) {
			extension=renderer.fileExtension;
		}
		else {
			extension='.js';
		}
		if(php.strpos(viewName,'.')) { // a path alias
			viewFile=Yii.getPathOfAlias(viewName);
		}
		else {
			viewFile=this.getViewPath(true)+'/'+viewName;
			return Yii.app().findLocalizedFile(viewFile+extension);
		
		}
		if(is_file(viewFile+extension)) {
			return Yii.app().findLocalizedFile(viewFile+extension);
		}
		else if(extension!=='.js' && is_file(viewFile+'.js')) {
			return Yii.app().findLocalizedFile(viewFile+'.js');
		}
		else {
			return false;
		}
	};
/**
 * Renders a view.
 * 
 * The named view refers to a PHP script (resolved via {@link getViewFile})
 * that is included by this method. If $data is an associative array,
 * it will be extracted as PHP variables and made available to the script.
 * 
 * @param {String} view name of the view to be rendered. See {@link getViewFile} for details
 * about how the view script is resolved.
 * @param {Array} data data to be extracted into PHP variables and made available to the view script
 * @param {Boolean} returnVar whether the rendering result should be returned instead of being displayed to end users
 * @returns {String} the rendering result. Null if the rendering result is not required.
 * @throws {Yii.CException} if the view does not exist
 * @see getViewFile
 */
Yii.CWidget.prototype.render = function (view, data, returnVar) {
		var viewFile;
		if (data === undefined) {
			data = null;
		}
		if (returnVar === undefined) {
			returnVar = false;
		}
		if((viewFile=this.getViewFile(view))!==false) {
			return this.renderFile(viewFile,data,returnVar);
		}
		else {
			throw new Yii.CException(Yii.t('yii','{widget} cannot find the view "{view}".',
				{'{widget}':php.get_class(this), '{view}':view}));
		}
	}