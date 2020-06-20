// Required modules and variables
var assert = require("chai").assert;
var utility = require("../utility.js");

// Test Group
describe("Testing Utilitu", () => {

    // Test Case
    it("Should fetch the file", () => {
        assert.isObject(utility.fetchDataFromFile("./data.json"), "File fecth failed");
    });

    it("File not found error", () => {
        assert.equal(utility.fetchDataFromFile("./some_random_name"), "ERR 404: File not found", "File errornaously found");
    });

    it("Bond data validity", () => {
        assert.equal(utility.validateBondData({
            "id": "c1",
            "type": "corporate",
            "tenor": "10.3 years",
            "yield": "5.30%",
            "amount_outstanding": 1200000
        }), true, "Bond could not be validated");

        assert.equal(utility.validateBondData({
            "id": "c1",
            "type": "corporate",
            "yield": "5.30%",
            "amount_outstanding": 1200000
        }), false, "Bond could not be validated");
    });

});