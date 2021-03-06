import filterRange from "./filter-range.js";

import numInputRange from "../../../../num-input-range/num-input-range.js";

export default Vue.component("filter-number-range",{
    extends: filterRange,
    
    props: {
        filterBy: {
            type: Object,
            required: true,
        }
    },

    component: {
        'num-input-range': numInputRange,
    },

    template: `
    <div id="filter-number-range">
        <h5>Filter by range: </h5>
        <div class="form-check-inline"
            v-for="(value, key, index) in filterBy"
            :key="key">
            
            <label for="number-range">{{value}}: </label>
            
            <div>
                <label for="from">From: </label>
                <num-input-range 
                    v-model="filters[index].from"
                    :min="fromMin(index)"
                    :max="to(index)">
                </num-input-range>
                
            </div>
            
            <div>
                <label for="to">To: </label>
                <num-input-range
                    v-model="filters[index].to"
                    :min="from(index)">

                </num-input-range>
            </div>
        </div>
    </div>`,

    methods: {
        getInitFilterValues:(field) => ({
            from: 0,
            to: Number.POSITIVE_INFINITY
        }),
    }

})



