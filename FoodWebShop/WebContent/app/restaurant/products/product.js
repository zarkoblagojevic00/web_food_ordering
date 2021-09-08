import imageService from "../../services/image-service.js"

import createObjectUrlMixin from "../../mixins/create-object-url-mixin.js"
import authMixin from "../../mixins/auth-mixin.js";
import numInputRange from "../../components/num-input-range/num-input-range.js";
import cartService from "../../services/cart-service.js";

export default Vue.component("product",{
    mixins: [createObjectUrlMixin, authMixin],
    props :{
        product: Object,
        restaurantId: String,
    },

    components: {
        'num-input-range': numInputRange
    },

    template: `
    <div id="product" style="border: 1px solid black;">
        <router-link v-if="isManager" :to="editProductRoute">Edit product</router-link>
        <div>
            <label for="name">Name: </label>
            <span>{{product.name}}</span>
        </div>
        
        <div>
            <label for="price">Price: </label>
            <span>{{product.price}}</span>
        </div>

        <div>
            <label for="productType">Type: </label>
            <span>{{product.type}}</span>
        </div>
        
        <div>
            <label for="portion">Portion: </label>
            <span>{{product.portion}}</span>
        </div>
        
        <div>
            <label for="description">Description: </label>
            <span>{{product.description}}</span>
        </div>

        <div>
            <img :src="objectsSource['picture']"></img>
        </div>

        <span v-if="canAddToCart">
            <label for="quantity">Quantity:</label>
            <num-input-range
                v-model="quantity"
                :min="1">
            </num-input-range>
            <button @click="addToCart">Add to cart</button>
        </span>

    </div> 
    `,
    data() { 
        return {
           objects: {
               picture: null
           },
           editProductRoute: `edit-product/${this.product.id}`,
           quantity: 1,
        }
    },

    computed: {
        canAddToCart() {
            return this.isCustomer && this.product.restaurant.opened
        }
    },

    async created() {
        this.objects.picture = await imageService.getImage(this.product.picturePath);
    },

    methods: {
        async addToCart() {
            await cartService.addToCart(this.product.id, this.quantity);
        }
    }
})
