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
        },
        showStatus: {
            type: Boolean,
            default: true
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
        <div class="image-info-container">

            <div class="image-left-side-container">
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
            
            <div class="info-right-side">
                <base-field
                    fieldName="Name"
                    required
                    :value="restaurant.name">
                    <input class="form-control"
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
                
                <base-field v-if="showStatus"
                    fieldName="Status"
                    :value="restaurant.opened">
                        <input class="form-control" type="text" readonly :value="restaurant.opened ? 'Opened' : 'Closed'"/>
                </base-field>
            </div>

        </div>
        
        <base-field class="adjust-location-base-field" 
            required
            :value="restaurant.location">
            <ol-map 
                v-model="restaurant.location"
                :isReadonly="isReadonly">
            </ol-map>
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
