import managerService from "../../../../../services/manager-service.js"
import imageService from "../../../../../services/image-service.js";

import formatDateMixin from "../../../../../mixins/format-date-mixin.js";
import userActivityStatusMixin from "../../../../../mixins/user-activity-status-mixin.js";
import createObjectUrlMixin from "../../../../../mixins/create-object-url-mixin.js";

import restaurant from "../../../../../restaurant/overview/restaurant.js";

export default Vue.component("manager",{
    mixins: [formatDateMixin, userActivityStatusMixin, createObjectUrlMixin],
    props: {
        username: String,
        firstName: String,
        lastName: String,
        gender: String,
        dateOfBirth: Number,
        restaurant: Object,
        activityStatus: String,
    },

    components: {
        restaurant
    },

    template: `
    <div v-if="!isDeleted" id="manager" class="item item-padding-label manager">
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
        
        <label v-if="restaurant" for="restaurant">Manager at: </label>
        <restaurant 
            :restaurant="restaurant"
            :isNavigable="false">
        </restaurant>
        
        <button class="btn btn-md btn-warning" v-if="isOk" @click="banManager">Ban</button>
        <button class="btn btn-md btn-danger" @click="deleteManager">Delete</button>
    </div> 
    `,
    data() { 
        return {
            isDeleted: false,
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
