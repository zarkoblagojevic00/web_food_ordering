import { parseProperty } from "../../../../../property-parser.js";
import multiFilter from "../base/multi-filter.js";

export default Vue.component("filter-range",{
    extends: multiFilter,

    methods: {
        to(index) {return this.filters[index].to},
        from(index) {return this.filters[index].from},
        fromMin(index) {
            const currFrom = this.from(index); 
            const {from: baseFrom} = this.getInitFilterValues();
            return (currFrom) ? Math.max(currFrom, baseFrom) : baseFrom; 
        },

        getFilter(field) {
            return {
                id: field,
                canBePassedBy(item) {
                    const value = parseProperty(item, field);
                    return this.from <= value && value <= this.to;   
                }
            }
        }
    }
})
