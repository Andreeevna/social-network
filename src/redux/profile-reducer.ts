import { ThunkAction } from 'redux-thunk';
import { InferActionsTypes, AppStateType } from './redux-store';
import { profileAPI } from './../api/profile-api';
import { usersAPI } from './../api/users-api';
import { ContactsType, PhotosType, PostType, ProfileType } from './../types/types';
import {stopSubmit} from "redux-form";


const ADD_POST = "profile/ADD-POST";
const SET_PROFILE = "profile/SET-PROFILE";
const SET_STATUS = "profile/SET-STATUS";
const DELETE_POST = "profile/DELETE_POST";
const SAVE_PHOTO_SUCCESS = "profile/SAVE_PHOTO_SUCCESS";


let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It is my first post", likesCount: 11 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
};

export type InitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>;


const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case ADD_POST: 
      let newPost = {
          id: 3,
          message: action.newPostText,
          likesCount: 0
      }

      return {
          ...state,
          posts: [...state.posts, newPost],

      };

  
    case SET_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };

      case DELETE_POST: 
      return {
        ...state,
        posts: state.posts.filter(p => p.id != action.postId)
      }

      case SAVE_PHOTO_SUCCESS:
        return {
          ...state,
          profile: {...state.profile, photos: action.photos} as ProfileType
      }

    
    default:
      return state;
  }
  // делаем ретурн чтобы не использовать брейк и функци не проваливалась дальше
  // дефолтный кейс по умолчанию, если не пришел action который нам нужен
};


export const actions = {
  addPostActionCreator: (newPostText: string)=> {
    return {
      type: ADD_POST,
      newPostText
    } as const
  },
  setProfile: (profile: ProfileType) => {
    return {
      type: SET_PROFILE,
      profile,
    }as const
  },
  setStatus: (status: string)=> {
    return {
      type: SET_STATUS,
      status,
    }as const
  },
  deletePost: (postId: number) => {
    return {
      type: DELETE_POST,
      postId
    }as const
  },
  savePhotoSuccess: (photos: PhotosType) => {
    return {
      type: SAVE_PHOTO_SUCCESS,
      photos
    }as const
  }
}


export const getUserProfile = (userId: number):ThunkAction<void, AppStateType, unknown, ActionType> => {
  return (dispatch) => {
    usersAPI.getProfile(userId)
    .then((resp) => {
      dispatch(actions.setProfile(resp.data));
    });
  };
};

export const getStatusProfile = (userId: number):ThunkAction<void, AppStateType, unknown, ActionType> => {
  return (dispatch) => {
    profileAPI.getStatus(userId).then((resp) => {
      dispatch(actions.setStatus(resp.data));
    });
  };
};

export const updateStatusProfile = (status: string):ThunkAction<void, AppStateType, unknown, ActionType> => {
  return (dispatch) => {
    profileAPI.updateStatus(status)
      .then((resp) => {
      if (resp.data.resultCode === 0) {
        dispatch(actions.setStatus(status));
      }
    });
  };
};

export const savePhoto = (file: File):ThunkAction<void, AppStateType, unknown, ActionType> => {
  return (dispatch) => {
    profileAPI.savePhotoProfile(file)
    .then((resp) => {
    if (resp.data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(resp.data.data.photos));
    }
  });
  }
}


export const saveProfile = (profileData: ProfileType):ThunkAction<void, AppStateType, unknown, ActionType | ReturnType<typeof stopSubmit>> => {
  return (dispatch, getState) => {
   const userId =  getState().auth.id;
   return profileAPI.saveProfiles(profileData)
    .then((resp) => {
      // debugger
      if (resp.data.resultCode === 0) {
        if(userId != null) {
          dispatch(getUserProfile(userId));
        }
      } else { 
        dispatch(stopSubmit('edit-profile', {_error: resp.data.messages[0]}))
        return Promise.reject(resp.data.messages[0])
      }
    })
  }
}
export default profileReducer;
