import { combineReducers } from 'redux';
import {
    REQUEST_PAGES,
    RECEIVE_PAGES,
    REQUEST_POSTS,
    RECEIVE_POSTS,
    SET_LANG,
    SET_PAGE,
    LanguageArray
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


const language = (state = LanguageArray[0], action) => {
    switch (action.type) {
      case SET_LANG:
        return action.language
      default:
        return state
    }
}

const page = (state = 'home', action) => {
    switch (action.type) {
        case SET_PAGE:
            return action.page
        default:
            return state
    }
}

const rootReducer = combineReducers({
    language,
    page,
    pagesByLanguage,
    postsByLanguage
});

export default rootReducer;