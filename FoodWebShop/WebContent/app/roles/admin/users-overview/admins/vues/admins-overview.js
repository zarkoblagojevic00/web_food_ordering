import adminService from "../../../../../services/admin-service.js";
import admin from "./admin.js";
import finder from "../../../../../components/finder/finder.js";

export default Vue.component("admins-overview",{
    components: {
        finder,
    },
    template: `
    <div id="admins-overview">
        <finder ref="finder"
            :items="admins"
            :sortBy="sortBy"
            :searchByTextFields="searchByTextFields"
            :component="component"/>
        </finder>
    </div> 
    `,
    data() { 
        return {
            admins: [],
            component: admin,
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
})
