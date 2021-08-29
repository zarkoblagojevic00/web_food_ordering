import restaurantService from "../../services/restaurant-service.js";

import entityPicker from "./base/entity-picker.js";

export default Vue.component("restaurant-type-picker",{
    props: {
        value: {
            type: String,
            required: true
        }
    },

    components: {
        'entity-picker': entityPicker,
    },

    // v-if used to await async data
    template: `
    <span id="restaurant-type-picker">
        <entity-picker v-if="restaurantTypes"
            v-model="selectedType"
            :options="restaurantTypes"
            :display="(type) => type.toLowerCase()">
        </entity-picker>
    </span> 
    `,
    data() { 
        return {
           selectedType: '',
           restaurantTypes: null
        }
    },

    async created() {
        this.restaurantTypes = await restaurantService.getTypes();
    },

    watch : {
        selectedType: function() {
            this.$emit('input', this.selectedType);
        }
    }
    
})
