import getAsyncAction from './asyncActionUtils'
import { fetchTypes } from '../types'
import fetchWorks from '../apis/elasticsearch/fetchWorks'
import fetchAuthors from '../apis/elasticsearch/fetchAuthors'
import fetchSubjects from '../apis/elasticsearch/fetchSubjects'
import fetchAll from '../apis/elasticsearch/fetchAll'
import fetchID from '../apis/elasticsearch/fetchIDs'
import fetchResults from '../apis/elasticsearch/fetchResults'
import fetchWPType from '../apis/wordpress/fetchWPType'
import fetchGS from '../apis/googleSheets/fetchGS'

// ELASTICSEARCH
export const fetchAllAction = getAsyncAction({
    actionType: fetchTypes.ALL,
    asyncFunc: fetchAll,
})
export const fetchWorksAction = getAsyncAction({
    actionType: fetchTypes.WORKS,
    asyncFunc: fetchWorks,
})
export const fetchAuthorsAction = getAsyncAction({
    actionType: fetchTypes.AUTHORS,
    asyncFunc: fetchAuthors,
})
export const fetchSubjectsAction = getAsyncAction({
    actionType: fetchTypes.SUBJECTS,
    asyncFunc: fetchSubjects,
})
// export const fetchPlacesAction = getAsyncAction({
//     actionType: fetchTypes.PLACES,
//     asyncFunc: fetchPlaces,
// })
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
