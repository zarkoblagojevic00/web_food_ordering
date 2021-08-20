import Home from './vues/home.js'
import Login from './auth/vues/login.js'
import SignUp from './auth/vues/signup.js'
import HomeAdmin from './roles/admin/home-admin.js'
import CustomersOverview from './roles/admin/users-overview/customers/vues/customers-overview.js'
import ManagersOverview from './roles/admin/users-overview/managers/vues/managers-overview.js'
import DeliverersOverview from './roles/admin/users-overview/deliverers/vues/deliverers-overview.js'
import AdminsOverview from './roles/admin/users-overview/admins/vues/admins-overview.js'
import AddUser from './roles/admin/users-overview/add-user.js'

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
            { path: 'add/:role',    name: 'add-user',               component: AddUser, props: true},
            // { path: 'profile',   name: 'admin-profile',          component: AdminProfile} 
        ]
    },
]

export default new VueRouter({
	routes
});
