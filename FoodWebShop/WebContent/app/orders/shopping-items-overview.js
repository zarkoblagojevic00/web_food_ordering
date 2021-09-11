import shoppingItem from "./shopping-item.js"

export default Vue.component("shopping-items-overview",{
    props: {
        items: {
            type: Array,
            required: true
        },
        isReadonly: {
            type: Boolean,
            default: false,
        },
        totalPrice: {
            type: Number
        }
    },

    component: {
        'shopping-item': shoppingItem,
    },

    template: `
    <div id="shopping-items-overview">
        
        <h4> Total price: {{totalPrice}}</h4>
        
        <shopping-item v-for="item in items"
            :key="item.id"
            :item="item"
            :isReadonly="isReadonly">
        </shopping-item>

    </div> 
    `,
    data() { 
        return {
           
        }
    },

    computed: {
        
    },

    methods: {
        
    }
})
