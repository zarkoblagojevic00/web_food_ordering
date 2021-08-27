import authService from '../../services/auth-service.js';
import requiredFieldValidatorMixin from '../../mixins/required-field-validator-mixin.js';
import { getRole, getId, saveClaimsToLocalStorage } from '../../local-storage-util.js';

import baseForm from '../../components/form/base-form.js';
import baseField from '../../components/form/base-field.js';

export default Vue.component("login",{
    mixins: [requiredFieldValidatorMixin],   // validate and checkInput
    components: {
        'base-form': baseForm,
        'base-field': baseField
    },

    template: `
    <div id="login">
        <base-form
            title="Login"
            :submit="submit"
            :errorMap="errorMap">
            
            <base-field
                fieldName="Username"
                required
                :value="credentials.username"
                >
                <input 
                    v-model="credentials.username" 
                    type="text"
                    required>
                </input>
            </base-field>
            
            <base-field
                fieldName="Password"
                required
                :value="credentials.password"
                >
                <input 
                    v-model="credentials.password" 
                    type="password" 
                    required>
                </input>
            </base-field>
            
            <router-link :to="{ name: 'signup'}" class="medium" exact>Not Registered? Sign up for free!</router-link>
        </base-form>
    </div> 
    `,
    data() { 
        return {
            credentials: {
                username: null,
                password: null
            },

            test: "teest",
           
            submit: {
                display: "Log in",
                invoke: this.login
            },

            errorMap: {
                '404': 'Wrong username or password. Please try again.',
                default: 'Sorry, we were unable to log you in. Please, try again later.'
            }
        }
    },


    methods: {
        async login() {
            await this.$_login_authenticate();
            this.$_login_navigate();
        },
        
        $_login_authenticate: async function() {
            const jwt = (await authService.login(this.credentials)).jwt;
            saveClaimsToLocalStorage(jwt);
        },

        $_login_navigate: function() {
            const userHome = `${getRole().toLowerCase()}-home`
            this.$router.push({name: userHome, params: { id: getId() }});
        },
    }
})

