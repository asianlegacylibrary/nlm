import getAsyncAction from './asyncActionUtils'
import { constants } from '../_constants'
import fetchWorks from '../apis/elasticsearch/fetchWorks'
import fetchID from '../apis/elasticsearch/fetchIDs'
import fetchResults from '../apis/elasticsearch/fetchResults'
import fetchWPType from '../apis/wordpress/fetchWPType'
import fetchGS from '../apis/googleSheets/fetchGS'

let { fetchTypes } = constants
// ELASTICSEARCH
export const fetchWorksAction = getAsyncAction({
    actionType: fetchTypes.WORKS,
    asyncFunc: fetchWorks,
})

export const fetchIDAction = getAsyncAction({
    actionType: fetchTypes.ID,
    asyncFunc: fetchID,
})

export const fetchResultsAction = getAsyncAction({
    actionType: fetchTypes.RESULTS,
    asyncFunc: fetchResults,
})

// GOOGLE SHEETS
export const fetchGSAction = getAsyncAction({
    actionType: fetchTypes.GS,
    asyncFunc: fetchGS,
})

// WORDPRESS
export const fetchWPPostsAction = getAsyncAction({
    actionType: fetchTypes.POSTS,
    asyncFunc: fetchWPType,
})

export const fetchWPPagesAction = getAsyncAction({
    actionType: fetchTypes.PAGES,
    asyncFunc: fetchWPType,
})
