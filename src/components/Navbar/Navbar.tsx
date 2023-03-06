import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
import React from 'react';

import profileImg from './../../assets/img/profile.png'
import messagesImg from './../../assets/img/messages.png';
import usersImg from './../../assets/img/users.png';
import newsImg from './../../assets/img/news.png'
import musicImg from './../../assets/img/music.png';
import settingsImg from './../../assets/img/settings.png';

const Navbar: React.FC = () => {
    return (
        <nav className={s.nav}>
        <div className={s.item}>
          <img className={s.item__icon} src={profileImg} alt="Profile icon"/>
          <NavLink to="/Profile" className={s.activelink}>Profile</NavLink>
        </div>
        <div className={s.item}>
        <img className={s.item__icon} src={messagesImg} alt="Message icon"/>
          <NavLink to="/Chat" className={s.activelink}>Chat</NavLink>
        </div>
        <div className={s.item}>
        <img className={s.item__icon} src={usersImg} alt="Users icon"/>
          <NavLink to="/Users" className={s.activelink}>Users</NavLink>
        </div>
        <div className={s.item}>
        <img className={s.item__icon} src={newsImg} alt="News icon"/>
          <NavLink to="/News"  className={s.activelink}>News</NavLink>
        </div>
        <div className={s.item}>
        <img className={s.item__icon} src={musicImg} alt="Music icon"/>
          <a>Music</a>
        </div>
        <div className={s.item}>
        <img className={s.item__icon} src={settingsImg} alt="Settings icon"/>
          <a>Settings</a>
        </div>
      </nav>
    )
}

export default Navbar;