/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CAsyncRecord is the base class for classes representing relational data loaded from a remote data source.
 * 
 * It implements the active record design pattern, a popular Object-Relational Mapping (ORM) technique.
 * 
 * @package system.ds
 * @since 1.0
 * 
 * @property array $attributes
 * @author Charles Pick
 * @class
 * @extends Yii.CModel
 */
Yii.CAsyncRecord = function CAsyncRecord (scenario, callback) {
	if (scenario !== false) {
		return this.construct(scenario, callback);
	}
};
Yii.CAsyncRecord.prototype = new Yii.CModel(false);
Yii.CAsyncRecord.prototype.constructor =  Yii.CAsyncRecord;
/**
 * @const
 */
Yii.CAsyncRecord.prototype.BELONGS_TO = 'CBelongsToRelation';
/**
 * @const
 */
Yii.CAsyncRecord.prototype.HAS_ONE = 'CHasOneRelation';
/**
 * @const
 */
Yii.CAsyncRecord.prototype.HAS_MANY = 'CHasManyRelation';
/**
 * @const
 */
Yii.CAsyncRecord.prototype.MANY_MANY = 'CManyManyRelation';
/**
 * @const
 */
Yii.CAsyncRecord.prototype.STAT = 'CStatRelation';
/**
 * @var {Yii.CActiveDataSource} the default data source for all active records 
 * @see getDbConnection
 */
Yii.CAsyncRecord.prototype._ds = null;
/**
 * Whether or not to wrap the posted data in an object or not.
 * If this is set to true, data will be wrapped in an object with the same name as 
 * this model. If set to a string, the string value will be used to wrap. If false
 * no wrapping will be applied.
 * Defaults to false.
 * @var Mixed
 */
Yii.CAsyncRecord.prototype.wrapData = false;
Yii.CAsyncRecord.prototype._models = {};
Yii.CAsyncRecord.prototype._new = false;
Yii.CAsyncRecord.prototype._attributes = {};
Yii.CAsyncRecord.prototype._related = {};
Yii.CAsyncRecord.prototype._c = null;
Yii.CAsyncRecord.prototype._pk = null;
Yii.CAsyncRecord.prototype._alias = 't';
/**
 * Constructor.
 * @param {String} scenario scenario name. See {@link CModel::scenario} for more details about this parameter.
 */
Yii.CAsyncRecord.prototype.construct = function (scenario) {
		if (scenario === undefined) {
			scenario = 'insert';
		}
		if(scenario===null) { // internally used by populateRecord() and model()
			return;
		}
		this._attributes = {};
		this._ds = this.dataStoreDefaults();
		this.setScenario(scenario);
		this.setIsNewRecord(true);
		this._attributes=this.attributeDefaults();
		this.init();
		this.attachBehaviors(this.behaviors());
		this.afterConstruct();
	};

/**
 * Initializes this model.
 * This method is invoked when an AR instance is newly created and has
 * its {@link scenario} set.
 * You may override this method to provide code that is needed to initialize the model (e.g. setting
 * initial property values.)
 * @since 1.0.8
 */
Yii.CAsyncRecord.prototype.init = function () {
	};
/**
 * Returns a list of attribute names and their default values.
 * Child classes should override this!
 * @returns {Object} attributeName: value
 */
Yii.CAsyncRecord.prototype.attributeDefaults = function () {
	return {};
};
/**
 * Sets the parameters about query caching.
 * This is a shortcut method to {@link CDbConnection::cache()}.
 * It changes the query caching parameter of the {@link dbConnection} instance.
 * @param {Integer} duration the number of seconds that query results may remain valid in cache.
 * If this is 0, the caching will be disabled.
 * @param {Yii.CCacheDependency} dependency the dependency that will be used when saving the query results into cache.
 * @param {Integer} queryCount number of SQL queries that need to be cached after calling this method. Defaults to 1,
 * meaning that the next SQL query will be cached.
 * @returns {Yii.CAsyncRecord} the active record instance itself.
 * @since 1.1.7
 */
