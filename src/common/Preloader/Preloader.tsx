import React from 'react'
import s from './Preloader.module.css';
import preloader from "./../../assets/img/preload.gif"




const  Preloader: React.FC = () => {
  return (
    <div><img src={preloader} className={s.preloader}/></div>
  )
}

export default Preloader