/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CWebUser represents the persistent state for a Web application user.
 * 
 * CWebUser is used as an application component whose ID is 'user'.
 * Therefore, at any place one can access the user state via
 * <code>Yii::app()->user</code>.
 * 
 * CWebUser should be used together with an {@link IUserIdentity identity}
 * which implements the actual authentication algorithm.
 * 
 * A typical authentication process using CWebUser is as follows:
 * <ol>
 * <li>The user provides information needed for authentication.</li>
 * <li>An {@link IUserIdentity identity instance} is created with the user-provided information.</li>
 * <li>Call {@link IUserIdentity::authenticate} to check if the identity is valid.</li>
 * <li>If valid, call {@link CWebUser::login} to login the user, and
 *     Redirect the user browser to {@link returnUrl}.</li>
 * <li>If not valid, retrieve the error code or message from the identity
 * instance and display it.</li>
 * </ol>
 * 
 * The property {@link id} and {@link name} are both identifiers
 * for the user. The former is mainly used internally (e.g. primary key), while
 * the latter is for display purpose (e.g. username). The {@link id} property
 * is a unique identifier for a user that is persistent
 * during the whole user session. It can be a username, or something else,
 * depending on the implementation of the {@link IUserIdentity identity class}.
 * 
 * Both {@link id} and {@link name} are persistent during the user session.
 * Besides, an identity may have additional persistent data which can
 * be accessed by calling {@link getState}.
 * Note, when {@link allowAutoLogin cookie-based authentication} is enabled,
 * all these persistent data will be stored in cookie. Therefore, do not
 * store password or other sensitive data in the persistent storage. Instead,
 * you should store them directly in session on the server side if needed.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CWebUser.php 3167 2011-04-07 04:25:27Z qiang.xue $
 * @package system.web.auth
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CApplicationComponent
 */
Yii.CWebUser = function CWebUser() {
};
Yii.CWebUser.prototype = new Yii.CApplicationComponent();
Yii.CWebUser.prototype.constructor =  Yii.CWebUser;
/**
 * @const
 */
Yii.CWebUser.prototype.FLASH_KEY_PREFIX = 'Yii.CWebUser.flash.';
/**
 * @const
 */
Yii.CWebUser.prototype.FLASH_COUNTERS ='Yii.CWebUser.flashcounters';
/**
 * @const
 */
Yii.CWebUser.prototype.STATES_VAR = '__states';
/**
 * @const
 */
Yii.CWebUser.prototype.AUTH_TIMEOUT_VAR = '__timeout';

/**
 * @var {String} the name for a guest user. Defaults to 'Guest'.
 * This is used by {@link getName} when the current user is a guest (not authenticated).
 */
Yii.CWebUser.prototype.guestName = 'Guest';
/**
 * @var {String|array} the URL for login. If using array, the first element should be
 * the route to the login action, and the rest name-value pairs are GET parameters
 * to construct the login URL (e.g. array('/site/login')). If this property is null,
 * a 403 HTTP exception will be raised instead.
 * @see CController::createUrl
 */
Yii.CWebUser.prototype.loginUrl = ['/site/login'];

/**
 * @var {Boolean} whether to automatically update the validity of flash messages.
 * Defaults to true, meaning flash messages will be valid only in the current and the next requests.
 * If this is set false, you will be responsible for ensuring a flash message is deleted after usage.
 * (This can be achieved by calling {@link getFlash} with the 3rd parameter being true).
 * @since 1.1.7
 */
Yii.CWebUser.prototype.autoUpdateFlash = true;
Yii.CWebUser.prototype._keyPrefix = null;
Yii.CWebUser.prototype._access = [];
/**
 * This method is overriden so that persistent states can be accessed like properties.
 * @param {String} name property name
 * @returns {Mixed} property value
 * @since 1.0.3
 */
