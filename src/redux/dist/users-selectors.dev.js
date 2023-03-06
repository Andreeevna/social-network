"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPortionSize = exports.getFollowingInProgress = exports.getIsFetching = exports.getCurrentPage = exports.getTotalUsersCount = exports.getPageSize = exports.getUsersSelect = void 0;

var _reselect = require("reselect");

var usersSelect = function usersSelect(state) {
  return state.usersPage.users;
};

var getUsersSelect = (0, _reselect.createSelector)(usersSelect, function (users) {
  return users.filter(function (u) {
    return true;
  });
});
exports.getUsersSelect = getUsersSelect;

var getPageSize = function getPageSize(state) {
  return state.usersPage.pageSize;
};

exports.getPageSize = getPageSize;

var getTotalUsersCount = function getTotalUsersCount(state) {
  return state.usersPage.totalCount;
};

exports.getTotalUsersCount = getTotalUsersCount;

var getCurrentPage = function getCurrentPage(state) {
  return state.usersPage.currentPage;
};

exports.getCurrentPage = getCurrentPage;

var getIsFetching = function getIsFetching(state) {
  return state.usersPage.isFetching;
};

exports.getIsFetching = getIsFetching;

var getFollowingInProgress = function getFollowingInProgress(state) {
  return state.usersPage.followingInProgress;
};

exports.getFollowingInProgress = getFollowingInProgress;

var getPortionSize = function getPortionSize(state) {
  return state.usersPage.portionSize;
};

exports.getPortionSize = getPortionSize;