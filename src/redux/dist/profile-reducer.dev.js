"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.saveProfile = exports.savePhoto = exports.updateStatusProfile = exports.getStatusProfile = exports.getUserProfile = exports.savePhotoSuccess = exports.deletePost = exports.setStatus = exports.setProfile = exports.addPostActionCreator = void 0;

var _Api = require("../api/Api");

var _reduxForm = require("redux-form");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ADD_POST = "ADD-POST";
var SET_PROFILE = "SET-PROFILE";
var SET_STATUS = "SET-STATUS";
var DELETE_POST = "DELETE_POST";
var SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
var initialState = {
  posts: [{
    id: 1,
    message: "Hi, how are you?",
    likesCount: 12
  }, {
    id: 2,
    message: "It is my first post",
    likesCount: 11
  }],
  profile: null,
  status: ""
};

var profileReducer = function profileReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ADD_POST:
      {
        var newPost = {
          id: 3,
          message: action.newPost,
          likesCount: 0
        };
        return _objectSpread({}, state, {
          posts: [].concat(_toConsumableArray(state.posts), [newPost])
        });
      }

    case SET_PROFILE:
      return _objectSpread({}, state, {
        profile: action.profile
      });

    case SET_STATUS:
      return _objectSpread({}, state, {
        status: action.status
      });

    case DELETE_POST:
      return _objectSpread({}, state, {
        posts: state.posts.filter(function (p) {
          return p.id != action.userId;
        })
      });

    case SAVE_PHOTO_SUCCESS:
      return _objectSpread({}, state, {
        profile: _objectSpread({}, state.profile, {
          photos: action.photos
        })
      });

    default:
      return state;
  } // делаем ретурн чтобы не использовать брейк и функци не проваливалась дальше
  // дефолтный кейс по умолчанию, если не пришел action который нам нужен

};

var addPostActionCreator = function addPostActionCreator(newPost) {
  return {
    type: ADD_POST,
    newPost: newPost
  };
};

exports.addPostActionCreator = addPostActionCreator;

var setProfile = function setProfile(profile) {
  return {
    type: SET_PROFILE,
    profile: profile
  };
};

exports.setProfile = setProfile;

var setStatus = function setStatus(status) {
  return {
    type: SET_STATUS,
    status: status
  };
};

exports.setStatus = setStatus;

var deletePost = function deletePost(postId) {
  return {
    type: DELETE_POST,
    postId: postId
  };
};

exports.deletePost = deletePost;

var savePhotoSuccess = function savePhotoSuccess(photos) {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos: photos
  };
};

exports.savePhotoSuccess = savePhotoSuccess;

var getUserProfile = function getUserProfile(userId) {
  return function (dispatch) {
    _Api.usersAPI.getProfile(userId).then(function (resp) {
      dispatch(setProfile(resp.data));
    });
  };
};

exports.getUserProfile = getUserProfile;

var getStatusProfile = function getStatusProfile(userId) {
  return function (dispatch) {
    _Api.profileAPI.getStatus(userId).then(function (resp) {
      dispatch(setStatus(resp.data));
    });
  };
};

exports.getStatusProfile = getStatusProfile;

var updateStatusProfile = function updateStatusProfile(status) {
  return function (dispatch) {
    _Api.profileAPI.updateStatus(status).then(function (resp) {
      if (resp.data.resultCode === 0) {
        dispatch(setStatus(status));
      }
    });
  };
};

exports.updateStatusProfile = updateStatusProfile;

var savePhoto = function savePhoto(file) {
  return function (dispatch) {
    _Api.profileAPI.savePhotoProfile(file).then(function (resp) {
      if (resp.data.resultCode === 0) {
        dispatch(savePhotoSuccess(resp.data.data.photos));
      }
    });
  };
};

exports.savePhoto = savePhoto;

var saveProfile = function saveProfile(profileData) {
  return function (dispatch, getState) {
    var userId = getState().auth.id;
    return _Api.profileAPI.saveProfiles(profileData).then(function (resp) {
      // debugger
      if (resp.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
      } else {
        dispatch((0, _reduxForm.stopSubmit)('edit-profile', {
          _error: resp.data.messages[0]
        }));
        return Promise.reject(resp.data.messages[0]);
      }
    });
  };
};

exports.saveProfile = saveProfile;
var _default = profileReducer;
exports["default"] = _default;