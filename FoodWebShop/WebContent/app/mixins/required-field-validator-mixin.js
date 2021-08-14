const requiredFieldValidatorMixin = {
    data() {
        return {
            requiredFieldMsg: "This field is required*",
        }
    },
        
    methods: {
        validate: function(requiredFieldsObject) {
           if (anyOmitted(requiredFieldsObject)) {
               throw Error("Validation failed!")
           }
        },
    } 
 }

 const anyOmitted = (requiredFieldsObject) => {
    const isOmitted = (value) => !value;
    return Object.values(requiredFieldsObject).some(isOmitted);
 }
 export {requiredFieldValidatorMixin as default}