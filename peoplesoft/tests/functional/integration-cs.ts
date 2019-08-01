import intern from 'intern';
import keys from '@theintern/leadfoot/keys';
import { poll, pollEval, pollUntil } from '../pages/main';

const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

function fillInFluidAddressField() {
  return function() {
    return this.parent
      .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
        .click()
        .clearValue()
        .type("53 State Street")
        .end()
      .findByCssSelector("#DERIVED_ADDRESS_ADDRESS2")
        .click()
        .clearValue()
        .type("Fl 2")
        .end()
      .findByCssSelector("[id='DERIVED_ADDRESS_CITY$69$']")
        .click()
        .clearValue()
        .type("Boston")
        .end()
      .findByCssSelector("#SCC_STATE_FL_VW_DESCR")
        .click()
        .clearValue()
        .type("Massachusetts")
        .end()
      .findByCssSelector("[id='DERIVED_ADDRESS_POSTAL$70$']")
        .click()
        .clearValue()
        .end()
      .findByCssSelector("#DERIVED_ADDRESS_COUNTY")
        .click()
        .clearValue()
        .end()
  }
}

registerSuite("PeopleSoft CS Tests", {

  before: function() {
    return this.remote
      .setFindTimeout(10000)
      .get("http://bospsoftcs92.qas.com:8000/psc/ps_11/EMPLOYEE/SA/c/NUI_FRAMEWORK.PT_LANDINGPAGE.GBL?")
      .findByCssSelector('#userid')
        .type("PS")
        .end()
      .findByCssSelector("#pwd")
        .type("Hello123")
        .end()
      .findByCssSelector("#login")
        .submit()
        .end()
      .sleep(2000)
  },

  tests: {

    "SCC_ADDRESS_DTL_F Integration Works - Pro Web": function() {
      return this.remote
        .get("http://bospsoftcs92.qas.com:8000/psc/ps_14/EMPLOYEE/SA/c/SCC_PROFILE_FL.SCC_ADDR_DTLS_FL.GBL")
        .sleep(1500)
        .findByLinkText("Current")
          .click()
          .end()
        .then(poll("#ptModFrame_0"))
        .sleep(2000)
        .switchToFrame("ptModFrame_0") 
        .then(fillInFluidAddressField())
        .sleep(1000)
        .findByLinkText('Verify Address')
          .click()
          .sleep(5000)
          .click()
          .end()
        .findByCssSelector('#DERIVED_ADDRESS_POSTAL\\$70\\$')
          .getProperty('value')
        .then(function(postalCode) {
          assert.equal(true, Boolean(postalCode), 'Postal code value populated. Integration functioning')
        })
    },

    "SCC_ADDRESS_DTL_F Integration Works - Global Intuitive": function() {
      return this.remote
        .get("http://bospsoftcs92.qas.com:8000/psc/ps_14/EMPLOYEE/SA/c/SCC_PROFILE_FL.SCC_ADDR_DTLS_FL.GBL")
        .sleep(1500)
        .findByLinkText("Current")
          .click()
          .end()
        .then(poll("#ptModFrame_0"))
        .sleep(2000)
        .switchToFrame("ptModFrame_0") 
        .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
          .clearValue()
          .type("53 State Street")
          .sleep(1000)
          .end()
        .execute(function() {
          document.getElementById("DERIVED_ADDRESS_ADDRESS1").dispatchEvent(new KeyboardEvent("keyup"))
        })
        .findByCssSelector(".edq-global-intuitive-address-suggestion")
          .click()
          .end()
        .sleep(500)
        .findByCssSelector('input[id^="DERIVED_ADDRESS_POSTAL"]')
          .getProperty('value')
        .then(function(postalCode) {
          assert.equal(true, Boolean(postalCode), 'Postal code value populated. Integration functioning')
        })
    }

  },
});
