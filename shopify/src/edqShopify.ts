import { 
  createProWebCssElement,
  createGlobalIntuitiveUnicornScript,
  createVerificationUnicornScript,
  createPhoneUnicornScript,
  createEmailUnicornScript
} from "./utils/functions/script-append";

namespace CheckoutOnepage {
	let edqScript: HTMLScriptElement  = document.createElement("script");
	edqScript.type = "application/javascript";
	edqScript.src = "https://edqprofservus.blob.core.windows.net/assets/edq-v1.1.1.js";
	edqScript.id = "edq-pegasus";
	edqScript.onload = function(): void {
		createPhoneUnicornScript(true);
		createEmailUnicornScript(false);
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
	
	let newAddressConfig={
		PHONE_TIMEOUT:3500,
		REVERSE_PHONE_APPEND_MAPPINGS:[],
		PHONE_ELEMENTS:[ document.querySelector('#AddressPhoneNew') ],
		
		EMAIL_TIMEOUT:3500,
		EMAIL_ELEMENTS:[],
		
		GLOBAL_INTUITIVE_ISO3_COUNTRY:'USA',
		GLOBAL_INTUITIVE_ELEMENT:'#AddressAddress1New',
		GLOBAL_INTUITIVE_USE_CURRENT_LOCATION:true,
		GLOBAL_INTUITIVE_MAPPING:[
			{
				field: document.querySelector('#AddressAddress1New'),
				elements: ["address.addressLine1"]
			}, 
			{
				field: document.querySelector('#AddressAddress2New'),
				elements: ["address.addressLine2"]
			},
			{
				field: document.querySelector('#AddressCityNew'),
				elements: ["address.locality"]
			},
			{
				field: document.querySelector('#AddressProvinceNew'),
				elements: ["address.province"]
			},
			{
				field: document.querySelector('#AddressZipNew'),
				elements: ["address.postalCode"]
			}
		],
		AUTOCOMPLETION_SETTINGS:{
			cache: false
		},
		
		PRO_WEB_TIMEOUT:3500,
		PRO_WEB_SUBMIT_TRIGGERS:[
			{
				type: "click",
				element: document.querySelector('[value="Add Address"]'),
				preventDefault:true,
			}
		],
		PRO_WEB_LAYOUT:'EDQ NA Integration 5 Line Default',
		PRO_WEB_COUNTRY:'USA',
		PRO_WEB_CALLBACK:'',
		PRO_WEB_MAPPING:[
			{
				field: document.querySelector('#AddressAddress1New'),
				elements: ["address.addressLine1"],
				modalFieldSelector:"#interaction-address--original-address-line-one",
			},
			{
				field: document.querySelector('#AddressAddress2New'),
				elements: ["address.addressLine2"],
				transformation: function(el) { return "@" + (el.value || el.innerText) },
				modalFieldSelector:"#interaction-address--original-address-line-two",
			},
			{
				field: document.querySelector('#AddressCityNew'),
				elements: ["address.locality"],
				transformation: function(el) { return "@" + (el.value || el.innerText) },
				modalFieldSelector:"#interaction-address--original-locality",
			},
			{
				field: document.querySelector('#AddressProvinceNew'),
				elements: ["address.province"],
				modalFieldSelector:"#interaction-address--original-province",
			},
			{
				field: document.querySelector('#AddressZipNew'),
				elements: ["address.postalCode"],
				modalFieldSelector:"#interaction-address--original-postal-code",
			}
		],
		VERIFICATION_MODAL_OVERRIDES:{
			modalHeader: {
				updated:'Confirm updated address',
				unverified:'Confirm unverified address'
			},
			interactionRequired: {
				updatedAddressHeader:'Updated address',
				originalAddressHeader:'Original address',
				useOriginalAddress:'Use original address',
				useUpdatedAddress:'Use updated address',
				searchPlaceholder:'Address information'
			}
		},
	};
	
	let GlobalIntuitiveMutationObs = new MutationObserver(function(mutation, observer) {
		try {
			let currentForm=document.querySelector('.form-vertical:not(.hide)');
			if (currentForm) {
				let AddressElementsList=currentForm.querySelectorAll('input[id],select[id]');
				newAddressConfig.GLOBAL_INTUITIVE_ISO3_COUNTRY = 'USA';
				
				// @ts-ignore
				newAddressConfig.GLOBAL_INTUITIVE_ELEMENT= AddressElementsList[3];
				newAddressConfig.GLOBAL_INTUITIVE_MAPPING= [
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
				let addressGlobalIntuitive = new GlobalIntuitiveUnicorn(newAddressConfig);
				addressGlobalIntuitive.activateValidation();
				observer.disconnect();
			}
		} catch(e) {
			// We expect errors like '** is not defined';
			if (["ReferenceError", "TypeError"].indexOf(e.name) === -1) {
				console.log(e);
			}
		}
	});
	
	let proWebMutationObs = new MutationObserver(function(mutation, observer) {
		try {
			let currentForm=document.querySelector('.form-vertical:not(.hide)');
			if (currentForm) {
				let AddressElementsList=currentForm.querySelectorAll('input[id],select[id],input[type="submit"]');
				newAddressConfig.PRO_WEB_SUBMIT_TRIGGERS=[
					{
						type: "click",
						element: AddressElementsList[11],
						preventDefault: true,
					}
				];
				//newAddressConfig.PRO_WEB_CALLBACK='';
				newAddressConfig.PRO_WEB_LAYOUT='EDQ NA Integration 5 Line Default',
				newAddressConfig.PRO_WEB_COUNTRY='USA';
				newAddressConfig.PRO_WEB_MAPPING=[
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
				let addressProWeb = new VerificationUnicorn(newAddressConfig);
				addressProWeb.activateValidation();
				observer.disconnect();
			}
		} catch(e) {
			// We expect errors like '** is not defined';
			if (["ReferenceError", "TypeError"].indexOf(e.name) === -1) {
				console.log(e);
			}
		}
	});
	
	let phoneMutationObs = new MutationObserver(function(mutation, observer) {
		try {
			let currentForm=document.querySelector('.form-vertical:not(.hide)');
			if (currentForm) {
				let AddressElementsList=currentForm.querySelectorAll('input[id]');
				newAddressConfig.PHONE_TIMEOUT=3500;
				newAddressConfig.REVERSE_PHONE_APPEND_MAPPINGS=[];
				newAddressConfig.PHONE_ELEMENTS=[ 
					AddressElementsList[7]
				];
				
				// @ts-ignore
				let addressPhone = new PhoneUnicorn(newAddressConfig);
				addressPhone.activateValidation();
				observer.disconnect();
			}
		} catch(e) {
			// We expect errors like '** is not defined';
			if (["ReferenceError", "TypeError"].indexOf(e.name) === -1) {
				console.log(e);
			}
		}
	});
	
	let emailMutationObs = new MutationObserver(function(mutation, observer) {
		try {
			// @ts-ignore
			let addressEmail = new EmailUnicorn(newAddressConfig);
			addressEmail.activateValidation();
			observer.disconnect();
		} catch(e) {
			if (["ReferenceError", "TypeError"].indexOf(e.name) === -1) {
				console.log(e);
			}
		}
	});
	
	let addAddressElementToObserve=document.querySelector('#MainContent');
	let observerConfig = { attributes: true, childList: true, subtree: true };

	let loadingNode: HTMLElement = document.querySelector("#MainContent");
	let loadingNodeConfig = { attributes: true, subtree: true, childList: true };
	let loadingObserver: MutationObserver  = new MutationObserver(function(mutations, observer) {
		let loadingMask: HTMLElement = document.querySelector("#slideshow-info");
		document.body.appendChild(edqScript);
		let addressForms = document.querySelectorAll('.form-vertical.hide');
		addressForms.forEach(function(addressElements) {
			let addressElementsID = document.querySelector('#'+addressElements.id);
				GlobalIntuitiveMutationObs.observe(addressElementsID, observerConfig);
				proWebMutationObs.observe(addressElementsID, observerConfig);
				phoneMutationObs.observe(addressElementsID, observerConfig);
			}
		);
	});
	
	loadingObserver.observe(loadingNode, loadingNodeConfig);
}