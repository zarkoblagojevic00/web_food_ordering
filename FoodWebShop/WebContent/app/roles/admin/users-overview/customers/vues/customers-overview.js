import customerService from "../../../../../services/customer-service.js";
import finder from "../../../../../components/finder/finder.js";
import customer from "./customer.js"

export default Vue.component("customers-overview",{
    components: {
        finder,
    },
    template: `
    <div id="customers-overview">
        <finder ref="finder"
            :items="customers"
            :sortBy="sortBy"
            :filterByOptions="filterByOptions"
            :searchByTextFields="searchByTextFields"
            :component="component"/>
        </finder>
    </div> 
    `,
    data() { 
        return {
            customers: [],
            component: customer,
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
})
