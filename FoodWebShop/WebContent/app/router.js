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
import AdminRestaurantsOverview from './roles/admin/restaurants/restaurants-overview.js'
import AddRestaurant from './restaurant/info/add-restaurant.js'
import ManagerRoot from './roles/manager/manager-root.js'
import ManagerHome from './roles/manager/manager-home.js'
import RestaurantRoot from './restaurant/restaurant-root.js'
import ProductsOverview from './restaurant/products/products-overview.js'
import RestaurantInfo from './restaurant/info/restaurant-info.js'
import CommentsOverview from './restaurant/comments/comments-overview.js'
import AddProduct from './restaurant/products/add-product.js'
import EditProduct from './restaurant/products/edit-product.js'
import OrdersOverview from './orders/orders-overview.js'
import OrderDetails from './orders/order-details.js'
import DelivererRoot from './roles/deliverer/deliverer-root.js'
import DelivererHome from './roles/deliverer/deliverer-home.js'
import RestaurantsOverview from './restaurant/overview/restaurants-overview.js'
import CustomerRoot from './roles/customer/customer-root.js'
import ShoppingCart from './orders/shopping-cart.js'
import AddComment from './restaurant/comments/add-comment.js'
import managerHome from './roles/manager/manager-home.js'

const restaurantOverviewRoutes = {
    path: `restaurants/:restaurantId`, component: RestaurantRoot, props: true,
        children: [
            {path: '/',                        redirect: 'products',           props: true},
            {path: 'products',                 component: ProductsOverview,    props: true},
            {path: 'info',                     component: RestaurantInfo,      props: true},
            {path: 'comments',                 component: CommentsOverview,    props: true},
            
        ],
};

const routes = [
    {path: '/', component: Home, 
        children: [
            {path: '/', name: 'home', component: RestaurantsOverview},
            restaurantOverviewRoutes,
        ]
    },
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
            { path: 'restaurants',      name: 'restaurants-home',   component: RestaurantsOverview},
            restaurantOverviewRoutes,
            { path: 'add-restaurant',   name: 'add-restaurant',     component: AddRestaurant},   
            { path: 'profile',          name: 'admin-profile',      component: EditProfile} 
        ]
    },

    {path: '/manager/:id', component: ManagerRoot, props: true, 
        children: [
            {path: '/',             name: 'manager-home',           component: ManagerHome,                props: true},
            {path: 'profile',       name: 'manager-profile',        component: EditProfile},
            {path: 'restaurant',    name: 'restaurant-root',        redirect: 'restaurants/:restaurantId', props: true},
            restaurantOverviewRoutes,
            {path: 'restaurants/:restaurantId/add-product',              component: AddProduct,          props: true},
            {path: 'restaurants/:restaurantId/edit-product/:productId',  component: EditProduct,         props: true},
            {path: 'restaurants/:restaurantId/orders',                   name: 'restaurant-orders-overview',    component: OrdersOverview,       props: true},
            {path: 'restaurants/:restaurantId/orders/:orderId',          name: 'restaurant-order-details',      component: OrderDetails,         props: true},
            {path: 'restaurants/:restaurantId/customers',                name: 'restaurant-customers',          component: CustomersOverview,    props: true}
        ] 
    },

    {path: '/deliverer/:id', component: DelivererRoot, props: true,
        children: [
            {path: '/',                         name: 'deliverer-home',      component: DelivererHome,     props: true},
            {path: 'profile',                   name: 'deliverer-profile',   component: EditProfile},
            {path: 'orders/:type',              name: 'deliverer-orders',    component: OrdersOverview,    props: true},
            {path: 'orders/:type/:orderId',     name: 'order-details',       component: OrderDetails,      props: true},   
        ]
    },

    {path: '/customer/:id', component: CustomerRoot, props: true,
        children: [
            {path: '/',                         name: 'customer-home',              component: RestaurantsOverview,     props: true},
            {path: 'profile',                   name: 'customer-profile',           component: EditProfile},
            restaurantOverviewRoutes,
            {path: 'cart',                      name: 'customer-cart',              component: ShoppingCart,      props: true},  
            {path: 'orders/mine',               name: 'customer-orders',            component: OrdersOverview,    props: true},
            {path: 'orders/mine/:orderId',      name: 'customer-order-details',     component: OrderDetails,      props: true},
            {path: 'comments/:restaurantId',    name: 'add-comment',                component: AddComment,        props: true},   
        ]
    },

]

export default new VueRouter({
	routes
});
