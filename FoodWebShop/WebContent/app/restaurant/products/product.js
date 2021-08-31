import imageService from "../../services/image-service.js"

import createObjectUrlMixin from "../../mixins/create-object-url-mixin.js"

export default Vue.component("product",{
    mixins: [createObjectUrlMixin],
    props :{
        id: Number,
        name: String, 
        price: Number,
        productType: String, 
        portion: Number,
        description: String,
        picturePath: String,
    },

    template: `
    <div id="product" style="border: 1px solid black;">
        <div>
            <label for="name">Name: </label>
            <span>{{name}}</span>
        </div>
        
        <div>
            <label for="price">Price: </label>
            <span>{{price}}</span>
        </div>

        <div>
            <label for="productType">Type: </label>
            <span>{{productType}}</span>
        </div>
        
        <div>
            <label for="portion">Portion: </label>
            <span>{{portion}}</span>
        </div>
        
        <div>
            <label for="description">Description: </label>
            <span>{{description}}</span>
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
           }
        }
    },

    async created() {
        this.objects.picture = await imageService.getImage(this.picturePath);
    }
})
