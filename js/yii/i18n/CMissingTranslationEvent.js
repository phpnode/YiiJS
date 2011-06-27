/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CMissingTranslationEvent represents the parameter for the {@link CMessageSource::onMissingTranslation onMissingTranslation} event.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CMessageSource.php 2798 2011-01-01 19:29:03Z qiang.xue $
 * @package system.i18n
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CEvent
 */
Yii.CMissingTranslationEvent = function CMissingTranslationEvent (sender, params) {
	if (sender !== false) {
		this.construct(sender, params);
	}
};
Yii.CMissingTranslationEvent.prototype = new Yii.CEvent(false);
Yii.CMissingTranslationEvent.prototype.constructor =  Yii.CMissingTranslationEvent;
/**
 * @var {String} the message to be translated
 */
Yii.CMissingTranslationEvent.prototype.message = null;
/**
 * @var {String} the category that the message belongs to
 */
Yii.CMissingTranslationEvent.prototype.category = null;
/**
 * @var {String} the ID of the language that the message is to be translated to
 */
Yii.CMissingTranslationEvent.prototype.language = null;
/**
 * Constructor.
 * @param {Mixed} sender sender of this event
 * @param {String} category the category that the message belongs to
 * @param {String} message the message to be translated
 * @param {String} language the ID of the language that the message is to be translated to
 */
Yii.CMissingTranslationEvent.prototype.construct = function (sender, category, message, language) {
		Yii.CEvent.prototype.construct.call(this, sender);
		this.message=message;
		this.category=category;
		this.language=language;
	};