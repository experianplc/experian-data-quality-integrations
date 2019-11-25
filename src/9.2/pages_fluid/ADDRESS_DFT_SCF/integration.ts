import { createAssets } from "../../../functions/create-assets";

let currentElement = document.getElementById("edq-9.2-pages_fluid-ADDRESS_DFT_SBF");

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
    let href = trigger.href.repeat(1);

    let execute = function() {
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
        }
      ],
      PRO_WEB_SERVICE_URL: currentElement.getAttribute("PRO_WEB_SERVICE_URL"),
      SOAP_ACTION_URL: currentElement.getAttribute("SOAP_ACTION_URL") || "http://www.qas.com/web-2013-12",
      PRO_WEB_LAYOUT: "Peoplesoft",
      PRO_WEB_COUNTRY: "USA",
      PRO_WEB_MAPPING: [
        {
          field: document.getElementById("ADDRESS1"),
          elements: ["Primary number", "Street"],
          separator: " ",
          modalFieldSelector: "#interaction-address--original-address-line-one",
        },
        {
          field: document.getElementById("ADDRESS2"),
          elements: ["Secondary number"],
          separator: "",
          modalFieldSelector: "#interaction-address--original-address-line-two",
        },
        {
          field: document.getElementById("CITY"),
          elements: ["City name"],
          separator: "",
          modalFieldSelector: "#interaction-address--original-locality",
        },
        {
          field: document.getElementById("DESCR_STATE"),
          elements: ["State name"],
          separator: "",
          modalFieldSelector: "#interaction-address--original-province",
        },
        {
          field: document.getElementById("POSTAL"),
          elements: ["ZIP Code", "+4 code"],
          separator: "-",
          modalFieldSelector: "#interaction-address--original-postal-code",
        },
        {
          field: document.getElementById("COUNTY"),
          elements: ["County name"],
          separator: "",
          modalFieldSelector: "#"
        },
      ],
    };

   createAssets(currentElement); 
  }
}, 1000);
