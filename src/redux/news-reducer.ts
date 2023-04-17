const ADD_NEWS = "ADD_NEWS";
const UPDATE_NEW_NEWS_TEXT = "UPDATE-NEW-NEWS-TEXT";




type PostsInfoType = {
    id: number,
    info: string,
    likesCount: number,
    views: number
}

let initialState = {
    postsInfo: [
        { id: 1, info: 'Hi, how are you?', likesCount: 12 , views: 100 },
        { id: 2, info: 'It is my first post', likesCount: 11, views: 110 }
    ] as Array<PostsInfoType>,
    newInfoText: '' // Мои дела на сегодня
}

type InitialState = typeof initialState;

const newsReducer = (state = initialState, action: any):InitialState => {
    switch (action.type) {

        case ADD_NEWS:
            let newInfoPost = { 
                id: 2, 
                info: state.newInfoText, 
                likesCount: 0, 
                views: 0
            }

            return {
                ...state,
                postsInfo: [...state.postsInfo, newInfoPost],
                newInfoText: ''
            }

        case UPDATE_NEW_NEWS_TEXT:
            return {
                ...state,
                newInfoText:  action.newText
            }
          
        default: 
        return state; 
    }
}

type AddNewsActionCreatorType = {
    type: typeof ADD_NEWS
}


export const addNewsAC = (): AddNewsActionCreatorType => {
    return {
        type: ADD_NEWS
    }
}


type UpdateNewNewsTextActionCreator = {
    type: typeof UPDATE_NEW_NEWS_TEXT,
    newText: string
}

export const updateNewNewsTextAC = (newText: string): UpdateNewNewsTextActionCreator => {
    return {
        type: UPDATE_NEW_NEWS_TEXT,
        newText
    }

}

export default newsReducer;