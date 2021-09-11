
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
    <div id="delivery-request" class="item">
        <deliverer id="deliverer" v-bind="request.deliverer"></deliverer>

        <div>
            <label for="requestStatus">Request status: </label>
            <span class="badge badge-props" :class="requestStatusClass">{{request.status}}</span>
        </div>

        <button class="btn btn-md btn-success" v-if="isPending" @click="acceptRequest">Accept request</button>
    </div> 
    `,
    data() { 
        return {
           
        }
    },

    computed: {
        isPending() {
            return this.request.status === 'PENDING';
        },

        isAccepted() {
            return this.request.status === 'APPROVED';
        },

        isRejected() {
            return this.request.status === 'REJECTED';
        },

        requestStatusClass() {
            return {
                'badge-success': this.isAccepted,
                'badge-warning': this.isPending,
                'badge-danger': this.isRejected,
            }
        }
    },

    methods: {
        async acceptRequest() {
            await orderService.acceptRequest(this.request.id);
            this.$router.back();
        }
    }
})
