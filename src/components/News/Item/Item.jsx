import React from 'react';
import s from './Item.module.css';

const Item = (props) => {
  return (
    <div className={s.item}>
        {props.info}
        {props.likesCount}
        {props.views}
    </div>
  )
}

export default Item