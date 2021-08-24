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

}

export { restaurantService as default };