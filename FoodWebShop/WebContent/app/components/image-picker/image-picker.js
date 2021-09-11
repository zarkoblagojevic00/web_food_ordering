import createObjectUrlMixin from "../../mixins/create-object-url-mixin.js";

export default Vue.component("image-picker",{
    mixins: [createObjectUrlMixin],
    props: {
        value: [File, Blob],
        isReadonly: {
            type: Boolean,
            default: false
        }
    },

    template: `
    <div id="image-picker">
        <input v-if="!isReadonly" class="form-control"
            ref="file"
            @change="uploadFile" 
            type="file"
            accept="image/*"
            required>
        </input>

        <div id="preview">
            <img class="image-left-side" :src="imageSource" alt="">
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