export function createEmailUnicornScript(appendToBody?: boolean): HTMLScriptElement {
  let emailUnicornScript: HTMLScriptElement = document.createElement("script");
  emailUnicornScript.type = "application/javascript";
  emailUnicornScript.id = "edq-email-unicorn";
  emailUnicornScript.src = "https://edqprofservus.blob.core.windows.net/assets/1.9.1/email-unicorn.js";

  if (appendToBody) {
    document.body.appendChild(emailUnicornScript);
  }
  return emailUnicornScript;
}

export function createPhoneUnicornScript (appendToBody?: boolean): HTMLScriptElement {
  let phoneUnicornScript = document.createElement("script");
  phoneUnicornScript.type = "application/javascript";
  phoneUnicornScript.id = "edq-phone-unicorn";
  phoneUnicornScript.src = "https://edqprofservus.blob.core.windows.net/assets/1.9.1/phone-unicorn.js";

  if (appendToBody) {
    document.body.appendChild(phoneUnicornScript);
  }
  return phoneUnicornScript;
}


export function createProWebCssElement(appendToBody?: boolean): HTMLElement {
  let proWebCss = document.createElement("link");
  proWebCss.rel = "stylesheet";
  proWebCss.id = "edq-css";
  proWebCss.href = "https://edqprofservus.blob.core.windows.net/assets/pro-web.css";

  if (appendToBody) {
    document.body.appendChild(proWebCss);
  }
  return proWebCss;
}

export function createGlobalIntuitiveUnicornScript(appendToBody?: boolean): HTMLElement {
  let globalIntuitiveUnicornScript = document.createElement("script");
  globalIntuitiveUnicornScript.type = "application/javascript";
  globalIntuitiveUnicornScript.id = "edq-global-intuitive-unicorn";
  globalIntuitiveUnicornScript.src = "https://edqprofservus.blob.core.windows.net/assets/1.9.1/global-intuitive-unicorn.js";

  if (appendToBody) {
    document.body.appendChild(globalIntuitiveUnicornScript);
  }
  return globalIntuitiveUnicornScript;
}

export function createVerificationUnicornScript(appendToBody?: boolean): HTMLElement {
  let verificationUnicornScript = document.createElement("script");
  verificationUnicornScript.type = "application/javascript";
  verificationUnicornScript.id = "edq-verification-unicorn";
  verificationUnicornScript.src = "https://edqprofservus.blob.core.windows.net/assets/1.9.1/verification-unicorn.js";

  if (appendToBody) {
    document.body.appendChild(verificationUnicornScript);
  }
  return verificationUnicornScript;
}
