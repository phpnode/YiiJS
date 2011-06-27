var YII_PATH = "/js/yii/";
Yii.setPathOfAlias("application", "/js/app");
var appConfig = {
	'basePath': "/js/app",
	'name': "My YiiJS Application",
	'preload': ["log"],
	'params': {
		'version': 0.1
	},
	
	'components': {
		
		'viewRenderer' : {
			'class': 'CMustacheViewRenderer'
		},
		'request': {
			'enableCsrfValidation': false,
			'enableCookieValidation': false
		},
		'log': {
			'class': 'CLogRouter',
			'routes': [
				{
					'class': 'CProfileLogRoute',
					'showInFireBug': true
				},
				{
					'class': 'CWebLogRoute',
					'showInFireBug': true
				}
			]
		},
		'cache': {
			'class': 'CSessionCache'
		},
		'urlManager': {
			'urlFormat': 'path',
			'showScriptName': false,
			'urlSuffix': '.html',
			'useStrictParsing': false,
			'rules': [
				{
					'pattern': '/',
					'route': '/site/index',
					'urlSuffix': ''
				},
				{
					'pattern': 'contact',
					'route': '/site/contact'
				},
				{
					'pattern': '<controller:\\w+>',
					'route': '<controller>/index'	
				},
				{
					'pattern': '<controller:\\w+>/<id:\\d+>',
					'route': '<controller>/view'	
				},
				{
					'pattern': '<controller:\\w+>/<action:\\w+>/<id:\\d+>',
					'route': '<controller>/<action>'	
				},
				{
					'pattern': '<controller:\\w+>/<action:\\w+>',
					'route': '<controller>/<action>'	
				}
			]
		}		
	}
};
