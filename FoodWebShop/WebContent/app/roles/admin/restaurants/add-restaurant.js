import restaurantService from "../../../services/restaurant-service.js";
import managerService from "../../../services/manager-service.js";
import imageService from "../../../services/image-service.js";

import olMap from "../../../components/map/ol-map.js";

import requiredFieldValidatorMixin from "../../../mixins/required-field-validator-mixin.js";
import createObjectUrlMixin from "../../../mixins/create-object-url-mixin.js";

export default Vue.component("add-restaurant",{
    components: {
        'ol-map': olMap
    },

    mixins: [requiredFieldValidatorMixin, createObjectUrlMixin],
    template: `
    <div id="add-restaurant">
    <h3>Add restaurant</h3>
    <form>
        <div>
            <input 
                v-model="restaurant.name" 
                placeholder="Name" 
                required>
            </input>
            <p 
                v-hide="restaurant.name"
                class="small">
                {{requiredFieldMsg}}
            </p>
        </div>

        <div>
            <select v-model="restaurant.type" :required="true">
                <option 
                    v-for="type in restaurantTypes" 
                    :key="type"
                    :value="type">
                    {{type}}
                </option> 
            </select>
            <p 
                v-hide="restaurant.type"
                class="small">
                {{requiredFieldMsg}}
            </p>
        </div>
        <div>
            <input 
                v-model="restaurant.location.municipality" 
                type="text" 
                placeholder="Municipality" 
                required>
            </input>
            <p 
                v-hide="restaurant.location.municipality"
                class="small">
                {{requiredFieldMsg}}
            </p>
        </div>

        <div>
            <input 
                v-model="restaurant.location.streetName" 
                type="text" 
                placeholder="Street name" 
                required>
            </input>
            <p 
                v-hide="restaurant.location.streetName"
                class="small">
                {{requiredFieldMsg}}
            </p>
        </div>

        <div>
            <input 
                v-model="restaurant.location.streetNumber" 
                type="number" 
                placeholder="Street number" 
                required>
            </input>
            <p 
                v-hide="restaurant.location.streetNumber"
                class="small">
                {{requiredFieldMsg}}
            </p>
        </div>

        <div>
            <input 
                v-model="coordinates" 
                type="text"
                placeholder="Coordinates"
                required
                readonly>
            </input>
            <p 
                v-hide="coordinates"
                class="small">
                {{requiredFieldMsg}}
            </p>
        </div>

        <div>
            <input 
                v-model="restaurant.location.postalCode" 
                type="text"
                placeholder="Postal code"
                required>
            </input>
            <p 
                v-hide="restaurant.location.postalCode"
                class="small">
                {{requiredFieldMsg}}
            </p>
        </div>

        <ol-map ref="map"></ol-map>

        <div v-if="selectedManagerId">
            <select v-model="selectedManagerId" :required="true">
                <option 
                    v-for="manager in managers" 
                    :key="manager.id"
                    :value="manager.id">
                    {{manager.firstName}} {{manager.lastName}}
                </option> 
            </select>
            <p 
                v-hide="selectedManagerId"
                class="small">
                {{requiredFieldMsg}}
            </p>
        </div>
        <div v-else>
            <router-link :to="{name: 'add-user', params: {role: 'MANAGER'}}">Add manager</router-link>
        </div>

        <div>
            <input
                ref="file"
                @change="uploadFile" 
                type="file"
                accept="image/*"
                required>
            </input>
            <p 
                v-hide="pictures.logoPicture"
                class="small">
                {{requiredFieldMsg}}
            </p>
        </div>

        <div>
            <h4>Preview</h4>
            <img :src="picturesSource['logoPicture']" alt="">
        </div>

        <div v-if="error"> 
            {{error.message}} 
        </div>

        <input 
            type="submit" 
            value="Submit" 
            @click.prevent='add' 
            class="btn btn-primary btn-block text-uppercase font-weight-bold mb-2" ></input>
    </form>
    </div> 
    `,
    data() { 
        return {
            restaurant: {
                name: null,
                type: 'ITALIAN',
                location: {
                    municipality: null,
                    streetName: null,
                    streetNumber: null,
                    longitude: null,
                    latitude: null,
                    postalCode: null
                },
            },
            selectedManagerId: null,
           
            pictures: {
                logoPicture: null,
            },
            
            restaurantTypes: [],
            managers:[],

            error: {
            cause: null,
            message: null,
            displayMessage: function(message) {
                this.message = message;
                setTimeout(() => this.message = null, 10000);
            }
        },
        }
    },

    computed: {
        coordinates() {
            const longitude = this.restaurant.location.longitude;
            const latitude = this.restaurant.location.latitude;
            if (longitude && latitude) {
                return `${round(longitude)}, ${round(latitude)}`
            }
        },
    },

    async created() {
        this.restaurantTypes = await restaurantService.getTypes();
        this.managers = await managerService.getAvailable();
        if (this.managers.length > 0) {
            this.selectedManagerId = this.managers[0].id;
        }
    },

    // listening to map change location
    mounted() {
        this.$watch(() => this.$refs.map.location, (value) => this.restaurant.location = value);
    },

    methods: {
        uploadFile() {
            this.pictures.logoPicture = this.$refs.file.files[0];
        },

        async add() {
            try {
                this.$_add_validate();
                await this.$_add_send();
                this.$_add_navigate_back();
            } catch (e) {
                console.error(e);
                this.$_add_handleError(e);
            }
        },

        $_add_validate: function()  {
            this.validate(this.restaurant); // from mixin
            this.validate(this.restaurant.location);
            this.validate(this.pictures.logoPicture);
            this.validate(this.selectedManagerId);
        },

        $_add_send: async function() {
            const rest = await restaurantService.add(this.restaurant, this.pictures.logoPicture,  this.selectedManagerId,);
            console.log(rest);
        },

        $_add_navigate_back: function() {
            // TODO: Should navigate to common restaurant overview
            console.error("Shoud navigate to common restaurant overview");
        },

        $_add_handleError: function(e) {
            this.error.cause = e;
            const response = e.response;
            if (!response) {
                this.error.displayMessage('Please fill in all the data!');
                return;
            } 
            if (response.status == 409) {
                this.error.displayMessage('Restaurant with given name already exists.\nPlease enter another name.');
                return;
            }
            if (response.status == 500) {
                this.error.displayMessage('Sorry! We were unable to fulfill your request!\nPlease try again later.');
                return;
            }
        },
    }
})

const round = (value, dec=5) => value.toFixed(dec);