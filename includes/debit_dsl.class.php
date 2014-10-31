<?php
class DebitDSL extends GeoMarker {
	public $name; // String
	public $phone; // String
	public $upload; // Float
	public $download; // Float
	public $nra; // String
	public $vdsl; // Bool
	public $attenuation; // Float
	
	function __construct($p = array()) {
		$defaults = array(
			'vdsl' => false,
			'name' => '',
			'phone' => '0300000000',
			'upload' => '0',
			'download' => '0',
			'nra' => '',
			'lat' => 0,
			'lng' => 0
		);
		$p = array_merge($defaults, $p);
		
		$this->name = $p['name'];
		$this->phone = $p['phone'];
		$this->upload = $p['upload'];
		$this->download = $p['download'];
		$this->nra = $p['nra'];
		$this->vdsl = $p['vdsl'];
		$this->attenuation = $p['attenuation'];
		parent::__construct(array(
			'lat' => $p['lat'],
			'lng' => $p['lng'],
			)
		);
	}
	
	/* Load XML File, return an array of NRA objects */
	static function loadFromXML($file = 'data/debits_dsl.xml') {
		$xml = simplexml_load_file($file);
		
		$r = array();
		

		foreach($xml->debit as $n) {
			$a = array(
				'name' => (string) $n->name,
				'description' => (string) $n->description,
				'vdsl' => ((string) $n->vdsl == 'true'),
				'phone' => (string) $n->phone,
				'upload' => (float) $n->upload,
				'download' => (float) $n->download,
				'nra' => (string) $n->nra,
				'attenuation' => (float) $n->attenuation,
				'lng' => (float) $n->lng,
				'lat' => (float) $n->lat
			);
			$r[] = static::fromArray($a);
		}
		return $r;
	}
	
	function getProperties() {
		$a = array(
			'phone' => $this->phone,
			'name' => $this->name,
			'vdsl' => $this->vdsl,
			'upload' => $this->upload,
			'download' => $this->download,
			'nra' => $this->nra
		);
		return $a;
	}
}
?>
