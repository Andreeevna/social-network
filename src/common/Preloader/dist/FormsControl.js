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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.Input = exports.Textarea = exports.FormControls = void 0;
var react_1 = require("react");
var FormsControl_module_css_1 = require("./FormsControl.module.css");
exports.FormControls = function (_a) {
    var _b = _a.meta, touched = _b.touched, error = _b.error, children = _a.children;
    var hasError = touched && error;
    return (react_1["default"].createElement("div", { className: FormsControl_module_css_1["default"].formControl + " " + (hasError ? FormsControl_module_css_1["default"].error : " ") },
        react_1["default"].createElement("div", null, children),
        hasError && react_1["default"].createElement("span", null,
            " ",
            error,
            " ")));
};
exports.Textarea = function (props) {
    // const {input, meta, child, ...restProps} =  props 
    var input = props.input, meta = props.meta, restProps = __rest(props, ["input", "meta"]);
    return react_1["default"].createElement(exports.FormControls, __assign({}, props),
        react_1["default"].createElement("textarea", __assign({}, input, restProps)));
};
exports.Input = function (props) {
    // const {input, meta, child, ...restProps} =  props 
    var input = props.input, meta = props.meta, restProps = __rest(props, ["input", "meta"]);
    return react_1["default"].createElement(exports.FormControls, __assign({}, props),
        react_1["default"].createElement("input", __assign({}, input, restProps)));
};
// export const Input = ({ input, meta, ...props }) => {
//     const hasError = meta.touched && meta.error;
//     return (
//         <div className={styles.formControl + " " + (hasError ? styles.error : " ")}>
//             <div>
//                 <input {...input} {...props} />
//             </div>
//                 {hasError && <span> {meta.error} </span>}
//         </div>
//     )
// }
// export const Textarea = ({ input, meta, ...props }) => {
//         const hasError = meta.touched && meta.error;
//         return (
//             <div className={styles.formControl + " " + (hasError ? styles.error : " ")}>
//                 <div>
//                     <textarea {...input} {...props} />
//                 </div>
//                     {hasError && <span> {meta.error} </span>}
//             </div>
//         )
// }
