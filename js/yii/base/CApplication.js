/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CApplication is the base class for all application classes.
 * 
 * An application serves as the global context that the user request
 * is being processed. It manages a set of application components that
 * provide specific functionalities to the whole application.
 * 
 * The core application components provided by CApplication are the following:
 * <ul>
 * <li>{@link getErrorHandler errorHandler}: handles JavaScript errors and
 *   uncaught exceptions. This application component is dynamically loaded when needed.</li>
 * <li>{@link getSecurityManager securityManager}: provides security-related
 *   services, such as hashing, encryption. This application component is dynamically
 *   loaded when needed.</li>
 * <li>{@link getStatePersister statePersister}: provides global state
 *   persistence method. This application component is dynamically loaded when needed.</li>
 * <li>{@link getCache cache}: provides caching feature. This application component is
 *   disabled by default.</li>
 * <li>{@link getMessages messages}: provides the message source for translating
 *   application messages. This application component is dynamically loaded when needed.</li>
 * <li>{@link getCoreMessages coreMessages}: provides the message source for translating
 *   Yii framework messages. This application component is dynamically loaded when needed.</li>
 * </ul>
 * 
 * CApplication will undergo the following lifecycles when processing a user request:
 * <ol>
 * <li>load application configuration;</li>
 * <li>set up class autoloader and error handling;</li>
 * <li>load static application components;</li>
 * <li>{@link onBeginRequest}: preprocess the user request;</li>
 * <li>{@link processRequest}: process the user request;</li>
 * <li>{@link onEndRequest}: postprocess the user request;</li>
 * </ol>
 * 
 * Starting from lifecycle 3, if a JavaScript error or an uncaught exception occurs,
 * the application will switch to its error handling logic and jump to step 6 afterwards.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CApplication.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.base
 * @since 1.0
 * 
 * @property string $basePath Returns the root path of the application.
 * @property CCache $cache Returns the cache component.
 * @property CPhpMessageSource $coreMessages Returns the core message translations.
 * @property CDateFormatter $dateFormatter Returns the locale-dependent date formatter.
 * @property CDbConnection $db Returns the database connection component.
 * @property CErrorHandler $errorHandler Returns the error handler component.
 * @property string $extensionPath Returns the root directory that holds all third-party extensions.
 * @property string $id Returns the unique identifier for the application.
 * @property string $language Returns the language that the user is using and the application should be targeted to.
 * @property CLocale $locale Returns the locale instance.
 * @property string $localeDataPath Returns the directory that contains the locale data.
 * @property CMessageSource $messages Returns the application message translations component.
 * @property CNumberFormatter $numberFormatter The locale-dependent number formatter.
 * @property CHttpRequest $request Returns the request component.
 * @property string $runtimePath Returns the directory that stores runtime files.
 * @property CSecurityManager $securityManager Returns the security manager component.
 * @property CStatePersister $statePersister Returns the state persister component.
 * @property string $timeZone Returns the time zone used by this application.
 * @property CUrlManager $urlManager Returns the URL manager component.
 * @author Charles Pick
 * @class
 * @extends Yii.CModule
 */
Yii.CApplication = function CApplication (config) {
	if (config !== false) {
		this.construct(config);
	}
};
Yii.CApplication.prototype = new Yii.CModule(false);
Yii.CApplication.prototype.constructor =  Yii.CApplication;
/**
 * @var {String} the application name. Defaults to 'My Application'.
 */
Yii.CApplication.prototype.name = 'My Application';
/**
 * @var {String} the charset currently used for the application. Defaults to 'UTF-8'.
 */
Yii.CApplication.prototype.charset = 'UTF-8';
/**
 * @var {String} the language that the application is written in. This mainly refers to
 * the language that the messages and view files are in. Defaults to 'en_us' (US English).
 */
