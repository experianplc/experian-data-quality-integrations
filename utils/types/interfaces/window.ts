interface Window {
  autoComplete?: object;
  EdqConfig?: UnicornObject;
  EdqConfigOverride?: () => UnicornObject;
  EDQ?: PegasusObject;
  html: string;
  countries: any;

  // Unique to PeopleSoft CS
  winName: string;
}
