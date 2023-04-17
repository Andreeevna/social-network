"use strict";
exports.__esModule = true;
var react_1 = require("react");
var redux_form_1 = require("redux-form");
var FormsControl_1 = require("../../common/Preloader/FormsControl");
var FormsControl_module_css_1 = require("./../../common/Preloader/FormsControl.module.css");
var ProfileDataForm_module_css_1 = require("./ProfileDataForm.module.css");
var classnames_1 = require("classnames");
var ProfileDataForm = function (_a) {
    var handleSubmit = _a.handleSubmit, profile = _a.profile, error = _a.error;
    return (react_1["default"].createElement("form", { className: ProfileDataForm_module_css_1["default"].form, onSubmit: handleSubmit },
        error && react_1["default"].createElement("div", { className: FormsControl_module_css_1["default"].formSumError }, error),
        react_1["default"].createElement("div", { className: ProfileDataForm_module_css_1["default"].form_person__title }, "Personal information"),
        react_1["default"].createElement("div", { className: ProfileDataForm_module_css_1["default"].form_person__info },
            react_1["default"].createElement("div", { className: ProfileDataForm_module_css_1["default"].title_list },
                react_1["default"].createElement("span", { className: ProfileDataForm_module_css_1["default"].title_list__item }, "Full name:"),
                react_1["default"].createElement("span", { className: ProfileDataForm_module_css_1["default"].title_list__item }, "Looking for a job:"),
                react_1["default"].createElement("span", { className: ProfileDataForm_module_css_1["default"].title_list__item }, "My professional skills:"),
                react_1["default"].createElement("span", { className: ProfileDataForm_module_css_1["default"].title_list__item }, "About me:")),
            react_1["default"].createElement("div", { className: ProfileDataForm_module_css_1["default"].desc_list },
                react_1["default"].createElement(redux_form_1.Field, { className: classnames_1["default"](ProfileDataForm_module_css_1["default"].desc_list__field, ProfileDataForm_module_css_1["default"].field_input), placeholder: 'Full name', name: 'fullName', component: FormsControl_1.Input }),
                react_1["default"].createElement(redux_form_1.Field, { className: ProfileDataForm_module_css_1["default"].desc_list__field, placeholder: '', name: 'lookingForAJob', component: FormsControl_1.Input, type: 'checkbox' }),
                react_1["default"].createElement(redux_form_1.Field, { className: classnames_1["default"](ProfileDataForm_module_css_1["default"].desc_list__field, ProfileDataForm_module_css_1["default"].desc_list_textarea), placeholder: 'My professional skills', name: 'lookingForAJobDescription', component: FormsControl_1.Textarea }),
                react_1["default"].createElement(redux_form_1.Field, { className: classnames_1["default"](ProfileDataForm_module_css_1["default"].desc_list__field, ProfileDataForm_module_css_1["default"].desc_list_textarea), placeholder: 'About me', name: 'aboutMe', component: FormsControl_1.Textarea }))),
        react_1["default"].createElement("div", { className: ProfileDataForm_module_css_1["default"].from__item },
            react_1["default"].createElement("span", { className: ProfileDataForm_module_css_1["default"].from__title }, "My contacts:")),
        Object.keys(profile.contacts).map(function (key) {
            return (react_1["default"].createElement("div", { className: ProfileDataForm_module_css_1["default"].from__item },
                react_1["default"].createElement("span", { className: ProfileDataForm_module_css_1["default"].from__title },
                    key,
                    ":"),
                react_1["default"].createElement(redux_form_1.Field, { className: classnames_1["default"](ProfileDataForm_module_css_1["default"].from__field, ProfileDataForm_module_css_1["default"].field_input), placeholder: key, name: 'contacts.' + key, component: FormsControl_1.Input })));
        }),
        react_1["default"].createElement("div", { className: ProfileDataForm_module_css_1["default"].button_container },
            react_1["default"].createElement("button", { className: "button_standart" }, "Save"))));
};
var ProfileDataReduxForm = redux_form_1.reduxForm({
    form: 'edit-profile'
})(ProfileDataForm);
exports["default"] = ProfileDataReduxForm;
