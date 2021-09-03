export default {
    filters: {
        formatTime: (value) => new Date(value).toLocaleTimeString('sr'),
        formatDate: (value) => new Date(value).toLocaleDateString('sr'),
        formatDateTime: (value) => new Date(value).toLocaleString('sr'),
    },
}