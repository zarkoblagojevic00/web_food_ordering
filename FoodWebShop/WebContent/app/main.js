import router from './router.js'
import NavBar from './vues/the-navbar.js'

const app = new Vue({
    router,
    components : {
        'the-navbar': NavBar
    }
}).$mount('#app');