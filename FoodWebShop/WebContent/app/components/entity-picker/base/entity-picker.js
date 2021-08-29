export default Vue.component("entity-picker",{
    props: {
        value: {
            type: [String, Number, Object],
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
    },

    template: `
    <span id="entity-picker">
        <select v-model="selectedOption">
            <option 
                v-for="option in options" 
                :key="toValue(option)"
                :value="toValue(option)">
                {{display(option)}}
            </option> 
        </select>
    </span> 
    `,

    data() { 
        return {
            selectedOption: this.toValue(this.options[0]) || this.value 
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