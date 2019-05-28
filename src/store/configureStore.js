import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';
import rootReducer from './reducers'

import { createBrowserHistory } from 'history'

export default function configureStore(preloadedState) {

    const loggerMiddleware = createLogger()
    const history = createBrowserHistory()
  
    const middlewares = [loggerMiddleware, thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = compose(...enhancers)

  const store = createStore(rootReducer(history), preloadedState, composedEnhancers)

  return store
}