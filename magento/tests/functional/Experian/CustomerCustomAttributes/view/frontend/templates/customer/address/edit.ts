import intern from "intern";
import { spawn } from "child_process";
import pollUntil from "@theintern/leadfoot/helpers/pollUntil";

const { registerSuite } = intern.getInterface("object");
const { assert } = intern.getPlugin("chai");
const { phoneValidate } = intern.getPlugin("helpers");
const { globalIntuitiveAddressVerify } = intern.getPlugin("helpers");
const { proWebVerification } = intern.getPlugin("helpers");
const { multiFill } = intern.getPlugin("helpers");

const GLOBAL_PHONE_VALIDATION_AUTH_TOKEN = process.env.GLOBAL_PHONE_VALIDATION_AUTH_TOKEN;
const PRO_WEB_AUTH_TOKEN = process.env.PRO_WEB_AUTH_TOKEN;
const GLOBAL_INTUITIVE_AUTH_TOKEN = process.env.GLOBAL_INTUITIVE_AUTH_TOKEN;

/**
 * The URL to the relevant page that the integration will be added to.
 */
const URL = "https://staging-5em2ouy-hjcmsglwkhlty.us-4.magentosite.cloud";

registerSuite("Experian CustomerCustomAttributes Address Edit", {
  // Add the integration and login.
  before: function() {
    return this.remote
      .setFindTimeout(20000)
      .setExecuteAsyncTimeout(40000)
      .clearCookies()
      .get(`${URL}/customer/address/new/`)
      .then(multiFill({
        "#email": "roni_cost@example.com",
        "#pass": "roni_cost3@example.com"
      }))
      .findByCssSelector("#send2")
        .click()
        .end()
  },

  beforeEach: function() {
    // Go to the page with the address
    return this.remote 
      .execute(function(GLOBAL_PHONE_VALIDATION_AUTH_TOKEN, PRO_WEB_AUTH_TOKEN, GLOBAL_INTUITIVE_AUTH_TOKEN) {
        let script = document.createElement("script");
        script.type = "application/javascript";
        script.src = "http://localhost:8000/lib/Experian/CustomerCustomAttributes/view/frontend/templates/customer/address/edit.js";
        script.id = "edq-magento-experian-customer-custom-attributes-view-frontend-template-customer-address-edit";
        script.setAttribute("GLOBAL_PHONE_VALIDATION_AUTH_TOKEN", GLOBAL_PHONE_VALIDATION_AUTH_TOKEN);
        script.setAttribute("PRO_WEB_AUTH_TOKEN", PRO_WEB_AUTH_TOKEN);
        script.setAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN", GLOBAL_INTUITIVE_AUTH_TOKEN);
        document.body.appendChild(script);
      }, [ GLOBAL_PHONE_VALIDATION_AUTH_TOKEN, PRO_WEB_AUTH_TOKEN, GLOBAL_INTUITIVE_AUTH_TOKEN ])
      .then(pollUntil(function() {
        return window.EDQ;
      }))
  },

  tests: {

    "Phone validation works": function() {
      return this.remote
        .then(pollUntil(function() {
          return document.getElementById("telephone");
        }))
        .then(phoneValidate("6171231212", "#telephone", assert))
        .end()
    },

    "Global Intuitive address verification works for shipping address": function() {
      return this.remote
        .then(pollUntil(function() {
          return document.querySelector("#street_1");
        }))
        .then(globalIntuitiveAddressVerify("53 State St, Boston MA", "#street_1", assert))
        .end()
    },

    "Pro Web Verification works": function() {
      return this.remote
        .then(pollUntil(function() {
          return document.querySelector("[title='Save Address']");
        }))
        .then(proWebVerification({
          "#telephone": "", // Blank so page doesn't submit
          "#street_1": "125 Summer Street",
          "#street_2": "Ste 110",
          "#city": "Boston",
          "#zip": "02110-1685"
        }, "[title='Save Address']", assert))
    }
  }
});
