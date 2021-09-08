import imageService from "../../services/image-service.js";
import createObjectUrlMixin from "../../mixins/create-object-url-mixin.js";
import formatDoubleMixin from "../../mixins/format-double-mixin.js";
import authMixin from "../../mixins/auth-mixin.js";

export default Vue.component("restaurant",{
    mixins: [createObjectUrlMixin, formatDoubleMixin, authMixin],
    props: {
        restaurant: {
            type: Object,
            required: true,
        },
    },

    template: `
    <div id="restaurant">
        <router-link :to="restaurantRoute" tag="div" style="cursor: pointer;" exact>
            <div v-if="restaurant" style="border: 1px solid indianred;">
                <div>
                    <img :src="objectsSource['restaurantLogo']"></img>
                </div>
            
                <div>
                    <label for="restaurantName">Name: </label>
                    <span>{{restaurant.name}}</span>
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
                    <span>{{restaurant.opened ? 'Opened' : 'Closed'}}</span>
                </div>
            
                <div v-if="restaurant.averageMark">
                    <label for="averageMark">Average mark: </label>
                    <span>{{restaurant.averageMark | formatDouble}}</span>
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
            return (this.isAdmin) ? '' : {path: `restaurants/${this.restaurant.id}`};
        }
    },

    async created() {
        if (this.restaurant) {
            this.objects.restaurantLogo = await imageService.getImage(this.restaurant.logoPath)
        }
    },
})
