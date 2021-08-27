import sorters from "./subfinders/sorters.js";
import filtersOption from "./subfinders/filters-option.js";
import searchTextFields from "./subfinders/search-text-fields.js";

export default Vue.component("finder",{
    props: {
        component: Function,   
        items: Array,   // items to sort
        sortBy: Object, 
        filterByOptions: Object,  
        searchByTextFields: Object,
    },

    components: {
        sorters,
        'filters-option': filtersOption,
        'search-text-fields': searchTextFields
    },

    template: `
    <div id="finder">
        <div v-if='sortBy'>
            <sorters :sortBy="sortBy" ref="sorter"></sorters>
        </div>
        <div v-if="filterByOptions">
            <filters-option :filterBy="filterByOptions" ref="filters-option"></filters-option>
        </div>
        <div v-if="searchByTextFields">
            <search-text-fields :filterBy="searchByTextFields" ref="search-text-fields"></search-text-fields>
        </div>


        <div id="display">
            <component :is="component"
                v-for="item in found"
                :key="item.id"
                v-bind="item"
                >
            </component>
        </div>
    </div> 
    `,

    computed: {
        found() {
            const itemsCopy = copyArray(this.items);
            return Object.values(this.$refs).reduce((prev, curr) => curr.apply(prev), itemsCopy);
        }
    },
})

const copyArray = (items) => items.slice(0); 
