import intern from "intern";
import { spawn } from "child_process";
import pollUntil from "@theintern/leadfoot/helpers/pollUntil";

const { registerSuite } = intern.getInterface("object");
const { assert } = intern.getPlugin("chai");
const { emailValidate } = intern.getPlugin("helpers");
const { multiFill } = intern.getPlugin("helpers");
const EMAIL_VALIDATE_AUTH_TOKEN: string = process.env.EMAIL_VALIDATE_AUTH_TOKEN;

/**
 * The URL to the relevant page that the integration will be added to.
 */
const URL = "https://staging-5em2ouy-hjcmsglwkhlty.us-4.magentosite.cloud";

registerSuite("Experian CustomerCustomAttributesFormEdit", {
  // Add the integration and login.
  before: function() {
    return this.remote
      .setFindTimeout(30000)
      .setExecuteAsyncTimeout(50000)
      .clearCookies()
      .get(`${URL}/customer/account/edit/`)
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
      .execute(function(EMAIL_VALIDATE_AUTH_TOKEN) {
        let script = document.createElement("script");
        script.type = "application/javascript";
        script.src = "http://localhost:8000/lib/Experian/CustomerCustomAttributes/view/frontend/templates/customer/form/edit.js";
        script.setAttribute("EMAIL_VALIDATE_AUTH_TOKEN", EMAIL_VALIDATE_AUTH_TOKEN) ;
        script.id = "edq-magento-experian-customer-custom-attributes-view-frontend-template-customer-form-edit";
        document.body.appendChild(script);
      }, [ EMAIL_VALIDATE_AUTH_TOKEN ])
      .findByCssSelector("#change-email")
        .click()
        .end()
      .then(pollUntil(function() {
        return window.EDQ;
      }))
  },

  tests: {

    "Email validation works for shipping email address": function() {
      return this.remote
        .then(pollUntil(function() {
          return document.getElementById("email");
        }))
        .then(emailValidate("test123@test.com", "#email", assert))
        .end()
    }
  }
});
