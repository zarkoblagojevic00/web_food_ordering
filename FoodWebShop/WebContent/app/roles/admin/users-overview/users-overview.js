export default Vue.component("users-overview",{
    template: `
    <div id="users-overview">
        <div>
            <ul class='list-inline'>
                <router-link tag="li" class="list-inline-item restaurant-tab" :to="{name: 'customers-overview'}">Customers</router-link>
                <router-link tag="li" class="list-inline-item restaurant-tab" :to="{name: 'managers-overview'}">Managers</router-link>
                <router-link tag="li" class="list-inline-item restaurant-tab" :to="{name: 'deliverers-overview'}">Deliverers</router-link>
                <router-link tag="li" class="list-inline-item restaurant-tab" :to="{name: 'admins-overview'}">Admins</router-link>
            </ul>
        </div>

        <router-view></router-view>
    </div> 
    `,
})
