"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getCaptchaUrl = exports.Logout = exports.LoginAut = exports.getAuthUserData = exports.getCuptchaUrlSucces = exports.setData = void 0;
var Api_1 = require("./../api/Api");
var redux_form_1 = require("redux-form");
var Api_2 = require("../api/Api");
var SET_USER_DATA = "SET_USER_DATA";
var GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";
var initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null // if null then captcha is not required
};
var authReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return __assign(__assign({}, state), action.data);
        default:
            return state;
    }
};
exports.setData = function (id, email, login, isAuth) {
    return {
        type: SET_USER_DATA,
        data: { id: id, email: email, login: login, isAuth: isAuth }
    };
};
exports.getCuptchaUrlSucces = function (captchaUrl) {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        data: { captchaUrl: captchaUrl }
    };
};
exports.getAuthUserData = function () {
    return function (dispatch) {
        return Api_2.authAPI.authorize().then(function (resp) {
            if (resp.data.resultCode === Api_1.ResultCodeEnum.Success) {
                var _a = resp.data.data, id = _a.id, email = _a.email, login = _a.login;
                dispatch(exports.setData(id, email, login, true));
            }
        });
    };
};
exports.LoginAut = function (email, password, rememberMe, captcha) {
    if (captcha === void 0) { captcha = null; }
    return function (dispatch) {
        Api_2.authAPI.login(email, password, rememberMe, captcha)
            .then(function (response) {
            if (response.data.resultCode === Api_1.ResultCodeEnum.Success) {
                dispatch(exports.getAuthUserData());
            }
            else {
                if (response.data.resultCode === Api_1.ResultCodeCaptchaEnum.CaptchaIsRequired) {
                    dispatch(exports.getCaptchaUrl());
                }
                var messages = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                dispatch(redux_form_1.stopSubmit('login', { _error: messages }));
            }
        });
    };
};
exports.Logout = function () {
    return function (dispatch) {
        Api_2.authAPI.logout().then(function (resp) {
            if (resp.data.resultCode === 0) {
                dispatch(exports.setData(null, null, null, false));
            }
        });
    };
};
exports.getCaptchaUrl = function () {
    return function (dispatch) {
        Api_2.securityAPI.getCaptchaUrl()
            .then(function (resp) {
            dispatch(exports.getCuptchaUrlSucces(resp.data.url));
        });
    };
};
exports["default"] = authReducer;
