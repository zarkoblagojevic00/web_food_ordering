import finder from "../components/finder/finder.js";
import restaurantService from "../services/restaurant-service.js";

import authMixin from "../mixins/auth-mixin.js";
import order from "./order.js";
import delivererService from "../services/deliverer-service.js";
import customerService from "../services/customer-service.js";
import orderService from "../services/order-service.js";

export default Vue.component("orders-overview",{
    mixins: [authMixin],
    props: ['restaurantId', 'type'],
    components: {
        finder,
        order,
    },

    template: `
    <div id="orders-overview" class="orders-overview">
        <h2>{{title}}</h2>
        <finder
            :items="orders"
            :sortBy="sortBy"
            :searchByTextFields="searchByTextFields"
            :filterByOptions="filterByOptions"
            :filterByNumberRange="filterByNumberRange"
            :filterByDateRange="filterByDateRange"
            :component="component"
            :componentProps="{name: 'order'}">
        </finder>
    </div> 
    `,
    data() { 
        return {
            orders: [],
            component: order,

            filterByNumberRange: {
                totalPrice: "Total price"
            },

            filterByDateRange: {
                creationDate: "Creation Date",
            }

        }
    },

    computed: {
        title() {
            if (this.isManager) return 'Restaurant orders';
            if (this.isDeliverer && this.isAvailableOrders) return 'Orders waiting on delivery';
            return 'My orders'
        },

        sortBy() {
            return {
                totalPrice: 'Total price',
                creationDate: 'Creation date',
				...(!this.isManager && {'restaurant.name': 'Restaurant name'})
            }
        },

        filterByOptions() {
            const filterBy = getFilterByStatus(this.isAvailableOrders,this.isDeliverer, this.orderStatusFilterInitVal);
            return (this.isManager) ? filterBy : {...filterBy, ...getFilterByType()}; 
        },

        searchByTextFields() {
            return (this.isManager) ?  null : {'restaurant.name': 'Restuarant name'};
        },

        getOrders() {
            if (this.isManager) return () => restaurantService.getOrders(this.restaurantId);
            if (this.isDeliverer) return this.getOrdersForDeliverer;
            if (this.isCustomer) return () => orderService.getOrdersForCustomer(this.id);  
        },

        getOrdersForDeliverer() {
            if (this.isAvailableOrders) return () => delivererService.getAvailableOrders(this.id);
            return () => delivererService.getOrders(this.id);
        },

        orderStatusFilterInitVal() {
            return (!this.isManager) ? 'IN_TRANSPORT' : '';
        },

        isAvailableOrders() {
            return this.type === 'available';
        }
    },

    async created() {
        this.orders = await this.getOrders();
    },
})

const getFilterByStatus = (isAvailablePage, isDeliverer, init) => (isAvailablePage) ? {} : {
    status: {
        display: 'Status',
        init,
        options: {
            ...(!isDeliverer && {
                PROCESSING: 'Processing',
                IN_PREPARATION: 'In preparation',
                WAITING_ON_DELIVERY: 'Waiting on delivery',
                CANCELED: 'Canceled',
            }),
            IN_TRANSPORT: 'In transport',
            DELIVERED: 'Delivered',
        },}
    };

const getFilterByType = function() {
    return {'restaurant.type': {
            display: 'Restaurant type',
            options: {
                ITALIAN: 'Italian',
                CHINESE: 'Chinese',
                BBQ: 'Barbeque',
                GREEK: 'Greek',
                INDIAN: 'Indian'
            },
        },
    }
}