import React from 'react'
import { connect } from 'react-redux'
import { case1 } from '../actions/index.jsx'
import Article from '../components/Article.jsx'

const getData = (subforum_data, ownProps) => {
  let topic_id = ownProps.params.id[0] - 1;
  let article_id = ownProps.params.id[2];
  
  let articles = subforum_data[topic_id].articles;
  let article;
  for(var i = 0; i < articles.length; i++) {
    if(articles[i].id === Number(article_id)) {
      article = articles[i];
    }
  }

  return article
}

const mapStateToProps = (state, ownProps) => {
  return {
    subforum_data: getData(state.subforum_data, ownProps)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onFormatDate: (date) => {
    //   dispatch(formatDate(date))
    // }
  }
}

const ShowArticle = connect(
  mapStateToProps,
  mapDispatchToProps
)(Article)

export default ShowArticle