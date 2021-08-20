import init from "../../../../axios-util.js";

const axiosEndpoint = init('managers');

const managerService = {
        getOverview: () => axiosEndpoint.get('overview'),
        ban: (username) => axiosEndpoint.put('ban', username),
        delete: (username) => axiosEndpoint.delete(username)
}

export { managerService as default };