import * as types from './types'
import { languages } from './index'

export const nodeWP = 'http://178.128.7.239/'
export const onlyIP = '178.128.7.239'

const endpointWP = 'wp-json/wp/v2/'

/* ******************************************
PAGES
wp pages for content pages (about, preservation)
********************************************/

function requestPages() {
    return {
        type: types.REQUEST_PAGES
    }
}

function receivePages(json) {
    return {
        type: types.RECEIVE_PAGES,
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
                error => console.error('An error ', error)    
            )
            .then(json => {
                //reduce using empty array to group by language
                //log('json pages', json)
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