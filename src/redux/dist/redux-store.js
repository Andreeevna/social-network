"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var profile_reducer_1 = require("./profile-reducer");
var sidebar_reducer_1 = require("./sidebar-reducer");
var news_reducer_1 = require("./news-reducer");
var users_reducer_1 = require("./users-reducer");
var auth_reducer_1 = require("./auth-reducer");
var app_reducer_1 = require("./app-reducer");
var redux_form_1 = require("redux-form");
var chat_reducer_1 = require("./chat-reducer");
var rootReducer = redux_1.combineReducers({
    profilePage: profile_reducer_1["default"],
    sidebar: sidebar_reducer_1["default"],
    newsPage: news_reducer_1["default"],
    usersPage: users_reducer_1["default"],
    auth: auth_reducer_1["default"],
    form: redux_form_1.reducer,
    appPage: app_reducer_1["default"],
    chat: chat_reducer_1["default"]
});
// @ts-ignore
var store = redux_1.createStore(rootReducer, redux_1.applyMiddleware(redux_thunk_1["default"]));
// @ts-ignore
window.store = store;
exports["default"] = store;
