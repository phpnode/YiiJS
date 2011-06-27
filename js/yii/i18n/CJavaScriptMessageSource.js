/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CJavaScriptMessageSource represents a message source that stores translated messages in JavaScript scripts.
 * 
 * CJavaScriptMessageSource uses JavaScript files and arrays to keep message translations.
 * <ul>
 * <li>All translations are saved under the {@link basePath} directory.</li>
 * <li>Translations in one language are kept as JavaScript files under an individual subdirectory
 *   whose name is the same as the language ID. Each JavaScript file contains messages
 *   belonging to the same category, and the file name is the same as the category name.</li>
 * <li>Within a JavaScript file, an object of (source, translation) pairs is returned.
 * For example:
 * <pre>
 * ({
 *     'original message 1' : 'translated message 1',
 *     'original message 2' : 'translated message 2'
 * });
 * </pre>
 * </li>
 * </ul>
 * When {@link cachingDuration} is set as a positive number, message translations will be cached.
 * 
 * Starting from version 1.0.10, messages for an extension class (e.g. a widget, a module) can be specially managed and used.
 * In particular, if a message belongs to an extension whose class name is Xyz, then the message category
 * can be specified in the format of 'Xyz.categoryName'. And the corresponding message file
 * is assumed to be 'BasePath/messages/LanguageID/categoryName.php', where 'BasePath' refers to
 * the directory that contains the extension class file. When using Yii.t() to translate an extension message,
 * the category name should be set as 'Xyz.categoryName'.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CJavaScriptMessageSource.php 2798 2011-01-01 19:29:03Z qiang.xue $
 * @package system.i18n
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CMessageSource
 */
Yii.CJavaScriptMessageSource = function CJavaScriptMessageSource () {
};
Yii.CJavaScriptMessageSource.prototype = new Yii.CMessageSource(false);
Yii.CJavaScriptMessageSource.prototype.constructor =  Yii.CJavaScriptMessageSource;
/**
 * @const
 */
Yii.CJavaScriptMessageSource.CACHE_KEY_PREFIX = 'Yii.CJavaScriptMessageSource.';
/**
 * @var {Integer} the time in seconds that the messages can remain valid in cache.
 * Defaults to 0, meaning the caching is disabled.
 */
Yii.CJavaScriptMessageSource.prototype.cachingDuration = 0;
/**
 * @var {String} the ID of the cache application component that is used to cache the messages.
 * Defaults to 'cache' which refers to the primary cache application component.
 * Set this property to false if you want to disable caching the messages.
 * @since 1.0.10
 */
Yii.CJavaScriptMessageSource.prototype.cacheID = 'cache';
/**
 * @var {String} the base path for all translated messages. Defaults to null, meaning
 * the "messages" subdirectory of the application directory (e.g. "protected/messages").
 */
Yii.CJavaScriptMessageSource.prototype.basePath = null;
Yii.CJavaScriptMessageSource.prototype._files = {};
/**
 * Initializes the application component.
 * This method overrides the parent implementation by preprocessing
 * the user request data.
 */
Yii.CJavaScriptMessageSource.prototype.init = function () {
		Yii.CMessageSource.prototype.init.call(this);
		if(this.basePath===null) {
			this.basePath=Yii.getPathOfAlias('application.messages');
		}
	};
/**
 * Determines the message file name based on the given category and language.
 * If the category name contains a dot, it will be split into the module class name and the category name.
 * In this case, the message file will be assumed to be located within the 'messages' subdirectory of
 * the directory containing the module class file.
 * Otherwise, the message file is assumed to be under the {@link basePath}.
 * @param {String} category category name
 * @param {String} language language ID
 * @returns {String} the message file path
 * @since 1.0.10
 */
Yii.CJavaScriptMessageSource.prototype.getMessageFile = function (category, language) {
		var pos, moduleClass, moduleCategory, classVar;
		if (this._files[category] === undefined) {
			this._files[category] = {};
		}
		if(this._files[category][language] === undefined) {
			
			if((pos=php.strpos(category,'.'))!==false) {
				moduleClass=category.slice(0, pos);
				moduleCategory=category.slice(pos+1);
				this._files[category][language]=Yii.getPathOfAlias(moduleClass + ".messages." + moduleCategory) + ".js";
			}
			else {
				this._files[category][language]=this.basePath+'/'+language+'/'+category+'.js';
			}
		}
		return this._files[category][language];
	};
/**
 * Loads the message translation for the specified language and category.
 * @param {String} category the message category
 * @param {String} language the target language
 * @returns {Object} the loaded messages
 */
Yii.CJavaScriptMessageSource.prototype.loadMessages = function (category, language) {
		var messageFile, cache, key, data, messages, dependency;
		messageFile=this.getMessageFile(category,language);
		if(this.cachingDuration>0 && this.cacheID!==false && (cache=Yii.app().getComponent(this.cacheID))!==null) {
			key=this.Yii.CACHE_KEY_PREFIX + messageFile;
			if((data=cache.get(key))!==false) {
				if (!data instanceof "Object") {
					data = Yii.CJSON.decode(data);
				}
				return data;
			}
		}
		try {
			data = Yii.include(messageFile, false);
			if (data === false) {
				return {};
			}
			if (this.cachingDuration > 0 && this.cacheID !== false && (cache=Yii.app().getComponent(this.cacheID))!==null) {
				key=this.Yii.CACHE_KEY_PREFIX + messageFile;
				cache.set(key, data, this.cachingDuration);
			}
			return data;
		}
		catch (e) {
			return {};
		}
	};