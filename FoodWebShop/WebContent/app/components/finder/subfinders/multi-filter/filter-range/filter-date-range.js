import { minDate} from "../../../../../local-storage-util.js"
import filterRange from "./filter-range.js";

import datePicker from "../../../../date-picker/date-picker.js";

export default Vue.component("filter-date-range",{
    extends: filterRange,
    
    props: {
        filterBy: {
            type: Object,
            required: true,
        }
    },

    components: {
        'date-picker': datePicker
    },
    
    template: `
    <div id="filter-date-range">

        <div class="form-check-inline"
            v-for= "(value, key, index) in filterBy"
            :key="key">

            <label for="number-range">{{value}}: </label>
            <div>
                <label for="from">From: </label>
                <date-picker
                    v-model="filters[index].from"
                    :disabledDates="disabledDatesFrom(index)">
                </date-picker>
            </div>

            <div>
                <label for="to">To: </label>
                <date-picker
                    v-model="filters[index].to"
                    :disabledDates="disabledDatesTo(index)">
                </date-picker>
            </div>
        </div>
    </div> 
    `,
    
    methods: {
        getInitFilterValues:(field) => ({
            from: getPastDay(30),
            to: new Date()
        }),
        
        disabledDatesFrom(index) {
            const from = new Date(this.toMax(index));
            return {from}; 
        },

        disabledDatesTo(index) {
            const from = new Date();
            const to = new Date(this.fromMin(index));
            return {from, to};
        },

        toMax(index) {
            return Math.min(this.to(index), new Date());
        }
    }
})

const getPastDay = (num) => {
    let date = new Date();
    date.setDate(date.getDate() - num);
    return date;
} 

