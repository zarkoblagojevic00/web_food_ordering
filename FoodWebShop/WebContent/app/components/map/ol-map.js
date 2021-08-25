import geolocationService from "../../services/geolocation-service.js"

export default Vue.component("ol-map",{
    props: {
        readonly: {
            type: Boolean,
            default: false
        },
        coords: {
            type: Array,
            default: () => [19.841527, 45.244989]
        },
    },
    template: `
    <div id="ol-map">
        <div id="map-root" style="width: 400px; height: 400px;"></div>
    </div> 
    `,
    data() { 
        return {
           map: null,
           coordinates: null,
           location: null
        }
    },

    watch: {
        coordinates: 
        async function geoLocation() {
            this.location = await geolocationService.getLocation(this.coordinates);
        } 
    },
    
    async mounted() {
        this.coordinates = this.coords;
        this.map =  new ol.Map({
            target: 'map-root',
            view: getView(this.coordinates),
            layers: [osmLayer],
        });
        addPinToMap(this.map, this.coordinates);
        if (!this.readonly) {
            this.map.on('click', this.movePin) 
        }
    },

    methods: {
        movePin ({map, coordinate}) {
            this.coordinates = ol.proj.toLonLat(coordinate)
            removeExistingPinFromMap(map);
            addPinToMap(map, this.coordinates);
        }
    }
})

const getView = (coordinates) => new ol.View( {
    zoom: 16,
    minZoom: 8,
    maxZoom: 18,
    center: ol.proj.fromLonLat(coordinates),
    constrainResolution: true
});


const osmLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
});

const createPinFeature = (coordinates) => new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(coordinates)),
});

const pinStyle = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: '../../../img/icons/map-marker.png'
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