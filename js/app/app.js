/**
 * The main JavaScript web application
 * @class
 * @extends Yii.CWebApplication
 */
Yii.Application = function Application (config) {
	if (config !== false) {
		this.construct(config);
	}
};
Yii.extend(Yii.Application, "CWebApplication", /** @lends Yii.Application.prototype */ {
	delegates: [
		["a[href='/contact.html']", "click", function (e) {
			var data = {};
			e.preventDefault();		
			data.model = new Yii.ContactForm();
			Yii.app().getController().renderPartial("/site/contact", data, function (html) {
				html = "<div id='contactDialog' style='display:none'>" + html + "</div>";
				jQuery("body").append(html);
				setTimeout(function () { jQuery("#contactDialog").dialog({
					width: 500,
					modal: true					
				}); }, 20);
			
			}, true)	
		}],
		["a[href='/site/login.html']", "click", function (e) {
			var data = {};
			e.preventDefault();		
			data.model = new Yii.LoginForm();
			Yii.app().getController().renderPartial("/site/login", data, function (html) {
				html = "<div id='loginDialog' style='display:none'>" + html + "</div>";
				jQuery("body").append(html);
				setTimeout(function () { jQuery("#loginDialog").dialog({
					width: 500,
					modal: true					
				}); }, 20);
			
			}, true)	
		}]
	],
	/**
	 * Initializes the application
	 */
	init: function () {
		
		Yii.CWebApplication.prototype.init.call(this);
	},
	/**
	 * Triggered before every action runs.
	 */
	beforeControllerAction: function (controller, action) {
		// set up site wide event handlers
		Yii.app().getUser().attachEventHandler("onAfterLogin", function() { 
			alert("Thanks for logging in " + $app("user.name"));
		});
		Yii.app().getUser().attachEventHandler("onBeforeLogout", function() { 
			return confirm("Are you sure you want to logout?");
		});
		return true;
	}
});
