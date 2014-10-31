<?php
class GeoMarker {
	public $lat;
	public $lng;
	public $properties;


	/* Takes an array of GeoMarkers as argument, returns a proper GeoJSON */
	public static function JSONize($GeoMarkers =  array()) {

		assert(is_array($GeoMarkers)); // Basic validation
		
		$geojson = array();
		// Prepare GeoJSON Format
		$geojson['type'] = 'FeatureCollection';
		// Coordinate system
		$geojson['crs'] = array(
		        'type' => 'name',
			        'properties' => array(
				                'name' => 'urn:ogc:def:crs:OGC:1.3:CRS84'
						                ),
								        );
		$geojson['features'] = array();

		foreach($GeoMarkers as $G) {
			assert($G instanceof GeoMarker);
			$geojson['features'][] = $G->toArray();
		}
		return json_encode($geojson);

	}
	
	/* Transforms an instance of GeoMarker to an array ready for json transformation */
	public function toArray() {
		return array(
			'type' => 'Feature',
			'properties' => $this->getProperties(),
			'geometry' => array(
				'type' => 'Point',
				'coordinates' => array((float) $this->getLng(), (float) $this->getLat(), (float) 0)
			)
		);
	}

	/* Imports value from array, returns GeoMarker object */
	public static function fromArray($p = array()) {
		assert(is_numeric($p['lat']));
		assert(is_numeric($p['lng']));

		return new static($p); // Late static binding
	}

	/* Constructor */
	function __construct($p = array()) {
		$defaults = array(
			'lat' => 0,
			'lng' => 0,
			'properties' => array()
		);
		$p = array_merge($defaults, $p); 	
		$this->lat = $p['lat'];
		$this->lng = $p['lng'];
		$this->properties = $p['properties'];
	}
	
	// Return properties array, can be overloaded by child classes
	function getProperties() {
		return $this->properties;
	}
	
	function getLat() {
		return $this->lat;
	}

	function getLng() {
		return $this->lng;
	}

}
?>
