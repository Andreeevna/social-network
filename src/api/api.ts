import { UsersType } from './../types/types';
import { ProfileType } from '../types/types';
import  axios from "axios";


export const instance = axios.create({
    withCredentials: true,
    baseURL:"https://social-network.samuraijs.com/api/1.0/",
    headers:{
        "API-KEY": "8686a600-1432-4fe7-a787-e5f10049effb"
      }
})
 
export enum ResultCodeEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeCaptchaEnum {
  CaptchaIsRequired = 10
}


export type GetUsersType = {
  items: Array<UsersType>,
  totalCount: number,
  error: string
}

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D,
  resultCode: RC,
  messages:Array<string>
}
