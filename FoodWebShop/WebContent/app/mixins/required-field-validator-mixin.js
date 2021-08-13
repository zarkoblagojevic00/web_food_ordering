const requiredFieldValidatorMixin = {
    data() {
        return {
            requiredFieldMsg: "This field is required*",
        }
    },
        
    methods: {
        validate: function(requiredFieldsObject) {
            const isOmitted = (value) => !value;
            Object.values(requiredFieldsObject).some(isOmitted);
        },
    } 
 }

 export {requiredFieldValidatorMixin as default}