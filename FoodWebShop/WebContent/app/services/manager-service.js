import init from "./http-utils/axios-util.js";

const serverEndpoint = init('managers');

const managerService = {
        getOverview: () => serverEndpoint.get({relPath: 'overview'}),
        ban: (username) => serverEndpoint.put({relPath: 'ban', data: username}),
        delete: (username) => serverEndpoint.delete({relPath: username}),
        getAvailable:() => serverEndpoint.get({relPath: 'available'}),
        getManager:(id) => serverEndpoint.get({relPath: `overview/${id}`}),
}

export { managerService as default };