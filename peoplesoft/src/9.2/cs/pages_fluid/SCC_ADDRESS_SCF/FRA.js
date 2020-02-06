//@ts-nocheck
/*
 * Data update for FRA - France
 * This file contains the configuration needed specifically for France
 * country support
 */

window.EdqCountries["FRA"] = {
  /* Pro Web specific */
  PRO_WEB_TYPEDOWN_TRIGGER: null,
  PRO_WEB_SUBMIT_TRIGGERS: [
    {
      type: "click",
      element: "#SCC_PROF_FL_DRV_SAVE_BTN"
    },
  ],

  PRO_WEB_ON_DEMAND_MAPPING: [
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
      elements: ["Postcode"],
      separator: "",
      modalFieldSelector: "#interaction-address--original-postal-code",
      typedownFieldSelector: "#typedown-final--postal-code"
    },
    {
      selector: "input[id^='DERIVED_ADDRESS_CITY']",
      elements: ["Town"],
      separator: "",
      modalFieldSelector: "#interaction-address--original-locality",
      typedownFieldSelector: "#typedown-final--city"
    },
    {
      selector: "input[id^='SCC_STATE_FL_VW_DESCR']",
      elements: ["Département"],
      separator: "",
      modalFieldSelector: "#interaction-address--original-province",
      typedownFieldSelector: "#typedown-final--state"
    },
  ],

  PRO_WEB_MAPPING: [
    {
      selector: "#DERIVED_ADDRESS_ADDRESS1",
      elements: ["Number", "Street name"],
      separator: " ",
      modalFieldSelector: "#interaction-address--original-address-line-one",
      typedownFieldSelector: "#typedown-final--address-line-one"
    },
    {
      selector: "#DERIVED_ADDRESS_ADDRESS2",
      elements: ["Company name"],
      separator: "",
      modalFieldSelector: "#interaction-address--original-address-line-two",
      typedownFieldSelector: "#typedown-final--address-line-two"
    },
    {
      selector: "#DERIVED_ADDRESS_ADDRESS3",
      elements: ["Additional geographic data"],
      separator: "",
      modalFieldSelector: "#interaction-address--original-address-line-two",
      typedownFieldSelector: "#typedown-final--address-line-two"
    },
    {
      selector: "input[id^='DERIVED_ADDRESS_POSTAL']",
      elements: ["Postcode"],
      separator: "-",
      modalFieldSelector: "#interaction-address--original-postal-code",
      typedownFieldSelector: "#typedown-final--postal-code"
    },
    {
      selector: "input[id^='DERIVED_ADDRESS_CITY']",
      elements: ["TOWN"],
      separator: "",
      modalFieldSelector: "#interaction-address--original-locality",
      typedownFieldSelector: "#typedown-final--city"
    },
    {
      selector: "input[id^='SCC_STATE_FL_VW_DESCR']",
      elements: ["Department"],
      separator: "",
      modalFieldSelector: "#interaction-address--original-province",
      typedownFieldSelector: "#typedown-final--state"
    },
  ],

  PRO_WEB_CALLBACK: String(function(originalTrigger, newEvent) {
    let provinceElement = document.querySelector("input[id^='SCC_STATE_FL_VW_DESCR']");
    provinceElement.value = provinceElement.value.replace(/-/g, " ");
    originalTrigger(newEvent);
  }),

  PRO_WEB_COUNTRY: "FRA",

  /* Global Intuitive specific settings */
  GLOBAL_INTUITIVE_MAPPING: [
    { selector: "#DERIVED_ADDRESS_ADDRESS1", elements: ["address.addressLine1"] },
    { selector: "#DERIVED_ADDRESS_ADDRESS2", elements: ["address.addressLine2"] },
    { selector: "input[id^='DERIVED_ADDRESS_CITY']", elements: ["address.locality"] },
    { selector: "input[id^='SCC_STATE_FL_VW_DESCR']", elements: ["components.province1"] },
    { selector: "input[id^='DERIVED_ADDRESS_POSTAL']", elements: ["address.postalCode"] },
  ],

  GLOBAL_INTUITIVE_ISO3_COUNTRY: "FRA",
  GLOBAL_INTUITIVE_CALLBACK: String(function(data) {
    let provinceElement = document.querySelector("input[id^='SCC_STATE_FL_VW_DESCR']");
    provinceElement.value = provinceElement.value.replace(/-/g, " ");
  })

};

