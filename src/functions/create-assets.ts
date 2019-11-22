export default function() {
  var proWebStylesheet = document.createElement("link");
  proWebStylesheet.type = "text/css";
  proWebStylesheet.rel = "stylesheet";
  proWebStylesheet.id = "edq-pro-web-css";
  proWebStylesheet.href = currentElement.getAttribute("PRO_WEB_STYLESHEET") || "https://edqprofservus.blob.core.windows.net/assets/pro-web.css";
  document.body.appendChild(proWebStylesheet);

  var verificationUnicornScript = document.createElement("script");
  verificationUnicornScript.type = "text/javascript";
  verificationUnicornScript.id = "edq-verification-unicorn";
  verificationUnicornScript.src = currentElement.getAttribute("PRO_WEB_VERIFICATION_URL") || "https://edqprofservus.blob.core.windows.net/assets/dev/verification-unicorn.js";

  var edqScript = document.createElement("script");
  edqScript.type = "text/javascript";
  edqScript.src = currentElement.getAttribute("PRO_WEB_EDQ_URL") || "https://edqprofservus.blob.core.windows.net/assets/edq.js"
  edqScript.id = "edq-pegasus";
  edqScript.onload = function() { 
    document.body.appendChild(verificationUnicornScript); 
  }

  if (document.getElementById("edq-pegasus") === null) {
    document.body.appendChild(edqScript);

    // This is here because PeopleSoft will "reset" the integration each time you change a field
    // and refocus. The purpose of this is to rebind the integration.
  } else {
    document.getElementById("edq-verification-unicorn").remove();
    document.body.appendChild(verificationUnicornScript);
  }

}
