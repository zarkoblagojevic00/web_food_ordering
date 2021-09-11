import authService from '../../services/auth-service.js';
import managerService from '../../services/manager-service.js';
import { getRole, getId, saveClaimsToLocalStorage, setRestaurantId } from '../../local-storage-util.js';

import baseForm from '../../components/form/base-form.js';
import baseField from '../../components/form/base-field.js';
import { load } from '../../path-loader.js';

export default Vue.component("login",{
    components: {
        'base-form': baseForm,
        'base-field': baseField
    },

    template: `
    <div id="login">
        
        <div class="negative-margin picture-container">
            <img :src="imgSrc" class="background-img"></img>
            
            <base-form class="centered-over-picture"
                title="Login"
                :submit="submit"
                :errorMap="errorMap">
                
                <base-field 
                    fieldName="Username"
                    required
                    :value="credentials.username"
                    >
                    <input class="form-control"
                        v-model="credentials.username" 
                        type="text"
                        required>
                    </input>
                </base-field>
                
                <base-field
                    fieldName="Password"
                    required
                    :value="credentials.password">
                    <password-box v-model="credentials.password"></password-box>
                </base-field>
                    
                <router-link :to="{ name: 'signup'}" class="medium" exact>Not Registered? Sign up for free!</router-link>
            </base-form>
        </div>
    </div> 
    `,
    data() { 
        return {
            credentials: {
                username: null,
                password: null
            },

            imgSrc: load('img/pictures/jonathan-borba-8l8Yl2ruUsg-unsplash.jpg'),

            submit: {
                display: "Log in",
                invoke: this.login
            },

            errorMap: {
                '403': 'Sorry, you can\'t login because you are banned.',
                '404': `Wrong username or password.\nPlease try again.`,
                default: 'Sorry, we were unable to log you in. Please, try again later.',
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
            
            if ( getRole() === "MANAGER" ) {
                const manager = await managerService.getManager(getId());
                setRestaurantId(manager.restaurant.id);
            }
            
        },

        $_login_navigate: function() {
            this.$router.push({name: 'home'});
        },
    }
})

