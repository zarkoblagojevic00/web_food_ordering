import sorters from "./subfinders/sorters.js";
import filtersOption from "./subfinders/filters-option.js";
import searchTextFields from "./subfinders/search-text-fields.js";

export default Vue.component("finder",{
    props: {
        items: Array,   // items to sort
        sortBy: Object, 
        filterByOptions: Object,  
        searchByTextFields: Object
    },

    components: {
        sorters,
        'filters-option': filtersOption,
        'search-text-fields': searchTextFields
    },

    template: `
    <div id="finder">
        <div v-if='sortBy'>
            <sorters :sortBy="sortBy"></sorters>
        </div>
        <div v-if="filterByOptions">
            <filters-option :filterBy="filterByOptions"></filters-option>
        </div>
        <div v-if="searchByTextFields">
            <search-text-fields :filterBy="searchByTextFields"></search-text-fields>
        </div>
    </div> 
    `,

    computed: {
        found() {
            const itemsCopy = this.items.slice(0);
            return this.$children.reduce((prev, curr) => curr.apply(prev), itemsCopy);
        }
    },
})
