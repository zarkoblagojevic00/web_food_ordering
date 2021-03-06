import customerService from "../../../../../services/customer-service.js";
import formatDateMixin from "../../../../../mixins/format-date-mixin.js";
import userActivityStatusMixin from "../../../../../mixins/user-activity-status-mixin.js";

export default Vue.component("customer",{
    mixins: [formatDateMixin, userActivityStatusMixin],
    props: {
        username: String,
        firstName: String,
        lastName: String,
        gender: String,
        dateOfBirth: Number,
        activityStatus: String,
        type: String,
        pointsEarned: Number,
        activityReport: Object,
    },

    template: `
    <div id="customer" class="item item-padding-label" :class="customerTypeClass">
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
            <label for="type">Type: </label>
            <span>{{type}}</span>
        </div>
        
        <div>
            <label for="pointsEarned">Points earned: </label>
            <span>{{pointsEarned}}</span>
        </div>
        
        <div v-if="activityReport">
            <label for="numOfCanceledOrdersInPastMonth">Canceled orders: </label>
            <span>{{activityReport.numOfCanceledOrdersInPastMonth}}</span>
        </div>

        <button class="btn btn-md btn-warning" v-if="isSuspicious" @click="banCustomer">Ban</button>
    </div> 
    `,

    data() { 
        return {
            customerTypeClass: {
                'bronze-grad': this.type === "BRONZE",
                'silver-grad': this.type === "SILVER",
                'gold-grad': this.type === "GOLD",
            },
        }
    },

    methods: {
        async banCustomer() {
            await customerService.ban(this.username);
            this.activityStatus = 'BANNED';
        }
    }
})
