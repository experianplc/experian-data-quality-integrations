"use strict";
exports.__esModule = true;
var intern_1 = require("intern");
var main_1 = require("../pages/main");
var registerSuite = intern_1["default"].getInterface('object').registerSuite;
var assert = intern_1["default"].getPlugin('chai').assert;
function fillInAddressField() {
    return function () {
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
            .end();
    };
}
// This works for ADDRESS_DFT_SCF
function fillInFluidAddressField() {
    return function () {
        return this.parent
            .findByCssSelector("#ADDRESS1")
            .clearValue()
            .type("53 State Street")
            .end()
            .findByCssSelector("#ADDRESS2")
            .clearValue()
            .type("Fl 2")
            .end()
            .findByCssSelector("#CITY")
            .clearValue()
            .type("Boston")
            .end()
            .findByCssSelector("#DESCR_STATE")
            .clearValue()
            .type("Massachusetts")
            .end()
            .findByCssSelector("#POSTAL")
            .clearValue()
            .end()
            .findByCssSelector("#COUNTY")
            .clearValue()
            .end();
    };
}
registerSuite('PeopleSoft HCM Tests', {
    before: function () {
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
            .end();
    },
    tests: {
        "EO_ADDR_USA_SEC Integration Works - Pro Web": function () {
            return this.remote
                .get('http://bospshcm92dev2.qas.com/psp/HCM92EXP/EMPLOYEE/HRMS/c/ADMINISTER_WORKFORCE_(GBL).PERSONAL_DATA_ADD.GBL?FolderPath=PORTAL_ROOT_OBJECT.HC_WORKFORCE_ADMINISTRATION.CO_PERSONAL_INFORMATION.HC_ADD_PERSON_2&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder')
                .then(main_1.poll('#ptifrmtgtframe'))
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
                .then(main_1.poll('#DERIVED_ADDR_UPDATE_ADDRESS\\$0'))
                .findByCssSelector('#DERIVED_ADDR_UPDATE_ADDRESS\\$0')
                .click()
                .end()
                .then(fillInAddressField())
                .sleep(3000)
                .findByCssSelector('#EDQ_VERIFY_EO_ADDR_USA_SEC')
                .sleep(100)
                .click()
                .end()
                .sleep(1500)
                .findByCssSelector('#DERIVED_ADDRESS_POSTAL')
                .getProperty('value')
                .then(function (postalCode) {
                assert.equal(true, Boolean(postalCode), 'Postal code value populated. Integration functioning');
            });
        },
        "EO_ADDR_USA_SEC Integration Works - Global Intuitive": function () {
            return this.remote
                .get('http://bospshcm92dev2.qas.com/psp/HCM92EXP/EMPLOYEE/HRMS/c/ADMINISTER_WORKFORCE_(GBL).PERSONAL_DATA_ADD.GBL?FolderPath=PORTAL_ROOT_OBJECT.HC_WORKFORCE_ADMINISTRATION.CO_PERSONAL_INFORMATION.HC_ADD_PERSON_2&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder')
                .then(main_1.poll('#ptifrmtgtframe'))
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
                .then(main_1.poll('#DERIVED_ADDR_UPDATE_ADDRESS\\$0'))
                .findByCssSelector('#DERIVED_ADDR_UPDATE_ADDRESS\\$0')
                .click()
                .end()
                .sleep(1000)
                .findByCssSelector("#DERIVED_ADDRESS_ADDRESS1")
                .type("53 State Street")
                .sleep(1000)
                .end()
                .execute(function () {
                document.getElementById("DERIVED_ADDRESS_ADDRESS1").dispatchEvent(new KeyboardEvent("keyup"));
            })
                .findByCssSelector(".edq-global-intuitive-address-suggestion")
                .click()
                .end()
                .sleep(500)
                .findByCssSelector('#DERIVED_ADDRESS_POSTAL')
                .getProperty('value')
                .then(function (postalCode) {
                assert.equal(true, Boolean(postalCode), 'Postal code value populated. Integration functioning');
            });
        },
        "ADDRESS_DFT_SCF Integration Works": function () {
            return this.remote
                .get("http://bospshcm92dev2.qas.com/psc/HCM92EXP/EMPLOYEE/HRMS/c/EL_EMPLOYEE_FL.HR_EE_ADDR_FL.GBL")
                .sleep(5000)
                .findByCssSelector("[id='win0divHOME_ADDR_SMRYgridc$0']")
                .click()
                .sleep(2000)
                .end()
                .then(main_1.poll("#ptModFrame_0"))
                .switchToFrame("ptModFrame_0")
                .then(fillInFluidAddressField())
                .findByCssSelector("#EDQ_VERIFY_")
                .click()
                .sleep(500)
                .click()
                .end()
                .sleep(5000)
                .findByCssSelector("#POSTAL")
                .getProperty("value")
                .then(function (postalCode) {
                assert.equal("02109-3105", postalCode, "Postal code value populated. Integration functioning");
            });
        }
    }
});
