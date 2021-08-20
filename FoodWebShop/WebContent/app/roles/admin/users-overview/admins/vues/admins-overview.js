import adminService from "../admin-service-axios.js";
import admin from "./admin.js";
import finder from "../../../../../components/finder/finder.js";

export default Vue.component("admins-overview",{
    components: {
        admin,
        finder,
    },
    template: `
    <div id="admins-overview">
        <finder ref="finder"
            :items="admins"
            :sortBy="sortBy"
            :searchByTextFields="searchByTextFields"/>
        </finder>
        <admin 
            v-for="admin in found" 
            :key="admin.username"
            v-bind="admin"
            >
        </admin>
    </div> 
    `,
    data() { 
        return {
            admins: [],
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
        this.admins = await adminService.getOverview();
    },

    // referencing child's computed property as parents
    mounted() {
        this.$watch(() => this.$refs.finder.found, (value) => this.found = value);
    },
})
