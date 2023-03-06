import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';
import MyPosts, { MapDispatchToPropsType, MapStateToPropsType } from './MyPosts'



const mapStateToProps = (state:AppStateType) => {
    return {
        posts: state.profilePage.posts,
    } 
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         addPost: (newPost) => {
//             dispatch(addPostActionCreator(newPost))
//         }
//     }
// }

const MyPostsContainer = connect<MapStateToPropsType,MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPosts);

export default MyPostsContainer;