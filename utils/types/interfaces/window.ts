type EdqConfigCountryOverrideFn = () => { [key: string]: UnicornObject };

interface Window {
  autoComplete?: object;
  EdqConfig?: UnicornObject;
  EdqConfigOverride?: () => UnicornObject;
  EdqConfigCountryOverride?: EdqConfigCountryOverrideFn;
  EdqCountriesOverride?: () => { [key: string]: string };
  EDQ?: PegasusObject;

  // TODO: Add detailed type info
  GlobalIntuitiveUnicorn?: any;
  PhoneUnicorn?: any;
  VerificationUnicorn?: any;
  EmailUnicorn?: any;

  edqLoaded?: { [key: string]: boolean } ;
  html: string;
  EdqCountries?: {
    [key: string]: UnicornObject
  }

  // Unique to PeopleSoft CS
  winName: string;

  /** Magento specific additions */
  savedSubmitHandler: Function;
  jQuery: Function;
  shippingEdqConfig: UnicornObject;
  billingEdqConfig: UnicornObject;
  isCustomerLoggedIn: boolean;
}