Yii.CApplication.prototype.sourceLanguage = 'en_us';
Yii.CApplication.prototype._id = null;
Yii.CApplication.prototype._basePath = null;
Yii.CApplication.prototype._runtimePath = null;
Yii.CApplication.prototype._extensionPath = null;
Yii.CApplication.prototype._globalState = null;
Yii.CApplication.prototype._stateChanged = null;
Yii.CApplication.prototype._ended = false;
Yii.CApplication.prototype._language = null;
Yii.CApplication.prototype._timezone = null;
/**
 * Processes the request.
 * This is the place where the actual request processing work is done.
 * Derived classes should override this method.
 */
Yii.CApplication.prototype.processRequest = function () {
	};
/**
 * Constructor.
 * @param {Mixed} config application configuration.
 * If a string, it is treated as the path of the file that contains the configuration;
 * If an array, it is the actual configuration information.
 * Please make sure you specify the {@link getBasePath basePath} property in the configuration,
 * which should point to the directory containing all application logic, template and data.
 * If not, the directory will be defaulted to 'protected'.
 */
Yii.CApplication.prototype.construct = function (config) {
		if (config === undefined) {
			config = {};
		}
		Yii.setApplication(this);
		
		// set basePath at early as possible to avoid trouble
		
		if(config.basePath !== undefined) {
			this.setBasePath(config.basePath);
			delete config.basePath;
		}
		else {
			this.setBasePath('protected');
		}
		Yii.setPathOfAlias('application',this.getBasePath());
		Yii.setPathOfAlias('webroot',location.protocol + "//" + location.hostname + "/");
		Yii.setPathOfAlias('ext',this.getBasePath()+'/'+'extensions');
		this.preinit();
		
		this.initSystemHandlers();
		this.registerCoreComponents();
		this.configure(config);
		this.attachBehaviors(this.behaviors);
		this.preloadComponents();
		this.init();
	};
/**
 * Runs the application.
 * This method loads static application components. Derived classes usually overrides this
 * method to do more application-specific tasks.
 * Remember to call the parent implementation so that static application components are loaded.
 */
Yii.CApplication.prototype.run = function () {
		try {
			if(this.hasEventHandler('onBeginRequest')) {
				this.onBeginRequest(new Yii.CEvent(this));
			}
			Yii.beginProfile("Request");
			this.processRequest();
			Yii.endProfile("Request");
			if(this.hasEventHandler('onEndRequest')) {
				this.onEndRequest(new Yii.CEvent(this));
			}
		}
		catch (e) {
			if (e instanceof TypeError) {
				this.displayError("TypeError",e);
			}
			else if (e instanceof Yii.CException) {
				this.displayException(e);
			}
			else {
				this.displayError("Error",e);
			}
		}
	};
/**
 * Terminates the application.
 * This method replaces JavaScript's exit() function by calling
 * {@link onEndRequest} before exiting.
 * @param {Integer} status exit status (value 0 means normal exit while other values mean abnormal exit).
 * @param {Boolean} exit whether to exit the current request. This parameter has been available since version 1.1.5.
 * It defaults to true, meaning the JavaScript's exit() function will be called at the end of this method.
 */
Yii.CApplication.prototype.end = function (status, exit) {
		if (status === undefined) {
			status = 0;
		}
		if (exit === undefined) {
			exit = true;
		}
		if(this.hasEventHandler('onEndRequest')) {
			this.onEndRequest(new Yii.CEvent(this));
		}
		if(exit) {
			exit(status);
		}
	};
/**
 * Raised right BEFORE the application processes the request.
 * @param {Yii.CEvent} event the event parameter
 */
Yii.CApplication.prototype.onBeginRequest = function (event) {
		this.raiseEvent('onBeginRequest',event);
	};
/**
 * Raised right AFTER the application processes the request.
 * @param {Yii.CEvent} event the event parameter
 */
Yii.CApplication.prototype.onEndRequest = function (event) {
		if(!this._ended) {
			this._ended=true;
			this.raiseEvent('onEndRequest',event);
		}
	};
/**
 * Returns the unique identifier for the application.
 * @returns {String} the unique identifier for the application.
 */
Yii.CApplication.prototype.getId = function () {
		if(this._id!==null) {
			return this._id;
		}
		else {
			return (this._id=php.sprintf('%x',php.crc32(this.getBasePath()+this.name)));
		}
	};
