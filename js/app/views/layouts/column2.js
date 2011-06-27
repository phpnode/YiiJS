Yii.CView.prototype.registerView("application.views.layouts.column2", 
{
	'templateURL': 'application.views.layouts.column2',
	'layout': 'application.views.layouts.main',
	'menu': function () {
		var menu, items;
		if (Yii.app().getController().menu !== undefined) {
			items = Yii.app().getController().menu;
			menu = new Yii.CMenu;
			menu.items = items;
			return menu.run();
		}
		return "";
	}
});
