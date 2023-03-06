"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _profileReducer = _interopRequireDefault(require("./profile-reducer"));

var _dialogsReducer = _interopRequireDefault(require("./dialogs-reducer"));

var _sidebarReducer = _interopRequireDefault(require("./sidebar-reducer"));

var _newsReducer = _interopRequireDefault(require("./news-reducer"));

var _usersReducer = _interopRequireDefault(require("./users-reducer"));

var _authReducer = _interopRequireDefault(require("./auth-reducer"));

var _appReducer = _interopRequireDefault(require("./app-reducer"));

var _reduxForm = require("redux-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootReducer = (0, _redux.combineReducers)({
  profilePage: _profileReducer["default"],
  dialogsPage: _dialogsReducer["default"],
  sidebar: _sidebarReducer["default"],
  newsPage: _newsReducer["default"],
  usersPage: _usersReducer["default"],
  auth: _authReducer["default"],
  form: _reduxForm.reducer,
  appPage: _appReducer["default"]
});
var store = (0, _redux.createStore)(rootReducer, (0, _redux.applyMiddleware)(_reduxThunk["default"])); // @ts-ignore

window.store = store;
var _default = store;
exports["default"] = _default;