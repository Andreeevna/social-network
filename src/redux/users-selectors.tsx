import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

const usersSelect = (state: AppStateType) => {
    return state.usersPage.users;
}

export const getUsersSelect = createSelector(usersSelect,
    (users) => {
  return users.filter((u) =>true)
})

export const getPageSize = (state:AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state:AppStateType) => {
    return state.usersPage.totalCount;
}

export const getCurrentPage = (state:AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state:AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state:AppStateType) => {
    return state.usersPage.followingInProgress
}

export const getPortionSize = (state:AppStateType) => {
    return state.usersPage.portionSize
}

export const getFilter = (state:AppStateType) => {
    return state.usersPage.filter
}