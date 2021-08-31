export default Vue.component("restaurant-comments",{
    props: ['restaurantId'],
    template: `
    <div id="restaurant-comments">
        <h2>Comments {{restaurantId}}</h2>
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
