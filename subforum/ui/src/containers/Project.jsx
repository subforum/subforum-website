import React from 'react'
import { connect } from 'react-redux'
import { case1 } from '../actions/index.jsx'
import Project from '../components/Project.jsx'

const getData = (subforum_data, ownProps) => {
  let topic_id = ownProps.params.id[0] - 1;
  let project_id = ownProps.params.id[1];
  let projects = subforum_data[topic_id].projects;
  let project;
  for(var i = 0; i < projects.length; i++) {
    if(projects[i].id === Number(project_id)) {
      project = projects[i];
    }
  }

  return project
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

const ShowProject = connect(
  mapStateToProps,
  mapDispatchToProps
)(Project)

export default ShowProject