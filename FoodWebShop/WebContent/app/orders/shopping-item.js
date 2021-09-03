import createObjectUrlMixin from "../mixins/create-object-url-mixin.js";
import imageService from "../services/image-service.js";

export default Vue.component("shopping-item",{
    mixins: [createObjectUrlMixin],

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
        </div>

        <div>
            <label for="quantity">Quantity: </label>
            <span>{{item.quantity}}</span>
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
        }
    },

    computed: {
        
    },

    async created() {
        this.objects.picture = await imageService.getImage(this.item.product.picturePath);
    },

    methods: {
        
    }
})
