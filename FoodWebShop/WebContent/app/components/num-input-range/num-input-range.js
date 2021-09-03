export default Vue.component("num-input-range",{
    props: {
        value: {
            type: Number,
            required: true
        },
        min: {
            type: Number,
            default: Number.NEGATIVE_INFINITY,
        },
        max: {
            type: Number,
            default: Number.POSITIVE_INFINITY,
        }
    },
   
    template: `
    <div id="num-input-range">
        <input
            type="number"
            v-model.number.lazy="realNumber"
            :min="min"
            :max="max">
    </div> 
    `,

    data() {
        return {
            realNumber: null
        }
    },
    
    watch: {
        realNumber: function() {
            this.realNumber = (this.realNumber < this.min) ? 
                this.min :
                (this.realNumber > this.max) ?
                    this.max :
                    this.realNumber; 

            this.$emit('input', this.realNumber);
        }
    }    
})
