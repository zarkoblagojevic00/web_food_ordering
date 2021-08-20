import customerService from "../customer-service-axios.js"
import customer from "./customer.js"
import finder from "../../../../../components/finder/finder.js";

export default Vue.component("customers-overview",{
    components: {
        customer,
        finder,
    },
    template: `
    <div id="customers-overview">
        <finder ref="finder"
            :items="customers"
            :sortBy="sortBy"
            :filterByOptions="filterByOptions"
            :searchByTextFields="searchByTextFields"/>
        </finder>
        <customer 
            v-for="customer in found" 
            :key="customer.username"
            v-bind="customer"
            >
        </customer> 
    </div> 
    `,
    data() { 
        return {
            customers: [],
            found: [],
            sortBy: {
                firstName: "First name",
                lastName: "Last name",
                username: "Username",
                pointsEarned: "Points earned"
            },
            filterByOptions: {
                type: {
                    display: 'Type',
                    options: {
                        BRONZE: 'Bronze',
                        SILVER: 'Silver',
                        GOLD: 'Gold'
                    }
                },
                activityStatus: {
                    display: 'Activity status',
                    options: {
                        OK: 'Ok',
                        SUSPICIOUS: 'Suspicious',
                        BANNED: 'Banned'
                    }
                }
            },
            searchByTextFields: {
                firstName: "First name",
                lastName: "Last name",
                username: "Username"
            }
        }
    },

    async created() {
        this.customers = await customerService.getOverview();
    },

    // referencing child's computed property as parents
    mounted() {
        this.$watch(() => this.$refs.finder.found, (value) => this.found = value);
    },

    
})
