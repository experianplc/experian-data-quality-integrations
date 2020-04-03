import intern from "intern";
import { spawn } from "child_process";
import pollUntil from "@theintern/leadfoot/helpers/pollUntil";

const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

const root = __dirname + "../../../../..";
const PRO_WEB_AUTH_TOKEN = process.env.PRO_WEB_AUTH_TOKEN;
const GLOBAL_INTUITIVE_AUTH_TOKEN = process.env.GLOBAL_INTUITIVE_AUTH_TOKEN;

function addGlobalIntuitive() {
  return function() {
    return this.parent
      .execute(function(GLOBAL_INTUITIVE_AUTH_TOKEN, root) {
        let element = document.createElement("div");
        element.id = "edq-9.2-fscm-pages_fluid-CUST_GENERAL1";
        element.setAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN", GLOBAL_INTUITIVE_AUTH_TOKEN);

        let script = document.createElement("script");
        script.src = `http://localhost:8000/lib/9.2/fscm/pages_fluid/CUST_GENERAL1/integration.js`;
      
        document.body.appendChild(element);
        document.body.appendChild(script);
        
      }, [ GLOBAL_INTUITIVE_AUTH_TOKEN, root ])
  }
}

function addProWebOnDemand(useTypedown: boolean = false) {
  return function() {
    return this.parent
      .execute(function(PRO_WEB_AUTH_TOKEN, root, useTypedown) {
        let element = document.createElement("div");
        element.id = "edq-9.2-fscm-pages_fluid-CUST_GENERAL1";

        element.setAttribute("PRO_WEB_USE_TYPEDOWN", String(useTypedown));
        element.setAttribute("PRO_WEB_AUTH_TOKEN", PRO_WEB_AUTH_TOKEN);

        let script = document.createElement("script");
        script.src = `http://localhost:8000/lib/9.2/fscm/pages_fluid/CUST_GENERAL1/integration.js`;

        // Remove any existing items
        document.getElementById(element.id)?.remove();
        document.body.appendChild(element);
        document.body.appendChild(script);
        
      }, [ PRO_WEB_AUTH_TOKEN, root, useTypedown ])
  }
}

function addProWebOnPremise(useTypedown: boolean = false) {
  return function() {
    return this.parent
      .execute(function(root, useTypedown) {
        let element = document.createElement("div");
        element.id = "edq-9.2-fscm-pages_fluid-CUST_GENERAL1";

        element.setAttribute("PRO_WEB_USE_TYPEDOWN", String(useTypedown));
        element.setAttribute("PRO_WEB_SERVICE_URL", "http://bospsoftcs92.qas.com:2021");

        let script = document.createElement("script");
        script.src = "http://localhost:8000/lib/9.2/fscm/pages_fluid/CUST_GENERAL1/integration.js";

        // Remove any existing items
        document.getElementById(element.id)?.remove();
        document.body.appendChild(element);
        document.body.appendChild(script);

      }, [ root, useTypedown ])
  }
}


const SAVE_BUTTON_SELECTOR = "#ICSave";
const ADDRESS1_SELECTOR = "input[id^='CUST_ADDRESS_ADDRESS1']";
const ADDRESS2_SELECTOR = "input[id^='CUST_ADDRESS_ADDRESS2']";
const CITY_SELECTOR  = "input[id^='CUST_ADDRESS_CITY']";
const STATE_SELECTOR = "input[id^='CUST_ADDRESS_STATE']";
const POSTAL_SELECTOR = "input[id^='CUST_ADDRESS_POSTAL']";
const COUNTY_SELECTOR = "input[id^='CUST_ADDRESS_COUNTY']";

function typeAddressUSA(address: any) {
  return function() {
    return this.parent
      .findByCssSelector(ADDRESS1_SELECTOR)
        .clearValue()
        .type(address.address1 || "")
        .end()
      .findByCssSelector(ADDRESS2_SELECTOR)
        .clearValue()
        .type(address.address2 || "")
        .end()
      .findByCssSelector(CITY_SELECTOR)
        .clearValue()
        .type(address.city || "")
        .end()
      .findByCssSelector(STATE_SELECTOR)
        .clearValue()
        .type(address.state || "")
        .end()
      .findByCssSelector(POSTAL_SELECTOR)
        .clearValue()
        .type(address.postal || "")
        .end()
      .findByCssSelector(COUNTY_SELECTOR)
        .clearValue()
        .type(address.county || "")
        .end()
  };
}

/**
 * The URL to the relevant iframe, CUST_GENERAL1
 */
const URL = "http://bospsoftfscm92.qas.com:8000/psc/ps/EMPLOYEE/ERP/c/MAINTAIN_CUSTOMERS.CUSTOMER_GENERAL.GBL";

