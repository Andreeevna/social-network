import React from 'react';
import ProfileInfo from './MyPosts/ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';

type PropsType = {
    isOwner: boolean, 
    profile:  ProfileType | null,
    updateStatusProfile: (status:string) => void,
    status: string,
    savePhoto: (file:File) => void,
    saveProfile: (profileData: ProfileType) => Promise<any>
    getUserProfile: (userId: number | null) => void

}

const Profile: React.FC<PropsType> = (props) => {

    return (
        <div>
            <ProfileInfo 
            isOwner={props.isOwner}
            profile={props.profile}  
            updateStatusProfile={props.updateStatusProfile} 
            status={props.status}
            savePhoto={props.savePhoto}
            saveProfile={props.saveProfile}
            />

            <MyPostsContainer/>
        </div>
    )

}
export default Profile;

