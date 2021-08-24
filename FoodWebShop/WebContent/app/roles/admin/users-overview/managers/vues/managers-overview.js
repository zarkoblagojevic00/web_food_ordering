import managerService from "../../../../../services/manager-service.js"
import manager from "./manager.js"
import finder from "../../../../../components/finder/finder.js"

export default Vue.component("managers-overview",{
    components: {
        manager,
        finder,
    },
    template: `
    <div id="managers-overview">
        <router-link :to="{name: 'add-user', params: {role: 'MANAGER'}}">Add manager</router-link>
        <finder ref="finder"
            :items="managers"
            :sortBy="sortBy"
            :searchByTextFields="searchByTextFields"/>
        </finder>
        <manager 
            v-for="manager in found" 
            :key="manager.username"
            v-bind="manager"
            >
        </manager>
    </div> 
    `,
    data() { 
        return {
            managers: [],
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
        this.managers = await managerService.getOverview();
    },

    // referencing child's computed property as parents
    mounted() {
        this.$watch(() => this.$refs.finder.found, (value) => this.found = value);
    },
})
