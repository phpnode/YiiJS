/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CCache is the base class for cache classes with different cache storage implementation.
 * 
 * A data item can be stored in cache by calling {@link set} and be retrieved back
 * later by {@link get}. In both operations, a key identifying the data item is required.
 * An expiration time and/or a dependency can also be specified when calling {@link set}.
 * If the data item expires or the dependency changes, calling {@link get} will not
 * return back the data item.
 * 
 * Note, by definition, cache does not ensure the existence of a value
 * even if it does not expire. Cache is not meant to be a persistent storage.
 * 
 * CCache implements the interface {@link ICache} with the following methods:
 * <ul>
 * <li>{@link get} : retrieve the value with a key (if any) from cache</li>
 * <li>{@link set} : store the value with a key into cache</li>
 * <li>{@link add} : store the value only if cache does not have this key</li>
 * <li>{@link delete} : delete the value with the specified key from cache</li>
 * <li>{@link flush} : delete all values from cache</li>
 * </ul>
 * 
 * Child classes must implement the following methods:
 * <ul>
 * <li>{@link getValue}</li>
 * <li>{@link setValue}</li>
 * <li>{@link addValue}</li>
 * <li>{@link deleteValue}</li>
 * <li>{@link flush} (optional)</li>
 * </ul>
 * 
 * CCache also implements ArrayAccess so that it can be used like an array.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CCache.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.caching
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CApplicationComponent
 */
Yii.CCache = function CCache () {
};
Yii.CCache.prototype = new Yii.CApplicationComponent();
Yii.CCache.prototype.constructor =  Yii.CCache;
/**
 * @var {String} a string prefixed to every cache key so that it is unique. Defaults to {@link CApplication::getId() application ID}.
 */
Yii.CCache.prototype.keyPrefix = null;
/**
 * Initializes the application component.
 * This method overrides the parent implementation by setting default cache key prefix.
 */
Yii.CCache.prototype.init = function () {
		Yii.CApplicationComponent.prototype.init.call(this);
		if(this.keyPrefix===null) {
			this.keyPrefix=Yii.app().getId();
		}
	};
/**
 * @param {String} key a key identifying a value to be cached
 * @returns {Sring} a key generated from the provided key which ensures the uniqueness across applications
 */
Yii.CCache.prototype.generateUniqueKey = function (key) {
		return php.md5(this.keyPrefix+key);
	};
/**
 * Retrieves a value from cache with a specified key.
 * @param {String} id a key identifying the cached value
 * @returns {Mixed} the value stored in cache, false if the value is not in the cache, expired or the dependency has changed.
 */
Yii.CCache.prototype.get = function (id) {
		var value, data;
		if((value=this.getValue(this.generateUniqueKey(id)))!==false) {
			data = value;
			
			if (!data) {
				return false;
			}
			if(Object.prototype.toString.call(data) !== '[object Array]') {
				if (data.length > 0) {
					try {
						data = Yii.CJSON.decode(data);
					}
					catch (e) {
						return false;
					}
				}
				else {
					return false;
				}
			}
			if (false && data[1] !== undefined && data[1] !== {}) {
				data[1] = Yii.createComponent(data[1]);
			}
			if(data[1] === null || !(data[1] instanceof Yii.CCacheDependency) || !data[1].getHasChanged()) {
				Yii.trace('Serving "'+id+'" from cache','system.caching.'+this.getClassName());
				return data[0];
			}
		}
		return false;
	};
/**
 * Retrieves multiple values from cache with the specified keys.
 * Some caches (such as memcache, apc) allow retrieving multiple cached values at one time,
 * which may improve the performance since it reduces the communication cost.
 * In case a cache doesn't support this feature natively, it will be simulated by this method.
 * @param {Array} ids list of keys identifying the cached values
 * @returns {Array} list of cached values corresponding to the specified keys. The array
 * is returned in terms of (key,value) pairs.
 * If a value is not cached or expired, the corresponding array value will be false.
 * @since 1.0.8
 */
