# Summary
Experian offers a non partnered integration to Shopify stores.

The integration offers Global Phone Validation, Email Validation, Pro web Address Validation and Global Intuitive.

#### Email Validate
Email Validation will check your email at the moment you finish typing in the email field box and once you lose focus on the email field the Email Validate will start working letting you know if is a valid or an invalid email.

Email validate can result in two potential outcomes.

Verification Level | Description | Icon
------------ | ------------- | -------------
Verified | Email exists, or is a company internal email, is reachable and is valid. | ![verified Icon](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/ShpifyImages/SalesForceCert.PNG)
Invalid | Mailbox or domain does not exist or is unreachable, illegitimate or disposable. | ![Invalid Icon](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/ShpifyImages/invalidIcon.png)

#### Global Phone Validate
Global Phone Validate will check your phone at the moment you finish typing in the phone field box and once you lose focus on the phone field, the Global Phone Validate will start working letting you know if is a valid or an invalid phone.

Global Phone Validate can result in two potential outcomes.

Verification Level | Description | Icon
------------ | ------------- | -------------
Verified | Phone matched to a high confidence and returned as a valid number. | ![verified Icon](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/ShpifyImages/SalesForceCert.PNG)
Invalid | Could not match the number and returned as an invalid number. | ![Invalid Icon](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/ShpifyImages/invalidIcon.png)

#### Pro Web Address Validation
Pro Web Address Validation will check your address and correct if possible; once you type your address in the respective address fields and press the page form submitting button. 

In case that your address needs to be corrected and does not match an address; Pro Web - Address (Verification Engine) will prompt a “confirm updated address” box to complete your address in real time; by typing down the address in the address input field, it will give you options with accurate addresses matching the address with the information provided by the user and finally by selecting one of the options it will autocomplete the addresses fields in the address form with correct and valid address and may continue with the store process.

