
import { getRestaurantId } from "../local-storage-util.js";

import orderService from "../services/order-service.js";

import authMixin from "../mixins/auth-mixin.js";
import formatDateMixin from "../mixins/format-date-mixin.js";
import orderStatusMixin from "../mixins/order-status-mixin.js";

export default Vue.component("order",{
    mixins: [formatDateMixin, orderStatusMixin, authMixin],
    
    props: {
        order: {
            type: Object,
            required: true,
        },
        showDetailsNav: {
            type: Boolean,
            default: true
        },
    },

    template: `
    <div id="order" style="border: 1px solid black">
        <div>
            <label for="code">Code: </label>
            <span>{{order.code}}</span>
        </div>
        
        <span v-if="!isManager">
           <div>
                <label for="restaurant">Restaurant: </label>
                <span>{{order.restaurant.name}}</span>
           </div> 
           
           <div>
                <label for="location">Restaurant location: </label>
                <span>{{restaurantLocation}}</span>
           </div>
           
           <div>
               <label for="restaurantType">Restaurant type: </label>
               <span>{{order.restaurant.type}}</span>
           </div>

        </span>
        
        <div>
            <label for="creationDate">Creation date: </label>
            <span>{{order.creationDate | formatDateTime }}</span>
        </div>
        
        <div>
            <label for="fullName">Customer: </label>
            <span>{{order.customerFullName}}</span>
        </div>
       
        <div>
            <label for="customerType">Customer type: </label>
            <span>{{order.customerType}}</span>
        </div>

        <div>
            <label for="price">Total price: </label>
            <span>{{order.totalPrice}}</span>
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
            <button v-if="isWaitingOnDelivery && !requestedDelivery" @click="sendRequest">Request delivery</button>
            <button v-if="isInTransport" @click="setStatus('DELIVERED')">Delivered</button>
        </span>

        <span v-if="isCustomer">
            <button v-if="isProcessing" @click="setStatus('CANCELED')">Cancel order</button>
        </span>

    </div> 
    `,
    data() { 
        return {
            requestedDelivery: false,
        }
    },

    computed: {
        detailsRoute() {
            
            return (this.isManager) ? {
                name: 'restaurant-order-details', 
                params: {
                    parentResourceId: getRestaurantId(),
                    orderId: this.order.id
                },
            } : {
                name: 'order-details',
                params: {
                    orderId: this.order.id
                },
            }
        },

        restaurantLocation() {
            const location = this.order.restaurant.location;
            return `${location.municipality} - ${location.streetName} ${location.streetNumber}`
        }

    },

    methods: {
        async setStatus(status) {
            await orderService.setOrderStatus(this.order.id, status)
            this.order.status = status;
        },

        async sendRequest() {
            await orderService.sendRequest(this.order.id, this.id)
            this.requestedDelivery = true;
            
        }
    }
})
