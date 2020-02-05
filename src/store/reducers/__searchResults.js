import { constants } from '../_constants'
let { actions } = constants

// SEARCH RESULTS
export default (state = [], action) => {
    switch (action.type) {
        case actions.REQUEST_SEARCH_RESULTS:
            return { ...state, isFetching: true }
        case actions.RECEIVE_SEARCH_RESULTS:
            return {
                ...state,
                isFetching: false,
                error: false,
                errorStatus: null,
                catalogs: action.payload.catalogs.hits,
                texts: action.payload.texts.hits,
            }
        case actions.RECEIVE_WORKS:
            return {
                ...state,
                isFetching: false,
                error: false,
                errorStatus: null,
                catalogs: action.payload.hits,
            }
        case actions.CLEAR_RESULTS:
            return {
                ...state,
                texts: null,
                catalogs: null,
            }
        case types.ERROR_SEARCH_RESULTS:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorStatus: action.payload,
            }
        default:
            return state
    }
}
