import { createAssets } from "utils/functions/create-assets";
import { countryToIso3 } from "utils/functions/country-to-iso3";
import loadPollyfills from "utils/functions/polyfills";

loadPollyfills();

let currentElement = document.getElementById("edq-9.2-fscm-pages_fluid-CUST_GENERAL1");

/**
 * Update the EdqConfig configuration object based on the specific country.
 * The country configuration can be loaded from files or manually input by a user.
 * By default country information is loaded from Azure.
 *
 * @param iso3Country - the country in ISO-3 format, e.g. USA for United States
 * @param countryOverride - a function that overrides per
 */
function setEdqConfigForCountry(iso3Country: string, countryOverride?: EdqConfigCountryOverrideFn): void {
  if (!window.EdqCountries[iso3Country]) {
    try {
      window.EdqCountries[iso3Country] = JSON.parse(localStorage.getItem(`edq-9.2-fscm-pages_cluid-CUST_GENERAL1-${iso3Country}`));
      console.log(`EDQ Configuration for ${iso3Country} loaded from memory`);
    } catch(e) {
    }
  }
  Object.assign(window.EdqConfig, window.EdqCountries[iso3Country]);

  // If countryOverride is set, a function named EdqConfigCountryOverride is passed in
  // which returns an object. The result of said object must contain the key associated
  // with the current country. If these conditions are satisfied, overriding is possible.
  if (countryOverride && countryOverride()[iso3Country]) {
    const overrideObject: UnicornObject = countryOverride()[iso3Country];
    Object.assign(window.EdqConfig, overrideObject);
  }
}

/**
 * Returns the Typedown trigger that is set in the EDQ configuration object
 * @param edqConfig - The object containing EDQ integration configuration
 */
function getTypedownElement(edqConfig: UnicornObject): HTMLElement {
  if (edqConfig["PRO_WEB_TYPEDOWN_TRIGGER"]) {
    let selector: HTMLElement;
    if (typeof(window.EdqConfig["PRO_WEB_TYPEDOWN_TRIGGER"]) === "string") {
      return document.querySelector(window.EdqConfig["PRO_WEB_TYPEDOWN_TRIGGER"]);
    } else {
      return window.EdqConfig["PRO_WEB_TYPEDOWN_TRIGGER"];
    }
  }
}

/**
 * Removes Typedown integration
 * @param typedownElement - The element that invokes Typedown on click.
 */
function removeTypedownIntegration(typedownElement: HTMLElement): void {
  try {
    typedownElement.onclick = null;
    typedownElement.setAttribute("onclick", null);
  } catch(e) {}
}

/**
 * Gets the element associated with Global Intuitive
 * @param edqConfig - The object containing integration information
 */
function getGlobalIntuitiveElement(edqConfig: UnicornObject): GlobalIntuitiveElement {
  if (edqConfig["GLOBAL_INTUITIVE_ELEMENT"]) {
    if (typeof(edqConfig["GLOBAL_INTUITIVE_ELEMENT"]) === "string") {
      return document.querySelector(edqConfig["GLOBAL_INTUITIVE_ELEMENT"]);
    } else {
      return edqConfig["GLOBAL_INTUITIVE_ELEMENT"];
    }
  }
}

/**
 * Remove the integration associated with Global Intuitive
 * @param globalIntuitiveElement - The element that invokes Global Intuitive
 */
function removeGlobalIntuitiveIntegration(globalIntuitiveElement: GlobalIntuitiveElement): void {
  try {
    globalIntuitiveElement.removeEventListener("keyup", globalIntuitiveElement.keyupHandler);
    globalIntuitiveElement.removeEventListener("keydown", globalIntuitiveElement.keydownHandler);
  } catch(e) {
  }
}

/**
 * Loads the country data
 *
 * @param iso3Country - The ISO-3 country representation, e.g. USA for United States of America
 * @param onload - The callback called after country loading
 */
function loadConfigurationForCountry(iso3Country: string, onload: any): void {
  let countryScript = document.createElement("script");
  countryScript.src = `https://edqprofservus.blob.core.windows.net/peoplesoft/9.2/fscm/pages_fluid/CUST_GENERAL1/${iso3Country}.js`;
  countryScript.onload = function() {
    console.log(`${iso3Country} settings loaded from Experian`);
    localStorage.setItem(`edq-9.2-fscm-pages_cluid-CUST_GENERAL1-${iso3Country}`, JSON.stringify(window.EdqCountries[iso3Country]));
    onload();
  }

  document.body.appendChild(countryScript);
}

