import React from 'react'
import usersReducer, {actions, InitialStateType} from './users-reducer'




let state: InitialStateType

beforeEach(() => {
    state = {
    users: [
        {
            id:0,
            name: 'John',
            followed: false,
            photos: {small: null, large: null},
            status: "123"
        },
        {
            id:1,
            name: 'John 1',
            followed: false,
            photos: {small: null, large: null},
            status: "124"
        },
        {
            id:2,
            name: 'John 2',
            followed: true,
            photos: {small: null, large: null},
            status: "125"
        },
        {
            id:3,
            name: 'John 3',
            followed: true,
            photos: {small: null, large: null},
            status: "125"
        }
    ],
    pageSize: 5,
    totalCount: 0,
    currentPage:1,
    isFetching: false,
    followingInProgress: [], // array of number id
    portionSize: 20
    }
})


test('follow success', () => {

    const newState =  usersReducer( state, actions.follow(1) )

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})

test('unfollow success', () => {

    const newState =  usersReducer( state, actions.unfollow(2) )

    expect(newState.users[2].followed).toBeFalsy();
    expect(newState.users[3].followed).toBeTruthy();
})