import Test from './vues/test.js'
import Home from './vues/home.js'
import Login from './auth/vues/login.js'
import SignUp from './auth/vues/signup.js'

const routes = [
    // {path: '/', component: Test},
    {path: '/', name: 'home', component: Home},
    {path: '/login', name: 'login', component: Login},
    {path: '/signup', name: 'signup', component: SignUp}
]

export default new VueRouter({
	routes
});
