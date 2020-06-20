module.exports = {
    /**
     * @description Fetches the requested file or throws an error
     * @param {String} fileName Name of the file to be fetched
     * @returns File content or error
     * @author Rajashree G
     */
    fetchDataFromFile: function (fileName) {
        try {
            return require(fileName);
        } catch (e) {
            return "ERR 404: File not found";
        }
    },

    /**
     * @description Validates if bond values are null
     * @param {Object} corporateBond Corporate Bond Object
     * or
     * @param {object} governmentBond Government Bond Object
     * @returns {Boolean} True if values or not null, else returns false
     */
    validateBondData: function (bond) {
        return (!!bond.tenor && !!bond.yield && !!bond.amount_outstanding);
    },

    /**
     * @description Calculates and returns suitable bonds for the provided combination
     * @param {Object} corporateBond Corporate Bond Object
     * @param {Array} governmentBonds All Government Bonds
     * @returns {Array} Suitable bonds array
     */
    fetchSuitableBonds: function (corporateBond, governmentBonds) {
        var leastTenorDifference = 9999;
        var largestAmountOutstanding = 0;
        var leastTenorBonds = [];

        governmentBonds.forEach((governmentBond) => {
            if (this.validateBondData(governmentBond)) {
                var tenorDifference = Math.abs(parseFloat(governmentBond.tenor) - parseFloat(corporateBond.tenor));

                if (leastTenorDifference >= tenorDifference) {
                    if (leastTenorDifference > tenorDifference) {
                        largestAmountOutstanding = governmentBond.amount_outstanding;
                        leastTenorBonds = [governmentBond];
                    } else {
                        if (largestAmountOutstanding < governmentBond.amount_outstanding) {
                            largestAmountOutstanding = governmentBond.amount_outstanding;
                            leastTenorBonds = [governmentBond];
                        } else if (largestAmountOutstanding === governmentBond.amount_outstanding) {
                            leastTenorBonds.push(governmentBond);
                        }
                    }

                    leastTenorDifference = tenorDifference;
                }
            }
        });

        return leastTenorBonds;
    }
};