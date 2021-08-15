import authService from '../axios-service.js'
import requiredFieldValidatorMixin from '../../mixins/required-field-validator-mixin.js';
import {getRole, getId, saveClaimsToLocalStorage } from '../../local-storage-util.js';

export default Vue.component("signup",{
    mixins: [requiredFieldValidatorMixin],
    components: {
		vuejsDatepicker
	},
    template: `
    <div id="signup">
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

            <div>
                <input 
                    v-model="personalData.firstName" 
                    type="text" 
                    placeholder="First name" 
                    required>
                </input>
                <p 
                    v-hide="personalData.firstName"
                    class="small">
                    {{requiredFieldMsg}}
                </p>
            </div>

            <div>
                <input 
                    v-model="personalData.lastName" 
                    type="text" 
                    placeholder="Last name" 
                    required>
                </input>
                <p 
                    v-hide="personalData.lastName"
                    class="small">
                    {{requiredFieldMsg}}
                </p>
            </div>

            <div>
                <select v-model="personalData.gender" :required="true">
                    <option 
                        v-for="(value, name) in genderOptions" 
                        :key="name"
                        :value="value">
                        {{name}}
                    </option> 
                </select>
                <p 
                    v-hide="personalData.gender"
                    class="small">
                    {{requiredFieldMsg}}
                </p>
            </div>

            <div>
                <vuejs-datepicker
                    :inline="true" 
                    v-model="personalData.dateOfBirth"> 
                </vuejs-datepicker>
                <p 
                    v-hide="personalData.dateOfBirth"
                    class="small">
                    {{requiredFieldMsg}}
                </p>
            </div>
            
            <div v-if="error"> 
                {{error.message}} 
            </div>

            <input 
                type="submit" 
                value="Sign up" 
                @click.prevent='signup' 
                class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" ></input>
        </form>
    </div> 
    `,
    data() { 
        return {
            credentials: {
                username: null,
                password: null
            },

            personalData: {
                firstName: null,
                lastName: null,
                gender: "MALE",
                dateOfBirth: null
            },

            error: {
                cause: null,
                message: null,
                displayMessage: function(message) {
                    this.message = message;
                    setTimeout(() => this.message = null, 10000);
                }
            },

            genderOptions: {
                male: "MALE",
                female: "FEMALE",
                other: "OTHER"
            }
        }
    },


    methods: {
        async signup() {
            try {
                this.$_signup_validate();
                await this.$_signup_authenticate();
                this.$_signup_navigate();
            } catch (e) {
                console.error(e);
                this.$_signup_handleError(e);    
            }
        },
        
        $_signup_validate: function()  {
            this.validate(this.credentials); // from mixin
            this.validate(this.personalData);
        },

        $_signup_authenticate: async function() {
            const jwt = (await authService.signup(this.credentials, this.personalData)).jwt;
            saveClaimsToLocalStorage(jwt);
        },

        $_signup_navigate: function() {
            this.$router.push({name: getRole(), params: { id: getId() }});
        },
        
        $_signup_handleError: function(e) {
            // TODO: check validation or username already exists
            this.error.cause = e;
            const response = e.response;
            if (!response) {
                this.error.displayMessage('Please fill in all the data!');
                return;
            } 
            if (response.status == 409) {
                this.error.displayMessage('User with given username already exists.\nPlease enter another username.');
                return;
            }
            if (response.status == 500) {
                this.error.displayMessage('Sorry! We were unable to fulfill your signup request!\nPlease try again later.');
                return;
            }
        },

    }
})
