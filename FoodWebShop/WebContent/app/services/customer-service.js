import init from "./http-utils/axios-util.js";

const serverEndpoint = init('customers');

const customerService = {
        getOverview: () => serverEndpoint.get({relPath: 'overview'}),
        ban: (username) => serverEndpoint.put({relPath: 'ban', data: username}),
        getOrders: (id) => serverEndpoint.get({relPath: `${id}/orders`}),
}

export {customerService as default };