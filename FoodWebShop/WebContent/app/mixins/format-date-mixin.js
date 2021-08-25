export default {
    filters: {
        formatDate: (value) => new Date(value).toLocaleDateString('sr'),
    },
}