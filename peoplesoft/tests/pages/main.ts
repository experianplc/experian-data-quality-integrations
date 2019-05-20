import keys from '@theintern/leadfoot/keys';
import pollUntil from '@theintern/leadfoot/helpers/pollUntil';

function setMultiField(value: string) {
  return function() {
    return this.parent
      .type(value)
      .type(keys.ENTER)
  }
}

function navigateTo(place: 'Address' | 'Email' | 'Phone') {
  return function() {
    return this.parent
      .findByLinkText(place)
        .click()
        .end()
  }
}

function poll(value: string | Function, timeout: number = 10000, pollInterval: number = 67) {
  return function() {
    return this.parent
      .then(pollUntil(function() {
        const value = arguments[0];
        return document.querySelector(value);
      }, [value], timeout, pollInterval))
  }
}

function pollEval(value: string | Function, timeout: number = 10000, pollInterval: number = 67) {
  return function() {
    return this.parent
      .then(pollUntil(function() {
        try {
          eval(arguments[0])
          return null;
        } catch(e) {
          console.log(e);
          return true;
        }
      }, [value], timeout, pollInterval))
  }
}

export {
  setMultiField,
  navigateTo,
  poll,
  pollEval,
  pollUntil
}
