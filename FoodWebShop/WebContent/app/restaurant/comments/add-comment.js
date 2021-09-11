import restaurantService from "../../services/restaurant-service.js"

import restaurantInfo from "../info/restaurant-info.js"
import baseField from "../../components/form/base-field.js"
import baseForm from "../../components/form/base-form.js"
import ratingPicker from "../../components/rating-picker/rating-picker.js"

export default Vue.component("add-comment",{
    props: ['id','restaurantId'],

    components: {
        'restaurant-info': restaurantInfo,
        'base-field': baseField,
        'base-form': baseForm,
        'rating-picker': ratingPicker,
    },

    template: `
    <div id="add-comment">
        <h2>Leave us a comment</h2>
        <restaurant-info
            :restaurantId="restaurantId">
        </restaurant-info>

        <base-form
            title="Create comment"
            :submit="submit"
            :errorMap="errorMap">

            <base-field
                fieldName="Express your experience with this restaurant"
                v-model="comment.content"
                required>
                <div>
                    <textarea class="form-control"
                        v-model="comment.content"
                        name="content"
                        id="content"
                        cols="50" rows="10">
                    </textarea>
                </div>
            </base-field>
            
            <base-field
                fieldName="Mark us"
                v-model="comment.mark"
                required>
                <rating-picker
                    v-model="comment.mark"
                    showRating>
                </rating-picker> 
            </base-field>
        </base-form>
    </div> 
    `,
    data() { 
        return {
            comment: {
               author: { id: this.id },
               content: '',
               mark: 0,
            },

            submit: {
                display: "Post comment",
                invoke: this.postComment
            },

            errorMap: {
                default: 'Sorry, we were unable to post your comment.\nPlease try again later.'
            }
        }
    },

    computed: {
        
    },

    methods: {
        async postComment() {
            await restaurantService.postComment(this.restaurantId, this.comment);
            this.$router.push({ name: 'customer-orders', params: { id: this.id, type: 'mine'}});
        }
    }
})
