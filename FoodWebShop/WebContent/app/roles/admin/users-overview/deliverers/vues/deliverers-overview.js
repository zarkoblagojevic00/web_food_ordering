import delivererService from "../deliverer-service-axios.js"
import deliverer from "./deliverer.js"
import finder from "../../../../../components/finder/finder.js"

export default Vue.component("deliverers-overview",{
    components: {
        deliverer,
        finder,
    },
    template: `
    <div id="deliverers-overview">
        <router-link :to="{name: 'add-user', params: {role: 'DELIVERER'}}">Add deliverer</router-link>
        <finder ref="finder"
            :items="deliverers"
            :sortBy="sortBy"
            :searchByTextFields="searchByTextFields"/>
        </finder>
        <deliverer 
            v-for="deliverer in found" 
            :key="deliverer.username"
            v-bind="deliverer"
            >
        </deliverer>
    </div> 
    `,
    data() { 
        return {
            deliverers: [],
            found: [],
            sortBy: {
                firstName: "First name",
                lastName: "Last name",
                username: "Username",
            },
            
            searchByTextFields: {
                firstName: "First name",
                lastName: "Last name",
                username: "Username"
            }
        }
    },

    async created() {
        this.deliverers = await delivererService.getOverview();
    },

    // referencing child's computed property as parents
    mounted() {
        this.$watch(() => this.$refs.finder.found, (value) => this.found = value);
    },
})
