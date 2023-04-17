"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Post_module_css_1 = require("./Post.module.css");
var classnames_1 = require("classnames");
var Post = function (props) {
    return (react_1["default"].createElement("div", { className: Post_module_css_1["default"].item },
        react_1["default"].createElement("div", { className: Post_module_css_1["default"].item__content }, props.message),
        react_1["default"].createElement("div", { className: Post_module_css_1["default"].item__reaction },
            react_1["default"].createElement("div", { className: Post_module_css_1["default"].reaction__container },
                react_1["default"].createElement("span", { className: classnames_1["default"](Post_module_css_1["default"].reaction__icon, Post_module_css_1["default"].icon__like) }),
                react_1["default"].createElement("span", { className: Post_module_css_1["default"].reaction__count }, props.likesCount)),
            react_1["default"].createElement("div", { className: Post_module_css_1["default"].reaction__container },
                react_1["default"].createElement("span", { className: classnames_1["default"](Post_module_css_1["default"].reaction__icon, Post_module_css_1["default"].icon__massage) }),
                react_1["default"].createElement("span", { className: Post_module_css_1["default"].reaction__count }, "1")))));
};
exports["default"] = Post;
