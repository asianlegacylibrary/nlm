import { log, searchParams } from './index'
import * as types from './types'
import { collection_v1 } from '../collections/nlm01'
import { collection_v2 } from '../collections/nlm02'
import { testCollection } from '../collections/testCollection40'

import {
    initialTopicsSearch,
    initialAuthorSearch,
    searchByID,
    searchResources,
    searchIDSbyTerm
} from '../queries'

//collection_v1.push(...collection_v2)
//const collection = process.env.NODE_ENV === 'production' ? 
let collection = []
if(process.env.NODE_ENV === 'production') {
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
    switch(type) {
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
        receivedAt: Date.now()
    }
}

export function fetchData() {
    //const fc = filterCollection(collection)
    return async dispatch => {
        dispatch(requestESData(types.REQUEST_WORKS))
        try {
            const data = await searchByID(collection, collection.length, "W")
            //log('buckets', collection.length, data.aggregations.collections.buckets)
            const modifiedData = injectPrefLabel(data)
            return dispatch(receiveESData(types.RECEIVE_WORKS, modifiedData))
        } catch (error) {
            console.error('there been fetchData error ', error)
        }
    }
}

export function fetchAuthors() {
    //const fc = filterCollection(collection)
    //log('fetchAuthors receiving', fc.length, fc)
    return async dispatch => {
        dispatch(requestESData(types.REQUEST_AUTHORS))
        try {
            const a = await initialAuthorSearch(collection)
            //log('#0, authors...')
            const authors = a.aggregations.uniqueAuthors.buckets.map(a => {
                return a.key
            })
            //log('#1, authors keys', authors.length)
            const data = await searchByID(authors, authors.length, "P")
            //log('#2, authors in works')
            await mutateDataWithRelatedDocs(data, 'workCreator.keyword')
            //log('#3, authors add related docs')
            const modifiedData = injectPrefLabel(data)
            return dispatch(receiveESData(types.RECEIVE_AUTHORS, modifiedData))
        } catch(error) {
            console.error('been done error in fetchAuthors', error)
        }
    }
}

export function fetchTopics() {
    return async dispatch => {
        dispatch(requestESData(types.REQUEST_SUBJECTS))
        try {
            const t = await initialTopicsSearch(collection)
            //log('#0, topics...')
            const topics = t.aggregations.uniqueTopics.buckets.map(t => {
                return t.key
            })
            //log('#1, topics keys', topics.length)
            const data = await searchByID(topics, topics.length, "T")
            //log('#2, topics in works')
            await mutateDataWithRelatedDocs(data, 'workIsAbout.keyword')
            //log('#3, topic add related docs')
            
            const modifiedData = injectPrefLabel(data)
            
            return dispatch(receiveESData(types.RECEIVE_SUBJECTS, modifiedData))
        } catch(error) {
            console.error('been error in da fetchTopics', error)
        }
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

export const fetchResources = (id, resources) => {
    return dispatch => {
        //log('fetch resources', id, resources)
        dispatch(requestESData(types.REQUEST_RESOURCES))
        try {
            searchResources(resources).then((data) => {
                dispatch(receiveESData(types.RECEIVE_RESOURCES, data))
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

const mutateDataWithRelatedDocs = async (data, searchField) => {
    // YO!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // async within an array.map for a Promise.all :)
    // but, this is mutating data directly
    // THIS IS AN ANTI-PATTERN, learn correct pattern
    await Promise.all(data.hits.hits.map(async (d, i) => {
        if('_id' in d) {
            return await searchIDSbyTerm(d._id, searchField, collection, searchParams.initialIndex).then(newData => {
                //log('within the mutate with related', newData)
                const modifiedData = injectPrefLabel(newData)
                return d["_related"] = modifiedData
                
            })
        }
    }))
}

// this function should be done in python as pre-processing
// add _tid to each document before indexing to ES
const injectPrefLabel = (data) => {
    //log('trying to inject preflabel now...')
    data.hits.hits.map(async p => {
        let tid

        if(p !== undefined) {
            if('skos:prefLabel' in p._source) {
                if(Array.isArray(p._source["skos:prefLabel"])) {
                    //log('skos is an array', p._id)
                    if (p._source["skos:prefLabel"].some(l => l["@language"] === 'en')) {
                        tid = p._source["skos:prefLabel"].find(t => "en" === t["@language"])
                        tid = tid["@value"]

                    } else if (p._source["skos:prefLabel"].some(l => l["@language"] === 'bo-x-ewts')) {
                        tid = p._source["skos:prefLabel"].find(t => "bo-x-ewts" === t["@language"])
                        tid = tid["@value"]

                    }
                } else if(typeof p._source["skos:prefLabel"] === 'object') {
                    tid = p._source["skos:prefLabel"]["@value"]

                }

            } else {
                tid = null
            }
        }

        return p["_tid"] = tid

    })
    
    data.hits.hits.sort((a, b) => a._tid.localeCompare(b._tid))

    return data
}

export const injectSinglePrefLabel = (skos) => {
    //log('trying to inject preflabel now...')
    let tid
    if(Array.isArray(skos)) {
        //log('skos is an array', p._id)
        if (skos.some(l => l["@language"] === 'en')) {
            tid = skos.find(t => "en" === t["@language"])
            tid = tid["@value"]

        } else if (skos.some(l => l["@language"] === 'bo-x-ewts')) {
            tid = skos.find(t => "bo-x-ewts" === t["@language"])
            tid = tid["@value"]

        }
    } else if(typeof skos === 'object') {
        tid = skos["@value"]
    } else {
        tid = null
    }
    return tid
}
