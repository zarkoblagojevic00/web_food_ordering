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
        return serverEndpoint.postFileForm({rawFormData});
    },


    getProducts: (restaurantId) => serverEndpoint.get({relPath: `${restaurantId}/products`}),
    addProduct: (restaurantId, product, picture) => {
        const rawFormData = {
            objects: {
                product
            },
            files: {
                picture,
            }
        }
        return serverEndpoint.postFileForm({rawFormData, relPath: `${restaurantId}/products`})
    }
}

export { restaurantService as default };