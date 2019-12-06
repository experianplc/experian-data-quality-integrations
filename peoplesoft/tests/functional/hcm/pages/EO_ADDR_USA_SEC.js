"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var intern_1 = require("intern");
var pollUntil_1 = require("@theintern/leadfoot/helpers/pollUntil");
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
            element.setAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN", GLOBAL_INTUITIVE_AUTH_TOKEN);
            var script = document.createElement("script");
            script.src = "http://localhost:8000/lib/9.2/hcm/pages/EO_ADDR_USA_SEC/integration.js";
            document.body.appendChild(element);
            document.body.appendChild(script);
        }, [GLOBAL_INTUITIVE_AUTH_TOKEN, root]);
    };
}
function addProWebOnDemand(useTypedown) {
    if (useTypedown === void 0) { useTypedown = false; }
    return function () {
        return this.parent
            .execute(function (PRO_WEB_AUTH_TOKEN, root, useTypedown) {
            var element = document.createElement("div");
            element.id = "edq-9.2-hcm-pages-EO_ADDR_USA_SEC";
            element.setAttribute("PRO_WEB_USE_TYPEDOWN", String(useTypedown));
            element.setAttribute("PRO_WEB_AUTH_TOKEN", PRO_WEB_AUTH_TOKEN);
            var script = document.createElement("script");
            script.src = "http://localhost:8000/lib/9.2/hcm/pages/EO_ADDR_USA_SEC/integration.js";
            document.body.appendChild(element);
            document.body.appendChild(script);
        }, [PRO_WEB_AUTH_TOKEN, root, useTypedown]);
    };
}
function addProWebOnPremise(useTypedown) {
    if (useTypedown === void 0) { useTypedown = false; }
    return function () {
        return this.parent
            .execute(function (root, useTypedown) {
            var element = document.createElement("div");
            element.id = "edq-9.2-hcm-pages-EO_ADDR_USA_SEC";
            element.setAttribute("PRO_WEB_USE_TYPEDOWN", String(useTypedown));
            element.setAttribute("PRO_WEB_SERVICE_URL", "http://bospshcm92dev2.qas.com:8080");
            var script = document.createElement("script");
            script.src = "http://localhost:8000/lib/9.2/hcm/pages/EO_ADDR_USA_SEC/integration.js";
            document.body.appendChild(element);
            document.body.appendChild(script);
        }, [root, useTypedown]);
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
            .setExecuteAsyncTimeout(20000)
            .clearCookies()
            .sleep(1000)
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
            .then(pollUntil_1.default(function () {
            return document.querySelector("#ICTAB_1");
        }))
            .findByCssSelector("#ICTAB_1")
            .click()
            .end()
            .then(pollUntil_1.default(function () {
            return document.getElementById("ADDR_HISTORY_BTN$0");
        }))
            .findByLinkText("Add Address Detail")
            .click()
            .end()
            .then(pollUntil_1.default(function () {
            return document.getElementById("DERIVED_ADDR_UPDATE_ADDRESS$0");
        }))
            .findByLinkText("Add Address")
            .click()
            .end()
            .then(pollUntil_1.default(function () {
            return document.querySelector("#DERIVED_ADDRESS_ADDRESS1");
        }))
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
            if (document.getElementById("edq-9.2-hcm-pages-EO_ADDR_USA_SEC")) {
                var integration = document.getElementById("edq-9.2-hcm-pages-EO_ADDR_USA_SEC");
                integration.remove();
            }
        })
            .then(pollUntil_1.default(function () {
            return Boolean(document.getElementById("DERIVED_ADDRESS_ADDRESS1").onclick === null) || null;
        }));
    },
    tests: {
        "Pro Web without adding integration fails": function () {
            return this.remote
                .then(typeAddressAndSubmit({
                address1: "53 State Street",
                postal: "02109-2820"
            }))
                .then(pollUntil_1.default(function () {
                return document.querySelector("#DERIVED_ADDRESS_CITY");
            }))
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
                .then(pollUntil_1.default(function () {
                return Boolean(window.EDQ &&
                    window.EdqConfig &&
                    document.querySelector("#DERIVED_ADDRESS_ADDRESS1")) || null;
            }))
                .then(typeAddressAndSubmit({
                address1: "53 State Street",
                postal: "02109-2820"
            }))
                .then(pollUntil_1.default(function () {
                return document.querySelector("#DERIVED_ADDRESS_CITY").value || null;
            }))
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
                .then(pollUntil_1.default(function () {
                return Boolean(window.EDQ &&
                    window.EdqConfig &&
                    document.querySelector("#DERIVED_ADDRESS_ADDRESS1")) || null;
            }))
                .then(typeAddressAndSubmit({
                address1: "125 Summer St",
                address2: "Ste 1020",
                postal: "02110"
            }))
                .then(pollUntil_1.default(function () {
                return document.querySelector("#DERIVED_ADDRESS_CITY").value || null;
            }))
                .findByCssSelector("#DERIVED_ADDRESS_CITY")
                .getProperty("value")
                .then(function (city) {
                assert.equal(city, "Boston", "Full address includes the address");
            })
                .end();
        },
        "Pro Web with PRO_WEB_USE_TYPEDOWN does not work when integration is not properly set": function () {
            return this.remote
                .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
                .click()
                .end()
                .execute(function () {
                return document.getElementById("typedown-steps");
            })
                .then(function (domElement) {
                assert.equal(domElement, null, "Typedown Modal should not appear with integration");
            });
        },
        "Global Intuitive without adding integration does not work": function () {
            return this.remote
                .then(pollUntil_1.default(function () {
                return document.querySelector("#DERIVED_ADDRESS_ADDRESS1");
            }))
                .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
                .clearValue()
                .type("53 State Street Boston")
                .end()
                .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
                .click()
                .type(" ")
                .sleep(2000)
                .end()
                .execute(function () {
                return document.querySelector(".edq-global-intuitive-address-suggestion");
            })
                .then(function (selector) {
                assert.equal(selector, null, "No suggestions an be found");
            });
        },
        "Global Intuitive with GLOBAL_INTUITIVE_AUTH_TOKEN works": function () {
            return this.remote
                .then(addGlobalIntuitive())
                .then(pollUntil_1.default(function () {
                return Boolean(window.EDQ &&
                    window.EdqConfig &&
                    document.querySelector("#DERIVED_ADDRESS_ADDRESS1")) || null;
            }))
                .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
                .clearValue()
                .type("53 State Street Boston")
                .end()
                .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
                .click()
                .type(" ")
                .end()
                .then(pollUntil_1.default(function () {
                return document.querySelector(".edq-global-intuitive-address-suggestion");
            }))
                .findByCssSelector(".edq-global-intuitive-address-suggestion")
                .click()
                .end()
                .then(pollUntil_1.default(function () {
                return document.querySelector("#DERIVED_ADDRESS_CITY").value || null;
            }))
                .then(function (city) {
                console.log("city: " + city);
                assert.equal(city, "Boston", "Full address includes city");
            });
        }
    }
});
//# sourceMappingURL=EO_ADDR_USA_SEC.js.map