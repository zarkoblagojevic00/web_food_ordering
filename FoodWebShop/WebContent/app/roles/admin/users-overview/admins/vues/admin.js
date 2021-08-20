import formatDateMixin from "../../../../../mixins/format-date-mixin.js";
import userActivityStatusMixin from "../../../../../mixins/user-activity-status-mixin.js";

export default Vue.component("admin",{
    mixins: [formatDateMixin, userActivityStatusMixin],
    props: {
        username: String,
        firstName: String,
        lastName: String,
        gender: String,
        dateOfBirth: Number,
        activityStatus: String,
    },
    template: `
    <div id="admin" style="border: 1px solid black;">
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
    </div> 
    `,
})
