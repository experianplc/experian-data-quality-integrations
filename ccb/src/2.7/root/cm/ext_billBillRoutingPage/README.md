# Usage
Bill Routing Address (Financial > Bill > Add > Bill Routings > Add)
- Global Intuitive
- Verification (Pro Web)
- Typedown (Pro Web)

# Installation instructions (pre-created integrations)

## Configuring the integration
Once you select which product you would like there is some basic configuration that needs to be
done. For this example we will assume that we are using the `ext_billBillRoutingPage` integration.

For example, 

```jsp
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="spl.tld" prefix="spl" %>
<spl:initializeLocale/>
<div
  id="edq-2.7-root-cm-ext_billBillRoutingPage"
  PRO_WEB_AUTH_TOKEN=""
  PRO_WEB_SERVICE_URL=""
  PRO_WEB_USE_TYPEDOWN=false
  GLOBAL_INTUITIVE_AUTH_TOKEN="">
</div>
<script
  src="https://edqprofservus.blob.core.windows.net/ccb/2.7/root/cm/ext_billBillRoutingPage/integration.js">
</script>
```

The following table describes the functionality possible:

| HTML Key                    | Description  |
|---------------------------- | ------------ |
| PRO_WEB_AUTH_TOKEN          | This is the auth-token used for Pro Web On Demand (Verification and Typedown) |
| PRO_WEB_SERVICE_URL         | If you are using a self-hosted instance, this is the service URL (potentially proxied if necessary) |
| PRO_WEB_USE_TYPEDOWN        | If you want to use Typedown, this needs to be set to true |
| GLOBAL_INTUITIVE_AUTH_TOKEN | This is the auth-token used for Global Intuitive. If unset, Global Intuitive will not be used |


## Putting the integration into your environment.
Once the `integration.jsp` file has its configuration set you should put its contents
in the corresponding extension page, e.g. `ext_billBillRoutingPage.jsp`
corresponding to the file.

The contents of the `integration.jsp` for the particular touchpoint should be included
in the extension page corresponding to that touchpoint. Once included, your Managed Server for 
Customer Care and Billing should be restarted in order for the integration to take effect.

# Functionality

## Typedown
![typedown-billBillRoutingPage](https://user-images.githubusercontent.com/5572859/128882007-b2a1fdb9-6a72-49e1-adae-01d6adb0b578.gif)

## Global Intuitive
![globalIntuitive-billBillRoutingPage](https://user-images.githubusercontent.com/5572859/128882298-66d45efa-b866-4783-9fc2-8645f6310178.gif)

## Verification
![verification-billBillRoutingPage](https://user-images.githubusercontent.com/5572859/128882508-41be27cf-3cb0-418b-9da2-48fb67251862.gif)
