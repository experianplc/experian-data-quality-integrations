/*
 * Data update for FRA - France
 * This file contains the configuration needed specifically for France
 * country support
 */

window.countries["FRA"] = {};

window.countries["FRA"]["PRO_WEB_TYPEDOWN_TRIGGER"] = null;

window.countries["FRA"]["PRO_WEB_SUBMIT_TRIGGERS"] = [
  {
    type: "click",
    element: "#SCC_PROF_FL_DRV_SAVE_BTN"
  },
];

window.countries["FRA"]["PRO_WEB_ON_DEMAND_MAPPING"] = [
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

window.countries["FRA"]["PRO_WEB_MAPPING"] = [
  {
    selector: "#DERIVED_ADDRESS_ADDRESS1",
    elements: ["AddressLine1"],
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
    elements: ["ZipPostal"],
    separator: "-",
    modalFieldSelector: "#interaction-address--original-postal-code",
    typedownFieldSelector: "#typedown-final--postal-code"
  },
  {
    selector: "input[id^='DERIVED_ADDRESS_CITY']",
    elements: ["CityLocality"],
    separator: "",
    modalFieldSelector: "#interaction-address--original-locality",
    typedownFieldSelector: "#typedown-final--city"
  },
  {
    selector: "input[id^='SCC_STATE_FL_VW_DESCR']",
    elements: ["StateProvince"],
    separator: "",
    modalFieldSelector: "#interaction-address--original-province",
    typedownFieldSelector: "#typedown-final--state"
  },
];

// Logic here needs to be added

window.countries["FRA"]["PRO_WEB_COUNTRY"] = "FRA";

/* Global Intuitive specific settings */

window.countries["FRA"]["GLOBAL_INTUITIVE_MAPPING"] = [
  { selector: "#DERIVED_ADDRESS_ADDRESS1", elements: ["address.addressLine1"] },
  { selector: "#DERIVED_ADDRESS_ADDRESS2", elements: ["address.addressLine2"] },
  { selector: "input[id^='DERIVED_ADDRESS_CITY']", elements: ["address.locality"] },
  { selector: "input[id^='SCC_STATE_FL_VW_DESCR']", elements: ["components.province1"] },
  { selector: "input[id^='DERIVED_ADDRESS_POSTAL']", elements: ["address.postalCode"] },
];

window.countries["FRA"]["GLOBAL_INTUITIVE_ISO3_COUNTRY"] = "FRA";

window.countries["FRA"]["GLOBAL_INTUITIVE_CALLBACK"] = String(function(data) {
  let provinceElement = document.querySelector("input[id^='SCC_STATE_FL_VW_DESCR']");

  if (provinceElement.value === "Bas-Rhin") {
    provinceElement.value = "Bas Rhin";
  }
});
