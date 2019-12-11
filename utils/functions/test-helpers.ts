interface GlobalIntuitiveParams {
  authToken: string;
  elementId?: string;
  source: string;
}

export function addGlobalIntuitive(obj: GlobalIntuitiveParams) {
  let { authToken, elementId, source } = obj;

  return function() {
    return this.parent
      .execute(function(authToken) {
        let element = document.createElement("div");
        element.id = elementId;
        element.setAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN", authToken);

        let script = document.createElement("script");
        script.src = source;

        document.body.appendChild(element);
        document.body.appendChild(script);
      }, [ authToken ])
  }
};

interface ProWebParameters {
  authToken?: string;
  serviceUrl?: string;
  elementId?: string;
  source: string;
  useTypedown: boolean;
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
      .execute(function(useTypedown) {
        let element = document.createElement("div");
        element.id = elementId;
        element.setAttribute("PRO_WEB_USE_TYPEDOWN", useTypedown);
        element.setAttribute("PRO_WEB_SERVICE_URL", serviceUrl);

        let script = document.createElement("script");
        script.src = source;

        document.body.appendChild(element);
        document.body.appendChild(script);

      }, [ useTypedown ])
  }
}

/**
 * Adds Pro Web On Demand to the page with the specified authorization token.
 */
export function addProWebOnDemand(obj: ProWebParameters) {
  let { authToken, source, useTypedown, elementId } = obj;

  return function() {
    return this.parent
      .execute(function(PRO_WEB_AUTH_TOKEN, root, useTypedown) {
        let element = document.createElement("div");
        element.id = elementId;
        element.setAttribute("PRO_WEB_USE_TYPEDOWN", useTypedown);
        element.setAttribute("PRO_WEB_AUTH_TOKEN", PRO_WEB_AUTH_TOKEN);

        let script = document.createElement("script");
        script.src = source;

        document.body.appendChild(element);
        document.body.appendChild(script);

      }, [ authToken, useTypedown ])
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
      .execute(function() {
        return (window as any).EdqConfig.PRO_WEB_MAPPING.includes((obj) => {
          return obj.modalFieldSelector.includes("address-line-one")
        })[0].field;
      })
      .then(function(field) {
        return this.parent
          .findByCssSelector(field.id)
          .clearValue()
          .type(addressMap["address-line-one"])
          .end()
      })
  }
};
