import intern from 'intern';
import { poll, pollEval } from '../pages/main';

const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

function fillInAddressField() {
  return function() {
    return this.parent
      .findByXpath('id("DERIVED_ADDRESS_ADDRESS1")')
        .click()
        .type('125 Summer Street')
        .end()
      .findByXpath('id("DERIVED_ADDRESS_ADDRESS2")')
        .click()
        .type('Ste 110')
        .end()
      .findByXpath('id("DERIVED_ADDRESS_STATE")')
        .click()
        .type('MA')
        .end()
      .findByXpath('id("DERIVED_ADDRESS_CITY")')
        .click()
        .type('Boston')
        .end()
  }
}

// This works for ADDRESS_DFT_SCF
function fillInFluidAddressField() {
  return function() {
    return this.parent
      .findByCssSelector("#ADDRESS1")
        .click()
        .clearValue()
        .type("53 State Street")
        .end()
      .findByCssSelector("#ADDRESS2")
        .click()
        .clearValue()
        .type("Fl 2")
        .end()
      .findByCssSelector("#CITY")
        .click()
        .clearValue()
        .type("Boston")
        .end()
      .findByCssSelector("#DESCR_STATE")
        .click()
        .clearValue()
        .type("Massachusetts")
        .end()
      .findByCssSelector("#POSTAL")
        .click()
        .clearValue()
        .end()
      .findByCssSelector("#COUNTY")
        .click()
        .clearValue()
        .end()
  }
}

registerSuite('PeopleSoft Tests', {

  before: function() {
    return this.remote
      .setFindTimeout(10000)
      .get("http://bospshcm92dev2.qas.com/psp/HCM92EXP/EMPLOYEE/HRMS/h/?tab=DEFAULT")
      .findByCssSelector('#userid')
        .type('PS')
        .end()
      .findByCssSelector('#pwd')
        .type('PS')
        .end()
      .findByCssSelector('#login')
        .submit()
        .end()
  },

  tests: {

    "EO_ADDR_USA_SEC Integration Works": function() {
      return this.remote
        .get('http://bospshcm92dev2.qas.com/psp/HCM92EXP/EMPLOYEE/HRMS/c/ADMINISTER_WORKFORCE_(GBL).PERSONAL_DATA_ADD.GBL?FolderPath=PORTAL_ROOT_OBJECT.HC_WORKFORCE_ADMINISTRATION.CO_PERSONAL_INFORMATION.HC_ADD_PERSON_2&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder')
        .then(poll('#ptifrmtgtframe'))
        .switchToFrame('ptifrmtgtframe')
        .findByCssSelector('#DERIVED_HCR_PER_ADD_PERSON_LINK')
          .click()
          .end()
        .findByXpath('id("ICTAB_1")/SPAN')
          .click()
          .end()
        .findByXpath('id("ADDR_HISTORY_BTN$0")')
          .click()
          .end()
        .then(poll('#DERIVED_ADDR_UPDATE_ADDRESS\\$0'))
        .findByCssSelector('#DERIVED_ADDR_UPDATE_ADDRESS\\$0')
          .click()
          .end()
        .then(fillInAddressField())
        .sleep(1000)
        .findByCssSelector('#EDQ_VERIFY_EO_ADDR_USA_SEC')
          .sleep(100)
          .click()
          .end()
        .sleep(1000)
        .findByCssSelector('#DERIVED_ADDRESS_POSTAL')
          .getProperty('value')
        .then(function(val) {
          assert.equal('02110-1685', val, 'Postal code value populated. Integration functioning')
        })
    },

    "ADDRESS_DFT_SCF Integration Works": function() {
      return this.remote
        .get("http://bospshcm92dev2.qas.com/psc/HCM92EXP/EMPLOYEE/HRMS/c/EL_EMPLOYEE_FL.HR_EE_ADDR_FL.GBL")
        .findByCssSelector("[id='win0divHOME_ADDR_SMRYgridc$0']")
          .click()
          .end()
        .then(poll("#ptModFrame_0"))
        .switchToFrame("ptModFrame_0")
        .then(fillInFluidAddressField())
        .findByCssSelector("#EDQ_VERIFY_")
          .click()
          .sleep(100)
          .click()
          .end()
        .sleep(5000)
        .findByCssSelector("#POSTAL")
          .getProperty("value")
        .then(function(postalCode) {
          assert.equal("02109-3105", postalCode, "Postal code value populated. Integration functioning");
        })
    }

  },
});
