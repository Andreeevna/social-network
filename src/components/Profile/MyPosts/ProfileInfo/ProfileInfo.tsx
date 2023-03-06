import Preloader from '../../../../common/Preloader/Preloader';
import ProfileStatus from '../../ProfileStatus';
import s from './ProfileInfo.module.css';
import React, { ChangeEvent, useState } from 'react';
import userPhoto from './../../../../assets/img/user.png';
import ProfileDataForm from '../../ProfileDataForm';
import { ContactsType, ProfileType } from '../../../../types/types';

type PropsType = {
  isOwner: boolean;
  profile: ProfileType | null;
  updateStatusProfile: (status: string) => void;
  status: string;
  savePhoto: (file: File) => void;
  saveProfile: (profileData: ProfileType) => Promise<any>;
};

const ProfileInfo: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  if (!props.profile) {
    return <Preloader />;
  }

  const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData: ProfileType) => {
    props.saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      <div className={s.description__block}>
        <div className={s.profile__main}>
          <img className={s.profile__img} src={props.profile.photos.large || userPhoto} />
          <label className={s.profile__label}>
            Изменить фотографию профиля
            {props.isOwner && (
              <input className={s.profile__input} type="file" onChange={mainPhotoSelected} />
            )}
          </label>
          <ProfileStatus status={props.status} updateStatusProfile={props.updateStatusProfile} />
        </div>
        <div className={s.description__info}>
          {editMode ? (
            <ProfileDataForm
              initialValues={props.profile}
              profile={props.profile}
              onSubmit={onSubmit}
            />
          ) : (
            <ProfileData
              goToEditMode={() => {
                setEditMode(true);
              }}
              profile={props.profile}
              isOwner={props.isOwner}
            />
          )}
        </div>
      </div>
    </div>
  );
};

type PropsTypeProfileData = {
  goToEditMode: () => void;
  profile: ProfileType;
  isOwner: boolean;
};

const ProfileData: React.FC<PropsTypeProfileData> = ({ goToEditMode, profile, isOwner }) => {
  return (
    <>
      <div className={s.about}>
        <div className={s.about__title}>Personal information</div>
        <div className={s.about__personal}>
          <div className={s.about__info}>
            <span className={s.info__title}>Full name:</span>
            <span className={s.info__desc}> {profile.fullName}</span>
          </div>
          <div className={s.about__info}>
            <span className={s.info__title}>Looking for a job:</span>
            <span className={s.info__desc}>{profile.lookingForAJob ? 'yes' : 'no'}</span>
          </div>
          <div className={s.about__info}>
            <span className={s.info__title}>My professional skills:</span>
            <span className={s.info__desc}> {profile.lookingForAJobDescription}</span>
          </div>
          <div className={s.about__info}>
            <span className={s.info__title}>About me:</span>
            <span className={s.info__desc}>{profile.aboutMe}</span>
          </div>
        </div>
        <div className={s.about__contact}>
          <div className={s.about__title}>My contacts</div>
        </div>

        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key as keyof ContactsType]}
            />
          );
        })}
      </div>
      <div className={s.button_container}>
        {isOwner && (
          <button className="button_standart" onClick={goToEditMode}>
            edit information
          </button>
        )}
      </div>
    </>
  );
};

type ContactType = {
  contactTitle: string;
  contactValue: string;
};

export const Contact: React.FC<ContactType> = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.about__info}>
      <span className={s.info__title}>
        {contactTitle.charAt(0).toUpperCase() + contactTitle.slice(1)}:
      </span>
      <span className={s.info__desc}>{contactValue}</span>
    </div>
  );
};

export default ProfileInfo;
