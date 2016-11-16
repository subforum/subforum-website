import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { CASE_1 } from '../actions/index.jsx'

function subforum_data(state = initialState, action) {
    switch (action.type) {
        case CASE_1:
            return state

        default:
            return state
    }
}

const ReducerApp = combineReducers({
  subforum_data,
  routing: routerReducer
})

export default ReducerApp