<?php
header('Content-Type: application/xml; charset=utf-8');

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
echo "<pois>\n";

$fd = fopen('other_pois.csv', 'r');
while(($csv=fgetcsv($fd))) {


	echo "\t<poi>\n";
	echo "\t\t<name>" . (string) $csv[2] . "</name>\n";
	echo "\t\t<description>" . $csv[3] . "</description>\n";
	echo "\t\t<lat>" . (string) $csv[1] . "</lat>\n";
	echo "\t\t<lng>" . (string) $csv[0] . "</lng>\n";
	echo "\t\t<colour>" . "#F00" . "</colour>";
	echo "\t</poi>\n";

}
echo "</pois>\n";

fclose($fd);
?>
