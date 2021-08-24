import { getJwt } from '../../local-storage-util.js';

export default function init(resource) {
    const createEndPoint = initEndPointCreator(resource);
    
    return {
        get: ({relPath='', contentType='application/json', responseType='json', params={}} = {}) => request({
            url: createEndPoint(relPath),
            method: 'GET',
            params,
            contentType,
            responseType,
        }),

        post: ({data, relPath='', contentType='application/json', responseType='json'} = {}) => request({
            url: createEndPoint(relPath),
            method: 'POST',
            data: data,
            contentType,
            responseType
        }),

        put: ({data, relPath='', contentType='application/json', responseType='json'} = {}) => request({
            url: createEndPoint(relPath),
            method: 'PUT',
            data: data,
            contentType,
            responseType
        }),

        delete: ({relPath='', contentType='application/json', responseType='json'} = {}) => request({
            url: createEndPoint(relPath),
            method: 'DELETE',
            contentType,
            responseType
        }),

        postFileForm: ({rawFormData, relPath='', responseType='json'} = {}) => request({
            url: createEndPoint(relPath),
            method: 'POST',
            data: createFormData(rawFormData),
            contentType : 'multipart/form-data',
            responseType           
        })
    }
}

const request = async (config) => {
    const response = await axios({
        baseURL,
        url: config.url,
        data: config.data,
        method: config.method,
        params: config.params,
        headers: {
            ...contentTypeHeader(config.contentType),
            ...jwtAuthorizationHeader(),
        },
        responseType: config.responseType
    })
    
    return (config.contentType === 'blob') ? new Blob([response.data]) : response.data;
}

const baseURL = 'http://localhost:8080/FoodWebShop/rest/';

const initEndPointCreator = resource => relPath => `${resource}/${relPath}`;

const jwtAuthorizationHeader = () => ({ 'Authorization': `Bearer ${getJwt() || ""}` }); 

const contentTypeHeader = (contentType) => ({ 'Content-Type' : `${contentType}` });

const JSONblobify = (obj) => new Blob([JSON.stringify(obj)], { type: 'application/json' })

// rawFormData = { objects: {obj1, obj2, ...}, files: {file1, file2, ...}}
const createFormData = (rawFormData) => {
    const formData = new FormData();
    Object.entries(rawFormData.objects).forEach(([key, value]) => formData.append(key, JSONblobify(value)));
    Object.entries(rawFormData.files).forEach(([key, value]) => formData.append(key, value));
    return formData;
}