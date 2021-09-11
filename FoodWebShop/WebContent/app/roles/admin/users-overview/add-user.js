import userService from "../../../services/user-service.js";

import baseForm from "../../../components/form/base-form.js";
import baseField from "../../../components/form/base-field.js";
import passwordBox from "../../../components/password-box/password-box.js"; 
import datePicker from "../../../components/date-picker/date-picker.js";
import genderPicker from "../../../components/entity-picker/gender-picker.js";


export default Vue.component("add-user",{
    props: ['role'],
    components: {
        'base-form': baseForm,
        'base-field': baseField,
        'password-box': passwordBox,
		'date-picker': datePicker,
        'gender-picker': genderPicker,
	},
    template: `
    <div id="add-user" class="add-user">
        <base-form
            title="New user"
            :submit="submit"
            :errorMap="errorMap">

            <base-field
                fieldName="Username"
                required
                :value="credentials.username">
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
            
            <base-field
                fieldName="First name"
                required
                :value="personalData.firstName" >
                 <input class="form-control"
                    v-model="personalData.firstName" 
                    type="text" 
                    required>
                </input>
            </base-field>
            
            <base-field
                fieldName="Last name"
                required
                :value="personalData.lastName">
                 <input class="form-control"
                    v-model="personalData.lastName" 
                    type="text" 
                    required>
                </input>
            </base-field>
            
            <base-field
                fieldName="Gender"
                required
                :value="personalData.gender">
                <gender-picker v-model="personalData.gender"></gender-picker>
            </base-field>

            <base-field
                fieldName="Date of birth"
                required
                :value="personalData.dateOfBirth">
                <date-picker v-model="personalData.dateOfBirth"></date-picker>
            </base-field>

            <base-field
                fieldName="User type"
                :value="role">
                <input class="form-control"
                    :value="role" 
                    type="text" 
                    disabled 
                    >
                </input>
            </base-field>
        </base-form>
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
                gender: '',
                dateOfBirth: null
            },

            submit: {
                display: "Add user",
                invoke: this.add
            },

            errorMap: {
                '409': 'User with given username already exists.\nPlease enter another username.',
                default: 'Sorry, we were unable to register new user.\nPlease try again later.'
            }
        }


    },
    methods: {
        async add() {
            await this.$_add_send();
            this.$_add_navigate_back();
        },
        
        $_add_send: async function() {
            await userService.add(this.credentials, this.personalData, this.role);
        },

        $_add_navigate_back: function() {
            this.$router.back();
        },
    }
})
