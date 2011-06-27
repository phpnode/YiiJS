/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CUserIdentity is a base class for representing identities that are authenticated based on a username and a password.
 * 
 * Derived classes should implement {@link authenticate} with the actual
 * authentication scheme (e.g. checking username and password against a DB table).
 * 
 * By default, CUserIdentity assumes the {@link username} is a unique identifier
 * and thus use it as the {@link id ID} of the identity.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CUserIdentity.php 2799 2011-01-01 19:31:13Z qiang.xue $
 * @package system.web.auth
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CBaseUserIdentity
 */
Yii.CUserIdentity = function CUserIdentity (username, password) {
	if (username !== false) {
		this.construct(username, password);
	}
};
Yii.CUserIdentity.prototype = new Yii.CBaseUserIdentity();
Yii.CUserIdentity.prototype.constructor =  Yii.CUserIdentity;
/**
 * @var {String} username
 */
Yii.CUserIdentity.prototype.username = null;
/**
 * @var {String} password
 */
Yii.CUserIdentity.prototype.password = null;
/**
 * Constructor.
 * @param {String} username username
 * @param {String} password password
 */
Yii.CUserIdentity.prototype.construct = function (username, password) {
		this.username=username;
		this.password=password;
	};
/**
 * Authenticates a user based on {@link username} and {@link password}.
 * Derived classes should override this method, or an exception will be thrown.
 * This method is required by {@link IUserIdentity}.
 * @returns {Boolean} whether authentication succeeds.
 */
Yii.CUserIdentity.prototype.authenticate = function () {
		throw new Yii.CException(Yii.t('yii','{class}::authenticate() must be implemented.',{'{class}':this.getClassName()}));
	};
/**
 * Returns the unique identifier for the identity.
 * The default implementation simply returns {@link username}.
 * This method is required by {@link IUserIdentity}.
 * @returns {String} the unique identifier for the identity.
 */
Yii.CUserIdentity.prototype.getId = function () {
		return this.username;
	};
/**
 * Returns the display name for the identity.
 * The default implementation simply returns {@link username}.
 * This method is required by {@link IUserIdentity}.
 * @returns {String} the display name for the identity.
 */
Yii.CUserIdentity.prototype.getName = function () {
		return this.username;
	};