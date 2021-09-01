import restaurantService from "../../services/restaurant-service.js";

import baseForm from "../../components/form/base-form.js";
import baseField from "../../components/form/base-field.js";

import restaurantOverview from "./restaurant-overview.js";
import managerPicker from "../../components/entity-picker/manager-picker.js";

export default Vue.component("add-restaurant",{

    components: {
        'base-field': baseField,
        'base-form': baseForm,
        'restaurant-overview': restaurantOverview,
        'manager-picker': managerPicker
    },

    template: `
    <div id="add-restaurant">
        <base-form
            title="New restaurant"
            :submit="submit"
            :errorMap="errorMap">
            
            <restaurant-overview
                v-model="restaurant">
            </restaurant-overview>

            <base-field v-if="selectedManagerId"
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

            
        </base-form>
    </div> 
    `,
    data() { 
        return {
            restaurant: null,
            selectedManagerId: -1,
            
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
            const rest = await restaurantService.add(this.restaurant,  this.selectedManagerId);
            console.log(rest);
        },

        $_add_navigate_back: function() {
            // TODO: Should navigate to common restaurant overview
            console.error("Shoud navigate to common restaurant overview");
        },
    }
})