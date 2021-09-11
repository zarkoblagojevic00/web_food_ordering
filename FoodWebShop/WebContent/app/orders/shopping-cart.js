import cartService from "../services/cart-service.js"
import shoppingItem from "./shopping-item.js"

export default Vue.component("shopping-cart",{
    props:['id'],

    component: {
        'shopping-item': shoppingItem,
    },

    template: `
    <div v-if="cart" id="shopping-cart" class="shopping-cart">
        <h3>Shopping cart</h3>
        
        <h4> Total price: <span id="total-price">{{cart.totalPrice}}</span></h4>
        
        <shopping-item v-for="item in cart.items"
            :key="item.id"
            :item="item">
        </shopping-item>

        <button class="btn btn-lg btn-success" @click="finishShopping" v-if="cart.items[0]">Finish shopping</button>

    </div> 
    `,
    data() { 
        return {
           cart: null,
        }
    },

    created() {
        this.refreshCart();
    },

    mounted() {
        addEventListener('on-cart-changed', this.refreshCart);
    },
    
    methods: {
        async refreshCart() {
            this.cart = await cartService.getCartForCustomer();
        },

        async finishShopping() {
            await cartService.createOrder();
            this.$router.push({ name: 'customer-home', params: { id: this.id } });
        }
    }

})