/**
 * Sets the unique identifier for the application.
 * @param {String} id the unique identifier for the application.
 */
Yii.CApplication.prototype.setId = function (id) {
		this._id=id;
	};
/**
 * Returns the root path of the application.
 * @returns {String} the root directory of the application. Defaults to 'protected'.
 */
Yii.CApplication.prototype.getBasePath = function () {
		return this._basePath;
	};
/**
 * Sets the root directory of the application.
 * This method can only be invoked at the begin of the constructor.
 * @param {String} path the root directory of the application.
 */
Yii.CApplication.prototype.setBasePath = function (path) {
		this._basePath = path;
	};
/**
 * Returns the directory that stores runtime files.
 * @returns {String} the directory that stores runtime files. Defaults to 'protected/runtime'.
 */
Yii.CApplication.prototype.getRuntimePath = function () {
		if(this._runtimePath!==null) {
			return this._runtimePath;
		}
		else
		{
			this.setRuntimePath(this.getBasePath()+"/runtime");
			return this._runtimePath;
		}
	};
/**
 * Sets the directory that stores runtime files.
 * @param {String} path the directory that stores runtime files.
 */
Yii.CApplication.prototype.setRuntimePath = function (path) {
		this._runtimePath= path;
	};
/**
 * Returns the root directory that holds all third-party extensions.
 * @returns {String} the directory that contains all extensions. Defaults to the 'extensions' directory under 'protected'.
 */
Yii.CApplication.prototype.getExtensionPath = function () {
		return Yii.getPathOfAlias('ext');
	};
/**
 * Sets the root directory that holds all third-party extensions.
 * @param {String} path the directory that contains all third-party extensions.
 */
Yii.CApplication.prototype.setExtensionPath = function (path) {
		Yii.setPathOfAlias('ext',path);
	};
/**
 * Returns the language that the user is using and the application should be targeted to.
 * @returns {String} the language that the user is using and the application should be targeted to.
 * Defaults to the {@link sourceLanguage source language}.
 */
Yii.CApplication.prototype.getLanguage = function () {
		return this._language===null ? this.sourceLanguage : this._language;
	};
/**
 * Specifies which language the application is targeted to.
 * 
 * This is the language that the application displays to end users.
 * If set null, it uses the {@link sourceLanguage source language}.
 * 
 * Unless your application needs to support multiple languages, you should always
 * set this language to null to maximize the application's performance.
 * @param {String} language the user language (e.g. 'en_US', 'zh_CN').
 * If it is null, the {@link sourceLanguage} will be used.
 */
Yii.CApplication.prototype.setLanguage = function (language) {
		this._language=language;
	};
/**
 * Returns the time zone used by this application.
 * @returns {String} the time zone used by this application.
 * @see http://php.net/manual/en/function.date-default-timezone-get.php
 * @since 1.0.9
 */
Yii.CApplication.prototype.getTimeZone = function () {
		if (this._timezone === null) {
			this._timezone = jzTimezoneDetector.determine_timezone().timezone.olson_tz;
		}
		return this._timezone;
	};
/**
 * Sets the time zone used by this application.
 * This is a simple wrapper of JavaScript function date_default_timezone_set().
 * @param {String} value the time zone used by this application.
 * @see http://php.net/manual/en/function.date-default-timezone-set.php
 * @since 1.0.9
 */
Yii.CApplication.prototype.setTimeZone = function (value) {
		this._timezone = value;
	};
/**
 * Returns the localized version of a specified file.
 * 
 * The searching is based on the specified language code. In particular,
 * a file with the same name will be looked for under the subdirectory
 * named as the locale ID. For example, given the file "path/to/view.php"
 * and locale ID "zh_cn", the localized file will be looked for as
 * "path/to/zh_cn/view.php". If the file is not found, the original file
 * will be returned.
 * 
 * For consistency, it is recommended that the locale ID is given
 * in lower case and in the format of LanguageID_RegionID (e.g. "en_us").
 * 
 * @param {String} srcFile the original file
 * @param {String} srcLanguage the language that the original file is in. If null, the application {@link sourceLanguage source language} is used.
 * @param {String} language the desired language that the file should be localized to. If null, the {@link getLanguage application language} will be used.
 * @returns {String} the matching localized file. The original file is returned if no localized version is found
 * or if source language is the same as the desired language.
 */
