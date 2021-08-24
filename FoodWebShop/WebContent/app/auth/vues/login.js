import authService from '../../services/auth-service.js';
import requiredFieldValidatorMixin from '../../mixins/required-field-validator-mixin.js';
import { getRole, getId, saveClaimsToLocalStorage } from '../../local-storage-util.js';


export default Vue.component("login",{
    mixins: [requiredFieldValidatorMixin],   // validate and checkInput
    template: `
    <div id="login">
        <form>
            <div>
                <input 
                    v-model="credentials.username" 
                    placeholder="username" 
                    required>
                </input>
                <p 
                    v-hide="credentials.username"
                    class="small">
                    {{requiredFieldMsg}}
                </p>
            </div>

            <div>
                <input 
                    v-model="credentials.password" 
                    type="password" 
                    placeholder="password" 
                    required>
                </input>
                <p 
                    v-hide="credentials.password"
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


    methods: {
        async login() {
            try {
                this.$_login_validate();
                await this.$_login_authenticate();
                this.$_login_navigate();
            } catch (e) {
                console.error(e);
                this.$_login_handleError(e);    
            }
        },
        
        $_login_validate: function()  {
            this.validate(this.credentials); // from mixin
        },

        $_login_authenticate: async function() {
            const jwt = (await authService.login(this.credentials)).jwt;
            saveClaimsToLocalStorage(jwt);
        },

        $_login_navigate: function() {
            this.$router.push({name: getRole(), params: { id: getId() }});
        },
        
        $_login_handleError: function(e) {
            this.error.cause = e;
            const response = e.response;
            if (!response) {
                this.error.displayMessage('Please enter both username and password!');
                return;
            } 
            if (response.status == 404) {
                this.error.displayMessage('Wrong username or password. Please try again.');
                return;
            }
        },

    }
})

