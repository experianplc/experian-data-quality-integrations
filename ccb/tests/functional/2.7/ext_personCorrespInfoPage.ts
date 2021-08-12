import intern from "intern";
import { spawn } from "child_process";
import pollUntil from "@theintern/leadfoot/helpers/pollUntil";

const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');
const { addGlobalIntuitive } = intern.getPlugin('edq-test-helpers');
const { addProWebOnPremise } = intern.getPlugin('edq-test-helpers');
const { addProWebOnDemand } = intern.getPlugin('edq-test-helpers');
const { typeAddress } = intern.getPlugin('edq-test-helpers');

const root = __dirname + "../../../../..";
const ROOT_PATH = __dirname + "../../../../..";
const PRO_WEB_AUTH_TOKEN = process.env.PRO_WEB_AUTH_TOKEN;
const GLOBAL_INTUITIVE_AUTH_TOKEN = process.env.GLOBAL_INTUITIVE_AUTH_TOKEN;
const ELEMENT_ID = "edq-2.7-root-cm-ext_personCorrespInfoPage";
const INTEGRATION_SOURCE_PATH = "http://localhost:8001/integration.js";
const PRO_WEB_SERVICE_URL = "http://bosccb27.qas.com:2021/";

const URL = "http://bosccb27.qas.com/ouaf/cis.html";

