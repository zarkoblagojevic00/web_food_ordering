export default Vue.component("home-admin",{
    template: `
    <div id="home-admin">
        <div class="tabs">
            <ul class='tabs__header'>
            <li><router-link :to="{name: 'customers-overview'}">Customers</router-link></li>
            <li><router-link :to="{name: 'managers-overview'}">Managers</router-link></li>
            <li><router-link :to="{name: 'deliverers-overview'}">Deliverers</router-link></li>
            <li><router-link :to="{name: 'admins-overview'}">Admins</router-link></li>
            <li><router-link :to="{name: 'add-restaurant'}">Add restaurant</router-link></li>

            <!-- <li><router-link :to="profile">Profile</router-link></li> -->
            </ul>
        </div>
        <router-view></router-view>
    </div> 
    `,
    data() { 
        return {
        }
    },

    

    methods: {
        
    }
})