Yii.CWebUser.prototype.get = function (name) {
		if(this.hasState(name)) {
			return this.getState(name);
		}
		else {
			return Yii.CApplicationComponent.prototype.get.call(this, name);
		}
	};
/**
 * This method is overriden so that persistent states can be set like properties.
 * @param {String} name property name
 * @param {Mixed} value property value
 * @since 1.0.3
 */
Yii.CWebUser.prototype.set = function (name, value) {
		if(this.hasState(name)) {
			this.setState(name,value);
		}
		else {
			Yii.CApplicationComponent.prototype.set.call(this, name,value);
		}
	};
/**
 * This method is overriden so that persistent states can also be checked for null value.
 * @param {String} name property name
 * @since 1.0.3
 */
Yii.CWebUser.prototype.isset = function (name) {
		if(this.hasState(name)) {
			return this.getState(name)!==null;
		}
		else {
			return Yii.CApplicationComponent.prototype.isset.call(this,name);
		}
	};
/**
 * This method is overriden so that persistent states can also be unset.
 * @param {String} name property name
 * @throws {Yii.CException} if the property is read only.
 * @since 1.0.3
 */
Yii.CWebUser.prototype.unset = function (name) {
		if(this.hasState(name)) {
			this.setState(name,null);
		}
		else {
			Yii.CApplicationComponent.prototype.unset.call(this, name);
		}
	};
/**
 * Initializes the application component.
 * This method overrides the parent implementation by starting session,
 * performing cookie-based authentication if enabled, and updating the flash variables.
 */
Yii.CWebUser.prototype.init = function () {
		Yii.CApplicationComponent.prototype.init();
		
		if(this.autoUpdateFlash) {
			this.updateFlash();
		}
		this.updateAuthStatus();
	};
/**
 * Logs in a user.
 * 
 * The user identity information will be saved in storage that is
 * persistent during the user session. By default, the storage is simply
 * the session storage. If the duration parameter is greater than 0,
 * a cookie will be sent to prepare for cookie-based login in future.
 * 
 * Note, you have to set {@link allowAutoLogin} to true
 * if you want to allow user to be authenticated based on the cookie information.
 * 
 * @param {IUserIdentity} identity the user identity (which should already be authenticated)

 */
Yii.CWebUser.prototype.login = function (identity) {
		var id, states;
		id=identity.getId();
		states=identity.getPersistentStates();
		if(this.beforeLogin(id,states,false)) {
			this.changeIdentity(id,identity.getName(),states);
			
			this.afterLogin(false);
		}
	};
/**
 * Logs out the current user.
 * This will remove authentication-related session data.
 * If the parameter is true, the whole session will be destroyed as well.
 * @param {Boolean} destroySession whether to destroy the whole session. Defaults to true. If false,
 * then {@link clearStates} will be called, which removes only the data stored via {@link setState}.
 * This parameter has been available since version 1.0.7. Before 1.0.7, the behavior
 * is to destroy the whole session.
 */
Yii.CWebUser.prototype.logout = function (destroySession) {
		var cookie;
		if (destroySession === undefined) {
			destroySession = true;
		}
		if(this.beforeLogout())	{
			
			if(destroySession) {
				sessionStorage.clear();
			}
			else {
				this.clearStates();
			}
			this.afterLogout();
		}
	};
/**
 * @returns {Boolean} whether the current application user is a guest.
 */
Yii.CWebUser.prototype.getIsGuest = function () {
		return this.getState('__id')===null;
	};
/**
 * @returns {Mixed} the unique identifier for the user. If null, it means the user is a guest.
 */
Yii.CWebUser.prototype.getId = function () {
		return this.getState('__id');
	};
/**
 * @param {Mixed} value the unique identifier for the user. If null, it means the user is a guest.
 */
Yii.CWebUser.prototype.setId = function (value) {
		this.setState('__id',value);
	};
/**
 * Returns the unique identifier for the user (e.g. username).
 * This is the unique identifier that is mainly used for display purpose.
 * @returns {String} the user name. If the user is not logged in, this will be {@link guestName}.
 */
