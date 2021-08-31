import entityPicker from "./base/entity-picker.js";

export default Vue.component("product-type-picker",{
    props: {
        value: {
            type: String,
            required: true
        }
    },

    components: {
        'entity-picker': entityPicker,
    },

    template: `
    <span id="product-type-picker">
        <entity-picker
            v-model="selectedProductType"
            :options="productTypes"
            :display="(productType) => productType.display"
            selectedValuePath="value">
        </entity-picker>
    </span> 
    `,
    data() { 
        return {
            selectedProductType: '',
            productTypes: [
                {
                    value: "FOOD",
                    display: "Food"
                }, 
                {
                    value: "DRINK",
                    display: "Drink"
                }, 
            ]
        }
    },

    watch: {
        selectedProductType: function() {
            this.$emit('input', this.selectedProductType);
        }
    }
})
