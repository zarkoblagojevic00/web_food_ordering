import axios from 'axios'

export default function init(endPoint) {
    const createRelativePath = initRelativePathCreator(endPoint);
    
    return {
        get: async args => (await axiosInstance.get(createRelativePath(args))).data,
        post: async (args, data) => (await axiosInstance.post(createRelativePath(args), data)).data
    }
} 




const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: {
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${localStorage.getItem('JWT')}`
    }
});

/**
 * 
 * @param {String} endPoint endPoint to API 
 * @returns function(args) for creating relative path to baseURL (from endPoint and args)
 */
const initRelativePathCreator = 
    endPoint => 
        (args='') => `${endPoint}/${args}`;

