import restaurantService from "../../services/restaurant-service.js";

import restaurant from "./restaurant.js";
import finder from "../../components/finder/finder.js";

export default Vue.component("restaurants-overview",{
    components: {
        restaurant,
        finder
    },
    
    template: `
    <div :key="$route.path" id="restaurants-overview">
        <h4>Restaurants</h4>

        <router-link v-if="isAdmin" :to="{name: 'add-restaurant'}">Add restaurant</router-link>

        <finder v-if="restaurants"
            :items="restaurants"
            :sortBy="sortBy"
            :filterByOptions="filterByOptions"
            :searchByTextFields="searchByTextFields"
            :component="component"
            :componentProps="props">
        </finder>
    </div> 
    `,
    data() { 
        return {
           restaurants: [],
           component: restaurant,
           props: { name: 'restaurant'},
           sortBy: {
                name: 'Name',
                'location.municipality': 'City',
                averageMark: 'Average mark'
           },
           filterByOptions: {
                type : {
                    display: 'Restaurant type',
                    options: {
                        ITALIAN: 'Italian',
                        CHINESE: 'Chinese',
                        BBQ: 'Barbeque',
                        GREEK: 'Greek',
                        INDIAN: 'Indian'
                    },
                },
                averageMark: {
                    display: 'Average mark',
                    options: {
                        1: '1',
                        2: '2',
                        3: '3',
                        4: '4',
                        5: '5',
                    }
                },
                opened: {
                    display: 'Status',
                    options: {
                        true: 'Opened'
                    }
                }
            },
            searchByTextFields: {
                name: "Restaurant name",
                'location.municipality': "Location(city)",
            }
            
        }
    },

    computed: {
        isAdmin() {
            return location.href.includes("admin");
        }
    },

    async created() {
        const restaurants = await restaurantService.getAll();
        this.restaurants = restaurants.sort((x, y) => (x.opened === y.opened)? 0: x.opened? -1 : 1)
    },
})
