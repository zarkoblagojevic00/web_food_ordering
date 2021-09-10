export default Vue.component("restaurant-root",{
    props: ['restaurantId'],

    template: `
    <div id="restaurant-root">
        <ul v-if="restaurantId" class="list-inline">
            <router-link tag="li" class="list-inline-item restaurant-tab" :to="restaurantPath('products')">Products</router-link>
            <router-link tag="li" class="list-inline-item restaurant-tab" :to="restaurantPath('info')">Info</router-link>
            <router-link tag="li" class="list-inline-item restaurant-tab" :to="restaurantPath('comments')">Comments</router-link>
        </ul>
        <router-view></router-view>
    </div> 
    `,

    methods: {
        restaurantPath(path) {
            return {path, params: { restaurantId: this.restaurantId }};
        }
    }
})
