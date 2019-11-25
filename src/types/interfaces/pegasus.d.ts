interface PegasusObject {
    DEBUG?: boolean;
    phone: {
        globalPhoneValidate: ({ phoneNumber: string, callback: object }: {
            phoneNumber: any;
            callback: any;
        }) => XMLHttpRequest;
    };
    address: {
        globalIntuitive: {
            activateValidation: (element: any) => void;
            search: ({ query, country: string, take: number, callback: object }: {
                query: any;
                country: any;
                take: any;
                callback: any;
            }) => XMLHttpRequest;
            format: ({ formatUrl: string, callback: object }: {
                formatUrl: any;
                callback: any;
            }) => XMLHttpRequest;
        };
    };
    email: {
        emailValidate: (object: object) => XMLHttpRequest;
        activateEmailValidation: (element: Element) => void;
    };
}
