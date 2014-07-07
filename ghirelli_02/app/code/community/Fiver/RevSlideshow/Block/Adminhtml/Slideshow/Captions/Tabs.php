<?php
/**
 * @category    Fiver
 * @package     Fiver_RevSlideshow
 * @license     http://fiver.net
 * @author      Dzung Nova <dzung@fiver.vn>
 */

class Fiver_RevSlideshow_Block_Adminhtml_Slideshow_Captions_Tabs extends Mage_Adminhtml_Block_Widget_Tabs
{
	public function __construct()
	{
		parent::__construct();
		$this->setId('revslideshow_slideshow_tabs');
		$this->setDestElementId('edit_form');
		$this->setTitle($this->__('RevSlideshow / Slideshow'));
	}
	
	protected function _beforeToHtml()
	{
		$this->addTab('general',
			array(
				'label' => $this->__('General'),
				'title' => $this->__('General'),
				'content' => $this->getLayout()->createBlock('revslideshow/adminhtml_slideshow_captions_tab_form')->toHtml(),
			)
		);
		
		return parent::_beforeToHtml();
	}
}
