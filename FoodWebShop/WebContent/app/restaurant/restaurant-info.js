export default Vue.component("restaurant-info",{
    props: ['restaurantId'],

    template: `
    <div id="restaurant-info">
        <h2>Info {{restaurantId}}</h2>
    </div> 
    `,
    data() { 
        return {
           
        }
    },

    computed: {
        
    },

    methods: {
        
    }
})
