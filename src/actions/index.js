import fetch from 'cross-fetch';

export const LanguageArray = [
    'English',
    'Mongolian',
    'Tibetan'
  ];

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
function requestPages(lang) {
    return {
        type: REQUEST_PAGES,
        lang
    }
}

export const RECEIVE_PAGES = 'RECEIVE_PAGES';
function receivePages(lang, json) {
    return {
        type: RECEIVE_PAGES,
        lang,
        pages: json.filter(child => child.acf.language === lang), //.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export function fetchPages(lang) {
    return function(dispatch) {
        dispatch(requestPages(lang))
        return fetch(`http://206.189.71.52/wp-json/wp/v2/pages?_embed`)
            .then(
                response => response.json(),
                error => console.log('An error ', error)    
            )
            .then(json =>
                dispatch(receivePages(lang, json))
            )
    }
}

/* ******************************************
POSTS
wp posts for home page content
********************************************/
export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts(lang) {
    return {
        type: REQUEST_POSTS,
        lang
    }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts(lang, json) {
    return {
        type: RECEIVE_POSTS,
        lang,
        posts: json.filter(child => child.acf.language === lang), //.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export function fetchPosts(lang) {
    return function(dispatch) {
        dispatch(requestPosts(lang))
        return fetch(`http://206.189.71.52/wp-json/wp/v2/posts?_embed`)
            .then(
                response => response.json(),
                error => console.log('An error ', error)    
            )
            .then(json => 
                dispatch(receivePosts(lang, json))
            )
    }
}