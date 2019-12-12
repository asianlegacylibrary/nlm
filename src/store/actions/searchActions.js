import { log } from './index'
import * as types from './types'
import expressURL from '../apis/express'
import { endpoints } from '../apis/endpoints'
import { collection_v1 } from '../collections/nlm01'
import { collection_v2 } from '../collections/nlm02'
import { testCollection } from '../collections/testCollection40'

//collection_v1.push(...collection_v2)
//const collection = process.env.NODE_ENV === 'production' ?
let collection = []
if (process.env.NODE_ENV === 'production') {
    collection = collection_v1
    collection.push(...collection_v2)
} else {
    collection = testCollection
}

/* ******************************************
DATA
Elasticsearch data from http://142.93.23.6:9200
********************************************/
function requestESData(type) {
    switch (type) {
        case types.REQUEST_WORKS:
            return { type: types.REQUEST_WORKS }
        case types.REQUEST_AUTHORS:
            return { type: types.REQUEST_AUTHORS }
        case types.REQUEST_SUBJECTS:
            return { type: types.REQUEST_SUBJECTS }
        default:
            return null
    }
}

function receiveESData(type, json) {
    return {
        type: type,
        data: json, //.filter(child => child.acf.language === lang), //.data.children.map(child => child.data),
        receivedAt: Date.now(),
    }
}

export function fetchData() {
    return async dispatch => {
        dispatch(requestESData(types.REQUEST_WORKS))
        dispatch(requestESData(types.REQUEST_AUTHORS))
        dispatch(requestESData(types.REQUEST_SUBJECTS))
        const offset = 0
        try {
            const data = await expressURL.get(endpoints.fetchAll, {
                params: { offset },
            })

            // THE AGGREGATION WOULD BE THE SIDEBAR FILTERS
            // log(
            //     'buckets',
            //     collection.length,
            //     data.aggregations.collections.buckets
            // )
            dispatch(receiveESData(types.RECEIVE_WORKS, data.data.WORKS))
            dispatch(receiveESData(types.RECEIVE_AUTHORS, data.data.AUTHORS))
            dispatch(receiveESData(types.RECEIVE_SUBJECTS, data.data.TOPICS))
        } catch (error) {
            console.error('there been fetchData error ', error)
        }
    }
}

function requestID() {
    return {
        type: types.REQUEST_ID,
    }
}

function receiveID(json) {
    return {
        type: types.RECEIVE_ID,
        data: json, //.filter(child => child.acf.language === lang), //.data.children.map(child => child.data),
        imageAsset: json.hits.hits[0]._source.workHasItemImageAsset,
        volume: json.hits.hits[0]._source.workHasItem,
        receivedAt: Date.now(),
    }
}

export function fetchSpecificID(doc_id) {
    return async dispatch => {
        log('fetchSpecificID!', doc_id)
        const code = doc_id.charAt(4)
        let ids = []
        ids = JSON.stringify([doc_id])
        dispatch(requestID())
        try {
            const data = await expressURL.get(endpoints.searchByID, {
                params: { ids, code },
            })
            console.log('SPECIFIC', data)
            return dispatch(receiveID(data.data))
        } catch (error) {
            console.error('fetch ID error! ', error)
        }
    }
}

export const injectSinglePrefLabel = skos => {
    //log('trying to inject preflabel now...')
    let tid
    if (Array.isArray(skos)) {
        //log('skos is an array', p._id)
        if (skos.some(l => l['@language'] === 'en')) {
            tid = skos.find(t => 'en' === t['@language'])
            tid = tid['@value']
        } else if (skos.some(l => l['@language'] === 'bo-x-ewts')) {
            tid = skos.find(t => 'bo-x-ewts' === t['@language'])
            tid = tid['@value']
        }
    } else if (typeof skos === 'object') {
        tid = skos['@value']
    } else {
        tid = null
    }
    return tid
}
