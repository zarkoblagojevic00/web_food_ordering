import init from "./http-utils/axios-util.js";

const serverEndpoint = init('restaurants');

const restaurantService = {
    get: (restaurantId) => serverEndpoint.get({relPath: `${restaurantId}`}),
    getTypes: () => serverEndpoint.get({relPath: 'types'}),
    add: (restaurantInfo, selectedManagerId) => {
        const {logoPicture, ...restaurant} = restaurantInfo;
        const rawFormData = {
            objects: {
                restaurant, 
                selectedManagerId,
            },
            files: {
                logoPicture,
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
    },

    getComments: (restaurantId) => serverEndpoint.get({relPath: getCommentsPath(restaurantId)}),
    sendCommentApproval: (answer, restaurantId, commentId) => serverEndpoint.put({
        relPath: `${getCommentPath(restaurantId, commentId)}/approval`, 
        data: `"${answer}"`}),
    
    getOrders: (restaurantId) => serverEndpoint.get({relPath: getOrdersPath(restaurantId)}),
    getManagerOrderOverview: (restaurantId, orderId) => serverEndpoint.get({
        relPath: `${getOrderPath(restaurantId, orderId)}/overview/manager`}),
    setOrderStatus: (restaurantId, orderId, status) => serverEndpoint.put({
        relPath: `${getOrderPath(restaurantId, orderId)}/status`,
        data: `"${status}"`
    }),
    
    getCustomers: (restaurantId) => serverEndpoint.get({relPath: `${getOrdersPath(restaurantId)}/customers`})
}

const getProductsPath = (restaurantId) => `${restaurantId}/products`;
const getProductPath = (restaurantId, productId) => `${getProductsPath(restaurantId)}/${productId}`;

const getCommentsPath = (restaurantId) => `${restaurantId}/comments`;
const getCommentPath = (restaurantId, commentId) => `${getCommentsPath(restaurantId)}/${commentId}`;

const getOrdersPath = (restaurantId) => `${restaurantId}/orders`;
const getOrderPath = (restaurantId, orderId) => `${getOrdersPath(restaurantId)}/${orderId}`;

export { restaurantService as default };