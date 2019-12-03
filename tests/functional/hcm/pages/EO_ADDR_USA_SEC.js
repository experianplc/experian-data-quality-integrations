"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var intern_1 = require("intern");
var registerSuite = intern_1.default.getInterface('object').registerSuite;
var assert = intern_1.default.getPlugin('chai').assert;
var root = __dirname + "../../../../..";
var PRO_WEB_AUTH_TOKEN = process.env.PRO_WEB_AUTH_TOKEN;
var GLOBAL_INTUITIVE_AUTH_TOKEN = process.env.GLOBAL_INTUITIVE_AUTH_TOKEN;
function addGlobalIntuitive() {
    return function () {
        return this.parent
            .execute(function (GLOBAL_INTUITIVE_AUTH_TOKEN, root) {
            var element = document.createElement("div");
            element.id = "edq-9.2-hcm-pages-EO_ADDR_USA_SEC";
            element.setAttribute("PRO_WEB_USE_TYPEDOWN", "false");
            element.setAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN", GLOBAL_INTUITIVE_AUTH_TOKEN);
            var script = document.createElement("script");
            script.src = "http://localhost:8000/lib/9.2/hcm/pages/EO_ADDR_USA_SEC/integration.js";
            document.body.appendChild(element);
            document.body.appendChild(script);
        }, [GLOBAL_INTUITIVE_AUTH_TOKEN, root]);
    };
}
function addProWebOnDemand() {
    return function () {
        return this.parent
            .execute(function (PRO_WEB_AUTH_TOKEN, root) {
            var element = document.createElement("div");
            element.id = "edq-9.2-hcm-pages-EO_ADDR_USA_SEC";
            element.setAttribute("PRO_WEB_USE_TYPEDOWN", "false");
            element.setAttribute("PRO_WEB_AUTH_TOKEN", PRO_WEB_AUTH_TOKEN);
            var script = document.createElement("script");
            script.src = "http://localhost:8000/lib/9.2/hcm/pages/EO_ADDR_USA_SEC/integration.js";
            document.body.appendChild(element);
            document.body.appendChild(script);
        }, [PRO_WEB_AUTH_TOKEN, root]);
    };
}
function addProWebOnPremise() {
    return function () {
        return this.parent
            .execute(function (PRO_WEB_AUTH_TOKEN, root) {
            var element = document.createElement("div");
            element.id = "edq-9.2-hcm-pages-EO_ADDR_USA_SEC";
            element.setAttribute("PRO_WEB_USE_TYPEDOWN", "false");
            element.setAttribute("PRO_WEB_SERVICE_URL", "http://bospshcm92dev2.qas.com:8080/");
            var script = document.createElement("script");
            script.src = "http://localhost:8000/lib/9.2/hcm/pages/EO_ADDR_USA_SEC/integration.js";
            document.body.appendChild(element);
            document.body.appendChild(script);
        }, [PRO_WEB_AUTH_TOKEN, root]);
    };
}
function typeAddressAndSubmit(address) {
    return function () {
        return this.parent
            .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
            .clearValue()
            .type(address.address1 || "")
            .end()
            .findByCssSelector("#DERIVED_ADDRESS_ADDRESS2")
            .clearValue()
            .type(address.address2 || "")
            .end()
            .findByCssSelector("#DERIVED_ADDRESS_CITY")
            .clearValue()
            .type(address.city || "")
            .end()
            .findByCssSelector("#DERIVED_ADDRESS_STATE")
            .clearValue()
            .type(address.state || "")
            .end()
            .findByCssSelector("#DERIVED_ADDRESS_POSTAL")
            .clearValue()
            .type(address.postal || "")
            .end()
            .findByCssSelector("#DERIVED_ADDRESS_OK_PB")
            .click()
            .end();
    };
}
var URL = "http://bospshcm92dev2.qas.com/psc/HCM92EXP/EMPLOYEE/HRMS/c/ADMINISTER_WORKFORCE_(GBL).PERSONAL_DATA_ADD.GBL";
registerSuite("EO_ADDR_USA_SEC Tests", {
    before: function () {
        return this.remote
            .setFindTimeout(10000)
            .get(URL)
            .findByCssSelector("#userid")
            .type("PS")
            .end()
            .findByCssSelector("#pwd")
            .type("PS")
            .end()
            .findByCssSelector("[name='Submit']")
            .click()
            .end()
            .sleep(1000);
    },
    beforeEach: function () {
        return this.remote
            .get(URL)
            .findByCssSelector("#DERIVED_HCR_PER_ADD_PERSON_LINK")
            .click()
            .end()
            .sleep(1000)
            .findByCssSelector("#ICTAB_1")
            .click()
            .end()
            .sleep(1000)
            .findByLinkText("Add Address Detail")
            .click()
            .end()
            .sleep(1000)
            .findByLinkText("Add Address")
            .click()
            .end()
            .sleep(2000)
            .execute(function () {
            window.EDQ = null;
            window.EdqConfig = null;
            var address1 = document.getElementById("DERIVED_ADDRESS_ADDRESS1");
            address1.onclick = null;
            address1.setAttribute("onclick", null);
            address1.removeEventListener("keyup", address1.keyupHandler);
            address1.removeEventListener("keydown", address1.keydownHandler);
            var okButton = document.getElementById("DERIVED_ADDRESS_OK_PB");
            okButton.onclick = null;
            okButton.setAttribute("onclick", null);
            if (document.getElementById("edq-pegasus")) {
                var pegasus = document.getElementById("edq-pegasus");
                pegasus.remove();
            }
            if (document.getElementById("edq-verification-unicorn")) {
                var verification = document.getElementById("edq-verification-unicorn");
                verification.remove();
            }
            if (document.getElementById("edq-typedown-unicorn")) {
                var typedown = document.getElementById("edq-typedown-unicorn");
                typedown.remove();
            }
            if (document.getElementById("edq-global-intuitive-unicorn")) {
                var globalIntuitive = document.getElementById("edq-global-intuitive-unicorn");
                globalIntuitive.remove();
            }
        });
    },
    tests: {
        "Pro Web without adding integration fails": function () {
            return this.remote
                .then(typeAddressAndSubmit({
                address1: "53 State Street",
                postal: "02109-2820"
            }))
                .sleep(1000)
                .findByCssSelector("#DERIVED_ADDRESS_CITY")
                .getProperty("value")
                .then(function (city) {
                assert.equal(city, "", "City is not populated");
            })
                .end();
        },
        "Pro Web with PRO_WEB_AUTH_TOKEN works": function () {
            return this.remote
                .then(addProWebOnDemand())
                .sleep(3000)
                .then(typeAddressAndSubmit({
                address1: "53 State Street",
                postal: "02109-2820"
            }))
                .sleep(2000)
                .findByCssSelector("#DERIVED_ADDRESS_CITY")
                .getProperty("value")
                .then(function (city) {
                assert.equal(city, "Boston", "Full address includes city");
            })
                .end();
        },
        "Pro Web with PRO_WEB_SERVICE_URL works": function () {
            return this.remote
                .then(addProWebOnPremise())
                .sleep(3000)
                .then(typeAddressAndSubmit({
                address1: "125 Summer St",
                address2: "Ste 1020",
                city: "Boston",
                postal: "02110"
            }))
                .sleep(2000)
                .findByCssSelector("#DERIVED_ADDRESS_POSTAL")
                .getProperty("value")
                .then(function (postal) {
                assert.equal(postal, "02110-1681", "Full address includes ZIP+4");
            })
                .end();
        },
        "Global Intuitive with GLOBAL_INTUITIVE_AUTH_TOKEN works": function () {
        }
    }
});
//# sourceMappingURL=EO_ADDR_USA_SEC.js.map