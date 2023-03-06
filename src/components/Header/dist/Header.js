"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./../../App.css");
var Header_module_css_1 = require("./Header.module.css");
var logo_png_1 = require("./../../assets/img/logo.png");
var classnames_1 = require("classnames");
var Header = function (props) {
    return (react_1["default"].createElement("header", { className: Header_module_css_1["default"].header },
        react_1["default"].createElement("div", { className: classnames_1["default"](Header_module_css_1["default"].header__container, "wrapper") },
            react_1["default"].createElement("div", { className: Header_module_css_1["default"].logo },
                react_1["default"].createElement("img", { className: Header_module_css_1["default"].logo__img, src: logo_png_1["default"], alt: "Logo" }),
                react_1["default"].createElement("p", { className: Header_module_css_1["default"].logo__text }, " social network")),
            react_1["default"].createElement("div", null, props.isAuth ? (react_1["default"].createElement("div", { className: Header_module_css_1["default"].login__container },
                react_1["default"].createElement("span", { className: Header_module_css_1["default"].login__name }, props.login),
                "  - ",
                react_1["default"].createElement("button", { className: "button_standart", onClick: props.Logout }, "Log Out"))) : (react_1["default"].createElement(react_router_dom_1.NavLink, { className: classnames_1["default"]("button_standart", "button_standart__link"), to: "/login" }, "Login"))))));
};
exports["default"] = Header;
