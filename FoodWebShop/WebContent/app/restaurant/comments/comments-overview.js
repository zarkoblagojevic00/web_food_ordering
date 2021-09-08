import restaurantService from "../../services/restaurant-service.js";

import comment from "./comment.js";

import authMixin from "../../mixins/auth-mixin.js";

export default Vue.component("comments-overview",{
    props: ['restaurantId'],
    components: {
        comment
    },
    mixins: [authMixin],
    template: `
    <div id="comments-overview">
        <h3 v-if="averageMark">Average mark: {{averageMark}}</h3>
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
        getComments() {
            return (this.isCustomer || this.isGuest) ? 
            () => restaurantService.getCommentsWithStatus(this.restaurantId, "APPROVED") :
            () => restaurantService.getComments(this.restaurantId)  
        },

        averageMark() {    
            const approved = this.comments
                .filter(comment => comment.status === "APPROVED")
            const sum = approved.reduce((prev, curr) => prev + curr.mark, 0);
            return (sum / approved.length) || 0;
        }
    },

    async created() {
        this.comments = await this.getComments();
    },

    methods: {
        
    }
})
