import React from 'react'
import { connect } from 'react-redux'
import Team from '../components/Team.jsx'

const getData = (team_data) => {
  return team_data
}

const mapStateToProps = (state, ownProps) => {
  return {
    team_data: getData(state.team)
  }
}

const ShowTeam = connect(
  mapStateToProps
)(Team)

export default ShowTeam