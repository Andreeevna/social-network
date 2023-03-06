"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var react_router_dom_1 = require("react-router-dom");
var react_router_dom_2 = require("react-router-dom");
require("./App.css");
var Navbar_1 = require("./components/Navbar/Navbar");
var NewsContainer_1 = require("./components/News/NewsContainer");
var UsersContainer_1 = require("./components/Users/UsersContainer");
var ProfileContainer_1 = require("./components/Profile/ProfileContainer");
var HeaderContainer_1 = require("./components/Header/HeaderContainer");
var Login_1 = require("./components/Login/Login");
var app_reducer_1 = require("./redux/app-reducer");
var Preloader_1 = require("./common/Preloader/Preloader");
var ChatPage_1 = require("./components/pages/Chat/ChatPage");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.componentDidMount = function () {
        this.props.initializeApp();
    };
    App.prototype.render = function () {
        if (!this.props.initialized) {
            return react_1["default"].createElement(Preloader_1["default"], null);
        }
        return (react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
            react_1["default"].createElement(HeaderContainer_1["default"], null),
            react_1["default"].createElement("div", { className: "wrapper" },
                react_1["default"].createElement("div", { className: "app__container" },
                    react_1["default"].createElement(Navbar_1["default"], null),
                    react_1["default"].createElement("div", { className: "app_wrapper_content" },
                        react_1["default"].createElement(react_router_dom_1.Routes, null,
                            react_1["default"].createElement(react_router_dom_1.Route, { path: "/profile", element: react_1["default"].createElement(ProfileContainer_1["default"], null) }),
                            react_1["default"].createElement(react_router_dom_1.Route, { path: "/profile/:userId", element: react_1["default"].createElement(ProfileContainer_1["default"], null) }),
                            react_1["default"].createElement(react_router_dom_1.Route, { path: "/news", element: react_1["default"].createElement(NewsContainer_1["default"], null) }),
                            react_1["default"].createElement(react_router_dom_1.Route, { path: "/users", element: react_1["default"].createElement(UsersContainer_1["default"], null) }),
                            react_1["default"].createElement(react_router_dom_1.Route, { path: "/login", element: react_1["default"].createElement(Login_1["default"], null) }),
                            react_1["default"].createElement(react_router_dom_1.Route, { path: "/chat", element: react_1["default"].createElement(ChatPage_1["default"], null) })))))));
    };
    return App;
}(react_1["default"].Component));
function withRouter(Children) {
    return function (props) {
        var match = { params: react_router_dom_2.useParams() };
        return react_1["default"].createElement(Children, __assign({}, props, { match: match }));
    };
}
var mapStateToProps = function (state) {
    return {
        initialized: state.appPage.initialized
    };
};
exports["default"] = redux_1.compose(react_redux_1.connect(mapStateToProps, { initializeApp: app_reducer_1.initializeApp }), withRouter)(App);
