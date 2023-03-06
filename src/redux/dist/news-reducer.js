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
exports.updateNewNewsTextAC = exports.addNewsAC = void 0;
var ADD_NEWS = "ADD_NEWS";
var UPDATE_NEW_NEWS_TEXT = "UPDATE-NEW-NEWS-TEXT";
var initialState = {
    postsInfo: [
        { id: 1, info: 'Hi, how are you?', likesCount: 12, views: 100 },
        { id: 2, info: 'It is my first post', likesCount: 11, views: 110 }
    ],
    newInfoText: 'Мои дела на сегодня'
};
var newsReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ADD_NEWS:
            var newInfoPost = {
                id: 2,
                info: state.newInfoText,
                likesCount: 0,
                views: 0
            };
            return __assign(__assign({}, state), { postsInfo: __spreadArrays(state.postsInfo, [newInfoPost]), newInfoText: '' });
        case UPDATE_NEW_NEWS_TEXT:
            return __assign(__assign({}, state), { newInfoText: action.newText });
        default:
            return state;
    }
};
exports.addNewsAC = function () {
    return {
        type: ADD_NEWS
    };
};
exports.updateNewNewsTextAC = function (newText) {
    return {
        type: UPDATE_NEW_NEWS_TEXT,
        newText: newText
    };
};
exports["default"] = newsReducer;
