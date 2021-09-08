import { getRestaurantId } from "../local-storage-util.js"
import authMixin from "../mixins/auth-mixin.js"
import authService from "../services/auth-service.js"

export default Vue.component("the-navbar",{
    mixins: [authMixin],
    template: `
    <nav id="the-navbar" class="navbar sticky-top navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="#">FeastNow</a>
            <ul class="list-inline">
                <router-link class="list-inline-item" tag="li" :to="userHome" exact>Home</router-link>
            
                <span class="center-inline-flex" v-if="isGuest">
                    <router-link class="list-inline-item" tag="li" :to="{ name: 'login'}" exact>Login</router-link>
                    <router-link id="signup" class="list-inline-item btn btn-primary round-edges" :to="{ name: 'signup'}" exact>Sign up</router-link>
                </span>
            
                <span v-if="isAdmin">
                    <router-link class="list-inline-item" tag="li" :to="getRoleRoute('users-home')" exact>Users</router-link>
                    <router-link class="list-inline-item" tag="li" :to="getRoleRoute('restaurants-home')" exact>Restaurants</router-link>
                </span>
            
                <span v-if="isCustomer">
                    <router-link class="list-inline-item" tag="li" :to="getRoleRoute('customer-cart')" exact>Shopping cart</router-link>
                    <router-link class="list-inline-item" tag="li" :to="getCustomerRoute('customer-orders')" exact>My orders</router-link>
                </span>
            
                <span v-if="isDeliverer">
                    <router-link class="list-inline-item" tag="li" :to="getDelivererRoute('deliverer-orders', 'available')" exact>Available orders</router-link>
                    <router-link class="list-inline-item" tag="li" :to="getDelivererRoute('deliverer-orders', 'mine')" exact>My orders</router-link>
                </span>
            
                <span v-if="isManager && managerRestaurantId">
                    <router-link class="list-inline-item" tag="li" :to="getManagerRoute('restaurant-root')" exact>Restaurant</router-link>
                    <router-link class="list-inline-item" tag="li" :to="getManagerRoute('restaurant-customers')" exact>Customers</router-link>
                    <router-link class="list-inline-item" tag="li" :to="getManagerRoute('restaurant-orders-overview')" exact>Orders</router-link>
                </span>
            
                <span class="center-inline-flex" v-if="!isGuest">
                    <router-link class="list-inline-item" tag="li" :to="userProfile" exact>Profile</router-link>
                    
                    <router-link class="list-inline-item btn btn-outline-success round-edges "
                        :to="{ name: 'home'}"
                        @click.native="logout"
                        exact>
                        Log out
                    </router-link>
                    
                </span>
            </ul>
        </div>
    </nav> 
    `,
    data() { 
        return {
            guestHome: { name: 'home' },
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

        managerRestaurantRoute() {
            return ''
        },
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

        getDelivererRoute(routeName, type) {
            return { name: routeName, params: { id: this.id, type}};
        },

        getCustomerRoute(routeName) {
            return { name: routeName, params: { id: this.id, type: 'mine'}}
        },

        async logout () {
            await authService.logout();
            this.role = null;
            this.id = null;
        }
    }
})
