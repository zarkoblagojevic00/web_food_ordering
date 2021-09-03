import restaurantService from "../../services/restaurant-service.js";

import ratingPicker from "../../components/rating-picker/rating-picker.js";

export default Vue.component("comment",{
    props: {
        comment: {
            type: Object,
            required: true,
        },
        restaurantId: {
            type: String,
            required: true
        }
    },

    component: {
        'rating-picker': ratingPicker
    },

    template: `
    <div id="comment" style="border: 1px solid black;">
        <div>
            <label for="authorFullName">Author: </label>
            <span>{{comment.authorFullName}}</span>
        </div>
        
        <div>
            <label for="content">Content: </label>
            <span>{{comment.content}}</span>
        </div>

        <div>
            <label for="mark">Mark: </label>
            
            <rating-picker 
                v-model="comment.mark"
                isReadonly
                showRating>
            </rating-picker>
        </div>
        
        <div>
            <label for="status">Status: </label>
            <span>{{comment.status}}</span>
        </div>

        <span v-if="isPending">
           <button @click="sendApproval('APPROVED')">Approve</button> 
           <button @click="sendApproval('REJECTED')">Reject</button> 
        </span>
    </div> 
    `,
    data() { 
        return {
           
        }
    },

    computed: {
        isPending() {
            return this.comment.status === "PENDING"
        }
    },

    methods: {
        async sendApproval(answer) {
            await restaurantService.sendCommentApproval(answer, this.restaurantId, this.comment.id);
            this.comment.status = answer;
        }
    }
})
