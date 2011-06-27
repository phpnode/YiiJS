/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * LoginForm class.
 * LoginForm is the data structure for keeping
 * user login form data. It is used by the 'login' action of 'SiteController'.
 * @class
 * @extends Yii.CFormModel
 */
Yii.LoginForm = function LoginForm(scenario) {
	if (scenario !== false) {
		this.construct(scenario);
	}
};
Yii.extend(Yii.LoginForm, "CFormModel", /** @lends Yii.LoginForm.prototype */ {
	/**
	 * The user's username
	 * @var String
	 */
	username: null,
	/**
	 * The user's password
	 * @var String
	 */
	password: null,
	
	/**
	 * Whether to remember this user or not
	 * @var Boolean
	 */
	rememberMe: null,
	
	/**
	 * Declares the validation rules
	 * @returns {Array} The validation rules for this model
	 */
	rules: function () {
		return [
			{
				'attributes': 'username,password',
				'validator': 'required'
			},
			{
				'attributes': 'rememberMe',
				'validator': 'boolean'
			}
		];
	},
	/**
	 * Gets a list of attributes for this model
	 * @returns {Object} attribute: label
	 */
	attributeLabels: function () {
		return {
			'rememberMe': 'Remember me next time'
		};
	},
	
	/**
	 * Logs the user in with the username and password in this model
	 * @param {Function} success The callback to execute when login succeeds
	 * @param {Function} error The callback to execute when login fails
	 */
	login: function (success, error) {
		var identity, self = this;
		if (this.hasErrors()) {
			return error(this.getErrors(), this);
		}
		
		identity = new Yii.UserIdentity(this.username, this.password);
		return identity.authenticate(function(res, userIdentity){
			Yii.app().getUser().login(userIdentity);
			success(res, self);	
		}, function(err){
			if (typeof(err) === "string") {
				alert("There was an invalid response from the server");
				return;
			}
			else if (typeof (err) === "object") {
				// see if this is an xhr response
				if (err.status !== undefined && err.responseText !== undefined) {
					throw new Yii.CHttpException(err.status, err.responseText);
				}
				else if (err.errors !== undefined) {
					self.addErrors(err.errors);
				}
				else {
					if (console !== undefined) {
						if (console.error !== undefined) {
							console.error(err);
						}
						else {
							console.log(err);
						}
					}
				}
				error(err, self);
			}
		});
	}
	
});
