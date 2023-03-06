import React from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { Input, Textarea } from "../../common/Preloader/FormsControl";
import s from "./../../common/Preloader/FormsControl.module.css";
import style from "./ProfileDataForm.module.css";
import cn from "classnames";
import { ProfileType } from "./../../types/types";

type PropsType = {
  profile: ProfileType;
};

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> &
  PropsType> = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className={s.formSumError}>{error}</div>}
      <div className={style.from__item}>
        <span className={style.from__title}>Full name:</span>
        <Field
          className={cn(style.from__field, style.field_input)}
          placeholder={"Full name"}
          name={"fullName"}
          component={Input}
        />
      </div>
      <div className={style.from__item}>
        <span className={style.from__title}>Looking for a job:</span>
        <Field
          className={style.from__field}
          placeholder={""}
          name={"lookingForAJob"}
          component={Input}
          type={"checkbox"}
        />
      </div>
      <div className={style.from__item}>
        <span className={style.from__title}>My professional skills:</span>
        <Field
          className={cn(style.from__field, style.field_textarea)}
          placeholder={"My professional skills"}
          name={"lookingForAJobDescription"}
          component={Textarea}
        />
      </div>
      <div className={style.from__item}>
        <span className={style.from__title}>About me:</span>
        <Field
          className={cn(style.from__field, style.field_textarea)}
          placeholder={"About me"}
          name={"aboutMe"}
          component={Textarea}
        />
      </div>
      {/* <div> */}
      <div className={style.from__item}>
        <span className={style.from__title}>my contacts:</span>
      </div>
      {Object.keys(profile.contacts).map((key) => {
        return (
          <div className={style.from__item}>
            <span className={style.from__title}>{key}:</span>
            <Field
              className={cn(style.from__field, style.field_input)}
              placeholder={key}
              name={"contacts." + key}
              component={Input}
            />
          </div>
        );
      })}
      {/* </div> */}
      <div className={style.button_container}>
        <button className="button_standart">Save</button>
      </div>
    </form>
  );
};

const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({
  form: "edit-profile",
})(ProfileDataForm);

export default ProfileDataReduxForm;
