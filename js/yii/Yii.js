/*global php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * Yii is a helper class serving common framework functionalities.
 * 
 * It encapsulates {@link YiiBase} which provides the actual implementation.
 * By writing your own Yii class, you can customize some functionalities of YiiBase.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: yii.js 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package system
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.YiiBase
 */
var YII_DEBUG = true, YII_TRACE_LEVEL = 3, YII_BEGIN_TIME = new Date().getTime() / 1000, Yii = /** @lends Yii.prototype */{
	/**	
	 * @property {Array} class map used by the Yii autoloading mechanism.
	 * The array keys are the class names and the array values are the corresponding class file paths.
	 * @since 1.1.5
	 */
	classMap: {},
	_aliases: {},
	_imports: {},
	_includePaths: {},
	_app: null,
	_logger: null,
	/**	
	 * @property {Array} class map for core Yii classes.
	 * NOTE, DO NOT MODIFY THIS ARRAY MANUALLY. IF YOU CHANGE OR ADD SOME CORE CLASSES,
	 * PLEASE RUN 'build autoload' COMMAND TO UPDATE THIS ARRAY.
	 */
	_coreClasses: {'CApplication':'/base/CApplication.js','CApplicationComponent':'/base/CApplicationComponent.js','CBehavior':'/base/CBehavior.js','CComponent':'/base/CComponent.js','CErrorEvent':'/base/CErrorEvent.js','CErrorHandler':'/base/CErrorHandler.js','CException':'/base/CException.js','CExceptionEvent':'/base/CExceptionEvent.js','CHttpException':'/base/CHttpException.js','CModel':'/base/CModel.js','CModelBehavior':'/base/CModelBehavior.js','CModelEvent':'/base/CModelEvent.js','CModule':'/base/CModule.js','CSecurityManager':'/base/CSecurityManager.js','CStatePersister':'/base/CStatePersister.js','CApcCache':'/caching/CApcCache.js','CCache':'/caching/CCache.js','CDbCache':'/caching/CDbCache.js','CDummyCache':'/caching/CDummyCache.js','CEAcceleratorCache':'/caching/CEAcceleratorCache.js','CFileCache':'/caching/CFileCache.js','CMemCache':'/caching/CMemCache.js','CWinCache':'/caching/CWinCache.js','CXCache':'/caching/CXCache.js','CZendDataCache':'/caching/CZendDataCache.js','CCacheDependency':'/caching/dependencies/CCacheDependency.js','CChainedCacheDependency':'/caching/dependencies/CChainedCacheDependency.js','CDbCacheDependency':'/caching/dependencies/CDbCacheDependency.js','CDirectoryCacheDependency':'/caching/dependencies/CDirectoryCacheDependency.js','CExpressionDependency':'/caching/dependencies/CExpressionDependency.js','CFileCacheDependency':'/caching/dependencies/CFileCacheDependency.js','CGlobalStateCacheDependency':'/caching/dependencies/CGlobalStateCacheDependency.js','CAttributeCollection':'/collections/CAttributeCollection.js','CConfiguration':'/collections/CConfiguration.js','CList':'/collections/CList.js','CListIterator':'/collections/CListIterator.js','CMap':'/collections/CMap.js','CMapIterator':'/collections/CMapIterator.js','CQueue':'/collections/CQueue.js','CQueueIterator':'/collections/CQueueIterator.js','CStack':'/collections/CStack.js','CStackIterator':'/collections/CStackIterator.js','CTypedList':'/collections/CTypedList.js','CTypedMap':'/collections/CTypedMap.js','CConsoleApplication':'/console/CConsoleApplication.js','CConsoleCommand':'/console/CConsoleCommand.js','CConsoleCommandRunner':'/console/CConsoleCommandRunner.js','CHelpCommand':'/console/CHelpCommand.js','CDbCommand':'/db/CDbCommand.js','CDbConnection':'/db/CDbConnection.js','CDbDataReader':'/db/CDbDataReader.js','CDbException':'/db/CDbException.js','CDbMigration':'/db/CDbMigration.js','CDbTransaction':'/db/CDbTransaction.js','CActiveFinder':'/db/ar/CActiveFinder.js','CActiveRecord':'/db/ar/CActiveRecord.js','CActiveRecordBehavior':'/db/ar/CActiveRecordBehavior.js','CDbColumnSchema':'/db/schema/CDbColumnSchema.js','CDbCommandBuilder':'/db/schema/CDbCommandBuilder.js','CDbCriteria':'/db/schema/CDbCriteria.js','CDbExpression':'/db/schema/CDbExpression.js','CDbSchema':'/db/schema/CDbSchema.js','CDbTableSchema':'/db/schema/CDbTableSchema.js','CMssqlColumnSchema':'/db/schema/mssql/CMssqlColumnSchema.js','CMssqlCommandBuilder':'/db/schema/mssql/CMssqlCommandBuilder.js','CMssqlPdoAdapter':'/db/schema/mssql/CMssqlPdoAdapter.js','CMssqlSchema':'/db/schema/mssql/CMssqlSchema.js','CMssqlTableSchema':'/db/schema/mssql/CMssqlTableSchema.js','CMysqlColumnSchema':'/db/schema/mysql/CMysqlColumnSchema.js','CMysqlSchema':'/db/schema/mysql/CMysqlSchema.js','CMysqlTableSchema':'/db/schema/mysql/CMysqlTableSchema.js','COciColumnSchema':'/db/schema/oci/COciColumnSchema.js','COciCommandBuilder':'/db/schema/oci/COciCommandBuilder.js','COciSchema':'/db/schema/oci/COciSchema.js','COciTableSchema':'/db/schema/oci/COciTableSchema.js','CPgsqlColumnSchema':'/db/schema/pgsql/CPgsqlColumnSchema.js','CPgsqlSchema':'/db/schema/pgsql/CPgsqlSchema.js','CPgsqlTableSchema':'/db/schema/pgsql/CPgsqlTableSchema.js','CSqliteColumnSchema':'/db/schema/sqlite/CSqliteColumnSchema.js','CSqliteCommandBuilder':'/db/schema/sqlite/CSqliteCommandBuilder.js','CSqliteSchema':'/db/schema/sqlite/CSqliteSchema.js','CChoiceFormat':'/i18n/CChoiceFormat.js','CDateFormatter':'/i18n/CDateFormatter.js','CDbMessageSource':'/i18n/CDbMessageSource.js','CGettextMessageSource':'/i18n/CGettextMessageSource.js','CLocale':'/i18n/CLocale.js','CMessageSource':'/i18n/CMessageSource.js','CNumberFormatter':'/i18n/CNumberFormatter.js','CPhpMessageSource':'/i18n/CPhpMessageSource.js','CGettextFile':'/i18n/gettext/CGettextFile.js','CGettextMoFile':'/i18n/gettext/CGettextMoFile.js','CGettextPoFile':'/i18n/gettext/CGettextPoFile.js','CDbLogRoute':'/logging/CDbLogRoute.js','CEmailLogRoute':'/logging/CEmailLogRoute.js','CFileLogRoute':'/logging/CFileLogRoute.js','CLogFilter':'/logging/CLogFilter.js','CLogRoute':'/logging/CLogRoute.js','CLogRouter':'/logging/CLogRouter.js','CLogger':'/logging/CLogger.js','CProfileLogRoute':'/logging/CProfileLogRoute.js','CWebLogRoute':'/logging/CWebLogRoute.js','CDateTimeParser':'/utils/CDateTimeParser.js','CFileHelper':'/utils/CFileHelper.js','CFormatter':'/utils/CFormatter.js','CMarkdownParser':'/utils/CMarkdownParser.js','CPropertyValue':'/utils/CPropertyValue.js','CTimestamp':'/utils/CTimestamp.js','CVarDumper':'/utils/CVarDumper.js','CBooleanValidator':'/validators/CBooleanValidator.js','CCaptchaValidator':'/validators/CCaptchaValidator.js','CCompareValidator':'/validators/CCompareValidator.js','CDateValidator':'/validators/CDateValidator.js','CDefaultValueValidator':'/validators/CDefaultValueValidator.js','CEmailValidator':'/validators/CEmailValidator.js','CExistValidator':'/validators/CExistValidator.js','CFileValidator':'/validators/CFileValidator.js','CFilterValidator':'/validators/CFilterValidator.js','CInlineValidator':'/validators/CInlineValidator.js','CNumberValidator':'/validators/CNumberValidator.js','CRangeValidator':'/validators/CRangeValidator.js','CRegularExpressionValidator':'/validators/CRegularExpressionValidator.js','CRequiredValidator':'/validators/CRequiredValidator.js','CSafeValidator':'/validators/CSafeValidator.js','CStringValidator':'/validators/CStringValidator.js','CTypeValidator':'/validators/CTypeValidator.js','CUniqueValidator':'/validators/CUniqueValidator.js','CUnsafeValidator':'/validators/CUnsafeValidator.js','CUrlValidator':'/validators/CUrlValidator.js','CValidator':'/validators/CValidator.js','CActiveDataProvider':'/web/CActiveDataProvider.js','CArrayDataProvider':'/web/CArrayDataProvider.js','CAssetManager':'/web/CAssetManager.js','CBaseController':'/web/CBaseController.js','CCacheHttpSession':'/web/CCacheHttpSession.js','CClientScript':'/web/CClientScript.js','CController':'/web/CController.js','CDataProvider':'/web/CDataProvider.js','CDbHttpSession':'/web/CDbHttpSession.js','CExtController':'/web/CExtController.js','CFormModel':'/web/CFormModel.js','CHttpCookie':'/web/CHttpCookie.js','CHttpRequest':'/web/CHttpRequest.js','CHttpSession':'/web/CHttpSession.js','CHttpSessionIterator':'/web/CHttpSessionIterator.js','COutputEvent':'/web/COutputEvent.js','CPagination':'/web/CPagination.js','CSort':'/web/CSort.js','CSqlDataProvider':'/web/CSqlDataProvider.js','CTheme':'/web/CTheme.js','CThemeManager':'/web/CThemeManager.js','CUploadedFile':'/web/CUploadedFile.js','CUrlManager':'/web/CUrlManager.js','CWebApplication':'/web/CWebApplication.js','CWebModule':'/web/CWebModule.js','CWidgetFactory':'/web/CWidgetFactory.js','CAction':'/web/actions/CAction.js','CInlineAction':'/web/actions/CInlineAction.js','CViewAction':'/web/actions/CViewAction.js','CAccessControlFilter':'/web/auth/CAccessControlFilter.js','CAuthAssignment':'/web/auth/CAuthAssignment.js','CAuthItem':'/web/auth/CAuthItem.js','CAuthManager':'/web/auth/CAuthManager.js','CBaseUserIdentity':'/web/auth/CBaseUserIdentity.js','CDbAuthManager':'/web/auth/CDbAuthManager.js','CPhpAuthManager':'/web/auth/CPhpAuthManager.js','CUserIdentity':'/web/auth/CUserIdentity.js','CWebUser':'/web/auth/CWebUser.js','CFilter':'/web/filters/CFilter.js','CFilterChain':'/web/filters/CFilterChain.js','CInlineFilter':'/web/filters/CInlineFilter.js','CForm':'/web/form/CForm.js','CFormButtonElement':'/web/form/CFormButtonElement.js','CFormElement':'/web/form/CFormElement.js','CFormElementCollection':'/web/form/CFormElementCollection.js','CFormInputElement':'/web/form/CFormInputElement.js','CFormStringElement':'/web/form/CFormStringElement.js','CGoogleApi':'/web/helpers/CGoogleApi.js','CHtml':'/web/helpers/CHtml.js','CJSON':'/web/helpers/CJSON.js','CJavaScript':'/web/helpers/CJavaScript.js','CPradoViewRenderer':'/web/renderers/CPradoViewRenderer.js','CViewRenderer':'/web/renderers/CViewRenderer.js','CWebService':'/web/services/CWebService.js','CWebServiceAction':'/web/services/CWebServiceAction.js','CWsdlGenerator':'/web/services/CWsdlGenerator.js','CActiveForm':'/web/widgets/CActiveForm.js','CAutoComplete':'/web/widgets/CAutoComplete.js','CClipWidget':'/web/widgets/CClipWidget.js','CContentDecorator':'/web/widgets/CContentDecorator.js','CFilterWidget':'/web/widgets/CFilterWidget.js','CFlexWidget':'/web/widgets/CFlexWidget.js','CHtmlPurifier':'/web/widgets/CHtmlPurifier.js','CInputWidget':'/web/widgets/CInputWidget.js','CMarkdown':'/web/widgets/CMarkdown.js','CMaskedTextField':'/web/widgets/CMaskedTextField.js','CMultiFileUpload':'/web/widgets/CMultiFileUpload.js','COutputCache':'/web/widgets/COutputCache.js','COutputProcessor':'/web/widgets/COutputProcessor.js','CStarRating':'/web/widgets/CStarRating.js','CTabView':'/web/widgets/CTabView.js','CTextHighlighter':'/web/widgets/CTextHighlighter.js','CTreeView':'/web/widgets/CTreeView.js','CWidget':'/web/widgets/CWidget.js','CCaptcha':'/web/widgets/captcha/CCaptcha.js','CCaptchaAction':'/web/widgets/captcha/CCaptchaAction.js','CBasePager':'/web/widgets/pagers/CBasePager.js','CLinkPager':'/web/widgets/pagers/CLinkPager.js','CListPager':'/web/widgets/pagers/CListPager.js'},
	/**
	 * Augments a class with properties from another class
	 * @param {Object} receivingClass The class that should be augmented
	 * @param {Object} givingClass The class that donates the properties
	 */
	augment: function (receivingClass, givingClass) {
		var methodName;
		for (methodName in givingClass.prototype) {
			if(!receivingClass.prototype[methodName]) {
				receivingClass.prototype[methodName] = givingClass.prototype[methodName];
			}
		}
	},
	
	/**	
	 * @returns {String} the version of Yii framework
	 */
	getVersion: function () {
		return '1.1.8-dev';
	},
	/**	
	 * Creates a Web application instance.
	 * @param {Mixed} config application configuration.
	 * If a string, it is treated as the path of the file that contains the configuration;
	 * If an array, it is the actual configuration information.
	 * Please make sure you specify the {@link CApplication::basePath basePath} property in the configuration,
	 * which should point to the directory containing all application logic, template and data.
	 * If not, the directory will be defaulted to 'protected'.
	 */
	createWebApplication: function (config) {
		if (config === undefined) {
			config = null;
		}
		return Yii.createApplication('CWebApplication',config);
	},
	/**	
	 * Creates a console application instance.
	 * @param {Mixed} config application configuration.
	 * If a string, it is treated as the path of the file that contains the configuration;
	 * If an array, it is the actual configuration information.
	 * Please make sure you specify the {@link CApplication::basePath basePath} property in the configuration,
	 * which should point to the directory containing all application logic, template and data.
	 * If not, the directory will be defaulted to 'protected'.
	 */
	createConsoleApplication: function (config) {
		if (config === undefined) {
			config = null;
		}
		return Yii.createApplication('CConsoleApplication',config);
	},
	/**	
	 * Creates an application of the specified class.
	 * @param {String} classVar the application class name
	 * @param {Mixed} config application configuration. This parameter will be passed as the parameter
	 * to the constructor of the application class.
	 * @returns {Mixed} the application instance
	 * @since 1.0.10
	 */
	createApplication: function (classVar, config) {
		if (config === undefined) {
			config = null;
		}
		
		return new Yii[classVar](config);
		
	},
	/**	
	 * Returns the application singleton, null if the singleton has not been created yet.
	 * @returns {Yii.CApplication} the application singleton, null if the singleton has not been created yet.
	 */
	app: function () {
		return Yii._app;
	},
	/**	
	 * Stores the application instance in the class static member.
	 * This method helps implement a singleton pattern for CApplication.
	 * Repeated invocation of this method or the CApplication constructor
	 * will cause the throw of an exception.
	 * To retrieve the application instance, use {@link app()}.
	 * @param {Yii.CApplication} app the application instance. If this is null, the existing
	 * application singleton will be removed.
	 * @throws {Yii.CException} if multiple application instances are registered.
	 */
	setApplication: function (app) {
		var _app;
		if(Yii._app===null || app===null) {
			Yii._app=app;
		}
		else {
			throw new Yii.CException(Yii.t('yii','Yii application can only be created once.'));
		}
	},
	/**	
	 * @returns {String} the path of the framework
	 */
	getFrameworkPath: function () {
		return YII_PATH;
	},
	/**	
	 * Creates an object and initializes it based on the given configuration.
	 * 
	 * The specified configuration can be either a string or an array.
	 * If the former, the string is treated as the object type which can
	 * be either the class name or {@link Yii::getPathOfAlias class path alias}.
	 * If the latter, the 'class' element is treated as the object type,
	 * and the rest name-value pairs in the array are used to initialize
	 * the corresponding object properties.
	 * 
	 * Any additional parameters passed to this method will be
	 * passed to the constructor of the object being created.
	 * 
	 * NOTE: the array-typed configuration has been supported since version 1.0.1.
	 * 
	 * @param {Mixed} config the configuration. It can be either a string or an array.
	 * @returns {Mixed} the created object
	 * @throws {Yii.CException} if the configuration does not have a 'class' element.
	 */
	createComponent: function (config) {
		var type, n, args, object, classVar, key, value;
		
		if(typeof(config) === 'string') {
			type=config;
			config=[];
		}
		else if(config['class'] !== undefined) {
			type=config['class'];
			delete config['class'];
		}
		else {
			throw new Yii.CException(Yii.t('yii','Object configuration must be an array containing a "class" element.'));
		}
		if(!Yii[type]) {
			type=Yii.imports(type,true);
		}
		if((n=arguments.length)>1) {
			args=arguments;
			if(n===2) {
				object=new Yii[type](args[1]);
			}
			else if(n===3) {
				object=new Yii[type](args[1],args[2]);
			}
			else if(n===4) {
				object=new Yii[type](args[1],args[2],args[3]);
			}
			else if(n===4) {
				object=new Yii[type](args[1],args[2],args[3]);
			}
			else if(n===5) {
				object=new Yii[type](args[1],args[2],args[3],args[4]);
			}
		}
		else {
			object=new Yii[type]();
		}
		
		for (key in config) {
			if (config.hasOwnProperty(key)) {
				
				value = config[key];
				object.set(key,value);
			}
		}
		
		return object;
	},
	/**	
	 * Imports a class or a directory.
	 * 
	 * Importing a class is like including the corresponding class file.
	 * The main difference is that importing a class is much lighter because it only
	 * includes the class file when the class is referenced the first time.
	 * 
	 * Importing a directory is equivalent to adding a directory into the PHP include path.
	 * If multiple directories are imported, the directories imported later will take
	 * precedence in class file searching (i.e., they are added to the front of the PHP include path).
	 * 
	 * Path aliases are used to import a class or directory. For example,
	 * <ul>
	 *   <li><code>application.components.GoogleMap</code>: import the <code>GoogleMap</code> class.</li>
	 *   <li><code>application.components.*</code>: import the <code>components</code> directory.</li>
	 * </ul>
	 * 
	 * The same path alias can be imported multiple times, but only the first time is effective.
	 * Importing a directory does not import any of its subdirectories.
	 * 
	 * Starting from version 1.1.5, this method can also be used to import a class in namespace format
	 * (available for PHP 5.3 or above only). It is similar to importing a class in path alias format,
	 * except that the dot separator is replaced by the backslash separator. For example, importing
	 * <code>application\components\GoogleMap</code> is similar to importing <code>application.components.GoogleMap</code>.
	 * The difference is that the former class is using qualified name, while the latter unqualified.
	 * 
	 * Note, importing a class in namespace format requires that the namespace is corresponding to
	 * a valid path alias if we replace the backslash characters with dot characters.
	 * For example, the namespace <code>application\components</code> must correspond to a valid
	 * path alias <code>application.components</code>.
	 * 
	 * @param {String} alias path alias to be imported
	 * @param {Boolean} forceInclude whether to include the class file immediately. If false, the class file
	 * will be included only when the class is being used. This parameter is used only when
	 * the path alias refers to a class.
	 * @returns {String} the class name or the directory that this alias refers to
	 * @throws {Yii.CException} if the alias is invalid
	 */
	imports: function (alias, forceInclude) {
		var result, _imports, pos, namespace, path, classFile, classMap, className, isClass, _includePaths;
		if (forceInclude === undefined) {
			forceInclude = true;
		}
		if(Yii._imports[alias] !== undefined) {  // previously imported
			
			return Yii._imports[alias];
		}
		
		if(Yii[alias] !== undefined) {
			return (Yii._imports[alias]=alias);
		}
		if ((pos = alias.indexOf("/")) !== -1) {
			className = String(alias.split("/").pop());
			
			if (className.slice(-3) == ".js") {
				
				className = className.slice(0,-3);
			}
		
			if (Yii[className] !== undefined) {
				return (Yii._imports[alias] = className);
			}
			Yii.include(alias,!forceInclude);
			Yii.classMap[className] = alias;
			Yii._imports[alias] = className;
			
			return className; 
		}
		if((pos=alias.indexOf('.'))===-1) { // a simple class name
			result = Yii.autoload(alias, !forceInclude);
			if(forceInclude && !result) {
				throw new Yii.CException(Yii.t('yii','Alias "{alias}" is invalid. Make sure it points to an existing directory or file.',
				{'{alias}':alias}));				
			}
			Yii._imports[alias]=alias;
			return alias;
		}
		className=String(alias.split(".").pop());
		
		isClass=className!=='*';
		if (!isClass) {
			throw new Yii.CException("YiiJS does not support importing directories");
		}
		if(Yii[className] !== undefined) {
			return (Yii._imports[alias]=className);
		}
		
		else if((path=Yii.getPathOfAlias(alias))!==false) {
			Yii.include(path + ".js",!forceInclude);
			Yii.classMap[className]=path+'.js';
			return className;
		}
		else {
			throw new Yii.CException(Yii.t('yii','Alias "{alias}" is invalid. Make sure it points to an existing directory or file.',
				{'{alias}':alias}));
		}
	},
	/**	
	 * Translates an alias into a file path.
	 * Note, this method does not ensure the existence of the resulting file path.
	 * It only checks if the root alias is valid or not.
	 * @param {String} alias alias (e.g. system.web.CController)
	 * @returns {Mixed} file path corresponding to the alias, false if the alias is invalid.
	 */
	getPathOfAlias: function (alias) {
		var _aliases, pos, rootAlias, _app;
		if(Yii._aliases[alias] !== undefined) {
			return Yii._aliases[alias];
		}
		else if((pos=php.strpos(alias,'.'))!==false) {
			rootAlias=alias.slice(0, pos);
			if(Yii._aliases[rootAlias] !== undefined) {
				return (Yii._aliases[alias]=php.rtrim(Yii._aliases[rootAlias]+'/'+php.str_replace('.','/',alias.slice(pos+1)),'*'+'/'));
			}
			else if(Yii._app !== null && Yii._app instanceof Yii.CWebApplication){
				if(Yii._app.findModule(rootAlias)!==null) {
					return Yii.getPathOfAlias(alias);
				}
			}
		}
		return false;
	},
	/**	
	 * Create a path alias.
	 * Note, this method neither checks the existence of the path nor normalizes the path.
	 * @param {String} alias alias to the path
	 * @param {String} path the path corresponding to the alias. If this is null, the corresponding
	 * path alias will be removed.
	 */
	setPathOfAlias: function (alias, path) {
		var _aliases;
		if(php.empty(path)) {
			delete Yii._aliases[alias];
		}
		else {
			Yii._aliases[alias]=php.rtrim(path,'\\/');
		}
	},
	/**	
	 * Class autoload loader.
	 * @param {String} className class name
	 * @param {Boolean} async Whether to load this class
	 * via an asynchronous AJAX request, otherwise a blocking request is used, defaults to false.
	 * @returns {Boolean} whether the class has been loaded successfully
	 */
	autoload: function (className, async) {
		var _coreClasses, classMap, namespace, path, result;
		if (async === undefined) {
			async = true;
		}
		
		if(Yii._coreClasses[className] !== undefined) {
			if (Yii[className] !== undefined) {
				return true;
			}
		
			result = Yii.include(YII_PATH+Yii._coreClasses[className], async);
			if (!async) {
				return result;
			}
		}
		else if(Yii.classMap[className] !== undefined) {
			if (Yii[className] !== undefined) {
				return true;
			}
			result = Yii.include(Yii.classMap[className], async);
			if (!async) {
				return result;
			}
		}
		else {
			return Yii[className] !== undefined;
		}
		return true;
	},
	
	/**
	 * Includes a remote file, this will be evaled!
	 * @param {String} url The URL to load the file from
	 * @param {Boolean} async Whether to perform an asynchronous request or not, defaults to true.
	 * @param {Function} callback The callback to execute after the included file is evaled
	 * @returns {Mixed} either the jQuery ajax request if this is async, or
	 * if this is a blocking request returns the content or false depending on whether
	 * it succeeded or not.
	 */
	include: function (url, async, callback) {
		var options = {}, request;
		if (async === undefined) {
			async = true;
		}
		if (callback === undefined) {
			callback = function () {};
		}
		if(Yii._includePaths[url] !== undefined) {  // previously imported
			return Yii._includePaths[url];
		}
		options.url = url;
		options.async = async;
		options.cache = false;
		if (async) {
			options.success = function (res) {
				Yii._includePaths[url] = eval(res);
				callback(Yii._includePaths[url]);
			};
			options.error = function () {
				throw new Yii.CHttpException(404, Yii.t("system", "No such file"));
			};
			return jQuery.ajax(options);
		}
		else {
			
			request = jQuery.ajax(options);
			if (request.status > 399) {
				return false;
			}
			Yii._includePaths[url] = eval(request.responseText);
			callback(Yii._includePaths[url]);
			return Yii._includePaths[url];
			
			
		}
	},
	
	
	/**	
	 * Writes a trace message.
	 * This method will only log a message when the application is in debug mode.
	 * @param {String} msg message to be logged
	 * @param {String} category category of the message
	 * @see log
	 */
	trace: function (msg, category) {
		if (category === undefined) {
			category = 'application';
		}
		if(YII_DEBUG) {
			Yii.log(msg,Yii.CLogger.prototype.LEVEL_TRACE,category);
		}
	},
	/**	
	 * Logs a message.
	 * Messages logged by this method may be retrieved via {@link CLogger::getLogs}
	 * and may be recorded in different media, such as file, email, database, using
	 * {@link CLogRouter}.
	 * @param {String} msg message to be logged
	 * @param {String} level level of the message (e.g. 'trace', 'warning', 'error'). It is case-insensitive.
	 * @param {String} category category of the message (e.g. 'system.web'). It is case-insensitive.
	 */
	log: function (msg, level, category) {
		var _logger, traces, count, i, limit, trace, cmd;
		if (level === undefined) {
			level = 'info';
		}
		if (category === undefined) {
			category = 'application';
		}
		if(Yii._logger===null) {
			Yii._logger=new Yii.CLogger();
		}
		if(window['console'] !== undefined && YII_DEBUG && YII_TRACE_LEVEL>0 && level!==Yii.CLogger.prototype.LEVEL_PROFILE)	{
			cmd = "log";
			if (level === Yii.CLogger.prototype.LEVEL_ERROR) {
				cmd = "error";
			}
			else if (level === Yii.CLogger.prototype.LEVEL_WARNING) {
				cmd = "warn";
			}
			console[cmd](level + "\t" + php.str_pad(category,30," ") + "\t" + msg);
		}
		Yii._logger.log(msg,level,category);
	},
	/**	
	 * Marks the begin of a code block for profiling.
	 * This has to be matched with a call to {@link endProfile()} with the same token.
	 * The begin- and end- calls must also be properly nested, e.g.,
	 * <pre>
	 * Yii.beginProfile('block1');
	 * Yii.beginProfile('block2');
	 * Yii.endProfile('block2');
	 * Yii.endProfile('block1');
	 * </pre>
	 * The following sequence is not valid:
	 * <pre>
	 * Yii.beginProfile('block1');
	 * Yii.beginProfile('block2');
	 * Yii.endProfile('block1');
	 * Yii.endProfile('block2');
	 * </pre>
	 * @param {String} token token for the code block
	 * @param {String} category the category of this log message
	 * @see endProfile
	 */
	beginProfile: function (token, category) {
		if (category === undefined) {
			category = 'application';
		}
		Yii.log('begin:'+token,Yii.CLogger.prototype.LEVEL_PROFILE,category);
	},
	/**	
	 * Marks the end of a code block for profiling.
	 * This has to be matched with a previous call to {@link beginProfile()} with the same token.
	 * @param {String} token token for the code block
	 * @param {String} category the category of this log message
	 * @see beginProfile
	 */
	endProfile: function (token, category) {
		if (category === undefined) {
			category = 'application';
		}
		Yii.log('end:'+token,Yii.CLogger.prototype.LEVEL_PROFILE,category);
	},
	/**	
	 * @returns {Yii.CLogger} message logger
	 */
	getLogger: function () {
		var _logger;
		if(Yii._logger!==null) {
			return Yii._logger;
		}
		else {
			return (Yii._logger=new Yii.CLogger);
		}
	},
	/**	
	 * Returns a string that can be displayed on your Web page showing Powered-by-Yii information
	 * @returns {String} a string that can be displayed on your Web page showing Powered-by-Yii information
	 */
	powered: function () {
		return 'Powered by <a href="http://www.yiiframework.com/" rel="external">Yii Framework</a>.';
	},
	/**	
	 * Translates a message to the specified language.
	 * Starting from version 1.0.2, this method supports choice format (see {@link CChoiceFormat}),
	 * i.e., the message returned will be chosen from a few candidates according to the given
	 * number value. This feature is mainly used to solve plural format issue in case
	 * a message has different plural forms in some languages.
	 * @param {String} category message category. Please use only word letters. Note, category 'yii' is
	 * reserved for Yii framework core code use. See {@link CPhpMessageSource} for
	 * more interpretation about message category.
	 * @param {String} message the original message
	 * @param {Array} params parameters to be applied to the message using <code>strtr</code>.
	 * Starting from version 1.0.2, the first parameter can be a number without key.
	 * And in this case, the method will call {@link CChoiceFormat::format} to choose
	 * an appropriate message translation.
	 * Starting from version 1.1.6 you can pass parameter for {@link CChoiceFormat::format}
	 * or plural forms format without wrapping it with array.
	 * @param {String} source which message source application component to use.
	 * Defaults to null, meaning using 'coreMessages' for messages belonging to
	 * the 'yii' category and using 'messages' for the rest messages.
	 * @param {String} language the target language. If null (default), the {@link CApplication::getLanguage application language} will be used.
	 * This parameter has been available since version 1.0.3.
	 * @returns {String} the translated message
	 * @see CMessageSource
	 */
	t: function (category, message, params, source, language) {
		var _app, chunks, expressions, n, i;
		if (params === undefined) {
			params = {};
		}
		if (source === undefined) {
			source = null;
		}
		if (language === undefined) {
			language = null;
		}
		
		
		if(Yii._app!==null) {
			if(source===null) {
				source=(category==='yii'||category==='zii')?'coreMessages':'messages';
			}
			if((source=Yii._app.getComponent(source))!==null && source !== undefined) {
				message=source.translate(category,message,language);
			}
		}
		
		if(params==={} || params === []) {
			return message;
		}
		
		if(params[0] !== undefined) {
			// number choice
			if(php.strpos(message,'|')!==false) {
				if(php.strpos(message,'#')===false) {
					chunks=message.split('|');
					expressions=Yii._app.getLocale(language).getPluralRules();
					n=php.min(php.count(chunks),php.count(expressions));
					if(n) {
						for(i=0;i<n;i++) {
							chunks[i]=expressions[i]+'#'+chunks[i];
						}
						message=chunks.join('|');
					}
				}
				message=Yii.CChoiceFormat.format(message,params[0]);
			}
			if(params['{n}'] === undefined) {
				params['{n}']=params[0];
			}
			delete params[0];
		}
		if (params !== {}) {
			return php.strtr(message,params);
		}
		return message;
	},
	/**	
	 * Registers a new class autoloader.
	 * The new autoloader will be placed before {@link autoload} and after
	 * any other existing autoloaders.
	 * @param {Function} callback a valid PHP callback (function name or array($className,$methodName)).
	 * @since 1.0.10
	 */
	registerAutoloader: function (callback) {
		
	},
	/**
	 * Removes JSDoc comments from a string
	 * TODO: move this somewhere else
	 * @param {String} str the string to strip
	 * @returns {String} the stripped string
	 */
	removeComments: function (str) {
 
	    var uid = '_' + (new Date()),
	        primatives = [],
	        primIndex = 0;
	 
	    return (
	        str
	        .replace(/(['"])(\\\1|.)+?\1/g, function(match){
	            primatives[primIndex] = match;
	            return (uid + '') + primIndex++;
	        })
	        .replace(/([^\/])(\/(?!\*|\/)(\\\/|.)+?\/[gim]{0,3})/g, function(match, $1, $2){
	            primatives[primIndex] = $2;
	            return $1 + (uid + '') + primIndex++;
	        })
	        .replace(/\/\/.*?\/?\*.+?(?=\n|\r|$)|\/\*[\s\S]*?\/\/[\s\S]*?\*\//g, '')
	        .replace(/\/\/.+?(?=\n|\r|$)|\/\*[\s\S]+?\*\//g, '')
	        .replace(RegExp('\\/\\*[\\s\\S]+' + uid + '\\d+', 'g'), '')
	        .replace(RegExp(uid + '(\\d+)', 'g'), function(match, n){
	            return primatives[n];
	        })
	    );
	},
	/**
	 * Similar to PHP's preg_match_all
	 * @param {RegExp} regex The regular expression to match against
	 * @param {String} haystack The string to perform the regex on
	 * @returns {Array} an array of matches
	 */
	matchAll:  function (regex, haystack) {
		var matches = [], i, match;
		match = regex.exec(haystack);
			
		while (match !== null) {
			matches.push(match);
			match = regex.exec(haystack);
		}
		return matches;
	},
	/**
	 * Extends a class
	 */
	extend: function (childClass, parentClass, properties) {
		childClass.prototype = new Yii[parentClass](false);
		childClass.prototype.constructor = childClass; 
		if (properties !== undefined) {
			Yii.forEach(properties, function(name, value) {
				childClass.prototype[name] = value;
			});
		}
	},
	
	/**
	 * Implements foreach in JavaScript
	 * @param {Mixed} itemList a list of items to iterate through
	 * @param {Function} callback The callback function, it will recieve 2 parameters, key and value
	 * if the callback returns false, the loop will break.
	 */
	forEach: function (itemList, callback) {
		var i, limit;
		if (typeof itemList === "function") {
			return Yii.forEach(itemList(), callback);
		}
		if (Object.prototype.toString.call(itemList) === '[object Array]' || itemList instanceof Yii.CList || itemList instanceof Yii.CStack) {
			limit = itemList.length;
			for (i = 0; i < limit; i++) {
				if (i === "forEach") {
					continue;
				}
				else if (callback(i, itemList[i]) === false) {
					break;
				}
			}
		}
		else {
			for (i in itemList) {
				if (itemList.hasOwnProperty(i)) {
					if (i === "forEach") {
						continue;
					}
					else if (callback(i, itemList[i]) === false) {
						break;
					}	
				}
			}
		}
		return itemList;
	},
	
	/**
	 * Filter an array of items
	 */
	filter: function (items, block) {
        var values = [];
        var thisp = arguments[1];
        for (var i = 0; i < items.length; i++)
            if (block.call(thisp, items[i]))
                values.push(items[i]);
        return values;
    }
};
/**
 * A shortcut to application properties.
 * Supports virtual getters and setters, e.g:
 * <pre>
 * $app("securityManager.validationKey") === Yii.app().getSecurityManager().getValidationKey();
 * </pre>
 */
var $app = function(selector, setVal) {
	var stack, parts, i, limit, item, getter, last;
	if (selector === undefined || php.trim(selector).length === 0) {
		return Yii.app();
	}
	parts = selector.split(".");
	
	limit = parts.length;
	last = limit - 1;
	stack = Yii.app();
	for (i = 0; i < limit; i++) {
		
		if (stack instanceof Yii.CComponent) {
			if (setVal !== undefined) {
				return stack.set(parts.join("."),setVal);
			}
			return stack.get(parts.join("."));
		}
		item = parts.shift();
		if (i === last && setVal !== undefined) {
			if (stack[item] !== undefined) {
				stack[item] = setVal;
				return setVal;
			}
			else if (stack.get !== undefined) {
				stack = stack.set.call(stack, item, setVal);
				return setVal;
			}
			else {
				throw new Yii.CException("No such property: " + item);
			}
		}
		else {
			if (stack[item] !== undefined) {
				stack = stack[item];
			}
			else if (stack.get !== undefined) {
				stack = stack.get.call(stack, item);
			}
			else {
				throw new Yii.CException("No such property: " + item);
			}
		}
	}
	
	return stack;
};