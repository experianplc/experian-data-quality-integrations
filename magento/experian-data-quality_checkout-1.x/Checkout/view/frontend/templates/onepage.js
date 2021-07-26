"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var script_append_1 = require("utils/functions/script-append");
var CheckoutOnepage;
(function (CheckoutOnepage) {
    var currentElement = document.getElementById("edq-magento-experian-checkout-view-frontend-template-onepage");
    var edqScript = document.createElement("script");
    edqScript.type = "application/javascript";
    edqScript.src = "https://edqprofservus.blob.core.windows.net/assets/edq.js";
    edqScript.id = "edq-pegasus";
    edqScript.onload = function () {
        script_append_1.createPhoneUnicornScript(true);
        script_append_1.createEmailUnicornScript(true);
        script_append_1.createProWebCssElement(true);
        script_append_1.createVerificationUnicornScript(true);
        script_append_1.createGlobalIntuitiveUnicornScript(true);
    };
    var targetNode = document.querySelector("#form-validate");
    var targetNodeConfig = { attributes: true, childList: true, subtree: true };
    /**
     * These should be picked up from the Store Variables instead
     */
    window.EdqConfig = {
        GLOBAL_INTUITIVE_NO_SAVED_TARGET: true,
        EMAIL_NO_SAVED_TARGET: true,
        PHONE_NO_SAVED_TARGET: true,
        NO_SAVED_TARGET: true,
        EMAIL_VALIDATE_AUTH_TOKEN: currentElement.getAttribute("EMAIL_VALIDATE_AUTH_TOKEN"),
        GLOBAL_PHONE_VALIDATE_AUTH_TOKEN: currentElement.getAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN"),
        PRO_WEB_AUTH_TOKEN: currentElement.getAttribute("PRO_WEB_AUTH_TOKEN"),
        GLOBAL_INTUITIVE_AUTH_TOKEN: currentElement.getAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN")
    };
    var shippingEdqConfig = {
        EMAIL_ELEMENTS: [
            "#customer-email"
        ],
        PHONE_ELEMENTS: [
            ".form-shipping-address [name='telephone']"
        ],
        PRO_WEB_SUBMIT_TRIGGERS: [
            {
                type: "click",
                preventDefault: true,
                element: ".continue.primary"
            }
        ],
        PRO_WEB_CALLBACK: function (target, event) {
            shippingEdqConfig.PRO_WEB_MAPPING.forEach(function (map) { return document.querySelector(map.selector).dispatchEvent(new Event("change")); });
            target.dispatchEvent(event);
        },
        PRO_WEB_TIMEOUT: 2500,
        PRO_WEB_LAYOUT: 'Database layout',
        PRO_WEB_COUNTRY: 'USA',
        PRO_WEB_MAPPING: [
            {
                selector: ".form-shipping-address [name='street[0]']",
                addressLines: [0],
                separator: ' ',
                modalFieldSelector: '#interaction-address--original-address-line-one',
            },
            {
                selector: ".form-shipping-address [name='street[1]']",
                addressLines: [1],
                separator: '',
                modalFieldSelector: '#interaction-address--original-address-line-two',
            },
            {
                selector: ".form-shipping-address [name='city']",
                addressLines: [3],
                separator: '',
                modalFieldSelector: '#interaction-address--original-locality',
            },
            {
                selector: ".form-shipping-address [name='region_id']",
                addressLines: [4],
                transformation: function (e) {
                    var textValue = e.options[e.selectedIndex].innerText;
                    if (textValue === "Please select a region, state or province.") {
                        textValue = "";
                    }
                    return textValue;
                },
                separator: '',
                modalFieldSelector: '#interaction-address--original-province',
            },
            {
                selector: ".form-shipping-address [name='postcode']",
                addressLines: [5],
                separator: '-',
                modalFieldSelector: '#interaction-address--original-postal-code',
            },
        ],
        GLOBAL_INTUITIVE_ELEMENT: ".form-shipping-address [name='street[0]']",
        GLOBAL_INTUITIVE_CALLBACK: function () {
            shippingEdqConfig.GLOBAL_INTUITIVE_MAPPING.forEach(function (map) { return document.querySelector(map.selector).dispatchEvent(new Event("change")); });
        },
        GLOBAL_INTUITIVE_MAPPING: [
            {
                selector: ".form-shipping-address [name='street[0]']",
                elements: ['address.addressLine1'],
            },
            {
                selector: ".form-shipping-address [name='street[1]']",
                elements: ['address.addressLine2']
            },
            {
                selector: ".form-shipping-address [name='city']",
                elements: ['address.locality']
            },
            {
                selector: ".form-shipping-address [name='region_id']",
                elements: ['address.province']
            },
            {
                selector: ".form-shipping-address [name='postcode']",
                elements: ['address.postalCode']
            }
        ]
    };
    var shippingVerificationActivated = false;
    var shippingGlobalIntuitiveActivated = false;
    var shippingEmailValidationActivated = false;
    var shippingPhoneValidationActivated = false;
    var shippingEmail = false;
    var shippingPhone = false;
    var shippingNodeSelector = ".checkout-shipping-address";
    var shippingNodeConfig = { attributes: true, subtree: true, childList: true };
    var shippingObserver = new MutationObserver(function (mutations, observer) {
        if (shippingEmailValidationActivated &&
            shippingVerificationActivated &&
            shippingGlobalIntuitiveActivated &&
            shippingPhoneValidationActivated) {
            observer.disconnect();
        }
        if (!shippingPhoneValidationActivated &&
            !shippingEdqConfig.PHONE_ELEMENTS.map(function (selector) { return Boolean(document.querySelector(selector)); }).includes(false)) {
            try {
                var phoneValidation = new window.PhoneUnicorn(shippingEdqConfig);
                window.shippingEdqConfig = shippingEdqConfig;
                phoneValidation.activateValidation();
                shippingPhoneValidationActivated = true;
            }
            catch (e) {
                // We expect errors like '** is not defined';
                if (["ReferenceError", "TypeError"].indexOf(e.name) === -1) {
                    shippingPhoneValidationActivated = true;
                }
            }
        }
        if (!shippingEmailValidationActivated &&
            !shippingEdqConfig.EMAIL_ELEMENTS.map(function (selector) { return Boolean(document.querySelector(selector)); }).includes(false)) {
            try {
                var emailValidation = new window.EmailUnicorn(shippingEdqConfig);
                window.shippingEdqConfig = shippingEdqConfig;
                emailValidation.activateValidation();
                shippingEmailValidationActivated = true;
            }
            catch (e) {
                if (["ReferenceError", "TypeError"].indexOf(e.name) === -1) {
                    shippingEmailValidationActivated = true;
                }
            }
        }
        if (!shippingVerificationActivated &&
            (!window.isCustomerLoggedIn || document.querySelector(".action-save-address")) &&
            !shippingEdqConfig.PRO_WEB_MAPPING.map(function (mapper) { return Boolean(document.querySelector(mapper.selector)); }).includes(false)) {
            /** On the Magento checkout page, if you're signed in the button you use to create a new address
             * is different. This difference is reflected in changing the submit trigger element here */
            var saveAddressButton = document.querySelector(".action-save-address");
            if (saveAddressButton) {
                shippingEdqConfig.PRO_WEB_SUBMIT_TRIGGERS[0].element = ".action-save-address";
            }
            try {
                var shippingVerification = new window.VerificationUnicorn(shippingEdqConfig);
                window.shippingEdqConfig = shippingEdqConfig;
                shippingVerification.activateValidation();
                shippingVerificationActivated = true;
            }
            catch (e) {
                if (["ReferenceError", "TypeError"].indexOf(e.name) === -1) {
                    shippingVerificationActivated = true;
                }
            }
        }
        ;
        if (!shippingGlobalIntuitiveActivated &&
            !shippingEdqConfig.GLOBAL_INTUITIVE_MAPPING.map(function (mapper) { return Boolean(document.querySelector(mapper.selector)); }).includes(false)) {
            try {
                var shippingGlobalIntuitive = new window.GlobalIntuitiveUnicorn(shippingEdqConfig);
                window.shippingEdqConfig = shippingEdqConfig;
                shippingGlobalIntuitive.activateValidation();
                shippingGlobalIntuitiveActivated = true;
            }
            catch (e) {
                if (["ReferenceError", "TypeError"].indexOf(e.name) === -1) {
                    shippingGlobalIntuitiveActivated = true;
                }
            }
        }
        ;
    });
    var billingEdqConfig = {
        PHONE_ELEMENTS: [
            "#co-payment-form [name='telephone']"
        ],
        PRO_WEB_SUBMIT_TRIGGERS: [
            {
                type: "click",
                preventDefault: true,
                element: "#co-payment-form .action-update"
            }
        ],
        PRO_WEB_CALLBACK: function (target, event) {
            // TODO: This isn't the best thing to do here since we're referring to a
            // variable that's ultimately referring to itself.
            billingEdqConfig.PRO_WEB_MAPPING.forEach(function (map) { return document.querySelector(map.selector).dispatchEvent(new Event("change")); });
            target.dispatchEvent(event);
        },
        PRO_WEB_TIMEOUT: 2500,
        PRO_WEB_LAYOUT: 'Database layout',
        PRO_WEB_COUNTRY: 'USA',
        PRO_WEB_SHOULD_SUBMIT: function () {
            var selectedAddress = document.querySelector("[name='billing_address_id']");
            if (!selectedAddress) {
                return true;
            }
            if (selectedAddress[selectedAddress.selectedIndex].innerText === "New Address") {
                return true;
            }
            return false;
        },
        PRO_WEB_MAPPING: [
            {
                selector: "#co-payment-form [name='street[0]']",
                addressLines: [0],
                separator: ' ',
                modalFieldSelector: '#interaction-address--original-address-line-one',
            },
            {
                selector: "#co-payment-form [name='street[1]']",
                addressLines: [1],
                separator: '',
                modalFieldSelector: '#interaction-address--original-address-line-two',
            },
            {
                selector: "#co-payment-form [name='city']",
                addressLines: [3],
                separator: '',
                modalFieldSelector: '#interaction-address--original-locality',
            },
            {
                selector: "#co-payment-form [name='region_id']",
                addressLines: [4],
                transformation: function (e) {
                    var textValue = e.options[e.selectedIndex].innerText;
                    return textValue;
                },
                separator: '',
                modalFieldSelector: '#interaction-address--original-province',
            },
            {
                selector: "#co-payment-form [name='postcode']",
                addressLines: [5],
                separator: '-',
                modalFieldSelector: '#interaction-address--original-postal-code',
            },
        ],
        GLOBAL_INTUITIVE_ELEMENT: "#co-payment-form [name='street[0]']",
        GLOBAL_INTUITIVE_CALLBACK: function () {
            billingEdqConfig.GLOBAL_INTUITIVE_MAPPING.forEach(function (map) { return document.querySelector(map.selector).dispatchEvent(new Event("change")); });
        },
        GLOBAL_INTUITIVE_MAPPING: [
            {
                selector: "#co-payment-form [name='street[0]']",
                elements: ['address.addressLine1'],
            },
            {
                selector: "#co-payment-form [name='street[1]']",
                elements: ['address.addressLine2']
            },
            {
                selector: "#co-payment-form [name='city']",
                elements: ['address.locality']
            },
            {
                selector: "#co-payment-form [name='region_id']",
                elements: ['address.province']
            },
            {
                selector: "#co-payment-form [name='postcode']",
                elements: ['address.postalCode']
            }
        ]
    };
    var billingVerificationActivated = false;
    var billingGlobalIntuitiveActivated = false;
    var billingPhoneValidateActivated = false;
    var billingNodeSelector = ".checkout-billing-address";
    var billingNodeConfig = { attributes: true, subtree: true, childList: true };
    var billingObserver = new MutationObserver(function (mutations, observer) {
        if (billingVerificationActivated &&
            billingGlobalIntuitiveActivated &&
            billingPhoneValidateActivated) {
            observer.disconnect();
        }
        if (!billingPhoneValidateActivated &&
            !billingEdqConfig.PHONE_ELEMENTS.map(function (selector) { return Boolean(selector); }).includes(false)) {
            try {
                var billingPhone = new window.PhoneUnicorn(billingEdqConfig);
                window.billingEdqConfig = billingEdqConfig;
                billingPhone.activateValidation();
                billingPhoneValidateActivated = true;
            }
            catch (e) {
                if (["ReferenceError", "TypeError"].indexOf(e.name) === -1) {
                    billingPhoneValidateActivated = true;
                }
            }
        }
        /** Add Verificaiton Address */
        if (!billingVerificationActivated &&
            !billingEdqConfig.PRO_WEB_MAPPING.map(function (mapper) { return Boolean(document.querySelector(mapper.selector)); }).includes(false) &&
            !billingEdqConfig.PRO_WEB_SUBMIT_TRIGGERS.map(function (mapper) { return Boolean(document.querySelector(mapper.element)); }).includes(false)) {
            try {
                var billingVerification = new window.VerificationUnicorn(billingEdqConfig);
                window.billingEdqConfig = billingEdqConfig;
                billingVerification.activateValidation();
                billingVerificationActivated = true;
            }
            catch (e) {
                if (["ReferenceError", "TypeError"].indexOf(e.name) === -1) {
                    billingVerificationActivated = true;
                }
            }
        }
        ;
        if (!billingGlobalIntuitiveActivated &&
            !billingEdqConfig.GLOBAL_INTUITIVE_MAPPING.map(function (mapper) { return Boolean(document.querySelector(mapper.selector)); }).includes(false)) {
            try {
                var billingGlobalIntuitive = new window.GlobalIntuitiveUnicorn(billingEdqConfig);
                window.billingEdqConfig = billingEdqConfig;
                billingGlobalIntuitive.activateValidation();
                billingGlobalIntuitiveActivated = true;
            }
            catch (e) {
                if (["ReferenceError", "TypeError"].indexOf(e.name) === -1) {
                    billingGlobalIntuitiveActivated = true;
                }
            }
        }
        ;
    });
    var loadingNode = document.querySelector(".checkout-container");
    var loadingNodeConfig = { attributes: true, subtree: true, childList: true };
    var loadingObserver = new MutationObserver(function (mutations, observer) {
        var loadingMask = document.querySelector(".loading-mask");
        if (!loadingMask || loadingMask.style.display === "none") {
            document.body.appendChild(edqScript);
            shippingObserver.observe(document.querySelector("#checkout-step-shipping"), shippingNodeConfig);
            billingObserver.observe(document.querySelector("#co-payment-form"), billingNodeConfig);
            observer.disconnect();
        }
        ;
    });
    loadingObserver.observe(loadingNode, loadingNodeConfig);
})(CheckoutOnepage || (CheckoutOnepage = {}));
//# sourceMappingURL=onepage.js.map