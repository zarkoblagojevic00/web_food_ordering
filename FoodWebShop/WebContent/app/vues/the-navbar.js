import { getRole, getId, clearStorage, getRestaurantId } from "../local-storage-util.js"

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
            </span>
            <span v-if="isCustomer"></span>
            <span v-if="isDeliverer"></span>
            
            <span v-if="isManager && managerRestaurantId">
                <li><router-link :to="getManagerRoute('restaurant-root')" exact>Restaurant</router-link></li>
                <!-- <li><router-link :to="getManagerRoute('restaurant-customers')" exact>Customers</router-link></li>
                <li><router-link :to="getManagerRoute('restaurant-orders')" exact>Orders</router-link></li>
                 -->
            </span>
            
            <span v-if="!isGuest">
                <li><router-link :to="userProfile" exact>Profile</router-link></li>
                <li>
                    <router-link
                        :to="{ name: 'home'}"
                        @click.native="logout"
                        exact>
                        Log out
                    </router-link>
                </li>
            </span>
        </ul>
    </div> 
    `,
    data() { 
        return {
            guestHome: { name: 'home' },
            role: getRole(),
            id: getId(),
            managerRestaurantId: getRestaurantId()
        }
    },

    computed: {
        userHome() {
            return (this.isGuest) ? this.guestHome : this.getRoleRoute(this.roleHome)
        },
        
        roleHome() {
            return `${this.roleLowerCased}-home`
        },
        
        userProfile() {
            return this.getRoleRoute(this.roleProfile)
        },

        roleProfile() {
            return `${this.roleLowerCased}-profile`
        },

        roleLowerCased() {
            return this.role.toLowerCase();
        },

        isAdmin() { return this.role === "ADMIN"; },
        isCustomer() { return this.role === "CUSTOMER" },
        isDeliverer() { return this.role === "DELIVERER" },
        isManager() { return this.role === "MANAGER" },
        isGuest() { return !this.role } 
    },

    mounted() {
        addEventListener('user-logged-in', event => [this.role, this.id] = event.detail.creds);
        addEventListener('manager-logged-in' , event => this.managerRestaurantId = event.detail.managerRestaurantId);
    },

    methods: {
        getRoleRoute(routeName) {
            return { name: routeName, params: { id: this.id }}
        },

        getManagerRoute(routeName) {
            return { name: routeName, params: { id: this.id, restaurantId: this.managerRestaurantId}}
        },

        logout () {
            clearStorage();
            this.role = null;
            this.id = null;
        }
    }
})
