import { getId, getRole } from "../local-storage-util.js"

export default {
    data() {
        return {
            role: getRole(),
            id: getId()
        }
    },

    computed: {
        isAdmin() { return this.role === "ADMIN"; },
        isCustomer() { return this.role === "CUSTOMER" },
        isDeliverer() { return this.role === "DELIVERER" },
        isManager() { return this.role === "MANAGER" },
        isGuest() { return !this.role } 
    }
}