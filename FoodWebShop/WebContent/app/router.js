import Home from './vues/home.js'
import Login from './auth/vues/login.js'
import SignUp from './auth/vues/signup.js'
import HomeAdmin from './roles/admin/home-admin.js'
import CustomersOverview from './roles/admin/customers/vues/customers-overview.js'
import ManagersOverview from './roles/admin/managers/vues/managers-overview.js'
import DeliverersOverview from './roles/admin/deliverers/vues/deliverers-overview.js'
import AdminsOverview from './roles/admin/admins/vues/admins-overview.js'

const routes = [
    // {path: '/', component: Test},
    {path: '/',             name: 'home',       component: Home},
    {path: '/login',        name: 'login',      component: Login},
    {path: '/signup',       name: 'signup',     component: SignUp},
    {path: '/admin/:id',    name: 'ADMIN',      component: HomeAdmin,
        children: [
            { path: 'customers',    name: 'customers-overview',     component: CustomersOverview}, 
            { path: 'managers',     name: 'managers-overview',      component: ManagersOverview}, 
            { path: 'deliverers',   name: 'deliverers-overview',    component: DeliverersOverview}, 
            { path: 'admins',       name: 'admins-overview',        component: AdminsOverview},
            // { path: 'profile',   name: 'admin-profile',          component: AdminProfile} 
        ]
    },
]

export default new VueRouter({
	routes
});
