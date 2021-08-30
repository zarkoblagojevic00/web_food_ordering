import init from './http-utils/axios-util.js'
import { getId, getRole, getUsername } from '../local-storage-util.js';

const serverEndpoint = init('users');

const userService = {
        add: (credentials, personalData, role) => serverEndpoint.post({relPath:'add', data: {credentials, personalData, role}}),
        editPassword: (oldPassword, newPassword) => serverEndpoint.put({relPath: 'password', data: {...getRoleId(), oldPassword, newPassword}}),
        getProfile: () => serverEndpoint.get({relPath: `profile/${getUsername()}`}),
}

export {userService as default };

const getRoleId = () => ({id: getId(), role: getRole()});