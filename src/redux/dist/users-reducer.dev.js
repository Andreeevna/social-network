"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.followUsers = exports.unfollowUsers = exports.getUsersT = exports.toogleFollowingInProgress = exports.toogleIsFetching = exports.setTotalCount = exports.setCurrentPage = exports.setUsers = exports.unfollow = exports.follow = void 0;

var _react = _interopRequireDefault(require("react"));

var _Api = require("../api/Api");

var _objectHelpers = require("./object-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FOLLOW = "FOLLOW";
var UNFOLLOW = "UNFOLLOW";
var SET_USERS = "SET_USERS";
var SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
var SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
var TOOGLE_IS_FETCHING = "TOOGLE_IS_FETCHING";
var TOOGLE_FOLLOWING_IN_PROGRESS = "TOOGLE_FOLLOWING_IN_PROGRESS";
var initialState = {
  users: [],
  pageSize: 5,
  totalCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
  portionSize: 20
};

var usersReducer = function usersReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case FOLLOW:
      return _objectSpread({}, state, {
        users: (0, _objectHelpers.updateObjectInArray)(state.users, action.userId, "id", {
          followed: true
        })
      });

    case UNFOLLOW:
      return _objectSpread({}, state, {
        users: (0, _objectHelpers.updateObjectInArray)(state.users, action.userId, "id", {
          followed: false
        })
      });

    case SET_USERS:
      return _objectSpread({}, state, {
        users: action.users
      });

    case SET_CURRENT_PAGE:
      return _objectSpread({}, state, {
        currentPage: action.currentPage
      });

    case SET_TOTAL_USERS_COUNT:
      return _objectSpread({}, state, {
        totalCount: action.totalCount
      });

    case TOOGLE_IS_FETCHING:
      return _objectSpread({}, state, {
        isFetching: action.isFetching
      });

    case TOOGLE_FOLLOWING_IN_PROGRESS:
      return _objectSpread({}, state, {
        followingInProgress: action.isFetching ? [].concat(_toConsumableArray(state.followingInProgress), [action.userId]) : state.followingInProgress.filter(function (id) {
          return id != action.userId;
        })
      });

    default:
      return state;
  }
};

var follow = function follow(userId) {
  return {
    type: FOLLOW,
    userId: userId
  };
};

exports.follow = follow;

var unfollow = function unfollow(userId) {
  return {
    type: UNFOLLOW,
    userId: userId
  };
};

exports.unfollow = unfollow;

var setUsers = function setUsers(users) {
  return {
    type: SET_USERS,
    users: users
  };
};

exports.setUsers = setUsers;

var setCurrentPage = function setCurrentPage(currentPage) {
  return {
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
  };
};

exports.setCurrentPage = setCurrentPage;

var setTotalCount = function setTotalCount(totalCount) {
  return {
    type: SET_TOTAL_USERS_COUNT,
    totalCount: totalCount
  };
};

exports.setTotalCount = setTotalCount;

var toogleIsFetching = function toogleIsFetching(isftch) {
  return {
    type: TOOGLE_IS_FETCHING,
    isFetching: isftch
  };
};

exports.toogleIsFetching = toogleIsFetching;

var toogleFollowingInProgress = function toogleFollowingInProgress(isFetching, userId) {
  return {
    type: TOOGLE_FOLLOWING_IN_PROGRESS,
    isFetching: isFetching,
    userId: userId
  };
};

exports.toogleFollowingInProgress = toogleFollowingInProgress;

var getUsersT = function getUsersT(pageSize, currentPage) {
  return function (dispatch) {
    dispatch(toogleIsFetching(true));

    _Api.usersAPI.getUsers(pageSize, currentPage).then(function (resp) {
      dispatch(toogleIsFetching(false));
      dispatch(setUsers(resp.items));
      dispatch(setTotalCount(resp.totalCount));
    });
  };
};

exports.getUsersT = getUsersT;

var followUnfollowFlow = function followUnfollowFlow(dispatch, userId, apiMethod, actionCreator) {
  var response;
  return regeneratorRuntime.async(function followUnfollowFlow$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dispatch(toogleFollowingInProgress(true, userId));
          _context.next = 3;
          return regeneratorRuntime.awrap(apiMethod(userId));

        case 3:
          response = _context.sent;

          if (response.data.resultCode == 0) {
            dispatch(actionCreator(userId));
            dispatch(toogleFollowingInProgress(false, userId));
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var unfollowUsers = function unfollowUsers(userId) {
  return function (dispatch) {
    var apiMethod = _Api.usersAPI.unFollowUser.bind(_Api.usersAPI);

    var actionCreator = unfollow;
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
  };
};

exports.unfollowUsers = unfollowUsers;

var followUsers = function followUsers(userId) {
  return function (dispatch) {
    var apiMethod = _Api.usersAPI.followUser.bind(_Api.usersAPI);

    var actionCreator = follow;
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
  };
};

exports.followUsers = followUsers;
var _default = usersReducer;
exports["default"] = _default;