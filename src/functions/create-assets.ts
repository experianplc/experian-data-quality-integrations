export function createAssets(currentElement) {
  var proWebStylesheet = document.createElement("link");
  proWebStylesheet.type = "text/css";
  proWebStylesheet.rel = "stylesheet";
  proWebStylesheet.id = "edq-pro-web-css";
  proWebStylesheet.href = currentElement.getAttribute("PRO_WEB_STYLESHEET") || "https://edqprofservus.blob.core.windows.net/assets/pro-web.css";
  document.body.appendChild(proWebStylesheet);

  var verificationUnicornScript = document.createElement("script");
  verificationUnicornScript.type = "text/javascript";
  verificationUnicornScript.id = "edq-verification-unicorn";
  verificationUnicornScript.src = currentElement.getAttribute("PRO_WEB_VERIFICATION_URL") || "https://edqprofservus.blob.core.windows.net/assets/verification-unicorn.js";

  var typedownUnicornScript = document.createElement("script");
  typedownUnicornScript.type = "text/javascript";
  typedownUnicornScript.id = "edq-typedown-unicorn";
  typedownUnicornScript.src = currentElement.getAttribute("PRO_WEB_TYPEDOWN_URL") || "https://edqprofservus.blob.core.windows.net/assets/typedown-unicorn.js";

  var globalIntuitiveUnicornScript = document.createElement("script");
  globalIntuitiveUnicornScript.type = "text/javascript";
  globalIntuitiveUnicornScript.id = "edq-global-intuitive-unicorn";
  globalIntuitiveUnicornScript.src = currentElement.getAttribute("GLOBAL_INTUITIVE_URL") || "https://edqprofservus.blob.core.windows.net/assets/global-intuitive-unicorn.js";

  var edqScript = document.createElement("script");
  edqScript.type = "text/javascript";
  edqScript.src = currentElement.getAttribute("PRO_WEB_EDQ_URL") || "https://edqprofservus.blob.core.windows.net/assets/edq.js"
  edqScript.id = "edq-pegasus";
  edqScript.onload = function() { 
    let proWebAuthToken = currentElement.getAttribute("PRO_WEB_AUTH_TOKEN");
    let proWebServiceUrl = currentElement.getAttribute("PRO_WEB_SERVICE_URL");
    if (proWebAuthToken || proWebServiceUrl) {
      document.body.appendChild(verificationUnicornScript); 
    }

    let globalIntuitiveAuthToken = currentElement.getAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN");
    if (globalIntuitiveAuthToken) {
      document.body.appendChild(globalIntuitiveUnicornScript); 
    }

    let useTypedown = currentElement.getAttribute("PRO_WEB_USE_TYPEDOWN");
    if ((useTypedown && proWebAuthToken) || (useTypedown && proWebServiceUrl)) {
      document.body.appendChild(typedownUnicornScript); 
    }
  }

  if (document.getElementById("edq-pegasus") === null) {
    document.body.appendChild(edqScript);

    // This is here because PeopleSoft will "reset" the integration each time you change a field
    // and refocus. The purpose of this is to rebind the integration.
  } else {
    document.getElementById("edq-verification-unicorn").remove();
    document.body.appendChild(verificationUnicornScript);

    document.getElementById("edq-typedown-unicorn").remove();
    document.body.appendChild(typedownUnicornScript);

    document.getElementById("edq-global-intuitive-unicorn").remove();
    document.body.appendChild(globalIntuitiveUnicornScript);

  }

}
