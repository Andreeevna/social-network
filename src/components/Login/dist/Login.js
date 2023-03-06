"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var redux_form_1 = require("redux-form");
var FormsControl_1 = require("../../common/Preloader/FormsControl");
var validators_1 = require("../../utils/validators/validators");
var auth_reducer_1 = require("../../redux/auth-reducer");
var react_router_dom_1 = require("react-router-dom");
var FormsControl_module_css_1 = require("./../../common/Preloader/FormsControl.module.css");
var MaxLength50 = validators_1.MaxLengthCreator(50);
var LoginForm = function (_a) {
    var handleSubmit = _a.handleSubmit, error = _a.error, captchaUrl = _a.captchaUrl;
    return (react_1["default"].createElement("form", { onSubmit: handleSubmit },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(redux_form_1.Field, { placeholder: "login", name: 'email', component: FormsControl_1.Input, validate: [validators_1.requiredField, MaxLength50] })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(redux_form_1.Field, { placeholder: "Password", name: 'password', component: FormsControl_1.Input, validate: [validators_1.requiredField, MaxLength50] })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(redux_form_1.Field, { type: "checkbox", name: 'rememberMe', component: FormsControl_1.Input, validate: [validators_1.requiredField] }),
            " remember me"),
        error && react_1["default"].createElement("div", { className: FormsControl_module_css_1["default"].formSumError }, error),
        captchaUrl && react_1["default"].createElement("img", { src: captchaUrl }),
        captchaUrl && react_1["default"].createElement(redux_form_1.Field, { placeholder: "", name: 'captcha', component: FormsControl_1.Input, validate: [validators_1.requiredField] }),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("button", null, "login"))));
};
var LoginReduxForm = redux_form_1.reduxForm({
    form: 'login'
})(LoginForm);
var Login = function (props) {
    var onSubmit = function (fromData) {
        props.LoginAut(fromData.email, fromData.password, fromData.rememberMe, fromData.captcha);
    };
    if (props.isAuth) {
        return react_1["default"].createElement(react_router_dom_1.Navigate, { to: '/profile/19944' });
    }
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h1", null, "Login"),
        react_1["default"].createElement(LoginReduxForm, { onSubmit: onSubmit, captchaUrl: props.captchaUrl })));
};
var mapStateToProps = function (state) {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, { LoginAut: auth_reducer_1.LoginAut })(Login);
