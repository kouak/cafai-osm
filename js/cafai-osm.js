var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

var bw_colours = { /* Markers colours, kbits used, rgb code for anything above said value */
	0 : "#259b24",
	1024 : "#8bc34a",
	2560 : "#cddc39",
	4096 : "#ffc107",
	6144 : "#ff9800",
	8192 : "#ff5722",
	10240 : "#e51c23",
	40960 : "#9c27b0"
};


function bw_to_colour(debit) {
	var ret = "#000";
	var d = parseInt(debit);
	$.each(bw_colours, function( key, col ) {
		//console.log('Testing now key > d ' + key + ' > ' + d );
		if(key > d) {
			return false; // Break .each loop
		}
		ret = col;
	});
	return ret;

}

function initmap() {
	// set up the map
	map = new L.Map('map');

	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 18, attribution: osmAttrib});		

	// start the map in Reims
	map.setView(new L.LatLng(49.25, 4.033),12);
	map.addLayer(osm);
	
	return map;
}


function nra_popup(feature) {
	return "<h4>" + feature.properties.name + "</h4>\n" +
		"<p>" + urlize(feature.properties.description) + "</p>\n";
}

function other_poi_popup(feature) {
        return "<h4>" + feature.properties.name + "</h4>\n" +
                "<p>" + urlize(feature.properties.description) + "</p>\n";
}

function debit_dsl_popup(feature) {
	content = "<h4>" + feature.properties.name + "</h4>\n";
	content += "<table>\n";
	content += "<tr><td><b>Téléphone :</b></td><td>" + feature.properties.phone + "</td></tr>\n";
	content += "<tr><td><b>Débit (D/U) :</b></td><td>" + feature.properties.download + 'k/' + feature.properties.upload + 'k (' + (parseInt(feature.properties.attenuation) || '0') + "dB";
	if(feature.properties.vdsl == true) {
		content += " VDSL";
	}
	content += ")</td></tr>\n";
	content += "</table>\n";
	return content;
}

function add_NRAs(data, map) { // Add exchanges
	// Style markers
	var geojsonMarkerOptions = {
		radius: 8,
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.9
	};
	L.geoJson(data, {
		pointToLayer: function (feature, latlng) {
			if(feature.properties.vdsl == true) {
				return L.circleMarker(latlng, $.extend(geojsonMarkerOptions, {fillColor: "#1a237e"})); // VDSL enabled
			} else {
				return L.circleMarker(latlng, $.extend(geojsonMarkerOptions, {fillColor: "#880e4f"})); // No VDSL
			}
		},
		onEachFeature: function (feature, layer) {
			layer.bindPopup(nra_popup(feature));
		}
	}).addTo(map);
}

function add_other_pois(data, map) { // Add exchanges
	// Style markers
	var geojsonMarkerOptions = {
		radius: 8,
		fillColor: '#3f51b5', // Default color
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.9
	};
	L.geoJson(data, {
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, $.extend(geojsonMarkerOptions, {fillColor: feature.properties.colour}));
		},
		onEachFeature: function (feature, layer) {
			layer.bindPopup(other_poi_popup(feature));
		}
	}).addTo(map);
}


function add_debits_DSL(data, map) { // Add broadband bandwidth 
	var geojsonMarkerOptions = {
		radius: 4,
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8
	};
	L.geoJson(data, {
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, $.extend(geojsonMarkerOptions, {fillColor: bw_to_colour(feature.properties.download)}));
		},
		onEachFeature: function (feature, layer) {
			layer.bindPopup(debit_dsl_popup(feature));
		}
	}).addTo(map);
}

$( document ).ready(function() {
	var map = initmap(); // Init map
	// Add exchanges
	$.getJSON('json.php?get=nras').done(
		function( data ){ 
			add_NRAs(data, map);
		}
	);
	// Add broadband speeds
	$.getJSON('json.php?get=debits_dsl').done(
		function( data ){ 
			add_debits_DSL(data, map);
		}
	);
	// Add other POIs
	$.getJSON('json.php?get=other_pois').done(
		function( data ){
			add_other_pois(data, map);
		}
	);
});