Yii.CWebUser.prototype.getName = function () {
		var name;
		if((name=this.getState('__name'))!==null) {
			return name;
		}
		else {
			return this.guestName;
		}
	};
/**
 * Sets the unique identifier for the user (e.g. username).
 * @param {String} value the user name.
 * @see getName
 */
Yii.CWebUser.prototype.setName = function (value) {
		this.setState('__name',value);
	};
/**
 * Returns the URL that the user should be redirected to after successful login.
 * This property is usually used by the login action. If the login is successful,
 * the action should read this property and use it to redirect the user browser.
 * @param {String} defaultUrl the default return URL in case it was not set previously. If this is null,
 * the application entry URL will be considered as the default return URL.
 * @returns {String} the URL that the user should be redirected to after login.
 * @see loginRequired
 */
Yii.CWebUser.prototype.getReturnUrl = function (defaultUrl) {
		if (defaultUrl === undefined) {
			defaultUrl = null;
		}
		return this.getState('__returnUrl', defaultUrl===null ? Yii.app().getRequest().getScriptUrl() : Yii.CHtml.normalizeUrl(defaultUrl));
	};
/**
 * @param {String} value the URL that the user should be redirected to after login.
 */
Yii.CWebUser.prototype.setReturnUrl = function (value) {
		this.setState('__returnUrl',value);
	};
/**
 * Redirects the user browser to the login page.
 * Before the redirection, the current URL (if it's not an AJAX url) will be
 * kept in {@link returnUrl} so that the user browser may be redirected back
 * to the current page after successful login. Make sure you set {@link loginUrl}
 * so that the user browser can be redirected to the specified login URL after
 * calling this method.
 * After calling this method, the current request processing will be terminated.
 */
Yii.CWebUser.prototype.loginRequired = function () {
		var app, request, url, route;
		app=Yii.app();
		request=app.getRequest();
		if(!request.getIsAjaxRequest()) {
			this.setReturnUrl(request.getUrl());
		}
		if((url=this.loginUrl)!==null) {
			if(Object.prototype.toString.call(url) === '[object Array]') {
				route=url[0] !== undefined ? url[0] : app.defaultController;
				url=app.createUrl(route,php.array_splice(url,1));
			}
			request.redirect(url);
		}
		else {
			throw new Yii.CHttpException(403,Yii.t('yii','Login Required'));
		}
	};
/**
 * This method is called before logging in a user.
 * You may override this method to provide additional security check.
 * For example, when the login is cookie-based, you may want to verify
 * that the user ID together with a random token in the states can be found
 * in the database. This will prevent hackers from faking arbitrary
 * identity cookies even if they crack down the server private key.
 * @param {Mixed} id the user ID. This is the same as returned by {@link getId()}.
 * @param {Array} states a set of name-value pairs that are provided by the user identity.
 * @param {Boolean} fromCookie whether the login is based on cookie
 * @returns {Boolean} whether the user should be logged in
 * @since 1.1.3
 */
Yii.CWebUser.prototype.beforeLogin = function (id, states, fromCookie) {
		var event;
		if(this.hasEventHandler('onBeforeLogin')) {
			event=new Yii.CEvent(this);
			this.onBeforeLogin(event);
			return event.isValid;
		}
		else {
			return true;
		}
	};
/**
 * This method is called after the user is successfully logged in.
 * You may override this method to do some postprocessing (e.g. log the user
 * login IP and time; load the user permission information).
 * @param {Boolean} fromCookie whether the login is based on cookie.
 * @since 1.1.3
 */
Yii.CWebUser.prototype.afterLogin = function (fromCookie) {
		var event;
		if(this.hasEventHandler('onAfterLogin')) {
			event=new Yii.CEvent(this);
			this.onAfterLogin(event);
		}
	};
	
	
