import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import GML2 from 'ol/format/GML2';
import GML3 from 'ol/format/GML3';
import {Stroke, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import {all} from 'ol/loadingstrategy';

//var vectorSource = new VectorSource({
//  format: new GeoJSON(),
//  url: function (extent) {
//    return (
//      'https://ahocevar.com/geoserver/wfs?service=WFS&' +
//      'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
//      'outputFormat=application/json&srsname=EPSG:3857&' +
//      'bbox=' +
//      extent.join(',') +
//      ',EPSG:3857'
//    );
//  },
//  strategy: bboxStrategy,
//});



//var vectorSource = new VectorSource({
//  format: new GML2(),
//  url: function (extent) {
//    return (
//      'https://arealinformation.miljoeportal.dk/gis/services/DAIdb/MapServer/WFSServer?' +
//      'request=GetFeature&service=WFS&typename=dmp:BES_NATURTYPER&outputFormat=GML2&' +
//      'SRsname=EPSG:25832&' +
//      'bbox=' +
//      extent.join(',') +
//     ',EPSG:25832'
//    );
//  },
//  strategy: bboxStrategy
//});



var vectorSource = new VectorSource({
  format: new GML3(),
  url: function (extent) {
    return (
      'https://arealinformation.miljoeportal.dk/gis/services/DAIdb/MapServer/WFSServer?' +
      'request=GetFeature&service=WFS&typename=dmp:BES_NATURTYPER&outputFormat=GML3&' +
      'srsname=EPSG:25832&' +
      'bbox=' +
      '11.681130,55.269571,11.874756,55.168045' +
      ',EPSG:25832'
    );
  },
  strategy: all
});

console.log(vectorSource);

var vector = new VectorLayer({
  source: vectorSource,
  style: new Style({
    stroke: new Stroke({
      color: 'rgba(0, 0, 255, 1.0)',
      width: 2,
    }),
  }),
});


var raster = new TileLayer({
  source: new OSM({
    url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  }),
});

var map = new Map({
  layers: [raster, vector],
  target: document.getElementById('map'),
  view: new View({
    center: [55.5, 11.5],
    maxZoom: 19,
    zoom: 15,
  }),
});
