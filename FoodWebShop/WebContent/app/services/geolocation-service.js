import init from "./http-utils/axios-util.js";

const serverEndpoint = init('https://nominatim.openstreetmap.org');

const imageService = {
        getLocation: async ([lon, lat]) => {
            const location = initLocation(lon, lat);
            try {
                const rawGeoJSON = await serverEndpoint.get({relPath: 'reverse', params: { format: 'json', lon, lat }});
                return convertToLocation(rawGeoJSON, location);
            } catch(e) {
                return location;
            }
        }
}

export { imageService as default };

const initLocation = (lon, lat) => ({longitude: lon, latitude: lat})

const convertToLocation = (rawGeoJSON, initLocation) => {
    return Object.entries(mapObj).reduce(map(rawGeoJSON), initLocation);
}

const map = (rawGeoJSON) => (prev, [locKey, rawKey]) => ({...prev, [locKey]: rawGeoJSON.address[rawKey]});

const mapObj = {
    municipality: 'city',
    streetName: 'road',
    streetNumber: 'house_number',
    postalCode: 'postcode'
}