/*global Yii, php, $, jQuery, confirm, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CHtml is a static class that provides a collection of helper methods for creating HTML views.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CHtml.php 2985 2011-02-20 16:10:57Z alexander.makarow $
 * @package system.web.helpers
 * @since 1.0
 * @author Charles Pick
 * @class
 */
Yii.CHtml = {};
/**
 * @const
 */
Yii.CHtml.ID_PREFIX = 'yt';
/**
 * @var {String} the CSS class for displaying error summaries (see {@link errorSummary}).
 */
Yii.CHtml.errorSummaryCss = 'errorSummary';
/**
 * @var {String} the CSS class for displaying error messages (see {@link error}).
 */
Yii.CHtml.errorMessageCss = 'errorMessage';
/**
 * @var {String} the CSS class for highlighting error inputs. Form inputs will be appended
 * with this CSS class if they have input errors.
 */
Yii.CHtml.errorCss = 'error';
/**
 * @var {String} the CSS class for required labels. Defaults to 'required'.
 * @see label
 */
Yii.CHtml.requiredCss = 'required';
/**
 * @var {String} the HTML code to be prepended to the required label.
 * @see label
 */
Yii.CHtml.beforeRequiredLabel = '';
/**
 * @var {String} the HTML code to be appended to the required label.
 * @see label
 */
Yii.CHtml.afterRequiredLabel = ' <span class=\"required\">*<\/span>';
/**
 * @var {Integer} the counter for generating automatic input field names.
 * @since 1.0.4
 */
Yii.CHtml.count = 0;
/**
 * Encodes special characters into HTML entities.
 * The {@link CApplication::charset application charset} will be used for encoding.
 * @param {String} text data to be encoded
 * @returns {String} the encoded data
 * @see http://www.php.net/manual/en/function.htmlspecialchars.php
 */
Yii.CHtml.encode = function (text) {
		return php.htmlspecialchars(text,'ENT_QUOTES',Yii.app().charset);
	};
/**
 * Encodes special characters in an array of strings into HTML entities.
 * Both the array keys and values will be encoded if needed.
 * If a value is an array, this method will also encode it recursively.
 * The {@link CApplication::charset application charset} will be used for encoding.
 * @param {Array} data data to be encoded
 * @returns {Array} the encoded data
 * @see http://www.php.net/manual/en/function.htmlspecialchars.php
 * @since 1.0.4
 */
Yii.CHtml.encodeArray = function (data) {
		var d, key, value;
		d={};
		for (key in data) {
			if (data.hasOwnProperty(key)) {
				value = data[key];
				if(typeof(key) === 'string') {
					key=php.htmlspecialchars(key,'ENT_QUOTES',Yii.app().charset);
				}
				if(typeof(value) === 'string') {
					value=php.htmlspecialchars(value,'ENT_QUOTES',Yii.app().charset);
				}
				else if(typeof(value) === 'object') {
					value=this.encodeArray(value);
				}
				d[key]=value;
			}
		}
		return d;
	};
/**
 * Generates an HTML element.
 * @param {String} tag the tag name
 * @param {Array} htmlOptions the element attributes. The values will be HTML-encoded using {@link encode()}.
 * Since version 1.0.5, if an 'encode' attribute is given and its value is false,
 * the rest of the attribute values will NOT be HTML-encoded.
 * Since version 1.1.5, attributes whose value is null will not be rendered.
 * @param {Mixed} content the content to be enclosed between open and close element tags. It will not be HTML-encoded.
 * If false, it means there is no body content.
 * @param {Boolean} closeTag whether to generate the close tag.
 * @returns {String} the generated HTML element tag
 */
Yii.CHtml.tag = function (tag, htmlOptions, content, closeTag) {
		var html;
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		if (content === undefined) {
			content = false;
		}
		if (closeTag === undefined) {
			closeTag = true;
		}
		html='<' + tag + Yii.CHtml.renderAttributes(htmlOptions);
		if(content===false) {
			return closeTag ? html+' />' : html+'>';
		}
		else {
			return closeTag ? html+'>'+content+'</'+tag+'>' : html+'>'+content;
		}
	};
/**
 * Generates an open HTML element.
 * @param {String} tag the tag name
 * @param {Array} htmlOptions the element attributes. The values will be HTML-encoded using {@link encode()}.
 * Since version 1.0.5, if an 'encode' attribute is given and its value is false,
 * the rest of the attribute values will NOT be HTML-encoded.
 * Since version 1.1.5, attributes whose value is null will not be rendered.
 * @returns {String} the generated HTML element tag
 */
Yii.CHtml.openTag = function (tag, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return '<' + tag + this.renderAttributes(htmlOptions) + '>';
	};
/**
 * Generates a close HTML element.
 * @param {String} tag the tag name
 * @returns {String} the generated HTML element tag
 */
Yii.CHtml.closeTag = function (tag) {
		return '</'+tag+'>';
	};
/**
 * Encloses the given string within a CDATA tag.
 * @param {String} text the string to be enclosed
 * @returns {String} the CDATA tag with the enclosed content.
 */
Yii.CHtml.cdata = function (text) {
		return '<![CDATA[' + text + ']]>';
	};
/**
 * Generates a meta tag that can be inserted in the head section of HTML page.
 * @param {String} content content attribute of the meta tag
 * @param {String} name name attribute of the meta tag. If null, the attribute will not be generated
 * @param {String} httpEquiv http-equiv attribute of the meta tag. If null, the attribute will not be generated
 * @param {Array} options other options in name-value pairs (e.g. 'scheme', 'lang')
 * @returns {String} the generated meta tag
 * @since 1.0.1
 */
Yii.CHtml.metaTag = function (content, name, httpEquiv, options) {
		if (name === undefined) {
			name = null;
		}
		if (httpEquiv === undefined) {
			httpEquiv = null;
		}
		if (options === undefined) {
			options = [];
		}
		if(name!==null) {
			options.name=name;
		}
		if(httpEquiv!==null) {
			options['http-equiv']=httpEquiv;
		}
		options.content=content;
		return this.tag('meta',options);
	};
/**
 * Generates a link tag that can be inserted in the head section of HTML page.
 * Do not confuse this method with {@link link()}. The latter generates a hyperlink.
 * @param {String} relation rel attribute of the link tag. If null, the attribute will not be generated.
 * @param {String} type type attribute of the link tag. If null, the attribute will not be generated.
 * @param {String} href href attribute of the link tag. If null, the attribute will not be generated.
 * @param {String} media media attribute of the link tag. If null, the attribute will not be generated.
 * @param {Array} options other options in name-value pairs
 * @returns {String} the generated link tag
 * @since 1.0.1
 */
Yii.CHtml.linkTag = function (relation, type, href, media, options) {
		if (relation === undefined) {
			relation = null;
		}
		if (type === undefined) {
			type = null;
		}
		if (href === undefined) {
			href = null;
		}
		if (media === undefined) {
			media = null;
		}
		if (options === undefined) {
			options = {};
		}
		if(relation!==null) {
			options.rel=relation;
		}
		if(type!==null) {
			options.type=type;
		}
		if(href!==null) {
			options.href=href;
		}
		if(media!==null) {
			options.media=media;
		}
		return this.tag('link',options);
	};
/**
 * Encloses the given CSS content with a CSS tag.
 * @param {String} text the CSS content
 * @param {String} media the media that this CSS should apply to.
 * @returns {String} the CSS properly enclosed
 */
Yii.CHtml.css = function (text, media) {
		if (media === undefined) {
			media = '';
		}
		if(media!=='') {
			media=' media="'+media+'"';
		}
		return "<style type=\"text/css\"" + media + ">\n/*<!CDATA[*/\n" + text + "\n/*]]>*/\n</style>";		
	};
/**
 * Registers a 'refresh' meta tag.
 * This method can be invoked anywhere in a view. It will register a 'refresh'
 * meta tag with {@link CClientScript} so that the page can be refreshed in
 * the specified seconds.
 * @param {Integer} seconds the number of seconds to wait before refreshing the page
 * @param {String} url the URL to which the page should be redirected to. If empty, it means the current page.
 * @since 1.1.1
 */
Yii.CHtml.refresh = function (seconds, url) {
		var content;
		if (url === undefined) {
			url = '';
		}
		content="seconds";
		if(url!=='') {
			content+=';'+this.normalizeUrl(url);
		}
		Yii.app().clientScript.registerMetaTag(content,null,'refresh');
	};
/**
 * Links to the specified CSS file.
 * @param {String} url the CSS URL
 * @param {String} media the media that this CSS should apply to.
 * @returns {String} the CSS link.
 */
Yii.CHtml.cssFile = function (url, media) {
		if (media === undefined) {
			media = '';
		}
		if(media!=='') {
			media=' media="'+media+'"';
		}
		return '<link rel="stylesheet" type="text/css" href="'+this.encode(url)+'"'+media+' />';
	};
/**
 * Encloses the given JavaScript within a script tag.
 * @param {String} text the JavaScript to be enclosed
 * @returns {String} the enclosed JavaScript
 */
Yii.CHtml.script = function (text) {
		return "<script type=\"text/javascript\">\n/*<![CDATA[*/\n" + text + "\n/*]]>*/\n</script>";
	};
/**
 * Includes a JavaScript file.
 * @param {String} url URL for the JavaScript file
 * @returns {String} the JavaScript file tag
 */
Yii.CHtml.scriptFile = function (url) {
		return '<script type="text/javascript" src="'+this.encode(url)+'"></script>';
	};
/**
 * Generates an opening form tag.
 * This is a shortcut to {@link beginForm}.
 * @param {Mixed} action the form action URL (see {@link normalizeUrl} for details about this parameter.)
 * @param {String} method form method (e.g. post, get)
 * @param {Array} htmlOptions additional HTML attributes (see {@link tag}).
 * @returns {String} the generated form tag.
 */
