export default Vue.component("restaurant-root",{
    props: ['restaurantId'],

    template: `
    <div id="restaurant-root">
        <div class="tabs">
            <ul v-if="restaurantId" class='tabs__header'>
            <li><router-link :to="restaurantPath('products')">Products</router-link></li>
            <li><router-link :to="restaurantPath('info')">Info</router-link></li>
            <li><router-link :to="restaurantPath('comments')">Comments</router-link></li>
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
            return {path, params: { restaurantId: this.restaurantId }};
        }
    }
})
