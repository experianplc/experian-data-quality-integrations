export function countryToIso3(country) {
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

  Object.keys(countries).forEach((key) => {
    // For continuity we want to map the key to itself because we're treating the ISO-3 country-code
    // as primary source of truth respect to country files.
    if (!countries[countries[key]]) {
      countries[countries[key]] = countries[key];
    }
  });

  return countries[country];
}

