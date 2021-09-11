import imageService from "../../services/image-service.js"

import createObjectUrlMixin from "../../mixins/create-object-url-mixin.js"
import authMixin from "../../mixins/auth-mixin.js";
import cartService from "../../services/cart-service.js";

import numInputRange from "../../components/num-input-range/num-input-range.js";

export default Vue.component("product",{
    mixins: [createObjectUrlMixin, authMixin],
    props :{
        product: Object,
        restaurantId: String,
    },

    components: {
        'num-input-range': numInputRange,
    },

    template: `
    <div id="product" class="image-info-container item">

        <div class="image-left-side-container">
            <img class="image-left-side" :src="objectsSource['picture']"></img>
        </div>

        <div class="info-right-side">
            
            <div>
                <h4>{{product.name}}</h4>
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
                <span>{{product.portion}} {{unit}}</span>
            </div>
            
            <div v-if="product.description">
                <label for="description">Description: </label>
                <div>{{product.description}}</div>
            </div>

            <hr>

            <span v-if="canAddToCart"  class="center-inline-flex ">
                <label for="quantity">Quantity:</label>
                <num-input-range 
                    v-model="quantity"
                    :min="1">
                </num-input-range>
                <button class="btn btn-md btn-primary"@click="addToCart">Add to cart</button>
            </span>
            <router-link 
                class="btn btn-lg btn-primary" 
                v-if="isManager && managersRest" 
                :to="editProductRoute">Edit product</router-link>
        </div>

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
        },
        unit() {
            return (this.product.type === "FOOD") ? 'g' : 'ml';
        },
        managersRest() {
            return location.href.includes("manager");
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