Yii.CAsyncRecord.prototype.cache = function (duration, dependency, queryCount) {
		if (dependency === undefined) {
			dependency = null;
		}
		if (queryCount === undefined) {
			queryCount = 1;
		}
		this.getDataSource().cache(duration, dependency, queryCount);
		return this;
	};

/**
 * Getter magic method.
 * This method is overridden so that RR attributes can be accessed like properties.
 * @param {String} name property name
 * @returns {Mixed} property value
 * @see getAttribute
 */
Yii.CAsyncRecord.prototype.get = function (name) {
		var getter, i, object, nameParts = [], limit;
		if (name.indexOf(".") !== -1) {
			nameParts = name.split(".");
			name = nameParts.shift();
		}
		if (this[name] !== undefined) {
			object = this[name];
		}
		else if (this._attributes[name] !== undefined) {
			object = this._attributes[name];
		}
		else if (this._related[name] !== undefined) {
			object = this._related[name];
		}
		if (object !== undefined) {
			if (nameParts.length > 0) {
				if (object instanceof Yii.CComponent) {
					return object.get(nameParts.join("."));
				}
				limit = nameParts.length;
				for (i = 0; i < limit; i++) {
					name = nameParts.shift();
					object = object[name];
					if (nameParts.length === 0) {
						return object;
					}
					
					if (object instanceof Yii.CComponent) {
						return object.get(nameParts.join("."));
					}
				}
			}
			return object;
		}
		else {
			if (nameParts.length > 0) {
				return Yii.CModel.prototype.get.call(this, php.array_merge([name],nameParts).join("."));
			}
			return Yii.CModel.prototype.get.call(this,name);
		}
	};
/**
 * Setter magic method.
 * This method is overridden so that RR attributes can be accessed like properties.
 * @param {String} name property name
 * @param {Mixed} value property value
 */
Yii.CAsyncRecord.prototype.set = function (name, value) {
		var nameParts = [];
		if (name.indexOf(".") !== -1) {
			nameParts = name.split(".");
			name = nameParts.pop();
			nameParts = nameParts.join(".");
			return (this.get(nameParts)[name] = value);
		}
		else if(this.setAttribute(name,value)===false) {
			if(this.relations[name] !== undefined) {
				this._related[name]=value;
			}
			else {
				Yii.CModel.prototype.set.call(this, name,value);
			}
		}
	};
/**
 * Gets the data source for this model.
 * @returns {Yii.CActiveDataSource} The data source that this model interacts with
 */
Yii.CAsyncRecord.prototype.getDataSource = function () {
	if (this._ds !== null) {
		if (this._ds instanceof Yii.CActiveDataSource) {
			return this._ds;
		}
		this._ds = Yii.createComponent(this._ds);
	}
	return this._ds;
};

/**
 * Sets the data source for this model
 * @param {Yii.CActiveDataSource} value The data source to use with this model
 */
Yii.CAsyncRecord.prototype.setDataSource = function (value) {
	var className;
	if (!(value instanceof Yii.CActiveDataSource)) {
		if (value['class'] !== undefined) {
			className = value['class'];
			delete value['class'];
		}
		else {
			className = 'CActiveDataSource';
		}
		
		value = Yii.createComponent(className, value);
	}
	this._ds = value;
}

/**
 * Checks whether this AR has the named attribute
 * @param {String} name attribute name
 * @returns {Boolean} whether this AR has the named attribute (table column).
 */
Yii.CAsyncRecord.prototype.hasAttribute = function (name) {
		return this.get(name) !== undefined;
	};
/**
 * Returns the named attribute value.
 * If this is a new record and the attribute is not set before,
 * the default column value will be returned.
 * If this record is the result of a query and the attribute is not loaded,
 * null will be returned.
 * You may also use $this->AttributeName to obtain the attribute value.
 * @param {String} name the attribute name
 * @returns {Mixed} the attribute value. Null if the attribute is not set or does not exist.
 * @see hasAttribute
 */
Yii.CAsyncRecord.prototype.getAttribute = function (name) {
		if(this[name] !== undefined) {
			return this[name];
		}
		else if(this._attributes[name] !== undefined) {
			return this._attributes[name];
		}
	};
