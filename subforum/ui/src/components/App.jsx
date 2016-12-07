import "babel-polyfill"
import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import createSagaMiddleware from 'redux-saga'

// Redux
import Redux from 'redux';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import rootSaga from '../sagas/sagas.jsx'

import reducers from '../reducers/index.jsx'

// Containers
import Shell from './Shell.jsx';
import ShowHome from '../containers/Home.jsx'
import Home from './Home.jsx';
import ShowTopicsList from '../containers/TopicsList.jsx'
import ShowTopic from '../containers/Topic.jsx'
import ShowProject from '../containers/Project.jsx'
import ShowArticle from '../containers/Article.jsx'
import ShowTeam from '../containers/Team.jsx'

// Create saga
const sagaMiddleware = createSagaMiddleware()

// initialState 
const store = createStore(reducers, initialState, applyMiddleware(sagaMiddleware))

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

sagaMiddleware.run(rootSaga)

class App extends React.Component {
    render () {
        return (
            <Provider store={store}>
                <Home />
            </Provider>
        );
    }
}

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/">
                <IndexRoute component={ShowHome} />
                <Route path="/home" component={ShowHome} />
                <Route path="/topics/" component={ShowTopicsList} />
                <Route path="/topic/:id" component={ShowTopic} />
                <Route path="/topic/:id/project/:id" component={ShowProject} />
                <Route path="/topic/:id/project/:id/article/:id" component={ShowArticle} />
                <Route path="/team/" component={ShowTeam} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);