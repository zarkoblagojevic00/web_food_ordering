export default Vue.component("the-navbar",{
    template: `
    <div id="the-navbar" style="border-bottom: 3px  solid blueviolet;">
        <h2 >FeastNow.io</h2>
        <ul>
            <li><router-link :to="{ name: 'home'}" exact>Home</router-link></li>
            <li><router-link :to="{ name: 'login'}" exact>Login</router-link></li>
            <li><router-link :to="{ name: 'signup'}" exact>Sign up</router-link></li>
        </ul>
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