/**
 * Returns all column attribute values.
 * Note, related objects are not returned.
 * @param {Mixed} names names of attributes whose value needs to be returned.
 * If this is true (default), then all attribute values will be returned, including
 * those that are not loaded from DB (null will be returned for those attributes).
 * If this is null, all attributes except those that are not loaded from DB will be returned.
 * @returns {Array} attribute values indexed by attribute names.
 */
Yii.CAsyncRecord.prototype.getAttributes = function (names) {
		var attributes, nameColumn, name, attrs, i, column;
		if (names === undefined) {
			names = true;
		}
		attributes=this._attributes;
		
		if(Object.prototype.toString.call(names) === '[object Array]') {
			attrs=[];
			for (i in names) {
				if (names.hasOwnProperty(i)) {
					name = names[i];
					if(this[name] !== undefined) {
						attrs[name]=this.name;
					}
					else {
						attrs[name]=attributes[name] !== undefined?attributes[name]:null;
					}
				}
			}
			return attrs;
		}
		else {
			return attributes;
		}
	};
/**
 * Sets the named attribute value.
 * You may also use $this->AttributeName to set the attribute value.
 * @param {String} name the attribute name
 * @param {Mixed} value the attribute value.
 * @returns {Boolean} whether the attribute exists and the assignment is conducted successfully
 * @see hasAttribute
 */
Yii.CAsyncRecord.prototype.setAttribute = function (name, value) {
		if(this[name] !== undefined) {
			this[name]=value;
		}
		else if(this._attributes[name] !== undefined) {
			this._attributes[name]=value;
		}
		else {
			return false;
		}
		return true;
	};

/**
 * Returns if the current record is new.
 * @returns {Boolean} whether the record is new and should be inserted when calling {@link save}.
 * This property is automatically set in constructor and {@link populateRecord}.
 * Defaults to false, but it will be set to true if the instance is created using
 * the new operator.
 */
Yii.CAsyncRecord.prototype.getIsNewRecord = function () {
		return this._new;
	};
/**
 * Sets if the record is new.
 * @param {Boolean} value whether the record is new and should be inserted when calling {@link save}.
 * @see getIsNewRecord
 */
Yii.CAsyncRecord.prototype.setIsNewRecord = function (value) {
		this._new=value;
	};
/**
 * This event is raised before the record is saved.
 * By setting {@link CModelEvent::isValid} to be false, the normal {@link save()} process will be stopped.
 * @param {Yii.CModelEvent} event the event parameter
 * @since 1.0.2
 */
Yii.CAsyncRecord.prototype.onBeforeSave = function (event) {
		this.raiseEvent('onBeforeSave',event);
	};
/**
 * This event is raised after the record is saved.
 * @param {Yii.CEvent} event the event parameter
 * @since 1.0.2
 */
Yii.CAsyncRecord.prototype.onAfterSave = function (event) {
		this.raiseEvent('onAfterSave',event);
	};
/**
 * This event is raised before the record is deleted.
 * By setting {@link CModelEvent::isValid} to be false, the normal {@link delete()} process will be stopped.
 * @param {Yii.CModelEvent} event the event parameter
 * @since 1.0.2
 */
Yii.CAsyncRecord.prototype.onBeforeDelete = function (event) {
		this.raiseEvent('onBeforeDelete',event);
	};
/**
 * This event is raised after the record is deleted.
 * @param {Yii.CEvent} event the event parameter
 * @since 1.0.2
 */
Yii.CAsyncRecord.prototype.onAfterDelete = function (event) {
		this.raiseEvent('onAfterDelete',event);
	};
/**
 * This event is raised before an AR finder performs a find call.
 * In this event, the {@link CModelEvent::criteria} property contains the query criteria
 * passed as parameters to those find methods. If you want to access
 * the query criteria specified in scopes, please use {@link getDbCriteria()}.
 * You can modify either criteria to customize them based on needs.
 * @param {Yii.CModelEvent} event the event parameter
 * @see beforeFind
 * @since 1.0.9
 */
Yii.CAsyncRecord.prototype.onBeforeFind = function (event) {
		this.raiseEvent('onBeforeFind',event);
	};
