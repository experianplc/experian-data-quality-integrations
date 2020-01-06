import intern from "intern";

interface GlobalIntuitiveParams {
  authToken: string;
  elementId?: string;
  source: string;
}

export function addGlobalIntuitive(obj: GlobalIntuitiveParams) {
  let { authToken, elementId, source } = obj;

  return function() {
    return this.parent
      .execute(function(authToken, elementId, source) {
        let element = (this.context || this).document.createElement("div");
        if (elementId) {
          element.id = elementId;
        }
        element.setAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN", authToken);

        let script = (this.context || this).document.createElement("script");
        script.src = source;

        (this.context || this).document.body.appendChild(element);
        (this.context || this).document.body.appendChild(script);
      }, [ authToken, elementId, source ])
  }
};

interface ProWebParameters {
  authToken?: string;
  serviceUrl?: string;
  elementId?: string;
  source: string;
  useTypedown: boolean;
  document?: Document;
}

/**
 * Adds Pro Web to the page with the specified proxied service url.
 */
export function addProWebOnPremise(obj: ProWebParameters) {
  let { serviceUrl, source, useTypedown, elementId } = obj;
  if (!useTypedown) {
    useTypedown = false
  }

  return function() {
    return this.parent
      .execute(function(serviceUrl, source, useTypedown, elementId) {
        let element = (this.context || this).document.createElement("div");
        if (elementId) {
          element.id = elementId;
        }
        element.setAttribute("PRO_WEB_USE_TYPEDOWN", useTypedown);
        element.setAttribute("PRO_WEB_SERVICE_URL", serviceUrl);

        let script = (this.context || this).document.createElement("script");
        script.src = source;

        (this.context || this).document.body.appendChild(element);
        (this.context || this).document.body.appendChild(script);

      }, [ serviceUrl, source, useTypedown, elementId ])
  }
}

/**
 * Adds Pro Web On Demand to the page with the specified authorization token.
 */
export function addProWebOnDemand(obj: ProWebParameters) {
  let { authToken, source, useTypedown, elementId } = obj;

  return function() {
    return this.parent
      .execute(function(PRO_WEB_AUTH_TOKEN, source, useTypedown, elementId) {
        let element = (this.context || this).document.createElement("div");
        if (elementId) {
          element.id = elementId;
        }
        element.setAttribute("PRO_WEB_USE_TYPEDOWN", useTypedown);
        element.setAttribute("PRO_WEB_AUTH_TOKEN", PRO_WEB_AUTH_TOKEN);

        let script = document.createElement("script");
        script.src = source;

        (this.context || this).document.body.appendChild(element);
        (this.context || this).document.body.appendChild(script);

      }, [ authToken, source, useTypedown, elementId ])
  }
}

import pollUntil from "@theintern/leadfoot/helpers/pollUntil";

/**
 * Given a PRO_WEB_MAPPING, the relevant fields are typed and submitted.
 */
interface AddressMap {
  "address-line-one"?: string;
  "address-line-two"?: string;
  "postal-code"?: string;
  "locality"?: string;
  "province"?: string;
}

export function typeAddress(addressMap: AddressMap) {
  return function() {
    return this.parent
      .execute(function(addressMap) {
        if (!(this.context || this).EdqConfig) { return null; }

        (this.context || this).EdqConfig.PRO_WEB_MAPPING.forEach((mapping: any) => {
          mapping.field.value = null;

          Object.keys(addressMap).forEach((addressKey) => {
            if (mapping.modalFieldSelector.includes(addressKey)) {
              if (mapping.field.id) {
                this.context.document.getElementById(mapping.field.id).value = addressMap[addressKey];
              }
              mapping.field.value = addressMap[addressKey];
              mapping.field.innerText = addressMap[addressKey];
            }           
          })
        });
      }, [ addressMap ])
  }
};

intern.registerPlugin("edq-test-helpers", function() {
  return {
    typeAddress: typeAddress,
    addProWebOnPremise: addProWebOnPremise,
    addProWebOnDemand: addProWebOnDemand,
    addGlobalIntuitive: addGlobalIntuitive
  };
});

