import init from "./http-utils/axios-util.js";

const serverEndpoint = init('deliverers');

const delivererService = {
        getOverview: () => serverEndpoint.get({relPath: 'overview'}),
        ban: (username) => serverEndpoint.put({relPath: 'ban', data: username}),
        delete: (username) => serverEndpoint.delete({relPath: username})
}

export { delivererService as default };