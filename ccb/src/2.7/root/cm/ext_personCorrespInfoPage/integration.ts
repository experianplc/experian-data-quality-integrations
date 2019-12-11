import { createAssets } from "utils/functions/create-assets";

let currentElement = document.getElementById("edq-2.7-root-cm-ext_personCorrespInfoPage");

let interval = setInterval(function() {
  let complete = document.readyState === "complete";
  let notLoading = document.readyState !== "loading";

  if (complete && notLoading) {
    clearInterval(interval);

    let seasonalSettings = { 
      GLOBAL_INTUITIVE_MAPPING: [
        { field: window.document.getElementById("SEAS_ADDR$ADDRESS1"), elements: ["address.addressLine1"] },
        { field: window.document.getElementById("SEAS_ADDR$ADDRESS2"), elements: ["address.addressLine2"] },
        { field: window.document.getElementById("SEAS_ADDR$CITY"), elements: ["address.locality"] },
        { field: window.document.getElementById("SEAS_ADDR$STATE"), elements: ["address.province"] },
        { field: window.document.getElementById("SEAS_ADDR$POSTAL"), elements: ["address.postalCode"] },
        { field: window.document.getElementById("SEAS_ADDR$COUNTY"), elements: ["components.county1"] }
      ],

      PRO_WEB_MAPPING: [
        {
          field: window.document.getElementById('SEAS_ADDR$ADDRESS1'),
          elements: ['AddressLine1'],
          separator: '',
          modalFieldSelector: '#interaction-address--original-address-line-one',
        },

        {
          field: window.document.getElementById('SEAS_ADDR$ADDRESS2'),
          elements: ['AddressLine2'],
          separator: '',
          modalFieldSelector: '#interaction-address--original-address-line-two',
        },

        {
          field: window.document.getElementById('SEAS_ADDR$CITY'),
          elements: ['CityLocality'],
          separator: '',
          modalFieldSelector: '#interaction-address--original-locality',
        },

        {
          field: window.document.getElementById('SEAS_ADDR$STATE'),
          elements: ['StateProvince'],
          separator: '',
          modalFieldSelector: '#interaction-address--original-province',
        },

        {
          field: window.document.getElementById('SEAS_ADDR$POSTAL'),
          elements: ['PostalCode', "+4 Code"],
          separator: ' ',
          modalFieldSelector: '#interaction-address--original-postal-code',
        },

        {
          field: window.document.getElementById('SEAS_ADDR$COUNTY'),
          elements: ['County'],
          separator: ' ',
          modalFieldSelector: '#interaction-address--original-postal-code',
        },

      ]
    };

    let mailingSettings = { 
      GLOBAL_INTUITIVE_MAPPING: [
        { field: window.document.getElementById("ADDRESS1"), elements: ["address.addressLine1"] },
        { field: window.document.getElementById("ADDRESS2"), elements: ["address.addressLine2"] },
        { field: window.document.getElementById("CITY"), elements: ["address.locality"] },
        { field: window.document.getElementById("STATE"), elements: ["address.province"] },
        { field: window.document.getElementById("POSTAL"), elements: ["address.postalCode"] },
        { field: window.document.getElementById("COUNTY"), elements: ["components.county1"] },
      ],

      PRO_WEB_MAPPING: [
        {
          field: window.document.getElementById('ADDRESS1'),
          elements: ['AddressLine1'],
          separator: '',
          modalFieldSelector: '#interaction-address--original-address-line-one',
        },

        {
          field: window.document.getElementById('ADDRESS2'),
          elements: ['AddressLine2'],
          separator: '',
          modalFieldSelector: '#interaction-address--original-address-line-two',
        },

        {
          field: window.document.getElementById('CITY'),
          elements: ['CityLocality'],
          separator: '',
          modalFieldSelector: '#interaction-address--original-locality',
        },

        {
          field: window.document.getElementById('STATE'),
          elements: ['StateProvince'],
          separator: '',
          modalFieldSelector: '#interaction-address--original-province',
        },

        {
          field: window.document.getElementById('POSTAL'),
          elements: ['PostalCode', "+4 Code"],
          separator: ' ',
          modalFieldSelector: '#interaction-address--original-postal-code',
        },

        {
          field: window.document.getElementById('COUNTY'),
          elements: ['County'],
          separator: ' ',
          modalFieldSelector: '#interaction-address--original-postal-code',
        },
      ]
    };

    let trigger = parent.document.getElementById("IM_SAVE");
    window.EdqConfig = Object.assign(parent.window.EdqConfig, {
      PRO_WEB_SUBMIT_TRIGGERS: [
        {
          type: "click",
          element: trigger
        },
      ],
      PRO_WEB_COUNTRY: "USA",
    });

    const mailingInfoSection: HTMLElement = window.document.querySelector("#secRow_2 table");
    const seasonInfoSection: HTMLElement  = window.document.querySelector("#secRow_4 table");

    const proWebUseTypedown = parent.window.EdqConfig.PRO_WEB_USE_TYPEDOWN || 
      currentElement.getAttribute("PRO_WEB_USE_TYPEDOWN");


    mailingInfoSection.onclick = function() {
      window.EdqConfig = Object.assign(window.EdqConfig, mailingSettings);

      if (proWebUseTypedown) {
        window.EdqConfig = Object.assign(window.EdqConfig, {
          PRO_WEB_TYPEDOWN_TRIGGER: window.document.getElementById("ADDRESS1")
        });
      }
    };

    seasonInfoSection.onclick = function() {
      window.EdqConfig = Object.assign(window.EdqConfig, seasonalSettings);

      if (proWebUseTypedown) {
        window.EdqConfig = Object.assign(window.EdqConfig, {
          PRO_WEB_TYPEDOWN_TRIGGER: window.document.getElementById("SEAS_ADDR$ADDRESS1")
        });
      }
    }

    const globalIntuitiveAuthToken = 
      parent.window.EdqConfig.GLOBAL_INTUITIVE_AUTH_TOKEN || 
      currentElement.getAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN");

    if (globalIntuitiveAuthToken) {
      window.EdqConfig = Object.assign(window.EdqConfig, {
        GLOBAL_INTUITIVE_AUTH_TOKEN: globalIntuitiveAuthToken
      });
    }

    const proWebAuthToken = 
      parent.window.EdqConfig.PRO_WEB_AUTH_TOKEN ||
      currentElement.getAttribute("PRO_WEB_AUTH_TOKEN");

    const proWebServiceUrl = 
      parent.window.EdqConfig.PRO_WEB_SERVICE_URL ||
      currentElement.getAttribute("PRO_WEB_SERVICE_URL");

    const soapActionUrl = 
      parent.window.EdqConfig.SOAP_ACTION_URL || 
      currentElement.getAttribute("SOAP_ACTION_URL") || 
      "http://www.qas.com/web-2013-12";    

    if (proWebAuthToken) {
      window.EdqConfig = Object.assign(window.EdqConfig, {
        PRO_WEB_AUTH_TOKEN: proWebAuthToken,
        PRO_WEB_LAYOUT: "AllElements",
      });
    } else if (proWebServiceUrl && soapActionUrl) {
      window.EdqConfig = Object.assign(window.EdqConfig, {
        PRO_WEB_SERVICE_URL: proWebServiceUrl,
        SOAP_ACTION_URL: soapActionUrl,
        PRO_WEB_LAYOUT: "Peoplesoft",
      });
    };

    createAssets({
      currentElement: currentElement, 
      overrides: {
        PRO_WEB_SERVICE_URL: parent.window.EdqConfig.PRO_WEB_SERVICE_URL,
        PRO_WEB_AUTH_TOKEN: parent.window.EdqConfig.PRO_WEB_AUTH_TOKEN,
        SOAP_ACTION_URL: parent.window.EdqConfig.SOAP_ACTION_URL,
        GLOBAL_INTUITIVE_AUTH_TOKEN: parent.window.EdqConfig.GLOBAL_INTUITIVE_AUTH_TOKEN,
        PRO_WEB_USE_TYPEDOWN: parent.window.EdqConfig.PRO_WEB_USE_TYPEDOWN,
        PRO_WEB_STYLESHEET: parent.window.EdqConfig.PRO_WEB_STYLESHEET,
        PRO_WEB_VERIFICATION_URL: parent.window.EdqConfig.PRO_WEB_VERIFICATION_URL,
        PRO_WEB_TYPEDOWN_URL: parent.window.EdqConfig.PRO_WEB_TYPEDOWN_URL,
        PRO_WEB_EDQ_URL: parent.window.EdqConfig.PRO_WEB_EDQ_URL,
        GLOBAL_INTUITIVE_URL: parent.window.EdqConfig.GLOBAL_INTUITIVE_URL,
      },
      callbacks: {
        globalIntuitive: function() {
          window.EDQ.address.globalIntuitive.activateValidation(
            document.getElementById("ADDRESS1")
          );

          window.EDQ.address.globalIntuitive.activateValidation(
            document.getElementById("SEAS_ADDR$ADDRESS1")
          );
        }
      }
    }); 
  }
}, 1000);