registerSuite("FSCM - CUST_GENERAL1 Tests", {
  before: function() {
    return this.remote
      .setFindTimeout(10000)
      .setExecuteAsyncTimeout(20000)
      .clearCookies()
      .sleep(1000)
      .get(URL)
      .findByCssSelector("#userid")
      .type("VP1")
      .end()
      .findByCssSelector("#pwd")
      .type("Hello123")
      .end()
      .findByCssSelector("[name='Submit']")
      .click()
      .end()
      .sleep(1000) 
  },

  beforeEach: function() {
    // Go to the page with the address
    return this.remote  
      .get(URL)
      .findByCssSelector("#ICTAB_2")
        .click()
        .end()
      .then(pollUntil(function() {
        return document.getElementById("CUST_AN_SRCH_CUST_ID");
      }))
      .findById("#ICSearch")
        .click()
        .end()
      .then(pollUntil(function(ADDRESS1_SELECTOR: any) {
        console.log(ADDRESS1_SELECTOR);
        console.log(arguments);
        return document.querySelector(ADDRESS1_SELECTOR)
      }, [ ADDRESS1_SELECTOR ]))
  },

  tests: {
    "Pro Web without adding integration fails": function() {
      return this.remote
        .then(typeAddressUSA({
          address1: "53 State Street",
          postal: "02109-2820"
        }))
        .findById(SAVE_BUTTON_SELECTOR)
          .click()
          .end()
        .then(pollUntil(function(CITY_SELECTOR: string) {
          return (document.querySelector(CITY_SELECTOR) as HTMLInputElement)?.value;
        }, [ CITY_SELECTOR ], 10000))
        .then(function(city: string) {
          assert.equal(city, "", "City is not populated");
        })
        .end()
    },

    "Pro Web with PRO_WEB_AUTH_TOKEN works": function() {
      return this.remote
        .then(addProWebOnDemand())
        .then(pollUntil(function() {
          return Boolean(window.EDQ) || null; 
        }))
        .then(typeAddressUSA({
          address1: "53 State Street",
          postal: "02109-2820"
        }))
        .findById(SAVE_BUTTON_SELECTOR)
          .click()
          .end()
        .then(pollUntil(function(CITY_SELECTOR: string) {
          if ((document.querySelector(CITY_SELECTOR) as HTMLInputElement)?.value !== "") {
            return (document.querySelector(CITY_SELECTOR) as HTMLInputElement)?.value;
          } else {
            return null;
          }
        }, [ CITY_SELECTOR ]))
        .then(function(city: string) {
          assert.equal(city, "Boston", "Full address includes city")
        })
    },
    
    "Pro Web with PRO_WEB_SERVICE_URL works": function() {
      return this.remote
        .then(addProWebOnPremise())
        .then(pollUntil(function() {
          return Boolean(window.EDQ && window.EdqConfig) || null; 
        }))
        .then(typeAddressUSA({
          address1: "53 State Street Lbby 1",
          postal: "02109-3208"
        }))
        .findById(SAVE_BUTTON_SELECTOR)
          .click()
          .end()
        .then(pollUntil(function(CITY_SELECTOR: string) {
          if ((document.querySelector(CITY_SELECTOR) as HTMLInputElement)?.value !== "") {
            return (document.querySelector(CITY_SELECTOR) as HTMLInputElement)?.value;
          } else {
            return null;
          }
        }, [ CITY_SELECTOR ]))
        .then(function(city: string) {
          assert.equal(city, "Boston", "Full addreess includes city")
        })
    },

    "Pro Web with PRO_WEB_USE_TYPEDOWN does not work when integration is not properly set": function() {
      return this.remote
        .findByCssSelector(ADDRESS1_SELECTOR)
          .click()
          .end()
        .execute(function() {
          return document.getElementById("typedown-steps");
        })
        .then(function(domElement) {
          assert.equal(domElement, null, "Typedown Modal should not appear with integration");
        })
    },

    "Pro Web typedown works": function() {
      return this.remote
        .then(addProWebOnPremise(true))
        .sleep(3000)
        .findByCssSelector(ADDRESS1_SELECTOR)
          .click()
          .end()
        .sleep(1000)
        .then(pollUntil(function() {
          return (document.querySelector("#typedown-steps") as HTMLElement)?.innerText;
        }))
        .then(function(typedownText) { 
          assert(Boolean(typedownText), "Typedown pops up");
        })
    },

    "Global Intuitive without adding integration does not work": function() {
      return this.remote
        .then(pollUntil(function() {
          return document.querySelector("#DERIVED_ADDRESS_ADDRESS1");
        }))
        .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
          .clearValue() 
          .type("53 State Street Boston")
          .end()
        .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
          .click()
          .type(" ")
          .end()
        .execute(function() {
          return document.querySelector(".edq-global-intuitive-address-suggestion");
        })
        .then(function(selector) {
          assert.equal(selector, null, "No suggestions an be found");
        })
    },

    "Global Intuitive with GLOBAL_INTUITIVE_AUTH_TOKEN works": function() {
      return this.remote
        .then(addGlobalIntuitive())
        .then(pollUntil(function() {
          return Boolean(window.EDQ && 
            window.EdqConfig &&
            document.querySelector("#DERIVED_ADDRESS_ADDRESS1")
          ) || null; 
        }))
        .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
          .clearValue() 
          .type("53 State Street Boston")
          .end()
        .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
          .click()
          .type(" ")
          .end()
        .then(pollUntil(function() {
          return document.querySelector(".edq-global-intuitive-address-suggestion");
        }))
        .findByCssSelector(".edq-global-intuitive-address-suggestion")
          .click()
          .end()
        .then(pollUntil(function() {
          return document.querySelector("#DERIVED_ADDRESS_ADDRESS1").getAttribute("edq-metadata");
        }))
        .then(pollUntil(function() {
          return (document.querySelector("input[id^='DERIVED_ADDRESS_CITY']") as HTMLInputElement).value || null;
        }))
        .then(function(city: string) {
          assert.equal(city, "Boston", "Full address includes city")
        })
    }
  }
});
