import restaurantService from "../../../services/restaurant-service.js";

import baseForm from "../../../components/form/base-form.js";
import baseField from "../../../components/form/base-field.js";

import olMap from "../../../components/map/ol-map.js";
import imagePicker from "../../../components/image-picker/image-picker.js";
import restaurantTypePicker from "../../../components/entity-picker/restaurant-type-picker.js";
import managerPicker from "../../../components/entity-picker/manager-picker.js";

export default Vue.component("add-restaurant",{

    components: {
        'base-field': baseField,
        'base-form': baseForm,
        'ol-map': olMap,
        'image-picker': imagePicker,
        'restaurant-type-picker': restaurantTypePicker,
        'manager-picker': managerPicker
    },

    template: `
    <div id="add-restaurant">
        <base-form
            title="New restaurant"
            :submit="submit"
            :errorMap="errorMap">
            
            <base-field
                fieldName="Name"
                required
                :value="restaurant.name">
                <input 
                    v-model="restaurant.name"
                    type="text" 
                    required>
                </input>
            </base-field>

            <base-field
                fieldName="Restaurant type"
                required
                :value="restaurant.type">
                <restaurant-type-picker v-model="restaurant.type"></restaurant-type-picker>
            </base-field>

            <base-field
                fieldName="Location"
                required
                :value="restaurant.location">
                <ol-map v-model="restaurant.location"></ol-map>
            </base-field>

            <base-field
                fieldName="Manager"
                required
                :value="selectedManagerId">
                
                <manager-picker 
                    v-show="!addManager"
                    v-model="selectedManagerId">
                    </manager-picker>
                <span v-show="addManager">
                    <router-link :to="{name: 'add-user', params: {role: 'MANAGER'}}">Add manager</router-link>
                </span>
            </base-field>

            <base-field
                fieldName="Logo"
                required
                :value="logoPicture">
                <image-picker v-model="logoPicture"></image-picker>
            </base-field>
        </base-form>
    </div> 
    `,
    data() { 
        return {
            restaurant: {
                name: null,
                type: '',
                location: {
                    municipality: null,
                    streetName: null,
                    streetNumber: null,
                    longitude: null,
                    latitude: null,
                    postalCode: null
                },
            },
            selectedManagerId: -1,
            logoPicture: null,
            
            submit: {
                display: "Register restaurant",
                invoke: this.add
            },

            errorMap: {
                default: 'Sorry, we were unable to register new restaurant.\nPlease try again later.'
            }
        }
    },

    computed: {
        addManager() {
            return this.selectedManagerId === -1
        }
    },

    methods: {
        async add() {
            await this.$_add_send();
            this.$_add_navigate_back();
        },

        $_add_send: async function() {
            const rest = await restaurantService.add(this.restaurant, this.logoPicture,  this.selectedManagerId,);
            console.log(rest);
        },

        $_add_navigate_back: function() {
            // TODO: Should navigate to common restaurant overview
            console.error("Shoud navigate to common restaurant overview");
        },
    }
})