import restaurantService from "../services/restaurant-service.js"

import order from "./order.js";
import shoppingItemsOverview from "./shopping-items-overview.js";

export default Vue.component("order-details",{
    props: ['parentResourceId', 'orderId'],
    component: {
        order,
        'shopping-items-overview' : shoppingItemsOverview,
    },

    template: `
    <div id="order-details">
        <order v-if="order"
            :order="order"
            :parentResourceId="parentResourceId"
            :showDetailsNav="false">
        </order>

        <shopping-items-overview v-if="items"
            :items="items"
            :totalPrice="order.totalPrice"
            isReadonly>
        </shopping-items-overview>

    </div> 
    `,
    data() { 
        return {
           order: null,
           items: null
        }
    },

    async created() {
        const orderOverview = await restaurantService.getManagerOrderOverview(
            this.parentResourceId,
            this.orderId,);
        this.order = orderOverview.base.order;
        this.items = orderOverview.base.items;
    },

    computed: {
        
    },

    methods: {
        
    }
})
