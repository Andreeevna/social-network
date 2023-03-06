import {actions, followUsers, unfollowUsers} from './users-reducer'
import {usersAPI} from '../api/users-api'
import {ResponseType, ResultCodeEnum} from '../api/api'

jest.mock('../api/users-api')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.followUser.mockClear();
    userAPIMock.unFollowUser.mockClear();
})


const result: ResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

userAPIMock.followUser.mockReturnValue(Promise.resolve(result));
userAPIMock.unFollowUser.mockReturnValue(Promise.resolve(result));



test('success follow thunk', async () => {
    const thunk = followUsers(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toogleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toogleFollowingInProgress(false, 1))
})