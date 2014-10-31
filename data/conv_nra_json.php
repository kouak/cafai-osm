<?php
$json = file_get_contents('NRAs.json');
$json_a = json_decode($json);

header('Content-Type: application/xml; charset=utf-8');

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
echo "<nras>\n";

foreach($json_a->features as $n) {

	echo "\t<nra>\n";
	echo "\t\t<name>" . (string) $n->properties->name . "</name>\n";
	echo "\t\t<description>" . (string) $n->properties->description . "</description>\n";
	echo "\t\t<vdsl>" . (($n->properties->VDSL == true) ? "true" : "false") . "</vdsl>\n";
	echo "\t\t<lat>" . (string) $n->geometry->coordinates[1] . "</lat>\n";
	echo "\t\t<lng>" . (string) $n->geometry->coordinates[0] . "</lng>\n";
	echo "\t</nra>\n";

}
echo "</nras>\n";
?>
