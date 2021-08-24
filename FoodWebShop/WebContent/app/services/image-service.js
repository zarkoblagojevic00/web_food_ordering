import init from "./http-utils/axios-util.js";

const serverEndpoint = init('images');

const imageService = {
        getImage: (path) => serverEndpoint.get({params: { path }, responseType: 'blob'}),
}

export { imageService as default };