/**
 * This event is raised after the record is instantiated by a find method.
 * @param {Yii.CEvent} event the event parameter
 * @since 1.0.2
 */
Yii.CAsyncRecord.prototype.onAfterFind = function (event) {
		this.raiseEvent('onAfterFind',event);
	};
/**
 * This method is invoked before saving a record (after validation, if any).
 * The default implementation raises the {@link onBeforeSave} event.
 * You may override this method to do any preparation work for record saving.
 * Use {@link isNewRecord} to determine whether the saving is
 * for inserting or updating record.
 * Make sure you call the parent implementation so that the event is raised properly.
 * @returns {Boolean} whether the saving should be executed. Defaults to true.
 */
Yii.CAsyncRecord.prototype.beforeSave = function () {
		var event;
		if(this.hasEventHandler('onBeforeSave')) {
			event=new Yii.CModelEvent(this);
			this.onBeforeSave(event);
			return event.isValid;
		}
		else {
			return true;
		}
	};
/**
 * This method is invoked after saving a record successfully.
 * The default implementation raises the {@link onAfterSave} event.
 * You may override this method to do postprocessing after record saving.
 * Make sure you call the parent implementation so that the event is raised properly.
 */
Yii.CAsyncRecord.prototype.afterSave = function () {
		if(this.hasEventHandler('onAfterSave')) {
			this.onAfterSave(new Yii.CEvent(this));
		}
	};
/**
 * This method is invoked before deleting a record.
 * The default implementation raises the {@link onBeforeDelete} event.
 * You may override this method to do any preparation work for record deletion.
 * Make sure you call the parent implementation so that the event is raised properly.
 * @returns {Boolean} whether the record should be deleted. Defaults to true.
 */
Yii.CAsyncRecord.prototype.beforeDelete = function () {
		var event;
		if(this.hasEventHandler('onBeforeDelete')) {
			event=new Yii.CModelEvent(this);
			this.onBeforeDelete(event);
			return event.isValid;
		}
		else {
			return true;
		}
	};
/**
 * This method is invoked after deleting a record.
 * The default implementation raises the {@link onAfterDelete} event.
 * You may override this method to do postprocessing after the record is deleted.
 * Make sure you call the parent implementation so that the event is raised properly.
 */
Yii.CAsyncRecord.prototype.afterDelete = function () {
		if(this.hasEventHandler('onAfterDelete')) {
			this.onAfterDelete(new Yii.CEvent(this));
		}
	};
/**
 * This method is invoked before an AR finder executes a find call.
 * The find calls include {@link find}, {@link findAll}, {@link findByPk},
 * {@link findAllByPk}, {@link findByAttributes} and {@link findAllByAttributes}.
 * The default implementation raises the {@link onBeforeFind} event.
 * If you override this method, make sure you call the parent implementation
 * so that the event is raised properly.
 * 
 * Starting from version 1.1.5, this method may be called with a hidden {@link CDbCriteria}
 * parameter which represents the current query criteria as passed to a find method of AR.
 * 
 * @since 1.0.9
 */
Yii.CAsyncRecord.prototype.beforeFind = function () {
		var event;
		if(this.hasEventHandler('onBeforeFind')) {
			event=new Yii.CModelEvent(this);
			// for backward compatibility
			event.criteria=arguments.length>0 ? arguments[0] : null;
			this.onBeforeFind(event);
		}
	};
/**
 * This method is invoked after each record is instantiated by a find method.
 * The default implementation raises the {@link onAfterFind} event.
 * You may override this method to do postprocessing after each newly found record is instantiated.
 * Make sure you call the parent implementation so that the event is raised properly.
 */
Yii.CAsyncRecord.prototype.afterFind = function () {
		if(this.hasEventHandler('onAfterFind')) {
			this.onAfterFind(new Yii.CEvent(this));
		}
	};
/**
 * Calls {@link beforeFind}.
 * This method is internally used.
 * @since 1.0.11
 */
Yii.CAsyncRecord.prototype.beforeFindInternal = function () {
		this.beforeFind();
	};
