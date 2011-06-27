/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 * @class
 * @extends Yii.CFormModel
 */
Yii.UserIdentity = function UserIdentity(username, password) {
	if (username !== false) {
		this.construct(username, password);
	}
};
Yii.extend(Yii.UserIdentity, "CUserIdentity", /** @lends Yii.UserIdentity.prototype */ {
	/**
	 * The url to use to login to the site.
	 * @see Yii.CHtml.normalizeUrl()
	 * @var Mixed
	 */
	loginUrl: ['/site/login'],
	/**
	 * Authenticates a user and executes the given callbacks with the response
	 * from the server as the first parameter and the useridentity as the second parameter.
	 * @param {Function} success The callback function to execute when authentication succeeds.
	 * @param {Function} error The callback function to execute when authentication fails
	 */
	authenticate: function (success, error) {
		var self = this, options = {
			data: {
				LoginForm: {
					username: this.username,
					password: this.password
				}
			},
			success: function(res) {
				var decoded;
				// success doesn't always mean authentication really succeeded, so let's check
				if (typeof res === "string") {
					try {
						decoded = Yii.CJSON.decode(res);
						if (typeof decoded === "object") {
							res = decoded;
						}
						else {
							throw "Invalid Response";
						}
					}
					catch (e) {
						error(res, self);
						return;
					}
				}
				if (res.errors !== undefined) {
					error(res, self);
				}
				else {
					success(res, self);
				}
			},
			error: function(xhr) {
				error(xhr, self);
			}
		};
		return Yii.app().ajax.post(this.loginUrl, options);
	}
});
