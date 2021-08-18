export default Vue.component("finder",{
    props: {
        items: Array,   // items to sort
        sortBy: Object, // object {fieldName: "displayName"} e.g {firstName: "First name"}
        filterBy: Object // object {fieldName: options Obj} e.g {status: {"BRONZE": "Bronze", "SILVER":"Silver"}}  
    },

    template: `
    <div id="finder">
        <button 
            v-for="(value, key, index) in sortBy"
            :key="key"
            @click="sort(key)">
                {{value}} {{sorters[index].order}} {{sorters[index].enabled ? 'w' : ''}}
        </button>
        <div 
            v-for="(value, key, index) in filterBy"
            :key="key">
            <label>{{value.display}}: </label>
            <span>
                <select v-model="filters[index].option">
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
    data() { 
        return {
           sorters: Object.keys(this.sortBy).map(field => ({id: field, enabled: false, order: -1})),
           filters: Object.keys(this.filterBy).map(field => ({id: field, option: ""}))
        }
    },


    computed: {
        found() {
            let found = this.items.slice(0); //make a copy
            const enabledSorter = this.sorters.find(sorter => sorter.enabled);

            if (enabledSorter) {
                found.sort(sortWith(enabledSorter));
            }
            
            found = found.filter(this.$finder_applyFilters)
            
            return found;
        },
    },

    methods: {
        sort(id) {
            const sorter = this.sorters.find(sorter => sorter.id === id);
            if (!sorter.enabled) {
                sorter.enabled = true;
                this.$finder_disableAllBut(sorter);
                return;
            }
            sorter.order *= -1;
        },

        $finder_disableAllBut(sorter) {
            this.sorters
                .filter(s => s.id !== sorter.id)
                .forEach(s => s.enabled = false);
        },

        $finder_applyFilters(item) {
            return this.filters.reduce((prev, curr) => prev && item[curr.id].includes([curr.option]), true )
        },
    },
})

const sortWith = sorter => (a, b) => a[sorter.id] < b[sorter.id] ? sorter.order : -sorter.order  
