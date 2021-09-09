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
    <div id="base-form" class="form-group">
        <div id="title">
            <h4>{{title}}</h4>
        </div>

        <slot ref="slot"></slot>
        
        <div id="submit">
            <input
                type="submit" 
                :value="submit.display" 
                class="btn btn-lg btn-primary text-uppercase font-weight-bold mb-2" 
                @click.prevent="submitData">
        </div>

        <div id="fail" v-hide="!error.message" class="alert alert-danger fade show">
            <strong>{{error.message}}</strong>
        </div>
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
            validate(this);
            return this.submit.invoke();
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

const validate = (vnode) => {
    if (!vnode) return;
         
    if (vnode.validate) {
        if (!vnode.validate()) throw new Error ('Validation failed!'); 
    }
    vnode.$children.forEach(validate);
}
