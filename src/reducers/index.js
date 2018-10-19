import { combineReducers } from 'redux';
import {
    REQUEST_PAGES,
    RECEIVE_PAGES,
    REQUEST_POSTS,
    RECEIVE_POSTS
} from '../actions';

function content(
    state = {
        isFetching: false,
        items: []
    },
    action
) {
    switch(action.type) {
        case REQUEST_PAGES:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_PAGES:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.pages,
                lastUpdated: action.receivedAt
            })
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
            return state;
    }
}

function pagesByLanguage(state = {}, action) {
    switch(action.type) {
        case RECEIVE_PAGES:
        case REQUEST_PAGES:
            return Object.assign({}, state, {
                    [action.lang]: content(state[action.lang], action)
            })
        default:
            return state;
    }
}
function postsByLanguage(state = {}, action) {
    switch(action.type) {
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.lang]: content(state[action.lang], action)
            })
        default:
            return state;
    }
}

// function contentByType(state = {}, action) {
//     switch(action.type) {
//         case RECEIVE_CONTENT:
//         case REQUEST_CONTENT:
//             return Object.assign({}, state, {
//                 [action.lang]: {
//                     [action.contentType]: content(state[action.lang], action)
//                 }    
//             });
//         default:
//             return state;
//     }
// }

const rootReducer = combineReducers({
    pagesByLanguage,
    postsByLanguage
});

export default rootReducer;