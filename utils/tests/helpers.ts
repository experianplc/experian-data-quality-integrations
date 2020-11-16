import pollUntil from "@theintern/leadfoot/helpers/pollUntil";
import keys from '@theintern/leadfoot/keys';
import intern from "intern";

/**
 * Validates an email address, given a query selector and an expected status 
 */
export function emailValidate(emailAddress: string,  selector: string, assert: Chai.Assert) {
  return function() {
    return this.parent
      .findByCssSelector(selector)
      .type(emailAddress)
      .type(keys.TAB)
      .then(pollUntil(function(selector: string) {
        return document.querySelector(selector).getAttribute("edq-metadata");
      }, [selector]))
      .then(function(metadata) {
        assert.equal(true, Boolean(metadata), "Email validation works");
      })
  }
}

export function phoneValidate(phoneNumber: string, selector: string, assert: Chai.Assert) {
  return function() {
    return this.parent
      .findByCssSelector(selector)
        .clearValue()
        .type(phoneNumber)
        .type(keys.TAB)
        .end()
      .findByCssSelector(selector)
        .type(" ")
        .type(keys.TAB)
      .then(pollUntil(function(selector: string) {
        return document.querySelector(selector).getAttribute("edq-metadata");
      }, [selector]))
      .then(function(metadata) {
        assert.equal(Boolean(metadata), true, "Phone validation works");
      })
  }
}

export function globalIntuitiveAddressVerify(address: string, selector: string, assert: Chai.Assert) {
  return function() {
    return this.parent
      .findByCssSelector(selector)
        .clearValue()
        .type(address)
        .type(" ")
        .end()
      .then(pollUntil(function() {
        return document.querySelector(".edq-global-intuitive-address-suggestion");
      }))
      .findByCssSelector(".edq-global-intuitive-address-suggestion")
        .click()
        .end()
      .then(pollUntil(function(selector: string) {
        return document.querySelector(selector).getAttribute("edq-metadata");
      }, [selector]))
      .then(function(edqMetadata) {
        assert.equal(Boolean(edqMetadata), true, "Global Intuitive is functional")
      })
      
  }
}

interface AddressObject {
  [index: string]: string;
}

/**
 * Clicks only once the specified element is visible on page.
 */
export function presentClick(selector) {
  return function() {
    try {
      return this.parent
        .then(pollUntil(function(selector) {
          return document.querySelector(selector);
        }, [selector]))
        .findByCssSelector(selector)
          .click()
          .end()
    } catch(e) {
      return presentClick(selector);
    }
  }
}

export function multiFill(obj: AddressObject) {
  let iterator = function(array, index) {
    if (index === array.length) {
      return function() {
        return this.parent
      }
    }

    return function() {
      return this.parent
        .findByCssSelector(array[index][0])
        .clearValue()
        .type(array[index][1])
        .end()
        .then(iterator(array, index + 1))
    };
  }

  return iterator(Object.entries(obj), 0)
}

export function proWebVerification(address: AddressObject, submitSelector, assert: Chai.Assert) {
    return function() {
    return this.parent
      .then(multiFill(address))
      .sleep(3000)
      .findByCssSelector(submitSelector)
        .click()
        .end()
      .then(pollUntil(function(submitSelector) {
        let metadata = document.querySelector(submitSelector).getAttribute("edq-metadata") || 
          document.querySelector(submitSelector)?.form.getAttribute("edq-metadata");
        if (metadata) {
          return metadata;
        } else {
          document.querySelector(submitSelector).click();
          return null;
        }
      }, [submitSelector]))
      .then(function(metadata) {
        assert.equal(Boolean(metadata), true, "Pro Web Verification works");
      })
  }
}

intern.registerPlugin("helpers", function() {
  return {
    presentClick,
    phoneValidate,
    emailValidate,
    globalIntuitiveAddressVerify,
    proWebVerification,
    multiFill
  };
});
