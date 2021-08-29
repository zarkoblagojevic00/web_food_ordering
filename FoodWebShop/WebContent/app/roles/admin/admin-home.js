import { getName } from "../../local-storage-util.js";

export default Vue.component("admin-home",{
    template: `
    <div id="admin-home">
        <div>
            <h3>Welcome {{name}}</h3>
        </div>
        <div>
            <router-link :to="{name: 'users-home'}">Users</router-link>
        </div>
        
        <div>
            <router-link :to="{name: 'restaurants-home'}">Restaurants</router-link>
        </div>

        <div>
            <router-link :to="{name: 'admin-profile'}">Profile</router-link>
        </div>
    </div> 
    `,
    data() { 
        return {
            name: getName()
        }
    },
})


