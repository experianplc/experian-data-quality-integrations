import { createAssets } from "utils/functions/create-assets";
import polyfills from "utils/functions/polyfills";

// Add all polyfills
polyfills();

let currentElement = document.getElementById("edq-9.2-cs-pages-EO_ADDR_USA_SEC");

let interval = setInterval(function() {
  if (document.getElementById("DERIVED_ADDRESS_ADDRESS1") !== null) {
    clearInterval(interval);

    let trigger: any = document.getElementById("DERIVED_ADDRESS_OK_PB");

    window.EdqConfig = {
      PRO_WEB_LAYOUT: "Database layout",
      PRO_WEB_SUBMIT_TRIGGERS: [
        {
          type: "click",
          element: trigger
        },
      ],
      PRO_WEB_COUNTRY: "USA",
      PRO_WEB_MAPPING: [
        {
          selector: "#DERIVED_ADDRESS_ADDRESS1",
          addressLines: [0],
          separator: " ",
          modalFieldSelector: "#interaction-address--original-address-line-one",
          typedownFieldSelector: "#typedown-final--address-line-one"
        },
        {
          selector: "#DERIVED_ADDRESS_ADDRESS2",
          addressLines: [1],
          separator: "",
          modalFieldSelector: "#interaction-address--original-address-line-two",
          typedownFieldSelector: "#typedown-final--address-line-two"
        },
        {
          selector: "#DERIVED_ADDRESS_CITY",
          addressLines: [3],
          separator: "",
          modalFieldSelector: "#interaction-address--original-locality",
          typedownFieldSelector: "#typedown-final--city"
        },
        {
          selector: "#DERIVED_ADDRESS_STATE",
          addressLines: [4],
          separator: "",
          modalFieldSelector: "#interaction-address--original-province",
          typedownFieldSelector: "#typedown-final--state"
        },
        {
          selector: "#DERIVED_ADDRESS_POSTAL",
          addressLines: [5],
          separator: "-",
          modalFieldSelector: "#interaction-address--original-postal-code",
          typedownFieldSelector: "#typedown-final--postal-code"
        }
      ],

      GLOBAL_INTUITIVE_ELEMENT: document.getElementById("DERIVED_ADDRESS_ADDRESS1"),
      GLOBAL_INTUITIVE_MAPPING: [
        {
          selector: "#DERIVED_ADDRESS_ADDRESS1",
          elements: ["address.addressLine1"]
        },
        {
          selector: "#DERIVED_ADDRESS_ADDRESS2",
          elements: ["address.addressLine2"],
        },
        {
          selector: "#DERIVED_ADDRESS_CITY",
          elements: ["address.locality"]
        },
        {
          selector: "#DERIVED_ADDRESS_STATE",
          elements: ["address.province"]
        },
        {
          selector: "#DERIVED_ADDRESS_POSTAL",
          elements: ["address.postalCode"]
        },
        {
          selector: "#DERIVED_ADDRESS_COUNTY",
          elements: ["components.county1"]
        },
      ]
    };

    const proWebUseTypedown = currentElement.getAttribute("PRO_WEB_USE_TYPEDOWN");
    if (proWebUseTypedown && !window.EdqConfig.PRO_WEB_TYPEDOWN_TRIGGER) {
      window.EdqConfig["PRO_WEB_TYPEDOWN_TRIGGER"] = document.getElementById("DERIVED_ADDRESS_ADDRESS1");
    }

    const globalIntuitiveAuthToken = currentElement.getAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN");
    if (globalIntuitiveAuthToken && !window.EdqConfig.GLOBAL_INTUITIVE_AUTH_TOKEN) {
      window.EdqConfig["GLOBAL_INTUITIVE_AUTH_TOKEN"] = globalIntuitiveAuthToken;
    }

    const proWebAuthToken = currentElement.getAttribute("PRO_WEB_AUTH_TOKEN");
    const proWebServiceUrl = currentElement.getAttribute("PRO_WEB_SERVICE_URL");
    const soapActionUrl = currentElement.getAttribute("SOAP_ACTION_URL") || "http://www.qas.com/web-2013-12";

    if (proWebAuthToken) {
      window.EdqConfig["PRO_WEB_AUTH_TOKEN"] = proWebAuthToken;

    } else if (proWebServiceUrl && soapActionUrl) {
      window.EdqConfig["PRO_WEB_SERVICE_URL"] = proWebServiceUrl;
      window.EdqConfig["SOAP_ACTION_URL"] = soapActionUrl;
    };

    /*
     * Any overrides to any item in the configuration can be included here. 
     */
    Object.assign(window.EdqConfig, window.EdqConfigOverride()); 
    createAssets({currentElement});
  }
}, 1000);
