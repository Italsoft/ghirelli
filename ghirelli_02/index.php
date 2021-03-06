<?php
/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category   Mage
 * @package    Mage
 * @copyright  Copyright (c) 2008 Irubin Consulting Inc. DBA Varien (http://www.varien.com)
 * @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

if (version_compare(phpversion(), '5.2.0', '<')===true) {
    echo  '<div style="font:12px/1.35em arial, helvetica, sans-serif;">
<div style="margin:0 0 25px 0; border-bottom:1px solid #ccc;">
<h3 style="margin:0; font-size:1.7em; font-weight:normal; text-transform:none; text-align:left; color:#2f2f2f;">
Whoops, it looks like you have an invalid PHP version.</h3></div><p>Magento supports PHP 5.2.0 or newer.
<a href="http://www.magentocommerce.com/install" target="">Find out</a> how to install</a>
 Magento using PHP-CGI as a work-around.</p></div>';
    exit;
}

require_once 'app/Mage.php';

/* Determine correct language store based on browser */
function getStoreForLanguage()
{
    if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
        foreach (explode(",", strtolower($_SERVER['HTTP_ACCEPT_LANGUAGE'])) as $accept) {
            if (preg_match("!([a-z-]+)(;q=([0-9.]+))?!", trim($accept), $found)) {
                $langs[] = $found[1];
                $quality[] = (isset($found[3]) ? (float) $found[3] : 1.0);
            }
        }
        // Order the codes by quality
        array_multisort($quality, SORT_NUMERIC, SORT_DESC, $langs);

        // get list of stores and use the store code for the key
        $stores = Mage::app()->getStores(false, true);

        // iterate through languages found in the accept-language header
        foreach ($langs as $lang) {
            $lang = substr($lang,0,2);
            if (isset($stores[$lang]) && $stores[$lang]->getIsActive()) return $stores[$lang];
        }
    }
    return Mage::app()->getStore();
}

/* Ritorna la country in base all'ip dal quale proviene la richiesta */
function getCountryForIP()
{
    // ATTENZIONE. Questa va chiamata prima di tutto,
    // perché provvede anche a inizializzare una variabile che serve
    // nella chiamata getSingleton.
    // in caso contrario la getSingleton fallisce.
    $stores = Mage::app()->getStores(false, true);

    $geoip = Mage::getSingleton('geoip/country');
    //$ip = "64.233.174.243"; // americano
    //$ip = "83.224.40.221";  // italiano
    //$country = $geoip->getCountryByIp($ip);
    $country = $geoip->getCountry();
    //Mage::log($country);
    return $country;
}

/* Determina il negozio corretto in base all'IP dal quale proviene la richiesta */
function getStoreForIP()
{
    // get list of stores and use the store code for the key
    // ATTENZIONE. Questa va chiamata prima di tutto,
    // perché provvede anche a inizializzare una variabile che serve
    // nella chiamata getSingleton.
    // in caso contrario la getSingleton fallisce.
    $stores = Mage::app()->getStores(false, true);

    $geoip = Mage::getSingleton('geoip/country');
    //$ip = "64.233.174.243"; // americano
    //$ip = "83.224.40.221";    // italiano
    //$country = $geoip->getCountryByIp($ip);
    $country = $geoip->getCountry();
    //Mage::log($country);

    // se trova implementato lo store relativo a country....
    $lang = substr($country,0,2);
    if (isset($stores[$lang]) && $stores[$lang]->getIsActive()){
        return $stores[$lang];
    }
    else{
        $lang = strtolower($lang);
        if (isset($stores[$lang]) && $stores[$lang]->getIsActive()){
            return $stores[$lang];
        }
    }
    // ...altrimenti ritorna lo store di default
    return Mage::app()->getStore();
}


/**
 * Error reporting
 */
error_reporting(E_ALL | E_STRICT);

/**
 * Compilation includes configuration file
 */
define('MAGENTO_ROOT', getcwd());

$compilerConfig = MAGENTO_ROOT . '/includes/config.php';
if (file_exists($compilerConfig)) {
    include $compilerConfig;
}

$mageFilename = MAGENTO_ROOT . '/app/Mage.php';
$maintenanceFile = 'maintenance.flag';

if (!file_exists($mageFilename)) {
    if (is_dir('downloader')) {
        header("Location: downloader");
    } else {
        echo $mageFilename." was not found";
    }
    exit;
}

if (file_exists($maintenanceFile)) {
    include_once dirname(__FILE__) . '/errors/503.php';
    exit;
}

require_once $mageFilename;

#Varien_Profiler::enable();

if (isset($_SERVER['MAGE_IS_DEVELOPER_MODE'])) {
    Mage::setIsDeveloperMode(true);
}

/* Auto redirect to language store view if request is for root */
// Versione per debug
//if (substr($_SERVER['REQUEST_URI'],0,23) === '/?XDEBUG_SESSION_START=') {
// Versione runtime
if ($_SERVER['REQUEST_URI'] === '/') {
    // identifica lo store dal linguaggio del browser
    //header('Location: '.getStoreForLanguage()->getBaseUrl());

    //Mage::log("in auto redirect");

    /* identifica lo store dall'ip dal quale proviene la richiesta
       Se la richiesta avviene dagli stati uniti, allora esegue
       una redirezione al sito americano (cablata).
       il sito americano non deve essere dichiarato come un negozio in magento
       questo è una schifezza, perché viola il meccanismo degli store di magento
       è stato fatto così solo per soddisfare a una specifica esigenza del cliente.
    */
    $country = getCountryForIP();
    if(substr_compare($country,'us',0,2,true) === 0) {
        header('Location: http://www.ghirelli.com/us');
    }
    else {
        header('Location: ' . getStoreForIP()->getBaseUrl());
    }
    exit;
}

#ini_set('display_errors', 1);

umask(0);

/* Store or website code */
$mageRunCode = isset($_SERVER['MAGE_RUN_CODE']) ? $_SERVER['MAGE_RUN_CODE'] : '';

/* Run store or run website */
$mageRunType = isset($_SERVER['MAGE_RUN_TYPE']) ? $_SERVER['MAGE_RUN_TYPE'] : 'store';

Mage::run($mageRunCode, $mageRunType);
