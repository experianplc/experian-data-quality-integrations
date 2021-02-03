import { 
  createProWebCssElement,
  createGlobalIntuitiveUnicornScript,
  createVerificationUnicornScript,
  createPhoneUnicornScript,
  createEmailUnicornScript
} from "./utils/functions/script-append";

let edqScript: HTMLScriptElement  = document.createElement("script");
edqScript.type = "application/javascript";
edqScript.src = "https://edqprofservus.blob.core.windows.net/assets/edq-v1.1.1.js";
edqScript.id = "edq-pegasus";
edqScript.onload = function(): void {
	createPhoneUnicornScript(true);
	createEmailUnicornScript(true);
	createProWebCssElement(true);
	createVerificationUnicornScript(true);
	createGlobalIntuitiveUnicornScript(true);
}

window.EdqConfig = {
	GLOBAL_INTUITIVE_NO_SAVED_TARGET: true,
	EMAIL_NO_SAVED_TARGET: true,
	PHONE_NO_SAVED_TARGET: true,
	NO_SAVED_TARGET: true,
	EMAIL_VALIDATE_AUTH_TOKEN: '4a9d1b4f-526f-4dbf-bf49-1d3451daf506',
	GLOBAL_PHONE_VALIDATE_AUTH_TOKEN: '4a9d1b4f-526f-4dbf-bf49-1d3451daf506',
	PRO_WEB_AUTH_TOKEN: '4a9d1b4f-526f-4dbf-bf49-1d3451daf506',
	GLOBAL_INTUITIVE_AUTH_TOKEN: '4a9d1b4f-526f-4dbf-bf49-1d3451daf506',
};

document.head.appendChild(edqScript);

export function phoneValidation(phoneElement) {
	window.EdqConfig.PHONE_TIMEOUT = 3500;
	window.EdqConfig.REVERSE_PHONE_APPEND_MAPPINGS = [];
	window.EdqConfig.PHONE_ELEMENTS = [
		phoneElement
	];
	
	// @ts-ignore
	let addressPhone = new PhoneUnicorn(window.EdqConfig);
	addressPhone.activateValidation();
}

export function emailValidation(edqEmailLineElement) {
	window.EdqConfig.EMAIL_TIMEOUT = 3500;
	window.EdqConfig.EMAIL_ELEMENTS = [
		edqEmailLineElement
	];
	
	// @ts-ignore
	let addressEmail = new EmailUnicorn(window.EdqConfig);
	addressEmail.activateValidation();
}

export function globalIntuitive(currentForm) {
	let AddressElementsList=currentForm.querySelectorAll('input[id],select[id]');
	window.EdqConfig.GLOBAL_INTUITIVE_ISO3_COUNTRY = 'USA';
	window.EdqConfig.GLOBAL_INTUITIVE_ELEMENT=AddressElementsList[3];
	window.EdqConfig.GLOBAL_INTUITIVE_USE_CURRENT_LOCATION= true;
	window.EdqConfig.GLOBAL_INTUITIVE_MAPPING= [
		{
			field: AddressElementsList[3],
			elements: ["address.addressLine1"]
		},
		{
			field: AddressElementsList[4],
			elements: ["address.addressLine2"]
		},
		{
			field: AddressElementsList[5],
			elements: ["address.locality"]
		},
		{
			field: AddressElementsList[7],
			elements: ["address.province"]
		},
		{
			field: AddressElementsList[8],
			elements: ["address.postalCode"]
		}
	];
	
	// @ts-ignore
	let addressGlobalIntuitive = new GlobalIntuitiveUnicorn(window.EdqConfig);
	addressGlobalIntuitive.activateValidation();
}

export function addressValidation(currentForm) {
	let AddressElementsList=currentForm.querySelectorAll('input[id],select[id],input[type="submit"]');
	window.EdqConfig.PRO_WEB_TIMEOUT = 3500;
	window.EdqConfig.PRO_WEB_SUBMIT_TRIGGERS = [
		{
			type: "click",
			preventDefault: true,
			element: '#continue_button',
		}
	];
	window.EdqConfig.PRO_WEB_LAYOUT='EDQ NA Integration 5 Line Default';
	window.EdqConfig.PRO_WEB_COUNTRY='USA';
	//window.EdqConfig.PRO_WEB_CALLBACK='';
	window.EdqConfig.PRO_WEB_MAPPING=[
		{
			field: AddressElementsList[3],
			elements: ["address.addressLine1"],
			modalFieldSelector:"#interaction-address--original-address-line-one",
		},
		{
			field: AddressElementsList[4],
			elements: ["address.addressLine2"],
			transformation: function(el) { return "@" + (el.value || el.innerText) },
			modalFieldSelector:"#interaction-address--original-address-line-two",
		},
		{
			field: AddressElementsList[5],
			elements: ["address.locality"],
			transformation: function(el) { return "@" + (el.value || el.innerText) },
			modalFieldSelector:"#interaction-address--original-locality",
		},
		{
			field: AddressElementsList[7],
			elements: ["address.province"],
			modalFieldSelector:"#interaction-address--original-province",
		},
		{
			field: AddressElementsList[8],
			elements: ["address.postalCode"],
			modalFieldSelector:"#interaction-address--original-postal-code",
		}
	];
	
	// @ts-ignore
	let addressProWeb = new VerificationUnicorn(window.EdqConfig);
	addressProWeb.activateValidation();
}
