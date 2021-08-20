import managerService from "../manager-service-axios.js";
import formatDateMixin from "../../../../../mixins/format-date-mixin.js";
import userActivityStatusMixin from "../../../../../mixins/user-activity-status-mixin.js";

export default Vue.component("manager",{
    mixins: [formatDateMixin, userActivityStatusMixin],
    props: {
        username: String,
        firstName: String,
        lastName: String,
        gender: String,
        dateOfBirth: Number,
        restaurant: Object,
        activityStatus: String,
    },
    template: `
    <div v-if="!isDeleted" id="manager" style="border: 1px solid black;">
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
        
        <div v-if="restaurant" style="border: 1px solid indianred;">
            <div>
                <label for="logo">Gender: </label>
                <span>{{restaurant.logoPath}}</span>
            </div>
            
            <div>
                <label for="restaurantName">Manages restaurant: </label>
                <span>{{restaurant.name}}</span>
            </div>
            
            <div>
                <label for="restaurantType">Gender: </label>
                <span>{{restaurant.type}}</span>
            </div>
            
            <div v-if="restaurant.location" style="border: 1px dotted burlywood;" >
                <div>
                    <label for="locationMunicipality">Municipality: </label>
                    <span>{{location.municipality}}</span>
                </div>
                <div>
                    <label for="locationStreetName">Street name: </label>
                    <span>{{location.streetName}}</span>
                </div>
                <div>
                    <label for="locationStreetNumber">Street number: </label>
                    <span>{{location.streetNumber}}</span>
                </div>
            </div>
        </div>
        <button v-if="isOk" @click="banManager">Ban</button>
        <button @click="deleteManager">Delete</button>
    </div> 
    `,
    data() { 
        return {
           isDeleted: false
        }
    },

    methods: {
        async banManager() {
            await managerService.ban(this.username);
            this.activityStatus = 'BANNED'; 
        },
        async deleteManager() {
            await managerService.delete(this.username);
            this.isDeleted = true;
        }
    }
})