Yii.CApplication.prototype.findLocalizedFile = function (srcFile, srcLanguage, language) {
		var desiredFile;
		if (srcLanguage === undefined) {
			srcLanguage = null;
		}
		if (language === undefined) {
			language = null;
		}
		if(srcLanguage===null) {
			srcLanguage=this.sourceLanguage;
		}
		if(language===null) {
			language=this.getLanguage();
		}
		if(language===srcLanguage) {
			return srcFile;
		}
		
		// TODO: fix this and determine how to deal with localized files
		return srcFile;
		//desiredFile=php.dirname(srcFile)+DIRECTORY_SEPARATOR+language+DIRECTORY_SEPARATOR+php.basename(srcFile);
		//return is_file(desiredFile) ? desiredFile : srcFile;
	};
/**
 * Returns the locale instance.
 * @param {String} localeID the locale ID (e.g. en_US). If null, the {@link getLanguage application language ID} will be used.
 * @returns {Yii.CLocale} the locale instance
 */
Yii.CApplication.prototype.getLocale = function (localeID) {
		if (localeID === undefined) {
			localeID = null;
		}
		return Yii.CLocale.getInstance(localeID===null?this.getLanguage():localeID);
	};
/**
 * Returns the directory that contains the locale data.
 * @returns {String} the directory that contains the locale data. It defaults to 'framework/i18n/data'.
 * @since 1.1.0
 */
Yii.CApplication.prototype.getLocaleDataPath = function () {
		var dataPath;
		return Yii.CLocale.dataPath===null ? Yii.getPathOfAlias('system.i18n.data') : Yii.CLocale.dataPath;
	};
/**
 * Sets the directory that contains the locale data.
 * @param {String} value the directory that contains the locale data.
 * @since 1.1.0
 */
Yii.CApplication.prototype.setLocaleDataPath = function (value) {
		var dataPath;
		Yii.CLocale.dataPath=value;
	};
/**
 * @returns {Yii.CNumberFormatter} the locale-dependent number formatter.
 * The current {@link getLocale application locale} will be used.
 */
Yii.CApplication.prototype.getNumberFormatter = function () {
		return this.getLocale().getNumberFormatter();
	};
/**
 * Returns the locale-dependent date formatter.
 * @returns {Yii.CDateFormatter} the locale-dependent date formatter.
 * The current {@link getLocale application locale} will be used.
 */
Yii.CApplication.prototype.getDateFormatter = function () {
		return this.getLocale().getDateFormatter();
	};
/**
 * Returns the database connection component.
 * @returns {Yii.CDbConnection} the database connection
 */
Yii.CApplication.prototype.getDb = function () {
		return this.getComponent('db');
	};
/**
 * Returns the error handler component.
 * @returns {Yii.CErrorHandler} the error handler application component.
 */
Yii.CApplication.prototype.getErrorHandler = function () {
		return this.getComponent('errorHandler');
	};
/**
 * Returns the security manager component.
 * @returns {Yii.CSecurityManager} the security manager application component.
 */
Yii.CApplication.prototype.getSecurityManager = function () {
		return this.getComponent('securityManager');
	};
/**
 * Returns the state persister component.
 * @returns {Yii.CStatePersister} the state persister application component.
 */
Yii.CApplication.prototype.getStatePersister = function () {
		return this.getComponent('statePersister');
	};
/**
 * Returns the cache component.
 * @returns {Yii.CCache} the cache application component. Null if the component is not enabled.
 */
Yii.CApplication.prototype.getCache = function () {
		return this.getComponent('cache');
	};
/**
 * Returns the core message translations component.
 * @returns {Yii.CPhpMessageSource} the core message translations
 */
Yii.CApplication.prototype.getCoreMessages = function () {
		return this.getComponent('coreMessages');
	};
