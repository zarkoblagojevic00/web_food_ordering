import authMixin from "../../mixins/auth-mixin.js";
import restaurantService from "../../services/restaurant-service.js";

import product from "./product.js";

export default Vue.component("products-overview",{
    mixins: [authMixin],
    props: ['restaurantId'],

    components: {
        product
    },

    template: `
    <div id="products-overview">
        <h2>Products</h2>
        <router-link 
            class="btn btn-lg btn-success text-uppercase font-weight-bold fixed-bottom-right" 
            v-if="isManager && managersRest" 
            to="add-product">Add product</router-link>
        <product v-for="product in products"
            :key="product.id"
            :product="product"
            :restaurantId="restaurantId"
            >
        </product> 
    </div> 
    `,
    data() { 
        return {
           products: [],
        }
    },

    computed: {
        managersRest() {
            return location.href.includes("manager");
        }
    },

    async created() {
        this.products = await restaurantService.getProducts(this.restaurantId);
    },
})
