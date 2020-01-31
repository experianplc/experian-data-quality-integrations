import { createAssets } from "utils/functions/create-assets";
import { countryToIso3 } from "utils/functions/country-to-iso3";

let currentElement = document.getElementById("edq-9.2-cs-pages_fluid-SCC_ADDRESS_SCF");

/*
 * Update the EdqConfig configuration object based on the specific country.
 * The country configuration can be loaded from files or manually input by a user. 
 * By default country information is loaded from Azure.
 */
function setEdqConfigForCountry(iso3Country: string): void {
  // Try to load from localStorage
  if (!window.countries[iso3Country]) { 
    try {
      window.countries[iso3Country] = JSON.parse(localStorage.getItem(`edq-SCC_ADDRESS_SCF-${iso3Country}`));
      console.log(`EDQ Configuration for ${iso3Country} loaded from memory`);
    } catch(e) {
    }
  }

  // Load Pro web related changes
  try { 
    window.EdqConfig["PRO_WEB_SUBMIT_TRIGGERS"] = window.countries[iso3Country]["PRO_WEB_SUBMIT_TRIGGERS"];
    window.EdqConfig["PRO_WEB_COUNTRY"] = window.countries[iso3Country]["PRO_WEB_COUNTRY"];
    window.EdqConfig["PRO_WEB_TYPEDOWN_TRIGGER"] = window.countries[iso3Country]["PRO_WEB_COUNTRY"];
    window.EdqConfig["PRO_WEB_CALLBACK"] = window.countries[iso3Country]["PRO_WEB_CALLBACK"];

    window.EdqConfig["PRO_WEB_TYPEDOWN_TRIGGER"] = window.countries[iso3Country]["PRO_WEB_TYPEDOWN_TRIGGER"];
    if (window.EdqConfig["PRO_WEB_AUTH_TOKEN"] && window.countries[iso3Country]["PRO_WEB_ON_DEMAND_MAPPING"]) {
      window.EdqConfig["PRO_WEB_MAPPING"] = window.countries[iso3Country]["PRO_WEB_ON_DEMAND_MAPPING"];
    } else {
      window.EdqConfig["PRO_WEB_MAPPING"] = window.countries[iso3Country]["PRO_WEB_MAPPING"];
    }
  } catch(e) {
    console.log(`Pro Web support not available for ${iso3Country}`);
  }

  // Global Intuitive 
  try {
    window.EdqConfig["GLOBAL_INTUITIVE_ISO3_COUNTRY"] = window.countries[iso3Country]["GLOBAL_INTUITIVE_ISO3_COUNTRY"];
    window.EdqConfig["GLOBAL_INTUITIVE_MAPPING"] = window.countries[iso3Country]["GLOBAL_INTUITIVE_MAPPING"];
    window.EdqConfig["GLOBAL_INTUITIVE_CALLBACK"] = window.countries[iso3Country]["GLOBAL_INTUITIVE_CALLBACK"];
  } catch(e) {
    console.log(`Global Intuitive support not available for ${iso3Country}`);
  }
}

function getTypedownElement(edqConfig: object): HTMLElement {
  if (edqConfig["PRO_WEB_TYPEDOWN_TRIGGER"]) {
    let selector: HTMLElement;
    if (typeof(window.EdqConfig["PRO_WEB_TYPEDOWN_TRIGGER"]) === "string") {
      return document.querySelector(window.EdqConfig["PRO_WEB_TYPEDOWN_TRIGGER"]);
    } else {
      return window.EdqConfig["PRO_WEB_TYPEDOWN_TRIGGER"];
    }
  }
}

function removeTypedownIntegration(typedownElement: HTMLElement): void {
  try {
    typedownElement.onclick = null;
    typedownElement.setAttribute("onclick", null);
  } catch(e) {}
}

function getGlobalIntuitiveElement(edqConfig: object): HTMLElement {
  if (edqConfig["GLOBAL_INTUITIVE_ELEMENT"]) {
    if (typeof(edqConfig["GLOBAL_INTUITIVE_ELEMENT"]) === "string") {
      return document.querySelector(edqConfig["GLOBAL_INTUITIVE_ELEMENT"]);
    } else {
      return edqConfig["GLOBAL_INTUITIVE_ELEMENT"];
    }
  }
}

function removeGlobalIntuitiveIntegration(globalIntuitiveElement: any): void {
  try {
    globalIntuitiveElement.removeEventListener("keyup", globalIntuitiveElement.keyupHandler);
    globalIntuitiveElement.removeEventListener("keydown", globalIntuitiveElement.keydownHandler);
  } catch(e) {}
}