/**
 * Returns the application message translations component.
 * @returns {Yii.CMessageSource} the application message translations
 */
Yii.CApplication.prototype.getMessages = function () {
		return this.getComponent('messages');
	};
/**
 * Returns the request component.
 * @returns {Yii.CHttpRequest} the request component
 */
Yii.CApplication.prototype.getRequest = function () {
		return this.getComponent('request');
	};
/**
 * Returns the URL manager component.
 * @returns {Yii.CUrlManager} the URL manager component
 */
Yii.CApplication.prototype.getUrlManager = function () {
		return this.getComponent('urlManager');
	};
/**
 * Returns a global value.
 * 
 * A global value is one that is persistent across users sessions and requests.
 * @param {String} key the name of the value to be returned
 * @param {Mixed} defaultValue the default value. If the named global value is not found, this will be returned instead.
 * @returns {Mixed} the named global value
 * @see setGlobalState
 */
Yii.CApplication.prototype.getGlobalState = function (key, defaultValue) {
		if (defaultValue === undefined) {
			defaultValue = null;
		}
		if(this._globalState===null) {
			
			this.loadGlobalState();
		}
		if(this._globalState[key] !== undefined) {
			return this._globalState[key];
		}
		else {
			return defaultValue;
		}
	};
/**
 * Sets a global value.
 * 
 * A global value is one that is persistent across users sessions and requests.
 * Make sure that the value is serializable and unserializable.
 * @param {String} key the name of the value to be saved
 * @param {Mixed} value the global value to be saved. It must be serializable.
 * @param {Mixed} defaultValue the default value. If the named global value is the same as this value, it will be cleared from the current storage.
 * @see getGlobalState
 */
Yii.CApplication.prototype.setGlobalState = function (key, value, defaultValue) {
		var changed;
		if (defaultValue === undefined) {
			defaultValue = null;
		}
		if(this._globalState===null) {
			this.loadGlobalState();
		}
		changed=this._stateChanged;
		if(value===defaultValue) {
			if(this._globalState[key] !== undefined) {
				delete this._globalState[key];
				this._stateChanged=true;
			}
		}
		else if(this._globalState[key] === undefined || this._globalState[key]!==value) {
			this._globalState[key]=value;
			this._stateChanged=true;
		}
		if(this._stateChanged!==changed) {
			this.saveGlobalState();
		}
	};
/**
 * Clears a global value.
 * 
 * The value cleared will no longer be available in this request and the following requests.
 * @param {String} key the name of the value to be cleared
 */
Yii.CApplication.prototype.clearGlobalState = function (key) {
		this.setGlobalState(key,true,true);
	};
/**
 * Loads the global state data from persistent storage.
 * @see getStatePersister
 * @throws {Yii.CException} if the state persister is not available
 */
Yii.CApplication.prototype.loadGlobalState = function () {
		var persister;
		persister=this.getStatePersister();
		if((this._globalState=persister.load())===null) {
			this._globalState={};
		}
		this._stateChanged=false;
	};
/**
 * Saves the global state data into persistent storage.
 * @see getStatePersister
 * @throws {Yii.CException} if the state persister is not available
 */
Yii.CApplication.prototype.saveGlobalState = function () {
		if(this._stateChanged) {
			this._stateChanged=false;
			this.getStatePersister().save(this._globalState);
		}
	};
/**
 * Handles uncaught JavaScript exceptions.
 * 
 * This method is implemented as a JavaScript exception handler. It requires
 * that constant YII_ENABLE_EXCEPTION_HANDLER be defined true.
 * 
 * This method will first raise an {@link onException} event.
 * If the exception is not handled by any event handler, it will call
 * {@link getErrorHandler errorHandler} to process the exception.
 * 
 * The application will be terminated by this method.
 * 
 * @param {Exception} exception exception that is not caught
 */
