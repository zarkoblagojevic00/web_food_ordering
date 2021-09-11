import delivererService from "../../../../../services/deliverer-service.js"
import deliverer from "./deliverer.js"
import finder from "../../../../../components/finder/finder.js"

export default Vue.component("deliverers-overview",{
    components: {
        finder,
    },
    template: `
    <div id="deliverers-overview">
        <router-link class="btn btn-lg btn-success text-uppercase fixed-bottom-right" :to="{name: 'add-user', params: {role: 'DELIVERER'}}">Add deliverer</router-link>
        <finder ref="finder"
            :items="deliverers"
            :sortBy="sortBy"
            :searchByTextFields="searchByTextFields"
            :component="component"/>
        </finder>
    </div> 
    `,
    data() { 
        return {
            deliverers: [],
            component: deliverer,
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
})
