/**
 * This is the view configuration for the login form
 */
Yii.CView.prototype.registerView("application.views.site.login",{
		templateURL: 'application.views.site.login',
		layout: 'application.views.layouts.column1',
		model: null, // should be populated by the controller
		form: function () {
			return new Yii.CForm({
				id: 'LoginForm',
				title: "Login",
				elements: {
					username: {
						type: 'text'
					},
					password: {
						type: 'password'
					}
				},
				buttons: {
					login: {
						type: 'submit',
						label: 'Login'
					}
				},
				submit: function (e) {
					e.preventDefault();
					var model = jQuery("#LoginForm").data("Yii.CForm").getModel();
					if (model.validate()) {
						model.login(function() {
							jQuery("#LoginForm").dialog("close");
							
						},function(res) {
							model.addErrors(res.errors);
							jQuery("#LoginForm").prepend(Yii.CHtml.errorSummary(model));
						})
					}
					else {
						jQuery("#LoginForm").prepend(Yii.CHtml.errorSummary(model));
					}
					
				}			
			}, this.model);
		}
	});
