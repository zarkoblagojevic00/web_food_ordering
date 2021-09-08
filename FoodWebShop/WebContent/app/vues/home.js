import { load } from "../path-loader.js"

export default Vue.component("home",{
    template: `
    <div id="home">
        <div class="picture-container">
            <img id="picture":src="pictureSrc" alt="Pic">
        
            <div id="text-over-picture">
                <h1 class="display-4">Welcome to FeastNow!</h1>
                <hr class="my-4">
                <p class="lead">Best online food ordering app in the region. </p>
            </div>
        </div>
        <router-view class="container"></router-view>
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