registerSuite("ext_personInfoCorresp Tests", {
  before: function() {
    return this.remote
      .setFindTimeout(10000)
      .setExecuteAsyncTimeout(20000)
      .clearCookies()
      .sleep(1000)
      .get(URL)
      .findByCssSelector("#userId")
        .type("sysuser")
        .end()
      .findByCssSelector("#password")
        .type("hello123")
        .end()
      .findByCssSelector("#loginButton")
        .click()
        .end()
      .then(pollUntil(function() {
        return window.location.href === "http://bosccb27.qas.com/ouaf/cis.jsp" || null;
      }))
  },

  beforeEach: function() {
    // Go to the page with the address
    return this.remote
      .get(URL)
      .then(pollUntil(function() {
        try {
          return this.frames['main'].frames['dashboard'].document.getElementById("IM_GetToDo") &&
            this.frames['main'].frames['tabPage'].document.getElementById("USER_ID");
        } catch(e) {
          return null;
        }
      }))
      .then(pollUntil(function() {
        // Go to 'Person' page and switch to 'Correspondence Info' tab.
        (this.frames["main"] as any).onSubMenuClick(null,"CI0000000135");
        return this.frames['main'].frames['dashboard'].document.getElementById("IM_GetToDo") &&
          this.frames["main"].document.getElementById("ptitle").innerText === "Person";
      }))
      .then(pollUntil(function() {
        try {
          if (this.frames["main"].frames["tabMenu"].document.querySelector(".activeTab").innerText !== "Correspondence Info") {
            this.frames["main"].frames["tabMenu"].document.querySelector("[title='Correspondence Info']").click();
          } 
        } catch(e) {
          return null;
        }

        try {
          return this.frames['main'].frames['dashboard'].document.getElementById("IM_GetToDo") &&
            this.frames["main"].frames["tabMenu"].document.querySelector(".activeTab").innerText === "Correspondence Info";
        } catch(e) {
          return null
        }
      }))
      .then(pollUntil(function() {
        this.context = this.frames["main"].frames["tabPage"];
        this.context.EDQ = null;
        this.context.EdqConfig = null;
        return this.context.document.getElementById("ADDRESS1");
      }))
      .then(pollUntil(function() {
        this.frames["main"].document.getElementById("IM_SAVE").onclick = null;
        this.context.frames["main"].document.getElementById("IM_SAVE").onclick = null;
        return this.frames["main"].document.getElementById("IM_SAVE").onclick === null;
      }))
  },

  tests: {
    "Pro Web without adding integration fails": function() {
      return this.remote
        .then(typeAddress({
          "address-line-one": "53 State Street",
          "postal-code": "02109-2820"
        }))
        .then(function(value) {
          assert.equal(value, null, "Integration is inactive");
          if (value === null) { return null; }
        })
    },

    "Pro Web with PRO_WEB_AUTH_TOKEN works (mailing address)": function() {
      return this.remote
        .then(addProWebOnDemand({
          authToken: PRO_WEB_AUTH_TOKEN,
          elementId: ELEMENT_ID,
          source: INTEGRATION_SOURCE_PATH,
          useTypedown: false
        }))
        .then(pollUntil(function() {
          return Boolean(
            this.context.EDQ && 
            this.context.EdqConfig) || null; 
        }))
        .then(pollUntil(function() {
          return this.context.document.activeElement.id === "PER_ID" || null;
        }))
        .then(pollUntil(function() {
          this.context.document.getElementById("CITY").click();
          return this.context.EdqConfig.PRO_WEB_MAPPING;
        }))
        .then(typeAddress({
          "address-line-one": "53 State Street",
          "postal-code": "02109-2820"
        }))
        .then(pollUntil(function() {
          this.context.EdqConfig["PRO_WEB_CALLBACK"] = function() { }
          this.context.parent.document.getElementById("IM_SAVE").click();
          if (!Boolean(this.context.document.getElementById("CITY").value)) {
            return null;
          }

          return this.context.document.getElementById("CITY").value;
        }))
        .then(function(city) {
          assert.equal(city, "Boston", "City correctly returned");
        })
    },

    "Pro Web with PRO_WEB_AUTH_TOKEN works (seasonal address)": function() {
      return this.remote
        .then(addProWebOnDemand({
          authToken: PRO_WEB_AUTH_TOKEN,
          elementId: ELEMENT_ID,
          source: INTEGRATION_SOURCE_PATH,
          useTypedown: false
        }))
        .then(pollUntil(function() {
          console.log("Polling for context.EDQ and context.EdqConfig...");
          return Boolean(
            this.context.EDQ && 
            this.context.EdqConfig) || null; 
        }))
        .then(pollUntil(function() {
          console.log("Polling to ensure PER_ID has focus");
          return this.context.document.activeElement.id === "PER_ID" || null;
        }))
        .then(pollUntil(function() {
          this.context.document.getElementById("SEAS_ADDR$CITY").click();
          return this.context.EdqConfig.PRO_WEB_MAPPING;
        }))
        .then(typeAddress({
          "address-line-one": "53 State Street",
          "postal-code": "02109-2820"
        }))
        .then(pollUntil(function() {
          this.context.parent.document.getElementById("IM_SAVE").click();
          if (!Boolean(this.context.document.getElementById("SEAS_ADDR$CITY").value)) {
            return null;
          }

          return this.context.document.getElementById("SEAS_ADDR$CITY").value;
        }))
        .then(function(city) {
          assert.equal(city, "Boston", "City correctly returned");
        })
    },
    
   "Pro Web with PRO_WEB_SERVICE_URL works (mailing address)": function() {
      return this.remote
        .then(addProWebOnPremise({
          serviceUrl: PRO_WEB_SERVICE_URL,
          elementId: ELEMENT_ID,
          source: INTEGRATION_SOURCE_PATH,
          useTypedown: false
        }))
        .then(pollUntil(function() {
          return Boolean(
            this.context.EDQ && 
            this.context.EdqConfig) || null; 
        }))
        .then(pollUntil(function() {
          console.log("Polling to ensure PER_ID has focus");
          return this.context.document.activeElement.id === "PER_ID" || null;
        }))
        .then(pollUntil(function() {
          this.context.document.getElementById("CITY").click();
          return this.context.EdqConfig.PRO_WEB_MAPPING;
        }))
        .then(typeAddress({
          "address-line-one": "53 State Street",
          "postal-code": "02109-2820"
        }))
        .then(pollUntil(function() {
          this.context.parent.document.getElementById("IM_SAVE").click();
          if (!Boolean(this.context.document.getElementById("CITY").value)) {
            return null;
          }

          return this.context.document.getElementById("CITY").value;
        }))
        .then(function(city) {
          assert.equal(city, "Boston", "City correctly returned");
        })
    },

    "Pro Web with PRO_WEB_SERVICE_URL works (seasonal address)": function() {
      return this.remote
        .then(addProWebOnPremise({
          serviceUrl: PRO_WEB_SERVICE_URL,
          elementId: ELEMENT_ID,
          source: INTEGRATION_SOURCE_PATH,
          useTypedown: false
        }))
        .then(pollUntil(function() {
          console.log("Polling for context.EDQ and context.EdqConfig...");
          return Boolean(
            this.context.EDQ && 
            this.context.EdqConfig) || null; 
        }))
        .then(pollUntil(function() {
          console.log("Polling to ensure PER_ID has focus");
          return this.context.document.activeElement.id === "PER_ID" || null;
        }))
        .then(pollUntil(function() {
          this.context.document.getElementById("SEAS_ADDR$CITY").click();
          return this.context.EdqConfig.PRO_WEB_MAPPING;
        }))
        .then(typeAddress({
          "address-line-one": "53 State Street",
          "postal-code": "02109-2820"
        }))
        .then(pollUntil(function() {
          this.context.parent.document.getElementById("IM_SAVE").click();
          if (!Boolean(this.context.document.getElementById("SEAS_ADDR$CITY").value)) {
            return null;
          }

          return this.context.document.getElementById("SEAS_ADDR$CITY").value;
        }))
        .then(function(city) {
          assert.equal(city, "Boston", "City correctly returned");
        })
    },

    "Pro Web with PRO_WEB_USE_TYPEDOWN does not work when integration is not properly set": function() {
      return this.remote
        .execute(function() {
          this.context.document.getElementById("ADDRESS1").click();
        })
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
        .findByCssSelector("#ADDRESS1")
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
          return this.context.document.querySelector("#ADDRESS1");
        }))
        .then(pollUntil(function() {
          this.context.document.querySelector("#ADDRESS1").value = "53 State Street Boston";
          this.context.document.getElementById("ADDRESS1").dispatchEvent(new Event("keyup"));
          if (this.context.document.querySelector(".edq-global-intuitive-address-suggestion") == null) {
            return true;
          }

          return null;
        }))
        .then(function(selector) {
          assert.equal(selector, true, "No suggestions an be found");
        })
    },

    "Global Intuitive with GLOBAL_INTUITIVE_AUTH_TOKEN works (mailing)": function() {
      return this.remote
        .then(addGlobalIntuitive({
          authToken: GLOBAL_INTUITIVE_AUTH_TOKEN,
          elementId: ELEMENT_ID,
          source: INTEGRATION_SOURCE_PATH
        }))
        .then(pollUntil(function() {
          return Boolean(
            this.context.EDQ && 
            this.context.EdqConfig) || null; 
        }))
        .then(pollUntil(function() {
          console.log("Polling to ensure PER_ID has focus");
          return this.context.document.activeElement.id === "PER_ID" || null;
        }))
        .then(pollUntil(function() {
          this.context.document.getElementById("ADDRESS1").click();
          this.context.document.getElementById("ADDRESS1").value = "53 State Street Boston";
          this.context.document.getElementById("ADDRESS1").dispatchEvent(new Event("keyup"))
          return this.context.document.querySelector(".edq-global-intuitive-address-suggestion");
        }))
        .then(pollUntil(function() {
          let suggestion = this.context.document.querySelector(".edq-global-intuitive-address-suggestion")
          suggestion.dispatchEvent(new MouseEvent("mousedown", { view: window, bubbles: true, cancelable: true, clientX: 0, clientY: 0, button: 0 }))
          if (this.context.document.querySelector("#CITY").value === ""){
            return null;
          }

          return this.context.document.querySelector("#CITY").value;
        }, 20000, 3000))
        .then(function(city: string) {
          console.log(`CITY: ${city}`);
          assert.equal(city, "Boston", "Full address includes city")
        })
    }


  }
});

