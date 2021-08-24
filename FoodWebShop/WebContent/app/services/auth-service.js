import init from './http-utils/axios-util.js'

const serverEndpoint = init('auth');

const authService = {
        login: (credentials) => serverEndpoint.post({relPath: 'login', data: credentials}),
        signup: (credentials, personalData) => serverEndpoint.post({relPath:'signup', data: {credentials, personalData, role: "CUSTOMER"}}),
        add: (credentials, personalData, role) => serverEndpoint.post({relPath:'add', data: {credentials, personalData, role}})
}

export {authService as default };