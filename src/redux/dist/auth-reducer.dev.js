"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getCaptchaUrl = exports.Logout = exports.LoginAut = exports.getAuthUserData = exports.getCuptchaUrlSucces = exports.setData = void 0;

var _reduxForm = require("redux-form");

var _Api = require("../api/Api");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SET_USER_DATA = "SET_USER_DATA";
var GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";
var initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null // if null then captcha is not required

};

var authReducer = function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return _objectSpread({}, state, {}, action.data);

    default:
      return state;
  }
};

var setData = function setData(id, email, login, isAuth) {
  return {
    type: SET_USER_DATA,
    data: {
      id: id,
      email: email,
      login: login,
      isAuth: isAuth
    }
  };
};

exports.setData = setData;

var getCuptchaUrlSucces = function getCuptchaUrlSucces(captchaUrl) {
  return {
    type: GET_CAPTCHA_URL_SUCCESS,
    data: {
      captchaUrl: captchaUrl
    }
  };
};

exports.getCuptchaUrlSucces = getCuptchaUrlSucces;

var getAuthUserData = function getAuthUserData() {
  return function (dispatch) {
    return _Api.authAPI.authorize().then(function (resp) {
      if (resp.data.resultCode === 0) {
        var _resp$data$data = resp.data.data,
            id = _resp$data$data.id,
            email = _resp$data$data.email,
            login = _resp$data$data.login;
        dispatch(setData(id, email, login, true));
      }
    });
  };
};

exports.getAuthUserData = getAuthUserData;

var LoginAut = function LoginAut(email, password, rememberMe, captcha) {
  return function (dispatch) {
    _Api.authAPI.login(email, password, rememberMe, captcha).then(function (response) {
      if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
      } else {
        if (response.data.resultCode === 10) {
          dispatch(getCaptchaUrl());
        }

        var messages = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch((0, _reduxForm.stopSubmit)('login', {
          _error: messages
        }));
      }
    });
  };
};

exports.LoginAut = LoginAut;

var Logout = function Logout() {
  return function (dispatch) {
    _Api.authAPI.logout().then(function (resp) {
      if (resp.data.resultCode === 0) {
        dispatch(setData(null, null, null, false));
      }
    });
  };
};

exports.Logout = Logout;

var getCaptchaUrl = function getCaptchaUrl() {
  return function (dispatch) {
    _Api.securityAPI.getCaptchaUrl().then(function (resp) {
      dispatch(getCuptchaUrlSucces(resp.data.url));
    });
  };
};

exports.getCaptchaUrl = getCaptchaUrl;
var _default = authReducer;
exports["default"] = _default;