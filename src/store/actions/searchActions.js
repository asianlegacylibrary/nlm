import { log, searchParams } from './index'
import * as types from './types'
import { collection_v1 } from '../collections/nlm01'

import {
    initialTopicsSearch,
    initialAuthorSearch,
    searchByID,
    searchResources
} from '../queries'


/* ******************************************
DATA
Elasticsearch data from http://142.93.23.6:9200
********************************************/
function requestData() {
    return {
        type: types.REQUEST_DATA
    }
}

function receiveData(json) {
    return {
        type: types.RECEIVE_DATA,
        data: json, //.filter(child => child.acf.language === lang), //.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export function fetchData() {
    return async dispatch => {
        dispatch(requestData())
        try {
            const data = await searchByID(collection_v1, collection_v1.length, "W")
            return dispatch(receiveData(data))
        } catch (error) {
            console.error('there been fetchData error ', error)
        }
    }
}

export function fetchAuthors() {
    return async dispatch => {
        dispatch(requestAuthors())
        try {
            const a = await initialAuthorSearch(collection_v1)
            const authors = a.aggregations.uniqueAuthors.buckets.map(a => {
                return a.key
            })
            const data = await searchByID(authors, authors.length, "P")
            return dispatch(receiveAuthors(data))
        } catch(error) {
            console.error('been done error', error)
        }
    }
}

export function fetchTopics() {
    return async dispatch => {
        dispatch(requestTopics())
        try {
            const t = await initialTopicsSearch(collection_v1)
            log('initial topic search', t)
            const topics = t.aggregations.uniqueTopics.buckets.map(t => {
                return t.key
            })
            log(topics, topics.length)
            const data = await searchByID(topics, topics.length, "T")
            log(data)
            return dispatch(receiveTopics(data))
        } catch(error) {
            console.error('been topic error', error)
        }
    }
}

function requestAuthors() {
    return {
        type: types.REQUEST_AUTHORS
    }
}
function receiveAuthors(data) {
    return {
        type: types.RECEIVE_AUTHORS,
        data: data,
        receivedAt: Date.now()
    }
}

function requestTopics() {
    return {
        type: types.REQUEST_TOPICS
    }
}
function receiveTopics(data) {
    return {
        type: types.RECEIVE_TOPICS,
        data: data,
        receivedAt: Date.now()
    }
}

function requestID() {
    return {
        type: types.REQUEST_ID
    }
}

function receiveID(json) {
    return {
        type: types.RECEIVE_ID,
        data: json, //.filter(child => child.acf.language === lang), //.data.children.map(child => child.data),
        imageAsset: json.hits.hits[0]._source.workHasItemImageAsset,
        volume: json.hits.hits[0]._source.workHasItem,
        receivedAt: Date.now()
    }
}

function requestResources() {
    return {
        type: types.REQUEST_RESOURCES
    }
}

function receiveResources(json) {
    return {
        type: types.RECEIVE_RESOURCES,
        data: json.hits,
        receivedAt: Date.now()
    }
}

export const fetchResources = (id, resources) => {
    return dispatch => {
        log('fetch resources', id, resources)
        dispatch(requestResources())
        try {
            searchResources(resources).then((data) => {
                dispatch(receiveResources(data))
            })
        } catch (error) {
            console.error('fetch resources error, ', error)
        }
    }
}

export function fetchSpecificID(doc_id) {
    return dispatch => {  
        log('fetchSpecificID!', doc_id)
        dispatch(requestID())
        try {
            searchByID([doc_id], 1, doc_id.charAt(4), true).then((dataDetail) => {
                return dispatch(receiveID(dataDetail))
            })
        } catch(error) {
            console.error('fetch ID error! ', error)
        }
    }
}
