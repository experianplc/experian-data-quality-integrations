//@ts-nocheck
/*
 * Data update for CAN - Canada
 * This file contains the configuration needed specifically for Canada
 * country support
 */

window.countries["CAN"] = {};

window.countries["CAN"]["PRO_WEB_TYPEDOWN_TRIGGER"] = null;

window.countries["CAN"]["PRO_WEB_SUBMIT_TRIGGERS"] = [
  {
    type: "click",
    element: "#SCC_PROF_FL_DRV_SAVE_BTN"
  },
];

window.countries["CAN"]["PRO_WEB_ON_DEMAND_MAPPING"] = [
  {
    selector: "#DERIVED_ADDRESS_ADDRESS1",
    elements: ["Building number", "Street name"],
    separator: " ",
    modalFieldSelector: "#interaction-address--original-address-line-one",
    typedownFieldSelector: "#typedown-final--address-line-one"
  },
  {
    selector: "#DERIVED_ADDRESS_ADDRESS2",
    elements: ["AddressLine2"],
    separator: "",
    modalFieldSelector: "#interaction-address--original-address-line-two",
    typedownFieldSelector: "#typedown-final--address-line-two"
  },
  {
    selector: "#DERIVED_ADDRESS_ADDRESS3",
    elements: ["AddressLine3"],
    separator: "",
    modalFieldSelector: "#interaction-address--original-address-line-two",
    typedownFieldSelector: "#typedown-final--address-line-two"
  },
  {
    selector: "input[id^='DERIVED_ADDRESS_POSTAL']",
    elements: ["Postal code"],
    separator: "-",
    modalFieldSelector: "#interaction-address--original-postal-code",
    typedownFieldSelector: "#typedown-final--postal-code"
  },
  {
    selector: "input[id^='DERIVED_ADDRESS_CITY']",
    elements: ["Municipality name"],
    separator: "",
    modalFieldSelector: "#interaction-address--original-locality",
    typedownFieldSelector: "#typedown-final--city"
  },
  {
    selector: "input[id^='SCC_STATE_FL_VW_DESCR']",
    elements: ["Province name (English)"],
    separator: "",
    modalFieldSelector: "#interaction-address--original-province",
    typedownFieldSelector: "#typedown-final--state"
  },
];

window.countries["CAN"]["PRO_WEB_MAPPING"] = [
  {
    selector: "#DERIVED_ADDRESS_ADDRESS1",
    elements: ["Building number", "Street name"],
    separator: " ",
    modalFieldSelector: "#interaction-address--original-address-line-one",
    typedownFieldSelector: "#typedown-final--address-line-one"
  },
  {
    selector: "#DERIVED_ADDRESS_ADDRESS2",
    elements: ["Building name"],
    separator: "",
    modalFieldSelector: "#interaction-address--original-address-line-two",
    typedownFieldSelector: "#typedown-final--address-line-two"
  },
  {
    selector: "#DERIVED_ADDRESS_ADDRESS3",
    elements: ["PO Box number"],
    separator: "",
    modalFieldSelector: "#interaction-address--original-address-line-two",
    typedownFieldSelector: "#typedown-final--address-line-two"
  },
  {
    selector: "input[id^='DERIVED_ADDRESS_POSTAL']",
    elements: ["Postal code"],
    separator: "-",
    modalFieldSelector: "#interaction-address--original-postal-code",
    typedownFieldSelector: "#typedown-final--postal-code"
  },
  {
    selector: "input[id^='DERIVED_ADDRESS_CITY']",
    elements: ["MUNICIPALITY NAME"],
    separator: "",
    modalFieldSelector: "#interaction-address--original-locality",
    typedownFieldSelector: "#typedown-final--city"
  },
  {
    selector: "input[id^='SCC_STATE_FL_VW_DESCR']",
    elements: ["Province name (English)"],
    separator: "",
    modalFieldSelector: "#interaction-address--original-province",
    typedownFieldSelector: "#typedown-final--state"
  },
];

// Logic here needs to be added

window.countries["CAN"]["PRO_WEB_COUNTRY"] = "CAN";

/* Global Intuitive specific settings */

window.countries["CAN"]["GLOBAL_INTUITIVE_MAPPING"] = [
  { selector: "#DERIVED_ADDRESS_ADDRESS1", elements: ["address.addressLine1"] },
  { selector: "#DERIVED_ADDRESS_ADDRESS2", elements: ["address.addressLine2"] },
  { selector: "input[id^='DERIVED_ADDRESS_CITY']", elements: ["address.locality"] },
  { selector: "input[id^='SCC_STATE_FL_VW_DESCR']", elements: ["components.organisation2"] },
  { selector: "input[id^='DERIVED_ADDRESS_POSTAL']", elements: ["address.postalCode"] },
];

window.countries["CAN"]["GLOBAL_INTUITIVE_ISO3_COUNTRY"] = "CAN";
window.countries["CAN"]["GLOBAL_INTUITIVE_CALLBACK"] = String(function(data) {
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
});
