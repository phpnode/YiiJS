<?php
/**
 * Allows easy indexing and searching for Active Records 
 * @package blocks.elasticSearch
 * @author Charles Pick
 */
class AElasticSearchable extends CActiveRecordBehavior {
	/**
	 * The model attributes that should be indexed,
	 * defaults to null meaning index all attributes
	 * @var array
	 */
	public $indexAttributes;
	
	/**
	 * The name of the elastic search application component,
	 * defaults to "elasticSearch"
	 * @var string
	 */
	public $componentID  = "elasticSearch";
	
	
	/**
	 * The name of the index to use for storing the items.
	 * Defaults to null meaning use the value of {@link AElasticSearch::$defaultIndex}
	 * @var string
	 */
	public $indexName;
	
	/**
	 * The type to use when storing the items.
	 * Defaults to null meaning use the class name of the behavior owner.
	 * @var string
	 */
	public $type;
	
	/**
	 * Triggered after the model saves, this is where we index the item
	 * @see CActiveRecordBehavior::afterSave()
	 */
	public function afterSave() {
				
		return true;
	}
	
	/**
	 * Triggered after the model is deleted, this is where we de-index the item
	 * @see CActiveRecordBehavior::afterDelete()
	 */
	public function afterDelete() {
		
		return true;
	}
	
	/**
	 * Adds the record to the elastic search index
	 */
	public function index() {
		if ($this->indexAttributes === null) {
			$attributes = array();
		}
		else {
			$attributes = $this->indexAttributes;
		}
		$data = array();
		foreach($attributes as $attribute) {
			$data[$attribute] = $this->owner->{$attribute};
		}
		if ($this->type === null) {
			$this->type = get_class($this->owner);
		}
		$response = Yii::app()->{$this->componentID}->index($this->indexName, $type, $data);
		print_r($response);
		die();
	}
}
