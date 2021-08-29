import { getRole, getId, clearStorage } from "../local-storage-util.js"

export default Vue.component("the-navbar",{
    template: `
    <div id="the-navbar" style="border-bottom: 3px  solid blueviolet;">
        <h2 >FeastNow.io</h2>
        <ul>
            <li><router-link :to="userHome" exact>Home</router-link></li>
            
            <span v-if="isGuest">
                <li><router-link :to="{ name: 'login'}" exact>Login</router-link></li>
                <li><router-link :to="{ name: 'signup'}" exact>Sign up</router-link></li>
            </span>
            
            <span v-if="isAdmin">
                <li><router-link :to="getRoleRoute('users-home')" exact>Users</router-link></li>
                <li><router-link :to="getRoleRoute('restaurants-home')" exact>Restaurants</router-link></li>
                <li><router-link :to="getRoleRoute('admin-profile')" exact>Profile</router-link></li>
            </span>
            <span v-if="isCustomer"></span>
            <span v-if="isDeliverer"></span>
            <span v-if="isManager"></span>

            <li v-if="!isGuest">
                <router-link 
                    :to="{ name: 'home'}" 
                    @click.native="logout" 
                    exact>
                    Log out
                </router-link>
            </li>
        </ul>
    </div> 
    `,
    data() { 
        return {
            guestHome: { name: 'home' },
            role: null,
            id: null
        }
    },

    computed: {
        userHome() {
            return (this.isGuest) ? this.guestHome : this.getRoleRoute(this.roleHome)
        },
        roleHome() {
            return `${this.role.toLowerCase()}-home`
        },
        isAdmin() { return this.role === "ADMIN"; },
        isCustomer() { return this.role === "CUSTOMER" },
        isDeliverer() { return this.role === "DELIVERER" },
        isManager() { return this.role === "MANAGER" },
        isGuest() { return !this.role } 
    },

    mounted() {
        addEventListener('user-logged-in', event => [this.role, this.id] = event.detail.creds);
        this.role = getRole();
        this.id = getId();
    },

    methods: {
        getRoleRoute(routeName) {
            return { name: routeName, params: { id: this.id }}
        },

        logout () {
            clearStorage();
            this.role = null;
            this.id = null;
        }
    }
})
