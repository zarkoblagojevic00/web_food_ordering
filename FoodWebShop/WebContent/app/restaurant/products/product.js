import imageService from "../../services/image-service.js"

import createObjectUrlMixin from "../../mixins/create-object-url-mixin.js"
import authMixin from "../../mixins/auth-mixin.js";

export default Vue.component("product",{
    mixins: [createObjectUrlMixin, authMixin],
    props :{
        product: Object,
        restaurantId: String,
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

    </div> 
    `,
    data() { 
        return {
           objects: {
               picture: null
           },
           editProductRoute: `edit-product/${this.product.id}`
        }
    },

    async created() {
        this.objects.picture = await imageService.getImage(this.product.picturePath);
    }
})
