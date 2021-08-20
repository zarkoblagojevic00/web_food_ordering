import init from '../axios-util.js'

const axiosEndpoint = init('auth');

const authService = {
        login: (credentials) => axiosEndpoint.post('login', credentials),
        signup: (credentials, personalData) => axiosEndpoint.post('signup', {credentials, personalData, role: "CUSTOMER"}),
        add: (credentials, personalData, role) => axiosEndpoint.post('add', {credentials, personalData, role})
}

export {authService as default };