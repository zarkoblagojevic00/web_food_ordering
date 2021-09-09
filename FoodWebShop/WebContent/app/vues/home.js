import { load } from "../path-loader.js"
import restaurantsOverview from "../restaurant/overview/restaurants-overview.js"

export default Vue.component("home",{
    components: {
        'restaurants-overview' : restaurantsOverview
    },

    template: `
    <div id="home">
        <div class="picture-container">
            <img class="background-img" :src="pictureSrc" alt="Pic">
        
            <div class="centered-over-picture">
                <h1 class="display-4">Welcome to FeastNow!</h1>
                <hr class="my-4">
                <p class="lead">Best food ordering app in the region. </p>
            </div>
        </div>

        <restaurants-overview></restaurants-overview>
    </div> 
    `,
    data() { 
        return {
            pictureSrc: load('img/pictures/home-background.jpg')
        }
    },

    computed: {
       
    },

    methods: {
        
    }
})
