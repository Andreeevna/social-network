import { ThunkAction } from 'redux-thunk';
import { InferActionsTypes, AppStateType } from './redux-store';
import { securityAPI } from './../api/security-api';
import { authAPI } from './../api/auth-api';
import { ResultCodeEnum, ResultCodeCaptchaEnum } from '../api/api';
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "auth/GET_CAPTCHA_URL_SUCCESS";

type InitialStateType ={
  id: null | number,
  email: null | string,
  login: null | string,
  isAuth: null | boolean,
  captchaUrl: null | string,
}

let initialState: InitialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null // if null then captcha is not required
};

type ActionType = InferActionsTypes<typeof actions>


const authReducer = (state = initialState, action: ActionType) : InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};


export const actions = {
  setData: (id: number | null, email:string | null, login: string | null, isAuth: boolean)=> {
    return {
      type: SET_USER_DATA,
      data: { id, email, login, isAuth },
    } as const 
  },
  getCuptchaUrlSucces: (captchaUrl: string) =>  {
    return  {
      type: GET_CAPTCHA_URL_SUCCESS,
      data: {captchaUrl}
    } as const 
  }
  
}

export const getAuthUserData = ():ThunkAction<Promise<void>, AppStateType, unknown, ActionType> => {
  return (dispatch) => {
    return authAPI.authorize().then((resp) => {
      if (resp.data.resultCode === ResultCodeEnum.Success) {
        let { id, email, login } = resp.data.data;
        dispatch(actions.setData(id, email, login, true));
      }
    });
  };
};

export const LoginAut = (email:string, password:string, rememberMe:boolean, captcha: null | string = null ):ThunkAction<void, AppStateType, unknown, ActionType | ReturnType<typeof stopSubmit>> => {
  return (dispatch) => {
    authAPI.login(email, password, rememberMe, captcha)
    .then((response: any) => {
      if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
      }  else {
        if (response.data.resultCode === ResultCodeCaptchaEnum.CaptchaIsRequired) {
          dispatch(getCaptchaUrl());
        }
        let messages = response.data.messages.length > 0 ? response.data.messages[0]: "Some error";
          dispatch(stopSubmit('login', { _error: messages}))
      }
    });
  };
};

export const Logout = ():ThunkAction<void, AppStateType, unknown, ActionType> => {
  return (dispatch) => {
    authAPI.logout().then((resp) => {
      if (resp.data.resultCode === 0) {
        dispatch(actions.setData(null, null, null, false));
      }
    });
  };
};


export const getCaptchaUrl = ():ThunkAction<void, AppStateType, unknown, ActionType> => {
  return (dispatch: any) => {
    securityAPI.getCaptchaUrl()
    .then((resp: any) => {
      dispatch(actions.getCuptchaUrlSucces(resp.data.url))
    })
  }
}

export default authReducer;
