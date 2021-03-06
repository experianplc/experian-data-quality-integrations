interface UnicornObject {
  DEBUG?: boolean;

  LOADING_BASE64_ICON?: string;
  VERIFIED_BASE64_ICON?: string;
  INVALID_BASE64_ICON?: string;
  UNKNOWN_BASE64_ICON?: string;

  PRO_WEB_AUTH_TOKEN?: string;
  PRO_WEB_MODAL?: any;
  PRO_WEB_MAPPING?: Array<any>;
  PRO_WEB_COUNTRY?: string;
  PRO_WEB_TYPEDOWN_CALLBACK?: any;
  PRO_WEB_CALLBACK?: any;
  PRO_WEB_LAYOUT?: string;
  PRO_WEB_SUBMIT_TRIGGERS?: TriggerPair[];
  PRO_WEB_TIMEOUT?: number;
  PRO_WEB_SERVICE_URL?: string;

  NO_SAVED_TARGET?: boolean;
  SOAP_ACTION_URL?: string;

  PRO_WEB_TYPEDOWN_TRIGGER?: any;
  GLOBAL_INTUITIVE_AUTH_TOKEN?: string;
  GLOBAL_INTUITIVE_USE_CURRENT_LOCATION?: boolean;
  GLOBAL_INTUITIVE_LOCATION?: string;
  GLOBAL_INTUITIVE_ELEMENT?: GlobalIntuitiveElement | string;
  GLOBAL_INTUITIVE_PLACEHOLDER?: string;
  GLOBAL_INTUITIVE_MAPPING?: any[];
  GLOBAL_INTUITIVE_TAKE?: number;
  GLOBAL_INTUITIVE_ISO3_COUNTRY?: string;
  GLOBAL_INTUITIVE_DATASET?: string;
  GLOBAL_INTUITIVE_NO_SAVED_TARGET?: boolean;

  EMAIL_VALIDATE_AUTH_TOKEN?: string;
  EMAIL_TIMEOUT?: number;
  EMAIL_NO_SAVED_TARGET?: boolean;
  EMAIL_ELEMENTS?: string[] | Element[];

  PHONE_ELEMENTS?: string[] | Element[];
  PHONE_TIMEOUT?: number;
  PHONE_NO_SAVED_TARGET?: boolean;
  GLOBAL_PHONE_VALIDATE_AUTH_TOKEN?: string;
  USE_REVERSE_PHONE_APPEND?: boolean;
  REVERSE_PHONE_APPEND_MAPPINGS?: Array<ReversePhoneAppendMapping>;

  instantFormFill?: {
    TRIGGER_BUTTON: HTMLButtonElement;
    CLIENT_ID_HEADER: string;
    CLIENT_SECRET_HEADER: string;
    USERNAME: string; 
    PASSWORD: string;
    REQUEST_ID: string;

    INPUT_MAPPING: {
      firstName: HTMLInputElement,
        lastName: HTMLInputElement,
        ssn4: HTMLInputElement,
        zipCode: HTMLInputElement
    };

    OUTPUT_MAPPING: {
      yearAtAddress: HTMLInputElement,
      suffix: HTMLInputElement,
      primaryPhone: HTMLInputElement,
      monthAtAddress: HTMLInputElement,
      previousAddress: HTMLInputElement,
      previousState: HTMLInputElement,
      city: HTMLInputElement,
      zip: HTMLInputElement,
      middleName: HTMLInputElement,
      state: HTMLInputElement,
      "previousZip+4": HTMLInputElement,
      unit: HTMLInputElement,
      monthAtPreviousAddress:  HTMLInputElement,
      previousCity: HTMLInputElement,
      "zip+4": HTMLInputElement,
      ssn4: HTMLInputElement,
      previousUnit: HTMLInputElement,
      yearAtPreviousAddress: HTMLInputElement,
      ssn9: HTMLInputElement,
      address: HTMLInputElement,
      secondSurname: HTMLInputElement,
      firstName: HTMLInputElement,
      previousZip: HTMLInputElement,
      dob: HTMLInputElement,
      lastName: HTMLInputElement,
      spouseFirstName: HTMLInputElement
    };
  }
}
