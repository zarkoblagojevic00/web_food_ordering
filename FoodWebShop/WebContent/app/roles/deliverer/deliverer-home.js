import { getName, setRestaurantId } from "../../local-storage-util.js";

export default Vue.component("deliverer-home",{
    props: ['id'],
    template: `
    <div id="deliverer-home">
        <div>
            <h3>Welcome {{name}}</h3>
        </div>
        
        <div>
            <router-link :to="{name: 'deliverer-orders', params: {type: 'available'}}" exact>Available orders</router-link>
        </div>
        <div>
            <router-link :to="{name: 'deliverer-orders', params: {type: 'mine'}}" exact>My orders</router-link>
        </div>
    
    </div> 
    `,
    data() { 
        return {
            name: getName(),
        }
    },
})
