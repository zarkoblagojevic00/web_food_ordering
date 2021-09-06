export default {
    filters: {
        formatDouble: (value, dec) => roundDouble(value, dec),
    },

    methods: {
        round: (value, dec) => roundDouble(value, dec),
    }
}

const roundDouble = (value, dec=2) => value.toFixed(dec);