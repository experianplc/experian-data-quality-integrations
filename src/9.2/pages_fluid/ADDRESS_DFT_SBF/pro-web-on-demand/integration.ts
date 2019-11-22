let currentElement = document.getElementById("edq-9.2-pages_fluid-ADDRESS_DFT_SBF");

let interval = setInterval(function() {
  if (document.getElementById("ADDRESS1") !== null){
    clearInterval(interval);

    /*
        By default PeopleSoft's Save button is embedded in the href
        rather than as an onclick event. This means we have to employ
        the change shown below in order to make sure that after
        saving the original event is called.
     */
    let trigger: HTMLAnchorElement = (document.getElementById("DERIVED_ADDR_FL_SAVE_PB") as HTMLAnchorElement);
    let href = trigger.href.repeat(1);

    function execute() {
      eval(href);
      return false;
    }

    trigger.onclick = execute;
    trigger.href = "#";

    window.EdqConfig = {
      PRO_WEB_SUBMIT_TRIGGERS: [
        {
          type: "click",
          element: trigger
        }
      ],
      PRO_WEB_AUTH_TOKEN: currentElement.getAttribute("PRO_WEB_AUTH_TOKEN"),
      PRO_WEB_LAYOUT: "EDQDemoLayout",
      PRO_WEB_COUNTRY: "USA",
      PRO_WEB_MAPPING: [
        {
          field: document.getElementById("ADDRESS1"),
          elements: ["Primary number", "Street"],
          separator: " ",
          modalFieldSelector: "#interaction-address--original-address-line-one",
        },
        {
          field: document.getElementById("ADDRESS2"),
          elements: ["Secondary number"],
          separator: "",
          modalFieldSelector: "#interaction-address--original-address-line-two",
        },
        {
          field: document.getElementById("CITY"),
          elements: ["City name"],
          separator: "",
          modalFieldSelector: "#interaction-address--original-locality",
        },
        {
          field: document.getElementById("DESCR_STATE"),
          elements: ["State name"],
          separator: "",
          modalFieldSelector: "#interaction-address--original-province",
        },
        {
          field: document.getElementById("POSTAL"),
          elements: ["ZIP Code", "+4 code"],
          separator: "-",
          modalFieldSelector: "#interaction-address--original-postal-code",
        },
        {
          field: document.getElementById("COUNTY"),
          elements: ["County name"],
          separator: "",
          modalFieldSelector: "#"
        },
      ],
    };

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
}, 1000);
