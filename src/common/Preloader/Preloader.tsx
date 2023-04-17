import React from 'react'
import s from './Preloader.module.css';
import preloader from "./../../assets/img/preload.gif"




const  Preloader: React.FC = () => {
  return (
    <div className={s.preloader}><img
    src={preloader}
    className={s.preloader__image}
    alt="Загрузка"
    /></div>
  )
}

export default Preloader