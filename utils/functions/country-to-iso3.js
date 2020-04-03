"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function countryToIso3(country) {
    var countries = {
        "United States": "USA",
        "United States of America": "USA",
        "Canada": "CAN",
        "France": "FRA",
    };
    Object.keys(countries).forEach(function (key) {
        if (!countries[countries[key]]) {
            countries[countries[key]] = countries[key];
        }
    });
    return countries[country];
}
exports.countryToIso3 = countryToIso3;
//# sourceMappingURL=country-to-iso3.js.map