/**
 * Calls {@link afterFind}.
 * This method is internally used.
 * @since 1.0.3
 */
Yii.CAsyncRecord.prototype.afterFindInternal = function () {
		this.afterFind();
	};
	
	
/**
 * Adds an item to the data source based on this remote record attributes.
 * Note, validation is not performed in this method. You may call {@link validate} to perform the validation.
 * After the record is inserted to data source successfully, its {@link isNewRecord} property will be set false,
 * and its {@link scenario} property will be set to be 'update'.
 * @param {Array} attributes list of attributes that need to be saved. Defaults to null,
 * meaning all attributes that are loaded from DS will be saved.
 * @param {Function} callback The callback that will be executed after the insert succeeds
 * @returns {Mixed} The data source request
 * @throws {Yii.CException} if the record is not new
 */
Yii.CAsyncRecord.prototype.create = function (attributes, callback) {
		var builder, table, command, primaryKey, i, pk, self = this, func, postData;
		if (attributes === undefined) {
			attributes = null;
		}
		if(!this.getIsNewRecord()) {
			throw new Yii.CDbException(Yii.t('yii','The remote record cannot be created because it is not new.'));
		}
		if(this.beforeSave()) {
			Yii.trace(this.getClassName()+'.create()','system.ds.CAsyncRecord');
			func = function (data, dataSource) {
				var model;
				model = self.populateRecord(data);
				model.afterSave();
				model.setIsNewRecord(false);
				model.setScenario('update');
				callback(model, dataSource);
			};
			if (this.wrapData === true) {
				postData = {};
				postData[this.getClassName()] = this.getAttributes(attributes);
			}
			else if (this.wrapData) {
				postData = {};
				postData[this.wrapData] = this.getAttributes(attributes);
			}
			else {
				postData = this.getAttributes(attributes);
			}
			return this.getDataSource().create(postData, func);
		}
		return false;
	};
/**
 * Updates the row represented by this remote record.
 * All loaded attributes will be saved to the database.
 * Note, validation is not performed in this method. You may call {@link validate} to perform the validation.
 * @param {Array} attributes list of attributes that need to be saved. Defaults to null,
 * meaning all attributes that are loaded from DB will be saved.
 * @param {Function} callback The callback that will be executed after the update succeeds
 * @returns {Mixed} The data source request
 * @throws {Yii.CException} if the record is new
 */
Yii.CAsyncRecord.prototype.update = function (attributes, callback) {
		var self = this, func, postData;
		if (attributes === undefined) {
			attributes = null;
		}
		if(this.getIsNewRecord()) {
			throw new Yii.CDbException(Yii.t('yii','The remote record cannot be updated because it is new.'));
		}
		
		if(this.beforeSave()) {
			Yii.trace(this.getClassName()+'.update()','system.ds.CAsyncRecord');
			func = function (data, dataSource) {
				var model;
				model = self.populateRecord(data);
				model.afterSave();
				model.setIsNewRecord(false);
				model.setScenario('update');
				callback(model, dataSource);
			};
			if (this.wrapData === true) {
				postData = {};
				postData[this.getClassName()] = this.getAttributes(attributes);
			}
			else if (this.wrapData) {
				postData = {};
				postData[this.wrapData] = this.getAttributes(attributes);
			}
			else {
				postData = this.getAttributes(attributes);
			}
			
			return this.getDataSource().update(postData, func);
		}
		else {
			return false;
		}
	};
/**
 * Saves a selected list of attributes.
 * Unlike {@link save}, this method only saves the specified attributes
 * of an existing row dataset and does NOT call either {@link beforeSave} or {@link afterSave}.
 * Also note that this method does neither attribute filtering nor validation.
 * So do not use this method with untrusted data (such as user posted data).
 * @param {Array} attributes attributes to be updated. Each element represents an attribute name
 * or an attribute value indexed by its name. If the latter, the record's
 * attribute will be changed accordingly before saving.
 * @param {Function} callback The callback that will be executed after the insert succeeds
 * @returns {Mixed} The data source request
 * @throws {Yii.CException} if the record is new or any database error
 */
