/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
Yii.Controller = function Controller(id, module) {
	if (id !== false) {
		this.construct(id, module);
	}
};
Yii.extend(Yii.Controller, "CController", /** @lends Yii.Controller.prototype */ {
	layout: "application.views.layouts.main",
	menu: {},
	breadcrumbs: {}
});
