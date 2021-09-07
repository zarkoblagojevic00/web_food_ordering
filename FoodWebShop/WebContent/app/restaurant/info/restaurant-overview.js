import baseField from "../../components/form/base-field.js";
import olMap from "../../components/map/ol-map.js";
import imagePicker from "../../components/image-picker/image-picker.js";
import restaurantTypePicker from "../../components/entity-picker/restaurant-type-picker.js";

export default Vue.component("restaurant-overview",{
    props: {
        value: {
            required: true
        },
        isReadonly: {
            type: Boolean,
            default: false
        }
    },

    components: {
        'base-field': baseField,
        'ol-map': olMap,
        'image-picker': imagePicker,
        'restaurant-type-picker': restaurantTypePicker,
    },

    template: `
    <div id="restaurant-overview">
        <base-field
            fieldName="Name"
            required
            :value="restaurant.name">
            <input 
                v-model="restaurant.name"
                type="text" 
                required
                :readonly="isReadonly">
            </input>
        </base-field>

        <base-field
            fieldName="Restaurant type"
            required
            :value="restaurant.type">
            <restaurant-type-picker 
                v-model="restaurant.type"
                :isReadonly="isReadonly">
            </restaurant-type-picker>
        </base-field>

        <base-field
            fieldName="Location"
            required
            :value="restaurant.location">
            <ol-map 
                v-model="restaurant.location"
                :isReadonly="isReadonly">
            </ol-map>
        </base-field>

        <base-field
            fieldName="Logo"
            required
            :value="restaurant.logoPicture">
            <image-picker 
                v-model="restaurant.logoPicture"
                :isReadonly="isReadonly">
            </image-picker>
        </base-field>
    </div> 
    `,
    data() { 
        return {
            restaurant: this.value || {
                name: null,
                type: '',
                logoPicture: null,
                location: {
                    municipality: null,
                    streetName: null,
                    streetNumber: null,
                    longitude: null,
                    latitude: null,
                    postalCode: null
                },
            },
        }
    },

    watch: {
        restaurant: {
            handler() {
                this.$emit('input', this.restaurant)
            },
            immediate: true,
        }
    }

})
