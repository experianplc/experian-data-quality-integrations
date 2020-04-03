# Installation
Create an HTML area for the SCC_ADDRESS_SCF component and insert the contents of integration.html
into the area. After which, please set the configuration options as specified below. Please see
the top level PeopleSoft documentation for more info. 

# Customization
You may desire specific changes per country in order to get the most out of
address validaiton

## USA 

### Pro Web (Typedown and Verification)
By default, the integration uses `Database layout` as the layout for addresses. This represents
our best practice address configuration. However it does not include `County name` by default. 
To enable `County name` as an option, please follow the steps below:

> Please note that these general instructions can be used to update the configuration 
  more generally speaking, as well.

1. Open QAS Configuration Editor
2. Select "Database layout"
3. Add an additional address line and fix `County name` to the line. 
4. Change `State code` to `State name` by refixing the element.

![image](https://user-images.githubusercontent.com/5572859/74271178-72279680-4cda-11ea-9b79-30e4a99641e0.png)

> Please note that in the EdqConfigCountryOverride, `addressLines: [0]` will be associated with Address Line 1, `addressLines: [1]` will be 
  associated with Address Line 2, and so forth.
  
5. Save your settings
6. Restart your Pro Web Service
7. Override `PRO_WEB_MAPPING` by doing the following

```javascript
function EdqConfigCountryOverride() {
  // This can be edited to override settings per country
  return {
    "USA": {
      PRO_WEB_MAPPING: [
        {
          selector: "#DERIVED_ADDRESS_ADDRESS1",
          addressLines: [0],
          separator: "",
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
          selector: "input[id^='DERIVED_ADDRESS_CITY']",
          addressLines: [3],
          separator: "",
          modalFieldSelector: "#interaction-address--original-locality",
          typedownFieldSelector: "#typedown-final--city"
        },
        {
          selector: "#SCC_STATE_FL_VW_DESCR",
          addressLines: [4],
          separator: "",
          modalFieldSelector: "#interaction-address--original-province",
          typedownFieldSelector: "#typedown-final--state"
        },
        {
          selector: "input[id^='DERIVED_ADDRESS_POSTAL']",
          addressLines: [5],
          separator: "",
          modalFieldSelector: "#interaction-address--original-postal-code",
          typedownFieldSelector: "#typedown-final--postal-code"
        },
        {
          selector: "input[id^='DERIVED_ADDRESS_COUNTY']",
          addressLines: [7],
          separator: "",
          modalFieldSelector: "#interaction-address--original-postal-code",
          typedownFieldSelector: "#typedown-final--postal-code"
        }
      ]
    }
  }
}
```

7. Update `integration.html` with the new changes.
8. Save the changes in the PeopleSoft Application Designer.

If desired you can override country to ISO3 code configuration by using `EdqCountriesOverride`. 

For example, if your PeopleSoft installation calls "United States" "The United States of America",
the name "The United States of America" by default is not associated with any ISO3 code for our
integration and therefore your integration would not work if you selected "The United States of
America". 

Overriding the default country to ISO3 list can be done as follows:

```javascript
function EdqCountriesOverride() {
  return {
    "The United States of America": "USA"
  }
}
```
Once this is done "The United States of America" will be associated with "USA" and the associated
address information.

# Usage
## Pro Web - Verification
![verification_scc_address_scf](https://user-images.githubusercontent.com/5572859/72351121-bc066800-36ad-11ea-97f3-0c0522f54afd.gif)

#### Configuration - On Premise
Make sure `PRO_WEB_SERVICE_URL` is set with the URL to your proxied Pro Web server

#### Configuration - Hosted
Make sure `PRO_WEB_AUTH_TOKEN` is set with a valid authorization token

## Pro Web - Typedown
![typedown_scc_address_scf](https://user-images.githubusercontent.com/5572859/72350725-f7ecfd80-36ac-11ea-8e35-79cc54e9996e.gif)

#### Configuration - On Premise
Make sure `PRO_WEB_SERVICE_URL` is set with the URL to your proxied Pro Web server and
`PRO_WEB_WEB_USE_TYPEDOWN` is set to `true`.

#### Configuration - Hosted
Make sure `PRO_WEB_AUTH_TOKEN` is set with a valid authorization token and `PRO_WEB_USE_TYPEDOWN` is
set to `true`.

## Global Intuitive
![global_intuitive_scc_address_scf](https://user-images.githubusercontent.com/5572859/72350345-4a79ea00-36ac-11ea-8ac4-dfd231c116b9.gif)

#### Configuration
Make sure `GLOBAL_INTUITIVE_AUTH_TOKEN` is set with a valid authorization token.

