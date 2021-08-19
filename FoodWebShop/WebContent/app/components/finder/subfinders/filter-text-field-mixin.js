export default {
    props: {
        filterBy: Object
    },

    data() { 
        return {
            filters: Object.keys(this.filterBy).map(field => ({
                id: field, 
                value: "",
                canBePassedBy(item) {
                    return item[field].toLowerCase().includes(this.value.toLowerCase());
                }
            })),
        }
    },

    methods: {
        apply(items) {
            const applyFilters = item => this.filters.reduce((prev, curr) => prev && curr.canBePassedBy(item), true);
            return items.filter(applyFilters);
        }
    }
}