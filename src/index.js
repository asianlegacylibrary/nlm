import 'materialize-css/dist/css/materialize.min.css' // add for full on materialize
//import './assets/sass/main.scss'
import './assets/sass/_entrypoint.scss'
import './assets/sass/nlm/index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import InitializeStore from './store/initialize'
import * as serviceWorker from './serviceWorker'

import RouteSwitch from './components/router/RouteSwitch'
import configureStore from './store/configureStore'

// this is what gives the entire app access to t, i18n...
import './store/localization/i18n'

const store = configureStore()

InitializeStore(store)

const App = () => {
    document.body.classList.add('landing')
    return (
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    <Route component={RouteSwitch} />
                </Router>
            </Provider>
        </React.StrictMode>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
