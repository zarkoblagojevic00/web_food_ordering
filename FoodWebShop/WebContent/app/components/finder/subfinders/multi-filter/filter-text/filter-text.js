import { parseProperty } from "../../../../../property-parser.js";
import multiFilter from "../base/multi-filter.js";

export default Vue.component("filter-text",{
    extends: multiFilter,
    methods: {
        getFilter: (field) => ({
            id: field, 
            canBePassedBy(item) {
                const itemValue = parseProperty(item, field);
                if (typeof itemValue == 'string')
                    return stringFilter(itemValue, this.value);
                if (typeof itemValue == 'number')
                    return numberFilter(itemValue, parseInt(this.value));
                if (typeof itemValue == 'boolean') 
                    return stringFilter(itemValue.toString(), this.value);
            }
        }),
        getInitFilterValues: (field) => ({value: ""}),
    }
})


const stringFilter = (itemValue, filterValue) => itemValue.toLowerCase().includes(filterValue.toLowerCase());
const numberFilter = (itemValue, filterValue) => (!filterValue) || (filterValue - 0.5 <= itemValue && itemValue <= filterValue + 0.5); 