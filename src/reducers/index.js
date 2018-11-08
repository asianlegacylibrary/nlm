import { combineReducers } from 'redux';
import {
    REQUEST_PAGES,
    RECEIVE_PAGES,
    REQUEST_POSTS,
    RECEIVE_POSTS,
    SET_LANG,
    SET_PAGE,
    LanguageArray,
    RECEIVE_DATA,
    REQUEST_DATA,
    RECEIVE_ID,
    REQUEST_ID,
    DETAIL_MODAL
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
        case REQUEST_DATA:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.data,
                lastUpdated: action.receivedAt
            })
        case REQUEST_ID:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_ID:
            return Object.assign({}, state, {
                isFetching: false,
                item: action.data,
                lastUpdated: action.receivedAt
            })
        case DETAIL_MODAL:
            return Object.assign({}, state, {
                modalID: action.modalID,
                show: action.show
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

function pages(state = {}, action) {
    switch(action.type) {
        case RECEIVE_PAGES:
        case REQUEST_PAGES:
            return Object.assign({}, state, content(state, action))
        default:
            return state;
    }
}

function data(state = {}, action) {
    switch(action.type) {
        case RECEIVE_DATA:
        case REQUEST_DATA:
            return Object.assign({}, state, content(state, action))
        default:
            return state;
    }
}

function detailData(state = {}, action) {
    switch(action.type) {
        case RECEIVE_ID:
        case REQUEST_ID:
            return Object.assign({}, state, content(state, action))
        default:
            return state;
    }
}

function posts(state = {}, action) {
    switch(action.type) {
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, content(state, action))
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


const selectedLanguage = (state = LanguageArray[0], action) => {
    switch (action.type) {
      case SET_LANG:
        return action.language
      default:
        return state
    }
}

function detailModal(state = { modalID: 0 }, action) {
    switch(action.type) {
        case DETAIL_MODAL:
            return Object.assign({}, state, content(state, action))
        default:
            return state;
    }
}

const selectedPage = (state = 'home', action) => {
    switch (action.type) {
        case SET_PAGE:
            return action.page
        default:
            return state
    }
}

const rootReducer = combineReducers({
    selectedLanguage,
    selectedPage,
    pages,
    posts,
    data,
    detailData,
    detailModal,
    pagesByLanguage,
    postsByLanguage
});

export default rootReducer;