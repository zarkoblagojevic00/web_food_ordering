import authMixin from "../mixins/auth-mixin.js";
import orderStatusMixin from "../mixins/order-status-mixin.js";
import orderService from "../services/order-service.js";

import order from "./order.js";
import shoppingItemsOverview from "./shopping-items-overview.js";
import deliveryRequest from "./delivery-request.js";

export default Vue.component("order-details",{
    mixins: [authMixin, orderStatusMixin],
    props: ['orderId'],
    component: {
        order,
        'shopping-items-overview' : shoppingItemsOverview,
        'delivery-request': deliveryRequest,
    },

    template: `
    <div id="order-details">
        <order v-if="order"
            :order="order"
            :showDetailsNav="false">
        </order>

        <shopping-items-overview v-if="items"
            :items="items"
            :totalPrice="order.totalPrice"
            isReadonly>
        </shopping-items-overview>

        <div v-if="requests">
            <div v-if="isManager && isWaitingOnDelivery">
                <h5>Delivery requests</h5>
                <delivery-request 
                    v-for="request in requests"
                    :key="request.id"
                    :request="request">
                </delivery-request>
            </div>
        </div>

    </div> 
    `,
    data() { 
        return {
           order: null,
           items: null,
           requests: null
        }
    },

    async created() {
        const orderOverview = await orderService.getOrderOverview(this.orderId);
        this.order = orderOverview.base.order;
        this.items = orderOverview.base.items;
        this.requests = orderOverview.deliveryRequests;
    },



    computed: {
            
    },

    methods: {
        
    }
})
