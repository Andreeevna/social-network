"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.saveProfile = exports.savePhoto = exports.updateStatusProfile = exports.getStatusProfile = exports.getUserProfile = exports.actions = void 0;
var profile_api_1 = require("./../api/profile-api");
var users_api_1 = require("./../api/users-api");
var redux_form_1 = require("redux-form");
var ADD_POST = "profile/ADD-POST";
var SET_PROFILE = "profile/SET-PROFILE";
var SET_STATUS = "profile/SET-STATUS";
var DELETE_POST = "profile/DELETE_POST";
var SAVE_PHOTO_SUCCESS = "profile/SAVE_PHOTO_SUCCESS";
var initialState = {
    posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 12 },
        { id: 2, message: "It is my first post", likesCount: 11 },
    ],
    profile: null,
    status: ""
};
var profileReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ADD_POST:
            var newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0
            };
            return __assign(__assign({}, state), { posts: __spreadArrays(state.posts, [newPost]) });
        case SET_PROFILE:
            return __assign(__assign({}, state), { profile: action.profile });
        case SET_STATUS:
            return __assign(__assign({}, state), { status: action.status });
        case DELETE_POST:
            return __assign(__assign({}, state), { posts: state.posts.filter(function (p) { return p.id != action.postId; }) });
        case SAVE_PHOTO_SUCCESS:
            return __assign(__assign({}, state), { profile: __assign(__assign({}, state.profile), { photos: action.photos }) });
        default:
            return state;
    }
    // делаем ретурн чтобы не использовать брейк и функци не проваливалась дальше
    // дефолтный кейс по умолчанию, если не пришел action который нам нужен
};
exports.actions = {
    addPostActionCreator: function (newPostText) {
        return {
            type: ADD_POST,
            newPostText: newPostText
        };
    },
    setProfile: function (profile) {
        return {
            type: SET_PROFILE,
            profile: profile
        };
    },
    setStatus: function (status) {
        return {
            type: SET_STATUS,
            status: status
        };
    },
    deletePost: function (postId) {
        return {
            type: DELETE_POST,
            postId: postId
        };
    },
    savePhotoSuccess: function (photos) {
        return {
            type: SAVE_PHOTO_SUCCESS,
            photos: photos
        };
    }
};
exports.getUserProfile = function (userId) {
    return function (dispatch) {
        users_api_1.usersAPI.getProfile(userId)
            .then(function (resp) {
            dispatch(exports.actions.setProfile(resp.data));
        });
    };
};
exports.getStatusProfile = function (userId) {
    return function (dispatch) {
        profile_api_1.profileAPI.getStatus(userId).then(function (resp) {
            dispatch(exports.actions.setStatus(resp.data));
        });
    };
};
exports.updateStatusProfile = function (status) {
    return function (dispatch) {
        profile_api_1.profileAPI.updateStatus(status)
            .then(function (resp) {
            if (resp.data.resultCode === 0) {
                dispatch(exports.actions.setStatus(status));
            }
        });
    };
};
exports.savePhoto = function (file) {
    return function (dispatch) {
        profile_api_1.profileAPI.savePhotoProfile(file)
            .then(function (resp) {
            if (resp.data.resultCode === 0) {
                dispatch(exports.actions.savePhotoSuccess(resp.data.data.photos));
            }
        });
    };
};
exports.saveProfile = function (profileData) {
    return function (dispatch, getState) {
        var userId = getState().auth.id;
        return profile_api_1.profileAPI.saveProfiles(profileData)
            .then(function (resp) {
            // debugger
            if (resp.data.resultCode === 0) {
                if (userId != null) {
                    dispatch(exports.getUserProfile(userId));
                }
            }
            else {
                dispatch(redux_form_1.stopSubmit('edit-profile', { _error: resp.data.messages[0] }));
                return Promise.reject(resp.data.messages[0]);
            }
        });
    };
};
exports["default"] = profileReducer;
