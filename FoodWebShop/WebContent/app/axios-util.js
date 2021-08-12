export default function init(endPoint) {
    const createRelativePath = initRelativePathCreator(endPoint);
    
    return {
        get: async args => (await axios.get(createRelativePath(args), getRequestConfig())).data,
        post: async (args, data) => (await axios.post(createRelativePath(args), data, getRequestConfig())).data,
        put: async (args, data) => (await axios.put(createRelativePath(args), data, getRequestConfig())).data,
        delete: async (args, data) => (await axios.delete(createRelativePath(args), data, getRequestConfig())).data,
    }
} 



const initRelativePathCreator = endPoint => (args='') => `${endPoint}/${args}`;

const getRequestConfig = () => {
    return {
        baseURL: 'http://localhost:8080/FoodWebShop/rest/',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt') || ""}`
        }
    }
}



