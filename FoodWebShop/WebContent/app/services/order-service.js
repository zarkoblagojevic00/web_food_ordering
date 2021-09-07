import init from "./http-utils/axios-util.js";

const serverEndpoint = init('orders');

const orderService = {
       getOrdersWithStatus: (status) => serverEndpoint.get({relPath: 'get', params: {status}}),
       getOrderOverview: (orderId) => serverEndpoint.get({relPath: `${orderId}/details`}),
       setOrderStatus: (orderId, status) => serverEndpoint.put({
            relPath: `${orderId}/status`,
            data: `"${status}"`
       }),
       sendRequest: (orderId, delivererId) => serverEndpoint.post({
              relPath: 'delivery-request',
              data: {
                order: { id: orderId },
				deliverer: { id: delivererId },    
            }
       }),
	   acceptRequest: (requestId) => serverEndpoint.post({
		   relPath: `delivery-request/${requestId}/accept`
	   }),
        getOrdersForCustomer: (customerId) => serverEndpoint.get({relPath: `customer-orders/${customerId}`})
}

export { orderService as default };