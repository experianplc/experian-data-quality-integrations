import { 
  createProWebCssElement,
  createGlobalIntuitiveUnicornScript,
  createVerificationUnicornScript,
  createPhoneUnicornScript
} from "utils/functions/script-append";

/**
 * Integration code related to the editing of addresses in the Address Book. In our environment this
 * can be found: 
 * https://int-nwuiyna-hjcmsglwkhlty.us-4.magentosite.cloud/customer/address/edit/id/1/
 */
namespace CustomerCustomAttributesEdit {
  const phoneElement = document.querySelector("[name='telephone']");
  const addressElement = document.getElementById("street_1");

  let currentElement: HTMLElement = document.getElementById("edq-magento-experian-customer-custom-attributes-view-frontend-template-customer-address-edit");

  /**
   * These should be picked up from the Store Variables instead
   */
  window.EdqConfig = {
    GLOBAL_PHONE_VALIDATE_AUTH_TOKEN: currentElement.getAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN"),
    PRO_WEB_AUTH_TOKEN: currentElement.getAttribute("PRO_WEB_AUTH_TOKEN"),
    GLOBAL_INTUITIVE_AUTH_TOKEN: currentElement.getAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN")
  };

  if (window.EdqConfig) {
    if (phoneElement) {
      window.EdqConfig.PHONE_ELEMENTS = [phoneElement];
    }
    if (addressElement) {
      Object.assign(window.EdqConfig, {
        PRO_WEB_SUBMIT_TRIGGERS: [
          {
            type: "submit",
            element: document.querySelector("#form-validate")
          }
        ],
        PRO_WEB_TIMEOUT: 2500,
        PRO_WEB_LAYOUT: 'Database layout',
        PRO_WEB_COUNTRY: 'USA',
        PRO_WEB_MAPPING: [
          {
            field: document.getElementById('street_1'),
            addressLines: [0],
            separator: ' ',
            modalFieldSelector: '#interaction-address--original-address-line-one',
          },
          {
            field: document.getElementById('street_2'),
            addressLines: [1],
            separator: '',
            modalFieldSelector: '#interaction-address--original-address-line-two',
          },
          {
            field: document.getElementById('city'),
            addressLines: [3],
            separator: '',
            modalFieldSelector: '#interaction-address--original-locality',
          },
          {
            field: document.getElementById('region_id'),
            addressLines: [4],
            transformation: function (e) {
              let textValue = e.options[e.selectedIndex].innerText;
              return textValue;
            },
            separator: '',
            modalFieldSelector: '#interaction-address--original-province',
          },
          {
            field: document.getElementById('zip'),
            addressLines: [5],
            separator: '-',
            modalFieldSelector: '#interaction-address--original-postal-code',
          },
        ]
      });
      Object.assign(window.EdqConfig, {
        GLOBAL_INTUITIVE_ELEMENT: addressElement,
        GLOBAL_INTUITIVE_MAPPING: [
          {
            field: addressElement,
            elements: ['address.addressLine1'],
          },
          {
            field: document.querySelector('#street_2'),
            elements: ['address.addressLine2']
          },
          {
            field: document.querySelector('#city'),
            elements: ['address.locality']
          },
          {
            field: document.querySelector('#region_id'),
            elements: ['address.province']
          },
          {
            field: document.querySelector('#zip'),
            elements: ['address.postalCode']
          }
        ]
      });
    }
  }

  let edqScript = document.createElement("script");
  edqScript.type = "application/javascript";
  edqScript.src = "https://edqprofservus.blob.core.windows.net/assets/edq.js";
  edqScript.id = "edq-pegasus";
  edqScript.onload = function () {
    window.savedSubmitHandler = window.jQuery("#form-validate").data("validator").settings.submitHandler;
    window.jQuery("#form-validate").data("validator").settings.submitHandler = null;
    window.jQuery("#form-validate").data("validator").settings.debug = true;
    window.jQuery("#form-validate")[0].onsubmit = function () {
      let button = this.submitter;
      /**
       * Since we're overriding the default form submission behavior, we want to make sure
       * that we re-validate before submitting. Submitting without doing this would result
       * in server-side  validation but the intention is to keep things client-side if possible.
       */
      if (window.jQuery(button.form).valid()) {
        button.disabled = true;
        button.form.submit();
      }
    };
    if (phoneElement) {
      createPhoneUnicornScript(true);
    }
    if (addressElement) {
      /*
       * By default each option uses an index instead of the real value. To get
       * around this we will kk
       */
      createProWebCssElement(true);
      createVerificationUnicornScript(true);
      createGlobalIntuitiveUnicornScript(true);
    }
  };
  let targetNode = document.querySelector("#form-validate");
  let targetNodeConfig = { attributes: true, childList: true, subtree: true };
  let iterations = 0;
  let iterator = function () {
    // An arbitrary number ( 5 seconds )
    if (iterations > 10) {
      return;
    }

    try {
      if (window.jQuery("#form-validate").data("validator")) {
        if (document.getElementById("edq-pegasus") === null) {
          document.body.appendChild(edqScript);
        }
      } else {
        iterations++;
        setTimeout(iterator, 500);
      }
    }
    catch (e) {
      iterations++;
      setTimeout(iterator, 500);
    }
  };
  iterator();
}
