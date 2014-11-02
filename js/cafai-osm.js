var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];
var initial_layer;
var exchange_layer;
var speed_layer;
var other_pois_layer;
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
	initial_layer = osm;
		
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
	content += "<tr><td><b>NRA :</td><td>" + feature.properties.nra + "</td></tr>\n";
	content += "</table>\n";
	return content;
}

function add_NRAs(data, map) { // Add exchanges
	// Style markers
	var geojsonMarkerOptions = {
		icon: 'telephone',
		color: '#880e4f',
		size: 's'	
	};
	return L.geoJson(data, {
		pointToLayer: function (feature, latlng) {
			if(feature.properties.vdsl == true) {
				geojsonMarkerOptions = $.extend(geojsonMarkerOptions, {icon: 'emergency-telephone', color: '#673ab7'});
			} 
			var icon = L.MakiMarkers.icon(geojsonMarkerOptions);
			return L.marker(latlng, {icon: icon});
		},
		onEachFeature: function (feature, layer) {
			layer.bindPopup(nra_popup(feature));
		}
	}).addTo(map);
}

function add_other_pois(data, map) { // Add exchanges
	// Style markers
	var geojsonMarkerOptions = {
		icon: null,	
		color: '#3f51b5', // Default color
		size: "s"
	};
	return L.geoJson(data, {
		pointToLayer: function (feature, latlng) {
			var icon = L.MakiMarkers.icon($.extend(geojsonMarkerOptions, {icon: feature.properties.icon, color: feature.properties.colour}));
			return L.marker(latlng, {icon: icon, weight: 1});
		},
		onEachFeature: function (feature, layer) {
			layer.bindPopup(other_poi_popup(feature));
		}
	}).addTo(map);
}


function add_debits_DSL(data, map) { // Add broadband bandwidth 
	var geojsonMarkerOptions = {
		radius: 6,
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8
	};
	var r = L.geoJson(data, {
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, $.extend(geojsonMarkerOptions, {fillColor: bw_to_colour(feature.properties.download)}));
		},
		onEachFeature: function (feature, layer) {
			layer.bindPopup(debit_dsl_popup(feature));
		}
	}).addTo(map);
	return r;
}

function add_links_to_exchange(speed_layer, exchange_layer) {
	var exchanges = {};
	var links = [];
	$.each(exchange_layer._layers, function(i, l) {
		exchanges[l.feature.properties.name] = {latlng: l._latlng, children: []}; // Get each exchange
	});
	$.each(speed_layer._layers, function(i, l) {
		exchanges[l.feature.properties.nra]['children'].push(l._latlng); // Add speed markers to each exchange
	});
	$.each(exchanges, function(i, l) {
		var src = l.latlng;
		$.each(l.children, function(i, k) {
			var dst = k;
			links.push(L.polyline([src, dst], {weight: 1, opacity: 0.8, color: '#212121'}));
		});
	});
	$.each(links, function(i, l) {
		l.addTo(map);
	});
	return true;
}

$( document ).ready(function() {
	var map = initmap(); // Init map
	// Add exchanges
	$.when(
		$.getJSON('json.php?get=nras'),
		$.getJSON('json.php?get=debits_dsl'),
		$.getJSON('json.php?get=other_pois')
	).done(function(nras, debits_dsl, other_pois) {
		var exchange_layer = add_NRAs(nras, map);
		var speed_layer = add_debits_DSL(debits_dsl, map);
		var other_pois_layer = add_other_pois(other_pois, map);
		L.control.layers(null, {'NRAs': exchange_layer, 'Débits DSL': speed_layer, 'Autres points d\'interêt': other_pois_layer}).addTo(map); // Add control widget
		// Add lines between speed markers and exchange markers
		add_links_to_exchange(speed_layer, exchange_layer);
	});
});
