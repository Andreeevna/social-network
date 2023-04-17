import React from "react";
import News from "./News";
import { addNewsAC } from "./../../redux/news-reducer";
import { updateNewNewsTextAC } from "./../../redux/news-reducer";
import { connect } from "react-redux";


let mapStateToProps = (state) => {
  return {
    postsInfo: state.newsPage.postsInfo,
    newInfoText: state.newsPage.newInfoText,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addNews: () => {
      dispatch(addNewsAC())
    },

    updateNews: (text) => {
      dispatch(updateNewNewsTextAC(text))
    }
  };
};

const NewsContainer = connect(mapStateToProps,mapDispatchToProps)(News);

export default NewsContainer;
