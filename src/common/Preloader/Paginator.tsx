import React, { useState } from 'react'
import s from './../../components/Users/Users.module.css';



type PropsType = {
  totalCount: number,
  pageSize: number, 
  currentPage: number, 
  onChanged: (number:number) => void,
  portionSize?: number
}


const  Paginator: React.FC<PropsType> = ({totalCount, pageSize, currentPage, onChanged, portionSize = 10}) => {
    
    let pageCount = Math.ceil(totalCount / pageSize);

    let pages = [];
    for(let i=1; i <= pageCount; i++) {
      pages.push(i);
    }


    let portionCount = Math.ceil(pageCount / portionSize );
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPagesNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPagesNumber = portionNumber*portionSize;

  return (
      <div>

        {portionNumber > 1 && 
          <button onClick={()=> {setPortionNumber(portionNumber - 1)}}>PREV</button>
        }
        {
          pages
          .filter((p)=> {return p >= leftPortionPagesNumber && p <=rightPortionPagesNumber})
          .map((number) => {
            return <span key={number} className={currentPage === number ? s.selected : s.pag} onClick={() => {onChanged(number)}}>{number}</span>
          })
        }

        {portionCount > portionNumber &&
          <button onClick={()=> {setPortionNumber(portionNumber + 1)}}>NEXT</button>
        }
      </div>
    )
}

export default Paginator;