Yii.CHtml.form = function (action, method, htmlOptions) {
		if (action === undefined) {
			action = '';
		}
		if (method === undefined) {
			method = 'post';
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return this.beginForm(action,method,htmlOptions);
	};
/**
 * Generates an opening form tag.
 * Note, only the open tag is generated. A close tag should be placed manually
 * at the end of the form.
 * @param {Mixed} action the form action URL (see {@link normalizeUrl} for details about this parameter.)
 * @param {String} method form method (e.g. post, get)
 * @param {Array} htmlOptions additional HTML attributes (see {@link tag}).
 * @returns {String} the generated form tag.
 * @since 1.0.4
 * @see endForm
 */
Yii.CHtml.beginForm = function (action, method, htmlOptions) {
		var url, form, hiddens, pos, i, pairList, pair, request;
		if (action === undefined || action === null) {
			action = '';
		}
		if (method === undefined || method === null) {
			method = 'post';
		}
		if (htmlOptions === undefined || htmlOptions === null) {
			htmlOptions = {};
		}
		url=this.normalizeUrl(action);
		htmlOptions.action=url;
		htmlOptions.method=method;
		
		form=Yii.CHtml.tag('form',htmlOptions,false,false);
	
		hiddens=[];
		if(!php.strcasecmp(method,'get') && (pos=php.strpos(url,'?'))!==false) {
			pairList = url.slice(pos+1).split('&');
			for (i in pairList) {
				if (pairList.hasOwnProperty(i)) {
					pair = pairList[i];
					if((pos=php.strpos(pair,'='))!==false) {
						hiddens.push(this.hiddenField(php.urldecode(pair.slice(0, pos)),php.urldecode(pair.slice(pos+1)),{'id':false}));
					}
				}
			}
		}
		request=Yii.app().getRequest();
		if(request.enableCsrfValidation && !php.strcasecmp(method,'post')) {
			hiddens.push(this.hiddenField(request.csrfTokenName,request.getCsrfToken(),{'id':false}));
		}
		if(hiddens!==[]) {
			form+="\n"+this.tag('div',{'style':'display:none'},hiddens.join("\n"));
		}
		return form;
	};
/**
 * Generates a closing form tag.
 * @returns {String} the generated tag
 * @since 1.0.4
 * @see beginForm
 */
Yii.CHtml.endForm = function () {
		return '</form>';
	};
/**
 * Generates a stateful form tag.
 * A stateful form tag is similar to {@link form} except that it renders an additional
 * hidden field for storing persistent page states. You should use this method to generate
 * a form tag if you want to access persistent page states when the form is submitted.
 * @param {Mixed} action the form action URL (see {@link normalizeUrl} for details about this parameter.)
 * @param {String} method form method (e.g. post, get)
 * @param {Array} htmlOptions additional HTML attributes (see {@link tag}).
 * @returns {String} the generated form tag.
 */
Yii.CHtml.statefulForm = function (action, method, htmlOptions) {
		if (action === undefined) {
			action = '';
		}
		if (method === undefined) {
			method = 'post';
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return this.form(action,method,htmlOptions)+"\n"+
			this.tag('div',{'style':'display:none'},this.pageStateField(''));
	};
/**
 * Generates a hidden field for storing persistent page states.
 * This method is internally used by {@link statefulForm}.
 * @param {String} value the persistent page states in serialized format
 * @returns {String} the generated hidden field
 */
Yii.CHtml.pageStateField = function (value) {
		return '<input type="hidden" name="'+Yii.CController.prototype.STATE_INPUT_NAME+'" value="'+value+'" />';
	};
/**
 * Generates a hyperlink tag.
 * @param {String} text link body. It will NOT be HTML-encoded. Therefore you can pass in HTML code such as an image tag.
 * @param {Mixed} url a URL or an action route that can be used to create a URL.
 * See {@link normalizeUrl} for more details about how to specify this parameter.
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated hyperlink
 * @see normalizeUrl
 * @see clientChange
 */
Yii.CHtml.link = function (text, url, htmlOptions) {
		if (url === undefined) {
			url = '#';
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		if(url!=='') {
			htmlOptions.href=this.normalizeUrl(url);
		}
		this.clientChange('click',htmlOptions);
		return this.tag('a',htmlOptions,text);
	};
/**
 * Generates a mailto link.
 * @param {String} text link body. It will NOT be HTML-encoded. Therefore you can pass in HTML code such as an image tag.
 * @param {String} email email address. If this is empty, the first parameter (link body) will be treated as the email address.
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated mailto link
 * @see clientChange
 * @since 1.0.1
 */
Yii.CHtml.mailto = function (text, email, htmlOptions) {
		if (email === undefined) {
			email = '';
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		if(email==='') {
			email=text;
		}
		return this.link(text,'mailto:'+email,htmlOptions);
	};
/**
 * Generates an image tag.
 * @param {String} src the image URL
 * @param {String} alt the alternative text display
 * @param {Array} htmlOptions additional HTML attributes (see {@link tag}).
 * @returns {String} the generated image tag
 */
Yii.CHtml.image = function (src, alt, htmlOptions) {
		if (alt === undefined) {
			alt = '';
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		htmlOptions.src=src;
		htmlOptions.alt=alt;
		return this.tag('img',htmlOptions);
	};
/**
 * Generates a button.
 * @param {String} labelVar the button label
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated button tag
 * @see clientChange
 */
Yii.CHtml.button = function (labelVar, htmlOptions) {
		var count;
		if (labelVar === undefined) {
			labelVar = 'button';
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		if(htmlOptions.name === undefined) {
			htmlOptions.name=this.ID_PREFIX+this.count++;
		}
		if(htmlOptions.type === undefined) {
			htmlOptions.type='button';
		}
		htmlOptions.value=labelVar;
		
		this.clientChange('click',htmlOptions);
		return this.tag('input',htmlOptions);
	};
/**
 * Generates a button using HTML button tag.
 * This method is similar to {@link button} except that it generates a 'button'
 * tag instead of 'input' tag.
 * @param {String} labelVar the button label. Note that this value will be directly inserted in the button element
 * without being HTML-encoded.
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated button tag
 * @see clientChange
 * @since 1.0.8
 */
Yii.CHtml.htmlButton = function (labelVar, htmlOptions) {
		var count;
		if (labelVar === undefined) {
			labelVar = 'button';
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		if(htmlOptions.name === undefined) {
			htmlOptions.name=this.ID_PREFIX+this.count++;
		}
		if(htmlOptions.type === undefined) {
			htmlOptions.type='button';
		}
		this.clientChange('click',htmlOptions);
		return this.tag('button',htmlOptions,labelVar);
	};
/**
 * Generates a submit button.
 * @param {String} labelVar the button label
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated button tag
 * @see clientChange
 */
Yii.CHtml.submitButton = function (labelVar, htmlOptions) {
		if (labelVar === undefined) {
			labelVar = 'submit';
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		htmlOptions.type='submit';
		return this.button(labelVar,htmlOptions);
	};
/**
 * Generates a reset button.
 * @param {String} labelVar the button label
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated button tag
 * @see clientChange
 */
Yii.CHtml.resetButton = function (labelVar, htmlOptions) {
		if (labelVar === undefined) {
			labelVar = 'reset';
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		htmlOptions.type='reset';
		return this.button(labelVar,htmlOptions);
	};
/**
 * Generates an image submit button.
 * @param {String} src the image URL
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated button tag
 * @see clientChange
 */
Yii.CHtml.imageButton = function (src, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		htmlOptions.src=src;
		htmlOptions.type='image';
		return this.button('submit',htmlOptions);
	};
/**
 * Generates a link submit button.
 * @param {String} labelVar the button label
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated button tag
 * @see clientChange
 */
Yii.CHtml.linkButton = function (labelVar, htmlOptions) {
		if (labelVar === undefined) {
			labelVar = 'submit';
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		if(htmlOptions.submit === undefined) {
			htmlOptions.submit=htmlOptions.href !== undefined ? htmlOptions.href : '';
		}
		return this.link(labelVar,'#',htmlOptions);
	};
/**
 * Generates a label tag.
 * @param {String} labelVar label text. Note, you should HTML-encode the text if needed.
 * @param {String} forVar the ID of the HTML element that this label is associated with.
 * If this is false, the 'for' attribute for the label tag will not be rendered (since version 1.0.11).
 * @param {Array} htmlOptions additional HTML attributes.
 * Starting from version 1.0.2, the following HTML option is recognized:
 * <ul>
 * <li>required: if this is set and is true, the label will be styled
 * with CSS class 'required' (customizable with CHtml::$requiredCss),
 * and be decorated with {@link CHtml::beforeRequiredLabel} and
 * {@link CHtml::afterRequiredLabel}.</li>
 * </ul>
 * @returns {String} the generated label tag
 */
Yii.CHtml.label = function (labelVar, forVar, htmlOptions) {
		var requiredCss, beforeRequiredLabel, afterRequiredLabel;
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		if(forVar===false) {
			delete htmlOptions['for'];
		}
		else {
			htmlOptions['for']=forVar;
		}
		if(htmlOptions.required !== undefined) {
			if(htmlOptions.required) {
				if(htmlOptions['class'] !== undefined) {
					htmlOptions['class']+=' '+this.requiredCss;
				}
				else {
					htmlOptions['class']=this.requiredCss;
				}
				labelVar=this.beforeRequiredLabel+labelVar+this.afterRequiredLabel;
			}
			delete htmlOptions.required;
		}
		return this.tag('label',htmlOptions,labelVar);
	};
/**
 * Generates a text field input.
 * @param {String} name the input name
 * @param {String} value the input value
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated input field
 * @see clientChange
 * @see inputField
 */
Yii.CHtml.textField = function (name, value, htmlOptions) {
		if (value === undefined) {
			value = '';
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		this.clientChange('change',htmlOptions);
		return this.inputField('text',name,value,htmlOptions);
	};
/**
 * Generates a hidden input.
 * @param {String} name the input name
 * @param {String} value the input value
 * @param {Array} htmlOptions additional HTML attributes (see {@link tag}).
 * @returns {String} the generated input field
 * @see inputField
 */
Yii.CHtml.hiddenField = function (name, value, htmlOptions) {
		if (value === undefined) {
			value = '';
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return this.inputField('hidden',name,value,htmlOptions);
	};
/**
 * Generates a password field input.
 * @param {String} name the input name
 * @param {String} value the input value
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated input field
 * @see clientChange
 * @see inputField
 */
Yii.CHtml.passwordField = function (name, value, htmlOptions) {
		if (value === undefined) {
			value = '';
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		this.clientChange('change',htmlOptions);
		return this.inputField('password',name,value,htmlOptions);
	};
/**
 * Generates a file input.
 * Note, you have to set the enclosing form's 'enctype' attribute to be 'multipart/form-data'.
 * After the form is submitted, the uploaded file information can be obtained via $_FILES[$name] (see
 * PHP documentation).
 * @param {String} name the input name
 * @param {String} value the input value
 * @param {Array} htmlOptions additional HTML attributes (see {@link tag}).
 * @returns {String} the generated input field
 * @see inputField
 */
Yii.CHtml.fileField = function (name, value, htmlOptions) {
		if (value === undefined) {
			value = '';
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		return this.inputField('file',name,value,htmlOptions);
	};
/**
 * Generates a text area input.
 * @param {String} name the input name
 * @param {String} value the input value
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated text area
 * @see clientChange
 * @see inputField
 */
Yii.CHtml.textArea = function (name, value, htmlOptions) {
		if (value === undefined) {
			value = '';
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		htmlOptions.name=name;
		if(htmlOptions.id === undefined) {
			htmlOptions.id=this.getIdByName(name);
		}
		else if(htmlOptions.id===false) {
			delete htmlOptions.id;
		}
		this.clientChange('change',htmlOptions);
		return this.tag('textarea',htmlOptions,htmlOptions.encode !== undefined && !htmlOptions.encode ? value : this.encode(value));
	};
/**
 * Generates a radio button.
 * @param {String} name the input name
 * @param {Boolean} checked whether the radio button is checked
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * Since version 1.1.2, a special option named 'uncheckValue' is available that can be used to specify
 * the value returned when the radio button is not checked. When set, a hidden field is rendered so that
 * when the radio button is not checked, we can still obtain the posted uncheck value.
 * If 'uncheckValue' is not set or set to NULL, the hidden field will not be rendered.
 * @returns {String} the generated radio button
 * @see clientChange
 * @see inputField
 */
Yii.CHtml.radioButton = function (name, checked, htmlOptions) {
		var value, uncheck, uncheckOptions, hidden;
		if (checked === undefined) {
			checked = false;
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		if(checked) {
			htmlOptions.checked='checked';
		}
		else {
			delete htmlOptions.checked;
		}
		value=htmlOptions.value !== undefined ? htmlOptions.value : 1;
		this.clientChange('click',htmlOptions);
		if(htmlOptions.uncheckValue !== undefined) {
			uncheck=htmlOptions.uncheckValue;
			delete htmlOptions.uncheckValue;
		}
		else {
			uncheck=null;
		}
		if(uncheck!==null) {
			// add a hidden field so that if the radio button is not selected, it still submits a value
			if(htmlOptions.id !== undefined && htmlOptions.id!==false) {
				uncheckOptions={'id':this.ID_PREFIX+htmlOptions.id};
			}
			else {
				uncheckOptions={'id':false};
			}
			hidden=this.hiddenField(name,uncheck,uncheckOptions);
		}
		else {
			hidden='';
		}
		// add a hidden field so that if the radio button is not selected, it still submits a value
		return hidden + this.inputField('radio',name,value,htmlOptions);
	};
/**
 * Generates a check box.
 * @param {String} name the input name
 * @param {Boolean} checked whether the check box is checked
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * Since version 1.1.2, a special option named 'uncheckValue' is available that can be used to specify
 * the value returned when the checkbox is not checked. When set, a hidden field is rendered so that
 * when the checkbox is not checked, we can still obtain the posted uncheck value.
 * If 'uncheckValue' is not set or set to NULL, the hidden field will not be rendered.
 * @returns {String} the generated check box
 * @see clientChange
 * @see inputField
 */
Yii.CHtml.checkBox = function (name, checked, htmlOptions) {
		var value, uncheck, uncheckOptions, hidden;
		if (checked === undefined) {
			checked = false;
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		if(checked) {
			htmlOptions.checked='checked';
		}
		else {
			delete htmlOptions.checked;
		}
		value=htmlOptions.value !== undefined ? htmlOptions.value : 1;
		this.clientChange('click',htmlOptions);
		if(htmlOptions.uncheckValue !== undefined) {
			uncheck=htmlOptions.uncheckValue;
			delete htmlOptions.uncheckValue;
		}
		else {
			uncheck=null;
		}
		if(uncheck!==null) {
			// add a hidden field so that if the radio button is not selected, it still submits a value
			if(htmlOptions.id !== undefined && htmlOptions.id!==false) {
				uncheckOptions={'id':this.ID_PREFIX+htmlOptions.id};
			}
			else {
				uncheckOptions={'id':false};
			}
			hidden=this.hiddenField(name,uncheck,uncheckOptions);
		}
		else {
			hidden='';
		}
		// add a hidden field so that if the checkbox  is not selected, it still submits a value
		return hidden + this.inputField('checkbox',name,value,htmlOptions);
	};
/**
 * Generates a drop down list.
 * @param {String} name the input name
 * @param {String} select the selected value
 * @param {Array} data data for generating the list options (value=>display).
 * You may use {@link listData} to generate this data.
 * Please refer to {@link listOptions} on how this data is used to generate the list options.
 * Note, the values and labels will be automatically HTML-encoded by this method.
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are recognized. See {@link clientChange} and {@link tag} for more details.
 * In addition, the following options are also supported specifically for dropdown list:
 * <ul>
 * <li>encode: boolean, specifies whether to encode the values. Defaults to true. This option has been available since version 1.0.5.</li>
 * <li>prompt: string, specifies the prompt text shown as the first list option. Its value is empty. Note, the prompt text will NOT be HTML-encoded.</li>
 * <li>empty: string, specifies the text corresponding to empty selection. Its value is empty.
 * Starting from version 1.0.10, the 'empty' option can also be an array of value-label pairs.
 * Each pair will be used to render a list option at the beginning. Note, the text label will NOT be HTML-encoded.</li>
 * <li>options: array, specifies additional attributes for each OPTION tag.
 *     The array keys must be the option values, and the array values are the extra
 *     OPTION tag attributes in the name-value pairs. For example,
 * <pre>
 *     {
 *         'value1':{'disabled':true, 'label':'value 1'),
 *         'value2':{'label':'value 2'},
 *     };
 * </pre>
 *     This option has been available since version 1.0.3.
 * </li>
 * </ul>
 * @returns {String} the generated drop down list
 * @see clientChange
 * @see inputField
 * @see listData
 */
Yii.CHtml.dropDownList = function (name, select, data, htmlOptions) {
		var options;
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		htmlOptions.name=name;
		if(htmlOptions.id === undefined) {
			htmlOptions.id=this.getIdByName(name);
		}
		else if(htmlOptions.id===false) {
			delete htmlOptions.id;
		}
		this.clientChange('change',htmlOptions);
		options="\n"+this.listOptions(select,data,htmlOptions);
		return this.tag('select',htmlOptions,options);
	};
/**
 * Generates a list box.
 * @param {String} name the input name
 * @param {Mixed} select the selected value(s). This can be either a string for single selection or an array for multiple selections.
 * @param {Array} data data for generating the list options (value=>display)
 * You may use {@link listData} to generate this data.
 * Please refer to {@link listOptions} on how this data is used to generate the list options.
 * Note, the values and labels will be automatically HTML-encoded by this method.
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized. See {@link clientChange} and {@link tag} for more details.
 * In addition, the following options are also supported specifically for list box:
 * <ul>
 * <li>encode: boolean, specifies whether to encode the values. Defaults to true. This option has been available since version 1.0.5.</li>
 * <li>prompt: string, specifies the prompt text shown as the first list option. Its value is empty. Note, the prompt text will NOT be HTML-encoded.</li>
 * <li>empty: string, specifies the text corresponding to empty selection. Its value is empty.
 * Starting from version 1.0.10, the 'empty' option can also be an array of value-label pairs.
 * Each pair will be used to render a list option at the beginning. Note, the text label will NOT be HTML-encoded.</li>
 * <li>options: array, specifies additional attributes for each OPTION tag.
 *     The array keys must be the option values, and the array values are the extra
 *     OPTION tag attributes in the name-value pairs. For example,
 * <pre>
 *     {
 *         'value1':{'disabled':true, 'label':'value 1'),
 *         'value2':{'label':'value 2'},
 *     };
 * </pre>
 *     This option has been available since version 1.0.3.
 * </li>
 * </ul>
 * @returns {String} the generated list box
 * @see clientChange
 * @see inputField
 * @see listData
 */
Yii.CHtml.listBox = function (name, select, data, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		if(htmlOptions.size === undefined) {
			htmlOptions.size=4;
		}
		if(htmlOptions.multiple !== undefined) {
			if(name.slice(-2)!=='[]') {
				name+='[]';
			}
		}
		return this.dropDownList(name,select,data,htmlOptions);
	};
/**
 * Generates a check box list.
 * A check box list allows multiple selection, like {@link listBox}.
 * As a result, the corresponding POST value is an array.
 * @param {String} name name of the check box list. You can use this name to retrieve
 * the selected value(s) once the form is submitted.
 * @param {Mixed} select selection of the check boxes. This can be either a string
 * for single selection or an array for multiple selections.
 * @param {Array} data value-label pairs used to generate the check box list.
 * Note, the values will be automatically HTML-encoded, while the labels will not.
 * @param {Array} htmlOptions addtional HTML options. The options will be applied to
 * each checkbox input. The following special options are recognized:
 * <ul>
 * <li>template: string, specifies how each checkbox is rendered. Defaults
 * to "{input} {label}", where "{input}" will be replaced by the generated
 * check box input tag while "{label}" be replaced by the corresponding check box label.</li>
 * <li>separator: string, specifies the string that separates the generated check boxes.</li>
 * <li>checkAll: string, specifies the label for the "check all" checkbox.
 * If this option is specified, a 'check all' checkbox will be displayed. Clicking on
 * this checkbox will cause all checkboxes checked or unchecked. This option has been
 * available since version 1.0.4.</li>
 * <li>checkAllLast: boolean, specifies whether the 'check all' checkbox should be
 * displayed at the end of the checkbox list. If this option is not set (default)
 * or is false, the 'check all' checkbox will be displayed at the beginning of
 * the checkbox list. This option has been available since version 1.0.4.</li>
 * <li>labelOptions: array, specifies the additional HTML attributes to be rendered
 * for every label tag in the list. This option has been available since version 1.0.10.</li>
 * </ul>
 * @returns {String} the generated check box list
 */
Yii.CHtml.checkBoxList = function (name, select, data, htmlOptions) {
		var template, separator, checkAllLabel, checkAllLast, labelOptions, items, baseID, id, checkAll, checked, value, option, labelVar, item, js, cs;
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		template=htmlOptions.template !== undefined?htmlOptions.template:'{input} {label}';
		separator=htmlOptions.separator !== undefined?htmlOptions.separator:"<br/>\n";
		delete htmlOptions.template;
		if(name.slice(-2)!=='[]') {
			name+='[]';
		}
		if(htmlOptions.checkAll !== undefined) {
			checkAllLabel=htmlOptions.checkAll;
			checkAllLast=htmlOptions.checkAllLast !== undefined && htmlOptions.checkAllLast;
		}
		delete htmlOptions.checkAll;
		labelOptions=htmlOptions.labelOptions !== undefined?htmlOptions.labelOptions:{};
		delete htmlOptions.labelOptions;
		items=[];
		baseID=this.getIdByName(name);
		id=0;
		checkAll=true;
		for (value in data) {
			if (data.hasOwnProperty(value)) {
				labelVar = data[value];
				checked=Object.prototype.toString.call(select) !== '[object Array]' && !php.strcmp(value,select) || Object.prototype.toString.call(select) === '[object Array]' && php.in_array(value,select);
				checkAll=checkAll && checked;
				htmlOptions.value=value;
				htmlOptions.id=baseID+'_'+id++;
				option=this.checkBox(name,checked,htmlOptions);
				labelVar=this.label(labelVar,htmlOptions.id,labelOptions);
				items.push(php.strtr(template,{'{input}':option,'{label}':labelVar}));
			}
		}
		if(checkAllLabel !== undefined)	{
			htmlOptions.value=1;
			htmlOptions.id=id=baseID+'_all';
			option=this.checkBox(id,checkAll,htmlOptions);
			labelVar=this.label(checkAllLabel,id,labelOptions);
			item=php.strtr(template,{'{input}':option,'{label}':labelVar});
			if(checkAllLast) {
				items.push(item);
			}
			else {
				php.array_unshift(items,item);
			}
			name=php.strtr(name,{'[':'\\[',']':'\\]'});
			jQuery('#' + id).click(function() {
				jQuery("input[name='" + name+ "']").attr('checked', this.checked);
			});
			jQuery("input[name='" + name+ "']").click(function() {
				jQuery('#' + id).attr('checked', !jQuery("input[name='" + name+ "']:not(:checked)").length);
			});
			jQuery('#' + id).attr('checked', !jQuery("input[name='" + name+ "']:not(:checked)").length);
		}
		return items.join(separator);
	};
/**
 * Generates a radio button list.
 * A radio button list is like a {@link checkBoxList check box list}, except that
 * it only allows single selection.
 * @param {String} name name of the radio button list. You can use this name to retrieve
 * the selected value(s) once the form is submitted.
 * @param {Mixed} select selection of the radio buttons. This can be either a string
 * for single selection or an array for multiple selections.
 * @param {Array} data value-label pairs used to generate the radio button list.
 * Note, the values will be automatically HTML-encoded, while the labels will not.
 * @param {Array} htmlOptions addtional HTML options. The options will be applied to
 * each radio button input. The following special options are recognized:
 * <ul>
 * <li>template: string, specifies how each radio button is rendered. Defaults
 * to "{input} {label}", where "{input}" will be replaced by the generated
 * radio button input tag while "{label}" will be replaced by the corresponding radio button label.</li>
 * <li>separator: string, specifies the string that separates the generated radio buttons.</li>
 * <li>labelOptions: array, specifies the additional HTML attributes to be rendered
 * for every label tag in the list. This option has been available since version 1.0.10.</li>
 * </ul>
 * @returns {String} the generated radio button list
 */
Yii.CHtml.radioButtonList = function (name, select, data, htmlOptions) {
		var template, label, separator, labelOptions, items, baseID, id, checked, value, option, labelVar;
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		template=htmlOptions.template !== undefined?htmlOptions.template:'{input} {label}';
		separator=htmlOptions.separator !== undefined?htmlOptions.separator:"<br/>\n";
		delete htmlOptions.template;
		labelOptions=htmlOptions.labelOptions !== undefined?htmlOptions.labelOptions:{};
		delete htmlOptions.labelOptions;
		items=[];
		baseID=this.getIdByName(name);
		id=0;
		for (value in data)	{
			if (data.hasOwnProperty(value)) {
				label = data[value];
				checked=!php.strcmp(value,select);
				htmlOptions.value=value;
				htmlOptions.id=baseID+'_'+id++;
				option=this.radioButton(name,checked,htmlOptions);
				labelVar=this.label(labelVar,htmlOptions.id,labelOptions);
				items.push(php.strtr(template,{'{input}':option,'{label}':labelVar}));
			}
		}
		return items.join(separator);
	};
/**
 * Generates a link that can initiate AJAX requests.
 * @param {String} text the link body (it will NOT be HTML-encoded.)
 * @param {Mixed} url the URL for the AJAX request. If empty, it is assumed to be the current URL. See {@link normalizeUrl} for more details.
 * @param {Array} ajaxOptions AJAX options (see {@link ajax})
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated link
 * @see normalizeUrl
 * @see ajax
 */
Yii.CHtml.ajaxLink = function (text, url, ajaxOptions, htmlOptions) {
		if (ajaxOptions === undefined) {
			ajaxOptions = {};
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		if(htmlOptions.href === undefined) {
			htmlOptions.href='#';
		}
		ajaxOptions.url=url;
		htmlOptions.ajax=ajaxOptions;
		this.clientChange('click',htmlOptions);
		return this.tag('a',htmlOptions,text);
	};
/**
 * Generates a push button that can initiate AJAX requests.
 * @param {String} labelVar the button label
 * @param {Mixed} url the URL for the AJAX request. If empty, it is assumed to be the current URL. See {@link normalizeUrl} for more details.
 * @param {Array} ajaxOptions AJAX options (see {@link ajax})
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated button
 */
Yii.CHtml.ajaxButton = function (labelVar, url, ajaxOptions, htmlOptions) {
		if (ajaxOptions === undefined) {
			ajaxOptions = {};
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		ajaxOptions.url=url;
		htmlOptions.ajax=ajaxOptions;
		return this.button(labelVar,htmlOptions);
	};
/**
 * Generates a push button that can submit the current form in POST method.
 * @param {String} labelVar the button label
 * @param {Mixed} url the URL for the AJAX request. If empty, it is assumed to be the current URL. See {@link normalizeUrl} for more details.
 * @param {Array} ajaxOptions AJAX options (see {@link ajax})
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated button
 */
Yii.CHtml.ajaxSubmitButton = function (labelVar, url, ajaxOptions, htmlOptions) {
		if (ajaxOptions === undefined) {
			ajaxOptions = {};
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		ajaxOptions.type='POST';
		htmlOptions.type='submit';
		return this.ajaxButton(labelVar,url,ajaxOptions,htmlOptions);
	};
/**
 * Generates the JavaScript that initiates an AJAX request.
 * @param {Array} options AJAX options. The valid options are specified in the jQuery ajax documentation.
 * The following special options are added for convenience:
 * <ul>
 * <li>update: string, specifies the selector whose HTML content should be replaced
 *   by the AJAX request result.</li>
 * <li>replace: string, specifies the selector whose target should be replaced
 *   by the AJAX request result.</li>
 * </ul>
 * Note, if you specify the 'success' option, the above options will be ignored.
 * @returns {String} the generated JavaScript
 * @see http://docs.jquery.com/Ajax/jQuery.ajax#options
 */
Yii.CHtml.ajax = function (options) {
		var i, name, funcs, limit;
		Yii.app().getClientScript().registerCoreScript('jquery');
		if(options.url === undefined) {
			options.url=location.href;
		}
		else {
			options.url=this.normalizeUrl(options.url);
		}
		if(options.cache === undefined) {
			options.cache=false;
		}
		if(options.data === undefined && options.type !== undefined) {
			options.data=jQuery(this).parents("form").serialize();
		}
		funcs = ['beforeSend','complete','error','success'];
		limit = funcs.length;
		for (i = 0; i < limit; i++) {
			name = funcs[i];
			if(options[name] !== undefined) {
				options[name]=options[name];
			}
		}
		if(options.update !== undefined) {
			if(options.success === undefined) {
				options.success=function(html){jQuery(options.update).html(html);};
			}
			delete options.update;
		}
		if(options.replace !== undefined) {
			if(options.success === undefined) {
				options.success=function(html){jQuery(options.replace).replaceWith(html);};
			}
			delete options.replace;
		}
		return jQuery.ajax(Yii.CJavaScript.encode(options));
	};
/**
 * Generates the URL for the published assets.
 * @param {String} path the path of the asset to be published
 * @param {Boolean} hashByName whether the published directory should be named as the hashed basename.
 * If false, the name will be the hashed dirname of the path being published.
 * Defaults to false. Set true if the path being published is shared among
 * different extensions.
 * @returns {String} the asset URL
 */
Yii.CHtml.asset = function (path, hashByName) {
		if (hashByName === undefined) {
			hashByName = false;
		}
		return Yii.app().getAssetManager().publish(path,hashByName);
	};
/**
 * Normalizes the input parameter to be a valid URL.
 * 
 * If the input parameter is an empty string, the currently requested URL will be returned.
 * 
 * If the input parameter is a non-empty string, it is treated as a valid URL and will
 * be returned without any change.
 * 
 * If the input parameter is an array, it is treated as a controller route and a list of
 * GET parameters, and the {@link CController::createUrl} method will be invoked to
 * create a URL. In this case, the first array element refers to the controller route,
 * and the rest key-value pairs refer to the additional GET parameters for the URL.
 * For example, <code>array('post/list', 'page'=>3)</code> may be used to generate the URL
 * <code>/index.php?r=post/list&page=3</code>.
 * 
 * @param {Mixed} url the parameter to be used to generate a valid URL
 * @returns {String} the normalized URL
 */
Yii.CHtml.normalizeUrl = function (url) {
		var c;
		if (url === null || url === undefined) {
			url = '';
		}
		if(Object.prototype.toString.call(url) === '[object Array]') {
			if(url[0] !== undefined) {
				if((c=Yii.app().getController())!==null) {
					url=c.createUrl(url[0],url[1]);
				}
				else {
					url=Yii.app().createUrl(url[0],url[1]);
				}
			}
			else {
				url='';
			}
		}
		return url==='' ? Yii.app().getRequest().getUrl() : url;
	};
/**
 * Generates an input HTML tag.
 * This method generates an input HTML tag based on the given input name and value.
 * @param {String} type the input type (e.g. 'text', 'radio')
 * @param {String} name the input name
 * @param {String} value the input value
 * @param {Array} htmlOptions additional HTML attributes for the HTML tag (see {@link tag}).
 * @returns {String} the generated input tag
 */
Yii.CHtml.inputField = function (type, name, value, htmlOptions) {
		htmlOptions.type=type;
		htmlOptions.value=value;
		htmlOptions.name=name;
		if(htmlOptions.id === undefined) {
			htmlOptions.id=this.getIdByName(name);
		}
		else if(htmlOptions.id===false) {
			delete htmlOptions.id;
		}
		return this.tag('input',htmlOptions);
	};
/**
 * Generates a label tag for a model attribute.
 * The label text is the attribute label and the label is associated with
 * the input for the attribute (see {@link CModel::getAttributeLabel}.
 * If the attribute has input error, the label's CSS class will be appended with {@link errorCss}.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes. The following special options are recognized:
 * <ul>
 * <li>required: if this is set and is true, the label will be styled
 * with CSS class 'required' (customizable with CHtml::$requiredCss),
 * and be decorated with {@link CHtml::beforeRequiredLabel} and
 * {@link CHtml::afterRequiredLabel}. This option has been available since version 1.0.2.</li>
 * <li>label: this specifies the label to be displayed. If this is not set,
 * {@link CModel::getAttributeLabel} will be called to get the label for display.
 * If the label is specified as false, no label will be rendered.
 * This option has been available since version 1.0.4.</li>
 * </ul>
 * @returns {String} the generated label tag
 */
Yii.CHtml.activeLabel = function (model, attribute, htmlOptions) {
		var forVar, labelVar;
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		if(htmlOptions['for'] !== undefined) {
			forVar=htmlOptions['for'];
			delete htmlOptions['for'];
		}
		else {
			forVar=this.getIdByName(this.resolveName(model,attribute));
		}
		if(htmlOptions.label !== undefined) {
			if((labelVar=htmlOptions.label)===false) {
				return '';
			}
			delete htmlOptions.label;
		}
		else {
			labelVar=model.getAttributeLabel(attribute);
		}
		if(model.hasErrors(attribute)) {
			this.addErrorCss(htmlOptions);
		}
		return this.label(labelVar,forVar,htmlOptions);
	};
/**
 * Generates a label tag for a model attribute.
 * This is an enhanced version of {@link activeLabel}. It will render additional
 * CSS class and mark when the attribute is required.
 * In particular, it calls {@link CModel::isAttributeRequired} to determine
 * if the attribute is required.
 * If so, it will add a CSS class {@link CHtml::requiredCss} to the label,
 * and decorate the label with {@link CHtml::beforeRequiredLabel} and
 * {@link CHtml::afterRequiredLabel}.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes.
 * @returns {String} the generated label tag
 * @since 1.0.2
 */
Yii.CHtml.activeLabelEx = function (model, attribute, htmlOptions) {
		var realAttribute;
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		realAttribute=attribute;
		this.resolveName(model,attribute); // strip off square brackets if any
		htmlOptions.required=model.isAttributeRequired(attribute);
		return this.activeLabel(model,realAttribute,htmlOptions);
	};
/**
 * Generates a text field input for a model attribute.
 * If the attribute has input error, the input field's CSS class will
 * be appended with {@link errorCss}.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated input field
 * @see clientChange
 * @see activeInputField
 */
Yii.CHtml.activeTextField = function (model, attribute, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		this.resolveNameID(model,attribute,htmlOptions);
		this.clientChange('change',htmlOptions);
		return this.activeInputField('text',model,attribute,htmlOptions);
	};
/**
 * Generates a hidden input for a model attribute.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes.
 * @returns {String} the generated input field
 * @see activeInputField
 */
Yii.CHtml.activeHiddenField = function (model, attribute, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		this.resolveNameID(model,attribute,htmlOptions);
		return this.activeInputField('hidden',model,attribute,htmlOptions);
	};
/**
 * Generates a password field input for a model attribute.
 * If the attribute has input error, the input field's CSS class will
 * be appended with {@link errorCss}.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated input field
 * @see clientChange
 * @see activeInputField
 */
Yii.CHtml.activePasswordField = function (model, attribute, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		this.resolveNameID(model,attribute,htmlOptions);
		this.clientChange('change',htmlOptions);
		return this.activeInputField('password',model,attribute,htmlOptions);
	};
/**
 * Generates a text area input for a model attribute.
 * If the attribute has input error, the input field's CSS class will
 * be appended with {@link errorCss}.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * @returns {String} the generated text area
 * @see clientChange
 */
Yii.CHtml.activeTextArea = function (model, attribute, htmlOptions) {
		var text;
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		this.resolveNameID(model,attribute,htmlOptions);
		
		this.clientChange('change',htmlOptions);
		if(model.hasErrors(attribute)) {
			this.addErrorCss(htmlOptions);
		}
		text=this.resolveValue(model,attribute);
		return this.tag('textarea',htmlOptions,htmlOptions.encode !== undefined && !htmlOptions.encode ? text : this.encode(text));
	};
/**
 * Generates a file input for a model attribute.
 * Note, you have to set the enclosing form's 'enctype' attribute to be 'multipart/form-data'.
 * After the form is submitted, the uploaded file information can be obtained via $_FILES (see
 * PHP documentation).
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes (see {@link tag}).
 * @returns {String} the generated input field
 * @see activeInputField
 */
Yii.CHtml.activeFileField = function (model, attribute, htmlOptions) {
		var hiddenOptions;
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		this.resolveNameID(model,attribute,htmlOptions);
		// add a hidden field so that if a model only has a file field, we can
		// still use isset($_POST[$modelClass]) to detect if the input is submitted
		hiddenOptions=htmlOptions.id !== undefined ? {'id':this.ID_PREFIX+htmlOptions.id} : {'id':false};
		return this.hiddenField(htmlOptions.name,'',hiddenOptions) + this.activeInputField('file',model,attribute,htmlOptions);
	};
/**
 * Generates a radio button for a model attribute.
 * If the attribute has input error, the input field's CSS class will
 * be appended with {@link errorCss}.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * Since version 1.0.9, a special option named 'uncheckValue' is available that can be used to specify
 * the value returned when the radio button is not checked. By default, this value is '0'.
 * Internally, a hidden field is rendered so that when the radio button is not checked,
 * we can still obtain the posted uncheck value.
 * If 'uncheckValue' is set as NULL, the hidden field will not be rendered.
 * @returns {String} the generated radio button
 * @see clientChange
 * @see activeInputField
 */
Yii.CHtml.activeRadioButton = function (model, attribute, htmlOptions) {
		var uncheck, hiddenOptions, hidden;
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		this.resolveNameID(model,attribute,htmlOptions);
		if(htmlOptions.value === undefined) {
			htmlOptions.value=1;
		}
		if(htmlOptions.checked === undefined && this.resolveValue(model,attribute)==htmlOptions.value) {
			htmlOptions.checked='checked';
		}
		this.clientChange('click',htmlOptions);
		if(htmlOptions.uncheckValue !== undefined) {
			uncheck=htmlOptions.uncheckValue;
			delete htmlOptions.uncheckValue;
		}
		else {
			uncheck='0';
		}
		hiddenOptions=htmlOptions.id !== undefined ? {'id':this.ID_PREFIX+htmlOptions.id} : {'id':false};
		hidden=uncheck!==null ? this.hiddenField(htmlOptions.name,uncheck,hiddenOptions) : '';
		// add a hidden field so that if the radio button is not selected, it still submits a value
		return hidden + this.activeInputField('radio',model,attribute,htmlOptions);
	};
/**
 * Generates a check box for a model attribute.
 * The attribute is assumed to take either true or false value.
 * If the attribute has input error, the input field's CSS class will
 * be appended with {@link errorCss}.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are also recognized (see {@link clientChange} and {@link tag} for more details.)
 * Since version 1.0.2, a special option named 'uncheckValue' is available that can be used to specify
 * the value returned when the checkbox is not checked. By default, this value is '0'.
 * Internally, a hidden field is rendered so that when the checkbox is not checked,
 * we can still obtain the posted uncheck value.
 * If 'uncheckValue' is set as NULL, the hidden field will not be rendered.
 * @returns {String} the generated check box
 * @see clientChange
 * @see activeInputField
 */
Yii.CHtml.activeCheckBox = function (model, attribute, htmlOptions) {
		var uncheck, hiddenOptions, hidden;
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		this.resolveNameID(model,attribute,htmlOptions);
		if(htmlOptions.value === undefined) {
			htmlOptions.value=1;
		}
		if(htmlOptions.checked === undefined && this.resolveValue(model,attribute)==htmlOptions.value) {
			htmlOptions.checked='checked';
		}
		this.clientChange('click',htmlOptions);
		if(htmlOptions.uncheckValue !== undefined) {
			uncheck=htmlOptions.uncheckValue;
			delete htmlOptions.uncheckValue;
		}
		else {
			uncheck='0';
		}
		hiddenOptions=htmlOptions.id !== undefined ? {'id':this.ID_PREFIX+htmlOptions.id} : {'id':false};
		hidden=uncheck!==null ? this.hiddenField(htmlOptions.name,uncheck,hiddenOptions) : '';
		return hidden + this.activeInputField('checkbox',model,attribute,htmlOptions);
	};
/**
 * Generates a drop down list for a model attribute.
 * If the attribute has input error, the input field's CSS class will
 * be appended with {@link errorCss}.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} data data for generating the list options (value=>display)
 * You may use {@link listData} to generate this data.
 * Please refer to {@link listOptions} on how this data is used to generate the list options.
 * Note, the values and labels will be automatically HTML-encoded by this method.
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are recognized. See {@link clientChange} and {@link tag} for more details.
 * In addition, the following options are also supported:
 * <ul>
 * <li>encode: boolean, specifies whether to encode the values. Defaults to true. This option has been available since version 1.0.5.</li>
 * <li>prompt: string, specifies the prompt text shown as the first list option. Its value is empty.  Note, the prompt text will NOT be HTML-encoded.</li>
 * <li>empty: string, specifies the text corresponding to empty selection. Its value is empty.
 * Starting from version 1.0.10, the 'empty' option can also be an array of value-label pairs.
 * Each pair will be used to render a list option at the beginning. Note, the text label will NOT be HTML-encoded.</li>
 * <li>options: array, specifies additional attributes for each OPTION tag.
 *     The array keys must be the option values, and the array values are the extra
 *     OPTION tag attributes in the name-value pairs. For example,
 * <pre>
 *     {
 *         'value1':{'disabled':true, 'label':'value 1'),
 *         'value2':{'label':'value 2'},
 *     };
 * </pre>
 *     This option has been available since version 1.0.3.
 * </li>
 * </ul>
 * @returns {String} the generated drop down list
 * @see clientChange
 * @see listData
 */
Yii.CHtml.activeDropDownList = function (model, attribute, data, htmlOptions) {
		var selection, options;
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		this.resolveNameID(model,attribute,htmlOptions);
		selection=this.resolveValue(model,attribute);
		options="\n"+this.listOptions(selection,data,htmlOptions);
		this.clientChange('change',htmlOptions);
		if(model.hasErrors(attribute)) {
			this.addErrorCss(htmlOptions);
		}
		if(htmlOptions.multiple !== undefined) {
			if(htmlOptions.name.slice(-2)!=='[]') {
				htmlOptions.name+='[]';
			}
		}
		return this.tag('select',htmlOptions,options);
	};
/**
 * Generates a list box for a model attribute.
 * The model attribute value is used as the selection.
 * If the attribute has input error, the input field's CSS class will
 * be appended with {@link errorCss}.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} data data for generating the list options (value=>display)
 * You may use {@link listData} to generate this data.
 * Please refer to {@link listOptions} on how this data is used to generate the list options.
 * Note, the values and labels will be automatically HTML-encoded by this method.
 * @param {Array} htmlOptions additional HTML attributes. Besides normal HTML attributes, a few special
 * attributes are recognized. See {@link clientChange} and {@link tag} for more details.
 * In addition, the following options are also supported:
 * <ul>
 * <li>encode: boolean, specifies whether to encode the values. Defaults to true. This option has been available since version 1.0.5.</li>
 * <li>prompt: string, specifies the prompt text shown as the first list option. Its value is empty. Note, the prompt text will NOT be HTML-encoded.</li>
 * <li>empty: string, specifies the text corresponding to empty selection. Its value is empty.
 * Starting from version 1.0.10, the 'empty' option can also be an array of value-label pairs.
 * Each pair will be used to render a list option at the beginning. Note, the text label will NOT be HTML-encoded.</li>
 * <li>options: array, specifies additional attributes for each OPTION tag.
 *     The array keys must be the option values, and the array values are the extra
 *     OPTION tag attributes in the name-value pairs. For example,
 * <pre>
 *     {
 *         'value1':{'disabled':true, 'label':'value 1'),
 *         'value2':{'label':'value 2'},
 *     };
 * </pre>
 *     This option has been available since version 1.0.3.
 * </li>
 * </ul>
 * @returns {String} the generated list box
 * @see clientChange
 * @see listData
 */
Yii.CHtml.activeListBox = function (model, attribute, data, htmlOptions) {
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		if(htmlOptions.size === undefined) {
			htmlOptions.size=4;
		}
		return this.activeDropDownList(model,attribute,data,htmlOptions);
	};
/**
 * Generates a check box list for a model attribute.
 * The model attribute value is used as the selection.
 * If the attribute has input error, the input field's CSS class will
 * be appended with {@link errorCss}.
 * Note that a check box list allows multiple selection, like {@link listBox}.
 * As a result, the corresponding POST value is an array. In case no selection
 * is made, the corresponding POST value is an empty string.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} data value-label pairs used to generate the check box list.
 * Note, the values will be automatically HTML-encoded, while the labels will not.
 * @param {Array} htmlOptions addtional HTML options. The options will be applied to
 * each checkbox input. The following special options are recognized:
 * <ul>
 * <li>template: string, specifies how each checkbox is rendered. Defaults
 * to "{input} {label}", where "{input}" will be replaced by the generated
 * check box input tag while "{label}" will be replaced by the corresponding check box label.</li>
 * <li>separator: string, specifies the string that separates the generated check boxes.</li>
 * <li>checkAll: string, specifies the label for the "check all" checkbox.
 * If this option is specified, a 'check all' checkbox will be displayed. Clicking on
 * this checkbox will cause all checkboxes checked or unchecked. This option has been
 * available since version 1.0.4.</li>
 * <li>checkAllLast: boolean, specifies whether the 'check all' checkbox should be
 * displayed at the end of the checkbox list. If this option is not set (default)
 * or is false, the 'check all' checkbox will be displayed at the beginning of
 * the checkbox list. This option has been available since version 1.0.4.</li>
 * <li>encode: boolean, specifies whether to encode HTML-encode tag attributes and values. Defaults to true.
 * This option has been available since version 1.0.5.</li>
 * </ul>
 * Since 1.1.7, a special option named 'uncheckValue' is available. It can be used to set the value
 * that will be returned when the checkbox is not checked. By default, this value is ''.
 * Internally, a hidden field is rendered so when the checkbox is not checked, we can still
 * obtain the value. If 'uncheckValue' is set to NULL, there will be no hidden field rendered.
 * @returns {String} the generated check box list
 * @see checkBoxList
 */
Yii.CHtml.activeCheckBoxList = function (model, attribute, data, htmlOptions) {
		var selection, name, uncheck, hiddenOptions, hidden;
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		this.resolveNameID(model,attribute,htmlOptions);
		selection=this.resolveValue(model,attribute);
		if(model.hasErrors(attribute)) {
			this.addErrorCss(htmlOptions);
		}
		name=htmlOptions.name;
		delete htmlOptions.name;
		if(htmlOptions.uncheckValue !== undefined)
		{
			uncheck=htmlOptions.uncheckValue;
			delete htmlOptions.uncheckValue;
		}
		else {
			uncheck='';
		}
		hiddenOptions=htmlOptions.id !== undefined ? {'id':this.ID_PREFIX+htmlOptions.id} : {'id':false};
		hidden=uncheck!==null ? this.hiddenField(name,uncheck,hiddenOptions) : '';
		return hidden + this.checkBoxList(name,selection,data,htmlOptions);
	};
/**
 * Generates a radio button list for a model attribute.
 * The model attribute value is used as the selection.
 * If the attribute has input error, the input field's CSS class will
 * be appended with {@link errorCss}.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} data value-label pairs used to generate the radio button list.
 * Note, the values will be automatically HTML-encoded, while the labels will not.
 * @param {Array} htmlOptions addtional HTML options. The options will be applied to
 * each radio button input. The following special options are recognized:
 * <ul>
 * <li>template: string, specifies how each radio button is rendered. Defaults
 * to "{input} {label}", where "{input}" will be replaced by the generated
 * radio button input tag while "{label}" will be replaced by the corresponding radio button label.</li>
 * <li>separator: string, specifies the string that separates the generated radio buttons.</li>
 * <li>encode: boolean, specifies whether to encode HTML-encode tag attributes and values. Defaults to true.
 * This option has been available since version 1.0.5.</li>
 * </ul>
 * Since version 1.1.7, a special option named 'uncheckValue' is available that can be used to specify the value
 * returned when the radio button is not checked. By default, this value is ''. Internally, a hidden field is
 * rendered so that when the radio button is not checked, we can still obtain the posted uncheck value.
 * If 'uncheckValue' is set as NULL, the hidden field will not be rendered.
 * @returns {String} the generated radio button list
 * @see radioButtonList
 */
Yii.CHtml.activeRadioButtonList = function (model, attribute, data, htmlOptions) {
		var selection, name, uncheck, hiddenOptions, hidden;
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		this.resolveNameID(model,attribute,htmlOptions);
		selection=this.resolveValue(model,attribute);
		if(model.hasErrors(attribute)) {
			this.addErrorCss(htmlOptions);
		}
		name=htmlOptions.name;
		delete htmlOptions.name;
		if(htmlOptions.uncheckValue !== undefined) {
			uncheck=htmlOptions.uncheckValue;
			delete htmlOptions.uncheckValue;
		}
		else {
			uncheck='';
		}
		hiddenOptions=htmlOptions.id !== undefined ? {'id':this.ID_PREFIX+htmlOptions.id} : {'id':false};
		hidden=uncheck!==null ? this.hiddenField(name,uncheck,hiddenOptions) : '';
		return hidden + this.radioButtonList(name,selection,data,htmlOptions);
	};
/**
 * Returns the element ID that is used by methods such as {@link activeTextField}.
 * This method has been deprecated since version 1.0.5. Please use {@link activeId} instead.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @returns {String} the element ID for the active field corresponding to the specified model and attribute.
 * @deprecated 1.0.5
 */
Yii.CHtml.getActiveId = function (model, attribute) {
		return this.activeId(model,attribute);
	};
/**
 * Displays a summary of validation errors for one or several models.
 * @param {Mixed} model the models whose input errors are to be displayed. This can be either
 * a single model or an array of models.
 * @param {String} header a piece of HTML code that appears in front of the errors
 * @param {String} footer a piece of HTML code that appears at the end of the errors
 * @param {Array} htmlOptions additional HTML attributes to be rendered in the container div tag.
 * This parameter has been available since version 1.0.7.
 * A special option named 'firstError' is recognized, which when set true, will
 * make the error summary to show only the first error message of each attribute.
 * If this is not set or is false, all error messages will be displayed.
 * This option has been available since version 1.1.3.
 * @returns {String} the error summary. Empty if no errors are found.
 * @see CModel::getErrors
 * @see errorSummaryCss
 */
Yii.CHtml.errorSummary = function (model, header, footer, htmlOptions) {
		var content, firstError, i, n, m, errorsList, j, errors, error, errorSummaryCss;
		if (header === undefined) {
			header = null;
		}
		if (footer === undefined) {
			footer = null;
		}
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		content='';
		if(Object.prototype.toString.call(model) !== '[object Array]') {
			model=[model];
		}
		if(htmlOptions.firstError !== undefined)
		{
			firstError=htmlOptions.firstError;
			delete htmlOptions.firstError;
		}
		else {
			firstError=false;
		}
		for (i in model) {
			if (model.hasOwnProperty(i)) {
				m = model[i];
				errorsList = m.getErrors();
				for (n in errorsList) {
					if (errorsList.hasOwnProperty(n)) {
						errors = errorsList[n];
						for (j in errors) {
							if (errors.hasOwnProperty(j)) {
								error = errors[j];
								if(error!=='') {
									content+="<li>" + error + "</li>\n";
								}
								if(firstError) {
									break;
								}
							}
						}
					}
				}
			}
		}
		if(content!=='') {
			if(header===null) {
				header='<p>'+Yii.t('yii','Please fix the following input errors:')+'</p>';
			}
			if(htmlOptions['class'] === undefined) {
				htmlOptions['class']=this.errorSummaryCss;
			}
			return this.tag('div',htmlOptions,header+"\n<ul>\n" + content + "</ul>"+footer);
		}
		else {
			return '';
		}
	};
/**
 * Displays the first validation error for a model attribute.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute name
 * @param {Array} htmlOptions additional HTML attributes to be rendered in the container div tag.
 * This parameter has been available since version 1.0.7.
 * @returns {String} the error display. Empty if no errors are found.
 * @see CModel::getErrors
 * @see errorMessageCss
 */
Yii.CHtml.error = function (model, attribute, htmlOptions) {
		var error, errorMessageCss;
		if (htmlOptions === undefined) {
			htmlOptions = {};
		}
		error=model.getError(attribute);
		if(error!==null) {
			if(htmlOptions['class'] === undefined) {
				htmlOptions['class']=this.errorMessageCss;
			}
			return this.tag('div',htmlOptions,error);
		}
		else {
			return '';
		}
	};
/**
 * Generates the data suitable for list-based HTML elements.
 * The generated data can be used in {@link dropDownList}, {@link listBox}, {@link checkBoxList},
 * {@link radioButtonList}, and their active-versions (such as {@link activeDropDownList}).
 * Note, this method does not HTML-encode the generated data. You may call {@link encodeArray} to
 * encode it if needed.
 * Please refer to the {@link value} method on how to specify value field, text field and group field.
 * @param {Array} models a list of model objects. Starting from version 1.0.3, this parameter
 * can also be an array of associative arrays (e.g. results of {@link CDbCommand::queryAll}).
 * @param {String} valueField the attribute name for list option values
 * @param {String} textField the attribute name for list option texts
 * @param {String} groupField the attribute name for list option group names. If empty, no group will be generated.
 * @returns {Array} the list data that can be used in {@link dropDownList}, {@link listBox}, etc.
 */
Yii.CHtml.listData = function (models, valueField, textField, groupField) {
		var listData, i, value, model, text, n, group;
		if (groupField === undefined) {
			groupField = '';
		}
		listData=[];
		if(groupField==='')	{
			for (i in models) {
				if (models.hasOwnProperty(i)) {
					model = models[i];
					value=this.value(model,valueField);
					text=this.value(model,textField);
					listData[value]=text;
				}
			}
		}
		else {
			for (n in models) {
				if (models.hasOwnProperty(n)) {
					model = models[n];
					group=this.value(model,groupField);
					value=this.value(model,valueField);
					text=this.value(model,textField);
					listData[group][value]=text;
				}
			}
		}
		return listData;
	};
/**
 * Evaluates the value of the specified attribute for the given model.
 * The attribute name can be given in a dot syntax. For example, if the attribute
 * is "author.firstName", this method will return the value of "$model->author->firstName".
 * A default value (passed as the last parameter) will be returned if the attribute does
 * not exist or is broken in the middle (e.g. $model->author is null).
 * The model can be either an object or an array. If the latter, the attribute is treated
 * as a key of the array. For the example of "author.firstName", if would mean the array value
 * "$model['author']['firstName']".
 * @param {Mixed} model the model. This can be either an object or an array.
 * @param {String} attribute the attribute name (use dot to concatenate multiple attributes)
 * @param {Mixed} defaultValue the default value to return when the attribute does not exist
 * @returns {Mixed} the attribute value
 * @since 1.0.5
 */
Yii.CHtml.value = function (model, attribute, defaultValue) {
		var i, nameList, name;
		if (defaultValue === undefined) {
			defaultValue = null;
		}
		nameList = attribute.split('.');
		for (i in nameList) {
			if (nameList.hasOwnProperty(i)) {
				name = nameList[i];
				if((!model instanceof Array && model !== null && typeof(model) === 'object')) {
					model=model[name];
				}
				else if(Object.prototype.toString.call(model) === '[object Array]' && model[name] !== undefined) {
					model=model[name];
				}
				else {
					return defaultValue;
				}
			}
		}
		return model;
	};
/**
 * Generates a valid HTML ID based on name.
 * @param {String} name name from which to generate HTML ID
 * @returns {String} the ID generated based on name.
 */
Yii.CHtml.getIdByName = function (name) {
		return php.str_replace(['[]', '][', '[', ']'], ['', '_', '_', ''], name);
	};
/**
 * Generates input field ID for a model attribute.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @returns {String} the generated input field ID
 * @since 1.0.1
 */
Yii.CHtml.activeId = function (model, attribute) {
		return this.getIdByName(this.activeName(model,attribute));
	};
/**
 * Generates input field name for a model attribute.
 * Unlike {@link resolveName}, this method does NOT modify the attribute name.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @returns {String} the generated input field name
 * @since 1.0.1
 */
Yii.CHtml.activeName = function (model, attribute) {
		var a;
		a=attribute; // because the attribute name may be changed by resolveName
		return this.resolveName(model,a);
	};
/**
 * Generates an input HTML tag for a model attribute.
 * This method generates an input HTML tag based on the given data model and attribute.
 * If the attribute has input error, the input field's CSS class will
 * be appended with {@link errorCss}.
 * This enables highlighting the incorrect input.
 * @param {String} type the input type (e.g. 'text', 'radio')
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions additional HTML attributes for the HTML tag
 * @returns {String} the generated input tag
 */
Yii.CHtml.activeInputField = function (type, model, attribute, htmlOptions) {
		var i, validatorList, validator;
		htmlOptions.type=type;
		if(type==='text' || type==='password') {
			if(htmlOptions.maxlength === undefined) {
				Yii.forEach(model.getValidators(attribute), function(i, validator) {
					
					if(validator.getClassName() === "CStringValidator" && validator.max!==null) {
						htmlOptions.maxlength=validator.php.max;
						return false;
					}
				});
				
			}
			else if(htmlOptions.maxlength===false) {
				delete htmlOptions.maxlength;
			}
		}
		
		if(type==='file') {
			delete htmlOptions.value;
		}
		else if(htmlOptions.value === undefined) {
			htmlOptions.value=this.resolveValue(model,attribute);
		}
		if(model.hasErrors(attribute)) {
			this.addErrorCss(htmlOptions);
		}
		return this.tag('input',htmlOptions);
	};
/**
 * Generates the list options.
 * @param {Mixed} selection the selected value(s). This can be either a string for single selection or an array for multiple selections.
 * @param {Array} listData the option data (see {@link listData})
 * @param {Array} htmlOptions additional HTML attributes. The following two special attributes are recognized:
 * <ul>
 * <li>encode: boolean, specifies whether to encode the values. Defaults to true. This option has been available since version 1.0.5.</li>
 * <li>prompt: string, specifies the prompt text shown as the first list option. Its value is empty. Note, the prompt text will NOT be HTML-encoded.</li>
 * <li>empty: string, specifies the text corresponding to empty selection. Its value is empty.
 * Starting from version 1.0.10, the 'empty' option can also be an array of value-label pairs.
 * Each pair will be used to render a list option at the beginning. Note, the text label will NOT be HTML-encoded.</li>
 * <li>options: array, specifies additional attributes for each OPTION tag.
 *     The array keys must be the option values, and the array values are the extra
 *     OPTION tag attributes in the name-value pairs. For example,
 * <pre>
 *     {
 *         'value1':{'disabled':true, 'label':'value 1'),
 *         'value2':{'label':'value 2'},
 *     };
 * </pre>
 *     This option has been available since version 1.0.3.
 * </li>
 * <li>key: string, specifies the name of key attribute of the selection object(s).
 * This is used when the selection is represented in terms of objects. In this case,
 * the property named by the key option of the objects will be treated as the actual selection value.
 * This option defaults to 'primaryKey', meaning using the 'primaryKey' property value of the objects in the selection.
 * This option has been available since version 1.1.3.</li>
 * </ul>
 * @returns {String} the generated list options
 */
Yii.CHtml.listOptions = function (selection, listData, htmlOptions) {
		var raw, content, value, label, options, key, item, i, dummy, attributes;
		raw=htmlOptions.encode !== undefined && !htmlOptions.encode;
		content='';
		if(htmlOptions.prompt !== undefined) {
			content+='<option value="">'+php.strtr(htmlOptions.prompt,{'<':'&lt;', '>':'&gt;'})+"</option>\n";
			delete htmlOptions.prompt;
		}
		if(htmlOptions.empty !== undefined) {
			if(Object.prototype.toString.call(htmlOptions.empty) !== '[object Array]') {
				htmlOptions.empty={'':htmlOptions.empty};
			}
			for (value in htmlOptions.empty) {
				if (htmlOptions.empty.hasOwnProperty(value)) {
					label = htmlOptions.empty[value];
					content+='<option value="'+this.encode(value)+'">'+php.strtr(label,{'<':'&lt;', '>':'&gt;'})+"</option>\n";
				}
			}
			delete htmlOptions.empty;
		}
		if(htmlOptions.options !== undefined) {
			options=htmlOptions.options;
			delete htmlOptions.options;
		}
		else {
			options={};
		}
		key=htmlOptions.key !== undefined ? htmlOptions.key : 'primaryKey';
		if(Object.prototype.toString.call(selection) === '[object Array]') {
			for (i in selection) {
				if (selection.hasOwnProperty(i)) {
					item = selection[i];
					if((!item instanceof Array && item !== null && typeof(item) === 'object')) {
						selection[i]=item[key];
					}
				}
			}
		}
		else if((!selection instanceof Array && selection !== null && typeof(selection) === 'object')) {
			selection=selection[key];
		}
		for (key in listData) {
			if (listData.hasOwnProperty(key)) {
				value = listData[key];
				if(Object.prototype.toString.call(value) === '[object Array]') {
					content+='<optgroup label="'+(raw?key : this.encode(key))+"\">\n";
					dummy={'options':options};
					if(htmlOptions.encode !== undefined) {
						dummy.encode=htmlOptions.encode;
					}
					content+=this.listOptions(selection,value,dummy);
					content+='</optgroup>'+"\n";
				}
				else {
					attributes={'value':String(key), 'encode':!raw};
					if(Object.prototype.toString.call(selection) !== '[object Array]' && !php.strcmp(key,selection) || Object.prototype.toString.call(selection) === '[object Array]' && php.in_array(key,selection)) {
						attributes.selected='selected';
					}
					if(options[key] !== undefined) {
						attributes=php.array_merge(attributes,options[key]);
					}
					content+=this.tag('option',attributes,raw?String(value ): this.encode(String(value)))+"\n";
				}
			}
		}
		delete htmlOptions.key;
		return content;
	};
/**
 * Generates the JavaScript with the specified client changes.
 * @param {String} event event name (without 'on')
 * @param {Array} htmlOptions HTML attributes which may contain the following special attributes
 * specifying the client change behaviors:
 * <ul>
 * <li>submit: string, specifies the URL that the button should submit to. If empty, the current requested URL will be used.</li>
 * <li>params: array, name-value pairs that should be submitted together with the form. This is only used when 'submit' option is specified.</li>
 * <li>csrf: boolean, whether a CSRF token should be submitted when {@link CHttpRequest::enableCsrfValidation} is true. Defaults to false.
 * This option has been available since version 1.0.7. You may want to set this to be true if there is no enclosing
 * form around this element. This option is meaningful only when 'submit' option is set.</li>
 * <li>return: boolean, the return value of the javascript. Defaults to false, meaning that the execution of
 * javascript would not cause the default behavior of the event. This option has been available since version 1.0.2.</li>
 * <li>confirm: string, specifies the message that should show in a pop-up confirmation dialog.</li>
 * <li>ajax: array, specifies the AJAX options (see {@link ajax}).</li>
 * <li>live: boolean, whether the event handler should be bound in "live" (a jquery event concept). Defaults to true. This option has been available since version 1.1.6.</li>
 * </ul>
 * This parameter has been available since version 1.1.1.
 */
Yii.CHtml.clientChange = function (event, htmlOptions) {
		var live, returnVar, conf, handler, handles = [], id, count, cs, request, params, url;
		
		if(htmlOptions['on'+event] === undefined && htmlOptions.submit === undefined && htmlOptions.confirm === undefined && htmlOptions.ajax === undefined) {
			return;
		}
		if(htmlOptions.live !== undefined) {
			live=htmlOptions.live;
			delete htmlOptions.live;
		}
		else {
			live=true;
		}
		if(htmlOptions['return'] !== undefined && htmlOptions['return']) {
			returnVar=true;
		}
		else {
			returnVar=false;
		}
		
		if(htmlOptions['on'+event] !== undefined) {
			handles.push(htmlOptions['on'+event]);
			delete htmlOptions['on'+event];
		}
		
		if(htmlOptions.id !== undefined) {
			id=htmlOptions.id;
		}
		else {
			id=htmlOptions.id=htmlOptions.name !== undefined?htmlOptions.name:this.ID_PREFIX+this.count++;
		}
		
		if(htmlOptions.submit !== undefined) {
			request=Yii.app().getRequest();
			if(request.enableCsrfValidation && htmlOptions.csrf !== undefined && htmlOptions.csrf) {
				htmlOptions.params[request.csrfTokenName]=request.getCsrfToken();
			}
			if(htmlOptions.params !== undefined) {
				params=htmlOptions.params;
			}
			else {
				params={};
			}
			if(htmlOptions.submit!=='') {
				url=this.normalizeUrl(htmlOptions.submit);
			}
			else {
				url='';
			}
			handles.push(function () {
				jQuery.yii.submitForm(this, url, params);
				return returnVar;
			});
		}
		if (htmlOptions.ajax !== undefined) {
			handles.push(function() {
				Yii.CHtml.ajax(htmlOptions.ajax);
				return returnVar;
			});
		}
		if (htmlOptions.confirm !== undefined) {
			conf = htmlOptions.confirm;
			if (handles.length !== 0) {
				handler = function () {
					if (confirm(conf)) {
						var i, limit;
						limit = handles.length;
						for (i = 0; i < limit; i++) {
							if (handles[i]() === false) {
								return false;
							}
						}
						return returnVar;
					}
					else {
						return false;
					}
				};
			}
			else {
				handler = function () {
					return confirm(conf);
				};
			}
			delete htmlOptions.confirm;
		}
		else if (handles.length > 0) {
			handler = function () {
					var i, limit;
					limit = handles.length;
					for (i = 0; i < limit; i++) {
						if (handles[i]() === false) {
							return false;
						}
					}
					return returnVar;
				};
		}
		
		if (handler !== undefined) {
			if (live) {
				jQuery('body').undelegate("#" + id, event).delegate("#" + id, event, handler);
			}
			else {
				jQuery("#" + id)[event](handler);
			}
		}
		delete htmlOptions.params;
		delete htmlOptions.submit;
		delete htmlOptions.ajax;
		delete htmlOptions.csrf;
		delete htmlOptions['return'];
	};
/**
 * Generates input name and ID for a model attribute.
 * This method will update the HTML options by setting appropriate 'name' and 'id' attributes.
 * This method may also modify the attribute name if the name
 * contains square brackets (mainly used in tabular input).
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @param {Array} htmlOptions the HTML options
 */
Yii.CHtml.resolveNameID = function (model, attribute, htmlOptions) {
		if(htmlOptions.name === undefined) {
			htmlOptions.name=this.resolveName(model,attribute);
		}
		if(htmlOptions.id === undefined) {
			htmlOptions.id=this.getIdByName(htmlOptions.name);
		}
		else if(htmlOptions.id===false) {
			delete htmlOptions.id;
		}
	};
/**
 * Generates input name for a model attribute.
 * Note, the attribute name may be modified after calling this method if the name
 * contains square brackets (mainly used in tabular input) before the real attribute name.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute
 * @returns {String} the input name
 * @since 1.0.2
 */
Yii.CHtml.resolveName = function (model, attribute) {
		var pos, sub, matches, name;
		if((pos=php.strpos(attribute,'['))!==false)
		{
			if(pos!==0) {  // e.g. name[a][b]
				return model.getClassName()+'['+attribute.slice(0, pos)+']'+attribute.slice(pos);
			}
			if((pos=php.strrpos(attribute,']'))!==false && pos!==php.strlen(attribute)-1)  {// e.g. [a][b]name
				sub=attribute.slice(0, pos+1);
				attribute=attribute.slice(pos+1);
				return model.getClassName()+sub+'['+attribute+']';
			}
			if(/\](\w+\[.*)$/.exec(attribute)) {
				name=model.getClassName()+'['+php.str_replace(']','][',php.trim(php.strtr(attribute,{'][':']','[':']'}),']'))+']';
				attribute=matches[1];
				return name;
			}
		}
		else {
			return model.getClassName()+'['+attribute+']';
		}
	};
/**
 * Evaluates the attribute value of the model.
 * This method can recognize the attribute name written in array format.
 * For example, if the attribute name is 'name[a][b]', the value "$model->name['a']['b']" will be returned.
 * @param {Yii.CModel} model the data model
 * @param {String} attribute the attribute name
 * @returns {Mixed} the attribute value
 * @since 1.1.3
 */
Yii.CHtml.resolveValue = function (model, attribute) {
		var pos, matches, name, value, i, idList, id;
		if((pos=php.strpos(attribute,'['))!==false) {
			if(pos===0) {// [a]name[b][c], should ignore [a]
				if(/\](\w+)/.exec(attribute)) {
					attribute=matches[1];
				}
				if((pos=php.strpos(attribute,'['))===false) {
					return model.get(attribute);
				}
			}
			name=attribute.slice(0, pos);
			value=model.name;
			idList = php.rtrim(attribute.slice(pos+1),']').split('][');
			
			for (i in idList) {
				if (idList.hasOwnProperty(i)) {
					id = idList[i];
					if(typeof value === 'object' && value instanceof Yii.CComponent) {
						value=value.get(id);
					}
					else if(typeof value === 'object' && value[id] !== undefined) {
						value=value[id];
					}
					else {
						return null;
					}
				}
			}
			return value;
		}
		else {
			return model.get(attribute);
		}
	};
/**
 * Appends {@link errorCss} to the 'class' attribute.
 * @param {Array} htmlOptions HTML options to be modified
 */
Yii.CHtml.addErrorCss = function (htmlOptions) {
		var errorCss;
		if(htmlOptions['class'] !== undefined) {
			htmlOptions['class']+=' '+this.errorCss;
		}
		else {
			htmlOptions['class']=this.errorCss;
		}
	};
/**
 * Renders the HTML tag attributes.
 * Since version 1.1.5, attributes whose value is null will not be rendered.
 * Special attributes, such as 'checked', 'disabled', 'readonly', will be rendered
 * properly based on their corresponding boolean value.
 * @param {Array} htmlOptions attributes to be rendered
 * @returns {String} the rendering result
 * @since 1.0.5
 */
Yii.CHtml.renderAttributes = function (htmlOptions) {
		var specialAttributes, html, raw, name, value;
		 specialAttributes={
			'checked':1,
			'declare':1,
			'defer':1,
			'disabled':1,
			'ismap':1,
			'multiple':1,
			'nohref':1,
			'noresize':1,
			'readonly':1,
			'selected':1
		};
		if(htmlOptions==={}) {
			return '';
		}
		html='';
		if(htmlOptions.encode !== undefined) {
			raw=!htmlOptions.encode;
			delete htmlOptions.encode;
		}
		else {
			raw=false;
		}
		
		if(raw) {
			for (name in htmlOptions) {
				if (htmlOptions.hasOwnProperty(name)) {
					value = htmlOptions[name];
					if(specialAttributes[name] !== undefined) {
						if(value) {
							html += ' ' + name + '="' + name + '"';
						}
					}
					else if(value!==null && value !== undefined) {
						html += ' ' + name + '="' + value + '"';
					}
				}
			}
		}
		else {
			
			for (name in htmlOptions) {
				if (htmlOptions.hasOwnProperty(name)) {
					
					value = htmlOptions[name];
					if(specialAttributes[name] !== undefined) {
						if(value) {
							html += ' ' + name + '="' + name + '"';
						}
					}
					else if(value!==null && value !== undefined) {
						html += ' ' + name + '="' + this.encode(value) + '"';
					}
				}
			}
		}
	
		return html;
	};