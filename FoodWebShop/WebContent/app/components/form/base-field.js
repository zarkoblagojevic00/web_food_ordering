export default Vue.component("base-field",{
    props: {
        fieldName: String,
        
        value: [Object, String, Number, Date, File, Blob, Boolean],
        
        validator: {
            type: Function,
            default: () => true,
        },

        required: {
            type: Boolean,
            default: false
        },

        hint: {
            type: String, 
            default() { return (this.required) ? 'This field is required*' : '' }
        }
    },
    template: `
    <div id="base-field" class="container">
        <div v-if="fieldName">
            <label :for="fieldName">{{fieldName}}: </label>
        </div>
        <slot></slot>
        
        <small v-hide="value" v-if="hint" class="form-text"> {{hint}} </small>
    </div> 
    `,

    methods: {
        validate() {
            console.log(this.fieldName);
            return this.validator() && ((this.required) ? this.value: true);
        }
    }
})
