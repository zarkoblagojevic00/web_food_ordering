import managerService from "../../services/manager-service.js";

import entityPicker from "./base/entity-picker.js"

export default Vue.component("manager-picker",{
    props: {
        value: {
            type: Number,
            required: true
        }
    },

    components: {
        'entity-picker': entityPicker,
    },

    // v-if used to await async data
    template: `
    <span id="manager-picker">
        <entity-picker v-if="managers"
            v-model="selectedManagerId"
            :options="managers"
            :display="displayManager"
            selectedValuePath="id">
        </entity-picker>
    </span> 
    `,

    data() { 
        return {
           selectedManagerId: -1,
           managers: null
        }
    },

    async created() {
        this.managers = await managerService.getAvailable();
    },

    methods: {
        displayManager: (manager) => `${manager.firstName} ${manager.lastName}`,
    },

    watch : {
        selectedManagerId: function() {
            this.$emit('input', this.selectedManagerId);
        }
    }
})