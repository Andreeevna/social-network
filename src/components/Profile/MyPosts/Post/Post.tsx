import React from "react";
import s from "./Post.module.css";
import cn from "classnames";


type PropsType = {
  message: string;
  likesCount: number;
};

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <div className={s.item__content}>{props.message}</div>
      <div className={s.item__reaction}>
        <div className={s.reaction__container}>
          <span className={cn(s.reaction__icon, s.icon__like)}></span>
          <span className={s.reaction__count}>{props.likesCount}</span>
        </div>
        <div className={s.reaction__container}>
          <span className={cn(s.reaction__icon, s.icon__massage)}></span>
          <span className={s.reaction__count}>1</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
