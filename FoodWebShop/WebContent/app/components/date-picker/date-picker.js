import { minDate, maxDate } from "../../local-storage-util.js";

export default Vue.component("date-picker",{
    props: {
        value: [Date, Number],
        disabledDates: Object
    },

    components: {
		vuejsDatepicker
	},

    template: `
    <span id="date-picker">
        <vuejs-datepicker
            placeholder="Select date"
            :disabledDates="disabledDates"
            v-model="date"
            @input="$emit('input', date)"
            > 
        </vuejs-datepicker>    
    </span> 
    `,
    
    data() { 
        return {
           date: null
        }
    },

    watch: {
        value: {
            handler() {
                this.date = (typeof this.value === 'number') ? new Date(this.value) : this.value;
            },
            immediate: true
        }
    }
})