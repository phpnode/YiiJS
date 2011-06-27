<?php
/**
 * Provides various functions related to YiiJS
 */
class JsCommand extends CConsoleCommand {
	
	public $javaPath = "java";
	
	/**
	 * Generates the application structure for a YiiJS
	 * web application.
	 * @param string $path The path to generate the files under, this will be created if it doesn't exist
	 */
	public function actionWebapp($path) {
		if (!file_exists($path)) {
			$exists = "This folder will be created.";
		}
		else {
			$exists = "This folder already exists, files may be overwritten!";
		}
		echo "Create a YiiJS webapp in '$path' ($exists)? [Yes|No]\n";
		if(!strncasecmp(trim(fgets(STDIN)),'y',1)) {
			$sourceDir = realpath(dirname(__FILE__)."/js/webapp");
			CFileHelper::copyDirectory($sourceDir, $path);
			echo "Done!\n";
		}
	}
	/**
	 * Compiles the framework and application into one file
	 */
	public function actionCompile() {
		$content = "";
		$files = Yii::app()->js->listFiles();
		
		$outFile = Yii::app()->js->applicationPath."/compiled.js";
		foreach($files as $path => $url) {
			$content .= file_get_contents($path);
		}
		$tempFile = tempnam("/tmp","javascript");
		
		file_put_contents($tempFile,$content);
		
		echo "Compressing JavaScript...\n";
		$cmd = $this->javaPath." -jar ".dirname(__FILE__)."/js/compiler.jar --js_output_file ".$outFile." --js ".$tempFile;
		passthru($cmd);
		
	}
	
	/**
	 * Attempts to convert a PHP class to JavaScript.
	 * Will often produce mangled JS so check the output!
	 * @param string $className the PHP class name to load, must be autoloadable
	 */
	public function actionConvertPHPClass($className) {
		Yii::import("application.commands.js.phpToJS", true);
		$converter = new phpToJS;
		$class = new phpClass($className);
		echo $class->convert();
	}
}
