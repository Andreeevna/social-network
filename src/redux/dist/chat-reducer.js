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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.sendMessageT = exports.stopMessagesListening = exports.startMessagesListening = exports.actions = void 0;
var chat_api_1 = require("./../api/chat-api");
var uuid_1 = require("uuid");
var MESSAGES_RECEIVED = "chat/MESSAGES_RECEIVED";
var STATUS_CHANGED = "chat/STATUS_CHANGED";
var initialState = {
    messages: [],
    status: "pending"
};
var chatReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return __assign(__assign({}, state), { messages: __spreadArrays(state.messages, action.payload.messages.map(function (m) { return (__assign(__assign({}, m), { id: uuid_1.v1() })); })).filter(function (m, index, array) { return index >= array.length - 100; }) });
        case STATUS_CHANGED:
            return __assign(__assign({}, state), { status: action.payload.status });
        default:
            return state;
    }
};
exports.actions = {
    messagesReceived: function (messages) {
        return {
            type: MESSAGES_RECEIVED,
            payload: { messages: messages }
        };
    },
    statusChanged: function (status) {
        return {
            type: STATUS_CHANGED,
            payload: { status: status }
        };
    }
};
var _newMessageHandlerCreator = null;
var newMessageHandlerCreator = function (dispatch) {
    if (_newMessageHandlerCreator === null) {
        _newMessageHandlerCreator = function (messages) {
            dispatch(exports.actions.messagesReceived(messages));
        };
    }
    return _newMessageHandlerCreator;
};
var _statusHandlerCreator = null;
var statusHandlerCreator = function (dispatch) {
    if (_statusHandlerCreator === null) {
        _statusHandlerCreator = function (status) {
            dispatch(exports.actions.statusChanged(status));
        };
    }
    return _statusHandlerCreator;
};
exports.startMessagesListening = function () {
    return function (dispatch) {
        chat_api_1.chatAPI.start();
        chat_api_1.chatAPI.subscribe('message-recieved', newMessageHandlerCreator(dispatch));
        chat_api_1.chatAPI.subscribe('status-changed', statusHandlerCreator(dispatch));
    };
};
exports.stopMessagesListening = function () {
    return function (dispatch) {
        chat_api_1.chatAPI.unsubscribe('message-recieved', newMessageHandlerCreator(dispatch));
        chat_api_1.chatAPI.unsubscribe('status-changed', newMessageHandlerCreator(dispatch));
        chat_api_1.chatAPI.stop();
    };
};
exports.sendMessageT = function (message) {
    return function (dispatch) {
        chat_api_1.chatAPI.senMessage(message);
    };
};
exports["default"] = chatReducer;
