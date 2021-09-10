import { parseProperty } from "../../../property-parser.js";
import { load } from "../../../path-loader.js";

export default Vue.component("sorters",{
    props: {
        sortBy: Object, // object {fieldName: "displayName"} e.g {firstName: "First name"}
    },

    template: `
    <div id="sorters">
        <h5>Sort by:</h5>
        <button class="btn btn-md btn-primary"
            v-for="(value, key, index) in sortBy"
            :key="key"
            @click="activate(index)">
                {{value}} <img v-hide="!isActive(index)" :src="arrowImg(index)">
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

        arrowImg(index) {
            if (this.sorters[index].order === -1) {
                return load('img/icons/ascendant-arrow.png')
            } else {
                return load('img/icons/descendant-arrow.png')
            } 
        },

        isActive(index) {
            return this.activeSorterIndex === index;    
        }
    }
})
