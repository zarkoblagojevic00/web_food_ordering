import { getName } from "../../local-storage-util.js"

export default Vue.component("manager-home",{
    template: `
    <div id="manager-home">
        <div>
            <h3>Welcome {{name}}</h3>
        </div>
        <div>
            <router-link :to="{name: 'restaurant-root'}">Restaurant</router-link>
        </div>
        
        <!-- <div>
            <router-link :to="{name: 'customers-home'}">Customers</router-link>
        </div>

        <div>
            <router-link :to="{name: 'orders'}">Orders</router-link>
        </div> -->
    </div> 
    `,
    data() { 
        return {
            name: getName()
        }
    },

    computed: {
        
    },

    methods: {
        
    }
})
