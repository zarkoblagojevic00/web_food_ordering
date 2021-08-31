export default Vue.component("restaurant-root",{
    template: `
    <div id="restaurant-root">
        <div class="tabs">
            <ul class='tabs__header'>
            <li><router-link :to="{name: 'restaurant-products'}">Products</router-link></li>
            <li><router-link :to="{name: 'restaurant-info'}">Info</router-link></li>
            <li><router-link :to="{name: 'restaurant-comments'}">Comments</router-link></li>
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
        
    }
})
