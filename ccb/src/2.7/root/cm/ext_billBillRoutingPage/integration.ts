import { createAssets } from "utils/functions/create-assets";

let currentElement = document.getElementById("edq-2.7-root-cm-ext_billBillRoutingPage");

let interval = setInterval(function() {
  if (document.getElementById("BILL_RTG$ADDRESS1")) {
    clearInterval(interval);

    try {
      if (!parent.window.EdqConfig) {
        (parent.window.EdqConfig as any) = {}
      } 
    } catch(e) {
      (parent.window.EdqConfig as any) = {};
    }

    window.EdqConfig = Object.assign(parent.window.EdqConfig, {
      GLOBAL_INTUITIVE_NO_SAVED_TARGET: true,
      NO_SAVED_TARGET: true,
      PRO_WEB_COUNTRY: "USA",
      PRO_WEB_CALLBACK: function(savedTarget, newEvent) {
        (parent as any).doClose();
        (parent as any).doSave();
      }
    });

    // Add EDQ Validate button for mailing address
    (function() {
      let el = document.createElement("input");
      el.className = "oraButton uiMargin";
      el.tabIndex = 5;
      el.type = "button";
      el.id = "edq-validate-premise-address";
      el.value = "EDQ Validate";
      el.title = "EDQ Validate";
      document.getElementById("BILL_RTG$C1_VAL_ADDR_SW").parentElement.appendChild(el);
    })();
    
    const config = Object.assign({
      PRO_WEB_TYPEDOWN_TRIGGER: document.getElementById("BILL_RTG$ADDRESS1"),
      PRO_WEB_SUBMIT_TRIGGERS: [
        {
          type: 'click',
          element: document.getElementById('edq-validate-premise-address'),
        }
      ],

      PRO_WEB_COUNTRY: 'USA',
      PRO_WEB_MAPPING: [
        {
          field: document.getElementById("BILL_RTG$ADDRESS1"),
          elements: ['Primary number', 'Street'],
          separator: ' ',
          typedownFieldSelector: '#typedown-final--address-line-one',
          modalFieldSelector: '#interaction-address--original-address-line-one',
        },

        {
          field: document.getElementById("BILL_RTG$ADDRESS2"),
          elements: ['Secondary number'],
          separator: '',
          typedownFieldSelector: '#typedown-final--address-line-two',
          modalFieldSelector: '#interaction-address--original-address-line-two',
        },

        {
          field: document.getElementById('BILL_RTG$CITY'),
          elements: ['City name'],
          separator: '',
          typedownFieldSelector: '#typedown-final--city',
          modalFieldSelector: '#interaction-address--original-locality',
        },

        {
          field: document.getElementById('BILL_RTG$STATE'),
          elements: ['State code'],
          separator: '',
          typedownFieldSelector: '#typedown-final--state',
          modalFieldSelector: '#interaction-address--original-province',
        },
        {
          field: document.getElementById('BILL_RTG$POSTAL'),
          elements: ['ZIP Code', '+4 code'],
          separator: '-',
          typedownFieldSelector: '#typedown-final--postal-code',
          modalFieldSelector: '#interaction-address--original-postal-code',
        },

        {
          field: document.getElementById('BILL_RTG$COUNTY'),
          elements: ['County name'],
          separator: ' ',
          typedownFieldSelector: '#typedown-final--county',
          modalFieldSelector: '#interaction-address--original-postal-code',
        }
      ],

      GLOBAL_INTUITIVE_ELEMENT: document.getElementById("BILL_RTG$ADDRESS1"),
      GLOBAL_INTUITIVE_MAPPING: [
        {
          field: document.getElementById("BILL_RTG$ADDRESS1"),
          elements: ["address.addressLine1"]
        },

        {
          field: document.getElementById("BILL_RTG$ADDRESS2"),
          elements: ["address.addressLine2"]
        },

        {
          field: document.getElementById('BILL_RTG$CITY'),
          elements: ["address.locality"]
        },

        {
          field: document.getElementById('BILL_RTG$STATE'),
          elements: ['address.province']
        },
        {
          field: document.getElementById('BILL_RTG$POSTAL'),
          elements: ["address.postalCode"]
        },

        {
          field: document.getElementById('BILL_RTG$COUNTY'),
          elements: ["components.county1"]
        }
      ]
    }, window.EdqConfig);

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
        PRO_WEB_LAYOUT: "Database layout",
      });
    };

    createAssets({
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
        typedown: function() {
          let typedown: any = new window.TypedownUnicorn(config);
          typedown.activateValidation();
        },

        verification: function() {
          // One option is to build an object of pages where
          // the integration has been loaded into. So in this case
          // each page would indicate the URL where it was created in
          // and load its own data into that particular spot

          let verification: any = new window.VerificationUnicorn(config);
          verification.activateValidation();

          if (!parent.window.edqLoaded) {
            parent.window.edqLoaded = {};
          }

          parent.window.edqLoaded[document.location.href] = true;
        },

        globalIntuitive: function() {
          let globalIntuitive: any = new window.GlobalIntuitiveUnicorn(config);
          globalIntuitive.activateValidation();
        }
      }
    }); 
  }
}, 1000);
