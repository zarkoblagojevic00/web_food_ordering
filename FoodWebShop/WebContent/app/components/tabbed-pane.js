export default Vue.component("tabbed-pane",{
    template: `
    <div id="tabbed-pane">
        <div class="tabs__light">
            <ul class='tabs__header'>
              <li v-for='(tab, index) in tabs'
                :key='tab.title'
                @click='selectTab(index)'
                :class='{"tab__selected": (index == selectedIndex)}'>
                {{ tab.title }}
              </li>
            </ul>
            <slot></slot>
        </div>
    </div> 
    `,
    
    data () {
        return {
            selectedIndex: 0, // the index of the selected tab,
            tabs: []         // all of the tabs
        }
    },

    created () {
        this.tabs = this.$children
    },

    mounted () {
        this.selectTab(0)
    },
    
    methods: {
        selectTab (i) {
            this.selectedIndex = i;
            this.tabs.forEach((tab, index) => tab.isActive = (index === i));
        }
    }

})
