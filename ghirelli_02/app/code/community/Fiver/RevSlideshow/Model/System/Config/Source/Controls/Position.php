<?php
/**
 * @category    Fiver
 * @package     Fiver_RevSlideshow
 * @license     http://fiver.net
 * @author      Dzung Nova <dzung@fiver.vn>
 */

class Fiver_RevSlideshow_Model_System_Config_Source_Controls_Position
{
	/**
	 * Retrieve an array of possible options
	 *
	 * @return array
	 */
	public function toOptionArray($includeEmpty = false, $emptyText = '-- Please Select --')
	{
		$options = array();
		
		if ($includeEmpty) {
			$options[] = array(
				'value' => '',
				'label' => Mage::helper('adminhtml')->__($emptyText),
			);
		}
		
		foreach($this->getOptions() as $value => $label) {
			$options[] = array(
				'value' => $value,
				'label' => Mage::helper('adminhtml')->__($label),
			);
		}
	
		return $options;
	}
	
	/**
	 * Retrieve an array of possible options
	 *
	 * @return array
	 */
	public function getOptions()
	{
		return array(
			'' => 'None',
			'top' => 'Top',
			'middle' => 'Middle',
			'bottom' => 'Bottom',
			'below' => 'Below',
		);
	}
}
