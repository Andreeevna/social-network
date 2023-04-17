import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
import React, { useState } from 'react';
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import cn from "classnames";
import { MapStatePropsType, MapDispatchToPropsType } from '../Header/HeaderContainer';
import { Logout } from '../../redux/auth-reducer';
import { disactiveNav } from '../../redux/nav-reducer';

import profileImg from './../../assets/img/profile.png'
import messagesImg from './../../assets/img/messages.png';
import usersImg from './../../assets/img/users.png';
import newsImg from './../../assets/img/news.png'
import musicImg from './../../assets/img/music.png';
import settingsImg from './../../assets/img/settings.png';
import logo from "./../../assets/img/logo.png";

const Navbar: React.FC<MapStatePropsType & MapDispatchToPropsType> = (props) => {
  console.log(props)

  return (
    <nav className={s.nav + (props.isActive ? ' ' + s.nav_actve : '')}>
      <div
        className={s.nav__close}
        onClick={props.disactiveNav}
      ></div>
      <div className={s.nav__profile}>
        <img className={s.nav__logo} src={logo} alt="Logo" />
        {props.isAuth ? (
          <div className={s.login__container}>
            <span className={s.login__name}>{props.login}</span>  - <button className="button_standart" onClick={props.Logout}>Log Out</button>
          </div>
        ) : (
          <NavLink className={cn("button_standart", "button_standart__link")} to={"/login"}>Login</NavLink>
        )}
      </div>
      <div className={s.item}>
        <img className={s.item__icon} src={profileImg} alt="Profile icon" />
        <NavLink onClick={props.disactiveNav} to="/Profile" className={s.activelink}>Profile</NavLink>
      </div>
      <div className={s.item}>
        <img className={s.item__icon} src={messagesImg} alt="Message icon" />
        <NavLink onClick={props.disactiveNav} to="/Chat" className={s.activelink}>Chat</NavLink>
      </div>
      <div className={s.item}>
        <img className={s.item__icon} src={usersImg} alt="Users icon" />
        <NavLink onClick={props.disactiveNav} to="/Users" className={s.activelink}>Users</NavLink>
      </div>
      <div className={s.item}>
        <img className={s.item__icon} src={newsImg} alt="News icon" />
        <NavLink onClick={props.disactiveNav} to="/News" className={s.activelink}>News</NavLink>
      </div>
      <div className={s.item}>
        <img className={s.item__icon} src={musicImg} alt="Music icon" />
        <a>Music</a>
      </div>
      <div className={s.item}>
        <img className={s.item__icon} src={settingsImg} alt="Settings icon" />
        <a>Settings</a>
      </div>
    </nav>
  )
}

let mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    isActive: state.nav.isActive
  };
};

export default connect<MapStatePropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, { Logout, disactiveNav })(Navbar);