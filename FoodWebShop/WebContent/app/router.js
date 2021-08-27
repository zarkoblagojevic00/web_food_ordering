import Home from './vues/home.js'
import Login from './auth/vues/login.js'
import SignUp from './auth/vues/signup.js'
import EditProfile from './roles/edit-profile.js'
import AdminRoot from './roles/admin/admin-root.js'
import AdminHome from './roles/admin/admin-home.js'
import UsersOverview from './roles/admin/users-overview/users-overview.js'
import CustomersOverview from './roles/admin/users-overview/customers/vues/customers-overview.js'
import ManagersOverview from './roles/admin/users-overview/managers/vues/managers-overview.js'
import DeliverersOverview from './roles/admin/users-overview/deliverers/vues/deliverers-overview.js'
import AdminsOverview from './roles/admin/users-overview/admins/vues/admins-overview.js'
import AddUser from './roles/admin/users-overview/add-user.js'
import AddRestaurant from './roles/admin/restaurants/add-restaurant.js'

const routes = [
    // {path: '/', component: Test},
    {path: '/',             name: 'home',       component: Home},
    {path: '/login',        name: 'login',      component: Login},
    {path: '/signup',       name: 'signup',     component: SignUp},
    {path: '/admin/:id',                        component: AdminRoot,
        children: [
            { path: '/',                name: 'admin-home',             component: AdminHome},
            { path: 'users',            name: 'users-overview',         component: UsersOverview,   
                children: [
                    { path: 'customers',        name: 'customers-overview',     component: CustomersOverview}, 
                    { path: 'managers',         name: 'managers-overview',      component: ManagersOverview}, 
                    { path: 'deliverers',       name: 'deliverers-overview',    component: DeliverersOverview}, 
                    { path: 'admins',           name: 'admins-overview',        component: AdminsOverview},
                    { path: 'add/:role',        name: 'add-user',               component: AddUser, props: true},
                    // TODO: Move to be child of restaurants
                    { path: 'add-restaurant',   name: 'add-restaurant',         component: AddRestaurant}   
                ]
            },
            // { path: 'restaurants',       name: 'restaurants',            component: RestaurantsOverview ,    
            //     children : [
            //         { path: 'add-restaurant',   name: 'add-restaurant',         component: AddRestaurant}   
            //     ]
            // }, 
            { path: 'profile',          name: 'admin-profile',          component: EditProfile} 
        ]
    },
]

export default new VueRouter({
	routes
});