/**
 * This method is invoked when calling {@link logout} to log out a user.
 * If this method return false, the logout action will be cancelled.
 * You may override this method to provide additional check before
 * logging out a user.
 * @returns {Boolean} whether to log out the user
 * @since 1.1.3
 */
Yii.CWebUser.prototype.beforeLogout = function () {
		var event;
		if(this.hasEventHandler('onBeforeLogout')) {
			event=new Yii.CEvent(this);
			this.onBeforeLogout(event);
			return event.isValid;
		}
		else {
			return true;
		}
	};
/**
 * This method is invoked right after a user is logged out.
 * You may override this method to do some extra cleanup work for the user.
 * @since 1.1.3
 */
Yii.CWebUser.prototype.afterLogout = function () {
		var event;
		if(this.hasEventHandler('onAfterLogout')) {
			event=new Yii.CEvent(this);
			this.onAfterLogout(event);
		}
	};


/**
 * This event is raised before the user logs in
 * @param {Yii.CEvent} event the event parameter
 */
Yii.CWebUser.prototype.onBeforeLogin = function (event) {
		this.raiseEvent('onBeforeLogin',event);
	};
/**
 * This event is raised before the user logs out
 * @param {Yii.CEvent} event the event parameter
 */
Yii.CWebUser.prototype.onBeforeLogout = function (event) {
		this.raiseEvent('onBeforeLogout',event);
	};
/**
 * This event is raised after the user logs in
 * @param {Yii.CEvent} event the event parameter
 */
Yii.CWebUser.prototype.onAfterLogin = function (event) {
		this.raiseEvent('onAfterLogin',event);
	};
/**
 * This event is raised after the user logs in
 * @param {Yii.CEvent} event the event parameter
 */
Yii.CWebUser.prototype.onAfterLogout = function (event) {
		this.raiseEvent('onAfterLogout',event);
	};
/**
 * @returns {String} a prefix for the name of the session variables storing user session data.
 */
Yii.CWebUser.prototype.getStateKeyPrefix = function () {
		if(this._keyPrefix!==null) {
			return this._keyPrefix;
		}
		else {
			return (this._keyPrefix=php.md5('Yii.'+php.get_class(this)+'.'+Yii.app().getId()));
		}
	};
/**
 * @param {String} value a prefix for the name of the session variables storing user session data.
 * @since 1.0.9
 */
Yii.CWebUser.prototype.setStateKeyPrefix = function (value) {
		this._keyPrefix=value;
	};
/**
 * Returns the value of a variable that is stored in user session.
 * 
 * This function is designed to be used by CWebUser descendant classes
 * who want to store additional user information in user session.
 * A variable, if stored in user session using {@link setState} can be
 * retrieved back using this function.
 * 
 * @param {String} key variable name
 * @param {Mixed} defaultValue default value
 * @returns {Mixed} the value of the variable. If it doesn't exist in the session,
 * the provided default value will be returned
 * @see setState
 */
Yii.CWebUser.prototype.getState = function (key, defaultValue) {
		if (defaultValue === undefined) {
			defaultValue = null;
		}
		key=this.getStateKeyPrefix()+key;
		return sessionStorage[key] !== undefined ? sessionStorage[key] : defaultValue;
	};
/**
 * Stores a variable in user session.
 * 
 * This function is designed to be used by CWebUser descendant classes
 * who want to store additional user information in user session.
 * By storing a variable using this function, the variable may be retrieved
 * back later using {@link getState}. The variable will be persistent
 * across page requests during a user session.
 * 
 * @param {String} key variable name
 * @param {Mixed} value variable value
 * @param {Mixed} defaultValue default value. If $value===$defaultValue, the variable will be
 * removed from the session
 * @see getState
 */
Yii.CWebUser.prototype.setState = function (key, value, defaultValue) {
		if (defaultValue === undefined) {
			defaultValue = null;
		}
		key=this.getStateKeyPrefix()+key;
		if(value===defaultValue) {
			delete sessionStorage[key];
		}
		else {
			sessionStorage[key]=value;
		}
	};
