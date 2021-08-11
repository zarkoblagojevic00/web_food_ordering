export default Vue.component("login",{
    template: `
    <div id="login">
        <form>
            <div>
                <label for="username">Username</label>
                <input v-model="user.username" placeholder="username" id="username" required>
            </div>

            <dusernameivUsername>
                <label for="password">Password</label>
                <input v-model="user.password" type="password" placeholder="password" id="password" required>
            </div>

            <button type="button" class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" v-on:click='login(user)'>Sign in</button>
            <router-link to='/signup' class="small" exact>Not Registered? Sign up for free</router-link>
        </form>
    </div> 
    `,
    data() { 
        return {
           username: null,
           password: null
        }
    },

    computed: {
        
    },

    methods: {
        
    }
})
