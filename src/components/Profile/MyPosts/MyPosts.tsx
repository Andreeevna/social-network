import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import {
  MaxLengthCreator,
  requiredField,
} from "../../../utils/validators/validators";
import { Textarea } from "../../../common/Preloader/FormsControl";
import { PostType } from "../../../types/types";

export type MapStateToPropsType = {
  posts: Array<PostType>;
};

export type MapDispatchToPropsType = {
  addPost: (newPost: string) => void;
};

const MyPosts: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (
  props
) => {
  let postsElements = [...props.posts].reverse().map((el) => (
    <Post key={el.id} message={el.message} likesCount={el.likesCount} />
  ));

  let onAddPost = (value: AddPostFormType) => {
    props.addPost(value.newPost);
  };

  return (
    <div className={s.posts__container}>
      <div className={s.posts__content}>
        <h3 className={s.posts__title}>My posts</h3>
        <AddNewPostReduxForm onSubmit={onAddPost} />
      </div>

      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

let MaxLength100 = MaxLengthCreator(100);

type PropsFromType = {};

type AddPostFormType = {
  newPost: string;
};

// type AddPostFormKeys = Extract<keyof AddPostFormType, string> для функции createField (берем все ключи а потом лишь те которые стринг)

let AddNewPostForm: React.FC<InjectedFormProps<AddPostFormType, PropsFromType> & PropsFromType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.form__post}>
        <Field
          className={s.form__input}
          placeholder="What's new with you?"
          name="newPost"
          component={Textarea}
          validate={[requiredField, MaxLength100]}
        ></Field>
        <button className="button_standart">Add post</button>
    </form>
  );
};

const AddNewPostReduxForm = reduxForm<AddPostFormType, PropsFromType>({
  form: "profileAddPostForm",
})(AddNewPostForm);

const MyPostsMemo = React.memo(MyPosts);
export default MyPostsMemo;

