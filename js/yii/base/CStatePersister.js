/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CStatePersister implements a file-based persistent data storage.
 * 
 * It can be used to keep data available through multiple requests and sessions.
 * 
 * By default, CStatePersister stores data in a file named 'state.bin' that is located
 * under the application {@link CApplication::getRuntimePath runtime path}.
 * You may change the location by setting the {@link stateFile} property.
 * 
 * To retrieve the data from CStatePersister, call {@link load()}. To save the data,
 * call {@link save()}.
 * 
 * Comparison among state persister, session and cache is as follows:
 * <ul>
 * <li>session: data persisting within a single user session.</li>
 * <li>state persister: data persisting through all requests/sessions (e.g. hit counter).</li>
 * <li>cache: volatile and fast storage. It may be used as storage medium for session or state persister.</li>
 * </ul>
 * 
 * Since server resource is often limited, be cautious if you plan to use CStatePersister
 * to store large amount of data. You should also consider using database-based persister
 * to improve the throughput.
 * 
 * CStatePersister is a core application component used to store global application state.
 * It may be accessed via {@link CApplication::getStatePersister()}.
 * page state persistent method based on cache.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CStatePersister.php 3165 2011-04-06 08:27:40Z mdomba $
 * @package system.base
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CApplicationComponent
 */
Yii.CStatePersister = function CStatePersister() {
};
Yii.CStatePersister.prototype = new Yii.CApplicationComponent();
Yii.CStatePersister.prototype.constructor =  Yii.CStatePersister;

/**
 * Initializes the component.
 * This method overrides the parent implementation by making sure the
 * browser supports localStorage
 */
Yii.CStatePersister.prototype.init = function () {
		Yii.CApplicationComponent.prototype.init.call(this);
		
		try {
			return "localStorage" in window && window.localStorage !== null;
		}
		catch (e) {
			throw new Yii.CException(Yii.t('yii','Unable to access local storage, please ensure that you\'re using a modern browser!'));
		}
	};
/**
 * Loads state data from persistent storage.
 * @returns {Mixed} state data. Null if no state data available.
 */
Yii.CStatePersister.prototype.load = function () {
		var state = {}, i, value;
		if(window.localStorage.length !== 0) {
			
			for (i in window.localStorage) {
				if (window.localStorage.hasOwnProperty(i)) {
					try {
						state[i] = Yii.CJSON.decode(window.localStorage[i]);
					}
					catch (e) {
						state[i] = window.localStorage[i];
					}
				}
			}
			return state;
		}
		else {
			return null;
		}
	};
/**
 * Saves application state in persistent storage.
 * @param {Mixed} state state data (must be serializable).
 */
Yii.CStatePersister.prototype.save = function (state) {
	var i;
	window.localStorage.clear();
	for(i in state) {
		if (state.hasOwnProperty(i)) {
			window.localStorage[i] = Yii.CJSON.encode(state[i]);
		}
	}
};