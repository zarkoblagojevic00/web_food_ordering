export default {
    filters: {
        formatDate(value) {
            return new Date(value).toLocaleDateString('sr')
        }
    },
}