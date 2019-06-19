import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { defaultLanguage } from '../actions/index'
import * as types from '../actions/types'

function content(
    state = {
        isFetching: false,
        items: []
    },
    action
) {
    switch(action.type) {
        case types.REQUEST_PAGES:
            return Object.assign({}, state, {
                isFetching: true
            })
        case types.RECEIVE_PAGES:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.pages,
                lastUpdated: action.receivedAt
            })
        case types.REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case types.RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        case types.REQUEST_DATA:
        case types.REQUEST_WORKS:
        case types.REQUEST_ES_DATA:
        case types.REQUEST_RESOURCES:
        case types.REQUEST_AUTHORS:
        case types.REQUEST_TOPICS:
        case types.REQUEST_SUBJECTS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case types.RECEIVE_DATA:
        case types.RECEIVE_WORKS:
        case types.RECEIVE_RESOURCES:
        case types.RECEIVE_AUTHORS:
        case types.RECEIVE_ES_DATA:
        case types.RECEIVE_TOPICS:
        case types.RECEIVE_SUBJECTS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.data,
                lastUpdated: action.receivedAt
            })
        case types.REQUEST_GS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case types.RECEIVE_GS:
            return Object.assign({}, state, {
                isFetching: false,
                gs: action.gs,
                lastUpdated: action.receivedAt
            })
        case types.REQUEST_ID:
            return Object.assign({}, state, {
                isFetching: true
            })
        case types.RECEIVE_ID:
            return Object.assign({}, state, {
                isFetching: false,
                item: action.data,
                imageAsset: action.imageAsset,
                volume: action.volume,
                lastUpdated: action.receivedAt
            })
        case types.REQUEST_MANIFEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case types.RECEIVE_MANIFEST:
            return Object.assign({}, state, {
                isFetching: false,
                manifestURL: action.manifestURL,
                lastUpdated: action.receivedAt
            })
        case types.REQUEST_IIIF:
            return Object.assign({}, state, {
                isFetching: true
            })
        case types.RECEIVE_IIIF:
            return Object.assign({}, state, {
                isFetching: false,
                firstImage: action.firstImage,
                lastUpdated: action.receivedAt
            })
        case types.NULLIFY_IIIF:
            return Object.assign({}, state, {
                firstImage: null
            })
        case types.DETAIL_MODAL:
            return Object.assign({}, state, {
                modalID: action.modalID,
                show: action.show
            })
        default:
            return state;
    }
}

function pages(state = {}, action) {
    switch(action.type) {
        case types.RECEIVE_PAGES:
        case types.REQUEST_PAGES:
            return Object.assign({}, state, content(state, action))
        default:
            return state;
    }
}

function esWorks(state = {}, action) {
    switch(action.type) {
        case types.RECEIVE_DATA:
        case types.RECEIVE_WORKS:
        case types.RECEIVE_ES_DATA:
        case types.REQUEST_ES_DATA:
        case types.REQUEST_DATA:
        case types.REQUEST_WORKS:
            return Object.assign({}, state, content(state, action))
        default:
            return state
    }
}

function esResources(state = {}, action) {
    switch(action.type) {
        case types.RECEIVE_RESOURCES:
        case types.REQUEST_RESOURCES:
            return Object.assign({}, state, content(state, action))
        default:
            return state
    }
}

function esAuthors(state = {}, action) {
    switch(action.type) {
        case types.RECEIVE_AUTHORS:
        case types.REQUEST_AUTHORS:
            return Object.assign({}, state, content(state, action))
        default:
            return state
    }
}

function esSubjects(state = {}, action) {
    switch(action.type) {
        case types.RECEIVE_TOPICS:
        case types.RECEIVE_SUBJECTS:
        case types.REQUEST_TOPICS:
        case types.REQUEST_SUBJECTS:
            return Object.assign({}, state, content(state, action))
        default:
            return state
    }
}

function detailData(state = {}, action) {
    switch(action.type) {
        case types.RECEIVE_ID:
        case types.REQUEST_ID:
            return Object.assign({}, state, content(state, action))
        default:
            return state;
    }
}

function gsData(state = {}, action) {
    switch(action.type) {
        case types.RECEIVE_GS:
        case types.REQUEST_GS:
            return Object.assign({}, state, content(state, action))
        default:
            return state
    }
}

function manifestData(state = {}, action) {
    switch(action.type) {
        case types.RECEIVE_MANIFEST:
        case types.REQUEST_MANIFEST:
            return Object.assign({}, state, content(state, action))
        default:
            return state;
    }
}

function IIIFData(state = {}, action) {
    switch(action.type) {
        case types.RECEIVE_IIIF:
        case types.NULLIFY_IIIF:
        case types.REQUEST_IIIF:
            return Object.assign({}, state, content(state, action))
        default:
            return state;
    }
}

function posts(state = {}, action) {
    switch(action.type) {
        case types.RECEIVE_POSTS:
        case types.REQUEST_POSTS:
            return Object.assign({}, state, content(state, action))
        default:
            return state;
    }
}

// should use defaultLanguage code here
const selectedLanguage = (state = defaultLanguage, action) => {
    switch (action.type) {
        case types.SET_LANG:
            return action.language
        case types.LOCATION_CHANGE:
            if(action.payload.location.pathname.split('/')[1].length === 0) {
                return state
            }
            return action.payload.location.pathname.split('/')[1]
      default:
        return state
    }
}

function detailModal(state = { modalID: 0 }, action) {
    switch(action.type) {
        case types.DETAIL_MODAL:
            return Object.assign({}, state, content(state, action))
        default:
            return state;
    }
}

const selectedPage = (state = 'home', action) => {
    switch (action.type) {
        case types.SET_PAGE:
            return action.page
        default:
            return state
    }
}

const setCollapse = (state = true, action) => {
    switch (action.type) {
        case types.SET_COLLAPSE:
            return action.collapse
        default:
            return state
    }
}

const setBrowse = (state = 'Title', action) => {
    switch (action.type) {
        case types.SET_BROWSE:
            return action.browse
        default:
            return state
    }
}

const setCollection = (state = false, action) => {
    switch (action.type) {
        case types.SET_COLLECTION:
            return action.collection
        default:
            return state
    }
}

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    selectedLanguage,
    selectedPage,
    setCollapse,
    setBrowse,
    setCollection,
    pages,
    posts,
    esWorks,
    esAuthors,
    esSubjects,
    esResources,
    gsData,
    detailData,
    manifestData,
    IIIFData,
    detailModal
})

export default rootReducer