<?php
/**
 * @category    Fiver
 * @package     Fiver_RevSlideshow
 * @license     http://fiver.net
 * @author      Dzung Nova <dzung@fiver.vn>
 */

class Fiver_RevSlideshow_Block_Adminhtml_Slideshow extends Mage_Adminhtml_Block_Widget_Grid_Container
{
	public function __construct()
	{
		parent::__construct();
		
		$this->_controller = 'adminhtml_slideshow';
		$this->_blockGroup = 'revslideshow';
		$this->_headerText = $this->__('RevSlideshow / Slides');
	}
}