import intern from "intern";
import { spawn } from "child_process";
import pollUntil from "@theintern/leadfoot/helpers/pollUntil";

const { registerSuite } = intern.getInterface("object");
const { assert } = intern.getPlugin("chai");
const { emailValidate } = intern.getPlugin("helpers");
const { enableCoverage } = intern.getPlugin("helpers");
const EMAIL_VALIDATE_AUTH_TOKEN: string = process.env.EMAIL_VALIDATE_AUTH_TOKEN;

/**
 * The URL to the relevant page that the integration will be added to.
 */
const URL = "https://staging-5em2ouy-hjcmsglwkhlty.us-4.magentosite.cloud";

registerSuite("Experian CustomerCustomAttributesFormRegister", {
  // Add the integration and login.
  before: function() {
    return this.remote
      .setFindTimeout(20000)
      .setExecuteAsyncTimeout(40000)
      .clearCookies()
      .get(`${URL}/customer/account/create/`)
  },

  beforeEach: function() {
    // Go to the page with the address
    return this.remote 
      .execute(function(EMAIL_VALIDATE_AUTH_TOKEN) {
        let script = document.createElement("script");
        script.type = "application/javascript";
        script.src = "http://localhost:8000/lib/Experian/CustomerCustomAttributes/view/frontend/templates/customer/form/register.js";
        script.setAttribute("EMAIL_VALIDATE_AUTH_TOKEN", EMAIL_VALIDATE_AUTH_TOKEN) ;
        script.id = "edq-magento-experian-customer-custom-attributes-view-frontend-template-customer-form-register";
        document.body.appendChild(script);
      }, [ EMAIL_VALIDATE_AUTH_TOKEN ])
      .then(pollUntil(function() {
        return window.EDQ;
      }))
  },

  afterEach: function() {
    return this.remote
      .then(enableCoverage())
  },

  tests: {

    "Email validation works for shipping email address": function() {
      return this.remote
        .then(pollUntil(function() {
          return document.getElementById("email_address");
        }))
        .then(emailValidate("test123@test.com", "#email_address", assert))
        .end()
    }
  }
});
