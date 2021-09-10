import userService from "../services/user-service.js";
import authService from "../services/auth-service.js";

import baseForm from "../components/form/base-form.js"
import baseField from "../components/form/base-field.js"
import passwordBox from "../components/password-box/password-box.js"
import datePicker from "../components/date-picker/date-picker.js"
import genderPicker from "../components/entity-picker/gender-picker.js"
import { saveClaimsToLocalStorage } from "../local-storage-util.js"

export default Vue.component("edit-profile",{
    components: {
        'base-form': baseForm,
        'base-field': baseField,
        'password-box': passwordBox,
		'date-picker': datePicker,
        'gender-picker': genderPicker,
	},
    template: `
    <div id="edit-profile" class="edit-profile">
        <base-form
            title="Edit profile"
            :submit="submitProfile"
            :errorMap="errorMapProfile">

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
        </base-form>

        
        <base-form
            title="Edit password"
            :submit="submitPassword"
            :errorMap="errorMapPassword">
                <base-field
                    fieldName="Old password"
                    required
                    :value="oldPassword">
                    <password-box v-model="oldPassword"></password-box>
                </base-field>
            
                <base-field
                    fieldName="New password"
                    required
                    :value="newPassword">
                    <password-box v-model="newPassword"></password-box>
                </base-field>
        </base-form>
            
    </div> 
    `,
    data() { 
        return {
            credentials: {
                username: null,
            },

            personalData: {
                firstName: '',
                lastName: '',
                gender: '',
                dateOfBirth: null
            },

            submitProfile: {
                display: "Update profile",
                invoke: this.editProfile
            },

            errorMapProfile: {
                '409': 'User with given username already exists.\nPlease enter another username.',
                default: 'Sorry, we were unable to edit your profile.\nPlease try again later.'
            },

            oldPassword: '',
            newPassword: '',

            submitPassword: {
                display: "Change password",
                invoke: this.editPassword
            },

            errorMapPassword: {
                '404': 'Old password you supplied was not correct.\nPlease try again.',
                default: 'Sorry, we were unable to edit your password.\nPlease try again later.'
            },

            
        }
    },

    async mounted() {
        const userOverview = await userService.getProfile();
        this.credentials.username = userOverview.username;
        this.personalData.firstName = userOverview.firstName;
        this.personalData.lastName = userOverview.lastName;
        this.personalData.gender = userOverview.gender;
        this.personalData.dateOfBirth = userOverview.dateOfBirth;
    },

    methods: {
        async editProfile() {
            const jwt = (await authService.editProfile(this.credentials, this.personalData)).jwt;
            saveClaimsToLocalStorage(jwt);
        },

        async editPassword() {
            await userService.editPassword(this.oldPassword, this.newPassword);
        }
    }
})
