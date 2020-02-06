type EdqConfigCountryOverrideFn = () => { [key: string]: UnicornObject };

interface Window {
  autoComplete?: object;
  EdqConfig?: UnicornObject;
  EdqConfigOverride?: () => UnicornObject;
  EdqConfigCountryOverride?: EdqConfigCountryOverrideFn;
  EDQ?: PegasusObject;
  html: string;
  EdqCountries?: {
    [key: string]: UnicornObject
  }

  // Unique to PeopleSoft CS
  winName: string;
}
