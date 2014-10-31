<?php
header('Content-Type: application/xml; charset=utf-8');

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
echo "<debits>\n";

$fd = fopen('debits_dsl.csv', 'r');
while(($csv=fgetcsv($fd))) {


	$c = $csv[3];
	preg_match('/(\d+)M/', $c, $r);
	$dl = (int) $r[1];
	$dl *= 1024;
	preg_match('/(\d+)k/', $c, $r);
	$ul = $r[1];
	preg_match('/NRA: (\w{3}51)/', $c, $r);
	$nra = $r[1];
	preg_match('/Téléphone: ([^<]+)<BR>/', $c, $r);
	$phone = $r[1];
	$vdsl = (bool) preg_match('/VDSL/i', $c);

	echo "\t<debit>\n";
	echo "\t\t<name>" . (string) $csv[2] . "</name>\n";
	echo "\t\t<description></description>\n";
	echo "\t\t<lat>" . (string) $csv[1] . "</lat>\n";
	echo "\t\t<lng>" . (string) $csv[0] . "</lng>\n";
	echo "\t\t<download>" . (string) $dl . "</download>\n";
	echo "\t\t<upload>" . (string) $ul . "</upload>\n";
	echo "\t\t<nra>" . (string) $nra . "</nra>\n";
	echo "\t\t<phone>" . (string) $phone . "</phone>\n";
	echo "\t\t<vdsl>" . ($vdsl ? "true" : "false") . "</vdsl>\n";
	echo "\t\t<attenuation>0</attenuation>\n";
	echo "\t</debit>\n";

}
echo "</debits>\n";

fclose($fd);
?>
