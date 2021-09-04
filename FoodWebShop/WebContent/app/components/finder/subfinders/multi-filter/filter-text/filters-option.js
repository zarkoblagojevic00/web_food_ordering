import filterText from "./filter-text.js"

export default Vue.component("filters-option",{
    extends: filterText,
    template: `
    <div id="filters-option">
        <div 
            v-for="(value, key, index) in filterBy"
            :key="key">
            <label>{{value.display}}: </label>
            <span>
                <select v-model="filters[index].value">
                    <option 
                        v-for="(opt_value, opt_key) in value.options"
                        :key="opt_key"
                        :value="opt_key">
                        {{opt_value}}
                    </option>
                    <option value="">All</option>
                </select>
            </span>
        </div> 
    </div> 
    `,
    methods: {
        getInitFilterValues(field) {
            return  {value: this.filterBy[field].init || ""}
        },
    }
})
