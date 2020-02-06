"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function countryToIso3(country) {
    var countries = {
        "United States": "USA",
        "United States of America": "USA",
        "Canada": "CAN",
        "France": "FRA",
        "Germany": "DEU",
        "Italy": "ITA",
        "United Kingdom": "GBR"
    };
    return countries[country];
}
exports.countryToIso3 = countryToIso3;
//# sourceMappingURL=country-to-iso3.js.map