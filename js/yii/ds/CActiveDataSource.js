/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * A base class for data sources.
 * @package system.ds
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CActiveDataSource = function CActiveDataSource () {
	
};
Yii.CActiveDataSource.prototype = new Yii.CComponent();
Yii.CActiveDataSource.prototype.constructor =  Yii.CActiveDataSource;

/**
 * Gets data from the data source and executes the callback when data arrives.
 * Child classes must override this method!
 * @param {Function} callback The callback function to execute, this will recieve the
 * data as its first parameter and the data source as its second parameter.
 * 
 */
Yii.CActiveDataSource.prototype.getData = function (callback) {
	
};