Yii.CCache.prototype.mget = function (ids) {
		var uniqueIDs, results, i, id, values, uniqueID, data;
		uniqueIDs={};
		results={};
		for (i in ids) {
			if (ids.hasOwnProperty(i)) {
				id = ids[i];
				uniqueIDs[id]=this.generateUniqueKey(id);
				results[id]=false;
			}
		}
		values=this.getValues(uniqueIDs);
		for (id in uniqueIDs) {
			if (uniqueIDs.hasOwnProperty(id)) {
				uniqueID = uniqueIDs[id];
				if(values[uniqueID] === undefined) {
					continue;
				}
				data=Yii.CJSON.decode(values[uniqueID]);
				data = value;
				if(Object.prototype.toString.call(data) !== '[object Array]') {
					if (data.length > 0) {
						try {
							data = Yii.CJSON.decode(data);
						}
						catch (e) {
							return false;
						}
					}
					else {
						return false;
					}
				}
				if (data[1] !== undefined && data[1] !== {}) {
					data[1] = Yii.createComponent(data[1]);
				}
				if(!(data[1] instanceof Yii.CCacheDependency) || !data[1].getHasChanged()) {
					Yii.trace('Serving "'+id+'" from cache','system.caching.'+this.getClassName());
					results[id] = data[0];
				}
			}
		}
		return results;
	};
/**
 * Stores a value identified by a key into cache.
 * If the cache already contains such a key, the existing value and
 * expiration time will be replaced with the new ones.
 * 
 * @param {String} id the key identifying the value to be cached
 * @param {Mixed} value the value to be cached
 * @param {Integer} expire the number of seconds in which the cached value will expire. 0 means never expire.
 * @param {ICacheDependency} dependency dependency of the cached item. If the dependency changes, the item is labeled invalid.
 * @returns {Boolean} true if the value is successfully stored into cache, false otherwise
 */
Yii.CCache.prototype.set = function (id, value, expire, dependency) {
		var data;
		if (expire === undefined) {
			expire = 0;
		}
		if (dependency === undefined) {
			dependency = null;
		}
		Yii.trace('Saving "'+id+'" to cache','system.caching.'+this.getClassName());
		if(dependency!==null) {
			dependency.evaluateDependency();
		}
		data=[value,dependency];
		return this.setValue(this.generateUniqueKey(id),Yii.CJSON.encode(data),expire);
	};
/**
 * Stores a value identified by a key into cache if the cache does not contain this key.
 * Nothing will be done if the cache already contains the key.
 * @param {String} id the key identifying the value to be cached
 * @param {Mixed} value the value to be cached
 * @param {Integer} expire the number of seconds in which the cached value will expire. 0 means never expire.
 * @param {ICacheDependency} dependency dependency of the cached item. If the dependency changes, the item is labeled invalid.
 * @returns {Boolean} true if the value is successfully stored into cache, false otherwise
 */
Yii.CCache.prototype.add = function (id, value, expire, dependency) {
		var data;
		if (expire === undefined) {
			expire = 0;
		}
		if (dependency === undefined) {
			dependency = null;
		}
		Yii.trace('Adding "'+id+'" to cache','system.caching.'+this.getClassName());
		if(dependency!==null) {
			dependency.evaluateDependency();
		}
		data=[value,dependency];
		return this.addValue(this.generateUniqueKey(id),Yii.CJSON.encode(data),expire);
	};
/**
 * Deletes a value with the specified key from cache
 * @param {String} id the key of the value to be deleted
 * @returns {Boolean} if no error happens during deletion
 */
Yii.CCache.prototype.remove = function (id) {
		Yii.trace('Deleting "'+id+'" from cache','system.caching.'+this.getClassName());
		return this.deleteValue(this.generateUniqueKey(id));
	};
/**
 * Deletes all values from cache.
 * Be careful of performing this operation if the cache is shared by multiple applications.
 * @returns {Boolean} whether the flush operation was successful.
 */
Yii.CCache.prototype.flush = function () {
		Yii.trace('Flushing cache','system.caching.'+this.getClassName());
		return this.flushValues();
	};
/**
 * Retrieves a value from cache with a specified key.
 * This method should be implemented by child classes to retrieve the data
 * from specific cache storage. The uniqueness and dependency are handled
 * in {@link get()} already. So only the implementation of data retrieval
 * is needed.
 * @param {String} key a unique key identifying the cached value
 * @returns {String} the value stored in cache, false if the value is not in the cache or expired.
 * @throws {Yii.CException} if this method is not overridden by child classes
 */
Yii.CCache.prototype.getValue = function (key) {
		throw new Yii.CException(Yii.t('yii','{className} does not support get() functionality.',
			{'{className}':this.getClassName()}));
	};
