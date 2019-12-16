import { receiveID, receiveESData, receiveAssociatedRecords } from './index'
import * as types from '../types'
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
********************************************/

export function fetchData() {
    return async dispatch => {
        dispatch({ type: types.REQUEST_WORKS })
        dispatch({ type: types.REQUEST_AUTHORS })
        dispatch({ type: types.REQUEST_SUBJECTS })
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

export function fetchSpecificID(doc_id) {
    return async dispatch => {
        const code = doc_id.charAt(4)
        let ids = []
        let lengthIDs = 1
        ids = JSON.stringify([doc_id])
        dispatch({ type: types.REQUEST_ID })
        try {
            const data = await expressURL.get(endpoints.fetchID, {
                params: { ids, lengthIDs, code },
            })

            dispatch(receiveID(data.data))
            ids = JSON.stringify(data.data.hits.hits[0]._source._resources)
            lengthIDs = ids.length

            dispatch({ type: types.REQUEST_ASSOCIATED_RECORDS })

            const resources = await expressURL.get(endpoints.fetchID, {
                params: { ids, lengthIDs },
            })

            dispatch(receiveAssociatedRecords(resources.data))
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
