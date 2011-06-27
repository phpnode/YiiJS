/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * ContactForm class
 * ContactForm is the data for keeping contact form data.
 * It is used by the 'contact' action of 'SiteController'
 * @class
 * @extends Yii.CFormModel
 */
Yii.ContactForm = function ContactForm(scenario) {
	if (scenario !== false) {
		this.construct(scenario);
	}
};
Yii.extend(Yii.ContactForm, "CFormModel", /** @lends Yii.ContactForm.prototype */ {
	/**
	 * The name of the sender
	 * @var String
	 */
	name: null,
	/**
	 * The email address of the sender
	 * @var String
	 */
	email: null,
	/**
	 * The subject of the message
	 * @var String
	 */
	subject: null,
	/**
	 * The content of the message
	 * @var String
	 */
	body: null,
	
	/**
	 * Declares the validation rules
	 * @returns {Array} The validation rules for this model
	 */
	rules: function () {
		return [
			{
				'attributes': 'name, email, subject, body',
				'validator': 'required'
			},
			{
				'attributes': 'email',
				'validator': 'email'
			}
		];
	}
});
