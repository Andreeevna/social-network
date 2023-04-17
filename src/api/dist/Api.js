"use strict";
exports.__esModule = true;
exports.securityAPI = exports.authAPI = exports.ResultCodeCaptchaEnum = exports.ResultCodeEnum = exports.profileAPI = exports.usersAPI = void 0;
var axios_1 = require("axios");
var instance = axios_1["default"].create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "8686a600-1432-4fe7-a787-e5f10049effb"
    }
});
exports.usersAPI = {
    getUsers: function (pageSize, currentPage) {
        return instance.get("users?count=" + pageSize + "&page=" + currentPage).then(function (response) { return response.data; });
    },
    unFollowUser: function (userId) {
        return instance["delete"]("follow/" + userId);
    },
    followUser: function (userId) {
        return instance.post("follow/" + userId);
    },
    getProfile: function (userId) {
        return exports.profileAPI.getProfile(userId);
    }
};
exports.profileAPI = {
    getProfile: function (userId) {
        return instance.get("profile/" + userId);
    },
    getStatus: function (userId) {
        return instance.get("profile/status/" + userId);
    },
    updateStatus: function (status) {
        return instance.put("profile/status", { status: status });
    },
    savePhotoProfile: function (file) {
        var formData = new FormData();
        formData.append("image", file);
        return instance.put("profile/photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    saveProfiles: function (profile) {
        return instance.put("profile", profile);
    }
};
var ResultCodeEnum;
(function (ResultCodeEnum) {
    ResultCodeEnum[ResultCodeEnum["Success"] = 0] = "Success";
    ResultCodeEnum[ResultCodeEnum["Error"] = 1] = "Error";
})(ResultCodeEnum = exports.ResultCodeEnum || (exports.ResultCodeEnum = {}));
var ResultCodeCaptchaEnum;
(function (ResultCodeCaptchaEnum) {
    ResultCodeCaptchaEnum[ResultCodeCaptchaEnum["CaptchaIsRequired"] = 10] = "CaptchaIsRequired";
})(ResultCodeCaptchaEnum = exports.ResultCodeCaptchaEnum || (exports.ResultCodeCaptchaEnum = {}));
exports.authAPI = {
    authorize: function () {
        return instance.get("auth/me");
    },
    login: function (email, password, rememberMe, captcha) {
        if (rememberMe === void 0) { rememberMe = false; }
        if (captcha === void 0) { captcha = null; }
        return instance.post("auth/login", { email: email, password: password, rememberMe: rememberMe, captcha: captcha });
    },
    logout: function () {
        return instance["delete"]("auth/login");
    }
};
exports.securityAPI = {
    getCaptchaUrl: function () {
        return instance.get("security/get-captcha-url");
    }
};
