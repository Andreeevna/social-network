"use strict";
exports.__esModule = true;
exports.MaxLengthCreator = exports.requiredField = void 0;
exports.requiredField = function (value) {
    if (value)
        return undefined;
    return "Field is required";
};
exports.MaxLengthCreator = function (maxLength) { return function (value) {
    if (value && value.length > maxLength)
        return "Max length is " + maxLength + " symbols";
    return undefined;
}; };
