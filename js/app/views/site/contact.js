/**
 * This is the view configuration for the contact form
 */
Yii.CView.prototype.registerView("application.views.site.contact",{
		templateURL: 'application.views.site.contact',
		layout: 'application.views.layouts.column2',
		model: null, // should be populated by the controller
		form: function () {
			return new Yii.CForm({
				id: 'ContactForm',
				title: "Contact Us",
				elements: {
					name: {
						type: 'text'
					},
					email: {
						type: 'text'
					},
					subject: {
						type: 'text'
					},
					body: {
						type: 'textarea'
					}
				},
				buttons: {
					send: {
						type: 'submit',
						label: 'Send Message'
					}
				}			
			}, this.model);
		},
		delegates: function () {
			return [
				['#ContactForm', 'submit', function (e) {
					e.preventDefault();
					var model = jQuery("#ContactForm").data("Yii.CForm").getModel();
					
					
					if (model.validate()) {
						alert("OK!");
					}
					else {
						alert("Errors");
					}
					
				}]
			];
		}
	});
