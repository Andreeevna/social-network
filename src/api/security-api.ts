import { instance } from './api';


type GetCaptchaURL = {
  url: string
}


export const securityAPI = {
    getCaptchaUrl(){
      return instance.get<GetCaptchaURL>(
        `security/get-captcha-url`
      )
    }
  
  }