import fetch from 'cross-fetch'

import { initialSearch, searchID } from '../server/search'

import config from './config-defaults.json'

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
        imageAsset: json.hits.hits[0]._source.workHasItemImageAsset,
        volume: json.hits.hits[0]._source.workHasItem,
        receivedAt: Date.now()
    }
}

// return (dispatch, getState) => {
//     const {items} = getState().otherReducer;

//     dispatch(anotherAction(items));
//   }
export function fetchSpecificID(doc_id) {
    return dispatch => {  
        console.log('fetchSpecificID!', doc_id)
        dispatch(requestID())
        try {
            searchID([doc_id]).then((dataDetail) => {
                console.log('THEN', dataDetail)
                const imageAsset = dataDetail.hits.hits[0]._source.workHasItemImageAsset
                const volumes = dataDetail.hits.hits[0]._source.workNumberOfVolumes
                dispatch(fetchManifest(imageAsset, volumes))
                return dataDetail
            }).then((dataDetail) => {
                return dispatch(receiveID(dataDetail))
            })
        } catch(error) {
            console.error('fetch ID error! ', error)
        }
    }
}

// export function fetchSpecificID(doc_id) {
//     return async dispatch => {
        
//         console.log('fetchSpecificID!', doc_id)
//         dispatch(requestID())
//         try {
//             const dataDetail = await searchID([doc_id])
//             const imageAsset = dataDetail.hits.hits[0]._source.workHasItemImageAsset
//             const volumes = dataDetail.hits.hits[0]._source.workNumberOfVolumes
            
//             console.log('post fetchManifest', imageAsset, volumes)
//             return receiveID(dataDetail).then(() => {
//                 dispatch(fetchManifest(imageAsset, volumes))
//             })
//         } catch(error) {
//             console.error('fetch ID error! ', error)
//         }
//     }
// }

function fetchManifest(imageAsset, volumes) {
    return dispatch => {
        console.log('INSIDE fetchManifest', imageAsset)
        dispatch(requestManifest())
        try {
            let imageURL
            const iiifpres = "http://iiifpres.bdrc.io" ;
            if(imageAsset) {
                if(volumes === 1) {
                    // must reconstruct imageItem based on workHasItem > hasVolume
                    // bdr:W22677
                    // W22677 > workHasItem > bdr:I22677 > HasVolume > V22677_I1KG1714
                    // BDRC "http://iiifpres.bdrc.io/2.1.1/v:bdr:V22677_I1KG1714/manifest"
                    imageURL = `${iiifpres}/2.1.1/v:${imageAsset}/manifest`
                    imageURL = ``
                } else if(volumes > 1) {
                    // bdr:W1GS135873
                    // ACIP http://iiifpres.bdrc.io/2.1.1/collection/i:bdr:bdr:I1KG1132
                    // BDRC "http://iiifpres.bdrc.io/2.1.1/collection/i:bdr:I1GS135873"
                    imageURL = `${iiifpres}/2.1.1/collection/i:${imageAsset}`
                }
            }
            return dispatch(receiveManifest(imageURL))
        } catch (error) {
            console.error('fetch manifest error! ', error)
        }
    }
}

export const RECEIVE_MANIFEST = 'RECEIVE_MANIFEST';
function receiveManifest(manifestURL) {
    return {
        type: RECEIVE_MANIFEST,
        manifestURL,
        receivedAt: Date.now()
    }
}

export const REQUEST_MANIFEST = 'REQUEST_MANIFEST';
function requestManifest() {
    console.log('requesting manifest!')
    return {
        type: REQUEST_MANIFEST
    }
}

export const DETAIL_MODAL = 'DETAIL_MODAL';
export const modalDetail = (modalID, show) => ({
    type: DETAIL_MODAL,
    modalID: modalID,
    show: show
})

export const UNIVERSAL_VIEWER = 'UNIVERSAL_VIEWER';
export const universalViewer = (viewerID, showViewer) => ({
    type: UNIVERSAL_VIEWER,
    viewerID,
    showViewer
})

export function fetchIIIF() {
    return async dispatch => {
        console.log('config!')
        dispatch(requestIIIF())
        try {
            console.log('sign in to IIIF', config.auth)

            //return config.text
        }
        catch(e) {
            
            console.error('config error', e)
        }
    }
}


export const REQUEST_IIIF = 'REQUEST_IIIF';
function requestIIIF() {
    return {
        type: REQUEST_IIIF
    }
}

export const RECEIVE_IIIF = 'RECEIVE_IIIF';
function receiveIIIF(json) {
    return {
        type: RECEIVE_IIIF,
        pages: json,
        receivedAt: Date.now()
    }
}