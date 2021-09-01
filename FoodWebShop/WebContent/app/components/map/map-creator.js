import { load } from "../../path-loader.js";
import geolocationService from "../../services/geolocation-service.js";

export default function createMap(target, location, coordinates, readonly) {
    if (location.longitude) return createMapFromLocation(target, location, readonly);
    return createMapFromCoordinates(target, coordinates, readonly);
    
}

const createMapFromLocation = (target, location, readonly) => {
    const coordinates = [location.longitude, location.latitude];
    const mercatCoords = ol.proj.fromLonLat(coordinates);
    const map = initMap(target, mercatCoords);
    
    movePin(map, mercatCoords);
    if (!readonly) {
        map.on('click', dispatchNewLocation) 
    }
}

const createMapFromCoordinates = (target, coordinates, readonly) => {
    const mercatCoords = ol.proj.fromLonLat(coordinates);
    const map = initMap(target, mercatCoords);
    
    dispatchNewLocation({map, coordinate: mercatCoords});
    if (!readonly) {
        map.on('click', dispatchNewLocation) 
    }
}

const initMap = (target, coordinates) => new ol.Map({
    target,
    view: getView(coordinates),
    layers: [osmLayer],
});

const dispatchNewLocation = ({map, coordinate}) => {
    movePin(map, coordinate);
    dispatchEvent(new CustomEvent('on-location-changed', {
        detail: {
            location: geolocationService.getLocation(ol.proj.toLonLat(coordinate)),
        }
    }));
}

const movePin = (map, coordinate) => {
    removeExistingPinFromMap(map);
    addPinToMap(map, coordinate);
}

const getView = (coordinates) => new ol.View( {
    zoom: 16,
    minZoom: 8,
    maxZoom: 18,
    center: coordinates,
    constrainResolution: true
});

const osmLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
});

const createPinFeature = (coordinates) => new ol.Feature({
    geometry: new ol.geom.Point(coordinates),
});

const pinStyle = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: load('img/icons/map-marker.png')
    })
});

const pinLayerName = 'Pin';

const createPinLayer = (coordinates) => new ol.layer.Vector({
    name: pinLayerName,
    source: new ol.source.Vector({
        features: [createPinFeature(coordinates)],
    }),
    style: pinStyle,

}); 

const removeExistingPinFromMap = (map) => {
    const pinLayer = map
        .getLayers()
        .getArray()
        .find(layer => layer.get('name') === pinLayerName)
    map.removeLayer(pinLayer);
};

const addPinToMap = (map, coordinates) => map.addLayer(createPinLayer(coordinates));