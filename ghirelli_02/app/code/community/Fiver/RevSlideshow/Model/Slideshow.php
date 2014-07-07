<?php
/**
 * @category    Fiver
 * @package     Fiver_RevSlideshow
 * @license     http://fiver.net
 * @author      Dzung Nova <dzung@fiver.vn>
 */

class Fiver_RevSlideshow_Model_Slideshow extends Mage_Core_Model_Abstract
{
	public function _construct()
	{
		$this->_init('revslideshow/slideshow');
	}

	
	public function getJson()
	{
		return $this->getData('json') ? $this->getData('json') : '';
	}
	public function getLayer() {
		return json_decode($this->getJson());
	}
	public function getImageUrl()
	{
		if (!$this->hasImageUrl()) {
			$this->setImageUrl(Mage::helper('revslideshow/image')->getImageUrl($this->getImage()));
		}
		return $this->getData('image_url');
	}
}
