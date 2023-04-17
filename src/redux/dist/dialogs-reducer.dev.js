"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.sendMessageCreator = exports.dialogsReducer = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SEND_MESSAGE = "SEND_MESSAGE";
var initialState = {
  dialogs: [{
    id: 1,
    name: 'Dima'
  }, {
    id: 2,
    name: 'Andrey'
  }, {
    id: 3,
    name: 'Sveta'
  }, {
    id: 4,
    name: 'Sasha'
  }, {
    id: 5,
    name: 'Valera'
  }, {
    id: 6,
    name: 'Viktor'
  }],
  messages: [{
    id: 1,
    message: 'Hi'
  }, {
    id: 2,
    message: 'Whats your name?'
  }, {
    id: 3,
    message: 'Yo'
  }, {
    id: 4,
    message: 'Yo'
  }, {
    id: 5,
    message: 'Yo'
  }, {
    id: 6,
    message: 'Yo'
  }]
};

var dialogsReducer = function dialogsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SEND_MESSAGE:
      var body = action.newMessageBody;
      return _objectSpread({}, state, {
        messages: [].concat(_toConsumableArray(state.messages), [{
          id: 6,
          message: body
        }])
      });

    default:
      return state;
  } // делаем ретурн чтобы не использовать брейк и функци не проваливалась дальше
  // дефолтный кейс по умолчанию, если не пришел action который нам нужен

};

exports.dialogsReducer = dialogsReducer;

var sendMessageCreator = function sendMessageCreator(newMessageBody) {
  return {
    type: SEND_MESSAGE,
    newMessageBody: newMessageBody
  };
};

exports.sendMessageCreator = sendMessageCreator;
var _default = dialogsReducer;
exports["default"] = _default;