Yii.CAsyncRecord.prototype.saveAttributes = function (attributes, callback) {
		var values, name, value;
		if(!this.getIsNewRecord()) {
			Yii.trace(this.getClassName()+'.saveAttributes()','system.ds.CAsyncRecord');
			values={};
			for (name in attributes) {
				if (attributes.hasOwnProperty(name)) {
					value = attributes[name];
					if((typeof(name) === 'number' && (name % 1 ? false : true))) {
						values[value]=this[value];
					}
					else {
						values[name]=this[name]=value;
					}
				}
			}
			Yii.trace(this.getClassName()+'.update()','system.ds.CAsyncRecord');
			return this.getDataSource().update(values, callback);
		}
		else {
			throw new Yii.CDbException(Yii.t('yii','The active record cannot be updated because it is new.'));
		}
	};
/**
 * Saves the current record.
 * 
 * The record is created if its {@link isNewRecord}
 * property is true (usually the case when the record is created using the 'new'
 * operator). Otherwise, it will be used to update the corresponding item in the data source
 * (usually the case if the record is obtained using one of those 'find' methods.)
 * 
 * Validation will be performed before saving the record. If the validation fails,
 * the record will not be saved. You can call {@link getErrors()} to retrieve the
 * validation errors.
 * 
 * If the record is saved via insertion, its {@link isNewRecord} property will be
 * set false, and its {@link scenario} property will be set to be 'update'.
 * And if its primary key is auto-incremental and is not set before insertion,
 * the primary key will be populated with the automatically generated key value.
 * @param {Function} callback The callback function that will be executed after the save
 * @param {Boolean} runValidation whether to perform validation before saving the record.
 * If the validation fails, the record will not be saved to database.
 * @param {Array} attributes list of attributes that need to be saved. Defaults to null,
 * meaning all attributes that are loaded from DB will be saved.
 * @returns {Mixed} the response from the data source
 */
Yii.CAsyncRecord.prototype.save = function (callback, runValidation, attributes) {
		if (runValidation === undefined) {
			runValidation = true;
		}
		if (attributes === undefined) {
			attributes = null;
		}
		if(!runValidation || this.validate(attributes)) {
			
			return this.getIsNewRecord() ? this.create(attributes, callback) : this.update(attributes, callback);
		}
		else {
			return false;
		}
	};
	
/**
 * Creates a remote record with the given attributes.
 * This method is internally used by the find methods.
 * @param {Array} attributes attribute values (column name=>column value)
 * @param {Boolean} callAfterFind whether to call {@link afterFind} after the record is populated.
 * This parameter is added in version 1.0.3.
 * @returns {Yii.CAsyncRecord} the newly created active record. The class of the object is the same as the model class.
 * Null is returned if the input data is false.
 */
Yii.CAsyncRecord.prototype.populateRecord = function (attributes, callAfterFind) {
		var record, md, name, value;
		if (callAfterFind === undefined) {
			callAfterFind = true;
		}
		if(attributes!==false) {
			record=this.instantiate(attributes);
			record.setIsNewRecord(false);
			record.setScenario('update');
			record.init();
			
			for (name in attributes) {
				if (attributes.hasOwnProperty(name)) {
					value = attributes[name];
					if(record[name] !== undefined) {
						record[name]=value;
					}
					else if(record._attributes[name] !== undefined) {
						record._attributes[name]=value;
					}
				}
			}
			record._pk=record.getPrimaryKey();
			record.attachBehaviors(record.behaviors());
			if(callAfterFind) {
				record.afterFind();
			}
			return record;
		}
		else {
			return null;
		}
	};
/**
 * Creates a list of active records based on the input data.
 * This method is internally used by the find methods.
 * @param {Array} data list of attribute values for the active records.
 * @param {Boolean} callAfterFind whether to call {@link afterFind} after each record is populated.
 * This parameter is added in version 1.0.3.
 * @param {String} index the name of the attribute whose value will be used as indexes of the query result array.
 * If null, it means the array will be indexed by zero-based integers.
 * @returns {Array} list of active records.
 */
