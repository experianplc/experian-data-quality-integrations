# Usage
StartStop Address (Customer Information > Start/Stop > Address/Phone)

- Verification (Proweb)
- Typedown (Pro web)
- Global Intuitive

# Installation instructions (pre-created integrations)

## Configuring the integration
Once you select which product you would like there is some basic configuration that needs to be
done. For this example we will assume that we are using the `ext_startStopAddrOverride` integration.

For example, 

```jsp
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="spl.tld" prefix="spl" %>
<spl:initializeLocale/>
<div
  id="edq-2.7-root-cm-ext_startStopAddrOverride"
  PRO_WEB_AUTH_TOKEN=""
  PRO_WEB_SERVICE_URL=""
  PRO_WEB_USE_TYPEDOWN=false
  GLOBAL_INTUITIVE_AUTH_TOKEN="">
</div>
<script
  src="https://edqprofservus.blob.core.windows.net/ccb/2.7/root/cm/ext_startStopAddrOverride/integration.js">
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
in the corresponding extension page, e.g. `ext_startStopAddrOverride.jsp`
corresponding to the file.

The contents of the `integration.jsp` for the particular touchpoint should be included
in the extension page corresponding to that touchpoint. Once included, your Managed Server for 
Customer Care and Billing should be restarted in order for the integration to take effect.

# Functionality

## Typedown
![typedown-startStopAddrOverridePage](https://user-images.githubusercontent.com/5572859/128932695-1709e013-a926-4717-8d26-afeb71e3aadb.gif)

## Global Intuitive
![globalIntuitive-startStopAddrOverridePage](https://user-images.githubusercontent.com/5572859/128932705-599fc72b-4fd2-47f0-a9de-0730ae202135.gif)

## Verification
![verification-startStopAddrOverridePage](https://user-images.githubusercontent.com/5572859/128932703-0a6b4a8a-f11e-4854-990c-044d73b3cdc9.gif)