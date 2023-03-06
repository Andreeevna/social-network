"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireDefault(require("react"));

var _profileReducer = _interopRequireWildcard(require("./profile-reducer"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe("test for reducer", function () {
  var state = {
    posts: [{
      id: 1,
      message: "Hi, how are you?",
      likesCount: 12
    }, {
      id: 2,
      message: "It is my first post",
      likesCount: 11
    }, {
      id: 3,
      message: "It is my first post",
      likesCount: 11
    }, {
      id: 4,
      message: "It is my first post",
      likesCount: 11
    }]
  };
  it("message of new post should be 'newnew' ", function () {
    var action = (0, _profileReducer.addPostActionCreator)("newnew");
    var newState = (0, _profileReducer["default"])(state, action);
    expect(newState.posts.length).toBe(5);
  });
  it("new posts should be incremented", function () {
    var action = (0, _profileReducer.addPostActionCreator)("newnew");
    var newState = (0, _profileReducer["default"])(state, action);
    expect(newState.posts[4].message).toBe("newnew");
  });
  it("after deleting, the length of the array should decrease", function () {
    var action = (0, _profileReducer.deletePost)(1);
    var newState = (0, _profileReducer["default"])(state, action);
    expect(newState.posts.length).toBe(4);
  });
});