/**
 * Returns a value indicating whether there is a state of the specified name.
 * @param {String} key state name
 * @returns {Boolean} whether there is a state of the specified name.
 * @since 1.0.3
 */
Yii.CWebUser.prototype.hasState = function (key) {
		
		key=this.getStateKeyPrefix()+key;
		return sessionStorage[key] !== undefined;
	};
/**
 * Clears all user identity information from persistent storage.
 * This will remove the data stored via {@link setState}.
 */
Yii.CWebUser.prototype.clearStates = function () {
		var keys, prefix, n, i, key;
		keys=php.array_keys(sessionStorage);
		prefix=this.getStateKeyPrefix();
		n=php.strlen(prefix);
		for (i in keys)	{
			if (keys.hasOwnProperty(i)) {
				key = keys[i];
				if(!php.strncmp(key,prefix,n)) {
					delete sessionStorage[key];
				}
			}
		}
	};
/**
 * Returns all flash messages.
 * This method is similar to {@link getFlash} except that it returns all
 * currently available flash messages.
 * @param {Boolean} deleteVar whether to delete the flash messages after calling this method.
 * @returns {Array} flash messages (key => message).
 * @since 1.1.3
 */
Yii.CWebUser.prototype.getFlashes = function (deleteVar) {
		var flashes, prefix, keys, n, i, key;
		if (deleteVar === undefined) {
			deleteVar = true;
		}
		flashes=[];
		prefix=this.getStateKeyPrefix()+this.FLASH_KEY_PREFIX;
		keys=php.array_keys(sessionStorage);
		n=php.strlen(prefix);
		for (i in keys)	{
			if (keys.hasOwnProperty(i)) {
				key = keys[i];
				if(!php.strncmp(key,prefix,n)) {
					flashes[key.slice(n)]=sessionStorage[key];
					if(deleteVar) {
						delete sessionStorage[key];
					}
				}
			}
		}
		if(deleteVar) {
			this.setState(this.FLASH_COUNTERS,[]);
		}
		return flashes;
	};
/**
 * Returns a flash message.
 * A flash message is available only in the current and the next requests.
 * @param {String} key key identifying the flash message
 * @param {Mixed} defaultValue value to be returned if the flash message is not available.
 * @param {Boolean} deleteVar whether to delete this flash message after accessing it.
 * Defaults to true. This parameter has been available since version 1.0.2.
 * @returns {Mixed} the message message
 */
Yii.CWebUser.prototype.getFlash = function (key, defaultValue, deleteVar) {
		var value;
		if (defaultValue === undefined) {
			defaultValue = null;
		}
		if (deleteVar === undefined) {
			deleteVar = true;
		}
		value=this.getState(this.FLASH_KEY_PREFIX+key,defaultValue);
		if(deleteVar) {
			this.setFlash(key,null);
		}
		return value;
	};
/**
 * Stores a flash message.
 * A flash message is available only in the current and the next requests.
 * @param {String} key key identifying the flash message
 * @param {Mixed} value flash message
 * @param {Mixed} defaultValue if this value is the same as the flash message, the flash message
 * will be removed. (Therefore, you can use setFlash('key',null) to remove a flash message.)
 */
Yii.CWebUser.prototype.setFlash = function (key, value, defaultValue) {
		var counters;
		if (defaultValue === undefined) {
			defaultValue = null;
		}
		this.setState(this.FLASH_KEY_PREFIX+key,value,defaultValue);
		counters=this.getState(this.FLASH_COUNTERS,[]);
		if(value===defaultValue) {
			delete counters[key];
		}
		else {
			counters[key]=0;
		}
		this.setState(this.FLASH_COUNTERS,counters,[]);
	};
/**
 * @param {String} key key identifying the flash message
 * @returns {Boolean} whether the specified flash message exists
 */
