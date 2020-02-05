# Installation
Create an HTML area for the EO_ADDR_USA_SEC component and insert the contents of integration.html
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

![image](https://user-images.githubusercontent.com/5572859/73857434-ee1a6e00-4804-11ea-8813-912910bf5e03.png)

4. Save your settings
5. Restart your Pro Web Service
6. Override `PRO_WEB_MAPPING` by doing the following

```javascript
function EdqConfigOverride() {
  return {
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
          selector: "#DERIVED_ADDRESS_CITY",
          addressLines: [3],
          separator: "",
          modalFieldSelector: "#interaction-address--original-locality",
          typedownFieldSelector: "#typedown-final--city"
        },
        {
          selector: "#DERIVED_ADDRESS_STATE",
          addressLines: [4],
          separator: "",
          modalFieldSelector: "#interaction-address--original-province",
          typedownFieldSelector: "#typedown-final--state"
        },
        {
          selector: "#DERIVED_ADDRESS_POSTAL",
          addressLines: [5],
          separator: "",
          modalFieldSelector: "#interaction-address--original-postal-code",
          typedownFieldSelector: "#typedown-final--postal-code"
        },
        {
          selector: "#DERIVED_ADDRESS_COUNTY",
          addressLines: [7],
          separator: "",
          modalFieldSelector: "#",
          typedownFieldSelector: "#"
        },

      ]
  }
}
```

7. Update `integration.html` with the new changes. 

# Usage
You can go to Self Service -> Campus Personal Information -> Addresses -> Add a new address 
to see the relevant page.

## Pro Web - Verification
![verification_eo_addr_usa_sec](https://user-images.githubusercontent.com/5572859/72381231-0ce58300-36e5-11ea-98db-5e7365a97d85.gif)


#### Configuration - On Premise
Make sure `PRO_WEB_SERVICE_URL` is set with the URL to your proxied Pro Web server

#### Configuration - Hosted
Make sure `PRO_WEB_AUTH_TOKEN` is set with a valid authorization token

## Pro Web - Typedown
![typedown_eo_addr_usa_sec](https://user-images.githubusercontent.com/5572859/72381461-6c439300-36e5-11ea-8c1a-9e56e5fbc12d.gif)

#### Configuration - On Premise
Make sure `PRO_WEB_SERVICE_URL` is set with the URL to your proxied Pro Web server and
`PRO_WEB_WEB_USE_TYPEDOWN` is set to `true`.

#### Configuration - Hosted
Make sure `PRO_WEB_AUTH_TOKEN` is set with a valid authorization token and `PRO_WEB_USE_TYPEDOWN` is
set to `true`.

## Global Intuitive
![global_intuitive_eo_addr_usa_sec](https://user-images.githubusercontent.com/5572859/72381305-32728c80-36e5-11ea-9c5d-975eaf6b8644.gif)

#### Configuration
Make sure `GLOBAL_INTUITIVE_AUTH_TOKEN` is set with a valid authorization token.
