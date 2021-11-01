(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/2.7/root/cm/ext_startStopAddrOverridePage/integration.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../utils/functions/create-assets.ts":
/*!*******************************************!*\
  !*** ../utils/functions/create-assets.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),

/***/ "./src/2.7/root/cm/ext_startStopAddrOverridePage/integration.ts":
/*!**********************************************************************!*\
  !*** ./src/2.7/root/cm/ext_startStopAddrOverridePage/integration.ts ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var create_assets_1 = __webpack_require__(/*! utils/functions/create-assets */ "../utils/functions/create-assets.ts");
var currentElement = document.getElementById("edq-2.7-root-cm-ext_startStopAddrOverridePage");
var interval = setInterval(function () {
    if (document.getElementById("ADDRESS12")) {
        clearInterval(interval);
        var trigger = parent.document.getElementById("IM_SAVE");
        trigger.onclick = function (e) {
            // Necessary for hooking into ouaf.core.UIEventHelper.getEvent()
            //@ts-ignore
            window.event = e;
            //@ts-ignore
            window.parent.event = e;
            var selectors = ["ADDRESS12", "ADDRESS2", "CITY2", "STATE", "POSTAL", "COUNTY"];
            selectors.map(function (selector) { return document.getElementById(selector); }).forEach(function (el) {
                //@ts-ignore
                model.setValueWithDefault(window, null, el.value + " ", el);
            });
            //@ts-ignore
            main.doClose();
            main.doSave();
            //@ts-ignore
            window.event = null;
            //@ts-ignore
            window.parent.event = null;
        };
        var defaultSaveFunction_1 = trigger.onclick;
        try {
            if (!parent.window.EdqConfig) {
                parent.window.EdqConfig = {};
            }
        }
        catch (e) {
            parent.window.EdqConfig = {};
        }
        window.EdqConfig = Object.assign(parent.window.EdqConfig, {
            GLOBAL_INTUITIVE_NO_SAVED_TARGET: true,
            NO_SAVED_TARGET: true,
            PRO_WEB_COUNTRY: "USA",
            PRO_WEB_CALLBACK: function (savedTarget, newEvent) {
                parent.doClose();
                parent.doSave();
            }
        });
        // Add EDQ Validate button for mailing address
        (function () {
            var el = document.createElement("input");
            el.className = "oraButton uiMargin";
            el.tabIndex = 5;
            el.type = "button";
            el.id = "edq-validate-premise-address";
            el.value = "EDQ Validate";
            el.title = "EDQ Validate";
            document.getElementById("C1_VAL_ADDR_SW").parentElement.appendChild(el);
        })();
        var config_1 = Object.assign({
            PRO_WEB_TYPEDOWN_TRIGGER: document.getElementById('ADDRESS12'),
            PRO_WEB_SUBMIT_TRIGGERS: [
                {
                    type: 'click',
                    element: document.getElementById('edq-validate-premise-address'),
                }
            ],
            PRO_WEB_COUNTRY: 'USA',
            PRO_WEB_MAPPING: [
                {
                    field: document.getElementById('ADDRESS12'),
                    elements: ['Primary number', 'Street'],
                    separator: ' ',
                    typedownFieldSelector: '#typedown-final--address-line-one',
                    modalFieldSelector: '#interaction-address--original-address-line-one',
                },
                {
                    field: document.getElementById('ADDRESS2'),
                    elements: ['Secondary number'],
                    separator: '',
                    typedownFieldSelector: '#typedown-final--address-line-two',
                    modalFieldSelector: '#interaction-address--original-address-line-two',
                },
                {
                    field: document.getElementById('CITY2'),
                    elements: ['City name'],
                    separator: '',
                    typedownFieldSelector: '#typedown-final--city',
                    modalFieldSelector: '#interaction-address--original-locality',
                },
                {
                    field: document.getElementById('STATE'),
                    elements: ['State code'],
                    separator: '',
                    typedownFieldSelector: '#typedown-final--state',
                    modalFieldSelector: '#interaction-address--original-province',
                },
                {
                    field: document.getElementById('POSTAL'),
                    elements: ['ZIP Code', '+4 code'],
                    separator: '-',
                    typedownFieldSelector: '#typedown-final--postal-code',
                    modalFieldSelector: '#interaction-address--original-postal-code',
                },
                {
                    field: document.getElementById('COUNTY'),
                    elements: ['County name'],
                    separator: ' ',
                    typedownFieldSelector: '#typedown-final--postal-code',
                    modalFieldSelector: '#interaction-address--original-postal-code',
                }
            ],
            GLOBAL_INTUITIVE_ELEMENT: document.getElementById('ADDRESS12'),
            GLOBAL_INTUITIVE_MAPPING: [
                {
                    field: document.getElementById('ADDRESS12'),
                    elements: ["address.addressLine1"]
                },
                {
                    field: document.getElementById('ADDRESS2'),
                    elements: ["address.addressLine2"]
                },
                {
                    field: document.getElementById('CITY2'),
                    elements: ["address.locality"]
                },
                {
                    field: document.getElementById('STATE'),
                    elements: ['address.province']
                },
                {
                    field: document.getElementById('POSTAL'),
                    elements: ["address.postalCode"]
                },
                {
                    field: document.getElementById('COUNTY'),
                    elements: ["components.county1"]
                }
            ]
        }, window.EdqConfig);
        var globalIntuitiveAuthToken = parent.window.EdqConfig.GLOBAL_INTUITIVE_AUTH_TOKEN ||
            currentElement.getAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN");
        if (globalIntuitiveAuthToken) {
            window.EdqConfig = Object.assign(window.EdqConfig, {
                GLOBAL_INTUITIVE_AUTH_TOKEN: globalIntuitiveAuthToken
            });
        }
        var proWebAuthToken = parent.window.EdqConfig.PRO_WEB_AUTH_TOKEN ||
            currentElement.getAttribute("PRO_WEB_AUTH_TOKEN");
        var proWebServiceUrl = parent.window.EdqConfig.PRO_WEB_SERVICE_URL ||
            currentElement.getAttribute("PRO_WEB_SERVICE_URL");
        var soapActionUrl = parent.window.EdqConfig.SOAP_ACTION_URL ||
            currentElement.getAttribute("SOAP_ACTION_URL") ||
            "http://www.qas.com/web-2013-12";
        if (proWebAuthToken) {
            window.EdqConfig = Object.assign(window.EdqConfig, {
                PRO_WEB_AUTH_TOKEN: proWebAuthToken,
                PRO_WEB_LAYOUT: "AllElements",
            });
        }
        else if (proWebServiceUrl && soapActionUrl) {
            window.EdqConfig = Object.assign(window.EdqConfig, {
                PRO_WEB_SERVICE_URL: proWebServiceUrl,
                SOAP_ACTION_URL: soapActionUrl,
                PRO_WEB_LAYOUT: "Database layout",
            });
        }
        ;
        create_assets_1.createAssets({
            currentElement: currentElement,
            overrides: {
                PRO_WEB_SERVICE_URL: parent.window.EdqConfig.PRO_WEB_SERVICE_URL,
                PRO_WEB_AUTH_TOKEN: parent.window.EdqConfig.PRO_WEB_AUTH_TOKEN,
                SOAP_ACTION_URL: parent.window.EdqConfig.SOAP_ACTION_URL,
                GLOBAL_INTUITIVE_AUTH_TOKEN: parent.window.EdqConfig.GLOBAL_INTUITIVE_AUTH_TOKEN,
                PRO_WEB_STYLESHEET_URL: parent.window.EdqConfig.PRO_WEB_STYLESHEET_URL,
                PRO_WEB_VERIFICATION_URL: parent.window.EdqConfig.PRO_WEB_VERIFICATION_URL,
                PRO_WEB_EDQ_URL: parent.window.EdqConfig.PRO_WEB_EDQ_URL,
                GLOBAL_INTUITIVE_URL: parent.window.EdqConfig.GLOBAL_INTUITIVE_URL
            },
            callbacks: {
                typedown: function () {
                    var typedown = new window.TypedownUnicorn(config_1);
                    typedown.activateValidation();
                },
                verification: function () {
                    // One option is to build an object of pages where
                    // the integration has been loaded into. So in this case
                    // each page would indicate the URL where it was created in
                    // and load its own data into that particular spot
                    var verification = new window.VerificationUnicorn(config_1);
                    verification.activateValidation();
                    if (!parent.window.edqLoaded) {
                        parent.window.edqLoaded = {};
                    }
                    parent.window.edqLoaded[document.location.href] = true;
                    parent.document.getElementById("tabPage").onload = function (e) {
                        // When a tabPage is loaded, reset the onclick handler if edq is not loaded
                        // for that particular page.
                        var cisMainWindow = e.currentTarget.contentWindow.parent;
                        if (!cisMainWindow.edqLoaded[e.currentTarget.contentDocument.location.href]) {
                            parent.document.getElementById("IM_SAVE").onclick = defaultSaveFunction_1;
                        }
                    };
                },
                globalIntuitive: function () {
                    var globalIntuitive = new window.GlobalIntuitiveUnicorn(config_1);
                    globalIntuitive.activateValidation();
                }
            }
        });
    }
}, 1000);


/***/ })

/******/ })));