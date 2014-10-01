<?php
/**
 * Created by PhpStorm.
 * User: walter
 * Date: 30/09/14
 * Time: 16.40
 */

class Mage_Page_Model_Observer {
    public function controllerFrontInitBefore($observer)
    {
        //Mage::getModel('geoip/country');
        $geoIP = Mage::getSingleton('geoip/country');


        $country = $geoIP->getCountry();
        //$countries = $geoIP->getAllowedCountries();

        $geoIP->setAllowedCountries($country);

        /**
         * Returns you the ISO 3166-1 code of visitors country.
         */
        //echo $geoIP->getCountry();

    }
} 