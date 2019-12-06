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
            element.id = "edq-9.2-hcm-pages_fluid-ADDRESS_DFT_SCF";
            element.setAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN", GLOBAL_INTUITIVE_AUTH_TOKEN);
            var script = document.createElement("script");
            script.src = "http://localhost:8000/lib/9.2/hcm/pages_fluid/ADDRESS_DFT_SCF/integration.js";
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
            element.id = "edq-9.2-hcm-pages_fluid-ADDRESS_DFT_SCF";
            element.setAttribute("PRO_WEB_USE_TYPEDOWN", String(useTypedown));
            element.setAttribute("PRO_WEB_AUTH_TOKEN", PRO_WEB_AUTH_TOKEN);
            var script = document.createElement("script");
            script.src = "http://localhost:8000/lib/9.2/hcm/pages_fluid/ADDRESS_DFT_SCF/integration.js";
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
            element.id = "edq-9.2-hcm-pages_fluid-ADDRESS_DFT_SCF";
            element.setAttribute("PRO_WEB_USE_TYPEDOWN", String(useTypedown));
            element.setAttribute("PRO_WEB_SERVICE_URL", "http://bospshcm92dev2.qas.com:8080");
            var script = document.createElement("script");
            script.src = "http://localhost:8000/lib/9.2/hcm/pages_fluid/ADDRESS_DFT_SCF/integration.js";
            document.body.appendChild(element);
            document.body.appendChild(script);
        }, [root, useTypedown]);
    };
}
function typeAddressAndSubmit(address) {
    return function () {
        return this.parent
            .findByCssSelector("#ADDRESS1")
            .clearValue()
            .type(address.address1 || "")
            .end()
            .findByCssSelector("#ADDRESS2")
            .clearValue()
            .type(address.address2 || "")
            .end()
            .findByCssSelector("#CITY")
            .clearValue()
            .type(address.city || "")
            .end()
            .findByCssSelector("#DESCR_STATE")
            .clearValue()
            .type(address.state || "")
            .end()
            .findByCssSelector("#POSTAL")
            .clearValue()
            .type(address.postal || "")
            .end()
            .findByCssSelector("#DERIVED_ADDR_FL_SAVE_PB")
            .click()
            .end();
    };
}
var URL = "http://bospshcm92dev2.qas.com/psc/HCM92EXP/EMPLOYEE/HRMS/c/EL_EMPLOYEE_FL.HR_EE_ADDR_FL.GBL";
registerSuite("ADDRESS_DFT_SCF Tests", {
    before: function () {
        return this.remote
            .setFindTimeout(10000)
            .setExecuteAsyncTimeout(10000)
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
            .findById("win0divDRVD_ADDR1_FL_ADDRESSLONG4$0")
            .click()
            .sleep(500)
            .end()
            .then(pollUntil_1.default(function () {
            return document.querySelector("#ptModFrame_0");
        }))
            .switchToFrame("ptModFrame_0")
            .then(pollUntil_1.default(function () {
            return window.EDQ;
        }))
            .execute(function () {
            window.EDQ = null;
            window.EdqConfig = null;
            var address1 = document.getElementById("ADDRESS1");
            address1.onclick = null;
            address1.setAttribute("onclick", null);
            address1.removeEventListener("keyup", address1.keyupHandler);
            address1.removeEventListener("keydown", address1.keydownHandler);
            var okButton = document.getElementById("DERIVED_ADDR_FL_SAVE_PB");
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
            if (document.getElementById("edq-9.2-hcm-pages_fluid-ADDRESS_DFT_SCF")) {
                var integration = document.getElementById("edq-9.2-hcm-pages_fluid-ADDRESS_DFT_SCF");
                integration.remove();
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
                .then(pollUntil_1.default(function () {
                return document.querySelector("#CITY");
            }))
                .findByCssSelector("#CITY")
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
                return Boolean(window.EDQ && window.EdqConfig) || null;
            }))
                .then(typeAddressAndSubmit({
                address1: "53 State Street",
                postal: "02109-2820"
            }))
                .then(pollUntil_1.default(function () {
                return document.querySelector("#CITY").value || null;
            }))
                .findByCssSelector("#CITY")
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
                return Boolean(window.EDQ && window.EdqConfig) || null;
            }))
                .then(typeAddressAndSubmit({
                address1: "125 Summer St",
                address2: "Ste 1020",
                postal: "02110"
            }))
                .then(pollUntil_1.default(function () {
                return document.querySelector("#CITY").value || null;
            }))
                .findByCssSelector("#CITY")
                .getProperty("value")
                .then(function (city) {
                assert.equal(city, "Boston", "Full addreess includes city");
            })
                .end();
        },
        "Pro Web with PRO_WEB_USE_TYPEDOWN does not work when integration is not properly set": function () {
            return this.remote
                .findByCssSelector("#ADDRESS1")
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
                return document.querySelector("#ADDRESS1");
            }))
                .findByCssSelector("#ADDRESS1")
                .clearValue()
                .type("53 State Street Boston")
                .end()
                .findByCssSelector("#ADDRESS1")
                .click()
                .type(" ")
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
                    document.querySelector("#ADDRESS1")) || null;
            }))
                .findByCssSelector("#ADDRESS1")
                .clearValue()
                .type("53 State Street Boston")
                .end()
                .findByCssSelector("#ADDRESS1")
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
                return document.querySelector("#CITY").value || null;
            }))
                .then(function (city) {
                assert.equal(city, "Boston", "Full address includes city");
            });
        }
    }
});
//# sourceMappingURL=ADDRESS_DFT_SCF.js.map