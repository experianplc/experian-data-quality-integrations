<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="spl.tld" prefix="spl" %>
<spl:initializeLocale/>
<link rel="stylesheet" href="https://edqprofservus.blob.core.windows.net/assets/pro-web.css"/>
<script type="text/javascript">
  var callback = function() {
          var edqButton1 = document.createElement("tr");
          edqButton1.innerHTML = `<td><span name="EDQ" id="EDQ-Validate-1" class="uiMargin oraLabel data">Address Validate with Experian</span></td><td class="cellPadding"><input id="edq1" class="oraButton uiMargin " tabindex="6" type="button" title="EDQ Validate" value="EDQ Validate"></td>`;
          var mailingInfo = document.querySelector("#secRow_3 table");
          mailingInfo.appendChild(edqButton1);
          document.getElementById("edq1").onclick = EDQ.address.proWebOnDemand.submitForm;
          window.EdqConfig = Object.assign(parent.window.EdqConfig, {
              PRO_WEB_TYPEDOWN_TRIGGER: document.getElementById('ADDRESS1'),
              PRO_WEB_SUBMIT_TRIGGERS: [
                {
                  type: 'click',
                  element: document.getElementById('edq1'),
                }
              ],

              PRO_WEB_TIMEOUT: 2500,
              PRO_WEB_LAYOUT: 'EDQDemoLayout',
              PRO_WEB_COUNTRY: 'USA',
              PRO_WEB_MAPPING: [
                {
                  field: document.getElementById('ADDRESS1'),
                  elements: ['AddressLine1'],
                  separator: '',
                  modalFieldSelector: '#interaction-address--original-address-line-one',
                },

                {
                  field: document.getElementById('ADDRESS2'),
                  elements: ['AddressLine2'],
                  separator: '',
                  modalFieldSelector: '#interaction-address--original-address-line-two',
                },

                {
                  field: document.getElementById('CITY'),
                  elements: ['CityLocality'],
                  separator: '',
                  modalFieldSelector: '#interaction-address--original-locality',
                },

                {
                  field: document.getElementById('STATE'),
                  elements: ['StateProvince'],
                  separator: '',
                  modalFieldSelector: '#interaction-address--original-province',
                },

                {
                  field: document.getElementById('POSTAL'),
                  elements: ['PostalCode', "+4 Code"],
                  separator: ' ',
                  modalFieldSelector: '#interaction-address--original-postal-code',
                },

                {
                  field: document.getElementById('COUNTY'),
                  elements: ['County'],
                  separator: ' ',
                  modalFieldSelector: '#interaction-address--original-postal-code',
                }
              ]
            });


        var edqScript = document.createElement("script");
        edqScript.type = "text/javascript";
        edqScript.src = "https://edqprofservus.blob.core.windows.net/assets/edq.js";

        var verificationScript = document.createElement("script");
        verificationScript.type = "text/javascript";
        verificationScript.src = "https://edqprofservus.blob.core.windows.net/assets/verification-unicorn.js";

        var typedownScript = document.createElement("script");
        typedownScript.type = "text/javascript";
        typedownScript.src = "https://edqprofservus.blob.core.windows.net/assets/typedown-single-line-unicorn.js";

        document.body.appendChild(edqScript);
        document.body.appendChild(verificationScript);
        document.body.appendChild(typedownScript);
  };

  var complete = document.readyState === "complete";
  var notLoading = (document.readyState !== "loading" && !document.documentElement.doScroll);
  if (complete || notLoading) {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
</script>
