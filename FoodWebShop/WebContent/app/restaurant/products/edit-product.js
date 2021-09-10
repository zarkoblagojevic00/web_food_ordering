import imageService from "../../services/image-service.js";
import restaurantService from "../../services/restaurant-service.js"
import addProduct from "./add-product.js"

export default Vue.component("edit-product",{
    props: ['productId'],
    extends: addProduct,
        
    data() { 
        return {
           title: "Product overview",

           submit: {
               display: "Edit product",
               invoke: this.add
           },

           errorMap: {
            '409': 'Product with supplied name already exists in your restaurant. \nPlease enter another product name.',
            default: 'Sorry, we were unable to edit this product.\nPlease try again later.'
           }
        }
    },

    async created() {
        this.product = await restaurantService.getProduct(this.restaurantId, this.productId);
        this.picture = await imageService.getImage(this.product.picturePath)
        console.log(this.product);
    },

    methods: {
        async $_add_send() {
            const product = await restaurantService.editProduct(
                this.restaurantId,
                this.productId,
                this.product,
                this.picture
            )
            console.log(product);
        }
    }
})
