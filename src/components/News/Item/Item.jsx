import React from 'react';
import s from './Item.module.css';
import cn from "classnames";

const Item = (props) => {
  console.log(props)

  return (
    // <div className={s.item}>
    //     {props.info}
    //     {props.likesCount}
    //     {props.views}
    // </div>
    <div className={s.item}>
      <div className={s.item__content}>{props.info}</div>
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
  )
}

export default Item