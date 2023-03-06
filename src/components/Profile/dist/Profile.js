"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ProfileInfo_1 = require("./MyPosts/ProfileInfo/ProfileInfo");
var MyPostsContainer_1 = require("./MyPosts/MyPostsContainer");
var Profile = function (props) {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(ProfileInfo_1["default"], { isOwner: props.isOwner, profile: props.profile, updateStatusProfile: props.updateStatusProfile, status: props.status, savePhoto: props.savePhoto, saveProfile: props.saveProfile }),
        react_1["default"].createElement(MyPostsContainer_1["default"], null)));
};
exports["default"] = Profile;
