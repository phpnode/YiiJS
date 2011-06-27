<?php
class YiiJS extends CApplicationComponent {
	
	public $frameworkPath;
	public $applicationPath;
	public $frameworkUrl;
	public $applicationUrl;
	
	public $config = array();
	/**
	 * Initializes the component
	 */
	public function init() {
		parent::init();
		$baseUrl = "";
		if (isset(Yii::app()->baseUrl)) {
			$baseUrl = Yii::app()->baseUrl;
		}
		if ($this->frameworkPath === null) {
			$this->frameworkPath = realpath(Yii::app()->basePath."/../js/yii");
		}
		if ($this->applicationPath === null) {
			$this->applicationPath = realpath(Yii::app()->basePath."/../js/app");
		}
		if ($this->frameworkUrl === null) {
			$this->frameworkUrl = $baseUrl."/js/yii";
		}
		if ($this->applicationUrl === null) {
			$this->applicationUrl = $baseUrl."/js/app";
		}
	}
	
	/**
	 * Initializes and runs YiiJS
	 */
	public function run() {
		Yii::app()->clientScript->registerCoreScript("jquery");
		Yii::app()->clientScript->registerCoreScript("jquery.ui");
		if (YII_DEBUG) {
			$files = $this->listFiles();
			$time = $_SERVER['REQUEST_TIME'];
			foreach ($files as $filename => $url) {
				Yii::app()->clientscript->registerScriptFile($url."?v=".$time,CClientScript::POS_END); 
			}
		}
		else {
			Yii::app()->clientScript->registerScriptFile($this->applicationUrl."/compiled.js",CClientScript::POS_END);
		}
	
		$script = "Yii.createApplication('Application',appConfig);";
		$script .= "Yii.app().getRequest()._csrfToken = '". Yii::app()->request->csrfToken . "';\n";
		$script .= "Yii.app().run()";
		Yii::app()->clientScript->registerScript("YiiJS:run()",$script,CClientScript::POS_END);
		
		
	}
	
	public function listFiles() {
		$return = array();
		foreach($this->listFrameworkFiles() as $file) {
			$url = substr($file,strlen($this->frameworkPath));
			$return[$file] = $this->frameworkUrl.$url;
		}
		foreach($this->listApplicationFiles() as $file) {
			$url = substr($file,strlen($this->applicationPath));
			$return[$file] = $this->applicationUrl.$url;
		}
		return $return;
	}
	
	/**
	 * Lists all the application js files in the right order for inclusion
	 * @return array an array of javascript files that make up the app
	 */
	public function listApplicationFiles() {
		$preload = array(
			"config/main.js"
		);
		
		$return = array();
		$fullPath = $this->applicationPath;
	
		foreach($preload as $file) {
			$return[] = $fullPath."/".$file;
		}
		
		$options = array(
			"fileTypes" => array("js"),
			"exclude" => array_merge($preload, array(
				"data", "messages", "compiled.js"
			))
		);
		
		$return = array_merge($return, CFileHelper::findFiles($fullPath,$options));
		
		
		return $return;
	}
	
	/**
	 * Lists all the framework js files in the right order for inclusion
	 * @return array an array of javascript files that make up the framework
	 */
	public function listFrameworkFiles() {
		$preload = array(
			"Yii.js",
			"base/CComponent.js",
			"base/CApplicationComponent.js",
			"base/CException.js",
			"base/CEvent.js",
			"base/CEnumerable.js",
			"base/CModule.js",
			"collections/CList.js",
			"collections/CMap.js",
			"validators/CValidator.js",
			"i18n/CMessageSource.js",
			"web/filters/CFilter.js",
			"web/renderers/CViewRenderer.js",
			"web/form/CFormElement.js",
			"web/CBaseController.js",
			"web/widgets/CWidget.js",
			"logging/CLogRoute.js",
			"logging/CWebLogRoute.js",
			"web/CView.js",
		);
		
		$return = array();
		$fullPath = $this->frameworkPath;
	
		foreach($preload as $file) {
			$return[] = $fullPath."/".$file;
		}
		
		$options = array(
			"fileTypes" => array("js"),
			"exclude" => array_merge($preload, array(
				"data", "messages"
			))
		);
		
		$return = array_merge($return, CFileHelper::findFiles($fullPath,$options));
		
		
		return $return;
	}
}