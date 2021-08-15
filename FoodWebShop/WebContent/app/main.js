import router from './router.js'
import NavBar from './vues/the-navbar.js'
import tab from './components/tab.js';
import tabbedPane from './components/tabbed-pane.js';

// Extract the function out, up here, so I'm not writing it twice
const update = (el, binding, vnode, oldVnode) => el.style.visibility = (binding.value) ? "hidden" : "";

/**
 * Hides an HTML element, keeping the space it would have used if it were visible (css: Visibility)
 */
Vue.directive("hide", {
    // Run on initialisation (first render) of the directive on the element
    bind: update,
    // Run on subsequent updates to the value supplied to the directive
    update: update
})

const app = new Vue({
    router,
    components : {
        'the-navbar': NavBar,
        'tab': tab,
        'tabbed-pane': tabbedPane
    }
}).$mount('#app');