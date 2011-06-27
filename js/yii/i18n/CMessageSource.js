/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CMessageSource is the base class for message translation repository classes.
 * 
 * A message source is an application component that provides message internationalization (i18n).
 * It stores messages translated in different languages and provides
 * these translated versions when requested.
 * 
 * A concrete class must implement {@link loadMessages} or override {@link translateMessage}.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CMessageSource.php 2798 2011-01-01 19:29:03Z qiang.xue $
 * @package system.i18n
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CApplicationComponent
 */
Yii.CMessageSource = function CMessageSource () {
	
};
Yii.CMessageSource.prototype = new Yii.CApplicationComponent();
Yii.CMessageSource.prototype.constructor =  Yii.CMessageSource;
/**
 * @var {Boolean} whether to force message translation when the source and target languages are the same.
 * Defaults to false, meaning translation is only performed when source and target languages are different.
 * @since 1.1.4
 */
Yii.CMessageSource.prototype.forceTranslation = false;
Yii.CMessageSource.prototype._language = null;
Yii.CMessageSource.prototype._messages = {};
/**
 * Loads the message translation for the specified language and category.
 * @param {String} category the message category
 * @param {String} language the target language
 * @returns {Object} the loaded messages
 */
Yii.CMessageSource.prototype.loadMessages = function (category, language) {
	};
/**
 * @returns {String} the language that the source messages are written in.
 * Defaults to {@link CApplication::language application language}.
 */
Yii.CMessageSource.prototype.getLanguage = function () {
		return this._language===null ? Yii.app().sourceLanguage : this._language;
	};
/**
 * @param {String} language the language that the source messages are written in.
 */
Yii.CMessageSource.prototype.setLanguage = function (language) {
		this._language=Yii.CLocale.prototype.getCanonicalID(language);
	};
/**
 * Translates a message to the specified language.
 * 
 * Note, if the specified language is the same as
 * the {@link getLanguage source message language}, messages will NOT be translated.
 * 
 * If the message is not found in the translations, an {@link onMissingTranslation}
 * event will be raised. Handlers can mark this message or do some
 * default handling. The {@link CMissingTranslationEvent::message}
 * property of the event parameter will be returned.
 * 
 * @param {String} category the message category
 * @param {String} message the message to be translated
 * @param {String} language the target language. If null (default), the {@link CApplication::getLanguage application language} will be used.
 * This parameter has been available since version 1.0.3.
 * @returns {String} the translated message (or the original message if translation is not needed)
 */
Yii.CMessageSource.prototype.translate = function (category, message, language) {
		if (language === undefined) {
			language = null;
		}
		if(language===null) {
			language=Yii.app().getLanguage();
		}
		if(this.forceTranslation || language!==this.getLanguage()) {
			return this.translateMessage(category,message,language);
		}
		else {
			return message;
		}
	};
/**
 * Translates the specified message.
 * If the message is not found, an {@link onMissingTranslation}
 * event will be raised.
 * @param {String} category the category that the message belongs to
 * @param {String} message the message to be translated
 * @param {String} language the target language
 * @returns {String} the translated message
 */
Yii.CMessageSource.prototype.translateMessage = function (category, message, language) {
		var key, event;
		key=language+'.'+category;
		if(this._messages[key] === undefined) {
			this._messages[key]=this.loadMessages(category,language);
		}
		if(this._messages[key][message] !== undefined && this._messages[key][message]!=='') {
			return this._messages[key][message];
		}
		else if(this.hasEventHandler('onMissingTranslation'))
		{
			event=new Yii.CMissingTranslationEvent(this,category,message,language);
			this.onMissingTranslation(event);
			return event.message;
		}
		else {
			return message;
		}
	};
/**
 * Raised when a message cannot be translated.
 * Handlers may log this message or do some default handling.
 * The {@link CMissingTranslationEvent::message} property
 * will be returned by {@link translateMessage}.
 * @param {Yii.CMissingTranslationEvent} event the event parameter
 */
Yii.CMessageSource.prototype.onMissingTranslation = function (event) {
		this.raiseEvent('onMissingTranslation',event);
	};