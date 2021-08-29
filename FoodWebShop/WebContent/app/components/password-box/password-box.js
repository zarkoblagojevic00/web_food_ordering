export default Vue.component("password-box",{
    props: {
        value: String,
        required: true
    },

    template: `
    <span id="password-box">
        <input
            @input="$emit('input', password)"
            v-model="password"
            :type="activeMode['type']"
            required>
        </input>
        <img :src="activeMode['imgSrc']" @click="switchMode">
    </span> `,
    data() { 
        return {
            password: '',
            modes: [
               {
                   type: 'text',
                   imgSrc: '../../../img/icons/pass-visible.png'
               },
               {
                   type: 'password',
                   imgSrc: '../../../img/icons/pass-hidden.png'
               }
            ],
           
            activeIndex: 1,
        }
    },

    computed: {
        activeMode() {
            return this.modes[this.activeIndex];
        }
    },
    
    methods: {
        switchMode() {
            this.activeIndex = (this.activeIndex === 0) ? 1 : 0
        }
    }
})
