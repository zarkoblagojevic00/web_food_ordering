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
    <div id="ol-map">
        <base-field
            fieldName="City"
            required
            :value="location.municipality">
            <input 
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
            <input 
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
            <input 
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
            <input 
                v-model="location.postalCode" 
                type="text"
                :readonly="isReadonly" 
                required>
            </input>
        </base-field>

        <base-field
            fieldName="Coordinates"
            :value="coordinates">
            <input 
                v-model="coordinates" 
                type="text"
                readonly>
            </input>
        </base-field>

        <div :id="mapTarget" style="width: 400px; height: 400px;"></div>
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
