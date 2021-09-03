import { parseProperty } from "../../../../../property-parser.js";
import multiFilter from "../base/multi-filter.js";

export default Vue.component("filter-text",{
    extends: multiFilter,
    methods: {
        getFilter: (field) => ({
            id: field, 
            canBePassedBy(item) {
                return parseProperty(item, field).toLowerCase().includes(this.value.toLowerCase());
            }
        }),
        getInitFilterValues: () => ({value: ""}),
    }
})
