export default Vue.component("entity-picker",{
    props: {
        value: {
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
        display: {
            type: Function,
            default: (option) => option
        },
        selectedValuePath: {    // field whos value should be returned as value, if omitted whole object is the value
            type: String,
            default: ''
        },
        isReadonly: {
            type: Boolean,
            default: false
        }
    },

    template: `
    <span id="entity-picker">
        <select class="form-control"
            v-if="!isReadonly" 
            v-model="selectedOption">
            <option 
                v-for="option in options" 
                :key="toValue(option)"
                :value="toValue(option)">
                {{display(option)}}
            </option> 
        </select>
        <input v-else class="form-control"
            :value="display(selectedOption)"
            readonly>
    </span> 
    `,

    data() { 
        return {
            selectedOption: this.value || this.toValue(this.options[0]) 
        }
    },

    methods: {
        toValue(option) {
            if (!option) return;
            return option[this.selectedValuePath] || option;
        },
    },

    watch: {
        selectedOption: {
            handler() {
                this.$emit('input', this.selectedOption);
            },
            immediate: true,
        },
    }
})
