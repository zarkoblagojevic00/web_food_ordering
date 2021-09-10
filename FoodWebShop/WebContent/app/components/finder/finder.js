import sorters from "./subfinders/sorters.js";
import filtersOption from "./subfinders/multi-filter/filter-text/filters-option.js";
import searchTextFields from "./subfinders/multi-filter/filter-text/search-text-fields.js";
import filterNumberRange from "./subfinders/multi-filter/filter-range/filter-number-range.js";
import filterDateRange from "./subfinders/multi-filter/filter-range/filter-date-range.js";

const copyArray = (items) => items.slice(0); 
const nullObjValidator = (prop) => typeof prop === 'object' || prop === null;

export default Vue.component("finder",{
    props: {
        component: [ Function, Object ],
        componentProps: Object,    // must contain key name bound to value of item prop e.g    {name: "order"}
        items: Array, 
        sortBy: Object, 
        filterByOptions: {
            type: Object,
            validator: nullObjValidator
        },  
        searchByTextFields: {
            type: Object,
            validator: nullObjValidator
        },
        filterByNumberRange: {
            type: Object,
            validator: nullObjValidator
        },
        filterByDateRange: {
            type: Object,
            validator: nullObjValidator
        },
    },

    components: {
        sorters,
        'filters-option': filtersOption,
        'search-text-fields': searchTextFields,
        'filter-number-range': filterNumberRange,
        'filter-date-range': filterDateRange,
    },

    template: `
    <div id="finder">
        
        <div id="subfinders" class="item">
            <div v-if='sortBy'>
                <sorters :sortBy="sortBy" ref="sorter"></sorters>
                <hr>
            </div>

            <div v-if="filterByOptions">
                <filters-option :filterBy="filterByOptions" ref="filters-option"></filters-option>
                <hr>    
            </div>

            <div v-if="searchByTextFields">
                <search-text-fields :filterBy="searchByTextFields" ref="search-text-fields"></search-text-fields>
                <hr>
            </div>

            <div v-if="filterByNumberRange">
                <filter-number-range :filterBy="filterByNumberRange" ref="filter-number-range"></filter-number-range>
                <hr>
            </div>

            <div v-if="filterByDateRange">
                <filter-date-range :filterBy="filterByDateRange" ref="filter-date-range"></filter-date-range>
                <hr>
            </div>

        </div>

        <div id="display">
            <component :is="component"
                v-for="item in found"
                :key="item.id"
                v-bind="getProps(item)"
                >
            </component>
        </div>
    </div> 
    `,

    computed: {
        found() {
            const itemsCopy = copyArray(this.items);
            return Object.values(this.$refs).reduce((prev, curr) => curr.apply(prev), itemsCopy);
        },
        
    },

    methods: {
        getProps(item) {
            return (!this.componentProps) ? item : this.createProps(item)  
        },
        createProps(item) {
            const { name: propItemKey, ...retVal} = this.componentProps;
            retVal[propItemKey] = item;
            return retVal; 
        }
    }
})

