"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_assets_1 = require("utils/functions/create-assets");
var currentElement = document.getElementById("edq-2.7-root-cm-ext_startStopAddrOverridePage");
var interval = setInterval(function () {
    if (document.getElementById("ADDRESS12")) {
        clearInterval(interval);
        var trigger = parent.document.getElementById("IM_SAVE");
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
//# sourceMappingURL=integration.js.map
