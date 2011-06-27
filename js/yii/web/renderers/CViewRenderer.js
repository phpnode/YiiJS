/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CViewRenderer is the base class for view renderer classes.
 * 
 * A view renderer is an application component that renders views written
 * in a customized syntax.
 * 
 * Once installing a view renderer as a 'viewRenderer' application component,
 * the normal view rendering process will be intercepted by the renderer.
 * The renderer will first parse the source view file and then render the
 * the resulting view file.
 * 
 * Parsing results are saved as temporary files that may be stored
 * under the application runtime directory or together with the source view file.
 * 
 * @originalAuthor Steve Heyns http://customgothic.com/
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CViewRenderer.php 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package system.web.renderers
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CApplicationComponent
 */
Yii.CViewRenderer = function CViewRenderer () {
};
Yii.CViewRenderer.prototype = new Yii.CApplicationComponent();
Yii.CViewRenderer.prototype.constructor =  Yii.CViewRenderer;

/**
 * @var {String} the extension name of the view file. Defaults to '.html'.
 * @since 1.0.9
 */
Yii.CViewRenderer.prototype.fileExtension = '.html';

/**
 * Renders a view file.
 * @param {Yii.CBaseController} context the controller or widget who is rendering the view file.
 * @param {String} sourceFile the view file path
 * @param {Mixed} data the data to be passed to the view
 * @param {Boolean} returnVar whether the rendering result should be returned
 * @returns {Mixed} the rendering result, or null if the rendering result is not needed.
 */
Yii.CViewRenderer.prototype.renderFile = function (context, sourceFile, data, returnVar) {
		var file, viewFile;
		
		viewFile=this.getViewFile(sourceFile);
		
		return context.renderInternal(viewFile,data,returnVar);
	};
/**
 * Generates the resulting view file path.
 * @param {String} file source view file path
 * @returns {String} resulting view file path
 */
Yii.CViewRenderer.prototype.getViewFile = function (file) {
		return file;
	};