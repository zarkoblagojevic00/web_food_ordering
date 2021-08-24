import authService from "../../../services/auth-service.js";
import requiredFieldValidatorMixin from "../../../mixins/required-field-validator-mixin.js";

export default Vue.component("add-user",{
    props: ['role'],
    mixins: [requiredFieldValidatorMixin],
    components: {
		vuejsDatepicker
	},
    template: `
    <div id="add-user">
        <h3>Add user</h3>
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

            <div>
                <input
                    :value="role" 
                    type="text" 
                    disabled 
                    >
                </input>
            </div>
            
            <div v-if="error"> 
                {{error.message}} 
            </div>

            <input 
                type="submit" 
                value="Submit" 
                @click.prevent='add' 
                class="btn btn-primary btn-block text-uppercase font-weight-bold mb-2" ></input>
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
        async add() {
            try {
                this.$_add_validate();
                await this.$_add_send();
                this.$_add_navigate_back();
            } catch (e) {
                console.error(e);
                this.$_add_handleError(e);
            }
        },
        
        $_add_validate: function()  {
            this.validate(this.credentials); // from mixin
            this.validate(this.personalData);
        },

        $_add_send: async function() {
            await authService.add(this.credentials, this.personalData, this.role);
        },

        $_add_navigate_back: function() {
            this.$router.back();
        },

        $_add_handleError: function(e) {
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
                this.error.displayMessage('Sorry! We were unable to fulfill your request!\nPlease try again later.');
                return;
            }
        },
    }
})