/*
 * Loads the country data
 */
function loadConfigurationForCountry(iso3Country: string, onload: any): void {
  let countryScript = document.createElement("script");
  countryScript.src = `https://edqprofservus.blob.core.windows.net/peoplesoft/9.2/cs/pages_fluid/SCC_ADDRESS_SCF/${iso3Country}.js`;
  countryScript.onload = function() {
    console.log(`${iso3Country} settings loaded from Experian`);
    localStorage.setItem(`edq-SCC_ADDRESS_SCF-${iso3Country}`, JSON.stringify(window.countries[iso3Country]));
    onload();
  }

  document.body.appendChild(countryScript);
}

let interval = setInterval(function() {
  if (document.getElementById("DERIVED_ADDRESS_ADDRESS1") !== null) {
    clearInterval(interval);

    /*
     * When the form changes, check to see if the country changed. If so,
     * update the EdqConfig
     */
    let formObserver = new MutationObserver(function(mutationsList, observer) { 
      for (let mutation of mutationsList) { 
        if (mutation.type === "childList") { 
          // End it if the country did not change
          const country = (document.getElementById("SCC_CNT_ADFMTVW_DESCR") as HTMLInputElement).value;
          const iso3Country = countryToIso3(country);

          // The country is not supported if we don't have a mapping
          if (!iso3Country) {
            // Remove all integrations
            removeTypedownIntegration(getTypedownElement(window.EdqConfig));
            removeGlobalIntuitiveIntegration(getGlobalIntuitiveElement(window.EdqConfig));
            console.log(`The country ${iso3Country} is currently not supported`);
            return;
          }

          if (iso3Country === window.EdqConfig.PRO_WEB_COUNTRY || 
            iso3Country === window.EdqConfig.GLOBAL_INTUITIVE_ISO3_COUNTRY) {
            return;
          } else {
            // Reset configuration
            if (window.countries[iso3Country] || localStorage.getItem(`edq-SCC_ADDRESS_SCF-${iso3Country}`)) {
              setEdqConfigForCountry(iso3Country);
            } else { loadConfigurationForCountry(iso3Country, function() {
              setEdqConfigForCountry(iso3Country);
            })}

            // Rebind verification
            window.EDQ.address.proWeb.activateValidation();
            document.querySelectorAll("form .ps-edit").forEach((inputElement) => {
              // PeopleSoft needs each element to be detected as "changed" when saving. =
              // This ensures that for the current window, which is dynamically returned,
              // all form elements are subscribed as 'changed'
              //@ts-ignore
              window[`addchg_${window.winName}`](inputElement) 
            });

            // Rebind global intuitive
            window.EDQ.address.globalIntuitive.activateValidation("#DERIVED_ADDRESS_ADDRESS1");

            // Rebind typedown (if enabled)
            if (window.EdqConfig["PRO_WEB_TYPEDOWN_TRIGGER"]) {
              let selector: HTMLElement = getTypedownElement(window.EdqConfig);
              selector.onclick = window.EDQ.address.proWeb.typedownEventListener;
            }
          }
        } 
      } 
    });

    const config = { childList: true, subtree: true };
    formObserver.observe(document.querySelector("form"), config);

    /*
        By default PeopleSoft's Save button is embedded in the href
        rather than as an onclick event. This means we have to employ
        the change shown below in order to make sure that after
        saving the original event is called.
     */
    let trigger: HTMLAnchorElement = (document.getElementById("SCC_PROF_FL_DRV_SAVE_BTN") as HTMLAnchorElement);

    if (!window.countries) {
      window.countries = {};
    }

    window.countries["USA"] = {
      PRO_WEB_TYPEDOWN_TRIGGER: "#DERIVED_ADDRESS_ADDRESS1",
      PRO_WEB_SUBMIT_TRIGGERS: [
        {
          type: "click",
          element: trigger
        }
      ],
      PRO_WEB_COUNTRY: "USA",
      PRO_WEB_MAPPING: [
        {
          selector: "#DERIVED_ADDRESS_ADDRESS1",
          elements: ["Primary number", "Street"],
          separator: " ",
          modalFieldSelector: "#interaction-address--original-address-line-one",
          typedownFieldSelector: "#typedown-final--address-line-one"
        },
        {
          selector: "#DERIVED_ADDRESS_ADDRESS2",
          elements: ["Secondary number"],
          separator: "",
          modalFieldSelector: "#interaction-address--original-address-line-two",
          typedownFieldSelector: "#typedown-final--address-line-two"
        },
        {
          selector: "input[id^='DERIVED_ADDRESS_CITY']",
          elements: ["City name"],
          separator: "",
          modalFieldSelector: "#interaction-address--original-locality",
          typedownFieldSelector: "#typedown-final--city"
        },
        {
          selector: "#SCC_STATE_FL_VW_DESCR",
          elements: ["State name"],
          separator: "",
          modalFieldSelector: "#interaction-address--original-province",
          typedownFieldSelector: "#typedown-final--state"
        },
        {
          selector: "input[id^='DERIVED_ADDRESS_POSTAL']",
          elements: ["ZIP Code", "+4 code"],
          separator: "-",
          modalFieldSelector: "#interaction-address--original-postal-code",
          typedownFieldSelector: "#typedown-final--postal-code"
        },
        {
          selector: "#DERIVED_ADDRESS_COUNTY",
          elements: ["County name"],
          separator: "",
          modalFieldSelector: "#"
        },
      ],

      GLOBAL_INTUITIVE_ELEMENT: "#DERIVED_ADDRESS_ADDRESS1",
      GLOBAL_INTUITIVE_MAPPING: [
        { selector: "#DERIVED_ADDRESS_ADDRESS1", elements: ["address.addressLine1"] },
        { selector: "#DERIVED_ADDRESS_ADDRESS2", elements: ["address.addressLine2"] },
        { selector: "input[id^='DERIVED_ADDRESS_CITY']", elements: ["address.locality"] },
        { selector: "#SCC_STATE_FL_VW_DESCR", elements: ["address.province"] },
        { selector: "input[id^='DERIVED_ADDRESS_POSTAL']", elements: ["address.postalCode"] },
        { selector: "#DERIVED_ADDRESS_COUNTY", elements: ["components.county1"] },
      ]
    };

    // We want a copy of the original object, not to use the original.
    let defaultEdqConfig = JSON.parse(JSON.stringify(window.countries["USA"]));

    // Makes a copy of the string
    let href = trigger.href.repeat(1);

    // Save the href into the attribute
    // Use the saved href if it exists.
    if (!trigger.getAttribute("edq-href")) {
      trigger.setAttribute("edq-href", href);
    }

    const hrefToEvaluate = trigger.getAttribute("edq-href");

    let execute = function() {
      eval(hrefToEvaluate);
    }

    trigger.onclick = execute;
    trigger.href = "#";


    let initialCountry = (document.getElementById("SCC_CNT_ADFMTVW_DESCR") as HTMLInputElement).value;
    let initialIso3Country = countryToIso3(initialCountry);
    window.EdqConfig = defaultEdqConfig;

    const globalIntuitiveAuthToken = currentElement.getAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN");
    if (globalIntuitiveAuthToken) {
      window.EdqConfig["GLOBAL_INTUITIVE_AUTH_TOKEN"] = globalIntuitiveAuthToken;
    }

    const proWebAuthToken = currentElement.getAttribute("PRO_WEB_AUTH_TOKEN");
    const proWebServiceUrl = currentElement.getAttribute("PRO_WEB_SERVICE_URL");
    const soapActionUrl = currentElement.getAttribute("SOAP_ACTION_URL") || "http://www.qas.com/web-2013-12";    
    if (proWebAuthToken) {
      window.EdqConfig["PRO_WEB_AUTH_TOKEN"] = proWebAuthToken;
      window.EdqConfig["PRO_WEB_LAYOUT"] = "AllElements";

    } else if (proWebServiceUrl && soapActionUrl) {
      window.EdqConfig["PRO_WEB_SERVICE_URL"] = proWebServiceUrl;
      window.EdqConfig["SOAP_ACTION_URL"] = soapActionUrl;
      window.EdqConfig["PRO_WEB_LAYOUT"] = "Peoplesoft";
    };

    /*
     * Customers who want to just handle country configuration themselves can do so by
     * including the window.countries object manually - including using our pre-created files.
     */
    if (currentElement.getAttribute("DISABLE_HOSTED_COUNTRIES")) {
      setEdqConfigForCountry(initialIso3Country);
    } else if (window.countries[initialIso3Country] || localStorage.getItem(`edq-SCC_ADDRESS_SCF-${initialIso3Country}`)) {
      setEdqConfigForCountry(initialIso3Country);
    } else { loadConfigurationForCountry(initialIso3Country, function() {
        setEdqConfigForCountry(initialIso3Country);
      })
    }

   createAssets(currentElement); 
  }
}, 1000);
