import imageService from "../../services/image-service.js";
import createObjectUrlMixin from "../../mixins/create-object-url-mixin.js";
import formatDoubleMixin from "../../mixins/format-double-mixin.js";
import authMixin from "../../mixins/auth-mixin.js";

export default Vue.component("restaurant",{
    mixins: [createObjectUrlMixin, formatDoubleMixin, authMixin],
    props: {
        restaurant: {
            required: true,
        },
        isNavigable: {
            type: Boolean,
            default: true,
        }
    },

    template: `
    <div id="restaurant">
        <router-link :to="restaurantRoute" tag="div" exact>
            
            <div v-if="restaurant" class="image-info-container item">
                
                <div class="image-left-side-container">
                    <img class="image-left-side" :src="objectsSource['restaurantLogo']"></img>
                </div>
            
                <div class="info-right-side">
                    <div >
                        <h4>{{restaurant.name}}</h4>
                    </div>
                
                    <div>
                        <label for="restaurantType">Type: </label>
                        <span>{{restaurant.type}}</span>
                    </div>
                
                    <div>
                        <label for="location">Location: </label>
                        <span>{{location}}</span>
                    </div>

                    <div>
                        <label for="status">Status: </label>
                        <span class="badge badge-props" :class="restaurantStatusClass">{{restaurant.opened ? 'Opened' : 'Closed'}}</span>
                    </div>
                
                    <div v-if="restaurant.averageMark">
                        <label for="averageMark">Average mark: </label>
                        <span id="average-mark">{{restaurant.averageMark | formatDouble}}</span>
                    </div>
                </div>
            </div>
        </router-link>
    </div> 
    `,
    data() { 
        return {
           objects: {
               restaurantLogo: null
           }
        }
    },

    computed: {
        location() {
            const location = this.restaurant.location;
            return `${location.municipality} - ${location.streetName}, ${location.streetNumber}`
        },
        restaurantRoute() {
            return (!this.isNavigable) ? '' : {path: `restaurants/${this.restaurant.id}`};
        },
        
        restaurantStatusClass() {
            return this.restaurant.opened ? 'badge-success' : 'badge-danger';
        }
    },

    async created() {
        if (this.restaurant) {
            this.objects.restaurantLogo = await imageService.getImage(this.restaurant.logoPath)
        }
    },
})
