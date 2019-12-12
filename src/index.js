import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import InitializeStore from './store/initialize'
import * as serviceWorker from './serviceWorker'

import RouteSwitch from './components/router/RouteSwitch'
import configureStore from './store/configureStore'

import './assets/css/main.css'
import './assets/css/index.css'

// this is what gives the entire app access to t, i18n...
import './store/localization/i18n'

const store = configureStore()

InitializeStore(store)

// log('initial state index.js', store.getState())
// THIS COULD BE REPLACED WITH ONE 'INITIALIZE APP' type function
// GET PAGES, POSTS, ES DATA

const App = () => {
    document.body.classList.add('landing')
    return (
        <div className="container">
            <React.StrictMode>
                <Provider store={store}>
                    <Router>
                        {' '}
                        {/* history={history}> */}
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
