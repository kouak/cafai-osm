CAFAI-OSM Data format
======

Multiple files here :
 * debits_dsl.xml
 * nras.xml
 * other_pois.xml

debits_dsl.xml (Broadband speeds)
------

This file contains broadband speed markers.
File structure :
```xml
<?xml version="1.0" encoding="UTF-8"?>
<debits>
        <debit>
		DATA HERE
	</debit>
</debits>
```

Data structure :
```xml
<debit>
	<name>string: Marker's name</name>
	<description>string: Marker's description</description>
	<lat>float: Lattitude</lat>
	<lng>float: Longitude</lng>
	<download>integer: Speed (kbits)</download>
	<upload>integer: Speed (kbits)</upload>
	<nra>string: Exchange name</nra>
	<phone>string: Phone number of the tested line</phone>
	<vdsl>Boolean : VDSL status (true or false)</vdsl>
	<attenuation>float: Attenuation value (dB)</attenuation>
</debit>
```

nras.xml (Exchange locations)
------

This file contains exchange location markers.
File structure :
```xml
<?xml version="1.0" encoding="UTF-8"?>
<nras>
        <nra>
                DATA HERE
        </nra>
</nras>
```

Data structure :
```xml
<nra>
	<name>string: Exchange's name</name>
	<description>string: Exchange's description</description>
	<vdsl>boolean: VDSL status (true/false)</vdsl>
	<lat>float: Lattitude</lat>
	<lng>float: Longitude</lng>
</nra>
```

other_pois.xml
------

This file contains other POI markers.
File structure :
```xml
<?xml version="1.0" encoding="UTF-8"?>
<pois>
        <poi>
                DATA HERE
        </poi>
</pois>
```

Data structure :
```xml
<poi>
        <name>string: POI's name</name>
        <description>string: POI's description</description>
	<colour>string: POI's colour hex code</colour>
        <lat>float: Lattitude</lat>
        <lng>float: Longitude</lng>
</poi>
```



