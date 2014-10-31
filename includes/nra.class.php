<?php
class NRA extends GeoMarker {
	public $name; // String
	public $description; // String
	public $vdsl; // Bool
	
	function __construct($p = array()) {
		$defaults = array(
			'vdsl' => false,
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
		$this->vdsl = $p['vdsl'];
		parent::__construct(array(
			'lat' => $lat,
			'lng' => $lng,
			)
		);
	}
	
	/* Load XML File, return an array of NRA objects */
	static function loadFromXML($file = 'data/nras.xml') {
		$xml = simplexml_load_file('data/nras.xml');
		$nras = $xml->nra; /* <nra> subtree */
		
		$r = array();
		
		foreach($xml->nra as $n) {
			$a = array(
				'name' => (string) $n->name,
				'description' => (string) $n->description,
				'vdsl' => ((string) $n->vdsl == 'true'),
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
			'vdsl' => $this->vdsl 
		);
		return $a;
	}
}
?>
