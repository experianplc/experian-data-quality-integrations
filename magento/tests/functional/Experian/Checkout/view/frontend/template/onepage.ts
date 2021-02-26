import intern from "intern";
import { spawn } from "child_process";
import pollUntil from "@theintern/leadfoot/helpers/pollUntil";

const { registerSuite } = intern.getInterface("object");
const { assert } = intern.getPlugin("chai");
const { emailValidate } = intern.getPlugin("helpers");
const { multiFill } = intern.getPlugin("helpers");
const { globalIntuitiveAddressVerify } = intern.getPlugin("helpers");
const { phoneValidate } = intern.getPlugin("helpers");
const { proWebVerification } = intern.getPlugin("helpers");
const { presentClick } = intern.getPlugin("helpers");
const { enableCoverage } = intern.getPlugin("helpers");

const GLOBAL_PHONE_VALIDATION_AUTH_TOKEN = process.env.GLOBAL_PHONE_VALIDATION_AUTH_TOKEN;
const PRO_WEB_AUTH_TOKEN = process.env.PRO_WEB_AUTH_TOKEN;
const GLOBAL_INTUITIVE_AUTH_TOKEN = process.env.GLOBAL_INTUITIVE_AUTH_TOKEN;
const EMAIL_VALIDATE_AUTH_TOKEN = process.env.EMAIL_VALIDATE_AUTH_TOKEN;

/**
 * The URL to the relevant page that the integration will be added to.
 */
const URL = "https://staging-5em2ouy-hjcmsglwkhlty.us-4.magentosite.cloud";

/**
 * The product to be added
 */
const PRODUCT = `${URL}/joust-duffle-bag.html`;

/**
 * Final checkout page
 */
const CHECKOUT = `${URL}/checkout`;
const BILLING = `${URL}/checkout#payment`;

registerSuite("Experian Checkout - onepage tests - signed out - shipping", {
  // Add the integration and login.
  before: function() {
    return this.remote
      .setFindTimeout(20000)
      .setExecuteAsyncTimeout(40000)
  },

  // Go to the page with the address
  beforeEach: function() {
    // Go to the page with the address
    return this.remote 
      .clearCookies()
      .get(PRODUCT)

      .then(
        pollUntil(function() {
          return !(document.querySelector("#product-addtocart-button") as HTMLButtonElement).disabled || 
            null;
        })
      )
      .findByCssSelector("#product-addtocart-button")
        .click()
        .end()
      .then(pollUntil(function(url) {
        return document.querySelector(`[role="alert"] [href="${url}/checkout/cart/"]`);
      }, [URL]))
      .get(CHECKOUT)
      .execute(function(GLOBAL_PHONE_VALIDATION_AUTH_TOKEN, PRO_WEB_AUTH_TOKEN, GLOBAL_INTUITIVE_AUTH_TOKEN, EMAIL_VALIDATE_AUTH_TOKEN) {
        let script = document.createElement("script");
        script.type = "application/javascript";
        script.setAttribute("GLOBAL_PHONE_VALIDATION_AUTH_TOKEN", GLOBAL_PHONE_VALIDATION_AUTH_TOKEN);
        script.setAttribute("PRO_WEB_AUTH_TOKEN", PRO_WEB_AUTH_TOKEN);
        script.setAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN", GLOBAL_INTUITIVE_AUTH_TOKEN);
        script.setAttribute("EMAIL_VALIDATE_AUTH_TOKEN", EMAIL_VALIDATE_AUTH_TOKEN);
        script.src = "http://localhost:8000/instrumented/Experian/Checkout/view/frontend/templates/onepage.js";
        script.id = "edq-magento-experian-checkout-view-frontend-template-onepage";
        document.body.appendChild(script);
      }, [ 
        GLOBAL_PHONE_VALIDATION_AUTH_TOKEN, 
        PRO_WEB_AUTH_TOKEN, 
        GLOBAL_INTUITIVE_AUTH_TOKEN, 
        EMAIL_VALIDATE_AUTH_TOKEN,
      ])
      .then(pollUntil(function() {
        return window.EDQ;
      }))
  },

  afterEach: function() {
    return this.remote
      .then(enableCoverage())
  },

  tests: {
    "Shipping Address Suite": {

      "Phone validation works for shipping phone number": function() {
        return this.remote

          .then(pollUntil(function() {
            try {
              return !document.querySelector("#co-shipping-form [name='telephone']").getAttribute("data-mage-init") || null;
            } catch(e) {
              return null
            }
          }))
          .then(phoneValidate("9722771455", "#co-shipping-form [name='telephone']", assert))
          .end()
      },

      "Email validation works for shipping email address": function() {
        return this.remote
          .then(pollUntil(function() {
            try {
              return !document.getElementById("customer-email").getAttribute("data-mage-init") || null;
            } catch(e) {
              return null
            }
          }))
          .then(emailValidate("test123@gmail.com", "#customer-email", assert))
          .end()
      },

      "Global Intuitive address verification works for shipping address": function() {
        return this.remote
          .then(pollUntil(function() {
            try {
              return !document.querySelector("#co-shipping-form [name='street[0]']").getAttribute("data-mage-init") || null;
            } catch(e) {
              return null
            }
          }))
          .then(globalIntuitiveAddressVerify("53 State St, Boston MA", "#co-shipping-form [name='street[0]']", assert))
          .end()
      },

      "123 Pro Web Verification works": function() {
        return this.remote
          .then(pollUntil(function() {
            return document.querySelector("#co-shipping-form [name='street[0]']")
          }))
          .then(proWebVerification({
            "#co-shipping-form [name='street[0]']": "125 Summer Street Ste 110, Boston, MA 02110-1685",
            "#co-shipping-form [name='street[1]']": "",
            "#co-shipping-form [name='city']": ""
          }, "#shipping-method-buttons-container button", assert))
        //TODO: Add a check to make sure that the state is also good to go
          .findByCssSelector("#co-shipping-form [name='region_id']")
          .getProperty("value")
          .then(function(stateCode) {
            assert.equal("32", stateCode, "State is properly changed by validation");
          })
      },
    },
  }
});

