import authService from '../../services/auth-service.js';
import {getRole, getId, saveClaimsToLocalStorage } from '../../local-storage-util.js';

import baseForm from '../../components/form/base-form.js';
import baseField from '../../components/form/base-field.js';
import passwordBox from '../../components/password-box/password-box.js';
import datePicker from '../../components/date-picker/date-picker.js';
import genderPicker from '../../components/entity-picker/gender-picker.js';
import { load } from '../../path-loader.js';

export default Vue.component("signup",{
    components: {
        'base-form': baseForm,
        'base-field': baseField,
        'password-box': passwordBox,
		'date-picker': datePicker,
        'gender-picker': genderPicker,
	},

    template: `
    <div id="signup">

        <div class="negative-margin picture-container">
            <img :src="imgSrc" class="background-img">
            <base-form class="centered-over-picture"
                title="Registration"
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
                    fieldName="Date of birth"
                    required
                    :value="personalData.dateOfBirth">
                    <date-picker v-model="personalData.dateOfBirth"></date-picker>
                </base-field>

                <base-field
                    fieldName="Gender"
                    required
                    :value="personalData.gender">
                    <gender-picker v-model="personalData.gender"></gender-picker>
                </base-field>

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

            personalData: {
                firstName: '',
                lastName: '',
                gender: '',
                dateOfBirth: null
            },

            submit: {
                display: "Sign up",
                invoke: this.signup
            },

            errorMap: {
                '409': 'User with given username already exists.\nPlease enter another username.',
                default: 'Sorry, we were unable to sign you up.\nPlease try again later.'
            },

            imgSrc: load('img/pictures/chinese-food-background.jpg')

            
        }
    },


    methods: {
        async signup() {
            await this.$_signup_authenticate();
            this.$_signup_navigate();
        },

        $_signup_authenticate: async function() {
            const jwt = (await authService.signup(this.credentials, this.personalData)).jwt;
            saveClaimsToLocalStorage(jwt);
        },

        $_signup_navigate: function() {
            const userHome = `${getRole().toLowerCase()}-home`
            this.$router.push({name: userHome, params: { id: getId() }});
        },
    }
})
