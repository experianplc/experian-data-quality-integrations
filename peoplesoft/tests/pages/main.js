"use strict";
exports.__esModule = true;
var keys_1 = require("@theintern/leadfoot/keys");
var pollUntil_1 = require("@theintern/leadfoot/helpers/pollUntil");
function setMultiField(value) {
    return function () {
        return this.parent
            .type(value)
            .type(keys_1["default"].ENTER);
    };
}
exports.setMultiField = setMultiField;
function navigateTo(place) {
    return function () {
        return this.parent
            .findByLinkText(place)
            .click()
            .end();
    };
}
exports.navigateTo = navigateTo;
function poll(value, timeout, pollInterval) {
    if (timeout === void 0) { timeout = 10000; }
    if (pollInterval === void 0) { pollInterval = 67; }
    return function () {
        return this.parent
            .then(pollUntil_1["default"](function () {
            var value = arguments[0];
            return document.querySelector(value);
        }, [value], timeout, pollInterval));
    };
}
exports.poll = poll;
function pollEval(value, timeout, pollInterval) {
    if (timeout === void 0) { timeout = 10000; }
    if (pollInterval === void 0) { pollInterval = 67; }
    return function () {
        return this.parent
            .then(pollUntil_1["default"](function () {
            try {
                eval(arguments[0]);
                return null;
            }
            catch (e) {
                console.log(e);
                return true;
            }
        }, [value], timeout, pollInterval));
    };
}
exports.pollEval = pollEval;