Yii.CWebUser.prototype.hasFlash = function (key) {
		return this.getFlash(key, null, false)!==null;
	};
/**
 * Changes the current user with the specified identity information.
 * This method is called by {@link login} and {@link restoreFromCookie}
 * when the current user needs to be populated with the corresponding
 * identity information. Derived classes may override this method
 * by retrieving additional user-related information. Make sure the
 * parent implementation is called first.
 * @param {Mixed} id a unique identifier for the user
 * @param {String} name the display name for the user
 * @param {Array} states identity states
 */
Yii.CWebUser.prototype.changeIdentity = function (id, name, states) {
		this.setId(id);
		this.setName(name);
		this.loadIdentityStates(states);
	};
/**
 * Retrieves identity states from persistent storage and saves them as an array.
 * @returns {Array} the identity states
 */
Yii.CWebUser.prototype.saveIdentityStates = function () {
		var states, nameDummy, name, dummy;
		states=[];
		nameDummy = this.getState(this.STATES_VAR,[]);
		for (name in nameDummy) {
			if (nameDummy.hasOwnProperty(name)) {
				dummy = nameDummy[name];
				states[name]=this.getState(name);
			}
		}
		return states;
	};
/**
 * Loads identity states from an array and saves them to persistent storage.
 * @param {Array} states the identity states
 */
Yii.CWebUser.prototype.loadIdentityStates = function (states) {
		var names, name, value;
		names=[];
		if(Object.prototype.toString.call(states) === '[object Array]') {
			for (name in states) {
				if (states.hasOwnProperty(name)) {
					value = states[name];
					this.setState(name,value);
					names[name]=true;
				}
			}
		}
		this.setState(this.STATES_VAR,names);
	};
/**
 * Updates the internal counters for flash messages.
 * This method is internally used by {@link CWebApplication}
 * to maintain the availability of flash messages.
 */
Yii.CWebUser.prototype.updateFlash = function () {
		var counters, count, key;
		counters=this.getState(this.FLASH_COUNTERS);
		if(Object.prototype.toString.call(counters) !== '[object Array]') {
			return;
		}
		for (key in counters) {
			if (counters.hasOwnProperty(key)) {
				count = counters[key];
				if(count)
				{
					delete counters[key];
					this.setState(this.FLASH_KEY_PREFIX+key,null);
				}
				else {
					counters[key]++;
				}
			}
		}
		this.setState(this.FLASH_COUNTERS,counters,[]);
	};
/**
 * Updates the authentication status according to {@link authTimeout}.
 * If the user has been inactive for {@link authTimeout} seconds,
 * he will be automatically logged out.
 * @since 1.1.7
 */
Yii.CWebUser.prototype.updateAuthStatus = function () {
	};
/**
 * Performs access check for this user.
 * @param {String} operation the name of the operation that need access check.
 * @param {Array} params name-value pairs that would be passed to business rules associated
 * with the tasks and roles assigned to the user.
 * @param {Boolean} allowCaching whether to allow caching the result of access check.
 * This parameter has been available since version 1.0.5. When this parameter
 * is true (default), if the access check of an operation was performed before,
 * its result will be directly returned when calling this method to check the same operation.
 * If this parameter is false, this method will always call {@link CAuthManager::checkAccess}
 * to obtain the up-to-date access result. Note that this caching is effective
 * only within the same request.
 * @returns {Boolean} whether the operations can be performed by this user.
 */
Yii.CWebUser.prototype.checkAccess = function (operation, params, allowCaching) {
		if (params === undefined) {
			params = [];
		}
		if (allowCaching === undefined) {
			allowCaching = true;
		}
		if(allowCaching && params===[] && this._access[operation] !== undefined) {
			return this._access[operation];
		}
		else {
			return (this._access[operation]=Yii.app().getAuthManager().checkAccess(operation,this.getId(),params));
		}
};