export default Vue.component("deliverer-root",{
    template: `
    <div id="deliverer-root">
        <router-view :key="$route.path"></router-view>
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
