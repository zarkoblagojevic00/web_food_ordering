export default function init(endPoint) {
    const createRelativePath = initRelativePathCreator(endPoint);
    
    return {
        get: async args => (await axiosInstance.get(createRelativePath(args))).data,
        post: async (args, data) => (await axiosInstance.post(createRelativePath(args), data)).data,
        put: async (args, data) => (await axiosInstance.put(createRelativePath(args), data)).data,
        delete: async (args, data) => (await axiosInstance.delete(createRelativePath(args), data)).data,
    }
} 

const initRelativePathCreator = endPoint => (args='') => `${endPoint}/${args}`;

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: {
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${localStorage.getItem('JWT')}`
    }
});



