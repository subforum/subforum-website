import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

function subforum_data(state = initialState, action) {
    switch (action.type) {
        default:
            if(state.subforum_data) {
                return Object.assign({}, state.subforum_data);
            } else {
                return state;
            }
    }
}

function team(state = initialState, action) {
    switch (action.type) {
        default:
            if(state.team) {
                return Object.assign({}, state.team);
            } else {
                return state;
            }
    }
}

const ReducerApp = combineReducers({
    subforum_data,
    team,
    routing: routerReducer
})

export default ReducerApp