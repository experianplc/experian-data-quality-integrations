"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addGlobalIntuitive(obj) {
    var authToken = obj.authToken, elementId = obj.elementId, source = obj.source;
    return function () {
        return this.parent
            .execute(function (authToken) {
            var element = document.createElement("div");
            element.id = elementId;
            element.setAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN", authToken);
            var script = document.createElement("script");
            script.src = source;
            document.body.appendChild(element);
            document.body.appendChild(script);
        }, [authToken]);
    };
}
exports.addGlobalIntuitive = addGlobalIntuitive;
;
function addProWebOnPremise(obj) {
    var serviceUrl = obj.serviceUrl, source = obj.source, useTypedown = obj.useTypedown, elementId = obj.elementId;
    if (!useTypedown) {
        useTypedown = false;
    }
    return function () {
        return this.parent
            .execute(function (useTypedown) {
            var element = document.createElement("div");
            element.id = elementId;
            element.setAttribute("PRO_WEB_USE_TYPEDOWN", useTypedown);
            element.setAttribute("PRO_WEB_SERVICE_URL", serviceUrl);
            var script = document.createElement("script");
            script.src = source;
            document.body.appendChild(element);
            document.body.appendChild(script);
        }, [useTypedown]);
    };
}
exports.addProWebOnPremise = addProWebOnPremise;
function addProWebOnDemand(obj) {
    var authToken = obj.authToken, source = obj.source, useTypedown = obj.useTypedown, elementId = obj.elementId;
    return function () {
        return this.parent
            .execute(function (PRO_WEB_AUTH_TOKEN, root, useTypedown) {
            var element = document.createElement("div");
            element.id = elementId;
            element.setAttribute("PRO_WEB_USE_TYPEDOWN", useTypedown);
            element.setAttribute("PRO_WEB_AUTH_TOKEN", PRO_WEB_AUTH_TOKEN);
            var script = document.createElement("script");
            script.src = source;
            document.body.appendChild(element);
            document.body.appendChild(script);
        }, [authToken, useTypedown]);
    };
}
exports.addProWebOnDemand = addProWebOnDemand;
function typeAddress(addressMap) {
    return function () {
        return this.parent
            .execute(function () {
            return window.EdqConfig.PRO_WEB_MAPPING.includes(function (obj) {
                return obj.modalFieldSelector.includes("address-line-one");
            })[0].field;
        })
            .then(function (field) {
            return this.parent
                .findByCssSelector(field.id)
                .clearValue()
                .type(addressMap["address-line-one"])
                .end();
        });
    };
}
exports.typeAddress = typeAddress;
;
//# sourceMappingURL=test-helpers.js.map