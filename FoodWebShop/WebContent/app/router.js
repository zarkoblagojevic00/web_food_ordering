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
import RestaurantsOverview from './roles/admin/restaurants/restaurants-overview.js'
import AddRestaurant from './roles/admin/restaurants/add-restaurant.js'
import ManagerRoot from './roles/manager/manager-root.js'
import ManagerHome from './roles/manager/manager-home.js'
import RestaurantRoot from './restaurant/restaurant-root.js'
import ProductsOverview from './restaurant/products/products-overview.js'
import RestaurantInfo from './restaurant/restaurant-info.js'
import RestaurantComments from './restaurant/restaurant-comments.js'
import AddProduct from './restaurant/products/add-product.js'

const restaurantRoutes = {
    path: 'restaurants/:restaurantId', component: RestaurantRoot, props: true,
        children: [
            {path: '/',         name: 'restaurant-root',        redirect: 'products',           props: true},
            {path: 'products',  name: 'restaurant-products',    component: ProductsOverview,    props: true},
            {path: 'info',      name: 'restaurant-info',        component: RestaurantInfo,      props: true},
            {path: 'comments',  name: 'restaurant-comments',    component: RestaurantComments,  props: true},
        ],
}


const routes = [
    // {path: '/', component: Test},
    {path: '/',             name: 'home',       component: Home},
    {path: '/login',        name: 'login',      component: Login},
    {path: '/signup',       name: 'signup',     component: SignUp},
    
    {path: '/admin/:id', component: AdminRoot,
        children: [
            { path: '/', name: 'admin-home',  component: AdminHome},
            { path: 'users', component: UsersOverview,   
                children: [
                    { path: '/',                name: 'users-home',             redirect: 'customers'},
                    { path: 'customers',        name: 'customers-overview',     component: CustomersOverview}, 
                    { path: 'managers',         name: 'managers-overview',      component: ManagersOverview}, 
                    { path: 'deliverers',       name: 'deliverers-overview',    component: DeliverersOverview}, 
                    { path: 'admins',           name: 'admins-overview',        component: AdminsOverview},
                    { path: 'add/:role',        name: 'add-user',               component: AddUser, props: true},
                ]
            },
            { path: 'restaurants',  component: RestaurantsOverview,   
                children : [
                    { path: '/',                name: 'restaurants-home',       redirect: 'add-restaurant'},
                    { path: 'add-restaurant',   name: 'add-restaurant',         component: AddRestaurant}   
                ]
            }, 
            { path: 'profile',          name: 'admin-profile',          component: EditProfile} 
        ]
    },

    {path: '/manager/:id', component: ManagerRoot, props: true, 
        children: [
            {path: '/', name: 'manager-home', component: ManagerHome, props: true},
            restaurantRoutes,
            {path: 'restaurant/:restaurantId/add-product', name: 'add-product', component: AddProduct, props: true},
        ] 
    }

]




export default new VueRouter({
	routes
});