Yii.CApplication.prototype.handleException = function (exception) {
		var category, message, event, handler, msg;
		// disable error capturing to avoid recursive errors
		
		category='exception.'+php.get_class(exception);
		if(exception instanceof Yii.CHttpException) {
			category+='.'+exception.statusCode;
		}
		message=exception.message;
		
		Yii.log(message,Yii.CLogger.LEVEL_ERROR,category);
		try
		{
			event=new Yii.CExceptionEvent(this,exception);
			this.onException(event);
			if(!event.handled) {
				// try an error handler
				if((handler=this.getErrorHandler())!==null) {
					handler.handle(event);
				}
				else {
					this.displayException(exception);
				}
			}
		}
		catch(e) {
			this.displayException(e);
		}
		try
		{
			this.end(1);
			return;
		}
		catch(e) {
			// use the most primitive way to log error
			msg = php.get_class(e)+': '+e.message+"\n";
			msg += e.getTraceAsString()+"\n";
			msg += "Previous exception:\n";
			msg += php.get_class(exception)+': '+exception.message+"\n";
			msg += exception.getTraceAsString()+"\n";
			console.log(msg);
			return;
		}
	};
/**
 * Handles JavaScript execution errors such as warnings, notices.
 * 
 * This method is implemented as a JavaScript error handler. It requires
 * that constant YII_ENABLE_ERROR_HANDLER be defined true.
 * 
 * This method will first raise an {@link onError} event.
 * If the error is not handled by any event handler, it will call
 * {@link getErrorHandler errorHandler} to process the error.
 * 
 * The application will be terminated by this method.
 * 
 * @param {Integer} code the level of the error raised
 * @param {String} message the error message
 * @param {String} file the filename that the error was raised in
 * @param {Integer} line the line number the error was raised at
 */
Yii.CApplication.prototype.handleError = function (code, message, file, line) {
		var log = "", trace, t, i, event, handler, msg;
		if(code) {
			log="message (" + file + ":" + line + ")\nStack trace:\n";
			trace=Yii.CException.prototype.stacktrace();
			// skip the first 3 stacks as they do not tell the error position
			if(php.count(trace)>3) {
				trace=php.array_slice(trace,3);
			}
			for (i in trace) {
				if (trace.hasOwnProperty(i)) {
					t = trace[i];
					if(t.file === undefined) {
						t.file='unknown';
					}
					if(t.line === undefined) {
						t.line=0;
					}
					if(t['function'] === undefined) {
						t['function']='unknown';
					}
					log+="#i " + t.file + "(" + t.line + "): ";
					if(t.object !== undefined && (!t.object instanceof Array && t.object !== null && typeof(t.object) === 'object')) {
						log+=php.get_class(t.object)+'.';
					}
					log+= t['function'] + "()\n";
				}
			}
			Yii.log(log, Yii.CLogger.prototype.LEVEL_ERROR, "js");
			try {
				event = new Yii.CErrorEvent(this, code, message, file, line);
				this.onError(event);
				if (!event.handled) {
					// try an error handler
					handler = this.getErrorHandler();
					if (handler !== null) {
						handler.handle(event);
					}
					else {
						this.displayError(code, message, file, line);
					}
				}
			}
			catch (e) {
				this.displayException(e);
			}
			
			try {
				this.end(1);
			}
			catch(e) {
				// use the most primitive way to log error
				msg = php.get_class(e)+': '+e.message+"\n";
				msg += e.getTraceAsString()+"\n";
				msg += "Previous error:\n";
				msg += log + "\n";
				console.log(msg);
				return;
			}
		}			
	};
/**
 * Raised when an uncaught JavaScript exception occurs.
 * 
 * An event handler can set the {@link CExceptionEvent::handled handled}
 * property of the event parameter to be true to indicate no further error
 * handling is needed. Otherwise, the {@link getErrorHandler errorHandler}
 * application component will continue processing the error.
 * 
 * @param {Yii.CExceptionEvent} event event parameter
 */
Yii.CApplication.prototype.onException = function (event) {
		this.raiseEvent('onException',event);
	};
