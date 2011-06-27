/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
Yii.SiteController = function SiteController(id, module) {
	if (id !== false) {
		this.construct(id, module);
	}
};
Yii.extend(Yii.SiteController, "Controller", /** @lends Yii.SiteController.prototype */ {
	/**
	 * Class based actions
	 */
	actions: function () {
		return {
			page: {
				'class': 'CViewAction'
			}
		}
	},
	/**
	 * The default index action
	 */
	actionIndex: function () {
		
	},
	
	/**
	 * The contact us page
	 */
	actionContact: function () {
		var data = {};
		this.menu = [
			{
				label: 'Home',
				url: ['/site/index']
			},
			{
				label: 'About',
				url: ['/site/page', {view: 'about'}]
			}
		];
		this.breadcrumbs = [{
			label: "TEST 1",
			url: ['site/index']
		}]
		
		data.model = new Yii.ContactForm;
		
		this.render("contact",data,function(html) {
			$("body").html(html);
		})
	},
	
	/**
	 * The site login action
	 */
	actionLogin: function () {
		
	},
	
	/**
	 * The site error action
	 */
	actionError: function () {
		
	}
});
