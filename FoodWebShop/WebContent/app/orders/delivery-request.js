
import deliverer from "../roles/admin/users-overview/deliverers/vues/deliverer.js"
import orderService from "../services/order-service.js"

export default Vue.component("delivery-request",{
    props: {
        request: {
            type: Object,
            required: true,
        },
    },

    components: {
        deliverer
    },

    template: `
    <div id="delivery-request">
        <deliverer v-bind="request.deliverer"></deliverer>

        <div>
            <label for="requestStatus">Request status: </label>
            <span>{{request.status}}</span>
        </div>

        <button v-if="request.status==='PENDING'"@click="acceptRequest">Accept request</button>
    </div> 
    `,
    data() { 
        return {
           
        }
    },

    computed: {
        
    },

    methods: {
        async acceptRequest() {
            await orderService.acceptRequest(this.request.id);
            this.$router.back();
        }
    }
})
