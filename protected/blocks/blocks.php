<?php
Yii::setPathOfAlias("blocks", dirname(__FILE__));
$components = array("elasticSearch", "curl");
foreach($components as $component) {
	Yii::import("blocks.".$component.".*");
}

