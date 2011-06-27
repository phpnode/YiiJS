/**
 * This is the view configuration for the main application layout
 */
Yii.CView.prototype.registerView("application.views.layouts.main", 
{
	'class': 'CLayoutView',
	'templateURL': 'application.views.layouts.main',
	'layout': null,
	'mainMenu': function () {
		var menu, items;
		items = [
			{
				label: 'Home',
				url: ['/site/index']
			},
			{
				label: 'About',
				url: ['/site/page', {view: 'about'}]
			},
			{
				label: 'Contact',
				url: ['/site/contact'],
				linkOptions: {
					id: 'contactLink'
				}
			},
			{
				label: 'Login',
				url: ['/site/login']
			}
			
		];
		menu = new Yii.CMenu;
		menu.items = items;
		
		return menu.run();
	}
	
});
