import React, { useState } from 'react'
import s from './../../components/Users/Users.module.css';
import Button from '../../components/UI/Button/Button';



type PropsType = {
  totalCount: number,
  pageSize: number,
  currentPage: number,
  onChanged: (number: number) => void,
  portionSize?: number
}


const Paginator: React.FC<PropsType> = ({ totalCount, pageSize, currentPage, onChanged, portionSize = 10 }) => {

  let pageCount = Math.ceil(totalCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }


  let portionCount = Math.ceil(pageCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPagesNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPagesNumber = portionNumber * portionSize;

  return (
    <div className={s.paginator}>
      <div className={s.paginator__inner}>
        {portionNumber > 1 &&
          <Button
            onClick={() => setPortionNumber(portionNumber - 1)}
          >PREV</Button>
        }
        <div className={s.paginator__list}>
          {
            pages
              .filter((p) => { return p >= leftPortionPagesNumber && p <= rightPortionPagesNumber })
              .map((number) => {
                return <span
                  key={number}
                  className={currentPage === number ? s.selected : s.pag}
                  onClick={() => { onChanged(number) }}
                >{number}</span>
              })
          }
        </div>
        {portionCount > portionNumber &&
          <Button
            onClick={() => setPortionNumber(portionNumber + 1)}
          >NEXT</Button>
        }
      </div>
    </div>
  )
}

export default Paginator;