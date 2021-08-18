import init from "../../../axios-util.js";

const axiosEndpoint = init('customers');

const customerService = {
        getOverview: () => axiosEndpoint.get('overview'),
        ban: (username) => axiosEndpoint.put('ban', username)
}

export {customerService as default };