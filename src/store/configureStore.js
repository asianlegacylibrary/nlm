import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'
import { log } from '../tools/utilities'

import { createBrowserHistory } from 'history'

export default function configureStore(preloadedState) {
    const history = createBrowserHistory()

    const middlewares = [thunkMiddleware]

    if (process.env.NODE_ENV === 'development') {
        log('In Dev, will add logger middleware...')
        const loggerMiddleware = createLogger()
        middlewares.push(loggerMiddleware)
    }

    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = compose(...enhancers)

    const store = createStore(
        reducers(history),
        preloadedState,
        composedEnhancers
    )

    return store
}
