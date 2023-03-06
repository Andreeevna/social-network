"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaxLengthCreator = exports.requiredField = void 0;

var requiredField = function requiredField(value) {
  if (value) return undefined;
  return "Field is required";
};

exports.requiredField = requiredField;

var MaxLengthCreator = function MaxLengthCreator(maxLength) {
  return function (value) {
    if (value && value.length > maxLength) return "Max length is ".concat(maxLength, " symbols");
    return undefined;
  };
};

exports.MaxLengthCreator = MaxLengthCreator;