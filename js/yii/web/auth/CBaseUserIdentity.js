/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CBaseUserIdentity is a base class implementing {@link IUserIdentity}.
 * 
 * CBaseUserIdentity implements the scheme for representing identity
 * information that needs to be persisted. It also provides the way
 * to represent the authentication errors.
 * 
 * Derived classes should implement {@link IUserIdentity::authenticate}
 * and {@link IUserIdentity::getId} that are required by the {@link IUserIdentity}
 * interface.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CBaseUserIdentity.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.web.auth
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CBaseUserIdentity = function CBaseUserIdentity () {
};
Yii.CBaseUserIdentity.prototype = new Yii.CComponent();
Yii.CBaseUserIdentity.prototype.constructor =  Yii.CBaseUserIdentity;
/**
 * @const
 */
Yii.CBaseUserIdentity.ERROR_NONE = 0;
/**
 * @const
 */
Yii.CBaseUserIdentity.ERROR_USERNAME_INVALID = 1;
/**
 * @const
 */
Yii.CBaseUserIdentity.ERROR_PASSWORD_INVALID = 2;
/**
 * @const
 */
Yii.CBaseUserIdentity.ERROR_UNKNOWN_IDENTITY = 100;
/**
 * @var {Integer} the authentication error code. If there is an error, the error code will be non-zero.
 * Defaults to 100, meaning unknown identity. Calling {@link authenticate} will change this value.
 */
Yii.CBaseUserIdentity.prototype.errorCode = 100;
/**
 * @var {String} the authentication error message. Defaults to empty.
 */
Yii.CBaseUserIdentity.prototype.errorMessage = '';
Yii.CBaseUserIdentity.prototype._state = [];
/**
 * Returns a value that uniquely represents the identity.
 * @returns {Mixed} a value that uniquely represents the identity (e.g. primary key value).
 * The default implementation simply returns {@link name}.
 */
Yii.CBaseUserIdentity.prototype.getId = function () {
		return this.getName();
	};
/**
 * Returns the display name for the identity (e.g. username).
 * @returns {String} the display name for the identity.
 * The default implementation simply returns empty string.
 */
Yii.CBaseUserIdentity.prototype.getName = function () {
		return '';
	};
/**
 * Returns the identity states that should be persisted.
 * This method is required by {@link IUserIdentity}.
 * @returns {Array} the identity states that should be persisted.
 */
Yii.CBaseUserIdentity.prototype.getPersistentStates = function () {
		return this._state;
	};
/**
 * Sets an array of presistent states.
 * 
 * @param {Array} states the identity states that should be persisted.
 */
Yii.CBaseUserIdentity.prototype.setPersistentStates = function (states) {
		this._state = states;
	};
/**
 * Returns a value indicating whether the identity is authenticated.
 * This method is required by {@link IUserIdentity}.
 * @returns {Whether} the authentication is successful.
 */
Yii.CBaseUserIdentity.prototype.getIsAuthenticated = function () {
		return this.errorCode==this.ERROR_NONE;
	};
/**
 * Gets the persisted state by the specified name.
 * @param {String} name the name of the state
 * @param {Mixed} defaultValue the default value to be returned if the named state does not exist
 * @returns {Mixed} the value of the named state
 */
Yii.CBaseUserIdentity.prototype.getState = function (name, defaultValue) {
		if (defaultValue === undefined) {
			defaultValue = null;
		}
		return this._state[name] !== undefined?this._state[name]:defaultValue;
	};
/**
 * Sets the named state with a given value.
 * @param {String} name the name of the state
 * @param {Mixed} value the value of the named state
 */
Yii.CBaseUserIdentity.prototype.setState = function (name, value) {
		this._state[name]=value;
	};
/**
 * Removes the specified state.
 * @param {String} name the name of the state
 * @since 1.0.8
 */
Yii.CBaseUserIdentity.prototype.clearState = function (name) {
		delete this._state[name];
	};