import React from 'react'
import userPhoto from "../../assets/img/user.png";
import { NavLink } from 'react-router-dom';

import s from "./Users.module.css";
import locationIcon from './../../assets/img/location.png';
import { UsersType } from '../../types/types';
import Button from '../UI/Button/Button';


type PropsType = {
  u: UsersType,
  followingInProgress: Array<number>,
  followUsers1: (userId: number) => void,
  unfollowUsers1: (userId: number) => void
}

const User: React.FC<PropsType> = ({ u, followingInProgress, followUsers1, unfollowUsers1 }) => {

  return (
    <div className={s.user__card}>
      <NavLink to={"/profile/" + u.id}>
        <img className={s.user__img} src={u.photos.small !== null ? u.photos.small : userPhoto} />
      </NavLink>
      <div className={s.user__info}>
        <h2 className={s.user__name} title={u.name}>{u.name}</h2>
        <span className={s.user__id}>User id: {u.id}</span>
        <div className={s.user__location}>
          <img className={s.location__img} src={locationIcon} />
          <span className={s.location__city}>city</span>
        </div>
      </div>
      <div>
        {u.followed ? (
          <Button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
            unfollowUsers1(u.id)
          }}>
            UNFOLLOW </Button>
        ) : (
          <Button disabled={followingInProgress.some(id => id === u.id)}
            onClick={() => {
              followUsers1(u.id)
            }} >FOLLOW </Button>
        )}
      </div>
    </div>
  )
}

export default User