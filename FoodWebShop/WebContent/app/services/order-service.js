import init from "./http-utils/axios-util.js";

const serverEndpoint = init('orders');

const orderService = {
       getAvailableOrders() {return this.getOrdersWithStatus('WAITING_ON_DELIVERY')},
       getOrdersWithStatus: (status) => serverEndpoint.get({relPath: 'get', params: {status}}),
       getOrderOverview: (orderId) => serverEndpoint.get({relPath: `${orderId}/details`}),
       setOrderStatus: (orderId, status) => serverEndpoint.put({
              relPath: `${orderId}/status`,
              data: `"${status}"`
       }),
}

export { orderService as default };