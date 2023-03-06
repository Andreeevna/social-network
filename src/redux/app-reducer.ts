import { InferActionsTypes } from './redux-store';
import { getAuthUserData } from "./auth-reducer";
// import { initializedSucces } from './dist/app-reducer';

const INITIALIZED_SUCCES = 'APP/INITIALIZED_SUCCES';


let initialState = {
    initialized: false,
}

type InitialStateType =  typeof  initialState;

type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action:ActionsType): InitialStateType  => {
    switch (action.type) {


    case INITIALIZED_SUCCES:
        return {
            ...state,
            initialized: true
        }

    default:
    return state;
    }
}



const actions = {
    initializedSucces: ()  => {
        return {
            type: INITIALIZED_SUCCES,
        } as const
    }
}



export const initializeApp = () => {
    return (dispatch: any) => {
      let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(()=> {
            dispatch(actions.initializedSucces())
        })
    }
}

export default appReducer;