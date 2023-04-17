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
exports.initializeApp = exports.initializedSucces = void 0;
var auth_reducer_1 = require("./auth-reducer");
var INITIALIZED_SUCCES = 'INITIALIZED_SUCCES';
var initialState = {
    initialized: false
};
var appReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case INITIALIZED_SUCCES:
            return __assign(__assign({}, state), { initialized: true });
        default:
            return state;
    }
};
exports.initializedSucces = function () {
    return {
        type: INITIALIZED_SUCCES
    };
};
exports.initializeApp = function () {
    return function (dispatch) {
        var promise = dispatch(auth_reducer_1.getAuthUserData());
        Promise.all([promise]).then(function () {
            dispatch(exports.initializedSucces());
        });
    };
};
exports["default"] = appReducer;
