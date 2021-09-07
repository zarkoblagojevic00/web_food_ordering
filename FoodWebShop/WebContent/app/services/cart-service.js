import init from "./http-utils/axios-util.js";
import { getId } from "../local-storage-util.js";

const serverEndpoint = init('cart');

const cartService = {
        addToCart: (productId, quantity) => serverEndpoint.put({
            relPath: `add/${getId()}`,
            data: {
                product: { id: productId},
                quantity,
            }
        }),
        editCart: (item, quantity) => serverEndpoint.put({
            relPath: `add/${getId()}`,
            data: {...item, quantity}, // will replace quantity
        }),
        getCartForCustomer: () => serverEndpoint.get({relPath: `customer-cart/${getId()}` }),
        removeItemFromCart: (itemId) => serverEndpoint.put({relPath: `remove/${getId()}/${itemId}`}),
        createOrder: () => serverEndpoint.post({relPath: `create/${getId()}`}) 
}

export { cartService as default };