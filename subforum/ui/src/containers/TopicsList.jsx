import React from 'react'
import { connect } from 'react-redux'
import { case1 } from '../actions/index.jsx'
import TopicsList from '../components/TopicsList.jsx'

const getData = (subforum_data) => {
  return subforum_data
}

const mapStateToProps = (state) => {
  return {
    subforum_data: getData(state.subforum_data)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onFormatDate: (date) => {
    //   dispatch(formatDate(date))
    // }
  }
}

const ShowTopicsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicsList)

export default ShowTopicsList