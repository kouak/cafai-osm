<?php
class OtherPOI extends GeoMarker {
	public $name; // String
	public $description; // String
	public $colour; // Bool
	
	function __construct($p = array()) {
		$defaults = array(
			'colour' => '#3f51b5',
			'name' => '',
			'description' => '',
			'lat' => 0,
			'lng' => 0
		);
		$p = array_merge($defaults, $p);
		$lat = $p['lat']; // Cleanup $p array
		unset($p['lat']);
		$lng = $p['lng'];
		unset($p['lng']);
		
		$this->name = $p['name'];
		$this->description = $p['description'];
		$this->colour = $p['colour'];
		parent::__construct(array(
			'lat' => $lat,
			'lng' => $lng,
			)
		);
	}
	
	/* Load XML File, return an array of NRA objects */
	static function loadFromXML($file = 'data/other_pois.xml') {
		$xml = simplexml_load_file('data/other_pois.xml');
		
		$r = array();
		
		foreach($xml->poi as $n) {
			$a = array(
				'name' => (string) $n->name,
				'description' => (string) $n->description,
				'colour' => (string) $n->colour,
				'lng' => (float) $n->lng,
				'lat' => (float) $n->lat
			);
			$r[] = static::fromArray($a);
		}
		return $r;
	}
	
	// Overload get properties
	function getProperties() {
		$a = array(
			'name' => $this->name,
			'description' => $this->description,
			'colour' => $this->colour
		);
		return $a;
	}
}
?>
