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
        element.id = "edq-9.2-cs-pages_fluid-SCC_ADDRESS_SCF";
        element.setAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN", GLOBAL_INTUITIVE_AUTH_TOKEN);

        let script = document.createElement("script");
        script.src = `http://localhost:8000/lib/9.2/cs/pages_fluid/SCC_ADDRESS_SCF/integration.js`;
      
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
        element.id = "edq-9.2-cs-pages_fluid-SCC_ADDRESS_SCF";
        element.setAttribute("PRO_WEB_USE_TYPEDOWN", String(useTypedown));
        element.setAttribute("PRO_WEB_AUTH_TOKEN", PRO_WEB_AUTH_TOKEN);

        let script = document.createElement("script");
        script.src = `http://localhost:8000/lib/9.2/cs/pages_fluid/SCC_ADDRESS_SCF/integration.js`;
      
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
        element.id = "edq-9.2-cs-pages_fluid-SCC_ADDRESS_SCF";
        element.setAttribute("PRO_WEB_USE_TYPEDOWN", String(useTypedown));
        element.setAttribute("PRO_WEB_SERVICE_URL", "http://bospshcm92spi.qas.com:8080");

        let script = document.createElement("script");
        script.src = `http://localhost:8000/lib/9.2/cs/pages_fluid/SCC_ADDRESS_SCF/integration.js`;

        document.body.appendChild(element);
        document.body.appendChild(script);

      }, [ root, useTypedown ])
  }
}



function typeAddressAndSubmit(address: any) {
  return function() {
    return this.parent
      .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
        .clearValue()
        .type(address.address1 || "")
        .end()
      .findByCssSelector("#DERIVED_ADDRESS_ADDRESS2")
        .clearValue()
        .type(address.address2 || "")
        .end()
      .findByCssSelector("input[id^=DERIVED_ADDRESS_CITY]")
        .clearValue()
        .type(address.city || "")
        .end()
      .findByCssSelector("#SCC_STATE_FL_VW_DESCR")
        .clearValue()
        .type(address.state || "")
        .end()
      .findByCssSelector("input[id^=DERIVED_ADDRESS_POSTAL]")
        .clearValue()
        .type(address.postal || "")
        .end()
      .findByCssSelector("#DERIVED_ADDRESS_COUNTY")
        .clearValue()
        .type(address.county || "")
        .end()
      .sleep(2000)
      .findByCssSelector("#SCC_PROF_FL_DRV_SAVE_BTN")
        .click()
        .end()

  };
}

function typeAddress(address: any) {
  return function() {
    return this.parent
      .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
        .clearValue()
        .type(address.address1 || "")
        .end()
      .findByCssSelector("#DERIVED_ADDRESS_ADDRESS2")
        .clearValue()
        .type(address.address2 || "")
        .end()
      .findByCssSelector("input[id^=DERIVED_ADDRESS_CITY]")
        .clearValue()
        .type(address.city || "")
        .end()
      .findByCssSelector("#SCC_STATE_FL_VW_DESCR")
        .clearValue()
        .type(address.state || "")
        .end()
      .findByCssSelector("input[id^=DERIVED_ADDRESS_POSTAL]")
        .clearValue()
        .type(address.postal || "")
        .end()
  };
}

/**
 * The URL to the relevant iframe, SCC_ADDRESS_SCF
 */
const URL = "http://bospsoftcs92.qas.com:8000/psc/ps_18/EMPLOYEE/SA/c/SCC_PROFILE_FL.SCC_ADDR_DTLS_FL.GBL";

