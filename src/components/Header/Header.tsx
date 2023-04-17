import React from "react";
import { NavLink } from "react-router-dom";
import "./../../App.css";
import s from "./Header.module.css";
import logo from "./../../assets/img/logo.png";
import cn from "classnames";
import { MapDispatchToPropsType, MapStatePropsType } from "./HeaderContainer";



const Header: React.FC<MapStatePropsType & MapDispatchToPropsType> = (props) => {
  return (
    <header className={s.header}>
      <div className={cn(s.header__container, "wrapper")}>
        <div className={s.logo}>
          <img className={s.logo__img} src={logo} alt="Logo" />
          <p className={s.logo__text}> social network</p>
        </div>

        <div className={s.header__auth}>
          {props.isAuth ? (
            <div className={s.login__container}>
              <span className={s.login__name}>{props.login}</span>  - <button className="button_standart" onClick={props.Logout}>Log Out</button>
            </div>
          ) : (
            <NavLink className={cn("button_standart", "button_standart__link")} to={"/login"}>Login</NavLink>
          )}
        </div>
        <div
          className={s.header__burger}
          onClick={props.activeNav}
        >
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
