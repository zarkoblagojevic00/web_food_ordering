import createObjectUrlMixin from "../mixins/create-object-url-mixin.js";
import imageService from "../services/image-service.js";
import cartService from "../services/cart-service.js";
import authMixin from "../mixins/auth-mixin.js";

export default Vue.component("shopping-item",{
    mixins: [createObjectUrlMixin, authMixin],

    props: {
        item: {
            type: Object,
            required: true
        },
        isReadonly: {
            type: Boolean,
            default: false,
        }
    },

    template: `
    <div id="shopping-item" style="border: 1px solid black;">
        <div>
            <label for="name">Name: </label>
            <span>{{item.product.name}}</span>
        </div>
        
        <div>
            <label for="price">Price: </label>
            <span>{{item.product.price}}</span>
        </div>

        <div>
            <label for="portion">Portion: </label>
            <span>{{item.product.portion}}</span>
            <span>{{item.product.type == 'FOOD'? 'g' : 'ml'}}</span>
        </div>

        <div>
            <label for="quantity">Quantity: </label>
            <span v-if="isReadonly">{{item.quantity}}</span>
            <num-input-range v-else
                v-model="quantity"
                :min="1">
            </num-input-range>
        </div>

        <button v-if="isCustomer && !isReadonly" @click="removeItem">Remove from cart</button>
        <div>
            <img :src="objectsSource['picture']"></img>
        </div>
    </div> 
    `,
    data() { 
        return {
            objects: {
               picture: null
            },
            quantity: this.item.quantity
        }
    },

    watch: {
        async quantity() {
            await cartService.editCart(this.item, this.quantity);
            dispatchCartChaged();
        }
    },

    async created() {
        this.objects.picture = await imageService.getImage(this.item.product.picturePath);
    },

    methods: {
        async removeItem() {
            await cartService.removeItemFromCart(this.item.id);
            dispatchCartChaged();
        }
    }
})

const dispatchCartChaged = () => dispatchEvent(new CustomEvent('on-cart-changed')); 