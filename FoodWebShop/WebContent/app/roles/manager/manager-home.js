import { getName, setRestaurantId } from "../../local-storage-util.js";
import managerService from "../../services/manager-service.js";

export default Vue.component("manager-home",{
    props: ['id'],
    template: `
    <div id="manager-home">
        <div>
            <h3>Welcome {{name}}</h3>
        </div>
        <span v-if="restaurantId">
            <div>
                <router-link :to="restaurantRoot">Restaurant</router-link>
            </div>
            <div>
                <router-link :to="restaurantPath('restaurant-customers')">Customers</router-link>
            </div>
            <div>
                <router-link :to="restaurantPath('restaurant-orders-overview')">Orders</router-link>
            </div>
        </span>
    </div> 
    `,
    data() { 
        return {
            name: getName(),
            manager: null,
            restaurantId: null
        }
    },

    async created() {
        this.manager = await managerService.getManager(this.id);
        this.restaurantId = this.manager.restaurant.id;
        setRestaurantId(this.restaurantId);
        
    },

    computed: {
        restaurantRoot() {
            return `restaurants/${this.restaurantId}`
        }
    },

    methods: {
        restaurantPath(path) {
            return {name: path, params: { restaurantId: this.restaurantId }};
        }
    }
})
