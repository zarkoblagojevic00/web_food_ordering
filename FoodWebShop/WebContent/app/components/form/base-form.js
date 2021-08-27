export default Vue.component("base-form",{
    props: {
        title: {
            type: String,
            default: "Form title"
        },
        submit: {       // {display: String, invoke: Function}
            type: Object,
            required: true,
        },
        errorMap: {     // e.g. {'404': "Message to display for 404", '409': "...", 'default': "sorry"}
            type: Object,
            required: true
        }
    },

    template: `
    <div id="base-form">
        <h4>{{title}}</h4>
        <slot ref="slot"></slot>
        <div v-if="error"> 
            {{error.message}} 
        </div>
        <input 
                type="submit" 
                :value="submit.display" 
                class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" 
                @click.prevent="submitData">  
    </div> 
    `,

    
    data() { 
        return {
            error: {
                message: null,
                validationFailedMessage: 'Please fill in all the required data!',
                displayMessage: function(message=this.validationFailedMessage) {
                    this.message = message;
                    setTimeout(() => this.message = null, 10000);
                }
            },
        }
    },

    methods: {
        async submitData() {
            try {
                await this.$_form_submit();
            } catch (e) {
                this.$_form_handleError(e);
            }
        },

        async $_form_submit() {
            this.$_form_validate();
            return this.submit.invoke();
        },

        $_form_validate() {
            const isValid = this.$slots.default
                .map(vnode => vnode.componentInstance)
                .filter(component => component && component.validate)
                .map(component => component.validate()) // mapping so that all validate functions run (side effects)
                .every(isValid => isValid);
            
            if (!isValid) {
                throw new Error ('Validation failed!');
            }
        },

        $_form_handleError(e) {
            console.error(e);
            const response = e.response;
            
            if (!response) {
                this.error.displayMessage();
            } else {
                const {[response.status]: message=this.errorMap.default} = this.errorMap;
                this.error.displayMessage(message);
            }
        },
    }
})
