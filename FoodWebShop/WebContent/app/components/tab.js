export default Vue.component("tab",{
    template: `
    <div class="tab" v-show='isActive'>
        <slot></slot>
    </div> 
    `,

    props: {
        title: {
            type: String,
            default: 'Default Tab'
        }
    },

    data() { 
        return {
           isActive: true
        }
    },

    computed: {
        
    },

    methods: {
        
    }
})
