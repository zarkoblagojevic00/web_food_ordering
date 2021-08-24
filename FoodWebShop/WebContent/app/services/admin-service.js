import init from "./http-utils/axios-util.js";

const serverEndpoint = init('admins');

const adminService = {
        getOverview: () => serverEndpoint.get({relPath: 'overview'}),
}

export { adminService as default };