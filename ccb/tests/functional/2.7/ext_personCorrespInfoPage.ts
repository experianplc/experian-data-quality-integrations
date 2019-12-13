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
const PRO_WEB_SERVICE_URL = "http://bosedqproxy.qas.com/pro-web/proweb.wsdl";

const URL = "http://bosccb27.qas.com:180/ouaf/cis.jsp";

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
        return window.location.href === "http://bosccb27.qas.com:180/ouaf/cis.jsp" || null;
      }))
  },

  beforeEach: function() {
    // Go to the page with the address
    return this.remote
      .get(URL)
      .then(pollUntil(function() {
        try {
          return window.frames['main'].frames['tabPage'].document.readyState === "complete" &&
            window.frames['main'].frames['tabPage'].document.getElementById("USER_ID");
        } catch(e) {
          return null;
        }
      }))
      .then(pollUntil(function() {
        // Go to 'Person' page and switch to 'Correspondence Info' tab.
        (window.frames["main"] as any).onSubMenuClick(null,"CI0000000135");
        return window.frames["main"].document.getElementById("ptitle");
      }))
      .switchToFrame("main")
      .then(pollUntil(function() {
        this.frames["tabMenu"].document.querySelector("[title='Correspondence Info']").click();
        try {
          return this.frames["tabMenu"].document.querySelector(".activeTab").innerText === "Correspondence Info" 
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
          this.context.document.getElementById("ADDRESS1").click();
          return this.context.EdqConfig.PRO_WEB_MAPPING || null;
        }))
        .then(typeAddress({
          "address-line-one": "53 State Street",
          "postal-code": "02109-2820"
        }))
        .then(pollUntil(function() {
          this.context.parent.document.getElementById("IM_SAVE").click();
          return (this.context.document.getElementById("CITY") as HTMLInputElement).value || null;
        }))
        .then(function(city) {
          assert.equal(city, "Boston", "Full address includes city")
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
          return Boolean(
            this.context.EDQ && 
            this.context.EdqConfig) || null; 
        }))
        .then(pollUntil(function() {
          this.context.document.getElementById("SEAS_ADDR$ADDRESS1").click();
          return this.context.EdqConfig.PRO_WEB_MAPPING || null;
        }))
        .then(typeAddress({
          "address-line-one": "53 State Street",
          "postal-code": "02109-2820"
        }))
        .then(pollUntil(function() {
          this.context.parent.document.getElementById("IM_SAVE").click();
          return (this.context.document.getElementById("SEAS_ADDR$CITY") as HTMLInputElement).value || null;
        }))
        .then(function(city) {
          assert.equal(city, "Boston", "Full address includes city")
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
          this.context.document.getElementById("ADDRESS1").click();
          return this.context.EdqConfig.PRO_WEB_MAPPING || null;
        }))
        .then(typeAddress({
          "address-line-one": "125 Summer St",
          "address-line-two": "Ste 1020",
          "postal-code": "02110"
        }))
        .then(pollUntil(function() {
          this.context.parent.document.getElementById("IM_SAVE").click();
          return (this.context.document.getElementById("CITY") as HTMLInputElement).value || null;
        }))
        .then(function(city: string) {
          assert.equal(city, "Boston", "Full addreess includes city")
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
          return Boolean(
            this.context.EDQ && 
            this.context.EdqConfig) || null; 
        }))
        .then(pollUntil(function() {
          this.context.document.getElementById("SEAS_ADDR$CITY").click();
          return this.context.EdqConfig.PRO_WEB_MAPPING || null;
        }))
        .then(typeAddress({
          "address-line-one": "125 Summer St",
          "address-line-two": "Ste 1020",
          "postal-code": "02110"
        }))
        .then(pollUntil(function() {
          this.context.parent.document.getElementById("IM_SAVE").click();
          return (this.context.document.getElementById("SEAS_ADDR$CITY") as HTMLInputElement).value || null;
        }))
        .then(function(city: string) {
          assert.equal(city, "Boston", "Full addreess includes city")
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

    /* TODO: Enable once Typedown-unicorn is uploaded 
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
          return document.querySelector("#ADDRESS1");
        }))
        .findByCssSelector("#ADDRESS1")
          .clearValue() 
          .type("53 State Street Boston")
          .end()
        .findByCssSelector("#ADDRESS1")
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
        .then(addGlobalIntuitive({
          authToken: GLOBAL_INTUITIVE_AUTH_TOKEN,
          elementId: ELEMENT_ID,
          source: INTEGRATION_SOURCE_PATH
        }))
        .then(pollUntil(function() {
          return Boolean(window.EDQ && 
            window.EdqConfig &&
            document.querySelector("#ADDRESS1")
          ) || null; 
        }))
        .findByCssSelector("#ADDRESS1")
          .clearValue() 
          .type("53 State Street Boston")
          .end()
        .findByCssSelector("#ADDRESS1")
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
          return (document.querySelector("#CITY") as HTMLInputElement).value || null;
        }))
        .then(function(city: string) {
          assert.equal(city, "Boston", "Full address includes city")
        })
    }


     */
  }
});

