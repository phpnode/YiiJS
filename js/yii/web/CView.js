/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CView is a base class for views
 * 
 * @package system.web
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CView = function CView (config) {
	if (config !== false) {
		this.template = null;
		this.construct(config);
	}
};
Yii.CView.prototype = new Yii.CComponent();
Yii.CView.prototype.constructor =  Yii.CView;
/**
 * Holds a list of registered views
 */
Yii.CView.prototype._views = {};

/**
 * Holds a list of cached templates
 * @var Object
 */
Yii.CView.prototype._templates = {};
/**
 * The content of the template that should be used to render this view
 * @var String
 */
Yii.CView.prototype.template = null;

/**
 * The URL of the template to use for this view.
 * @var String
 */
Yii.CView.prototype.templateURL = null;

/**
 * The layout view to use when rendering, if none specified
 * the default layout will be used.
 * @var Yii.CView 
 */
Yii.CView.prototype.layout = null;

/**
 * jQuery events to delegate for this view.
 * Array should be of the following format:
 * <pre>
 * [
 * 	['#selector a.someLink', 'click', function (e) { alert("clicked!")}],
 * 	['#selector form', 'submit', function (e) { alert('Submitted!'); e.preventDefault(); }]
 * ] 
 * </pre>
 * These events will be bound to their selectors when the view is rendered
 * @var Array
 */
Yii.CView.prototype.delegates = [];
/**
 * Registers a view that can be rendered later
 * @param {String} alias The alias for this view so it can be retrieved later
 * @param {Object} config An object that will be used as a configuration for a new CView
 */
Yii.CView.prototype.registerView = function (alias, config) {
	var url;
	if (alias.indexOf("/") === -1) {
		url = Yii.getPathOfAlias(alias) + ".js";
	}
	else {
		url = alias;
	}
	Yii.CView.prototype._views[url] = config;
};

/**
 * Loads a particular view and executes the callback
 * @param {String} alias The alias of the view to load
 * @param {Function} callback The callback to execute, it will receive the loaded view as first parameter
 */
Yii.CView.prototype.load = function (alias, callback) {
	var config, view, className, url;
	if (alias.indexOf("/") === -1) {
		url = Yii.getPathOfAlias(alias) + ".js";
	}
	else {
		url = alias;
	}
	config = Yii.CView.prototype._views[url];
	
	if (config === undefined) {
		// load the view
		
		Yii.include(url, true, function() {
			config = Yii.CView.prototype._views[url];
			
			if (config === undefined) {
				throw new Yii.CHttpException(404, "No such view: " + url);
			}
			if (config['class'] === undefined) {
				className = "CView";
			}
			else {
				className = config['class'];
				delete config['class'];
			}
			return callback(new Yii[className](config));
		});
	}
	else {
		if (config['class'] === undefined) {
			className = "CView";
		}
		else {
			className = config['class'];
			delete config['class'];
		}
		return callback(new Yii[className](config));
	}
}

/**
 * Constructs the view and applies the given configuration
 */
Yii.CView.prototype.construct = function (config) {
	var self = this;
	if (config === undefined) {
		return;
	}
	Yii.forEach(config, function (key, value) {
		self[key] = value;
	});
}
/**
 * Renders the view wrapped in the layout
 * @param {Function} callback The function to execute after the view has been rendered
 */
Yii.CView.prototype.render = function (callback) {
	var func, self = this;
	if (this.layout === null) {
		this.renderPartial(callback);
	}
	else {
		this.load(this.layout, function(layout) {
			func = function(html) {
				layout.content = html;
				layout.render(callback);
			}
			self.renderPartial(func);
		});
		
	}
};

/**
 * Renders the view
 * @param {Function} callback The function to execute after the view has been rendered
 */
Yii.CView.prototype.renderPartial = function (callback) {
	var elements = {}, dependencies = [], stack = [], self = this, output = "", func;
	Yii.forEach(this, function(name, value) {
		if (name.slice(0,1) !== "_") {
			elements[name] = value;
			if (value instanceof Yii.CView) {
				dependencies.push(name);
			}
		}
	});
	Yii.forEach(this.delegates, function(i, item) {
		jQuery("body").undelegate(item[0], item[1]).delegate(item[0], item[1], item[2]);
	});
	func = function() {
		self.getTemplate(function(template) {
			callback(Mustache.to_html(template, self), self);
			
		});
	}
	if (dependencies.length > 0) {
		// can only call this callback when the others have completed.
		stack.push(func);
		Yii.forEach(dependencies, function(i, name) {
			stack.push(function() {
				self[name].renderPartial(function(output, parent) {
					self[name] = output;
					stack.pop()();
				});
			});
			
		});
		return stack.pop()();
	}
	else {
		func();
	}
};


/**
 * Gets the contents of the template
 * @param {Function} callback The function to execute after retrieving the template contents
 * @returns {String} the template contents
 */
Yii.CView.prototype.getTemplate = function (callback) {
	var self = this, url;
	
	if (this.template === null) {
		url = this.templateURL;
		if (url.indexOf("/") === -1 && url.indexOf(".") !== -1) {
			url = Yii.getPathOfAlias(url) + ".tpl";
		}
		if (this._templates[url] !== undefined) {
			this.template = this._templates[url];
			callback(this.template, this);
		}
		else {
			jQuery.ajax(url, {
				success: function(data) {
					self._templates[url] = data;
					self.template = data;
					callback(self.template, self);
				},
				error: function (xhr) {
					self._template = "ERROR: " + xhr.responseText;
					callback(self.template, self);
				}
								
			});
		}
	}
	else {
		callback(this.template, this);
	}
	return this.template;
};

/**
 * Sets the contents of the template
 * @param {String} value The template contents
 */
Yii.CView.prototype.setTemplate = function (value) {
	this.template = value;
}
