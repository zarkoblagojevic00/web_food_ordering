export default Vue.component("rating-picker",{
    props: {
        value: {
            type: Number,
            required: true,
        },
        isReadonly: {
            type: Boolean,
            default: false,
        },
        showRating: {
            type: Boolean,
            default: false,
        }
    },

    template: `
    <span id="rating-picker">
        <star-rating
            v-model="rating"
            inactive-color="#35424a"
            active-color="#e8491d"
            :read-only= "isReadonly"
            :star-size="25"
            :show-rating="showRating"
            >
        </star-rating>
    </span>
    `,
    data() { 
        return {
           rating: this.value
        }
    },

    watch: {
        rating: {
            handler() {
                this.$emit('input', this.rating)
            },
            immediate: true
        } 
    }
})
