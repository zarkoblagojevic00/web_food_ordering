import init from "./http-utils/axios-util.js";

const serverEndpoint = init('restaurants');

const restaurantService = {
    getTypes: () => serverEndpoint.get({relPath: 'types'}),
    add: (restaurant, logoPicture, selectedManagerId) => {
        const rawFormData = {
            objects: {
                restaurant,
                selectedManagerId
            },
            files: {
                logoPicture
            }
        }
        return serverEndpoint.sendFileForm({rawFormData});
    },


    getProducts: (restaurantId) => serverEndpoint.get({relPath: getProductsPath(restaurantId)}),
    getProduct: (restaurantId, productId) => serverEndpoint.get({relPath: getProductPath(restaurantId, productId)}),
    addProduct: (restaurantId, product, picture) => {
        const rawFormData = {
            objects: {
                product
            },
            files: {
                picture,
            }
        }
        return serverEndpoint.sendFileForm({rawFormData, relPath: getProductsPath(restaurantId)})
    },
    editProduct: (restaurantId, productId, product, picture) => {
        const rawFormData = {
            objects: {
                product
            },
            files: {
                picture,
            }
        }
        return serverEndpoint.sendFileForm({rawFormData, method: "PUT", relPath: getProductPath(restaurantId, productId)}); 
    }
}

const getProductsPath = (restaurantId) => `${restaurantId}/products`;
const getProductPath = (restaurantId, productId) => `${getProductsPath(restaurantId)}/${productId}`; 

export { restaurantService as default };