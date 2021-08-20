export default {
    computed: {
        isOk() {
            return this.activityStatus === 'OK';
        },

        isSuspicious() {
            return this.activityStatus === 'SUSPICIOUS';
        },

        isBanned() {
            return this.activityStatus === 'BANNED';
        }
    },
}