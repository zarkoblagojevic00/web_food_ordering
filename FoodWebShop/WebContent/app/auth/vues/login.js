import authService from '../axios-service.js'
import formValidatorMixin from '../../mixins/form-validator-mixin.js';


export default Vue.component("login",{
    mixins: [formValidatorMixin],
    template: `
    <div id="login">
        <form>
            <div>
                <input 
                    v-model.lazy="credentials.username" 
                    placeholder="username" 
                    required>
                </input>
                <p 
                    v-if="isInvalidCredentials['username']"
                    class="small">
                    {{requiredFieldMsg}}
                </p>
            </div>

            <div>
                <input 
                    v-model.lazy="credentials.password" 
                    type="password" 
                    placeholder="password" 
                    required>
                </input>
                <p 
                    v-if="isInvalidCredentials['password']"
                    class="small">
                    {{requiredFieldMsg}}
                </p>
            </div>
            
            <div v-if="error"> 
                {{error.message}} 
            </div>

            <input type="submit" value="Sign in" class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" @click.prevent='login'></input>
            <router-link :to="{ name: 'signup'}" class="medium" exact>Not Registered? Sign up for free!</router-link>
        </form>
    </div> 
    `,
    data() { 
        return {
            credentials: {
                username: null,
                password: null
            },
            error: {
                cause: null,
                message: null,
                displayMessage: function(message) {
                    this.message = message;
                    setTimeout(() => this.message = null, 10000);
                }
            }, 
        }
    },

    computed: {
        isInvalidCredentials() {
           return this.isInvalidInput(this.credentials);
        }
    },

    methods: {
        async login() {
            try {
                this.$_login_validate();
                await this.$_login_authenticate();
            } catch (e) {
                console.error(e);
                this.$_login_handleError(e);    
            }
        },
        
        $_login_validate: function() {
            this.validate();
        },

        $_login_authenticate: async function() {
            const jwt = await authService.login(this.credentials);
            const payload = getJWTPayload(jwt); 
            localStorage.setItem('JWT', jwt);
            localStorage.setItem('claims', payload);
            // should navigate to {name: 'homepage', params: {userId: payload.id }}
            this.$router.push({name: 'home'});
        },
        
        $_login_handleError: function(e) {
            this.error.cause = e;
            this.error.displayMessage('Wrong username or password. Please try again.');
        },

    }
})


const getJWTPayload = (jwt) => {
    base64Payload = jwt.split('.')[1];
    stringPayload = base64ToString(base64Payload);
    return JSON.parse(stringPayload);
}

const base64ToString = (base64str) => decodeURIComponent(escape(atob(base64str)))


