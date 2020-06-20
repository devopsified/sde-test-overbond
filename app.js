/**
 * @description To get the result run "npm start <input-file> <output-file>"
 * @test To run test case, execute "npm test"
 * @default InputFile ./data.json
 * @default OutputFile ./result.json
 */

var fs = require("fs");
var Utility = require("./utility.js");

var inputFile = process.argv[2] || "./data.json";
var outputFile = process.argv[3] || "./result.json";

var bonds = Utility.fetchDataFromFile(inputFile).data;
var corporateBonds = bonds.filter(bond => bond.id && bond.type === "corporate");
var governmentBonds = bonds.filter(bond => bond.id && bond.type === "government");
var result = {
    data: []
};

corporateBonds.forEach((corporateBond) => {
    if (Utility.validateBondData(corporateBond)) {
        Utility.fetchSuitableBonds(corporateBond, governmentBonds).forEach((governmentBond) => {
            result.data.push({
                "corporate_bond_id": corporateBond.id,
                "government_bond_id": governmentBond.id,
                "spread_to_benchmark": `${Math.round(Math.abs(parseFloat(governmentBond.yield) - parseFloat(corporateBond.yield)) * 100)} bps`
            });
        });
    }
});

fs.writeFile(outputFile, JSON.stringify(result), function (err) {
    if (err) {
        console.error("Error writing to file");
    }

    console.info(`Results saved to ${outputFile}`);
});   
