import fetch from 'cross-fetch'

import { initialSearch, searchID } from '../server/search'

const nodeWP = 'http://206.189.71.52/'
const endpointWP = 'wp-json/wp/v2/'

const initialIDs = [
    'W22677',
    'W1GS135873',
    'W1KG5200',
    'W22344',
    'W1GS135531',
    'W1KG1132',
    'W1KG10720',
    'W1KG1279',
    'W1KG14700'
]

export const LanguageArray = [
    'English',
    'Mongolian',
    'Tibetan'
]

export const SET_LANG = 'SET_LANG';
export const setLanguage = language => ({
  type: SET_LANG,
  language
})

export const SET_PAGE = 'SET_PAGE';
export const setPage = page => ({
    type: SET_PAGE,
    page
})
/* ******************************************
PAGES
wp pages for content pages (about, preservation)
********************************************/
export const REQUEST_PAGES = 'REQUEST_PAGES';
function requestPages() {
    return {
        type: REQUEST_PAGES
    }
}

export const RECEIVE_PAGES = 'RECEIVE_PAGES';
function receivePages(json) {
    return {
        type: RECEIVE_PAGES,
        pages: json, //.filter(child => child.acf.language === lang), //.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export function fetchPages() {
    return function(dispatch) {
        dispatch(requestPages())
        return fetch(`${nodeWP}${endpointWP}pages?_embed`)
            .then(
                response => response.json(),
                error => console.log('An error ', error)    
            )
            .then(json => {
                //reduce using empty array to group by language
                return json.reduce((r, a) => {
                    r[a.acf.language] = r[a.acf.language] || [];
                    r[a.acf.language].push(a);
                    return r;
                }, []);
            })
            .then(json => { 
                // do NOT receivePages until there are pages!
                dispatch(receivePages(json)) 
            })
    }
}

/* ******************************************
POSTS
wp posts for home page content
********************************************/
export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts() {
    return {
        type: REQUEST_POSTS
    }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts(json) {
    return {
        type: RECEIVE_POSTS,
        posts: json, //.filter(child => child.acf.language === lang), //.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export function fetchPosts() {
    return function(dispatch) {
        dispatch(requestPosts())
        return fetch(`${nodeWP}${endpointWP}posts?_embed`)
            .then(
                response => response.json(),
                error => console.log('An error ', error)    
            )
            .then(json => {
                //reduce using empty array to group by language
                return json.reduce((r, a) => {
                    r[a.acf.language] = r[a.acf.language] || [];
                    r[a.acf.language].push(a);
                    return r;
                }, []);
            })
            .then(json => 
                dispatch(receivePosts(json))
            )
    }
}

/* ******************************************
DATA
Elasticsearch data from http://142.93.23.6:9200
********************************************/
export const REQUEST_DATA = 'REQUEST_DATA';
function requestData() {
    return {
        type: REQUEST_DATA
    }
}

export const RECEIVE_DATA = 'RECEIVE_DATA';
function receiveData(json) {
    return {
        type: RECEIVE_DATA,
        data: json, //.filter(child => child.acf.language === lang), //.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export function fetchData() {
    return async dispatch => {
        dispatch(requestData())
        try {
            const data = await initialSearch(initialIDs)
            return dispatch(receiveData(data))
        } catch (error) {
            console.error('there been error ', error)
        }
    }
}

export const REQUEST_ID = 'REQUEST_ID';
function requestID() {
    return {
        type: REQUEST_ID
    }
}

export const RECEIVE_ID = 'RECEIVE_ID';
function receiveID(json) {
    return {
        type: RECEIVE_ID,
        data: json, //.filter(child => child.acf.language === lang), //.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

// return (dispatch, getState) => {
//     const {items} = getState().otherReducer;

//     dispatch(anotherAction(items));
//   }
export function fetchSpecificID(doc_id) {
    return async dispatch => {
        
        console.log('fetchSpecificID!', doc_id)
        dispatch(requestID())
        try {
            const dataDetail = await searchID([doc_id])
            console.log(dataDetail)
            return dispatch(receiveID(dataDetail))
        } catch(error) {
            console.error('error! ', error)
        }
    }
}

export const DETAIL_MODAL = 'DETAIL_MODAL';
export const modalDetail = (modalID, show) => ({
    type: DETAIL_MODAL,
    modalID: modalID,
    show: show
})