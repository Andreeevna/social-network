 import { ResponseType } from './../api/api';
import { usersAPI } from './../api/users-api';
import { AppStateType,InferActionsTypes } from './redux-store';
import { UsersType } from './../types/types';
import React from 'react'
import { updateObjectInArray } from './object-helpers';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET_USERS";
const SET_CURRENT_PAGE = "users/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "users/SET_TOTAL_USERS_COUNT";
const TOOGLE_IS_FETCHING = "users/TOOGLE_IS_FETCHING";
const TOOGLE_FOLLOWING_IN_PROGRESS = "users/TOOGLE_FOLLOWING_IN_PROGRESS";
const SET_FILTER = "users/SET_FILTER";



 let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalCount: 0,
    currentPage:1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of number id
    portionSize: 20,
    filter: {
        term: "",
        friend: null as null | boolean
    } 
}

export type InitialStateType = typeof initialState;

export type FilterType = typeof initialState.filter;

export const usersReducer = (state = initialState, action: ActionType):InitialStateType => {
    switch (action.type) { 

        case FOLLOW: 
        return {
            ...state,
           
            users: updateObjectInArray(state.users, action.userId, "id" , { followed: true})

        }

        case UNFOLLOW: 
        return {
            ...state,
            users: updateObjectInArray(state.users,action.userId, "id" , { followed: false})

        }

        case SET_USERS:
            return {
                ...state,
                users: action.users
            }

        case SET_CURRENT_PAGE: 
        return {
            ...state,
            currentPage: action.currentPage
        }

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalCount: action.totalCount
            }

        case TOOGLE_IS_FETCHING: 
            return {
                ...state,
                isFetching: action.isFetching
            }
        
        case TOOGLE_FOLLOWING_IN_PROGRESS: 
            return {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id != action.userId)
            }

        case SET_FILTER:
            return {
                ...state,
                 filter: action.payload
                }
        default: 
        return state
    }
}

type ActionType = InferActionsTypes<typeof actions>

export const actions = {
    follow: (userId: number) => {
        return {
            type: FOLLOW,
            userId
        }  as const
    },
    unfollow: (userId: number) => {
        return {
            type: UNFOLLOW,
            userId
        } as const
    },
    setUsers: (users: Array<UsersType>) => {
        return {
            type: SET_USERS,
            users
        }  as const
    },
    setCurrentPage: (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
     }  as const
    },
    setTotalCount: (totalCount:number)=> {
        return {
            type: SET_TOTAL_USERS_COUNT,
            totalCount
        }  as const
    },
    toogleIsFetching: (isftch: boolean) => {
        return {
            type: TOOGLE_IS_FETCHING,
            isFetching: isftch
       }  as const
    },
    toogleFollowingInProgress: (isFetching: boolean, userId:number) => {
        return {
            type: TOOGLE_FOLLOWING_IN_PROGRESS,
            isFetching,
            userId
        } as const 
    },
    setFilter: (filter: FilterType) => {
        return {
        type:SET_FILTER,
        payload: filter
        } as const 
    }
}


export const getUsersT = (pageSize:number, currentPage: number, filter: FilterType) => {
    // debugger
    return async (dispatch: Dispatch<ActionType>) => {
        dispatch(actions.toogleIsFetching(true))
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setFilter(filter))
   
   await usersAPI.getUsers(pageSize,currentPage, filter.term, filter.friend)
      .then((resp: any) => {
        dispatch(actions.toogleIsFetching(false))
        dispatch(actions.setUsers(resp.items));
        dispatch(actions.setTotalCount(resp.totalCount));
      });
    }
}


const followUnfollowFlow = async (dispatch: Dispatch<ActionType>, userId: number, apiMethod:(userId: number)=>  Promise<ResponseType>, actionCreator:(userId:number) => ActionType ) => {
    dispatch(actions.toogleFollowingInProgress(true, userId))
    let response = await apiMethod(userId)
   
     if(response.resultCode === 0) {
        dispatch(actionCreator(userId));      
        dispatch(actions.toogleFollowingInProgress(false,userId))
    }
    

}

export const unfollowUsers = (userId:number):ThunkAction<void, AppStateType, unknown, ActionType> => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unFollowUser.bind(usersAPI)
        // let actionCreator = unfollow;

       await followUnfollowFlow(dispatch,userId, apiMethod, actions.unfollow)
       
    }
}

export const followUsers = (userId: number):ThunkAction<void, AppStateType, unknown, ActionType>  => {
    return async (dispatch) => {
        let apiMethod = usersAPI.followUser.bind(usersAPI)
        // let actionCreator = follow;

        await  followUnfollowFlow(dispatch,userId, apiMethod, actions.follow)

    }
}

export default usersReducer;