import React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { Input, Textarea } from '../../common/Preloader/FormsControl';
import s from './../../common/Preloader/FormsControl.module.css';
import style from './ProfileDataForm.module.css';
import cn from 'classnames';
import { ProfileType } from './../../types/types';

type PropsType = {
  profile: ProfileType;
};

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({
  handleSubmit,
  profile,
  error,
}) => {
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      {error && <div className={s.formSumError}>{error}</div>}
      <div className={style.form_person__title}>Personal information</div>
      <div className={style.form_person__info}>
        <div className={style.title_list}>
          <span className={style.title_list__item}>Full name:</span>
          <span className={style.title_list__item}>Looking for a job:</span>
          <span className={style.title_list__item}>My professional skills:</span>
          <span className={style.title_list__item}>About me:</span>
        </div>
        {/* className={style.desc_list} */}
        <div >
          <Field
            className={cn(style.desc_list__field, style.field_input)}
            placeholder={'Full name'}
            name={'fullName'}
            component={Input}
          />
          <Field
              className={style.desc_list__radio}
              placeholder={''}
              name={'lookingForAJob'}
              component={Input}
              type={'checkbox'}
            />
          <Field
            className={cn(style.desc_list__field, style.field_input)}
            placeholder={'My professional skills'}
            name={'lookingForAJobDescription'}
            component={Input}
          />
          <Field
            className={cn(style.desc_list__field, style.field_input)}
            placeholder={'About me'}
            name={'aboutMe'}
            component={Input}
          />
        </div>
      </div>

      {/* <div className={style.from__item}>
        <span className={style.from__title}>Full name:</span>
        <Field
          className={cn(style.from__field, style.field_input)}
          placeholder={'Full name'}
          name={'fullName'}
          component={Input}
        />
      </div>
      <div className={style.from__item}>
        <span className={style.from__title}>Looking for a job:</span>
        <Field
          className={style.from__field}
          placeholder={''}
          name={'lookingForAJob'}
          component={Input}
          type={'checkbox'}
        />
      </div>
      <div className={style.from__item}>
        <span className={style.from__title}>My professional skills:</span>
        <Field
          className={cn(style.from__field, style.field_textarea)}
          placeholder={'My professional skills'}
          name={'lookingForAJobDescription'}
          component={Textarea}
        />
      </div>
      <div className={style.from__item}>
        <span className={style.from__title}>About me:</span>
        <Field
          className={cn(style.from__field, style.field_textarea)}
          placeholder={'About me'}
          name={'aboutMe'}
          component={Textarea}
        />
      </div> */}
      <div className={style.from__item}>
        <span className={style.profile_from__title}>My contacts:</span>
      </div>
      {Object.keys(profile.contacts).map((key) => {
        return (
          <div className={style.from__item}>
            <span className={style.from__title}>{key}:</span>
            <Field
              className={cn(style.from__field, style.field_input)}
              placeholder={key}
              name={'contacts.' + key}
              component={Input}
            />
          </div>
        );
      })}
      <div className={style.button_container}>
        <button className="button_standart">Save</button>
      </div>
    </form>
    // <>
    //   <div className={s.about}>
    //     <div className={s.about__title}>Personal information</div>
    //     <div className={s.about__personal}>
    //       <div className={s.about__info}>
    //         <span className={s.info__title}>Full name:</span>
    //         <span className={s.info__desc}> {profile.fullName}</span>
    //       </div>
    //       <div className={s.about__info}>
    //         <span className={s.info__title}>Looking for a job:</span>
    //         <span className={s.info__desc}>{profile.lookingForAJob ? 'yes' : 'no'}</span>
    //       </div>
    //       <div className={s.about__info}>
    //         <span className={s.info__title}>My professional skills:</span>
    //         <span className={s.info__desc}> {profile.lookingForAJobDescription}</span>
    //       </div>
    //       <div className={s.about__info}>
    //         <span className={s.info__title}>About me:</span>
    //         <span className={s.info__desc}>{profile.aboutMe}</span>
    //       </div>
    //     </div>
    //     <div className={s.about__contact}>
    //       <div className={s.about__title}>My contacts</div>
    //     </div>

    //     {Object.keys(profile.contacts).map((key) => {
    //       return (
    //         <div className={style.from__item}>
    //           <span className={style.from__title}>{key}:</span>
    //           <Field
    //             className={cn(style.from__field, style.field_input)}
    //             placeholder={key}
    //             name={'contacts.' + key}
    //             component={Input}
    //           />
    //         </div>
    //       );
    //     })}
    //   </div>
    //   <div className={s.button_container}>
    //     <button className="button_standart">Save</button>
    //   </div>
    // </>
  );
};

const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({
  form: 'edit-profile',
})(ProfileDataForm);

export default ProfileDataReduxForm;
