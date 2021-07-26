"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAssets = void 0;
function createAssets(_a) {
    var currentElement = _a.currentElement, overrides = _a.overrides, callbacks = _a.callbacks;
    var proWebStylesheet = document.createElement("link");
    proWebStylesheet.type = "text/css";
    proWebStylesheet.rel = "stylesheet";
    proWebStylesheet.onload = callbacks.proWebStylesheet;
    proWebStylesheet.id = "edq-pro-web-css";
    proWebStylesheet.href =
        overrides.PRO_WEB_STYLESHEET ||
            currentElement.getAttribute("PRO_WEB_STYLESHEET") ||
            "https://edqprofservus.blob.core.windows.net/assets/pro-web.css";
    document.body.appendChild(proWebStylesheet);
    var verificationUnicornScript = document.createElement("script");
    verificationUnicornScript.type = "text/javascript";
    verificationUnicornScript.id = "edq-verification-unicorn";
    verificationUnicornScript.onload = callbacks.verification;
    verificationUnicornScript.src =
        overrides.PRO_WEB_VERIFICATION_URL ||
            currentElement.getAttribute("PRO_WEB_VERIFICATION_URL") ||
            "https://edqprofservus.blob.core.windows.net/assets/verification-unicorn.js";
    var typedownUnicornScript = document.createElement("script");
    typedownUnicornScript.type = "text/javascript";
    typedownUnicornScript.id = "edq-typedown-unicorn";
    typedownUnicornScript.onload = callbacks.typedown;
    typedownUnicornScript.src =
        overrides.PRO_WEB_TYPEDOWN_URL ||
            currentElement.getAttribute("PRO_WEB_TYPEDOWN_URL") ||
            "https://edqprofservus.blob.core.windows.net/assets/typedown-unicorn.js";
    var globalIntuitiveUnicornScript = document.createElement("script");
    globalIntuitiveUnicornScript.type = "text/javascript";
    globalIntuitiveUnicornScript.id = "edq-global-intuitive-unicorn";
    globalIntuitiveUnicornScript.onload = callbacks.globalIntuitive;
    globalIntuitiveUnicornScript.src =
        overrides.GLOBAL_INTUITIVE_URL ||
            currentElement.getAttribute("GLOBAL_INTUITIVE_URL") ||
            "https://edqprofservus.blob.core.windows.net/assets/global-intuitive-unicorn.js";
    var edqScript = document.createElement("script");
    edqScript.type = "text/javascript";
    edqScript.src =
        overrides.PRO_WEB_EDQ_URL ||
            currentElement.getAttribute("PRO_WEB_EDQ_URL") ||
            "https://edqprofservus.blob.core.windows.net/assets/edq.js";
    edqScript.id = "edq-pegasus";
    edqScript.onload = function (event) {
        if (callbacks.edq) {
            callbacks.edq.bind(this)(event);
        }
        var proWebAuthToken = overrides.PRO_WEB_AUTH_TOKEN || currentElement.getAttribute("PRO_WEB_AUTH_TOKEN");
        var proWebServiceUrl = overrides.PRO_WEB_SERVICE_URL || currentElement.getAttribute("PRO_WEB_SERVICE_URL");
        if (proWebAuthToken || proWebServiceUrl) {
            document.body.appendChild(verificationUnicornScript);
        }
        var globalIntuitiveAuthToken = overrides.GLOBAL_INTUITIVE_AUTH_TOKEN || currentElement.getAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN");
        if (globalIntuitiveAuthToken) {
            document.body.appendChild(globalIntuitiveUnicornScript);
        }
        var useTypedownIndicator = overrides.PRO_WEB_USE_TYPEDOWN || currentElement.getAttribute("PRO_WEB_USE_TYPEDOWN");
        var useTypedown = useTypedownIndicator && useTypedownIndicator !== "false";
        if ((useTypedown && proWebAuthToken) || (useTypedown && proWebServiceUrl)) {
            document.body.appendChild(typedownUnicornScript);
        }
    };
    if (document.getElementById("edq-pegasus") === null) {
        document.body.appendChild(edqScript);
        // This is here because PeopleSoft will "reset" the integration each time you change a field
        // and refocus. The purpose of this is to rebind the integration.
    }
    else {
        try {
            document.getElementById("edq-verification-unicorn").remove();
        }
        catch (e) { }
        var proWebAuthToken = overrides.PRO_WEB_AUTH_TOKEN || currentElement.getAttribute("PRO_WEB_AUTH_TOKEN");
        var proWebServiceUrl = overrides.PRO_WEB_SERVICE_URL || currentElement.getAttribute("PRO_WEB_SERVICE_URL");
        if (proWebAuthToken || proWebServiceUrl) {
            document.body.appendChild(verificationUnicornScript);
        }
        try {
            document.getElementById("edq-typedown-unicorn").remove();
        }
        catch (e) { }
        var useTypedownIndicator = overrides.PRO_WEB_USE_TYPEDOWN || currentElement.getAttribute("PRO_WEB_USE_TYPEDOWN");
        var useTypedown = useTypedownIndicator && useTypedownIndicator !== "false";
        if ((useTypedown && proWebAuthToken) || (useTypedown && proWebServiceUrl)) {
            document.body.appendChild(typedownUnicornScript);
        }
        try {
            document.getElementById("edq-global-intuitive-unicorn").remove();
        }
        catch (e) { }
        var globalIntuitiveAuthToken = overrides.GLOBAL_INTUITIVE_AUTH_TOKEN || currentElement.getAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN");
        if (globalIntuitiveAuthToken) {
            document.body.appendChild(globalIntuitiveUnicornScript);
        }
    }
}
exports.createAssets = createAssets;
//# sourceMappingURL=create-assets.js.map