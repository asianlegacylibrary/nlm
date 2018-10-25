import fetch from 'cross-fetch';

const node = 'http://206.189.71.52/';
const apiURL = 'wp-json/wp/v2/'

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
        return fetch(`${node}${apiURL}pages?_embed`)
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
        return fetch(`${node}${apiURL}posts?_embed`)
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