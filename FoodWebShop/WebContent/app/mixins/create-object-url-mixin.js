export default {
    data() {
        return {
            pictures: {},
        }
    },
    
    computed: {
        picturesSource() {
            return Object.entries(this.pictures).reduce(appendSource, {});
        }
    },
}

const appendSource = (prev, [key, value]) => ({...prev, [key]: getObjectAsSource(value)});
const getObjectAsSource = (obj) => (obj) ? URL.createObjectURL(obj) : '';
