"use strict";
exports.__esModule = true;
exports.Contact = void 0;
var Preloader_1 = require("../../../../common/Preloader/Preloader");
var ProfileStatus_1 = require("../../ProfileStatus");
var ProfileInfo_module_css_1 = require("./ProfileInfo.module.css");
var react_1 = require("react");
var user_png_1 = require("./../../../../assets/img/user.png");
var ProfileDataForm_1 = require("../../ProfileDataForm");
var ProfileInfo = function (props) {
    var _a = react_1.useState(false), editMode = _a[0], setEditMode = _a[1];
    if (!props.profile) {
        return react_1["default"].createElement(Preloader_1["default"], null);
    }
    var mainPhotoSelected = function (e) {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    };
    var onSubmit = function (formData) {
        props.saveProfile(formData).then(function () {
            setEditMode(false);
        });
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: ProfileInfo_module_css_1["default"].description__block },
            react_1["default"].createElement("div", { className: ProfileInfo_module_css_1["default"].profile__main },
                react_1["default"].createElement("img", { className: ProfileInfo_module_css_1["default"].profile__img, src: props.profile.photos.large || user_png_1["default"] }),
                react_1["default"].createElement("label", { className: ProfileInfo_module_css_1["default"].profile__label },
                    "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044E \u043F\u0440\u043E\u0444\u0438\u043B\u044F",
                    props.isOwner && (react_1["default"].createElement("input", { className: ProfileInfo_module_css_1["default"].profile__input, type: "file", onChange: mainPhotoSelected }))),
                react_1["default"].createElement(ProfileStatus_1["default"], { status: props.status, updateStatusProfile: props.updateStatusProfile })),
            react_1["default"].createElement("div", { className: ProfileInfo_module_css_1["default"].description__info }, editMode ? (react_1["default"].createElement(ProfileDataForm_1["default"], { initialValues: props.profile, profile: props.profile, onSubmit: onSubmit })) : (react_1["default"].createElement(ProfileData, { goToEditMode: function () {
                    setEditMode(true);
                }, profile: props.profile, isOwner: props.isOwner }))))));
};
var ProfileData = function (_a) {
    var goToEditMode = _a.goToEditMode, profile = _a.profile, isOwner = _a.isOwner;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: ProfileInfo_module_css_1["default"].about },
            react_1["default"].createElement("div", { className: ProfileInfo_module_css_1["default"].about__title }, "Personal information"),
            react_1["default"].createElement("div", { className: ProfileInfo_module_css_1["default"].about__personal },
                react_1["default"].createElement("div", { className: ProfileInfo_module_css_1["default"].about__info },
                    react_1["default"].createElement("span", { className: ProfileInfo_module_css_1["default"].info__title }, "Full name:"),
                    react_1["default"].createElement("span", { className: ProfileInfo_module_css_1["default"].info__desc },
                        " ",
                        profile.fullName)),
                react_1["default"].createElement("div", { className: ProfileInfo_module_css_1["default"].about__info },
                    react_1["default"].createElement("span", { className: ProfileInfo_module_css_1["default"].info__title }, "Looking for a job:"),
                    react_1["default"].createElement("span", { className: ProfileInfo_module_css_1["default"].info__desc }, profile.lookingForAJob ? 'yes' : 'no')),
                react_1["default"].createElement("div", { className: ProfileInfo_module_css_1["default"].about__info },
                    react_1["default"].createElement("span", { className: ProfileInfo_module_css_1["default"].info__title }, "My professional skills:"),
                    react_1["default"].createElement("span", { className: ProfileInfo_module_css_1["default"].info__desc },
                        " ",
                        profile.lookingForAJobDescription)),
                react_1["default"].createElement("div", { className: ProfileInfo_module_css_1["default"].about__info },
                    react_1["default"].createElement("span", { className: ProfileInfo_module_css_1["default"].info__title }, "About me:"),
                    react_1["default"].createElement("span", { className: ProfileInfo_module_css_1["default"].info__desc }, profile.aboutMe))),
            react_1["default"].createElement("div", { className: ProfileInfo_module_css_1["default"].about__contact },
                react_1["default"].createElement("div", { className: ProfileInfo_module_css_1["default"].about__title }, "My contacts")),
            Object.keys(profile.contacts).map(function (key) {
                return (react_1["default"].createElement(exports.Contact, { key: key, contactTitle: key, contactValue: profile.contacts[key] }));
            })),
        react_1["default"].createElement("div", { className: ProfileInfo_module_css_1["default"].button_container }, isOwner && (react_1["default"].createElement("button", { className: "button_standart", onClick: goToEditMode }, "edit information")))));
};
exports.Contact = function (_a) {
    var contactTitle = _a.contactTitle, contactValue = _a.contactValue;
    return (react_1["default"].createElement("div", { className: ProfileInfo_module_css_1["default"].about__info },
        react_1["default"].createElement("span", { className: ProfileInfo_module_css_1["default"].info__title },
            contactTitle.charAt(0).toUpperCase() + contactTitle.slice(1),
            ":"),
        react_1["default"].createElement("span", { className: ProfileInfo_module_css_1["default"].info__desc }, contactValue)));
};
exports["default"] = ProfileInfo;
