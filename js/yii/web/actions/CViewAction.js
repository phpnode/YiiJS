/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CViewAction represents an action that displays a view according to a user-specified parameter.
 * 
 * By default, the view being displayed is specified via the <code>view</code> GET parameter.
 * The name of the GET parameter can be customized via {@link viewParam}.
 * If the user doesn't provide the GET parameter, the default view specified by {@link defaultView}
 * will be displayed.
 * 
 * Users specify a view in the format of <code>path.to.view</code>, which translates to the view name
 * <code>BasePath/path/to/view</code> where <code>BasePath</code> is given by {@link basePath}.
 * 
 * Note, the user specified view can only contain word characters, dots and dashes and
 * the first letter must be a word letter.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CViewAction.php 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package system.web.actions
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CAction
 */
Yii.CViewAction = function CViewAction (controller, id) {
	if (controller !== false) {
		this.construct(controller, id);
	}
};
Yii.CViewAction.prototype = new Yii.CAction(false);
Yii.CViewAction.prototype.constructor =  Yii.CViewAction;
/**
 * @var {String} the name of the GET parameter that contains the requested view name. Defaults to 'view'.
 */
Yii.CViewAction.prototype.viewParam = 'view';
/**
 * @var {String} the name of the default view when {@link viewParam} GET parameter is not provided by user. Defaults to 'index'.
 * This should be in the format of 'path.to.view', similar to that given in
 * the GET parameter.
 * @see basePath
 */
Yii.CViewAction.prototype.defaultView = 'index';
/**
 * @var {String} the name of the view to be rendered. This property will be set
 * once the user requested view is resolved.
 */
Yii.CViewAction.prototype.view = null;
/**
 * @var {String} the base path for the views. Defaults to 'pages'.
 * The base path will be prefixed to any user-specified page view.
 * For example, if a user requests for <code>tutorial.chap1</code>, the corresponding view name will
 * be <code>pages/tutorial/chap1</code>, assuming the base path is <code>pages</code>.
 * The actual view file is determined by {@link CController::getViewFile}.
 * @see CController::getViewFile
 */
Yii.CViewAction.prototype.basePath = 'pages';
/**
 * @var {Mixed} the name of the layout to be applied to the views.
 * This will be assigned to {@link CController::layout} before the view is rendered.
 * Defaults to null, meaning the controller's layout will be used.
 * If false, no layout will be applied.
 */
Yii.CViewAction.prototype.layout = null;
/**
 * @var {Boolean} whether the view should be rendered as PHP script or static text. Defaults to false.
 */
Yii.CViewAction.prototype.renderAsText = false;
Yii.CViewAction.prototype._viewPath = null;
/**
 * Returns the name of the view requested by the user.
 * If the user doesn't specify any view, the {@link defaultView} will be returned.
 * @returns {String} the name of the view requested by the user.
 * This is in the format of 'path.to.view'.
 */
Yii.CViewAction.prototype.getRequestedView = function () {
		if(this._viewPath===null) {
			if(!php.empty(Yii.app().getRequest().params[this.viewParam])) {
				this._viewPath=Yii.app().getRequest().params[this.viewParam];
			}
			else {
				this._viewPath=this.defaultView;
			}
		}
		return this._viewPath;
	};
/**
 * Resolves the user-specified view into a valid view name.
 * @param {String} viewPath user-specified view in the format of 'path.to.view'.
 * @returns {String} fully resolved view in the format of 'path/to/view'.
 * @throw CHttpException if the user-specified view is invalid
 */
Yii.CViewAction.prototype.resolveView = function (viewPath) {
		var view;
		// start with a word char and have word chars, dots and dashes only
		if(/^\w[\w\.\-]*$/.exec(viewPath)) {
			view=php.strtr(viewPath,'.','/');
			if(!php.empty(this.basePath)) {
				view=this.basePath+'/'+view;
			}
			if(this.getController().getViewFile(view)!==false)	{
				this.view=view;
				return;
			}
		}
		throw new Yii.CHttpException(404,Yii.t('yii','The requested view "{name}" was not found.',
			{'{name}':viewPath}));
	};
/**
 * Runs the action.
 * This method displays the view requested by the user.
 * @throws {Yii.CHttpException} if the view is invalid
 */
Yii.CViewAction.prototype.run = function () {
		var controller, layout, event, text;
		this.resolveView(this.getRequestedView());
		controller=this.getController();
		
		if(this.layout!==null) {
			layout=controller.layout;
			controller.layout=this.layout;
		}
		
		this.onBeforeRender(event=new Yii.CEvent(this));
		if(!event.handled)	{
			if(this.renderAsText) {
				text=file_get_contents(controller.getViewFile(this.view));
				controller.renderText(text);
			}
			else {
				
				controller.render(this.view, {}, function(html) {
					jQuery("body").html(html);
				});
			}
			this.onAfterRender(new Yii.CEvent(this));
		}
		if(this.layout!==null) {
			controller.layout=layout;
		}
	};
/**
 * Raised right before the action invokes the render method.
 * Event handlers can set the {@link CEvent::handled} property
 * to be true to stop further view rendering.
 * @param {Yii.CEvent} event event parameter
 */
Yii.CViewAction.prototype.onBeforeRender = function (event) {
		this.raiseEvent('onBeforeRender',event);
	};
/**
 * Raised right after the action invokes the render method.
 * @param {Yii.CEvent} event event parameter
 */
Yii.CViewAction.prototype.onAfterRender = function (event) {
		this.raiseEvent('onAfterRender',event);
	};