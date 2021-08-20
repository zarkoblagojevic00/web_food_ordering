import delivererService from "../deliverer-service-axios.js";
import formatDateMixin from "../../../../../mixins/format-date-mixin.js";
import userActivityStatusMixin from "../../../../../mixins/user-activity-status-mixin.js";

export default Vue.component("deliverer",{
    mixins: [formatDateMixin, userActivityStatusMixin],
    props: {
        username: String,
        firstName: String,
        lastName: String,
        gender: String,
        dateOfBirth: Number,
        activityStatus:String,
        activityReport: Object,
    },
    template: `
    <div v-if="!isDeleted" id="deliverer" style="border: 1px solid black;">
        <div>
            <label for="username">Username: </label>
            <span>{{username}}</span>
        </div>
        
        <div>
            <label for="firstName">First name: </label>
            <span>{{firstName}}</span>
        </div>

        <div>
            <label for="lastName">Last name: </label>
            <span>{{lastName}}</span>
        </div>
        
        <div>
            <label for="gender">Gender: </label>
            <span>{{gender}}</span>
        </div>
        
        <div>
            <label for="dateOfBirth">Date of birth: </label>
            <span>{{dateOfBirth | formatDate}}</span>
        </div>

        <div>
            <label for="numOfDeliveredOrders">Number of delivered orders: </label>
            <span>{{activityReport.numOfDeliveredOrders}}</span>
        </div>
        
        <div>
            <label for="numOfInTransportOrders">Number of orders in transport: </label>
            <span>{{activityReport.numOfInTransportOrders}}</span>
        </div>

        <button v-if="isOk" @click="banDeliverer">Ban</button>
        <button @click="deleteDeliverer">Delete</button>
    </div> 
    `,
    data() { 
        return {
            isDeleted: false
        }
    },

    
    methods: {
        async banDeliverer() {
            await delivererService.ban(this.username);
            this.activityStatus = 'BANNED'; 
        },
        async deleteDeliverer() {
            await delivererService.delete(this.username);
            this.isDeleted = true;
        }
    }
})
