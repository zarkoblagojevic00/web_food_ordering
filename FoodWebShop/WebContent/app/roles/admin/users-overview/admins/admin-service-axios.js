import init from "../../../../axios-util.js";

const axiosEndpoint = init('admins');

const adminService = {
        getOverview: () => axiosEndpoint.get('overview'),
}

export { adminService as default };