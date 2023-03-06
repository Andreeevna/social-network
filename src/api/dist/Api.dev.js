"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.securityAPI = exports.authAPI = exports.profileAPI = exports.usersAPI = void 0;

var axios = _interopRequireWildcard(require("axios"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "8686a600-1432-4fe7-a787-e5f10049effb"
  }
});
var usersAPI = {
  getUsers: function getUsers(pageSize, currentPage) {
    return instance.get("users?count=".concat(pageSize, "&page=").concat(currentPage)).then(function (response) {
      return response.data;
    });
  },
  unFollowUser: function unFollowUser(userId) {
    return instance["delete"]("follow/".concat(userId));
  },
  followUser: function followUser(userId) {
    return instance.post("follow/".concat(userId));
  },
  getProfile: function getProfile(userId) {
    return profileAPI.getProfile(userId);
  }
};
exports.usersAPI = usersAPI;
var profileAPI = {
  getProfile: function getProfile(userId) {
    return instance.get("profile/" + userId);
  },
  getStatus: function getStatus(userId) {
    return instance.get("profile/status/" + userId);
  },
  updateStatus: function updateStatus(status) {
    return instance.put("profile/status", {
      status: status
    });
  },
  savePhotoProfile: function savePhotoProfile(file) {
    var formData = new FormData();
    formData.append("image", file);
    return instance.put("profile/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  saveProfiles: function saveProfiles(profile) {
    return instance.put("profile", profile);
  }
};
exports.profileAPI = profileAPI;
var authAPI = {
  authorize: function authorize() {
    return instance.get("auth/me");
  },
  login: function login(email, password) {
    var rememberMe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var captcha = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    return instance.post("auth/login", {
      email: email,
      password: password,
      rememberMe: rememberMe,
      captcha: captcha
    });
  },
  logout: function logout() {
    return instance["delete"]("auth/login");
  }
};
exports.authAPI = authAPI;
var securityAPI = {
  getCaptchaUrl: function getCaptchaUrl() {
    return instance.get("security/get-captcha-url");
  }
};
exports.securityAPI = securityAPI;