let enableIntegration = function() {
  if (document.querySelector("input[id^='CUST_ADDRESS_ADDRESS1']") !== null) {
    document.getElementById("#ICSave").setAttribute("edq-integration-set", "true");

    clearInterval(interval);

    /*
     * When the form changes, check to see if the country changed. If so,
     * update the EdqConfig
     */
    // Looks like the simplest thing is basically to check to see if the fields exist. If they do,
    // renable the integration by resetting the binding. If they do not, just ignore. 
    let formObserver = new MutationObserver(function(mutationsList, observer) { 
      for (let mutation of mutationsList) { 
        if (mutation.type === "childList" && document.querySelector(window.EdqConfig.PRO_WEB_MAPPING[0].selector)) { 
          // End it if the country did not change
          const country = (document.querySelector("input[id^='CUST_ADDRESS_COUNTRY']") as HTMLInputElement).value;
          const iso3Country = countryToIso3(country);

          // The country is not supported if we don't have a mapping
          if (!iso3Country) {
            // Remove all integrations
            removeTypedownIntegration(getTypedownElement(window.EdqConfig));
            removeGlobalIntuitiveIntegration(getGlobalIntuitiveElement(window.EdqConfig));
            let countryName = (document.querySelector("input[id^='CUST_ADDRESS_COUNTRY']") as HTMLInputElement).value;
            console.log(`The country ${countryName} is currently not supported`);
            return;
          }

          // Reset configuration
          if (window.EdqCountries[iso3Country] || localStorage.getItem(`edq-9.2-fscm-pages_fluid-CUST_GENERAL1-${iso3Country}`)) {
            setEdqConfigForCountry(iso3Country, window.EdqConfigCountryOverride);
          } else { loadConfigurationForCountry(iso3Country, function() {
            setEdqConfigForCountry(iso3Country, window.EdqConfigCountryOverride);
          })}

          // Rebind verification
          if (window.EDQ?.address?.proWeb?.activateValidation) { 
            window.EDQ.address.proWeb.activateValidation();
          }

          document.querySelectorAll("form .ps-edit").forEach((inputElement) => {
            // PeopleSoft needs each element to be detected as "changed" when saving. =
            // This ensures that for the current window, which is dynamically returned,
            // all form elements are subscribed as 'changed'
            //@ts-ignore
            window[`addchg_${window.winName}`](inputElement) 
          });

          // Rebind global intuitive
          if (window.EDQ?.address?.globalIntuitive?.activateValidation) { 
            window.EDQ.address.globalIntuitive.activateValidation("input[id^='CUST_ADDRESS_ADDRESS1']");
          }

          // Rebind typedown (if enabled)
          if (window.EdqConfig["PRO_WEB_TYPEDOWN_TRIGGER"]) {
            let selector: HTMLElement = getTypedownElement(window.EdqConfig);
            selector.onclick = window.EDQ.address.proWeb.typedownEventListener;
          }
        }
      }
    });

    const config = { childList: true, subtree: true };
    formObserver.observe(document.querySelector(".ps_pagecontainer"), config);

    /*
        By default PeopleSoft's Save button is embedded in the href
        rather than as an onclick event. This means we have to employ
        the change shown below in order to make sure that after
        saving the original event is called.
     */
    let triggerSelector: string = "[id='#ICSave']";

    if (!window.EdqCountries) {
      window.EdqCountries = {};
    } 

    window.EdqCountries["USA"] = {
      PRO_WEB_LAYOUT: "Database layout",
      PRO_WEB_TYPEDOWN_TRIGGER: "input[id^='CUST_ADDRESS_ADDRESS1']",
      PRO_WEB_SUBMIT_TRIGGERS: [
        {
          type: "click",
          element: triggerSelector
        }
      ],
      PRO_WEB_COUNTRY: "USA",
      PRO_WEB_MAPPING: [
        {
          selector: "input[id^='CUST_ADDRESS_ADDRESS1']",
          addressLines: [0],
          separator: "",
          modalFieldSelector: "#interaction-address--original-address-line-one",
          typedownFieldSelector: "#typedown-final--address-line-one"
        },
        {
          selector: "input[id^='CUST_ADDRESS_ADDRESS2']",
          addressLines: [1],
          separator: "",
          modalFieldSelector: "#interaction-address--original-address-line-two",
          typedownFieldSelector: "#typedown-final--address-line-two"
        },
        {
          selector: "input[id^='CUST_ADDRESS_CITY']",
          addressLines: [3],
          separator: "",
          modalFieldSelector: "#interaction-address--original-locality",
          typedownFieldSelector: "#typedown-final--city"
        },
        {
          selector: "input[id^='CUST_ADDRESS_STATE']",
          addressLines: [4],
          separator: "",
          modalFieldSelector: "#interaction-address--original-province",
          typedownFieldSelector: "#typedown-final--state"
        },
        {
          selector: "input[id^='CUST_ADDRESS_POSTAL']",
          addressLines: [5],
          separator: "",
          modalFieldSelector: "#interaction-address--original-postal-code",
          typedownFieldSelector: "#typedown-final--postal-code"
        },
        {
          selector: "input[id^='CUST_ADDRESS_COUNTY']",
          addressLines: [6],
          separator: "",
          modalFieldSelector: "#interaction-address--original-postal-code",
          typedownFieldSelector: "#typedown-final--postal-code"
        }

      ],

      GLOBAL_INTUITIVE_ELEMENT: "input[id^='CUST_ADDRESS_ADDRESS1']",
      GLOBAL_INTUITIVE_MAPPING: [
        { 
          selector: "input[id^='CUST_ADDRESS_ADDRESS1']",
          elements: ["address.addressLine1"] 
        },
        { 
          selector: "input[id^='CUST_ADDRESS_ADDRESS2']",
          elements: ["address.addressLine2"] 
        },
        { 
          selector: "input[id^='CUST_ADDRESS_CITY']",
          elements: ["address.locality"] 
        },
        { 
          selector: "input[id^='CUST_ADDRESS_STATE']",
          elements: ["address.province"] 
        },
        { 
          selector: "input[id^='CUST_ADDRESS_POSTAL']",
          elements: ["address.postalCode"] 
        },
        { 
          selector: "input[id^='CUST_ADDRESS_COUNTY']",
          elements: ["components.county1"] 
        },
      ]
    };

    // We want a copy of the original object, not to use the original.
    let defaultEdqConfig = JSON.parse(JSON.stringify(window.EdqCountries["USA"]));

    let initialCountry = (document.querySelector("input[id^='CUST_ADDRESS_COUNTRY']") as HTMLInputElement).value;
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

    } else if (proWebServiceUrl && soapActionUrl) {
      window.EdqConfig["PRO_WEB_SERVICE_URL"] = proWebServiceUrl;
      window.EdqConfig["SOAP_ACTION_URL"] = soapActionUrl;
    };

    /*
     * Customers who want to just handle country configuration themselves can do so by
     * including the window.EdqCountries object manually - including using our pre-created files.
     */

    /**
     * 
     * There are two things we aim to achieve here:
     * 1. We want customers to have the ability to provide their own country keys, 
     *    meaning a object called EdqCountries = {}, where the keys in that object
     *    are each specific country, e.g. FRA: {}. Each country configuration is a 
     *    standard EdqConfig object.
     *
     *  2. We also want it to be possible for a customer to use our default items,
     *     and override what they would like by including a function EdqConfigCountryOverride
     *     and having that return the country information as mentioned in (1). 
     *
     *  In general the main distinction between (1) and (2) is that (2) uses our countries
     *  and will load them by default and override items. Whereas (1) will result in nothing
     *  from our servers being loaded. Other than that they are functionality equivalent.
     */
    if (window.EdqCountries[initialIso3Country] || localStorage.getItem(`edq-9.2-fscm-pages_cluid-CUST_GENERAL1-${initialIso3Country}`)) {
      setEdqConfigForCountry(initialIso3Country, window.EdqConfigCountryOverride);
    } else { loadConfigurationForCountry(initialIso3Country, function() {
      setEdqConfigForCountry(initialIso3Country, window.EdqConfigCountryOverride);
    })
    }

    createAssets({currentElement}); 
  }
}

let interval = setInterval(enableIntegration, 1000);
