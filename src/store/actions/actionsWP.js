import * as types from '../types'
import { languages } from './index'

export const nodeWP = 'http://178.128.7.239/'
export const onlyIP = '178.128.7.239'

const endpointWP = 'wp-json/wp/v2/'

/* ******************************************
PAGES
wp pages for content pages (about, preservation)
********************************************/

function receiveWPType(json, type) {
    return {
        type: types[`RECEIVE_${type.toUpperCase()}`],
        [type]: json, //.filter(child => child.acf.language === lang), //.data.children.map(child => child.data),
        receivedAt: Date.now(),
    }
}

export function fetchWPType(type) {
    return function(dispatch) {
        dispatch({ type: types[`REQUEST_${type.toUpperCase()}`] })
        return fetch(`${nodeWP}${endpointWP}${type}?_embed`)
            .then(
                response => response.json(),
                error => console.error('An error ', error)
            )
            .then(json => {
                //reduce using empty array to group by language
                return json.reduce((r, a) => {
                    const x = Object.keys(languages).find(
                        key => languages[key] === a.acf.language
                    )
                    r[x] = r[x] || []
                    r[x].push(a)
                    return r
                }, [])
            })
            .then(json => dispatch(receiveWPType(json, type)))
    }
}
