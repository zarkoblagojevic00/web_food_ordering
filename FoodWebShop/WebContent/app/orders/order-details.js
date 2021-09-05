import authMixin from "../mixins/auth-mixin.js";
import orderService from "../services/order-service.js";

import order from "./order.js";
import shoppingItemsOverview from "./shopping-items-overview.js";

export default Vue.component("order-details",{
    mixins: [authMixin],
    props: ['orderId'],
    component: {
        order,
        'shopping-items-overview' : shoppingItemsOverview,
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

        <div v-if=isManager>
            <h5>Delivery requests</h5>
        </div>

    </div> 
    `,
    data() { 
        return {
           order: null,
           items: null
        }
    },

    async created() {
        const orderOverview = await orderService.getOrderOverview(this.orderId);
        this.order = orderOverview.base.order;
        this.items = orderOverview.base.items;
    },



    computed: {
            
    },

    methods: {
        
    }
})
