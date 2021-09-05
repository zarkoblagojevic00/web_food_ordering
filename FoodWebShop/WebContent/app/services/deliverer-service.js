import init from "./http-utils/axios-util.js";

const serverEndpoint = init('deliverers');

const delivererService = {
        getOverview: () => serverEndpoint.get({relPath: 'overview'}),
        ban: (username) => serverEndpoint.put({relPath: 'ban', data: username}),
        delete: (username) => serverEndpoint.delete({relPath: username}),
        getOrders: (id) => serverEndpoint.get({relPath: `${id}/orders`}),
}

export { delivererService as default };