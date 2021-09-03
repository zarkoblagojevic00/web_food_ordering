export default Vue.component("multi-filter",{
    props: {
        filterBy: Object
    },

    data() { 
        return {
            filters: Object.keys(this.filterBy).map(this.createFilter),
        }
    },

    methods: {
        apply(items) {
            const applyFilters = item => this.filters.reduce((prev, curr) => prev && curr.canBePassedBy(item), true);
            return items.filter(applyFilters);
        },
        createFilter(field) {
            const initValues = this.getInitFilterValues();
            const filter = this.getFilter(field);
            return {...filter, ...initValues};
        },
        
        getInitFilterValues: () => console.warn('Mulit-Filter: Must implement getInitFilterValues'), 
        getFilter:(field) => console.warn(`Multi-Filter: Must implement getFilter for field: ${field}`), 
    }
})