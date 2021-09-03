
import authMixin from "../mixins/auth-mixin.js"
import formatDateMixin from "../mixins/format-date-mixin.js"
import orderStatusMixin from "../mixins/order-status-mixin.js"
import restaurantService from "../services/restaurant-service.js"

export default Vue.component("order",{
    mixins: [formatDateMixin, orderStatusMixin, authMixin],
    
    props: {
        order: {
            type: Object,
            required: true,
        },
        parentResourceId: {
            type: [String, Number],
            required: true,
        },
        showDetailsNav: {
            type: Boolean,
            default: true
        }
    },

    template: `
    <div id="order" style="border: 1px solid black">
        <div>
            <label for="code">Code: </label>
            <span>{{order.code}}</span>
        </div>
        
        <div>
            <label for="creationDate">Creation date: </label>
            <span>{{order.creationDate | formatDateTime }}</span>
        </div>
        
        <div>
            <label for="fullName">Customer: </label>
            <span>{{order.customerFullName}}</span>
        </div>

        <div>
            <label for="price">Total price: </label>
            <span>{{order.totalPrice}}</span>
        </div>

        <div>
            <label for="customerType">Customer type: </label>
            <span>{{order.customerType}}</span>
        </div>
        
        <div>
            <label for="status">Status: </label>
            <span>{{order.status}}</span>
        </div>

        <router-link v-if="showDetailsNav" :to="detailsRoute">Details</router-link>
        
        <span v-if="isManager">
            <button v-if="isProcessing" @click="setStatus('IN_PREPARATION')">Confirm</button>
            <button v-if="isInPreparation" @click="setStatus('WAITING_ON_DELIVERY')">To deliver</button>
        </span>

        <span v-if="isDeliverer">
            <button v-if="isWaitingOnDelivery" @click="sendRequest">Request delivery</button>
        </span>

        <span v-if="isCustomer">
            <button v-if="isProcessing" @click="setStatus('CANCELED')">Cancel order</button>
        </span>

    </div> 
    `,
    data() { 
        return {
            
        }
    },

    computed: {
        detailsRoute() {
            return {name: 'restaurant-order-details', params: {
                parentResourceId: this.parentResourceId,
                orderId: this.order.id}}
        },

    },

    methods: {
        async setStatus(status) {
            await restaurantService.setOrderStatus(
                this.parentResourceId,
                this.order.id,
                status
            )
            this.order.status = status;
        },

        async sendRequest() {
            throw new Error('Not implemented!')
        }
    }
})