Yii.CAsyncRecord.prototype.populateRecords = function (data, callAfterFind, index) {
		var records, i, limit, record, attributes;
		if (callAfterFind === undefined) {
			callAfterFind = true;
		}
		if (index === undefined) {
			index = null;
		}
		records=[];
		limit = data.length;
		for (i = 0; i < limit; i++) {
			attributes = data[i];
			if((record=this.populateRecord(attributes,callAfterFind))!==null) {
				if(index===null) {
					records.push(record);
				}
				else {
					records[record[index]]=record;
				}
			}
		}
		return records;
	};
/**
 * Creates an active record instance.
 * This method is called by {@link populateRecord} and {@link populateRecords}.
 * You may override this method if the instance being created
 * depends the attributes that are to be populated to the record.
 * For example, by creating a record based on the value of a column,
 * you may implement the so-called single-table inheritance mapping.
 * @param {Object} attributes list of attribute values for the active records.
 * @returns {Yii.CAsyncRecord} the active record
 * @since 1.0.2
 */
Yii.CAsyncRecord.prototype.instantiate = function (attributes) {
		var classVar, model;
		classVar=this.getClassName();
		model=new Yii[classVar]();
		return model;
	};

/**
 * Returns the primary key value.
 * @returns {Mixed} the primary key value. An array (column name=>column value) is returned if the primary key is composite.
 * If primary key is not defined, null will be returned.
 */
Yii.CAsyncRecord.prototype.getPrimaryKey = function () {
		var table, values,name,pk,self = this;
		pk = this.primaryKey();
		
		if(typeof(pk) === 'string') {
			
			return this.get(pk);
		}
		else if(Object.prototype.toString.call(pk) === '[object Array]') {
			values={};
			Yii.forEach(pk, function (i, name) {
				values[name] = self.get(name);
			});
			return values;
		}
		else {
			return null;
		}
	};
/**
 * Sets the primary key value.
 * After calling this method, the old primary key value can be obtained from {@link oldPrimaryKey}.
 * @param {Mixed} value the new primary key value. If the primary key is composite, the new value
 * should be provided as an array (column name=>column value).
 * @since 1.1.0
 */
Yii.CAsyncRecord.prototype.setPrimaryKey = function (value) {
		var table, values,name,pk,self = this;
		pk = this.primaryKey();
		if(typeof(pk) === 'string') {
			this.set(pk, value);
		}
		else if(Object.prototype.toString.call(pk) === '[object Array]') {
			values={};
			Yii.forEach(pk, function (i, name) {
				self[name] = value[i];
			});
			
		}
		
	};
/**
 * Performs a query, this is mainly used internally by the find / findAll methods
 * @param {Function} callback The callback function to execute when data arrives
 * @param {Object} criteria The criteria that will be sent to the server
 * @param {Boolean} all whether to return all data or not
 */
Yii.CAsyncRecord.prototype.query = function (callback, criteria, all) {
	var command, finder, func, self = this;
	if (all === undefined) {
		all = false;
	}
    this.beforeFind();
    func = function(data, dataSource) {
    	if (all) {
    		return callback(self.populateRecords(data, true), dataSource);
    	}
    	else {
    		return callback(self.populateRecord(data.shift(), true), dataSource);
    	}
    };
    return this.getDataSource().search(criteria,func);
};


/**
 * Finds a single remote record with the specified condition.
 * @param {Function} callback The callback function that will recieve the results
 * @param {Mixed} criteria query criteria.
 * @returns {Yii.CAsyncRecord} the record found. Null if no record is found.
 */
Yii.CAsyncRecord.prototype.find = function (callback, criteria) {
		
		Yii.trace(this.getClassName()+'.find()','system.ds.CAsyncRecord');
		
		return this.query(callback, criteria);
	};
/**
 * Finds all remote records satisfying the specified condition.
 * See {@link find()} for detailed explanation about $condition and $params.
 * @param {Function} callback The callback function that will recieve the results
 * @param {Mixed} criteria query criteria.
 * @returns {Array} list of active records satisfying the specified condition. An empty array is returned if none is found.
 */
