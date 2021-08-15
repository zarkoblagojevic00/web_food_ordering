import { getRole, clearStorage } from "../local-storage-util.js"

export default Vue.component("the-navbar",{
    template: `
    <div id="the-navbar" style="border-bottom: 3px  solid blueviolet;">
        <h2 >FeastNow.io</h2>
        <ul>
            <li><router-link :to="{ name: 'home'}" exact>Home</router-link></li>
            <li v-if="!role"><router-link :to="{ name: 'login'}" exact>Login</router-link></li>
            <li v-if="!role"><router-link :to="{ name: 'signup'}" exact>Sign up</router-link></li>
            <li v-if="role">
                <router-link 
                    :to="{ name: 'home'}" 
                    @click.native="logout" 
                    exact>
                    Log out
                </router-link></li>
        </ul>
    </div> 
    `,
    data() { 
        return {
           role: null
        }
    },

    mounted() {
        addEventListener('user-logged-in', event => this.role = event.detail.role);
        this.role = getRole();
    },

    methods: {
        logout () {
            clearStorage();
            this.role = null;
        }
    }
})