/**
 * Raised when a JavaScript execution error occurs.
 * 
 * An event handler can set the {@link CErrorEvent::handled handled}
 * property of the event parameter to be true to indicate no further error
 * handling is needed. Otherwise, the {@link getErrorHandler errorHandler}
 * application component will continue processing the error.
 * 
 * @param {Yii.CErrorEvent} event event parameter
 */
Yii.CApplication.prototype.onError = function (event) {
		this.raiseEvent('onError',event);
	};
/**
 * Displays the captured JavaScript error.
 * This method displays the error in HTML when there is
 * no active error handler.
 * @param {Integer} code error code
 * @param {String} message error message
 * @param {String} file error file
 * @param {String} line error line
 */
Yii.CApplication.prototype.displayError = function (code, message, file, line) {
		var trace, t, i;
		if(YII_DEBUG) {
			document.write("<h1>JavaScript Error [" + code + "]</h1>\n");
			document.write("<p>" + message + "(" + file + ":" + line + ")</p>\n");
			document.write('<table class="yiiLog" width="100%" cellpadding="2" style="border-spacing:1px;font:11px Verdana, Arial, Helvetica, sans-serif;background:#EEEEEE;color:#666666;">');
			document.write('<tr style="background-color:#ccc;">');
			document.write("<th style='width:120px'>Timestamp</th>");
			document.write("<th>Level</th>");
			document.write("<th>Category</th>");
			document.write("<th>Message</th>");
			document.write("</tr>");
			Yii.forEach(Yii._logger.getLogs(), function (i, log) {
				document.write("<tr><td>" + php.date('H:i:s.',log[3]) + php.sprintf('%06d',Number((log[3]-Number(log[3]))*1000000)) + "</td><td>" + log[1] + "</td><td>" + log[2] + "</td><td>" + log[0] + "</td></tr>");				
			});
			document.write("</table>");
			document.write("<h2>Stack Trace</h2>");
			document.write('<pre>');
			trace=Yii.CException.prototype.stacktrace();
			// skip the first 3 stacks as they do not tell the error position
			if(php.count(trace)>3) {
				trace=php.array_slice(trace,3);
			}
			for (i in trace) {
				if (trace.hasOwnProperty(i)) {
					document.write(trace[i] + "\n");
				}
			}
			document.write("</pre>");
		}
		else {
			document.write("<h1>JavaScript Error [" + code + "]</h1>\n");
			document.write("<p>" + message + "</p>\n");
		}
	};
/**
 * Displays the uncaught JavaScript exception.
 * This method displays the exception in HTML when there is
 * no active error handler.
 * @param {Exception} exception the uncaught exception
 */
Yii.CApplication.prototype.displayException = function (exception) {
		if(YII_DEBUG) {
			document.write('<h1>'+php.get_class(exception)+"</h1>\n");
			document.write('<p>'+exception.getMessage()+'</p>');
			document.write('<pre>'+exception.getTraceAsString()+'</pre>');
		}
		else
		{
			document.write('<h1>'+php.get_class(exception)+"</h1>\n");
			document.write('<p>'+exception.getMessage()+'</p>');
		}
	};
/**
 * Initializes the class autoloader and error handlers.
 */
Yii.CApplication.prototype.initSystemHandlers = function () {
	return;
	window.onerror = function (err, loc) {
		Yii.app().displayError("",err);
		return false;
	};
};
/**
 * Registers the core application components.
 * @see setComponents
 */
Yii.CApplication.prototype.registerCoreComponents = function () {
		var components;
		components={
			'coreMessages':{
				'class':'CJavaScriptMessageSource',
				'language':'en_us',
				'basePath':YII_PATH + '/messages'
			},
			'db':{
				'class':'CDbConnection'
			},
			'messages':{
				'class':'CJavaScriptMessageSource'
			},
			'errorHandler':{
				'class':'CErrorHandler'
			},
			'securityManager':{
				'class':'CSecurityManager'
			},
			'statePersister':{
				'class':'CStatePersister'
			},
			'urlManager':{
				'class':'CUrlManager'
			},
			'request':{
				'class':'CHttpRequest'
			},
			'format':{
				'class':'CFormatter'
			}
		};
		this.setComponents(components);
};