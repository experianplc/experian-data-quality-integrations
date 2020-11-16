import { createEmailUnicornScript } from "utils/functions/script-append";

/**
 * Integration code related to the creation of a new account. In our environment this can be found:
 * https://int-nwuiyna-hjcmsglwkhlty.us-4.magentosite.cloud/customer/account/create/
 */
namespace CustomerCustomAttributesFormEdit {
  let currentElement: HTMLElement = document.getElementById("edq-magento-experian-customer-custom-attributes-view-frontend-template-customer-form-edit");

  /**
   * This needs to be configurable either in the code directly or as a site variable
   */
  window.EdqConfig = <UnicornObject> {
    EMAIL_VALIDATE_AUTH_TOKEN: currentElement.getAttribute("EMAIL_VALIDATE_AUTH_TOKEN")
  };

  let emailElement: HTMLInputElement = document.querySelector("[type='email']");
  if (window.EdqConfig) {
    if (emailElement) {
      window.EdqConfig.EMAIL_ELEMENTS = [emailElement];
    }
  }

  const jQuery = window.jQuery;
  let edqScript: HTMLScriptElement = document.createElement("script");
  edqScript.type = "application/javascript";
  edqScript.src = "https://edqprofservus.blob.core.windows.net/assets/edq.js";
  edqScript.id = "edq-pegasus";
  edqScript.onload = function(): void {
    window.savedSubmitHandler = jQuery("#form-validate").data("validator").settings.submitHandler;
    jQuery("#form-validate").data("validator").settings.submitHandler = null
    jQuery("#form-validate").data("validator").settings.debug = true;
    jQuery("#form-validate")[0].onsubmit = function(e) {
      let button = e.submitter;

      /**
       * Since we're overriding the default form submission behavior, we want to make sure
       * that we re-validate before submitting. Submitting without doing this would result
       * in server-side  validation but the intention is to keep things client-side if possible.
       */
      if (jQuery(button.form).valid()) {
        button.disabled = true;
        button.form.submit();
      }
    }

    if (emailElement) {
      const emailUnicornScript = createEmailUnicornScript();
      document.body.appendChild(emailUnicornScript);
    }
  }

  let targetNode: HTMLElement  = document.querySelector("#form-validate");
  let targetNodeConfig: any = { attributes: true, childList: true, subtree: true };

  let observer = new MutationObserver(function(mutationsList, observer) {
    for (const mutation of mutationsList) {
      try {
        if (jQuery("#form-validate").data("validator")) {
          if (document.getElementById("edq-pegasus") === null) {
            document.body.appendChild(edqScript);
          }
          observer.disconnect();
        }
      } catch(e) {
        // jQuery not loaded yet
      }
    }
  });

  observer.observe(targetNode, targetNodeConfig);
}
