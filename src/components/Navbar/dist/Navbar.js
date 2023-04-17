"use strict";
exports.__esModule = true;
var react_router_dom_1 = require("react-router-dom");
var Navbar_module_css_1 = require("./Navbar.module.css");
var react_1 = require("react");
var profile_png_1 = require("./../../assets/img/profile.png");
var messages_png_1 = require("./../../assets/img/messages.png");
var users_png_1 = require("./../../assets/img/users.png");
var news_png_1 = require("./../../assets/img/news.png");
var music_png_1 = require("./../../assets/img/music.png");
var settings_png_1 = require("./../../assets/img/settings.png");
var Navbar = function () {
    return (react_1["default"].createElement("nav", { className: Navbar_module_css_1["default"].nav },
        react_1["default"].createElement("div", { className: Navbar_module_css_1["default"].item },
            react_1["default"].createElement("img", { className: Navbar_module_css_1["default"].item__icon, src: profile_png_1["default"], alt: "Profile icon" }),
            react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/Profile", className: Navbar_module_css_1["default"].activelink }, "Profile")),
        react_1["default"].createElement("div", { className: Navbar_module_css_1["default"].item },
            react_1["default"].createElement("img", { className: Navbar_module_css_1["default"].item__icon, src: messages_png_1["default"], alt: "Message icon" }),
            react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/Chat", className: Navbar_module_css_1["default"].activelink }, "Chat")),
        react_1["default"].createElement("div", { className: Navbar_module_css_1["default"].item },
            react_1["default"].createElement("img", { className: Navbar_module_css_1["default"].item__icon, src: users_png_1["default"], alt: "Users icon" }),
            react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/Users", className: Navbar_module_css_1["default"].activelink }, "Users")),
        react_1["default"].createElement("div", { className: Navbar_module_css_1["default"].item },
            react_1["default"].createElement("img", { className: Navbar_module_css_1["default"].item__icon, src: news_png_1["default"], alt: "News icon" }),
            react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/News", className: Navbar_module_css_1["default"].activelink }, "News")),
        react_1["default"].createElement("div", { className: Navbar_module_css_1["default"].item },
            react_1["default"].createElement("img", { className: Navbar_module_css_1["default"].item__icon, src: music_png_1["default"], alt: "Music icon" }),
            react_1["default"].createElement("a", null, "Music")),
        react_1["default"].createElement("div", { className: Navbar_module_css_1["default"].item },
            react_1["default"].createElement("img", { className: Navbar_module_css_1["default"].item__icon, src: settings_png_1["default"], alt: "Settings icon" }),
            react_1["default"].createElement("a", null, "Settings"))));
};
exports["default"] = Navbar;
