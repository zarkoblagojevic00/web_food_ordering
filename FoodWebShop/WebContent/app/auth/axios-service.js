import init from '../axios-util.js'

const axiosEndpoint = init('auth');

const authService = {
        login: (credentials) => axiosEndpoint.post('login', credentials),
        signup: (newUserInfo) => axiosEndpoint.post('signup', newUserInfo),
}

export {authService as default };