import * as types from './types'
import { languages } from './index'

const nodeWP = 'http://178.128.7.239/'
const endpointWP = 'wp-json/wp/v2/'

/* ******************************************
POSTS
wp posts for home page content
********************************************/

function requestPosts() {
    return {
        type: types.REQUEST_POSTS
    }
}

function receivePosts(json) {
    return {
        type: types.RECEIVE_POSTS,
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