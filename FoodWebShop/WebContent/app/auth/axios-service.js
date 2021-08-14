import init from '../axios-util.js'

const axiosEndpoint = init('auth');

const authService = {
        login: (credentials) => axiosEndpoint.post('login', credentials),
        signup: (credentials, personalData) => axiosEndpoint.post('signup', {credentials, personalData}),
}

export {authService as default };