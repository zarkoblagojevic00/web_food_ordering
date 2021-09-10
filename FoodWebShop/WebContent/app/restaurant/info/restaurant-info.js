import imageService from "../../services/image-service.js";
import restaurantService from "../../services/restaurant-service.js";

import restaurantOverview from "./restaurant-overview.js";


export default Vue.component("restaurant-info",{
    props: ['restaurantId'],

    components: {
        'restaurant-overview': restaurantOverview,
    },

    template: `
    <div id="restaurant-info">
        <h2>Info</h2>
        <restaurant-overview 
            v-if="restaurant"
            v-model="restaurant"
            isReadonly>
        </restaurant-overview>
    </div> 
    `,
    data() { 
        return {
           restaurant: null 
        }
    },

    async created() {
        const restaurant = await restaurantService.get(this.restaurantId);
        const logoPicture = await imageService.getImage(restaurant.logoPath);
        this.restaurant = {...restaurant, logoPicture};
    },
})