/**
 * Retrieves multiple values from cache with the specified keys.
 * The default implementation simply calls {@link getValue} multiple
 * times to retrieve the cached values one by one.
 * If the underlying cache storage supports multiget, this method should
 * be overridden to exploit that feature.
 * @param {Array} keys a list of keys identifying the cached values
 * @returns {Object} a list of cached values indexed by the keys
 * @since 1.0.8
 */
Yii.CCache.prototype.getValues = function (keys) {
		var results, i, key;
		results={};
		for (i in keys) {
			if (keys.hasOwnProperty(i)) {
				key = keys[i];
				results[key]=this.getValue(key);
			}
		}
		return results;
	};
/**
 * Stores a value identified by a key in cache.
 * This method should be implemented by child classes to store the data
 * in specific cache storage. The uniqueness and dependency are handled
 * in {@link set()} already. So only the implementation of data storage
 * is needed.
 * 
 * @param {String} key the key identifying the value to be cached
 * @param {String} value the value to be cached
 * @param {Integer} expire the number of seconds in which the cached value will expire. 0 means never expire.
 * @returns {Boolean} true if the value is successfully stored into cache, false otherwise
 * @throws {Yii.CException} if this method is not overridden by child classes
 */
Yii.CCache.prototype.setValue = function (key, value, expire) {
		throw new Yii.CException(Yii.t('yii','{className} does not support set() functionality.',
			{'{className}':this.getClassName()}));
	};
/**
 * Stores a value identified by a key into cache if the cache does not contain this key.
 * This method should be implemented by child classes to store the data
 * in specific cache storage. The uniqueness and dependency are handled
 * in {@link add()} already. So only the implementation of data storage
 * is needed.
 * 
 * @param {String} key the key identifying the value to be cached
 * @param {String} value the value to be cached
 * @param {Integer} expire the number of seconds in which the cached value will expire. 0 means never expire.
 * @returns {Boolean} true if the value is successfully stored into cache, false otherwise
 * @throws {Yii.CException} if this method is not overridden by child classes
 */
Yii.CCache.prototype.addValue = function (key, value, expire) {
		throw new Yii.CException(Yii.t('yii','{className} does not support add() functionality.',
			{'{className}':this.getClassName()}));
	};
/**
 * Deletes a value with the specified key from cache
 * This method should be implemented by child classes to delete the data from actual cache storage.
 * @param {String} key the key of the value to be deleted
 * @returns {Boolean} if no error happens during deletion
 * @throws {Yii.CException} if this method is not overridden by child classes
 */
Yii.CCache.prototype.deleteValue = function (key) {
		throw new Yii.CException(Yii.t('yii','{className} does not support delete() functionality.',
			{'{className}':this.getClassName()}));
	};
/**
 * Deletes all values from cache.
 * Child classes may implement this method to realize the flush operation.
 * @returns {Boolean} whether the flush operation was successful.
 * @throws {Yii.CException} if this method is not overridden by child classes
 * @since 1.1.5
 */
Yii.CCache.prototype.flushValues = function () {
		throw new Yii.CException(Yii.t('yii','{className} does not support flushValues() functionality.',
			{'{className}':this.getClassName()}));
	};
/**
 * Returns whether there is a cache entry with a specified key.
 * This method is required by the interface ArrayAccess.
 * @param {String} id a key identifying the cached value
 * @returns {Boolean}
 */
Yii.CCache.prototype.offsetExists = function (id) {
		return this.get(id)!==false;
	};
/**
 * Retrieves the value from cache with a specified key.
 * This method is required by the interface ArrayAccess.
 * @param {String} id a key identifying the cached value
 * @returns {Mixed} the value stored in cache, false if the value is not in the cache or expired.
 */
Yii.CCache.prototype.offsetGet = function (id) {
		return this.get(id);
	};
/**
 * Stores the value identified by a key into cache.
 * If the cache already contains such a key, the existing value will be
 * replaced with the new ones. To add expiration and dependencies, use the set() method.
 * This method is required by the interface ArrayAccess.
 * @param {String} id the key identifying the value to be cached
 * @param {Mixed} value the value to be cached
 */
Yii.CCache.prototype.offsetSet = function (id, value) {
		this.set(id, value);
	};
/**
 * Deletes the value with the specified key from cache
 * This method is required by the interface ArrayAccess.
 * @param {String} id the key of the value to be deleted
 * @returns {Boolean} if no error happens during deletion
 */
Yii.CCache.prototype.offsetUnset = function (id) {
		this.remove(id);
	};