import restaurantService from "../../services/restaurant-service.js";

import baseField from "../../components/form/base-field.js";
import baseForm from "../../components/form/base-form.js";
import productTypePicker from "../../components/entity-picker/product-type-picker.js";
import imagePicker from "../../components/image-picker/image-picker.js";

export default Vue.component("add-product",{
    props: ['restaurantId'],

    components: {
        'base-field': baseField,
        'base-form': baseForm,
        'product-type-picker': productTypePicker,
        'image-picker': imagePicker,
    },
    
    template: `
    <div id="add-product">
        <base-form
            :title="title"
            :submit="submit"
            :errorMap="errorMap">

            <base-field
                fieldName="Name"
                required
                :value="product.name">
                <input 
                    v-model="product.name"
                    type="text" 
                    required>
                </input>
            </base-field>

            <base-field
                fieldName="Price"
                required
                :value="product.price">
                <input 
                    v-model="product.price"
                    type="number" 
                    required>
                </input>
            </base-field>

            <base-field
                fieldName="Type"
                required
                :value="product.type">
                <product-type-picker v-model="product.type"></product-type-picker>
            </base-field>

            <base-field
                fieldName="Portion"
                :value="product.portion">
                <input 
                    v-model="product.portion"
                    type="number" 
                    >
                </input>
                <span>{{unitOfMeasure}}</span>
            </base-field>
            
            <base-field
                fieldName="Description"
                :value="product.description">
                <div>
                    <textarea
                        v-model="product.description"
                        >
                    </textarea>
                </div>
            </base-field>

            <base-field
                fieldName="Product picture"
                required
                :value="picture">
                <image-picker v-model="picture"></image-picker>
            </base-field>
        </base-form>
    </div> 
    `,
    data() { 
        return {
            title: "New Product",
            product: {
                name: '',
                price: 0,
                type: '',
                portion: 0,
                description: '',
            },

            picture: null,
            
            submit: {
                display: 'Add product',
                invoke: this.add,
            },

            errorMap: {
                '409': 'Product with supplied name already exists in your restaurant. \nPlease enter another product name.',
                default: 'Sorry, we were unable to add new product to your restaurant.\nPlease try again later.'
            }
        }
    },

    computed: {
        unitOfMeasure() {
            if (!this.product.type) return '';
            return (this.product.type == "FOOD") ? 'g' : 'ml'; 
        }
    },

    methods: {
        async add() {
            await this.$_add_send();
            this.$_add_navigate();
        },

        async $_add_send() {
            const product = await restaurantService.addProduct(this.restaurantId, this.product, this.picture);
            console.log(product);
        },

        $_add_navigate() {
            this.$router.back();
        }
    }
})
