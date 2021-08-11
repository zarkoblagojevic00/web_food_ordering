const formValidatorMixin = {
    data() {
        return {
            requiredFieldMsg: "This field is required*",
            requiredFieldsObject: null,
            isOmitted: null,
        }
    },
        
    methods: {
        validate: function() {
            if (!this.requiredFieldsObject) throw Error("Field object is not set! Call init method first!");
            this.$_validator_setAllOmitted();
            if (this.$_validator_anyOmitted()) throw Error("Validation failed!");
        },

        isInvalidInput: function(requiredFieldsObject) {
            this.$_validator_initValidator(requiredFieldsObject);
            return this.$_validator_isInvalidInput();
        },

        $_validator_isInvalidInput: function() {
            let retVal = {};
            const shouldShow = (field) => retVal[field] = !this.requiredFieldsObject[field] && this.isOmitted[field];
            Object.keys(this.isOmitted).forEach(shouldShow);
            return retVal;
        },

        $_validator_initValidator: function(requiredFieldsObject) {
            this.requiredFieldsObject = requiredFieldsObject;
            if (!this.isOmitted) {
                this.$_validator_initOmitted();
            } else {
                this.$_validator_setAllOmitted();
            }
        },

        $_validator_initOmitted: function() {
            this.isOmitted = {};
            const initOmittedField = (field) => this.isOmitted[field] = false;
            Object.keys(this.requiredFieldsObject).forEach(initOmittedField);
        },
        
        $_validator_setAllOmitted: function() {
            const setOmitted = (field) => this.isOmitted[field] = !this.requiredFieldsObject[field];
            Object.keys(this.requiredFieldsObject).forEach(setOmitted);
        },

        $_validator_anyOmitted: function(){
            const identity = (value) => value;
            return Object.values(this.isOmitted).some(identity);
        }
    } 
 }

 export {formValidatorMixin as default}