import { parseProperty } from "../../../property-parser.js";

export default Vue.component("sorters",{
    props: {
        sortBy: Object, // object {fieldName: "displayName"} e.g {firstName: "First name"}
    },

    template: `
    <div id="sorters">
        <button 
            v-for="(value, key, index) in sortBy"
            :key="key"
            @click="activate(index)">
                {{value}} {{sorters[index].order}} {{(index === activeSorterIndex) ? 'w' : ''}}
        </button>
    </div> 
    `,
    data() { 
        return {
            sorters: Object.keys(this.sortBy).map(field => ({
                id: field, 
                order: -1,
                getSortFunction() {
                    return (a, b) => parseProperty(a, field) < parseProperty(b, field) ? this.order : -this.order
                }
            })),
            activeSorterIndex: -1
        }
    },

    methods: {
        activate(index) {
            if (this.activeSorterIndex !== index) {
                this.activeSorterIndex = index;
            } else {
                this.sorters[index].order *= -1;
            }
        },

        apply(items) {
            const activeSorter = this.sorters[this.activeSorterIndex];
            return (!activeSorter) ? items : items.sort(activeSorter.getSortFunction());
        },
    }
})
