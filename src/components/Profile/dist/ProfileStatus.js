"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ProfileStatus_module_css_1 = require("./ProfileStatus.module.css");
var ProfileStatus = function (props) {
    var _a = react_1.useState(false), editeMode = _a[0], setEditeMode = _a[1];
    var _b = react_1.useState(props.status), status = _b[0], setStatus = _b[1];
    react_1.useEffect(function () {
        setStatus(props.status);
    }, [props.status]);
    var activateEditeMode = function () {
        setEditeMode(true);
    };
    var deActivateEditeMode = function () {
        setEditeMode(false);
        props.updateStatusProfile(status);
    };
    var onChangeStatus = function (e) {
        setStatus(e.currentTarget.value);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        !editeMode && (react_1["default"].createElement("span", { className: ProfileStatus_module_css_1["default"].status__edite, onDoubleClick: activateEditeMode }, props.status || '------')),
        editeMode && (react_1["default"].createElement("input", { className: ProfileStatus_module_css_1["default"].status__input, onBlur: deActivateEditeMode, autoFocus: true, value: status, onChange: onChangeStatus }))));
};
exports["default"] = ProfileStatus;
