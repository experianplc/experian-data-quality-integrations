//@ts-nocheck
/*
 * Data update for CAN - Canada
 * This file contains the configuration needed specifically for Canada
 * country support
 */

window.EdqCountries["CAN"] = {
  PRO_WEB_TYPEDOWN_TRIGGER: null,
  PRO_WEB_SUBMIT_TRIGGERS: [
    {
      type: "click",
      element: "#SCC_PROF_FL_DRV_SAVE_BTN"
    },
  ],

  PRO_WEB_MAPPING: [
    {
      selector: "#DERIVED_ADDRESS_ADDRESS1",
      addressLines: [0],
      separator: " ",
      modalFieldSelector: "#interaction-address--original-address-line-one",
      typedownFieldSelector: "#typedown-final--address-line-one"
    },
    {
      selector: "#DERIVED_ADDRESS_ADDRESS2",
      addressLines: [1],
      separator: "",
      modalFieldSelector: "#interaction-address--original-address-line-two",
      typedownFieldSelector: "#typedown-final--address-line-two"
    },
    {
      selector: "#DERIVED_ADDRESS_ADDRESS3",
      addressLines: [2],
      separator: "",
      modalFieldSelector: "#interaction-address--original-address-line-two",
      typedownFieldSelector: "#typedown-final--address-line-two"
    },
    {
      selector: "input[id^='DERIVED_ADDRESS_POSTAL']",
      addressLines: [5],
      separator: "-",
      modalFieldSelector: "#interaction-address--original-postal-code",
      typedownFieldSelector: "#typedown-final--postal-code"
    },
    {
      selector: "input[id^='DERIVED_ADDRESS_CITY']",
      addressLines: [3],
      separator: "",
      modalFieldSelector: "#interaction-address--original-locality",
      typedownFieldSelector: "#typedown-final--city"
    },
    {
      selector: "input[id^='SCC_STATE_FL_VW_DESCR']",
      addressLines: [4],
      separator: "",
      modalFieldSelector: "#interaction-address--original-province",
      typedownFieldSelector: "#typedown-final--state"
    },
  ],

  // Logic here needs to be added

  PRO_WEB_COUNTRY: "CAN",

  /* Global Intuitive specific settings */

  GLOBAL_INTUITIVE_MAPPING: [
    { selector: "#DERIVED_ADDRESS_ADDRESS1", elements: address.addressLine1 },
    { selector: "#DERIVED_ADDRESS_ADDRESS2", elements: address.addressLine2 },
    { selector: "input[id^='DERIVED_ADDRESS_CITY']", elements: address.locality },
    { selector: "input[id^='SCC_STATE_FL_VW_DESCR']", elements: components.organisation2 },
    { selector: "input[id^='DERIVED_ADDRESS_POSTAL']", elements: address.postalCode },
  ],

  GLOBAL_INTUITIVE_ISO3_COUNTRY: "CAN",
  GLOBAL_INTUITIVE_CALLBACK: String(function(data) {
    var provinceMap = {
      "AB": "Alberta",
      "BC": "British Columbia",
      "MB": "Manitoba",
      "NB": "New Brunswick",
      "NF": "Newfoundland (NF)",
      "NL": "Newfoundland (NL)",
      "NN": "Nunavut (NN)",
      "NS": "Nova Scotia",
      "NT": "Northwest Territories",
      "NU": "Nunavut (NU)",
      "ON": "Ontario",
      "PE": "Prince Edward Island",
      "QC": "Quebec",
      "SK": "Saskatchewan",
      "YT": "Yukon"
    };

    let provinceElement = document.querySelector("input[id^='SCC_STATE_FL_VW_DESCR']");
    //@ts-ignore
    provinceElement.value = provinceMap[data.address.province];
  })

};
