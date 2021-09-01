import restaurantService from "../../services/restaurant-service.js";

import comment from "./comment.js";

import authMixin from "../../mixins/auth-mixin.js";

export default Vue.component("comments-overview",{
    props: ['restaurantId'],
    components: {
        comment
    },
    mixinis: [authMixin],
    template: `
    <div id="comments-overview">
        <comment v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            :restaurantId="restaurantId">
        </comment>
    </div> 
    `,
    data() { 
        return {
            comments: []
        }
    },

    computed: {
        
    },

    async created() {
        this.comments = await restaurantService.getComments(this.restaurantId);
    },

    methods: {
        
    }
})
