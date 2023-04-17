import React from "react";
import Item from "./Item/Item";
import s from "./News.module.css";

const News = (props) => {
  // debugger;
  let newElementNews = props.postsInfo.map((el, index) => {
    return (
      <Item
        key={index}
        info={el.info}
        likesCount={el.likesCount}
        views={el.views}
      />
    );
  });

  let newPostEl = React.createRef();

  let onAddNews = () => {
    props.addNews();
  };

  let onNewsChange = () => {
    let text = newPostEl.current.value;
    props.updateNews(text);
  };

  return (
    <div className={s.news__container}>
      <div className={s.news__content}>
        <h2 className={s.news__title}> News</h2>
        <div className={s.news__text}>
          <textarea
            className={s.news__input}
            onChange={onNewsChange}
            value={props.newInfoText}
            ref={newPostEl}
            placeholder='Create a new post'
          ></textarea>
          <div className={s.news__container_button}>
            <button className="button_standart" onClick={onAddNews}>
              ADD NEWS
            </button>
          </div>
        </div>
      </div>
      <div className={s.news__added_container}>{newElementNews}</div>
    </div>
  );
};

export default News;
