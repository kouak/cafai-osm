<?php
include('includes/geomarker.class.php');
include('includes/nra.class.php');
include('includes/debit_dsl.class.php');
include('includes/other_poi.class.php');

switch(@$_GET['get']) {
	case 'nras':
		$m = NRA::loadFromXML('data/nras.xml');
		break;
	case 'debits_dsl':
		$m = DebitDSL::loadFromXML('data/debits_dsl.xml');
		break;
	case 'other_pois':
		$m = OtherPOI::loadFromXML('data/other_pois.xml');
		break;
	default:
		$m = array();
}

header('Content-Type: application/json');
echo GeoMarker::JSONize($m);

?>
