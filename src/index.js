import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'

import { 
    fetchPages, fetchPosts, 
    fetchData, fetchAuthors, fetchTopics,
    getGS } from './store/actions'

import RouteSwitch from './components/router/RouteSwitch'

import configureStore from './store/configureStore'
import { checkConnection } from './store/connection'

import './assets/css/main.css'
import './assets/css/index.css'

// this is what gives the entire app access to t, i18n...
import './store/localization/i18n'

const store = configureStore()

// log('initial state index.js', store.getState()) 
// THIS COULD BE REPLACED WITH ONE 'INITIALIZE APP' type function
// GET PAGES, POSTS, ES DATA

// Wordpress data
store.dispatch(fetchPages())
store.dispatch(fetchPosts())

// Google sheet data from NLM cataloguing
store.dispatch(getGS())

// check connection and get ES data
if(checkConnection()) {
    store.dispatch(fetchData())
    store.dispatch(fetchAuthors())
    store.dispatch(fetchTopics())
} else {
    console.log("Can't make connection to ES...")
}


const App = () => {
    document.body.classList.add('landing')
    return (
        <div className="container">
            <React.StrictMode>
                <Provider store={store}>
                    <Router> {/* history={history}> */}
                        <Route component={RouteSwitch} />
                    </Router>
                </Provider>
            </React.StrictMode>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
