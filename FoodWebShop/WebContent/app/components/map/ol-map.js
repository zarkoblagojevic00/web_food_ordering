import createMap from "./map-creator.js"

import formatDoubleMixin from "../../mixins/format-double-mixin.js";

import baseForm from "../form/base-form.js";
import baseField from "../form/base-field.js";

export default Vue.component("ol-map",{
    mixins: [formatDoubleMixin],
    props: {
        value: {
            required: true
        },
        isReadonly: {
            type: Boolean,
            default: false
        },
        coords: {
            type: Array,
            default: () => [19.841527, 45.244989]
        },
    },

    components: {
        'base-field': baseField,
        'base-form': baseForm,
    },

    template: `
    <div id="ol-map" >
        <h3>Location</h3>
        <hr>    

        <div class="image-info-container">
            <div>
                <div :id="mapTarget" class="map"></div>
            </div>

            <div class="info-right-side">
                <base-field
                    fieldName="City"
                    required
                    :value="location.municipality">
                    <input class="form-control"
                        v-model="location.municipality"
                        type="text"
                        :readonly="isReadonly"
                        required>
                    </input>
                </base-field>
                <base-field
                    fieldName="Street name"
                    required
                    :value="location.streetName">
                    <input class="form-control"
                        v-model="location.streetName"
                        type="text"
                        :readonly="isReadonly"
                        required>
                    </input>
                </base-field>
                <base-field
                    fieldName="House number"
                    required
                    :value="location.streetNumber">
                    <input class="form-control"
                        v-model="location.streetNumber"
                        type="text"
                        :readonly="isReadonly"
                        required>
                    </input>
                </base-field>
                
                <base-field
                    fieldName="Postal code"
                    required
                    :value="location.postalCode">
                    <input class="form-control"
                        v-model="location.postalCode"
                        type="text"
                        :readonly="isReadonly"
                        required>
                    </input>
                </base-field>
                <base-field
                    fieldName="Coordinates"
                    :value="coordinates">
                    <input class="form-control"
                        v-model="coordinates"
                        type="text"
                        readonly>
                    </input>
                </base-field>
            </div>
        </div>
        

    </div> 
    `,
    data() { 
        return {
            mapTarget: 'map-root',
            location: this.value,
        }
    },

    computed: {
        coordinates() {
            const longitude = this.location.longitude;
            const latitude = this.location.latitude;
            if (longitude && latitude) {
                return `${this.round(longitude, 5)}, ${this.round(latitude, 5)}`
            }
        },
    },

    mounted() {
        addEventListener('on-location-changed', this.locationChanged)
        createMap(this.mapTarget, this.location, this.coords, this.isReadonly);
    },

    methods: {
        async locationChanged(event) {
            this.location = await event.detail.location;
            this.$emit('input', this.location);
        },
    }
})
