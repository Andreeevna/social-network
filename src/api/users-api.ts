import { profileAPI } from './profile-api';
import { instance, GetUsersType, ResponseType } from './api';


export const usersAPI = {
    getUsers(pageSize: number,currentPage: number, term:string = "", friend: null | boolean = null) {
          return instance.get<GetUsersType>(
            `users?count=${pageSize}&page=${currentPage}&term=${term}` + (friend === null ? "" : `&friend=${friend}`)
          ).then(response => response.data);
  },
  
    unFollowUser(userId:number) {
      return  instance.delete(
        `follow/${userId}`
      ).then(res => res.data)
    },
    followUser(userId: number) {
      return  instance.post<ResponseType>(
        `follow/${userId}`
      ).then(res => res.data) as Promise<ResponseType>
    },
   
    getProfile(userId: number) {
      return profileAPI.getProfile(userId) 
    }
  
  };