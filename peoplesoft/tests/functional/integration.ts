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

registerSuite('PeopleSoft Tests', {

  beforeEach: function() {
    return this.remote
      .setFindTimeout(10000)
      .get('http://bospshcm92dev2.qas.com/psp/HCM92EXP/EMPLOYEE/HRMS/c/ADMINISTER_WORKFORCE_(GBL).PERSONAL_DATA_ADD.GBL?FolderPath=PORTAL_ROOT_OBJECT.HC_WORKFORCE_ADMINISTRATION.CO_PERSONAL_INFORMATION.HC_ADD_PERSON_2&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder')
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

    'EO_ADDR_USA_SEC Integration Works': function() {
      return this.remote
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
          .click()
          .end()
        .sleep(1000)
        .findByCssSelector('#DERIVED_ADDRESS_POSTAL')
          .getProperty('value')
        .then(function(val) {
          assert.equal('02110-1685', val, 'Postal code value populated. Integration functioning')
        })
    }
  },
});
