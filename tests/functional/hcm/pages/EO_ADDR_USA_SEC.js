"use strict";
exports.__esModule = true;
var intern_1 = require("intern");
var registerSuite = intern_1["default"].getInterface('object').registerSuite;
var assert = intern_1["default"].getPlugin('chai').assert;
var root = __dirname + "../../../";
var createIntegrationElement = function () {
    var element = document.createElement("div");
    element.id = "edq-9.2-hcm-pages-EO_ADDR_USA_SEC";
    element.setAttribute("PRO_WEB_USE_TYPEDOWN", false);
};
var addIntegrationScript = function () {
    var element = document.createElement("script");
    element.src = "file://" + root + "/lib/9.2/hcm/pages/EO_ADDR_USA_SEC/integration.js";
    document.body.appendChild(element);
};
var addProWebOnDemand = function () {
    var element = createIntegrationElement();
    element.setAttribute("PRO_WEB_AUTH_TOKEN", process.env.PRO_WEB_AUTH_TOKEN);
    document.body.appendChild(element);
};
/**
 * The URL to the relevant iframe, EO_ADDR_USA_SEC
 */
var URL = "http://bospshcm92dev2.qas.com/psc/HCM92EXP/EMPLOYEE/HRMS/c/ADMINISTER_WORKFORCE_(GBL).PERSONAL_DATA_ADD.GBL";
registerSuite("EO_ADDR_USA_SEC Tests", {
    beforeEach: function () {
        // Go to the page with the address
        return this.remote
            .setFindTimeout(10000)
            .get(URL)
            .findByLinkText("Add Person")
            .click()
            .end()
            .findByLinkText("Contact Information")
            .click()
            .end()
            .findByLinkText("Add Address Detail")
            .click()
            .end()
            .findByLinkText("Add Address")
            .click()
            .end();
    },
    tests: {
        "Pro Web with PRO_WEB_SERVICE_URL works": function () {
            return this.remove
                .execute(function () {
            });
        },
        "Pro Web with PRO_WEB_AUTH_TOKEN works": function () {
        },
        "Pro Web with PRO_WEB_USE_TYPEDOWN works": function () {
        },
        "Global Intuitive with GLOBAL_INTUITIVE_AUTH_TOKEN works": function () {
        }
    }
});
