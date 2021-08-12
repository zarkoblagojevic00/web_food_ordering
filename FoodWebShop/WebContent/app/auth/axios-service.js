import init from '../axios-util.js'

const axiosEndpoint = init('auth');
const axiosTest = init('test');

const authService = {
        login: (credentials) => axiosEndpoint.post('login', credentials),
        signup: (newUserInfo) => axiosEndpoint.post('signup', newUserInfo),
        axiosTest: () => axiosTest.get('repo')
}

export {authService as default };