registerSuite("Experian Checkout - onepage tests - signed out - billing", {
  // Add the integration and login.
  before: function() {
    return this.remote
      .setFindTimeout(200000)
      .setExecuteAsyncTimeout(40000)
      .clearCookies()
      .get(PRODUCT)
      .then(pollUntil(function() {
        try {
          return !(document.querySelector("#product-addtocart-button") as HTMLButtonElement).disabled || 
            null;
        } catch(e) {
          return null;
        }
      }))
      .findByCssSelector("#product-addtocart-button")
        .click()
        .end()
      .then(pollUntil(function(url) {
        return document.querySelector(`[role="alert"] [href="${url}/checkout/cart/"]`);
      }, [URL]))
      .get(CHECKOUT)
      .then(pollUntil(function() {
        return document.querySelector("#co-shipping-form [name='firstname']");
      }))
      .then(multiFill({
        "#co-shipping-form [name='firstname']": "Test",
        "#co-shipping-form [name='lastname']": "Test",
        "#customer-email": "test@123123.com",
        "#co-shipping-form [name='street[0]']": "125 Summer Street",
        "#co-shipping-form [name='street[1]']": "Ste 110",
        "#co-shipping-form [name='city']": "Boston",
        "#co-shipping-form [name='postcode']": "02110-1685",
        "#co-shipping-form [name='telephone']": "6171231232",
      }))
      .then(pollUntil(function() {
        return !document.querySelector(".loading-mask") || null;
      }))
      .findByCssSelector("[name='region_id']")
        .click()
        .end()
      .findByCssSelector("[name='region_id'] > [value='1']")
        .click()
        .end()
      .then(pollUntil(function() {
        return !document.querySelector(".loading-mask") || null;
      }))
      .findByCssSelector("#checkout-shipping-method-load .radio")
        .click()
        .end()
      .then(pollUntil(function() {
        return !document.querySelector(".loading-mask") || null;
      }))
      .execute(function(GLOBAL_PHONE_VALIDATION_AUTH_TOKEN, PRO_WEB_AUTH_TOKEN, GLOBAL_INTUITIVE_AUTH_TOKEN, EMAIL_VALIDATE_AUTH_TOKEN) {
        let script = document.createElement("script");
        script.type = "application/javascript";
        script.setAttribute("GLOBAL_PHONE_VALIDATION_AUTH_TOKEN", GLOBAL_PHONE_VALIDATION_AUTH_TOKEN) ;
        script.setAttribute("PRO_WEB_AUTH_TOKEN", PRO_WEB_AUTH_TOKEN);
        script.setAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN", GLOBAL_INTUITIVE_AUTH_TOKEN);
        script.setAttribute("EMAIL_VALIDATE_AUTH_TOKEN", EMAIL_VALIDATE_AUTH_TOKEN);
        script.src = "http://localhost:8000/instrumented/Experian/Checkout/view/frontend/templates/onepage.js";
        script.id = "edq-magento-experian-checkout-view-frontend-template-onepage";
        document.body.appendChild(script);
      }, [ GLOBAL_PHONE_VALIDATION_AUTH_TOKEN, PRO_WEB_AUTH_TOKEN, GLOBAL_INTUITIVE_AUTH_TOKEN, EMAIL_VALIDATE_AUTH_TOKEN ])
      .then(pollUntil(function() {
        return window.EdqConfig;
      }))
      .then(presentClick("#shipping-method-buttons-container button"))
      .then(pollUntil(function() {
        try {
          (document.querySelector(".checkout-billing-address > fieldset") as HTMLElement).style.display = ""
          return true;
        } catch (e) {
          return null;
        }
      }))
  },

  afterEach: function() {
    return this.remote
      .then(enableCoverage())
  }
,

  tests: {
    "Billing Address Suite": {

      "Global Intuitive works": function() {
        return this.remote
          .then(globalIntuitiveAddressVerify("53 State St, Boston MA", "#co-payment-form [name='street[0]']", assert))
          .end()
      },

      "Pro Web Verification works": function() {
        return this.remote
          .then(pollUntil(function() {
            try {
              return !document.querySelector("#co-payment-form [name='street[0]']").getAttribute("data-mage-init") || null;
            } catch(e) {
              return null;
            }
          }))
          .then(proWebVerification({
            "#co-payment-form [name='street[0]']": "125 Summer Street",
            "#co-payment-form [name='street[1]']": "Ste 110",
            "#co-payment-form [name='city']": "Boston",
            "#co-payment-form [name='postcode']": "02110-1685"
          }, "#co-payment-form .action-update", assert))
          .findByCssSelector("#co-payment-form [name='region_id']")
          .getProperty("value")
          .then(function(stateCode) {
            assert.equal("32", stateCode, "State is properly changed by validation");
          })
      },

      "Phone validation works": function() {
        return this.remote
          .then(pollUntil(function() {
            try {
              return !document.querySelector("#co-payment-form [name='telephone']").getAttribute("data-mage-init") || null;
            } catch(e) {
              return null;
            }
          }))
          .then(phoneValidate("6171231212", "#co-payment-form [name='telephone']", assert))
          .end()
      }

    }
  }
});