registerSuite("CS - SCC_ADDRESS_SCF Tests", {
  before: function() {
    return this.remote
      .setFindTimeout(10000)
      .setExecuteAsyncTimeout(20000)
      .clearCookies()
      .sleep(1000)
      .get(URL)
      .findByCssSelector("#userid")
      .type("PS")
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
      .findByCssSelector(".ps_grid-cell")
        .click()
        .end()
      .then(pollUntil(function() {
        return window.frames.length > 0 || null;
      }))
      .switchToFrame(0) 
      .then(pollUntil(function() {
        return window.EDQ;
      }))
      .execute(function() { 
        window.EDQ = null;
        window.EdqConfig = null;

        // This will refresh the instance with each change, re-creating the integration.
        document.getElementById("SCC_STATE_FL_VW_DESCR").onchange = null;

        let address1: any = document.getElementById("DERIVED_ADDRESS_ADDRESS1");
        // Remove Typedown Integration
        address1.onclick = null;
        address1.setAttribute("onclick", null);

        // Remove Global Intuitive Integration
        address1.removeEventListener("keyup", address1.keyupHandler);
        address1.removeEventListener("keydown", address1.keydownHandler);

        // Remove all traces of integration
        let okButton = document.getElementById("SCC_PROF_FL_DRV_SAVE_BTN");
        okButton.onclick = null;
        okButton.setAttribute("onclick", null);

        if (document.getElementById("edq-pegasus")) {
          let pegasus = document.getElementById("edq-pegasus");
          pegasus.remove();
        }

        if (document.getElementById("edq-verification-unicorn")) {
          let verification = document.getElementById("edq-verification-unicorn");
          verification.remove();
        }

        if (document.getElementById("edq-typedown-unicorn")) {
          let typedown = document.getElementById("edq-typedown-unicorn");
          typedown.remove();
        }

        if (document.getElementById("edq-global-intuitive-unicorn")) {
          let globalIntuitive = document.getElementById("edq-global-intuitive-unicorn");
          globalIntuitive.remove();
        }

        if (document.getElementById("edq-9.2-cs-pages_fluid-SCC_ADDRESS_SCF")) {
          let integration = document.getElementById("edq-9.2-cs-pages_fluid-SCC_ADDRESS_SCF");
          integration.remove();
        }

        if (window.EDQ === null) {
          return true;
        } 

        return null;
      })
  },

  tests: {
    "Pro Web without adding integration fails": function() {
      return this.remote
        .then(typeAddressAndSubmit({
          address1: "53 State Street",
          postal: "02109-2820"
        }))
        .then(pollUntil(function() {
          return document.querySelector("input[id^='DERIVED_ADDRESS_CITY']");
        }))
        .findByCssSelector("input[id^='DERIVED_ADDRESS_CITY']")
          .getProperty("value")
          .then(function(city: string) {
            assert.equal(city, "", "City is not populated");
          })
          .end()
    },

    "Pro Web with PRO_WEB_AUTH_TOKEN works": function() {
      return this.remote
        .then(addProWebOnDemand())
        .then(pollUntil(function() {
          return Boolean(window.EDQ && window.EdqConfig) || null; 
        }))
        .then(typeAddressAndSubmit({
          address1: "53 State Street",
          postal: "02109-2820"
        }))
        .then(pollUntil(function() {
          return (document.querySelector("input[id^=DERIVED_ADDRESS_CITY]") as HTMLInputElement).value || null;
        }))
        .findByCssSelector("input[id^=DERIVED_ADDRESS_CITY]")
          .getProperty("value")
          .then(function(city) {
            assert.equal(city, "Boston", "Full address includes city")
          })
          .end()
    },
    
    "Pro Web with PRO_WEB_SERVICE_URL works": function() {
      return this.remote
        .then(addProWebOnPremise())
        .then(pollUntil(function() {
          return Boolean(window.EDQ && window.EdqConfig) || null; 
        }))
        .then(typeAddressAndSubmit({
          address1: "125 Summer St",
          address2: "Ste 1020",
          postal: "02110"
        }))
        .then(pollUntil(function() {
          return (document.querySelector("input[id^=DERIVED_ADDRESS_CITY]") as HTMLInputElement).value || null;
        }))
        .findByCssSelector("input[id^=DERIVED_ADDRESS_CITY]")
          .getProperty("value")
          .then(function(city: string) {
            assert.equal(city, "Boston", "Full addreess includes city")
          })
          .end()
    },

    "Pro Web with PRO_WEB_USE_TYPEDOWN does not work when integration is not properly set": function() {
      return this.remote
        .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
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
        .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
          .click()
          .end()
        .sleep(1000)
        .findByCssSelector("#typedown-steps")
          .getVisibleText()
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

