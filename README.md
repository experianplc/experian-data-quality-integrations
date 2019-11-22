# Overview

Experian provides data quality solutions through our contact data management platform. 
Specifically, we provide email and phone validation as well as address verification. 
We are able to integrate into PeopleSoft to provide this functionality when interacting 
with their form fields.

# Installation prerequisites
Before starting, it's important to make sure you have access to the following things:

- PeopleTools Application Designer 
- [Reverse Proxy](https://github.com/experianplc/nginx-cors) (optional for general use, but required for use with self-hosted Pro Web).
- The integration files, which will be provided in this repository in the src folder.
- Pro Web 7.XX. If you are using a self installed Pro Web instance it must be at least version 7.

## Pro Web Layout
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

> For example, to use the pre-created integration for the fluid page `ADDRESS_DFT_SBF` you
will need to go to `src/9.2/pages_fluid/ADDRESS_DFT_SBF`.

Each pre-made integration has subfolders that correspond to the product that's being integrated.
Please note that not every Definition will have all of the folders available. 
Please see the table below for a reference:

| Folder Name                  | Product Type | Product                                       |
|----------------------------- | ------------ | -----------------------------------------     |
| pro-web                      | Address      | Pro Web (on-premise). Verification Engine     |
| pro-web-on-demand            | Address      | Pro Web (hosted). Verification Engine         |
| pro-web-typedown             | Address      | Pro Web (on-premise). Typedown Engine         |
| pro-web-on-demand-typedown   | Address      | Pro Web (hosted). Typedown Engine             |
| pro-web-all-demand           | Address      | Pro Web (hosted). Typedown + Verification     |
| pro-web-all                  | Address      | Pro Web (on-premise). Typedown + Verification |
| global-intuitive             | Address      | Global Intuitive                              |
| address-all                  | Address      | Typedown + Verification + Global Intuitive    |
| email-validate               | Email        | Email Validate                                |
| phone-validate               | Phone        | Global Phone Validate                         | 

## Configuring the integration
Once you select which product you would like there is some basic configuration that needs to be
done. For this example we will assume that we are using the `pro-web` integration as referenced from
the folder options above.

Once you're in this folder you will see an integration.html file. Below is the content for the 
`integration.html` of `ADDRESS_DFT_SBF` for example:

```html
<script id="edq-9.2-pages_fluid-ADDRESS_DFT_SBF"
        src="https://edqprofservus.blob.core.windows.net/peoplesoft/9.2/pages_fluid/ADDRESS_DFT_SBF/pro-web/integration.js"
        PRO_WEB_SERVICE_URL=""></script>
```

As a user you need fill all of the blank fields. In the above case, `PRO_WEB_SERVICE_URL` is what
will need to be filled (e.g. `http://your-pro-web-url-proxy:8080`)

## Putting the integration into your environment.
Once the `integration.html` file has its configuration set you should put the file in the Definition
corresponding to the file.

### Step 1
The first thing you will want to do as you begin is open up the *Application Designer*.
Once opened you should see a screen similar to the one below:

![Signon - Application Designer](media/sign-on.png)

You should specify the appropriate Database name, User ID and Password so that you 
can access the tool.

### Step 2

Once you've logged in you will see the Application Designer with nothing open, as
shown below.

![Application Designer - New Instance](media/application-designer.png)

What you will need to do is click *File* (top left corner) and then *Open*. 
The modal should look like after selecting open and selecting a *Definition* type.
![Open Definition - Unfilled](media/open-definition.png)

After opening, you can specify any Definition you would like. The definition type and name will
correspond to the folder structure in `src`. So for example a definition of Page (Fluid) will
correspond to structure `src/9.2/page_fluid`.

The picture below shows how you should fill it out.
![Open Definition - Filled](media/open-definition-filled.png)

### Step 3
After opening the *Definition* you should then insert an **HTML Area**, done by selecting *Insert* and
then *HTML Area*. The picture below shows you what to select

![Application Designer - Add HTML Area](media/application-designer-add-html-area.png)

Once selected create a rectangle for the HTML Area in the area specified by the image below.

![Application Designer - HTML Area Drawn](media/application-designer-html-area-drawn.png)

### Step 4
Finally, once you've created and inserted your HTML Area you should double click the area you've 
now selected to view the **HTML Area Properties**. The screen below will show how this modal looks like.

![HTML Area Properties](media/html-area-properties.png)

Then, after configuration, put the integration HTML code in the main field after specifying the HTML **Value**
as being a *Constant*. In this case it would be configured snippet specified in the section
**Configuring the Integration**.
