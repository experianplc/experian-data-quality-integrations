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

  return countries[country];
}

