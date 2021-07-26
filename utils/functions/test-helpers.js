"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeAddress = exports.addProWebOnDemand = exports.addProWebOnPremise = exports.addGlobalIntuitive = void 0;
var intern_1 = require("intern");
function addGlobalIntuitive(obj) {
    var authToken = obj.authToken, elementId = obj.elementId, source = obj.source;
    return function () {
        return this.parent
            .execute(function (authToken, elementId, source) {
            var element = (this.context || this).document.createElement("div");
            if (elementId) {
                element.id = elementId;
            }
            element.setAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN", authToken);
            var script = (this.context || this).document.createElement("script");
            script.src = source;
            (this.context || this).document.body.appendChild(element);
            (this.context || this).document.body.appendChild(script);
        }, [authToken, elementId, source]);
    };
}
exports.addGlobalIntuitive = addGlobalIntuitive;
;
/**
 * Adds Pro Web to the page with the specified proxied service url.
 */
function addProWebOnPremise(obj) {
    var serviceUrl = obj.serviceUrl, source = obj.source, useTypedown = obj.useTypedown, elementId = obj.elementId;
    if (!useTypedown) {
        useTypedown = false;
    }
    return function () {
        return this.parent
            .execute(function (serviceUrl, source, useTypedown, elementId) {
            var element = (this.context || this).document.createElement("div");
            if (elementId) {
                element.id = elementId;
            }
            element.setAttribute("PRO_WEB_USE_TYPEDOWN", useTypedown);
            element.setAttribute("PRO_WEB_SERVICE_URL", serviceUrl);
            var script = (this.context || this).document.createElement("script");
            script.src = source;
            (this.context || this).document.body.appendChild(element);
            (this.context || this).document.body.appendChild(script);
        }, [serviceUrl, source, useTypedown, elementId]);
    };
}
exports.addProWebOnPremise = addProWebOnPremise;
/**
 * Adds Pro Web On Demand to the page with the specified authorization token.
 */
function addProWebOnDemand(obj) {
    var authToken = obj.authToken, source = obj.source, useTypedown = obj.useTypedown, elementId = obj.elementId;
    return function () {
        return this.parent
            .execute(function (PRO_WEB_AUTH_TOKEN, source, useTypedown, elementId) {
            var element = (this.context || this).document.createElement("div");
            if (elementId) {
                element.id = elementId;
            }
            element.setAttribute("PRO_WEB_USE_TYPEDOWN", useTypedown);
            element.setAttribute("PRO_WEB_AUTH_TOKEN", PRO_WEB_AUTH_TOKEN);
            var script = document.createElement("script");
            script.src = source;
            (this.context || this).document.body.appendChild(element);
            (this.context || this).document.body.appendChild(script);
        }, [authToken, source, useTypedown, elementId]);
    };
}
exports.addProWebOnDemand = addProWebOnDemand;
function typeAddress(addressMap) {
    return function () {
        return this.parent
            .execute(function (addressMap) {
            var _this = this;
            if (!(this.context || this).EdqConfig) {
                return null;
            }
            (this.context || this).EdqConfig.PRO_WEB_MAPPING.forEach(function (mapping) {
                mapping.field.value = null;
                Object.keys(addressMap).forEach(function (addressKey) {
                    if (mapping.modalFieldSelector.includes(addressKey)) {
                        if (mapping.field.id) {
                            _this.context.document.getElementById(mapping.field.id).value = addressMap[addressKey];
                        }
                        mapping.field.value = addressMap[addressKey];
                        mapping.field.innerText = addressMap[addressKey];
                    }
                });
            });
        }, [addressMap]);
    };
}
exports.typeAddress = typeAddress;
;
intern_1.default.registerPlugin("edq-test-helpers", function () {
    return {
        typeAddress: typeAddress,
        addProWebOnPremise: addProWebOnPremise,
        addProWebOnDemand: addProWebOnDemand,
        addGlobalIntuitive: addGlobalIntuitive
    };
});
//# sourceMappingURL=test-helpers.js.map