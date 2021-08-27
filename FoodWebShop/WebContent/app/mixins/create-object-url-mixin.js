const appendSource = (prev, [key, value]) => ({...prev, [key]: getObjectAsSource(value)});
const getObjectAsSource = (obj) => (obj) ? URL.createObjectURL(obj) : '';

export default {
    data() {
        return {
            objects: {},
        }
    },
    
    computed: {
        objectsSource() {
            return Object.entries(this.objects).reduce(appendSource, {});
        }
    },
    
    methods: {
        getObjectAsSource
    }
}