import init from './http-utils/axios-util.js'
import { getId, getRole, getUsername, clearStorage} from '../local-storage-util.js';

const serverEndpoint = init('auth');

const authService = {
        login: (credentials) => serverEndpoint.post({relPath: 'login', data: credentials}),
        logout: async () => {
            await serverEndpoint.post({relPath: `logout/${getUsername()}`});
            clearStorage();
        	},
        signup: (credentials, personalData) => serverEndpoint.post({relPath:'signup', data: {credentials, personalData, role: "CUSTOMER"}}),
        editProfile: (credentials, personalData) => serverEndpoint.put({relPath: 'profile', data: {...getRoleId(), credentials, personalData}}),
}

export {authService as default };

const getRoleId = () => ({id: getId(), role: getRole()});
