import fetch from 'cross-fetch'

import { initialSearch, searchID } from '../server/search'

import Tabletop from 'tabletop'

const d = `https://docs.google.com/spreadsheets/d/`
const gsKey = `1hPqe-Y2TWwMTAxIEXYvc8du_GMFUJQNPvZbJou7veAY`
//const testKey = `1P6Dk9SN0af7GDitw7-tRXGc5N22AEXoaOpDIKzVdlK0`
const spreadSheet = `${d}${gsKey}/edit?usp=sharing`




// possibly needed for authenticated requests?
//import config from './config-defaults.json'

//const nodeWP = 'http://206.189.71.52'
export const nodeWP = 'http://178.128.7.239/'
export const onlyIP = '178.128.7.239'

const endpointWP = 'wp-json/wp/v2/'

const iiifpres = "http://iiifpres.bdrc.io" ;

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

export const buildYear = '2018'

export const defaultLanguage = 'en'

export const languages = {
    en: "English",
    mn: "Mongolian"
}

export const log = (...msgs) => {
	if (process.env.NODE_ENV === 'development') {
		console.log(...msgs)
	}
}

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

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

export const REQUEST_GS = 'REQUEST_GS'
function requestGS() {
    return {
        type: REQUEST_GS
    }
}

export const RECEIVE_GS = 'RECEIVE_GS'
function receiveGS(gs) {
    return {
        type: RECEIVE_GS,
        gs: gs,
        receivedAt: Date.now()
    }
}

const tableTopInit = async () => {
    return await new Promise((response, error) => {
        Tabletop.init({
            key: spreadSheet,
            callback: (data, tabletop) => { 
                response(data)
                error(tabletop)
            }, 
            simpleSheet: true
        })
    })
}

export function getGS() {
    return async dispatch => {
        dispatch(requestGS())
        try {
            const data = await tableTopInit()
            // add some data processing
            let gsData = {}
            data.map(d => {
                const key = d.StatName.split(' ').join('')
                console.log(typeof(d.Value), isNaN(d.Value), d.Value)
                gsData[key] = isNaN(d.Value) ? d.Value : String(d.Value).replace(/(.)(?=(\d{3})+$)/g,'$1,')
            })
            return dispatch(receiveGS(gsData))
        } catch(error) {
            console.error('error from tabletop', error)
        }
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
                //console.log('json pages', json)
                return json.reduce((r, a) => {
                    const x = Object.keys(languages).find(key => languages[key] === a.acf.language)
                    r[x] = r[x] || [];
                    r[x].push(a);
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
                    const x = Object.keys(languages).find(key => languages[key] === a.acf.language)
                    r[x] = r[x] || [];
                    r[x].push(a);
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

export function fetchSpecificID(doc_id) {
    return dispatch => {  
        log('fetchSpecificID!', doc_id)
        dispatch(requestID())
        try {
            searchID([doc_id]).then((dataDetail) => {
                log('THEN', dataDetail)
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

function fetchManifest(imageAsset, volumes) {
    return dispatch => {
        log('INSIDE fetchManifest', imageAsset)
        dispatch(requestManifest())
        try {
            let imageURL
            
            if(imageAsset) {
                const id = imageAsset.includes(":") ? imageAsset.split(":")[1] : imageAsset
                if(volumes === 1) {
                    // must reconstruct imageItem based on workHasItem > hasVolume
                    // bdr:W22677
                    // W22677 > workHasItem > bdr:I22677 > HasVolume > V22677_I1KG1714
                    // BDRC "http://iiifpres.bdrc.io/2.1.1/v:bdr:V22677_I1KG1714/manifest"
                    searchID([id]).then((dataDetail) => {
                        log('THEN', dataDetail)
                        const volumeID = dataDetail.hits.hits[0]._source.itemHasVolume
                        imageURL = `${iiifpres}/2.1.1/v:${volumeID}/manifest`
                        log('THIS IS IMAGE URL', imageURL)
                        dispatch(fetchIIIF(imageURL))
                        return dispatch(receiveManifest(imageURL))
                    })
                } else if(volumes > 1) {
                    // bdr:W1GS135873
                    // BDRC "http://iiifpres.bdrc.io/2.1.1/collection/i:bdr:I1GS135873"
                    imageURL = `${iiifpres}/2.1.1/collection/i:${imageAsset}`
                    log('THIS IS IMAGE URL', imageURL)
                    dispatch(fetchIIIF(imageURL))
                    return dispatch(receiveManifest(imageURL))
                }
            } else {
                return dispatch(receiveManifest(''))
            }
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
    log('requesting manifest!')
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

export const NULLIFY_IIIF = 'NULLIFY_IIIF';
export const RECEIVE_IIIF = 'RECEIVE_IIIF';
function receiveIIIF(firstImage) {
    return {
        type: RECEIVE_IIIF,
        firstImage,
        receivedAt: Date.now()
    }
}

export const REQUEST_IIIF = 'REQUEST_IIIF';
function requestIIIF() {
    log('requesting IIIF!')
    return {
        type: REQUEST_IIIF,
        firstImage: null
    }
}

export function fetchIIIF(url) {
    return dispatch => {
        dispatch(requestIIIF())
        try {
            // first image
            //http://iiif.bdrc.io/image/v2/bdr:V22677_I1KG1714::I1KG17140003.jpg/full/,600/0/default.jpg"
            // imageAsset
            // http://iiifpres.bdrc.io/2.1.1/v:bdr:V22677_I1KG1714/manifest"
            // http://iiifpres.bdrc.io/2.1.1/v:bdr:V22677_I1KG1714/manifest
            
            fetch(url, {method: 'GET'}).then((manifest) => {
                return manifest.json()
            }).then(data => {
                log('MANIFEST?!', data)
                let image ;

                //collection ?
                if(!data.sequences ) {
                    if (data.manifests) {
                        log('I AM A COLLECTION')
                        dispatch(fetchIIIF(data.manifests[0]["@id"]))
                    }
                }
                // this logic taken directly from ResourceViewer BDRC
                if(data.sequences && data.sequences[0] && data.sequences[0].canvases) {
                    let found = false ;
                    for(let i in data.sequences[0].canvases){
                        let s = data.sequences[0].canvases[i]
                        if(s.label === "tbrc-1") {
                            s = data.sequences[0].canvases[2]
                            if(s && s.images && s.images[0]) {
                                image = data.sequences[0].canvases[2].images[0].resource["@id"]
                                found = true ;
                                return dispatch(receiveIIIF(image))
                            }
                        }
                    }

                    if(!found) {
                        if(data.sequences[0].canvases[0] 
                            && data.sequences[0].canvases[0].images[0] 
                            && data.sequences[0].canvases[0].images[0].resource["@id"]) {
                            
                            image = data.sequences[0].canvases[0].images[0].resource["@id"]
                            found = true
                            return dispatch(receiveIIIF(image))
                        }
                    }
                }
            })
        }
        catch(e) {
            console.error('config error', e)
        }
    }
}