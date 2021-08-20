import init from "../../../../axios-util.js";

const axiosEndpoint = init('deliverers');

const delivererService = {
        getOverview: () => axiosEndpoint.get('overview'),
        ban: (username) => axiosEndpoint.put('ban', username),
        delete: (username) => axiosEndpoint.delete(username)
}

export { delivererService as default };