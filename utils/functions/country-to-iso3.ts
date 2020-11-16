/**
 * This function takes a specific country, such as United States and finds
 * the ISO-3 code for the country based on a static list.
 *
 * @param country - full form country name, e.g. United States
 * @param overrideObject - an object that represents user mapping to full form and ISO-3 codes.
 */
export function countryToIso3(country: string, EdqCountriesOverride?: Function) {
  const countries = {
    "United States": "USA",
    "United States of America": "USA",
    "Canada": "CAN",
    "France": "FRA",

    /* Countries that do not have country layouts yet 
    "Germany": "DEU",
    "Italy": "ITA",
    "United Kingdom": "GBR"
     */
  };

  if (EdqCountriesOverride && typeof(EdqCountriesOverride()) === "object") {
    Object.assign(countries, EdqCountriesOverride());
  }

  Object.keys(countries).forEach((fullCountryName: string) => {
    // For continuity we want to map the key to itself because we're treating the ISO-3 country-code
    // as primary source of truth respect to country files.
    //
    // So for example we are adding:
    // {
    //  "USA": "USA"
    // }
    const countryIso3Code = countries[fullCountryName] 
    if (!countries[countryIso3Code]) {
      countries[countryIso3Code] = countryIso3Code;
    }
  });

  return countries[country];
}
