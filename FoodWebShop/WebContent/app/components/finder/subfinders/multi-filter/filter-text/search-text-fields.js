import filterText from "./filter-text.js"

export default Vue.component("search-text-fields",{
    extends: filterText,
    template: `
    <div id="search-text-fields">
       <div v-for="(value, key, index) in filterBy"
            :key="key">
            <label for="key">{{value}}: </label>
            <input 
                v-model=filters[index].value
                type="search" 
                :name="key" 
                :id="key">
       </div>
    </div> 
    `,
})
