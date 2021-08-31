export default Vue.component("restaurant-root",{
    props: ['restaurantId'],

    template: `
    <div id="restaurant-root">
        <div class="tabs">
            <ul v-if="restaurantId" class='tabs__header'>
            <li><router-link :to="restaurantPath('restaurant-products')">Products</router-link></li>
            <li><router-link :to="restaurantPath('restaurant-info')">Info</router-link></li>
            <li><router-link :to="restaurantPath('restaurant-comments')">Comments</router-link></li>
            </ul>

            <router-view></router-view>
        </div>
    </div> 
    `,
    data() { 
        return {
        }
    },

    computed: {
        
    },

    methods: {
        restaurantPath(path) {
            return {name: path, params: { restaurantId: this.restaurantId }};
        }
    }
})
