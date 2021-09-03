export default {
    computed: {
        isProcessing () { return this.order.status === 'PROCESSING'},
        isInPreparation() { return this.order.status === 'IN_PREPARATION'},
        isWaitingOnDelivery() { return this.order.status === 'WAITING_ON_DELIVERY' },
        isInTransport() { return this.order.status === 'IN_TRANSPORT'},
        isDelivered() { return this.order.status === 'DELIVERED'},
        isCanceled() { return this.order.status === 'CANCELED'},
    }
}