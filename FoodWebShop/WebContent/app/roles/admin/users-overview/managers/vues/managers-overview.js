import managerService from "../../../../../services/manager-service.js"
import manager from "./manager.js"
import finder from "../../../../../components/finder/finder.js"

export default Vue.component("managers-overview",{
    components: {
        finder,
    },

    template: `
    <div id="managers-overview">
        <router-link class="btn btn-lg btn-success text-uppercase fixed-bottom-right" :to="{name: 'add-user', params: {role: 'MANAGER'}}">Add manager</router-link>
        <finder
            :items="managers"
            :sortBy="sortBy"
            :searchByTextFields="searchByTextFields"
            :component="component">
        </finder>
    </div> 
    `,

    data() { 
        return {
            managers: [],
            component: manager,
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
})
