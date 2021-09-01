import createObjectUrlMixin from "../../mixins/create-object-url-mixin.js";

export default Vue.component("image-picker",{
    mixins: [createObjectUrlMixin],
    props: {
        value: {File, Blob}
    },

    template: `
    <div id="image-picker">
        <input
            ref="file"
            @change="uploadFile" 
            type="file"
            accept="image/*"
            required>
        </input>

        <div>
            <p>Preview</p>
            <img :src="imageSource" alt="">
        </div>
    </div> 
    `,
    
    computed: {
        imageSource() {
            return this.getObjectAsSource(this.value);
        }
    },

    methods: {
        uploadFile() {
            this.$emit('input', this.$refs.file.files[0]);
        },
    }
})