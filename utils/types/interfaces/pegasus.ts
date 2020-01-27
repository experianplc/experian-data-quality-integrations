interface PegasusObject {
  DEBUG?: boolean,

  phone: {
    globalPhoneValidate: ({phoneNumber: string, callback: object}) => XMLHttpRequest,
  },

    address: {
      proWeb: {
        activateValidation: Function;
      }

      globalIntuitive: {
        activateValidation: (element) => void,
          search: ({query, country: string, take: number, callback: object}) => XMLHttpRequest,
          format: ({formatUrl: string, callback: object}) => XMLHttpRequest
      }
  },

  email: {
    emailValidate: (object: object) => XMLHttpRequest
    activateEmailValidation: (element: Element) => void
  }
}
