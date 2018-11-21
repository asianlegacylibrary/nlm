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
    REQUEST_MANIFEST,
    RECEIVE_MANIFEST,
    REQUEST_IIIF,
    RECEIVE_IIIF,
    NULLIFY_IIIF,
    DETAIL_MODAL,
    UNIVERSAL_VIEWER
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
                imageAsset: action.imageAsset,
                volume: action.volume,
                lastUpdated: action.receivedAt
            })
        case REQUEST_MANIFEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_MANIFEST:
            return Object.assign({}, state, {
                isFetching: false,
                manifestURL: action.manifestURL,
                lastUpdated: action.receivedAt
            })
        case REQUEST_IIIF:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_IIIF:
            return Object.assign({}, state, {
                isFetching: false,
                firstImage: action.firstImage,
                lastUpdated: action.receivedAt
            })
        case NULLIFY_IIIF:
            return Object.assign({}, state, {
                firstImage: null
            })
        case UNIVERSAL_VIEWER:
            return Object.assign({}, state, {
                viewerID: action.viewerID,
                imageAsset: action.imageAsset
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

function manifestData(state = {}, action) {
    switch(action.type) {
        case RECEIVE_MANIFEST:
        case REQUEST_MANIFEST:
            return Object.assign({}, state, content(state, action))
        default:
            return state;
    }
}

function IIIFData(state = {}, action) {
    switch(action.type) {
        case RECEIVE_IIIF:
        case NULLIFY_IIIF:
        case REQUEST_IIIF:
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

function universalViewer(state = { viewerID: 0 }, action) {
    switch(action.type) {
        case UNIVERSAL_VIEWER:
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
    manifestData,
    IIIFData,
    detailModal,
    universalViewer,
    pagesByLanguage,
    postsByLanguage
});

export default rootReducer;