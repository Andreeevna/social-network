"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Paginator_1 = require("../../common/Preloader/Paginator");
var User_1 = require("./User");
var Users_module_css_1 = require("./Users.module.css");
var Users = function (_a) {
    var totalCount = _a.totalCount, pageSize = _a.pageSize, currentPage = _a.currentPage, onChanged = _a.onChanged, users = _a.users, followingInProgress = _a.followingInProgress, followUsers = _a.followUsers, unfollowUsers = _a.unfollowUsers, portionSize = _a.portionSize;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(Paginator_1["default"], { totalCount: totalCount, currentPage: currentPage, onChanged: onChanged, pageSize: pageSize, portionSize: portionSize }),
        react_1["default"].createElement("div", { className: Users_module_css_1["default"].users__container }, users.map(function (u) { return react_1["default"].createElement(User_1["default"], { key: u.id, u: u, followingInProgress: followingInProgress, followUsers: followUsers, unfollowUsers: unfollowUsers }); }))));
};
exports["default"] = Users;
