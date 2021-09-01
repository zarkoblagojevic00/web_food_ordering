import restaurantService from "../../services/restaurant-service.js";

import product from "./product.js";

export default Vue.component("products-overview",{
    props: ['restaurantId'],

    components: {
        product
    },

    template: `
    <div id="products-overview">
        <h2>Products</h2>
        <router-link :to="{name: 'add-product', params: {restaurantId}}">Add product</router-link>
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
           products: []
        }
    },

    computed: {
        
    },

    async created() {
        this.products = await restaurantService.getProducts(this.restaurantId)
    },

    methods: {
        
    }
})
