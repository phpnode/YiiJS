/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CMustacheViewRenderer allows mustache templates to be used as views.
 * 
 * @package system.web.renderers
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CViewRenderer
 */
Yii.CMustacheViewRenderer = function CMustacheViewRenderer () {
};
Yii.CMustacheViewRenderer.prototype = new Yii.CViewRenderer();
Yii.CMustacheViewRenderer.prototype.constructor =  Yii.CMustacheViewRenderer;
Yii.CMustacheViewRenderer.prototype._templates = {};
/**
 * @var {String} the extension name of the view file. Defaults to '.tpl'.
 * @since 1.0.9
 */
Yii.CMustacheViewRenderer.prototype.fileExtension = '.tpl';

/**
 * Renders a view file.
 * @param {Yii.CBaseController} context the controller or widget who is rendering the view file.
 * @param {String} sourceFile the view file path
 * @param {Mixed} data the data to be passed to the view
 * @param {Boolean} returnVar whether the rendering result should be returned
 * @returns {Mixed} the rendering result, or null if the rendering result is not needed.
 */
Yii.CMustacheViewRenderer.prototype.renderFile = function (context, sourceFile, data, returnVar) {
		var file, viewFile, i;
		console.log(arguments);
		if (data === undefined) {
			data = {};
		}
		viewFile=this.getViewFile(sourceFile);
		if (this._templates[viewFile] === undefined) {
			Yii.beginProfile("Loading Template: "+ viewFile);
			this._templates[viewFile] = Yii.app().ajax.get({
				url: viewFile,
				cache:YII_DEBUG ? false : true,
				async: false
			}).responseText;
			Yii.endProfile("Loading Template: "+ viewFile);
		}
		
		if (returnVar) {
			return Mustache.to_html(this._templates[viewFile],data);	
		}
		else {
			return $("body").html(Mustache.to_html(this._templates[viewFile],data));
		}
		
	};
/**
 * Generates the resulting view file path.
 * @param {String} file source view file path
 * @returns {String} resulting view file path
 */
Yii.CMustacheViewRenderer.prototype.getViewFile = function (file) {
		return file;
	};