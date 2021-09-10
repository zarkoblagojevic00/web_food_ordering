import restaurantService from "../../services/restaurant-service.js";

import ratingPicker from "../../components/rating-picker/rating-picker.js";
import authMixin from "../../mixins/auth-mixin.js";

export default Vue.component("comment",{
    mixins: [authMixin],

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
    <div id="comment" class="item">
        <div>
            <label for="authorFullName">Author: </label>
            <span>{{comment.authorFullName}}</span>
        </div>

        <hr id="above-content">
        
        <div id="content">
            "{{comment.content}}"
        </div>

        <hr>

        <div>
            <label for="mark">Mark: </label>
            <rating-picker 
                v-model="comment.mark"
                isReadonly
                showRating>
            </rating-picker>
        </div>
        
        <div id="status" v-if="isManager || isAdmin">
            <label for="status">Status: </label>
            <span class="badge badge-props" :class="statusClass">{{comment.status}}</span>
        </div>

        <span v-if="isManager && isPending">
           <button @click="sendApproval('APPROVED')" class="btn btn-md btn-success">Approve</button> 
           <button @click="sendApproval('REJECTED')" class="btn btn-md btn-danger">Reject</button> 
        </span>
    </div> 
    `,
    data() { 
        return {
           
        }
    },

    computed: {
        isPending() {
            return this.comment.status === "PENDING";
        },
        isApproved() {
            return this.comment.status === "APPROVED";
        },
        isRejected() {
            return this.comment.status === "REJECTED";
        },

        statusClass() {
            if (this.isPending)  return 'badge-warning';
            if (this.isApproved) return 'badge-success';
            if (this.isRejected) return 'badge-danger';
        }
    },

    methods: {
        async sendApproval(answer) {
            await restaurantService.sendCommentApproval(answer, this.restaurantId, this.comment.id);
            this.comment.status = answer;
        }
    }
})
