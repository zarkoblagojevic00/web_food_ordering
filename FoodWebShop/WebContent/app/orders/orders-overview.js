import finder from "../components/finder/finder.js";
import restaurantService from "../services/restaurant-service.js";

import authMixin from "../mixins/auth-mixin.js";
import order from "./order.js";

export default Vue.component("orders-overview",{
    mixins: [authMixin],
    props: ['parentResourceId'],
    components: {
        finder,
        order,
    },

    template: `
    <div id="orders-overview">
        <h2>ORDERS</h2>
        <finder
            :items="orders"
            :sortBy="sortBy"
            :searchByTextFields="searchByTextFields"
            :filterByOptions="filterByOptions"
            :filterByNumberRange="filterByNumberRange"
            :filterByDateRange="filterByDateRange"
            :component="component"
            :componentProps="props">
        </finder>
    </div> 
    `,
    data() { 
        return {
            restaurantId: this.parentResourceId,
            orders: [],
            component: order,

            props: {
                name: "order",
                parentResourceId: this.parentResourceId,
            },

            sortBy: {
                totalPrice: "Total price",
                creationDate: "Creation date",
            },

            filterByNumberRange: {
                totalPrice: "Total price"
            },

            filterByDateRange: {
                creationDate: "Creation Date",
            }

        }
    },

    computed: {
        filterByOptions() {
            const filterBy = getFilterByStatus();
            return (this.isManager) ? filterBy : {...filterBy, ...getFilterByType()}; 
        },

        searchByTextFields() {
            return (this.isManager) ?  null : {'restaurant.name': "Restuarant name"};
        }
    },

    async created() {
        this.orders = await restaurantService.getOrders(this.restaurantId);
    },
})

const getFilterByStatus = () => ({
    status: {
        display: 'Status',
        options: {
            PROCESSING: 'Processing',
            IN_PREPARATION: 'In preparation',
            WAITING_ON_DELIVERY: 'Waiting on delivery',
            IN_TRANSPORT: 'In transport',
            DELIVERED: 'Delivered',
            CANCELED: 'Canceled',
        },
    }
});

const getFilterByType = function() {
    return {'restaurant.type': {
            display: 'Restaurant type',
            options: {
                ITALIAN: 'Italian',
                CHINESE: 'Chinese',
                BBQ: 'Barbaque',
                GREEK: 'Greek',
                INDIAN: 'Indian'
            },
        },
    }
}