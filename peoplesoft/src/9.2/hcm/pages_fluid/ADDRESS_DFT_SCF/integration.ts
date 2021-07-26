import { createAssets } from "utils/functions/create-assets";

let currentElement = document.getElementById("edq-9.2-hcm-pages_fluid-ADDRESS_DFT_SCF");

let interval = setInterval(function() {
  if (document.getElementById("ADDRESS1") !== null){
    clearInterval(interval);

    /*
        By default PeopleSoft's Save button is embedded in the href
        rather than as an onclick event. This means we have to employ
        the change shown below in order to make sure that after
        saving the original event is called.
     */
    let trigger: HTMLAnchorElement = (document.getElementById("DERIVED_ADDR_FL_SAVE_PB") as HTMLAnchorElement);
    let href: string = trigger.href.repeat(1);

    let execute: any = function() {
      eval(href);
      return false;
    }

    trigger.onclick = execute;
    trigger.href = "#";

    window.EdqConfig = {
      PRO_WEB_SUBMIT_TRIGGERS: [
        {
          type: "click",
          element: trigger
        },
      ],
      PRO_WEB_COUNTRY: "USA",
      PRO_WEB_MAPPING: [
        {
          field: document.getElementById("ADDRESS1"),
          elements: ["Primary number", "Street"],
          separator: " ",
          modalFieldSelector: "#interaction-address--original-address-line-one",
          typedownFieldSelector: "#typedown-final--address-line-one"
        },
        {
          field: document.getElementById("ADDRESS2"),
          elements: ["Secondary number"],
          separator: "",
          modalFieldSelector: "#interaction-address--original-address-line-two",
          typedownFieldSelector: "#typedown-final--address-line-two"
        },
        {
          field: document.getElementById("CITY"),
          elements: ["City name"],
          separator: "",
          modalFieldSelector: "#interaction-address--original-locality",
          typedownFieldSelector: "#typedown-final--city"
        },
        {
          field: document.getElementById("DESCR_STATE"),
          elements: ["State name"],
          separator: "",
          modalFieldSelector: "#interaction-address--original-province",
          typedownFieldSelector: "#typedown-final--state"
        },
        {
          field: document.getElementById("POSTAL"),
          elements: ["ZIP Code", "+4 code"],
          separator: "-",
          modalFieldSelector: "#interaction-address--original-postal-code",
          typedownFieldSelector: "#typedown-final--postal-code"
        },
        {
          field: document.getElementById("COUNTY"),
          elements: ["County name"],
          separator: "",
          modalFieldSelector: "#"
        },
      ],

      GLOBAL_INTUITIVE_ELEMENT: document.getElementById("ADDRESS1"),
      GLOBAL_INTUITIVE_MAPPING: [
        { field: document.getElementById("ADDRESS1"), elements: ["address.addressLine1"] },
        { field: document.getElementById("ADDRESS2"), elements: ["address.addressLine2"] },
        { field: document.getElementById("CITY"), elements: ["address.locality"] },
        { field: document.getElementById("DESCR_STATE"), elements: ["address.province"] },
        { field: document.getElementById("POSTAL"), elements: ["address.postalCode"] },
        { field: document.getElementById("COUNTY"), elements: ["components.county1"] },
      ]
    };

    const proWebUseTypedown: string = currentElement.getAttribute("PRO_WEB_USE_TYPEDOWN");
    if (proWebUseTypedown) {
      window.EdqConfig["PRO_WEB_TYPEDOWN_TRIGGER"] = document.getElementById("ADDRESS1");
    }

    const globalIntuitiveAuthToken: string = currentElement.getAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN");
    if (globalIntuitiveAuthToken) {
      window.EdqConfig["GLOBAL_INTUITIVE_AUTH_TOKEN"] = globalIntuitiveAuthToken;
    }

    const proWebAuthToken: string = currentElement.getAttribute("PRO_WEB_AUTH_TOKEN");
    const proWebServiceUrl: string = currentElement.getAttribute("PRO_WEB_SERVICE_URL");
    const soapActionUrl: string = currentElement.getAttribute("SOAP_ACTION_URL") || "http://www.qas.com/web-2013-12";    
    if (proWebAuthToken) {
      window.EdqConfig["PRO_WEB_AUTH_TOKEN"] = proWebAuthToken;
      window.EdqConfig["PRO_WEB_LAYOUT"] = "AllElements";

    } else if (proWebServiceUrl && soapActionUrl) {
      window.EdqConfig["PRO_WEB_SERVICE_URL"] = proWebServiceUrl;
      window.EdqConfig["SOAP_ACTION_URL"] = soapActionUrl;
      window.EdqConfig["PRO_WEB_LAYOUT"] = "Peoplesoft";
    };

    createAssets({currentElement}); 
  }
}, 1000);
