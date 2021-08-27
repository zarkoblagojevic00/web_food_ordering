export default Vue.component("base-field",{
    props: {
        fieldName: String,
        
        value: [Object, String, Number, Date],
        
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
    <div id="base-field">
        <label>{{fieldName}}: </label>
        
        <slot></slot>
        
        <div v-if="hint" 
            v-hide="value"
            class="small">
            {{hint}}
        </div>
    </div> 
    `,

    methods: {
        validate() {
            return this.validator() && ((this.required) ? this.value: true);
        }
    }
})
