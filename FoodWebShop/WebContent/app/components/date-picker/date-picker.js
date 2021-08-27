export default Vue.component("date-picker",{
    props: {
        value: Date
    },

    components: {
		vuejsDatepicker
	},

    template: `
    <div id="date-picker">
        <vuejs-datepicker
            :inline="true"
            v-model="date"
            @input="$emit('input', date)"
            > 
        </vuejs-datepicker>    
    </div> 
    `,
    data() { 
        return {
           date: null
        }
    },
})
