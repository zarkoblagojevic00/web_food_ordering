
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
    <div id="order" class="item" :class="customerTypeClass">
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
            <label for="status" >Status: </label>
            <span class="badge badge-props" :class="orderStatusClass">{{order.status}}</span>
        </div>

        <router-link class="btn btn-md btn-primary" v-if="showDetailsNav" :to="detailsRoute">Details</router-link>
        
        <span v-if="isManager">
            <button class="btn btn-md btn-success" v-if="isProcessing" @click="setStatus('IN_PREPARATION')">Confirm</button>
            <button class="btn btn-md btn-success" v-if="isInPreparation" @click="setStatus('WAITING_ON_DELIVERY')">To deliver</button>
        </span>

        <span v-if="isDeliverer">
            <button class="btn btn-md btn-success" v-if="isWaitingOnDelivery && !requestedDelivery" @click="sendRequest">Request delivery</button>
            <button class="btn btn-md btn-success" v-if="isInTransport" @click="setStatus('DELIVERED')">Delivered</button>
        </span>

        <span v-if="isCustomer">
            <button class="btn btn-md btn-danger" v-if="isProcessing" @click="setStatus('CANCELED')">Cancel order</button>
            <router-link class="btn btn-md btn-success" v-if="isDelivered" :to="addCommentRoute"">Leave a comment</router-link>
        </span>

    </div> 
    `,
    data() { 
        return {
            requestedDelivery: false,
            customerTypeClass: {
                'bronze-grad': this.order.customerType === "BRONZE",
                'silver-grad': this.order.customerType === "SILVER",
                'gold-grad': this.order.customerType === "GOLD",
            },
            
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
                name: (this.isDeliverer) ? 'order-details' : 'customer-order-details',
                params: {
                    orderId: this.order.id
                },
            }
        },

        addCommentRoute() {
            return {
                name: "add-comment",
                params: { restaurantId: this.order.restaurant.id}
            }
        },

        restaurantLocation() {
            const location = this.order.restaurant.location;
            return `${location.municipality} - ${location.streetName} ${location.streetNumber}`;
        },

        orderStatusClass() {
            return {
                'badge-danger': this.isCanceled,
                'badge-success': this.isDelivered,
                'badge-secondary': this.isInPreparation,
                'badge-warning': this.isWaitingOnDelivery || this.isProcessing || this.isInTransport,
            }
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
