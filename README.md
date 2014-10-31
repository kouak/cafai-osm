CAFAI-OSM
=========

CAFAI OSM is an OpenStreetMap implementation used to map DSL speed.

CAFAI OSM uses a few XML files as data sources to represent coloured markers of the DSL speed and exchanges (NRAs in french) locations.

Version
----

0.1

Tech
-----------

CAFAI-OSM uses a few technologies to operate :

* [jQuery](http://jquery.com)
* [Leaflet](http://leafletjs.com/)
* [urlize.js](https://github.com/ljosa/urlize.js)
* [Google's colour palette](http://www.google.com/design/spec/style/color.html#color-ui-color-palette)

Installation
--------------

```sh
git clone [git-repo-url] cafai-osm
```

Browse to cafai-osm directory, it should work out of the box.

##### Import your data sources

Please have a look in the following files :
* data/README.md
* data/nras.xml
* data/debits_dsl.xml
* data/other_pois.xml


License
----

MIT
