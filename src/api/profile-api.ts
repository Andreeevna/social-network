import { instance, ResponseType } from './api';
import { PhotosType, ProfileType } from './../types/types';


type SvaePhotoType = {
  photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
      return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId: number) {
      return instance.get<string>(`profile/status/` + userId)
    },
    updateStatus(status: string) {
      return instance.put<ResponseType>(`profile/status`, { status: status})
    },
    savePhotoProfile(file: File) {
      const formData = new FormData();
      formData.append("image", file)
      return instance.put<ResponseType<SvaePhotoType>>(`profile/photo`,formData,  { 
        headers: {
        "Content-Type": "multipart/form-data"
      }})
    },
    saveProfiles(profile: ProfileType) {
      return instance.put<ResponseType>(`profile`, profile)
    }
  
  };
  