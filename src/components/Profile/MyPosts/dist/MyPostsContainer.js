"use strict";
exports.__esModule = true;
var react_redux_1 = require("react-redux");
var profile_reducer_1 = require("../../../redux/profile-reducer");
var MyPosts_1 = require("./MyPosts");
var mapStateToProps = function (state) {
    return {
        posts: state.profilePage.posts
    };
};
// let mapDispatchToProps = (dispatch) => {
//     return {
//         addPost: (newPost) => {
//             dispatch(addPostActionCreator(newPost))
//         }
//     }
// }
var MyPostsContainer = react_redux_1.connect(mapStateToProps, {
    addPost: profile_reducer_1.actions.addPostActionCreator
})(MyPosts_1["default"]);
exports["default"] = MyPostsContainer;
