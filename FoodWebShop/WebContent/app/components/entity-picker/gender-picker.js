import entityPicker from "./base/entity-picker.js";

export default Vue.component("gender-picker",{
    props: {
        value: {
            type: String,
            required: true
        },
        isReadonly: {
            type: Boolean,
            default: false
        }
    },

    components: {
        'entity-picker': entityPicker,
    },

    template: `
    <span id="gender-picker">
        <entity-picker
            v-model="selectedGender"
            :options="genders"
            :display="(gender) => gender.display"
            :isReadonly="isReadonly"
            selectedValuePath="value">
        </entity-picker>
    </span> 
    `,

    data() { 
        return {
            selectedGender: '',
            genders: [
                {
                    value: "MALE",
                    display: "Male"
                }, 
                {
                    value: "FEMALE",
                    display: "Female"
                }, 
                {
                    value: "OTHER",
                    display: "Other"
                }
            ]
        }
    },

    watch: {
        selectedGender: function() {
            this.$emit('input', this.selectedGender);
        }
    }
})
