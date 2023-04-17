"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var MyPosts_module_css_1 = require("./MyPosts.module.css");
var Post_1 = require("./Post/Post");
var react_1 = require("react");
var redux_form_1 = require("redux-form");
var validators_1 = require("../../../utils/validators/validators");
var FormsControl_1 = require("../../../common/Preloader/FormsControl");
var MyPosts = function (props) {
    var postsElements = __spreadArrays(props.posts).reverse().map(function (el) { return (react_1["default"].createElement(Post_1["default"], { key: el.id, message: el.message, likesCount: el.likesCount })); });
    var onAddPost = function (value) {
        props.addPost(value.newPost);
    };
    return (react_1["default"].createElement("div", { className: MyPosts_module_css_1["default"].posts__container },
        react_1["default"].createElement("div", { className: MyPosts_module_css_1["default"].posts__content },
            react_1["default"].createElement("h3", { className: MyPosts_module_css_1["default"].posts__title }, "My posts"),
            react_1["default"].createElement(AddNewPostReduxForm, { onSubmit: onAddPost })),
        react_1["default"].createElement("div", { className: MyPosts_module_css_1["default"].posts }, postsElements)));
};
var MaxLength100 = validators_1.MaxLengthCreator(100);
// type AddPostFormKeys = Extract<keyof AddPostFormType, string> для функции createField (берем все ключи а потом лишь те которые стринг)
var AddNewPostForm = function (props) {
    return (react_1["default"].createElement("form", { onSubmit: props.handleSubmit, className: MyPosts_module_css_1["default"].form__post },
        react_1["default"].createElement(redux_form_1.Field, { className: MyPosts_module_css_1["default"].form__input, placeholder: "What's new with you?", name: "newPost", component: FormsControl_1.Textarea, validate: [validators_1.requiredField, MaxLength100] }),
        react_1["default"].createElement("button", { className: "button_standart" }, "Add post")));
};
var AddNewPostReduxForm = redux_form_1.reduxForm({
    form: "profileAddPostForm"
})(AddNewPostForm);
var MyPostsMemo = react_1["default"].memo(MyPosts);
exports["default"] = MyPostsMemo;