[For more information about Pro Web - Address (Verification Engine).](https://www.edq.com/documentation/apis/address-validate/soap/)

#### Global Intuitive
Global Intuitive will correct your address in real time while your typing down your address in the address field box.
Global Intuitive will automatically fill the rest of the address fields in the form.

[For more information about Global Intuitive.](https://www.edq.com/documentation/apis/address-validate/global-intuitive/)

## Integration Touchpoints
* Add/Edit Address
* Information (Shipping)
* Checkout (Billing)

# Experian Integration Files
Donwload the Shopify/Experian integration files.
Ope your prefered command line prompt "Bash" or "CMD" and locate the integration file root "Shopify".
Run the following command ``` npm run build```
Next locate "lib" folder; within the "lib" folder there will be "shopifySinglePage.js" and "edqShopify.js" files.

#### Pre-requisits
Install Node and npm

# Integration
## Steps
1. Download the file from "".
2. Log in to your Shopify Sandbox.
3. Add the following files into **"Asset"** section:
*	shopifySinglePage.js
*	edqShopify.js

![Assets](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/ShpifyImages/Assets.png)

![AddAssets](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/ShpifyImages/addAsset.png)

## How the integration works

Touchpoint | Shopify file | Integration file
------------ | ------------- | -------------
Add/Edit Address | templates/customers/addresses.liquid | edqShopify.js
Shipping Address | templates/checkout/shippingAddress.liquid | shopifySinglePage.js
Billing Address | templates/customers/billingAddress.liquid | shopifySinglePage.js

There two separate files:

#### shopifySinglePage.js

This file is a single integration page for cases where there's no multi-Address on the page.

Adding the following line at the end of the ```header``` section in  ```checkout.liquid```:

```
<script src="{{ 'shopifySinglePage.js' | asset_url }}"></script>
```

In ```shippingAddress.liquid``` and ```billingAddress.liquid``` add the following lines:

```
<script type="text/javascript">
window.Shopify.shopifySinglePage.globalIntuitive(document.querySelector('.fieldset'));
window.Shopify.shopifySinglePage.addressValidation(document.querySelector('.fieldset'));  
</script>
``` 

![HeaderScriptSingleFile](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/ShpifyImages/lineHeaderScriptSingleFile.png)

![lineScriptSingleFile](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/ShpifyImages/lineScriptSingleFile.png)

#### edqShopify.js

This file is for cases where there's multi-Address on the page (Add/Edit Address touchpoint).

Adding the following line ```<script src="{{ 'edqShopify.js' | asset_url }}"></script>``` in ```addresses.liquid``` at the end of the file.

![lineTag](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/ShpifyImages/lineTag.png)

### Configure your files

Within both files you can configure your token (provided by Experian) and validations that'll be working across the page that you want. 

To configure the validations that'll be included in the page; set "true" if you want the validation to be activated on the page or "false" if you don't want the validation to be active in your page.

```
createPhoneUnicornScript(true);
```

To enable Global Phone Validation set this flag "true". 

```
createEmailUnicornScript(true);
```

To enable Email Validation set this flag "true". 

```
createProWebCssElement(true);
```

To enable styling for Pro Web Address Validation and Global Intuitive set this flag "true"; this flag is required if Pro Web Address Validation and Global Intuitive are being used. 

```
createVerificationUnicornScript(true);
```

To enable Pro Web Address Validation set this flag "true". 

```
createGlobalIntuitiveUnicornScript(true);
```

To enable Global Intuitive set this flag "true". 


![configureValidations](https://raw.githubusercontent.com/JoseCastilloExperian/edqCommerceCloud/master/ShpifyImages/configureValidations.png)

window.EdqConfig will manage the configuration for each validation
  
```
EMAIL_VALIDATE_AUTH_TOKEN
```

Set the Email Validation token (provided by Experian or created by the Saas Portal). 

```
GLOBAL_PHONE_VALIDATE_AUTH_TOKEN
```

Set the Global Phone Validation token (provided by Experian or created by the Saas Portal).

```
PRO_WEB_AUTH_TOKEN
```

Set the Pro Web Address Validation token (provided by Experian or created by the Saas Portal).

```
GLOBAL_INTUITIVE_AUTH_TOKEN
```

Set the Global Intuitive token (provided by Experian or created by the Saas Portal).

##### You can use the same token for all validations as long as you have configured all validations in a single token.

## How it works!

The integration is created based on the Shopify default store, here are some key steps to take in considration when adding the integration.

```document.head.appendChild(edqScript);``` will create Experian Libraries within the file your Shopify "liquid" template.

#### shopifySinglePage.js

Offers four functions:
* phoneValidation
* emailValidation
* globalIntuitive
* addressValidation

For **globalIntuitive, addressValidation** functions; they will receive a non optional ```div``` that'll be the address fields container; each function will read the ```div``` and will try to extract all fields and place them into the configuration fields.

For  **globalIntuitive, addressValidation** functions; they will receive a non optional ```Element```; which means that you'll have to send the phone element, email element directly to validate that field

#### edqShopify.js

Cases where there's an option for multiple addresses like in **Edit/Add Address** touchpoint, this file offers you an ```Element``` observer that will look at the the addresses elements to activate the validation.

## Configuration

#### Pro Web Address Validation

* PRO_WEB_TIMEOUT: will set a timeout for the request to the phone validation API.
* PRO_WEB_SUBMIT_TRIGGERS: will override the submit form action and verify the address.
* PRO_WEB_CALLBACK: will add an action to be triggered after the validation is done, receives a function.
* PRO_WEB_COUNTRY: country code ISO-3; will check the address for the country.
* PRO_WEB_LAYOUT: this option will work across with the mapping; the layout is how the data is going to be send to our API and how it's going to be posted to the mapping fields.
* PRO_WEB_MAPPING: address mapping fields where the address is going to be verified.
**field:** is the address field in the form. 
**elements:** is the layout mapping that is going to be send to the API (do not modify unless your layout has a different set of labels).
**modalFieldSelector:** will be show in some specific cases where the address requires interaction (do not modify).

#### Global Intuitive

* GLOBAL_INTUITIVE_ISO3_COUNTRY: country code ISO-3; will check the address for the country.
* GLOBAL_INTUITIVE_USE_CURRENT_LOCATION: allow to use your current location to get a closer matching address.
* GLOBAL_INTUITIVE_ELEMENT: address element where the address is going to be type down.
* GLOBAL_INTUITIVE_MAPPING: address mapping fields where the address is going to be set after choosing one option.
**field:** is the address field in the form.
**elements:** is the layout mapping that is going to be send to the API (do not modify).
* AUTOCOMPLETION_SETTINGS: enables or disables the Global Intuitive cache.
**cache:** use true to enable or false to disable.

#### Global Phone Validation

* PHONE_TIMEOUT: will set a timeout for the request to the phone validation API.
* PHONE_ELEMENTS: phone element to validate.

#### Email Validation

* EMAIL_TIMEOUT:  will set a timeout for the request to the phone validation API.
* EMAIL_ELEMENTS: email element to validate.
