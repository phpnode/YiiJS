/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CQueue implements a queue.
 * 
 * The typical queue operations are implemented, which include
 * {@link enqueue()}, {@link dequeue()} and {@link peek()}. In addition,
 * {@link contains()} can be used to check if an item is contained
 * in the queue. To obtain the number of the items in the queue,
 * check the {@link getCount Count} property.
 * 
 * Items in the queue may be traversed using foreach as follows,
 * <pre>
 * for (i in queue) +++
 * </pre>
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CQueue.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.collections
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CQueue = function CQueue(data) {
	this.readOnly = false;
	this.construct(data);
	
};
Yii.CQueue.prototype = new Yii.CList();
Yii.CQueue.prototype.constructor =  Yii.CQueue;

/**
 * Constructor.
 * Initializes the queue with an array or an iterable object.
 * @param {Array} data the intial data. Default is null, meaning no initialization.
 * @throws {Yii.CException} If data is not null and neither an array nor an iterator.
 */
Yii.CQueue.prototype.construct = function (data) {
		if (data === undefined) {
			data = null;
		}
		if(data!==null) {
			this.copyFrom(data);
		}
	};



/**
 * @param {Mixed} item the item
 * @returns {Boolean} whether the queue contains the item
 */
Yii.CQueue.prototype.contains = function (item) {
		var i, limit = this.length;
		for (i = 0; i < limit; i++) {
			if (item === this[i]) {
				return true;
			}
		}
		return false;
	};
/**
 * Returns the item at the top of the queue.
 * @returns {Mixed} item at the top of the queue
 * @throws {Yii.CException} if the queue is empty
 */
Yii.CQueue.prototype.peek = function () {
		if(this.length===0) {
			throw new Yii.CException(Yii.t('yii','The queue is empty.'));
		}
		else {
			return this[0];
		}
	};
/**
 * Removes and returns the object at the beginning of the queue.
 * @returns {Mixed} the item at the beginning of the queue
 * @throws {Yii.CException} if the queue is empty
 */
Yii.CQueue.prototype.dequeue = function () {
		if(this.length===0) {
			throw new Yii.CException(Yii.t('yii','The queue is empty.'));
		}
		else {
			return this.shift();
		}
	};
/**
 * Adds an object to the end of the queue.
 * @param {Mixed} item the item to be appended into the queue
 */
Yii.CQueue.prototype.enqueue = function (item) {
		this.push(item);
	};

