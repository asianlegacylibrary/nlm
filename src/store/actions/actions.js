import { constants } from '../_constants'
let { actions } = constants

// do the resolve reject within here? vs above...
export const someThenableThunk = (filter, isActive) => (dispatch, getState) =>
    Promise.resolve()
        .then(() => {
            //const { someReducer } = getState()
            return dispatch({
                type: 'ADD_TERM_TO_FILTER',
                filter,
                isActive,
            })
        })
        .catch(error => {
            console.log('error?', error)
        })

export const setLanguage = language => ({
    type: actions.SET_LANG,
    language,
})

export const setLanguage2 = (language, i18n) => {
    i18n.changeLanguage(language)
    return {
        type: actions.SET_LANG,
        language,
    }
}

export const setPage = page => ({
    type: actions.SET_PAGE,
    page,
})

export const setCollapse = collapse => ({
    type: actions.SET_COLLAPSE,
    collapse,
})

export const setCollection = collection => ({
    type: actions.SET_COLLECTION,
    collection,
})

export const setBrowse = browse => ({
    type: actions.SET_BROWSE,
    browse,
})

export const resetOffsets = () => {
    return {
        type: actions.RESET_OFFSETS,
    }
}

export const clearResults = () => {
    return {
        type: actions.CLEAR_RESULTS,
    }
}

export const clearFilterTerm = () => {
    return {
        type: actions.CLEAR_FILTER_TERM,
    }
}
export const clearFilterArray = () => {
    return {
        type: actions.CLEAR_FILTER_ARRAY,
    }
}

export const deleteFullText = () => {
    return { type: actions.DELETE_FULL_TEXT }
}

export const setCurrentSearchTerm = term => {
    return {
        type: actions.SET_CURRENT_SEARCH_TERM,
        payload: term,
    }
}
export const setCurrentFilterTerm = term => ({
    type: actions.SET_CURRENT_FILTER_TERM,
    payload: term,
})
export const setFilterArray = filters => ({
    type: actions.SET_FILTER_ARRAY,
    payload: filters,
})

export const addTermToHistory = term => {
    // look into how to terminate action based on cache
    //if (!store.getState().history.includes(term)) {
    return {
        type: actions.ADD_TERM_TO_HISTORY,
        term,
    }
    //}
}

export function actionWrapper(type, payload) {
    return (dispatch, getState) =>
        new Promise((resolve, reject) => {
            dispatch({ type: type, payload: payload })
            resolve()
        })
}

export function addTermToFilter(filter, isActive) {
    return (dispatch, getState) =>
        new Promise((resolve, reject) => {
            //let { filterArray } = getState() // get state to conditionally dispatch
            dispatch({ type: actions.ADD_TERM_TO_FILTER, filter, isActive })
            resolve()
            //setTimeout(() => reject(new Error('Timeout!')), 3000)
        })
}

export const setOffsets = (offsetType, offset) => {
    return {
        type: actions.SET_OFFSETS,
        offsetType,
        offset,
    }
}
