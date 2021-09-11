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
        <h3>Overview</h3>
        <order v-if="order"
            :order="order"
            :showDetailsNav="false">
        </order>

        <h3>Ordered items</h3>
        <shopping-items-overview v-if="items"
            :items="items"
            :totalPrice="order.totalPrice"
            isReadonly>
        </shopping-items-overview>

        <div v-if="requests?.length && isManager">
                <h4>Delivery requests</h4>
                <delivery-request 
                    v-for="request in requests"
                    :key="request.id"
                    :request="request">
                </delivery-request>
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
