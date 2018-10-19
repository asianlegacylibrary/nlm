import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { fetchPages, fetchPosts } from './actions';
import rootReducer from './reducers';

import Routes from './router';

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer, 
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

store.dispatch(fetchPages('English'))
store.dispatch(fetchPosts('English'))
store.dispatch(fetchPages('Mongolian'))
store.dispatch(fetchPosts('Mongolian'))
    //.then(() => console.log(store.getState()));

const App = () => {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
