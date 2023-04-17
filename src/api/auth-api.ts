import { ResultCodeCaptchaEnum, instance, ResponseType } from './api';



type MeResponseType = {
      id: number,
      email: string,
      login: string
  }
  
  type LoginResponseType = {
      userId: number
  }
  
  export const authAPI = {
    authorize(){
      return instance.get<ResponseType<MeResponseType>>(
        `auth/me`
      )
    },
    login(email:string,password:string, rememberMe = false, captcha: null | string = null) {
      return instance.post<ResponseType<LoginResponseType,ResultCodeCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout(){
      return instance.delete(`auth/login`)
    }
  
  }