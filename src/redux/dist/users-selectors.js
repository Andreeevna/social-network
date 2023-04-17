"use strict";
exports.__esModule = true;
exports.getPortionSize = exports.getFollowingInProgress = exports.getIsFetching = exports.getCurrentPage = exports.getTotalUsersCount = exports.getPageSize = exports.getUsersSelect = void 0;
var reselect_1 = require("reselect");
var usersSelect = function (state) {
    return state.usersPage.users;
};
exports.getUsersSelect = reselect_1.createSelector(usersSelect, function (users) {
    return users.filter(function (u) { return true; });
});
exports.getPageSize = function (state) {
    return state.usersPage.pageSize;
};
exports.getTotalUsersCount = function (state) {
    return state.usersPage.totalCount;
};
exports.getCurrentPage = function (state) {
    return state.usersPage.currentPage;
};
exports.getIsFetching = function (state) {
    return state.usersPage.isFetching;
};
exports.getFollowingInProgress = function (state) {
    return state.usersPage.followingInProgress;
};
exports.getPortionSize = function (state) {
    return state.usersPage.portionSize;
};
