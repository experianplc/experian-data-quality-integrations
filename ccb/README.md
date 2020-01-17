# Overview

Experian provides data quality solutions through our contact data management platform. 
Specifically, we provide email and phone validation as well as address verification. 
We are able to integrate into PeopleSoft to provide this functionality when interacting 
with their form fields.

# Installation prerequisites
Before starting, it's important to make sure you have access to the following things:

- [Reverse Proxy](https://github.com/experianplc/nginx-cors) (optional for general use, but required for use with self-hosted Pro Web).
- The integration files, which will be provided in this repository in the src folder.
- Pro Web 7.XX. If you are using a self installed Pro Web instance it must be at least version 7.

## Pro Web Layout (Optional)
If you're using Pro Web that's hosted on your own premises you will need to create a layout. Edit
your `Qawserve` file for the version of Pro Web you're using (in Windows this file will be located
by default somewhere like `C:\Program Files\QAS\QAS Pro Web 7.XX\Qawserve`, where XX is the
sub-version number.

Go to LAYOUT.md in this folder and copy the entire contents. From there paste those contents to the
Qawserve found above.

# Installation instructions (pre-created integrations)

## Selecting a pre-made integration file
We have a variety of components and pages already created for the integration. 
The find these, you can visit the src folder and follow the file path to the component, or page of
choice. 

> For example, to use the pre-created integration for the fluid page `ext_personCorrespInfoPage` you
will need to go to `src/2.7/room/cm/ext_personCorrespInfoPage`

Each pre-made integration has a single file, `integration.jsp`, that should be edited to
enable the functionality that you would like. The functionality that *can* be enabled will be
reflected in the options. 

## Configuring the integration
Once you select which product you would like there is some basic configuration that needs to be
done. For this example we will assume that we are using the `ext_personCorespInfoPage` integration.

For example, 

```jsp
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="spl.tld" prefix="spl" %>
<spl:initializeLocale/>
<div
  id="edq-2.7-root-cm-ext_personCorrespInfoPage"
  PRO_WEB_AUTH_TOKEN=""
  PRO_WEB_SERVICE_URL=""
  PRO_WEB_USE_TYPEDOWN=false
  GLOBAL_INTUITIVE_AUTH_TOKEN="">
</div>
<script
  src="https://edqprofservus.blob.core.windows.net/ccb/2.7/root/cm/ext_personCorrespInfoPage/integration.js">
</script>
```

The following table describes the functionality possible:

| HTML Key                    | Description  |
|---------------------------- | ------------ |
| PRO_WEB_AUTH_TOKEN          | This is the auth token used for Pro Web On Demand (Verification and Typedown) |
| PRO_WEB_SERVICE_URL         | If you are using a self-hosted instance, this is the proxied URL. |
| PRO_WEB_USE_TYPEDOWN        | If you want to use Typedown, this needs to be set to true |
| GLOBAL_INTUITIVE_AUTH_TOKEN | This is the auth token used for Global Intuitive. If unset, Global Intuitive will not be used |

## Putting the integration into your environment.
Once the `integration.jsp` file has its configuration set you should put its contents
in the corresponding extension page, e.g. `ext_personCorrespInfoPage.jsp`
corresponding to the file.

The contents of the `integration.jsp` for the particular touchpoint should be included
in the extension page corresponding to that touchpoint. Once included, your Managed Server for 
Customer Care and Billing should be restarted in order for the integration to take effect.