Yii.CAsyncRecord.prototype.findAll = function (callback, criteria) {
		Yii.trace(this.getClassName()+'.findAll()','system.ds.CAsyncRecord');
		return this.query(callback, criteria,true);
		
	};
/**
 * Finds a remote active record with the specified primary key.
 * See {@link find()} for detailed explanation about $condition and $params.
 * @param {Function} callback The callback function that will recieve the results
 * @param {Mixed} pk primary key value(s). Use array for multiple primary keys. For composite key, each key value must be an array (column name=>column value).
 * @returns {Yii.CAsyncRecord} the record found. Null if none is found.
 */
Yii.CAsyncRecord.prototype.findByPk = function (callback, pk, criteria) {
		var postData;
		if (criteria === undefined) {
			criteria = {};
		}
		criteria[this.primaryKey()] = pk;
		if (this.wrapData === true) {
			postData = {};
			postData[this.getClassName()] = criteria;
		}
		else if (this.wrapData) {
			postData = {};
			postData[this.wrapData] = criteria;
		}
		else {
			postData = criteria;
		}
		Yii.trace(this.getClassName()+'.findByPk()','system.ds.CAsyncRecord');
		
		
		return this.query(callback, postData);
	};
/**
 * Finds all active records with the specified primary keys.
 * See {@link find()} for detailed explanation about $condition and $params.
 * @param {Function} callback The callback function that will recieve the results
 * @param {Mixed} pk primary key value(s). Use array for multiple primary keys. For composite key, each key value must be an array (column name=>column value).
 * @param {Mixed} condition query condition or criteria.
 * @param {Object} params parameters to be bound to an SQL statement.
 * @returns {Array} the records found. An empty array is returned if none is found.
 */
Yii.CAsyncRecord.prototype.findAllByPk = function (callback, pk, criteria) {
		var postData;
		if (criteria === undefined) {
			criteria = {};
		}
		criteria[this.primaryKey()] = pk;
		if (this.wrapData === true) {
			postData = {};
			postData[this.getClassName()] = criteria;
		}
		else if (this.wrapData) {
			postData = {};
			postData[this.wrapData] = criteria;
		}
		else {
			postData = criteria;
		}
		Yii.trace(this.getClassName()+'.findAllByPk()','system.ds.CAsyncRecord');
		return this.query(callback, postData,true);
	};
/**
 * Finds a single active record that has the specified attribute values.
 * See {@link find()} for detailed explanation about $condition and $params.
 * @param {Function} callback The callback function that will recieve the results
 * @param {Object} attributes list of attribute values (indexed by attribute names) that the active records should match.
 * Since version 1.0.8, an attribute value can be an array which will be used to generate an IN condition.
 * @returns {Yii.CAsyncRecord} the record found. Null if none is found.
 */
Yii.CAsyncRecord.prototype.findByAttributes = function (callback, attributes) {
		var postData;
		Yii.trace(this.getClassName()+'.findByAttributes()','system.ds.CAsyncRecord');
		
		if (this.wrapData === true) {
			postData = {};
			postData[this.getClassName()] = attributes;
		}
		else if (this.wrapData) {
			postData = {};
			postData[this.wrapData] = attributes;
		}
		else {
			postData = attributes;
		}
		return this.query(callback, postData);
	};
/**
 * Finds all active records that have the specified attribute values.
 * See {@link find()} for detailed explanation about $condition and $params.
 * @param {Function} callback The callback function that will recieve the results
 * @param {Array} attributes list of attribute values (indexed by attribute names) that the active records should match.
 * Since version 1.0.8, an attribute value can be an array which will be used to generate an IN condition.
 * @returns {Array} the records found. An empty array is returned if none is found.
 */
Yii.CAsyncRecord.prototype.findAllByAttributes = function (callback, attributes) {
		var postData;
		Yii.trace(this.getClassName()+'.findAllByAttributes()','system.ds.CAsyncRecord');
		if (this.wrapData === true) {
			postData = {};
			postData[this.getClassName()] = attributes;
		}
		else if (this.wrapData) {
			postData = {};
			postData[this.wrapData] = attributes;
		}
		else {
			postData = attributes;
		}
		return this.query(callback, postData, true);
	};