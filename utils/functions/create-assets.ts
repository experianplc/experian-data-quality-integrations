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
  verificationUnicornScript.src = currentElement.getAttribute("PRO_WEB_VERIFICATION_URL") || "https://edqprofservus.blob.core.windows.net/assets/1.8.2/verification-unicorn.js";

  var typedownUnicornScript = document.createElement("script");
  typedownUnicornScript.type = "text/javascript";
  typedownUnicornScript.id = "edq-typedown-unicorn";
  typedownUnicornScript.src = currentElement.getAttribute("PRO_WEB_TYPEDOWN_URL") || "https://edqprofservus.blob.core.windows.net/assets/1.8.2/typedown-unicorn.js";

  var globalIntuitiveUnicornScript = document.createElement("script");
  globalIntuitiveUnicornScript.type = "text/javascript";
  globalIntuitiveUnicornScript.id = "edq-global-intuitive-unicorn";
  globalIntuitiveUnicornScript.src = currentElement.getAttribute("GLOBAL_INTUITIVE_URL") || "https://edqprofservus.blob.core.windows.net/assets/1.8.2/global-intuitive-unicorn.js";

  function addVerificationUnicorn(currentElement) {
    let proWebAuthToken = currentElement.getAttribute("PRO_WEB_AUTH_TOKEN");
    let proWebServiceUrl = currentElement.getAttribute("PRO_WEB_SERVICE_URL");

    if (proWebAuthToken || proWebServiceUrl) {
      document.body.appendChild(verificationUnicornScript); 
    }
  }

  function addGlobalIntuitiveUnicorn(currentElement) {
    let globalIntuitiveAuthToken = currentElement.getAttribute("GLOBAL_INTUITIVE_AUTH_TOKEN");
    if (globalIntuitiveAuthToken) {
      document.body.appendChild(globalIntuitiveUnicornScript); 
    }
  }

  function addTypedownUnicorn(currentElement) {
    let proWebAuthToken = currentElement.getAttribute("PRO_WEB_AUTH_TOKEN");
    let proWebServiceUrl = currentElement.getAttribute("PRO_WEB_SERVICE_URL");

    let useTypedown = currentElement.getAttribute("PRO_WEB_USE_TYPEDOWN") &&
      currentElement.getAttribute("PRO_WEB_USE_TYPEDOWN") !== "false";
    if ((useTypedown && proWebAuthToken) || (useTypedown && proWebServiceUrl)) {
      document.body.appendChild(typedownUnicornScript); 
    }
  }

  var edqScript = document.createElement("script");
  edqScript.type = "text/javascript";
  edqScript.src = currentElement.getAttribute("PRO_WEB_EDQ_URL") || "https://edqprofservus.blob.core.windows.net/assets/edq.js"
  edqScript.id = "edq-pegasus";
  edqScript.onload = function() { 
    addVerificationUnicorn(currentElement);
    addGlobalIntuitiveUnicorn(currentElement);
    addTypedownUnicorn(currentElement);
  }

  if (document.getElementById("edq-pegasus") === null) {
    document.body.appendChild(edqScript);

    // This is here because PeopleSoft will "reset" the integration each time you change a field
    // and refocus. The purpose of this is to rebind the integration.
  } else {
    try {
      document.getElementById("edq-verification-unicorn").remove();
    } catch(e) {}
    addVerificationUnicorn(currentElement);

    try {
      document.getElementById("edq-typedown-unicorn").remove();
    } catch(e) {}
    addTypedownUnicorn(currentElement);

    try {
      document.getElementById("edq-global-intuitive-unicorn").remove();
    } catch(e) {}
    addGlobalIntuitiveUnicorn(currentElement);

  }

}
