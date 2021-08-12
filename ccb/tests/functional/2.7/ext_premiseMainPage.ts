import intern from "intern";
import { spawn } from "child_process";
import pollUntil from "@theintern/leadfoot/helpers/pollUntil";

const { suite, test, before, beforeEach } = intern.getPlugin('interface.tdd');
const { assert } = intern.getPlugin('chai');
const { addGlobalIntuitive } = intern.getPlugin('edq-test-helpers');
const { addProWebOnPremise } = intern.getPlugin('edq-test-helpers');
const { addProWebOnDemand } = intern.getPlugin('edq-test-helpers');
const { typeAddress } = intern.getPlugin('edq-test-helpers');

const root = __dirname + "../../../../..";
const ROOT_PATH = __dirname + "../../../../..";
const PRO_WEB_AUTH_TOKEN = process.env.PRO_WEB_AUTH_TOKEN;
const GLOBAL_INTUITIVE_AUTH_TOKEN = process.env.GLOBAL_INTUITIVE_AUTH_TOKEN;
const ELEMENT_ID = "edq-2.7-root-cm-ext_premiseMainPage";
const INTEGRATION_SOURCE_PATH = "http://localhost:8001/integration.js";
const PRO_WEB_SERVICE_URL = "http://bosccb27.qas.com:2021/";

const URL = "http://bosccb27.qas.com:180/ouaf/cis.html";
const TOUCHPOINT = "http://bosccb27.qas.com:180/ouaf/uiPage/premiseMainPage?language=ENG&svcName=CILCPRMP";

suite("ext_personInfoCorresp Tests", () => {
  before(async ({ remote }) => {
    await remote.setFindTimeout(10000);
    await remote.setExecuteAsyncTimeout(20000);
    await remote.clearCookies();
    await remote.sleep(1000);
    await remote.get(URL);
    let userIdHtmlElement = await remote.findByCssSelector("#userId")
    await userIdHtmlElement.type("sysuser")

    let passwordHtmlElement = await remote.findByCssSelector("#password")
    await passwordHtmlElement.type("hello123")

    let loginButtonHtmlElement = await remote.findByCssSelector("#loginButton")
    await loginButtonHtmlElement.click()
    await remote.then(pollUntil(function() {
        return window.location.href === "http://bosccb27.qas.com/ouaf/cis.jsp" || null;
      }))
  });

  beforeEach(async ({ remote }) => {
    // Go to the page with the address
    await remote.get(TOUCHPOINT);
    await remote.then(pollUntil(function() {
      try {
        return this.frames['main'].frames['dashboard'].document.getElementById("IM_GetToDo") &&
          this.frames['main'].frames['tabPage'].document.getElementById("USER_ID");
      } catch(e) {
        return null;
      }
    }));

    await remote.then(pollUntil(function() {
      // Go to 'Premise' page and switch to 'Main' tab.
      (this.frames["main"] as any).onSubMenuClick(null,"CI0000000185");
      return this.frames['main'].frames['dashboard'].document.getElementById("IM_GetToDo") &&
        this.frames["main"].document.getElementById("ptitle").innerText === "Premise";
    }));

    await remote .then(pollUntil(function() {
      try {
        if (this.frames["main"].frames["tabMenu"].document.querySelector(".activeTab").innerText !== "Main") {
          this.frames["main"].frames["tabMenu"].document.querySelector("[title='Main']").click();
        } 
      } catch(e) {
        return null;
      }

      try {
        return this.frames['main'].frames['dashboard'].document.getElementById("IM_GetToDo") &&
          this.frames["main"].frames["tabMenu"].document.querySelector(".activeTab").innerText === "Correspondence Info";
      } catch(e) {
        return null
      }
    }));

    await remote.then(pollUntil(function() {
      this.context = this.frames["main"].frames["tabPage"];
      this.context.EDQ = null;
      this.context.EdqConfig = null;
      return this.context.document.getElementById("ADDRESS1");
    }));
  })

  test("Pro Web without adding integration fails", async ({ remote }) => {
    await remote.then(typeAddress({
      "address-line-one": "53 State Street",
      "postal-code": "02109-2820"
    }))

    await remote.then(function(value) {
      assert.equal(value, null, "Integration is inactive");
      if (value === null) { return null; }
    })
  });
});

